# VIOMES S.A. Homepage Overview

This repository is a React + TypeScript + Vite single-page app for the VIOMES S.A. homepage.
The two things to understand first are: route rendering and SEO live in the app shell, while the catalog content is loaded from generated JSON plus fallback assets.

When an important project change lands, update this file, [README.md](README.md), [MEMORY.md](MEMORY.md), and [DESIGN.md](DESIGN.md) in the same change set so the handoff stays current.

## What Runs The App

- `src/main.tsx` boots React and wraps the app in `ThemeProvider`.
- `src/App.tsx` owns routing, lazy page loading, and route-specific SEO metadata.
- `src/components/layout/Layout.tsx` provides the global page shell.
- `src/components/layout/Navbar.tsx` and `src/components/layout/Footer.tsx` provide the global chrome and user-facing settings.
- `src/pages/*` contains the route-level page components.
- `src/lib/catalogDataLoader.ts` loads catalog JSON from `public/data` first and falls back to bundled `src/data` imports.
- `src/lib/testPackshotOverrides.ts` switches selected product images to local test packshots when `VITE_USE_TEST_PACKSHOTS=true`.

## Routing Snapshot

The main routes currently exposed by `src/App.tsx` are:

- `/`
- `/products`
- `/products/:id`
- `/products/eidi-spitioy`
- `/products/glastres`
- `/products/epaggelmatikos-eksoplismos`
- `/about`
- `/sustainability`
- `/quality`
- `/industries`
- `/news`
- `/contact`

## Data And Assets

- `src/data/generate_catalog_json.py` is the source-of-truth transformer from the Excel workbook to the app-ready JSON payloads.
- `src/data/products-grouped.json` and `src/data/additional-images.json` are the generated catalog payloads used by the app.
- `public/data/*` are runtime fallback copies for those JSON files and are what the deployed app tries to fetch first.
- `public/images/packshot-test` is the temporary test-packshot set used by the feature flag.
- `public/images/NEW COLOR TAGS 2023` contains a large static reference image set and related source material.
- `src/components/ui/*` contains reusable UI primitives and some component tests.

### Catalog Flow Summary

1. The workbook in `src/data` is processed by `src/data/generate_catalog_json.py`.
2. The generator reads Excel grouping markers, product metadata, packshots, and extra lifestyle images.
3. It emits grouped product JSON plus a variant-to-additional-images map.
4. `src/lib/catalogDataLoader.ts` loads the runtime JSON from `public/data` and falls back to bundled `src/data` imports.
5. The page components render the imported catalog data; they do not talk to Excel directly.

### Key Implementation Observations

- The Excel `W` marker becomes the product grouping key and the `X` marker carries family context.
- The product `id` comes from the extracted group code, while the size bucket comes from the variant code prefix before `-`.
- The grouped JSON includes derived category data so the product pages can filter by site category without parsing Excel at runtime.
- The representative image is chosen from the first non-empty packshot in the grouped variants.

## Project Docs And Workflow

- `project-context/1.define` contains requirements, assumptions, MRD, PRD, SAD, and success criteria.
- `project-context/2.build` contains implementation guidance for setup, architecture, frontend, backend, integration, and QA.
- `project-context/3.deliver` contains deployment, monitoring, release notes, and runbooks.
- `README.md` is the start-here guide for setup and workflow notes.
- Local orchestration lives in `plans/README.md` and the global Copilot instructions; this repo does not keep root `*.agent.md` files anymore.

## Documentation Rule

If a change affects routes, catalog data flow, page structure, scripts, workflow docs, design direction, or cleanup guidance, update this overview, [README.md](README.md), [MEMORY.md](MEMORY.md), and [DESIGN.md](DESIGN.md) right away.
Keep the high-level handoff short, current, and aligned with the actual repository state.

## Cleanup Guidance

When doing a cleanup pass, treat these as workspace clutter rather than app source:

- `dist`
- `node_modules`
- `.venv`
- `.playwright-mcp`
- root screenshots and generated previews such as `homepage-current.png` and `design-variations.png`
- repo-local agent md files, if any reappear during future work
- editor state files and compiled caches such as `workspaceState.state.json` and `__pycache__`

Keep generated catalog JSON, runtime fallback JSON, and packshot assets unless you are changing the data pipeline at the same time.
The image folders under `public/images` are mostly source material, so remove files there only with care.

## Quick Start

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm run typecheck
npm run test
```

## Practical Starting Point For Future Agents

If you need to understand or modify the app quickly, inspect files in this order:

1. `src/App.tsx`
2. `src/lib/catalogDataLoader.ts`
3. `src/components/layout/Navbar.tsx`
4. `src/components/home/*`
5. `src/pages/*`

That path gives you routing, data loading, global UI, then the page surfaces.
