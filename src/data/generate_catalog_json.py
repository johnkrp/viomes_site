#!/usr/bin/env python3
"""
Generate:
  - products-grouped.json
  - additional-images.json

from the VIOMES Excel catalog workbook.

Usage:
  python src/data/generate_catalog_json.py
  python src/data/generate_catalog_json.py --xlsx "src/data/ΚΑΤΑΣΤΑΣΗ ΕΙΔΩΝ ΚΑΙ ΠΕΡΙΓΡΑΦΕΣ SITE.xlsx"
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

import openpyxl


# Zero-based column indices in the worksheet.
COL_GROUP_MARKER = 22      # W
COL_FAMILY_MARKER = 23     # X
COL_CODE = 3               # D
COL_DESCRIPTION = 5        # F
COL_COLOR = 8              # I
COL_PACK = 11              # L
COL_TITLE_GR = 40          # AO (ΕΛΛΗΝΙΚΗ ΠΕΡΙΓΡΑΦΗ SITE)
COL_TITLE_EN_SLUG = 41     # AP (ΑΓΓΛΙΚΗ ΠΕΡΙΓΡΑΦΗ ΓΙΑ ΣΚΡΟΥΤΖ)
COL_EXCEL_AR = 43          # AR (ΚΕΙΜΕΝΟ SITE ΕΛΛΗΝΙΚΑ)
COL_PACKSHOT = 51          # AZ
COL_LIFESTYLE_START = 52   # BA..BD
COL_LIFESTYLE_END = 55
GREEN_FILL_HEX_SUFFIX = "C6EFCE"


def clean(value: Any) -> str:
    if value is None:
        return ""
    text = str(value).strip()
    if not text:
        return ""
    if text.lower() == "nan":
        return ""
    return text


def normalize_ascii_slug(text: str) -> str:
    normalized = unicodedata.normalize("NFD", text.lower())
    without_marks = "".join(ch for ch in normalized if unicodedata.category(ch) != "Mn")
    ascii_only = without_marks.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_only).strip("-")
    return slug


def extract_group_code(group_root: str, fallback_code: str) -> str:
    match = re.search(r"\d+", group_root or "")
    if match:
        return match.group(0)
    size_code = fallback_code.split("-", 1)[0]
    return size_code or fallback_code


def derive_title(title_value: Any, description_value: Any, code: str) -> str:
    title = clean(title_value)
    if title:
        return title
    description = clean(description_value)
    if description:
        return description.split("-")[0].strip()
    return code


def is_green_description_cell(cell: Any) -> bool:
    fill = getattr(cell, "fill", None)
    if not fill or fill.fill_type != "solid":
        return False

    fg_color = getattr(fill, "fgColor", None)
    if not fg_color or getattr(fg_color, "type", None) != "rgb":
        return False

    rgb = (fg_color.rgb or "").upper()
    return rgb.endswith(GREEN_FILL_HEX_SUFFIX)


def build_rows(worksheet: Any) -> list[dict[str, Any]]:
    current_group = ""
    current_family = ""
    seen_codes: set[str] = set()
    rows: list[dict[str, Any]] = []

    for row in worksheet.iter_rows(min_row=3, max_col=COL_LIFESTYLE_END + 1, values_only=False):
        marker_group = clean(row[COL_GROUP_MARKER].value)
        marker_family = clean(row[COL_FAMILY_MARKER].value)
        code = clean(row[COL_CODE].value)

        # Keep the latest marker context, whether marker values appear on
        # dedicated marker rows or directly on data rows.
        if marker_group:
            current_group = marker_group
        if marker_family:
            current_family = marker_family

        # Marker-only rows carry context but no variant data.
        if not code:
            continue
        if not is_green_description_cell(row[COL_DESCRIPTION]):
            continue
        if code in seen_codes:
            continue
        seen_codes.add(code)

        title = derive_title(row[COL_TITLE_GR].value, row[COL_DESCRIPTION].value, code)
        en_slug = clean(row[COL_TITLE_EN_SLUG].value)
        size_code = code.split("-", 1)[0] if "-" in code else code
        packshot = clean(row[COL_PACKSHOT].value)
        additional_images = [
            clean(row[index].value)
            for index in range(COL_LIFESTYLE_START, COL_LIFESTYLE_END + 1)
            if clean(row[index].value)
        ]

        rows.append(
            {
                "group_root": current_group,
                "family_indicator": current_family,
                "group_code": extract_group_code(current_group, code),
                "title": title,
                "title_en_slug": en_slug,
                "size_code": size_code,
                "variant": {
                    "code": code,
                    "description": clean(row[COL_DESCRIPTION].value),
                    "color": clean(row[COL_COLOR].value),
                    "image_url": packshot,
                    "pack": clean(row[COL_PACK].value),
                    "excel_ar": clean(row[COL_EXCEL_AR].value),
                },
                "additional_images": additional_images,
            }
        )

    return rows


def build_grouped_products(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        # Group strictly by the Excel W marker (group_root).
        key = row["group_root"] or row["group_code"]
        grouped[key].append(row)

    products: list[dict[str, Any]] = []

    for group_key, product_rows in grouped.items():
        group_code = product_rows[0]["group_code"]
        title = product_rows[0]["title"]
        product_id = group_code

        variants_by_size: dict[str, list[dict[str, Any]]] = defaultdict(list)
        for row in product_rows:
            variants_by_size[row["size_code"]].append(row["variant"])

        sizes = []
        for size_code, variants in sorted(variants_by_size.items(), key=lambda item: item[0]):
            colors_count = len({clean(variant["color"]) for variant in variants if clean(variant["color"])})
            sizes.append(
                {
                    "size_label": size_code,
                    "size_code": size_code,
                    "variants": variants,
                    "colors_count": colors_count,
                }
            )

        representative_image = ""
        for size in sizes:
            for variant in size["variants"]:
                image_url = clean(variant.get("image_url"))
                if image_url:
                    representative_image = image_url
                    break
            if representative_image:
                break

        variants_count = sum(len(size["variants"]) for size in sizes)
        products.append(
            {
                "id": product_id,
                "family_indicator": clean(product_rows[0]["family_indicator"]),
                "group_root": clean(product_rows[0]["group_root"]),
                "title": title,
                "representative_image": representative_image,
                "sizes": sizes,
                "sizes_count": len(sizes),
                "variants_count": variants_count,
            }
        )

    products.sort(key=lambda product: (product["group_root"], product["title"], product["id"]))
    return products


def build_additional_images(rows: list[dict[str, Any]]) -> dict[str, list[str]]:
    mapping: dict[str, list[str]] = {}
    for row in rows:
        code = row["variant"]["code"]
        images = row["additional_images"]
        if not images:
            continue
        deduped = list(dict.fromkeys(images))
        mapping[code] = deduped
    return dict(sorted(mapping.items(), key=lambda item: item[0]))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate catalog JSON files from XLSX.")
    parser.add_argument(
        "--xlsx",
        type=Path,
        default=None,
        help="Path to the source workbook. Defaults to the first .xlsx in this folder.",
    )
    parser.add_argument(
        "--sheet",
        default=None,
        help="Sheet name. Defaults to the first sheet.",
    )
    parser.add_argument(
        "--products-out",
        type=Path,
        default=Path("src/data/products-grouped.json"),
        help="Output path for products-grouped JSON.",
    )
    parser.add_argument(
        "--additional-out",
        type=Path,
        default=Path("src/data/additional-images.json"),
        help="Output path for additional-images JSON.",
    )
    return parser.parse_args()


def resolve_xlsx_path(explicit_path: Path | None) -> Path:
    if explicit_path:
        return explicit_path

    candidates = sorted(
        path for path in Path("src/data").glob("*.xlsx") if not path.name.startswith("~$")
    )
    if not candidates:
        raise FileNotFoundError("No .xlsx file found in src/data")
    return candidates[0]


def main() -> None:
    args = parse_args()
    xlsx_path = resolve_xlsx_path(args.xlsx)

    workbook = openpyxl.load_workbook(xlsx_path, read_only=False, data_only=True)
    worksheet = workbook[args.sheet] if args.sheet else workbook[workbook.sheetnames[0]]

    rows = build_rows(worksheet)
    products = build_grouped_products(rows)
    additional_images = build_additional_images(rows)

    products_payload = {
        "source_file": xlsx_path.name,
        "products_count": len(products),
        "products": products,
    }

    args.products_out.parent.mkdir(parents=True, exist_ok=True)
    args.additional_out.parent.mkdir(parents=True, exist_ok=True)

    args.products_out.write_text(
        json.dumps(products_payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    args.additional_out.write_text(
        json.dumps(additional_images, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Wrote {args.products_out} ({len(products)} products)")
    print(f"Wrote {args.additional_out} ({len(additional_images)} variant image groups)")


if __name__ == "__main__":
    main()
