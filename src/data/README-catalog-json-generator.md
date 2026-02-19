# Catalog JSON Generator

This project includes a Python script that generates:

- `products-grouped.json`
- `additional-images.json`

from the Excel workbook in `src/data`.

## Script

- `src/data/generate_catalog_json.py`

## Requirements

- Python 3.10+
- `openpyxl`

Install dependency:

```bash
pip install openpyxl
```

## Run

Default (uses first `.xlsx` found in `src/data`):

```bash
python src/data/generate_catalog_json.py
```

Explicit workbook:

```bash
python src/data/generate_catalog_json.py --xlsx "src/data/ΚΑΤΑΣΤΑΣΗ ΕΙΔΩΝ ΚΑΙ ΠΕΡΙΓΡΑΦΕΣ SITE.xlsx"
```

Custom outputs:

```bash
python src/data/generate_catalog_json.py \
  --products-out "src/data/products-grouped.json" \
  --additional-out "src/data/additional-images.json"
```

Optional sheet selection:

```bash
python src/data/generate_catalog_json.py --sheet "Sheet1"
```

## Excel Columns Used

Zero-based indices in code (`generate_catalog_json.py`):

- `W` (`COL_GROUP_MARKER`): group marker row (e.g. "Ομάδα ...")
- `X` (`COL_FAMILY_MARKER`): family marker row (e.g. "Οικογένεια ...")
- `D` (`COL_CODE`): variant code
- `F` (`COL_DESCRIPTION`): variant description
- `I` (`COL_COLOR`): color
- `L` (`COL_PACK`): pack quantity
- `AO` (`COL_TITLE_GR`): Greek product title
- `AP` (`COL_TITLE_EN_SLUG`): English title/slug source
- `AR` (`COL_EXCEL_AR`): Greek site text
- `AZ` (`COL_PACKSHOT`): packshot image URL
- `BA..BD` (`COL_LIFESTYLE_START..COL_LIFESTYLE_END`): additional/lifestyle image URLs

## Transformation Rules

1. Marker rows are used only as context:
- Group marker updates current `group_root`.
- Family marker updates current `family_indicator`.

2. Data rows are included only when:
- They have a code in column `D`.
- Their description cell in column `F` has the green fill (`solid`, RGB ending in `C6EFCE`).

3. Duplicate variant codes are deduplicated:
- Keep the first row encountered for each code.
- Ignore later rows with the same code.

4. Title selection:
- Prefer `AO` (Greek title).
- Fallback to description prefix from `F` (before `-`).
- Final fallback to variant code.

5. Product grouping key:
- `group_root` (Excel W marker) only.
- Result: all variants under the same W marker are merged into a single product/page.

6. Product ID generation:
- `id = group_code`

7. Size grouping:
- `size_code` is prefix of variant code before first `-`.
- Variants are nested under sizes.

8. Counts:
- `colors_count` per size (distinct non-empty colors)
- `sizes_count` per product
- `variants_count` per product

9. Representative image:
- First non-empty packshot found among variants.

10. Additional images output:
- `additional-images.json` maps variant `code` to deduplicated lifestyle images.

## Output Schema Summary

### `products-grouped.json`

- `source_file`
- `products_count`
- `products[]`:
  - `id`
  - `family_indicator`
  - `group_root`
  - `title`
  - `representative_image`
  - `sizes[]`:
    - `size_label`
    - `size_code`
    - `variants[]`:
      - `code`
      - `description`
      - `color`
      - `image_url`
      - `pack`
      - `excel_ar`
    - `colors_count`
  - `sizes_count`
  - `variants_count`

### `additional-images.json`

- Object map:
  - key: variant code
  - value: array of additional image URLs

## Notes

- Script writes UTF-8 JSON with `ensure_ascii=False` to preserve Greek text.
- If no `--xlsx` is provided and no `.xlsx` exists in `src/data`, script fails with `FileNotFoundError`.
