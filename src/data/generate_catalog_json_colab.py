# Colab: build products-grouped.json + additional-images.json from an Excel file

!pip -q install pandas openpyxl

import re
import json
import pandas as pd
from pathlib import Path
from collections import defaultdict
from google.colab import files

# 1) Upload your Excel file (the one used for catalog export)
uploaded = files.upload()
xlsx_name = next(iter(uploaded.keys()))
xlsx_path = Path(xlsx_name)

# 2) Helpers
def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip())

def pick_col(columns, candidates):
    lower_map = {c.lower(): c for c in columns}
    for cand in candidates:
        if cand.lower() in lower_map:
            return lower_map[cand.lower()]
    # fuzzy contains fallback
    for cand in candidates:
        for c in columns:
            if cand.lower() in c.lower():
                return c
    return None

def slugify(text):
    t = norm(text).lower()
    t = re.sub(r"[^a-z0-9]+", "-", t)
    return t.strip("-") or "product"

def extract_urls(text):
    if pd.isna(text):
        return []
    urls = re.findall(r"https?://[^\s,;\"')]+", str(text))
    # keep image URLs only
    urls = [u for u in urls if re.search(r"\.(jpg|jpeg|png|webp|gif|avif|svg)(\?|$)", u, re.I)]
    # dedupe preserve order
    out = []
    seen = set()
    for u in urls:
        if u not in seen:
            out.append(u)
            seen.add(u)
    return out

def split_code(code):
    code = norm(code)
    if "-" in code:
        a, b = code.split("-", 1)
        return a.strip(), b.strip()
    return code, ""

# 3) Read excel
df = pd.read_excel(xlsx_path, dtype=str).fillna("")
df.columns = [norm(c) for c in df.columns]

# 4) Try to auto-map columns (adjust if needed)
c_code = pick_col(df.columns, ["code", "κωδικός", "article code", "sku"])
c_title = pick_col(df.columns, ["title", "τίτλος", "product", "ονομασία"])
c_group = pick_col(df.columns, ["group_root", "group", "οικογένεια", "family", "κατηγορία"])
c_family_indicator = pick_col(df.columns, ["family_indicator", "indicator", "σειρά"])
c_desc = pick_col(df.columns, ["description", "περιγραφή"])
c_color = pick_col(df.columns, ["color", "χρώμα"])
c_image = pick_col(df.columns, ["image_url", "packshot", "packshot_url", "image"])
c_avail = pick_col(df.columns, ["availability", "διαθεσιμότητα"])
c_stock = pick_col(df.columns, ["stock", "απόθεμα"])
c_pack = pick_col(df.columns, ["pack", "κιβώτιο"])
c_excel_ar = pick_col(df.columns, ["excel_ar", "ar", "extra_description"])
c_additional = pick_col(df.columns, ["additional_images", "catalogue_images", "gallery", "catalogue"])

required = [c_code, c_title]
if any(x is None for x in required):
    raise ValueError(f"Could not detect required columns. Found columns: {list(df.columns)}")

# 5) Build grouped products
group_buckets = defaultdict(list)
for _, r in df.iterrows():
    code = norm(r[c_code])
    if not code:
        continue
    title = norm(r[c_title])
    group_root = norm(r[c_group]) if c_group else title
    group_buckets[group_root].append(r)

products = []
additional_images = {}

for group_root, rows in group_buckets.items():
    # product-level
    first = rows[0]
    title = norm(first[c_title])
    family_indicator = norm(first[c_family_indicator]) if c_family_indicator else ""
    product_id_base = family_indicator or group_root or title
    product_id = slugify(product_id_base)

    # sizes + variants
    sizes_map = defaultdict(list)
    rep_image = ""

    # Optional: group-level gallery fallback
    group_gallery = []
    if c_additional:
        for rr in rows:
            group_gallery.extend(extract_urls(rr[c_additional]))
    # dedupe
    gg_seen = set()
    group_gallery = [u for u in group_gallery if not (u in gg_seen or gg_seen.add(u))]

    for rr in rows:
        code = norm(rr[c_code])
        size_code, _ = split_code(code)

        image_url = norm(rr[c_image]) if c_image else ""
        if image_url and not rep_image:
            rep_image = image_url

        variant = {
            "code": code,
            "description": norm(rr[c_desc]) if c_desc else "",
            "color": norm(rr[c_color]) if c_color else "",
            "image_url": image_url,
            "pack": norm(rr[c_pack]) if c_pack else "",
            "excel_ar": norm(rr[c_excel_ar]) if c_excel_ar else "",
            "stock": int(rr[c_stock]) if c_stock and str(rr[c_stock]).strip().isdigit() else None,
        }
        if c_avail:
            variant["availability"] = norm(rr[c_avail])

        sizes_map[size_code].append(variant)

        # additional-images mapping
        per_row_gallery = extract_urls(rr[c_additional]) if c_additional else []
        gallery = per_row_gallery if per_row_gallery else group_gallery
        if gallery:
            additional_images[code] = gallery

    sizes = []
    for size_code, variants in sorted(sizes_map.items(), key=lambda kv: kv[0]):
        size_obj = {
            "size_label": size_code,
            "size_code": size_code,
            "variants": variants,
            "colors_count": len(variants),
        }
        sizes.append(size_obj)

    product = {
        "id": product_id,
        "group_root": group_root,
        "title": title,
        "representative_image": rep_image,
        "sizes": sizes,
        "sizes_count": len(sizes),
        "variants_count": sum(len(s["variants"]) for s in sizes),
    }
    if family_indicator:
        product["family_indicator"] = family_indicator

    products.append(product)

# Sort for deterministic output
products = sorted(products, key=lambda p: p["id"])
additional_images = dict(sorted(additional_images.items(), key=lambda kv: kv[0]))

products_grouped = {
    "source_file": xlsx_path.name,
    "products_count": len(products),
    "products": products,
}

# 6) Write files
out_dir = Path(".")
pg_path = out_dir / "products-grouped.json"
ai_path = out_dir / "additional-images.json"

pg_path.write_text(json.dumps(products_grouped, ensure_ascii=False, indent=2), encoding="utf-8")
ai_path.write_text(json.dumps(additional_images, ensure_ascii=False, indent=2), encoding="utf-8")

print("Done:")
print(" -", pg_path)
print(" -", ai_path)

# 7) Download outputs
files.download(str(pg_path))
files.download(str(ai_path))
