# Graph Report - homepage  (2026-05-05)

## Corpus Check
- 105 files · ~215,636 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 284 nodes · 263 edges · 15 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `render()` - 7 edges
2. `clean()` - 7 edges
3. `build_rows()` - 7 edges
4. `main()` - 7 edges
5. `loadCatalogProducts()` - 7 edges
6. `renderPreview()` - 6 edges
7. `resolveSingleMeta()` - 6 edges
8. `resolveSwatchBackground()` - 5 edges
9. `normalizeKey()` - 5 edges
10. `Catalog Data Pipeline` - 5 edges

## Surprising Connections (you probably didn't know these)
- `loadCatalogProducts()` --calls--> `loadData()`  [INFERRED]
  src\lib\catalogDataLoader.ts → src\pages\CategoryHomeItems.tsx
- `loadCatalogProducts()` --calls--> `loadData()`  [INFERRED]
  src\lib\catalogDataLoader.ts → src\pages\CategoryPlanters.tsx
- `loadCatalogProducts()` --calls--> `loadData()`  [INFERRED]
  src\lib\catalogDataLoader.ts → src\pages\CategoryProfessional.tsx
- `resolveSwatchBackground()` --calls--> `cn()`  [INFERRED]
  src\lib\colorSwatch.ts → src\pages\ProductDetailLegacy.tsx
- `handleCanvasClick()` --calls--> `hexToHsl()`  [INFERRED]
  src\components\ui\ColorWheelPicker.tsx → src\lib\paletteGenerator.ts

## Hyperedges (group relationships)
- **Catalog Runtime Flow** — catalog_data_pipeline, src_data_generate_catalog_json_py, src_lib_catalogdataloader_ts, src_pages_products_tsx [INFERRED 0.78]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (14): COLOUR GUIDE draft 13, hashColor(), isNoiseToken(), matchesColorSelection(), normalizeColorKey(), resolveColor(), resolveColorTitle(), resolveSingleMeta() (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (10): buildProductSplitRules(), fetchWithFallbacks(), loadAdditionalImages(), loadCatalogProducts(), splitGroupedProduct(), withBaseUrl(), loadData(), loadData() (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (14): build_additional_images(), build_grouped_products(), build_rows(), clean(), derive_title(), extract_group_code(), filter_unreachable_additional_images(), is_green_description_cell() (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.26
Nodes (13): applyStyles(), bestText(), contrast(), hexToHsl(), hslToHex(), lum(), render(), renderDesc() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (4): isSiteCategory(), normalizeGreek(), normalizeSearchText(), Products()

### Community 5 - "Community 5"
Cohesion: 0.24
Nodes (7): Catalog Data Pipeline, Cleanup Policy, Greek-first Content, Excel Grouping Markers W/X, Route and SEO Shell, Runtime Data Fallback, Temporary Packshot Override

### Community 6 - "Community 6"
Cohesion: 0.2
Nodes (4): Category Showroom Layout, Warm Earth Palette, Editorial Collage Hero, Muuto Benchmark

### Community 7 - "Community 7"
Cohesion: 0.31
Nodes (6): normalizeKey(), resolveTestPackshotByCode(), resolveTestPackshotFromImageUrl(), resolveTestPackshotVariants(), resolveTestPackshotVariantsFromImageUrl(), resolveProductCardImage()

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (6): formatHslVar(), generatePalette(), hexToHsl(), hslToHex(), paletteToColorTokens(), handleCanvasClick()

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (2): isAdditionalImageUrl(), isValidImageUrl()

### Community 10 - "Community 10"
Cohesion: 0.43
Nodes (4): applyResponsiveTextSizes(), clamp(), getViewportTextScale(), handleResize()

### Community 12 - "Community 12"
Cohesion: 0.47
Nodes (3): norm(), slugify(), split_code()

### Community 13 - "Community 13"
Cohesion: 0.4
Nodes (1): Plesk Deployment Flow

### Community 14 - "Community 14"
Cohesion: 0.8
Nodes (4): mapExcelCategoryToSiteCategory(), normalizeGreek(), resolvePrimaryCategory(), resolveSiteCategories()

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (2): getGroupingRule(), shouldSplitGroup()

## Knowledge Gaps
- **2 isolated node(s):** `Greek-first Content`, `Temporary Packshot Override`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 9`** (9 nodes): `cn()`, `getSizeOptionLabel()`, `getSizeSortValue()`, `handleLanguageChange()`, `isAdditionalImageUrl()`, `isValidImageUrl()`, `onSelectSize()`, `parseSpecsFromText()`, `ProductDetail.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (5 nodes): `Plesk Deployment Flow`, `MEMORY.md`, `PageLoader()`, `SeoManager()`, `App.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (3 nodes): `getGroupingRule()`, `shouldSplitGroup()`, `familyGroupingRules.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `loadData()` connect `Community 1` to `Community 9`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `Catalog Data Pipeline` connect `Community 5` to `Community 6`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `loadCatalogProducts()` (e.g. with `loadData()` and `loadData()`) actually correct?**
  _`loadCatalogProducts()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Greek-first Content`, `Temporary Packshot Override` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._