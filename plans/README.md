# Orchestra Plans

This folder stores generated planning artifacts when using the Conductor workflow.

## Files

- `<task>-plan.md` — approved multi-phase plan
- `<task>-phase-<n>-complete.md` — phase completion summary
- `<task>-complete.md` — final summary

## Suggested flow

1. Start in **superagent** mode (or **Conductor** if you want to force orchestration).
2. Approve generated plan.
3. Complete phases one by one.
4. Commit between phases.

## Agent roles

- `superagent` — single entrypoint; auto-routes to specialist agents
- `Conductor` — full multi-phase orchestration
- `planning-subagent` — creates phase plans only
- `implement-subagent` — executes one approved phase
- `code-review-subagent` — reviews uncommitted changes

## Reuse in other projects

From this repository, run the installer and point to another project folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-superagent.ps1 -TargetPath "D:\path\to\other-project"
```

Optional: also ignore generated plan artifacts in the target project's `.gitignore`:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-superagent.ps1 -TargetPath "D:\path\to\other-project" -AddPlansIgnore
```

This copies:

- `superagent.agent.md`
- `Conductor.agent.md`
- `planning-subagent.agent.md`
- `implement-subagent.agent.md`
- `code-review-subagent.agent.md`
- `plans/README.md`

You can keep these files in git as an audit trail, or ignore/archive them.
