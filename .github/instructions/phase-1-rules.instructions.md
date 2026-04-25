---
name: phase-1-rules
description: "Rules and guardrails for Phase 1: DEFINE workflow. Ensures quality artifacts, prevents scope creep, maintains clarity."
applyTo: "project-context/1.define/**"
---

# Phase 1: DEFINE Workflow Rules

**Project**: VIOMES S.A. Homepage  
**Phase**: 1. DEFINE (Product Manager + Architect)  
**Owner**: `@product-mgr`, `@architect`

---

## Core Rules

### Rule 1: No Implementation Without PRD Approval

- ❌ Don't start building before PRD is complete and signed off
- ✅ PRD defines the problem; BUILD solves it
- 🎯 Impact: Prevents wasted engineering time on wrong features

### Rule 2: Separate MVP from Phase 2+

- ❌ Don't blend Phase 1 MVP with nice-to-haves
- ✅ Explicitly label features: **Must-Have (MVP)** vs **Nice-to-Have (Phase 2+)** vs **Won't Do**
- 🎯 Impact: Prevents scope creep; enables focused delivery

### Rule 3: SAD Must Address Performance Targets

- ❌ Don't approve SAD without performance strategy
- ✅ SAD must include: Lighthouse >85 strategy, code splitting, image optimization, caching
- 🎯 Impact: Performance won't be an afterthought

### Rule 4: Assumptions Explicit, Not Hidden

- ❌ Don't assume team knows the constraints
- ✅ List all assumptions in ASSUMPTIONS.md (team size, timeline, tech stack, data format)
- 🎯 Impact: Prevents mid-project surprises

### Rule 5: Success Criteria Quantified

- ❌ Don't say "fast" or "responsive" without numbers
- ✅ Use: Lighthouse >85, LCP <2.5s, WCAG AA, mobile 375px+
- 🎯 Impact: Clear pass/fail definition for BUILD phase

---

## Artifact Quality Standards

### PRD Quality Checklist

- [ ] **Features**: All features listed, prioritized into MVP/Phase 2/Won't-do
- [ ] **Success Metrics**: Quantitative targets (e.g., "Lighthouse >85") + qualitative (e.g., "user satisfaction")
- [ ] **User Journeys**: 3+ main flows documented (landing → browse → contact, etc.)
- [ ] **Constraints**: Timeline, budget, team size, scope limits documented
- [ ] **No TBDs in MVP**: All must-haves are fully specified; Phase 2 can have TBDs
- [ ] **Sign-Off**: Product Manager and architects approved

### SAD Quality Checklist

- [ ] **Tech Stack**: All choices locked and justified (React, TypeScript, Tailwind, Vite, shadcn/ui)
- [ ] **Component Architecture**: Directory structure clear (Layout, Pages, UI, Hooks, Lib)
- [ ] **Data Flow**: Diagram or description shows products.json → components → display
- [ ] **Performance Strategy**: How to achieve Lighthouse >85, LCP <2.5s (code splitting, lazy loading, images)
- [ ] **Scalability Plan**: How does system handle 100 → 1000 products?
- [ ] **Decisions Justified**: Every choice explains "why" (trade-offs, rationale)
- [ ] **Sign-Off**: Architects and engineering leads approved

### ASSUMPTIONS Quality Checklist

- [ ] **All Unknowns Listed**: Nothing hidden; all risks surfaced
- [ ] **Team Constraints**: Size, availability, skill gaps documented
- [ ] **Timeline/Budget**: Explicit (not vague)
- [ ] **Risks**: What could go wrong? How likely? Mitigation?
- [ ] **Sign-Off**: Team acknowledges and accepts

### SUCCESS_CRITERIA Quality Checklist

- [ ] **Phase 1 Completion Checklist**: Clear definition of "DEFINE is done"
- [ ] **Phase 2 Quality Gates**: Hard stops before BUILD can start (PRD approved, SAD locked)
- [ ] **Phase 3 Quality Gates**: Hard stops before DELIVER (>85 Lighthouse, WCAG AA, <70% coverage)
- [ ] **Metrics Measurable**: Not vague ("fast" → Lighthouse >85, LCP <2.5s)
- [ ] **Known Limitations Documented**: Phase 1 won't include cart/auth/etc., logged for Phase 2

---

## Scope Management

### ✅ In Phase 1 DEFINE

- Market research and competitive analysis
- User persona development
- Feature prioritization (MVP vs Phase 2)
- Technology selection and justification
- Performance targets and strategy
- Success metrics and quality gates
- Assumptions and risk documentation

### ❌ NOT in Phase 1 DEFINE

- Writing application code
- Creating detailed UI mockups/wireframes (conceptual OK)
- Setting up databases or backends
- Creating test infrastructure
- Designing deployment pipelines

**If it's tech/design work, defer to Phase 2: BUILD**

---

## Handoff Criteria: When DEFINE is Complete

✅ **DEFINE Phase is DONE when**:

1. **PRD Approved**: Product Manager signed off ✅
2. **SAD Approved**: Architect signed off ✅
3. **Assumptions Documented**: All risks and blockers known ✅
4. **Success Clear**: Everyone can state the 3 success metrics ✅
5. **No Ambiguity**: No "TBDs" in MVP features ✅
6. **Team Briefing Done**: Build team reviewed all artifacts ✅
7. **Next Phase Ready**: BUILD phase can start Monday ✅

---

## Common Pitfalls & How to Avoid

### Pitfall 1: Feature Bloat ("One More Thing")

- ❌ PRD grows to 50 features
- ✅ MVP stays <10 must-have features; others go to Phase 2
- 🛡️ Rule: "Is this MVP critical? If no → Phase 2 list"

### Pitfall 2: Vague Success Criteria

- ❌ "The site should be fast and accessible"
- ✅ "Lighthouse Performance >85, WCAG AA compliance, LCP <2.5s"
- 🛡️ Rule: Metrics must be measurable (numbers or automated checks)

### Pitfall 3: Ignoring Technical Constraints

- ❌ "Let's build with X, Y, Z tech" (contradicts architecture)
- ✅ SAD locks tech stack; no changes without team agreement
- 🛡️ Rule: SAD is binding for Phase 2

### Pitfall 4: Unspoken Assumptions

- ❌ Team assumes "product images are provided" but they're not sourced
- ✅ Assumptions.md explicitly lists: "Product images in products-grouped.json"
- 🛡️ Rule: Document every assumption; ask "what if it's wrong?"

### Pitfall 5: Rushing Phase 1

- ❌ "We'll define as we go in BUILD"
- ✅ Invest 1-2 weeks upfront to save 3-4 weeks in rework
- 🛡️ Rule: Phase 1 is investment; rushing it costs later

---

## Decision-Making in Phase 1

### How to Make Tech Decisions (SAD)

1. **List Options**: e.g., Framework: React, Vue, Svelte
2. **Evaluate Against Criteria**: Performance, team expertise, ecosystem, maintenance
3. **Document Trade-offs**: What do we gain? What do we lose?
4. **Choose One**: Make a clear decision (no "we'll decide in BUILD")
5. **Document Rationale**: Write it down in SAD

Example:

```
Decision: Framework Choice
Options: React, Vue, Svelte
Choice: React 18+
Rationale:
- Largest ecosystem (many UI libraries)
- Team experienced with React
- Performance comparable to Vue/Svelte for MVP scope
- Easier to scale with REST API in Phase 2
Trade-off: Slightly larger bundle than Svelte, but worth it for ecosystem
```

### How to Manage Scope (PRD)

1. **Gather All Feature Ideas**: Brainstorm with stakeholders
2. **Prioritize Using MoSCoW**:
   - Must-Have (MVP critical)
   - Should-Have (important, not MVP)
   - Could-Have (nice, but skip if time)
   - Won't-Do (Phase 2+ or never)
3. **MVP Rule**: <10 must-have features for fast delivery
4. **Document Phase 2 Backlog**: Nice-to-haves go to FUTUREs, not MVP

Example:

```
Feature: User Accounts

MVP Must-Have: NO
Phase 2+ Should-Have: YES
Rationale: MVP is Catalog + Contact. Auth needed for cart (Phase 2)
Deferral: Not blocking launch; adds 1 week to Phase 2
```

---

## Sign-Off & Approval

### PRD Sign-Off

- **Approver**: Product Manager
- **Reviewers**: Architects, Business Stakeholders
- **Format**: Signature block in PRD.md

```markdown
## Sign-Off

- [x] Product Manager (`@product-mgr`) - Approved April 12, 2026
- [x] Architect (`@architect`) - Approved April 12, 2026
- [x] Business Stakeholders - Approved April 12, 2026
```

### SAD Sign-Off

- **Approver**: Architect
- **Reviewers**: Frontend Lead, Backend Lead
- **Format**: Signature block in SAD.md

```markdown
## Sign-Off

- [x] Architect (`@architect`) - Approved April 12, 2026
- [x] Frontend Lead - Approved April 12, 2026
- [x] Backend Lead - Approved April 12, 2026
```

---

## Rules Enforcement

### Weekly Phase 1 Sync

- Every Monday during Phase 1, team syncs on progress
- Ensures artifacts stay on track
- Flags blockers early

### Artifact Reviews

- PRD review by Product Manager weekly
- SAD review by Architect weekly
- Assumptions review by full team mid-week

### Quality Gate Before BUILD

- No code written until PRD + SAD approved
- No PRD ambiguities
- No SAD uncertainties

---

## Phase 1 Timeline (Typical)

| Week | Phase 1 Activity                            | Owner          | Deliverable                   |
| ---- | ------------------------------------------- | -------------- | ----------------------------- |
| 1    | Market Research (Days 1-3)                  | `@product-mgr` | Draft MRD                     |
| 1-2  | Feature Collection & PRD (Days 4-7)         | `@product-mgr` | Draft PRD                     |
| 2    | Architecture & SAD (Days 8-10)              | `@architect`   | Draft SAD                     |
| 2    | Assumptions & Success Criteria (Days 10-11) | `@architect`   | Assumptions, Success Criteria |
| 2    | Stakeholder Review & Sign-Off (Day 12)      | All            | Approved artifacts            |
| 3    | Team Briefing & BUILD Kickoff               | All            | BUILD phase begins            |

---

## Rule Updates

As you learn more about the project, update these rules:

- If new scope emerges: Update PRD, cascade to SAD
- If tech constraint found: Update SAD immediately
- If timeline changes: Update Assumptions, restart sync
- If team changes: Update team capacity assumptions

Every update is a chance to prevent Phase 2 surprises.

---

**Remember**: Phase 1 is your insurance policy. Invest time now to save rework later.
