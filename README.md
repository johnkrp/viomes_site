# VIOMES S.A. Homepage

Concise start-here guide for the VIOMES S.A. homepage repository.

For a faster repo map and cleanup guide, see [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md), [MEMORY.md](MEMORY.md), and [DESIGN.md](DESIGN.md).

Keep this README, [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md), [MEMORY.md](MEMORY.md), and [DESIGN.md](DESIGN.md) in sync whenever an important project change affects routes, data flow, scripts, workflow docs, or design direction.

## Project Snapshot

This is a React + TypeScript + Vite single-page application for VIOMES S.A. The site is Greek-first, with route content and SEO metadata authored in Greek and no assumption of full multilingual coverage. Theme setup is wrapped in [src/main.tsx](src/main.tsx) through `ThemeProvider`, while route-aware page titles and meta descriptions are managed in [src/App.tsx](src/App.tsx). The global chrome also includes palette-driven header/footer colors and viewport-responsive text sizing.

## Quick Start

Install dependencies, then start the dev server:

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run build
npm run preview
npm run typecheck
npm run lint
npm run test
npm run test:coverage
```

## Route and SEO Summary

Routing lives in [src/App.tsx](src/App.tsx). The app uses `react-router-dom` with lazy-loaded pages and a small client-side SEO manager that updates `document.title` and the description meta tag per route.

Key routes currently include `/`, `/products`, `/products/:id`, `/about`, `/sustainability`, `/quality`, `/industries`, `/news`, and `/contact`. Category shortcuts now resolve through query params (for example `/products?category=Μπάνιο`) instead of dedicated category route components.

## Catalog Data Pipeline

Catalog content is not hardcoded in component-local product arrays. The flow is:

1. The source workbook in [src/data](src/data) is processed by [src/data/generate_catalog_json.py](src/data/generate_catalog_json.py).
2. The generator reads the Excel markers and product fields, then writes `products-grouped.json` and `additional-images.json`.
3. Runtime copies live in [public/data](public/data) for the deployed app, while bundled JSON in [src/data](src/data) acts as a fallback import.
4. [src/lib/catalogDataLoader.ts](src/lib/catalogDataLoader.ts) loads `public/data/*` first and falls back to the bundled `src/data/*` imports if fetches fail.
5. Pages such as [src/pages/Products.tsx](src/pages/Products.tsx), [src/pages/ProductDetail.tsx](src/pages/ProductDetail.tsx), and the category pages consume the grouped catalog data and additional image map to render the UI.
6. The loader applies runtime split normalization for known mixed Excel groups (for example `1390`) so unrelated families render as separate product cards/detail pages.
7. Manual family overrides live in [src/lib/familyGroupingRules.ts](src/lib/familyGroupingRules.ts). This file is the source of truth for special cases where one Excel group must be split into multiple product detail pages by `size_code`.

Family grouping notes:

- Split products use the first `size_code` in each rule as the public product URL id.
- Titles and subcategories can be overridden per split group when the source workbook needs cleaner catalog labels.
- Keep the runtime JSON copies and the family rules file in sync when a manual grouping changes.

Important observations:

- Excel `W` and `X` markers carry grouping context; the generator turns those markers into product families and size groups.
- Excel `D`, `F`, `I`, `L`, `AO`, `AP`, `AR`, `AZ`, and `BA..BD` feed the product code, description, color, pack, localized text, packshot, and extra images.
- The generator groups variants under a product by Excel `W` marker, uses the code prefix before `-` as the size bucket, and picks the first non-empty packshot as the representative image.
- The UI never reads Excel directly. It only consumes the generated JSON through the loader layer.
- The separate [Color Guide.xlsx](src/data/Color%20Guide.xlsx) workbook is the source for color names, hex values, and swatch labels used in [src/lib/colorSwatch.ts](src/lib/colorSwatch.ts); [src/lib/colorTags.ts](src/lib/colorTags.ts) maps the code suffixes to the tag image files in [public/images/NEW COLOR TAGS 2023](public/images/NEW%20COLOR%20TAGS%202023).

When the catalog data changes, update the source generation flow, rebuild the JSON, and let the loader consume the refreshed files. The app code should stay focused on rendering and filtering that imported catalog data.

## Temporary Packshot Override

Temporary test packshots are handled in [src/lib/testPackshotOverrides.ts](src/lib/testPackshotOverrides.ts). Enable them with `VITE_USE_TEST_PACKSHOTS=true` to redirect matching product images to the test assets in `public/images/packshot-test`. Set the flag back to `false` to return to the normal catalog image URLs.

## Project Structure

```text
src/
├── App.tsx              # Routes and route-based SEO
├── main.tsx             # App bootstrap and ThemeProvider
├── components/          # Layout, home, and shared UI components
├── pages/               # Route-level page components
├── lib/                 # Catalog loading, color helpers, overrides, utilities
└── data/                # Generated catalog JSON used by the loader

public/
├── data/                # Runtime JSON fallback copies
└── images/packshot-test # Temporary packshot assets

project-context/
├── 1.define/            # Requirements and planning docs
├── 2.build/             # Build and implementation docs
└── 3.deliver/           # Release, deploy, and runbook docs
```

## Workflow Docs

Start with `project-context/1.define/` for scope and requirements, then move to `project-context/2.build/` for implementation guidance, and use `project-context/3.deliver/` for deployment, monitoring, and release notes. Use the remaining top-level docs only when you need a specific project note or integration reference.

## Graphify Knowledge Graph

This repo uses Graphify to keep an up-to-date architecture map for humans and agents.
For a compact command reference, see [docs/GRAPHIFY_WORKFLOW.md](docs/GRAPHIFY_WORKFLOW.md).
For project-specific architecture Q&A, see [docs/ARCHITECTURE_FAQ.md](docs/ARCHITECTURE_FAQ.md).

Primary outputs live in `graphify-out/`:

- `GRAPH_REPORT.md`: quick architecture summary (god nodes, surprising links, suggested questions)
- `graph.html`: interactive graph explorer
- `graph.json`: machine-readable graph for `query`, `path`, and `explain` commands

Recommended routine:

1. Build or refresh code graph at the start of a new chat session (or when explicitly requested):

```bash
.\.venv-graphify\Scripts\graphify update .
```

2. Run a full semantic refresh (docs/images/papers + code) from Codex chat:

```text
$graphify .
```

3. Ask targeted architecture questions in terminal:

```bash
.\.venv-graphify\Scripts\graphify query "how does catalog data flow to product pages?" --budget 1200
.\.venv-graphify\Scripts\graphify path "generate_catalog_json.py" "Home.tsx"
.\.venv-graphify\Scripts\graphify explain "Catalog Data Pipeline"
```

Agent behavior:

- `AGENTS.md` and `.codex/hooks.json` are configured so Codex checks graph context before raw file search.
- Keep `graphify-out/GRAPH_REPORT.md` current so new contributors can orient quickly.

## Documentation Maintenance

Keep this README aligned with important changes in the same change set. Update it when routes, catalog data flow, page structure, scripts, or workflow docs change, and reflect related shifts in project-context docs when that keeps the handoff clear.

## AI Tooling

See the workspace Copilot instructions and any local skills before inventing new workflows. This repo already includes workflow guidance and skill docs for implementation, review, testing, and prompt-driven tasks.

1. Get an API key from 21st.dev Magic Console.
2. In VS Code, enable MCP and reload window.
3. On first use, enter the key when prompted (`apiKey` input).

Notes:

- This runs locally through `npx`.
- No server (Plesk) Node.js requirement for this tool.

### 2) UI UX Pro Max setup (GitHub Copilot workflow mode)

Run from project root:

```bash
npm run uipro:init:copilot
```

This installs/copied skill assets for Copilot usage.

Update later with:

```bash
npm run uipro:update
```

Usage in Copilot chat:

```text
/ui-ux-pro-max Build a landing page for my SaaS product
```

### Intent classification helper (superagent integration)

A utility script is included for local intent mapping from user queries to agent delegates.

Run it with:

```bash
npm run intent:classify
```

It reads request text and outputs delegates such as `ui-ux-pro-max-skill`, `testing-subagent`, `perf-subagent`, `security-subagent`, `debugging-subagent`, or `Conductor`.

### Prerequisites

- Node.js (local machine)
- Python 3.x (required by UI UX Pro Max search scripts)

### Deployment note

These tools are **development-time only**. They do not replace Vite production build.

## Copilot Orchestra (project workflow)

Generated plan artifacts are stored in [plans/README.md](plans/README.md).

Suggested use:

1. Use the global Copilot workflow or the project docs to scope the task.
2. Request the task (feature/fix/refactor).
3. Approve the generated plan.
4. Execute phase-by-phase (implement → review → commit).
