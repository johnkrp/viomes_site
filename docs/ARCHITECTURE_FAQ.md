# Architecture FAQ (Graphify-backed)

This FAQ captures practical architecture answers from Graphify outputs for this repository.

Source artifacts:

- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.json`
- live CLI queries (`graphify query`, `graphify path`, `graphify explain`)

## 1) How does product data reach product detail pages?

Current shortest path to `ProductDetail.tsx`:

`loadCatalogProducts()` -> `loadData()` -> `ProductDetail.tsx`

Graphify evidence:

- `graphify path "loadCatalogProducts" "ProductDetail.tsx"`
- `graphify explain "loadCatalogProducts"`

Notes:

- `loadCatalogProducts()` is the key loader hub in `src/lib/catalogDataLoader.ts`.
- It is connected to multiple `loadData()` functions in category/detail pages.

## 2) What is the main cross-module bridge in this project?

`Catalog Data Pipeline` currently acts as a bridge concept across code and docs communities.

Graphify evidence:

- `graphify explain "Catalog Data Pipeline"`
- `graphify-out/GRAPH_REPORT.md` (`God Nodes`, `Suggested Questions`)

Connected references include:

- `README.md`
- `PROJECT_OVERVIEW.md`
- `README-catalog-json-generator.md`
- `Home.tsx` (inferred relationship)

## 3) How is `Home.tsx` connected to architecture/design intent?

`Home.tsx` is connected to design knowledge nodes through inferred conceptual edges.

Graphify evidence:

- `graphify explain "Home.tsx"`
- `graphify path "CategoriesShowcaseSection.tsx" "Home.tsx"`

Observed path:

`CategoriesShowcaseSection.tsx` -> `Category Showroom Layout` -> `DESIGN.md` -> `Warm Earth Palette` -> `Home.tsx`

This is useful for validating that UI changes still align with documented design direction.

## 4) Which files should we inspect first for catalog-related bugs?

Start in this order:

1. `src/lib/catalogDataLoader.ts`
2. `src/pages/ProductDetail.tsx`
3. `src/pages/CategoryHomeItems.tsx`
4. `src/pages/CategoryPlanters.tsx`
5. `src/pages/CategoryProfessional.tsx`
6. `src/data/generate_catalog_json.py`

Why:

- Graphify shows `loadCatalogProducts()` as a high-degree operational node.
- Category/detail `loadData()` functions connect directly to that loader.

## 5) Are there known graph gaps we should keep in mind?

Yes. There is currently no direct path from:

- `generate_catalog_json.py` -> `Products.tsx`

Graphify evidence:

- `graphify path "generate_catalog_json.py" "Products.tsx"` returns no path.

Interpretation:

- This is a known limitation of current extracted relationships (code + semantic links may not yet include every transformation edge).
- Keep using source docs (`README.md`, `PROJECT_OVERVIEW.md`, `src/data/README-catalog-json-generator.md`) alongside graph queries.

## 6) What commands should we run before a risky refactor?

Run:

```bash
npm run graph:update
npm run graph:explain -- "loadCatalogProducts"
npm run graph:path -- "CategoriesShowcaseSection.tsx" "Home.tsx"
```

Then skim:

- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.html`

## 7) Quick command reference (npm scripts)

```bash
npm run graph:update
npm run graph:cluster
npm run graph:benchmark
npm run graph:query -- "your question here"
npm run graph:path -- "Node A" "Node B"
npm run graph:explain -- "Node Name"
```

---

Last updated: 2026-04-28
