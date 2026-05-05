# Graphify Workflow

Quick reference for using Graphify in this repository.

## Mode (Current)

This project is currently configured for **manual Graphify runs**:

- Background watcher: off
- Git hooks (`post-commit`, `post-checkout`): off

## What Graphify Gives You

Graphify builds a knowledge graph of this codebase and writes outputs to `graphify-out/`:

- `GRAPH_REPORT.md`: high-signal summary (god nodes, surprising links, suggested questions)
- `graph.html`: interactive visual graph
- `graph.json`: queryable graph data for terminal and agent workflows
- `docs/ARCHITECTURE_FAQ.md`: curated Q&A derived from live graph queries

## Manual Run Playbook

From repo root:

```bash
.\.venv-graphify\Scripts\graphify update .
```

Use this at the start of a new chat session (or on explicit request) to refresh AST-driven structure (`graph.json`, `graph.html`, `GRAPH_REPORT.md`).

In Codex chat, run:

```text
$graphify .
```

Use this for full semantic refresh (code + docs/images/papers).

## When To Run Which Command

1. Starting a new chat after TypeScript/Python/React changes:
   - run `graphify update .`
2. Changed docs, images, or architecture notes:
   - run `$graphify .` in Codex chat
3. Before planning a larger refactor (especially in a new chat):
   - run `graphify update .`, then read `graphify-out/GRAPH_REPORT.md`
4. Before merging a branch with broad changes:
   - run `graphify update .` to ensure graph artifacts match current code

## Query the Graph

```bash
.\.venv-graphify\Scripts\graphify query "how does catalog data flow to product pages?" --budget 1200
.\.venv-graphify\Scripts\graphify path "generate_catalog_json.py" "Home.tsx"
.\.venv-graphify\Scripts\graphify explain "Catalog Data Pipeline"
```

## Team/Agent Usage

1. Read `graphify-out/GRAPH_REPORT.md` before deep architecture edits.
2. Use `path`/`query`/`explain` for dependency tracing before broad grep-style search.
3. Re-run `graphify update .` at the start of the next chat after refactors so the map stays current.
4. Re-run `$graphify .` when docs, images, or other non-code artifacts change meaningfully.

## Optional: Re-enable Automation Later

If you want auto-updates again:

```bash
.\.venv-graphify\Scripts\graphify hook install
.\.venv-graphify\Scripts\graphify watch .
```

Stop watcher:

```bash
Stop-Process -Name graphify -Force
```

## Scope and Cost Control

Graphify uses `.graphifyignore` in this repo to avoid noisy or heavy inputs.
If runs become slow or expensive, tighten `.graphifyignore` first.
