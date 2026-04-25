# Cleanup Inventory and Actions (2026-04-21)

This file captures the 3-phase cleanup pass executed in this repository.

## Phase 1: Inventory (Completed)

### Structure and churn observations
- Repository contains significant image-heavy assets under `public/images`.
- Working tree already had broad existing churn before this cleanup pass.

### Duplicate asset findings
- `public/images/new-test` and `public/images/packshot-test` share **9 normalized basenames**:
  - `1020-73`
  - `1032-73`
  - `1150-50`
  - `140-02`
  - `185.6-97`
  - `239-03`
  - `300-58`
  - `592.6-96`
  - `62-76`
- `new-test` was not referenced by application code or docs.

### Largest image hotspots
Top files are mostly hero duplicates in both `home-*` and legacy names (for example `AND_6099.JPG` with `home-hero-1.jpg`, `ΚΑΔΟΙ.JPG` with `home-bins.jpg`).

### Documentation placeholders
`project-context/2.build/*.md` and parts of `project-context/3.deliver/*.md` include template placeholders such as `Status: To Be Filled`.

## Phase 2: Conservative Cleanup (Completed)

### .gitignore hardening
Added ignores for recurring local artifacts:
- `.playwright-mcp/`
- `__pycache__/`
- `*.pyc`
- `*.agent.md`
- `ACTIVATION-SUMMARY.md`
- `CHAT_HANDOFF_*.md`
- `design-variations.html`
- `design-variations.png`
- `homepage-current.png`
- `workspaceState.state.json`

## Phase 3: Full Cleanup + Dedupe (Partially Applied + Suggestions)

### Applied
- Removed unreferenced duplicate folder:
  - `public/images/new-test`

### Suggested next passes (manual review recommended)
1. Decide whether both legacy hero names and `home-*` aliases should coexist.
2. Standardize one naming convention for packshot variants (`.jpg` vs `.JPG`, `_01` vs `_1`).
3. Either complete template docs in `project-context/2.build` or mark them explicitly as templates in a local README for that folder.
4. Consider an optional image optimization pass for the largest hero assets before deployment.

## Safety notes
- No catalog JSON source files were removed.
- No Excel source files were removed.
- No route/component code paths were altered.
