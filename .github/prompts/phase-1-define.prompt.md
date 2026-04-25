---
name: phase-1-define
description: "Use when: starting a new project, defining requirements, conducting market research, creating PRD/MRD, establishing success metrics. Kicks off Phase 1: DEFINE using the AAMAD framework."
model: gpt-4o
---

# Phase 1: DEFINE Workflow Prompt

**Project**: VIOMES S.A. Homepage  
**Phase**: 1. DEFINE (Product Manager + Architect)  
**Duration**: 1-2 weeks  
**Deliverables**: PRD, MRD, SAD, Assumptions, Success Criteria

---

## What is Phase 1: DEFINE?

This is the **requirements and architecture phase** where you:

- Research the market and understand user needs
- Define what to build (product requirements)
- Plan how to build it (solution architecture)
- Establish what "done" means (success metrics)

**Core Belief**: A well-defined problem is half solved. We invest time upfront to avoid rework later.

---

## How to Execute Phase 1

### Step 1: Start with Market Research (Days 1-3)

Delegate to `@product-mgr`:

```
I need to start Phase 1: DEFINE for the VIOMES homepage redesign.

Please create a **Market Research Document (MRD)** that includes:
1. Market segment analysis (corporate websites, B2B/B2C SaaS, etc.)
2. Competitive analysis (5-10 comparable websites)
3. User personas (3+ personas: corporate buyer, consumer, search engines)
4. Market trends (performance, accessibility, SEO, sustainability)
5. Go-to-market strategy

Focus on VIOMES S.A.'s unique value proposition: sustainable, high-quality products.

Output: Save to project-context/1.define/MRD.md
```

**Success**: MRD captures market context. Move to Step 2.

---

### Step 2: Define Product Requirements (Days 4-7)

Delegate to `@product-mgr`:

```
Using the MRD, please create a **Product Requirements Document (PRD)** that includes:

1. Feature list (organized by Must-Have MVP, Nice-to-Have Phase 2, Won't-Do)
   - Homepage / landing page
   - Product catalog with filters
   - Product detail pages
   - About, Contact, Sustainability pages
   - Responsive design

2. Success metrics (quantitative + qualitative)
   - Lighthouse performance score >85
   - WCAG 2.1 AA accessibility
   - Mobile responsiveness 100%
   - Conversion metrics (TBD with stakeholders)

3. User journeys (3 main flows)
   - Landing → Product browse → Contact
   - Search → Product detail → Contact/Wishlist
   - Brand research → About → Sustainability interest

4. Non-functional requirements
   - Performance targets
   - Browser support
   - Responsive design breakpoints
   - Accessibility standards

5. Constraints & assumptions
   - Tech stack locked (React, TypeScript, Tailwind, Vite)
   - Timeline: [to be filled]
   - Budget: [to be filled]
   - Team size: [to be filled]

6. Out-of-scope (explicit Phase 2+ items)
   - Shopping cart & checkout
   - User authentication
   - Admin dashboard

Output: Save to project-context/1.define/PRD.md
```

**Success**: PRD is crystal clear. Team understands exactly what to build.

---

### Step 3: Define Solution Architecture (Days 5-10)

Delegate to `@architect`:

```
Using the PRD, please create a **Solution Architecture Document (SAD)** that includes:

1. Technology stack (locked for Phase 1-2)
   - Framework: React 18+
   - Language: TypeScript 5.9+ (strict mode)
   - Styling: Tailwind CSS
   - Build tool: Vite
   - UI: shadcn/ui components
   - Testing: Vitest + React Testing Library
   - Hosting: Vercel or Netlify (TBD)

2. Component architecture
   - Directory structure (Layout, Pages, UI, Hooks, Lib)
   - Component tree visualization
   - Data flow diagram (products.json → components → display)
   - State management strategy (React hooks + Context)

3. Data model
   - Product interface
   - Category interface
   - Image handling strategy

4. Performance strategy
   - Lighthouse targets: >85
   - Core Web Vitals targets
   - Code splitting by route
   - Image optimization approach
   - Caching strategy

5. Scalability & accessibility
   - Support 100→1000+ products
   - WCAG 2.1 AA compliance approach
   - Keyboard navigation strategy

6. Decisions & rationale
   - Why React over Vue/Svelte?
   - Why Tailwind over styled-components?
   - Why Vite over Webpack?
   - Trade-offs documented

7. Risks & mitigation
   - Performance risk: Large images → Lazy load + WebP
   - Scalability risk: 1k products → Index search
   - Accessibility risk: Complex forms → Semantic HTML + testing

Output: Save to project-context/1.define/SAD.md
```

**Success**: SAD is detailed, feasible, and approved by engineering team.

---

### Step 4: Document Assumptions & Success Criteria (Days 8-10)

Delegate to `@architect`:

```
Please create **Assumptions & Constraints document** that includes:

1. Project assumptions
   - Technical (React ecosystem maturity, data format, hosting availability)
   - Business (market need, user behavior, competitive gap)
   - Team (skills available, capacity, timeline feasibility)
   - User (traffic volume, device split, conversion intent)

2. Project constraints
   - Technical (tech stack locked, ES6+ only, mobile-first)
   - Business (timeline, budget, scope limits)
   - Data (catalog size, image assets, real-time limitations)
   - Team (size, availability, skill gaps)

3. Risk assessment
   - What could go wrong?
   - How likely? How severe?
   - What will we do about it?

4. Known unknowns
   - Questions that need answering
   - Decisions deferred to Phase 2

Output: Save to project-context/1.define/ASSUMPTIONS.md
```

Then:

```
Please create **Success Criteria document** that defines:

1. Phase 1 completion checklist (when is DEFINE done?)
2. Phase 2 quality gates (when can BUILD start?)
3. Phase 3 quality gates (when can DELIVER start?)
4. High-level metrics (quantitative targets)
5. Known limitations in Phase 1 (acceptable, logged for Phase 2)

Output: Save to project-context/1.define/SUCCESS_CRITERIA.md
```

**Success**: All assumptions explicit. Quality gates clear. Team knows what "done" means.

---

### Step 5: Stakeholder Sign-Off (Day 11)

Call a brief stand-up with:

- Product Manager
- Architect
- Business stakeholders (if applicable)
- Engineering leads

**Agenda**:

1. Review PRD: Are priorities/scope correct?
2. Review SAD: Is architecture feasible?
3. Confirm timeline & budget
4. Get formal approval to proceed to BUILD

**Approval**: All signatures in each artifact (PRD, SAD, Assumptions, Success Criteria)

---

### Step 6: Handoff to Phase 2: BUILD (Day 12)

Update `.github/` files if new agents added:

```
1. Share all Define artifacts with Build team:
   - Put links to PRD, SAD, Assumptions, Success Criteria in team Slack
   - Schedule kickoff meeting with @frontend-eng, @backend-eng, @qa-eng

2. Create Build phase kickoff checklist:
   - [ ] All Define artifacts reviewed by team
   - [ ] Component breakdown validated
   - [ ] Data contracts agreed
   - [ ] Performance targets accepted
   - [ ] Build phase starts Monday

3. Log Phase 1 metrics:
   - Duration: ___ days
   - Artifacts completed: ✅ PRD, MRD, SAD, Assumptions, Success Criteria
   - Blockers encountered: None / [list]
   - Confidence level: 95%+
```

**Success**: Build team is ready. Phase 1 complete.

---

## Phase 1 Template Locations

All artifacts go in `project-context/1.define/`:

- `PRD.md` - Product Requirements Document
- `MRD.md` - Market Research Document
- `SAD.md` - Solution Architecture Document
- `ASSUMPTIONS.md` - Assumptions & Constraints
- `SUCCESS_CRITERIA.md` - Success Metrics & Quality Gates

Workflow tracking: `project-context/CHECKLIST.md`

---

## Common Phase 1 Questions

### "How long does Phase 1 take?"

- Typically 1-2 weeks for a mid-scope project like VIOMES homepage
- Depends on stakeholder availability and decision-making speed

### "Who should be involved?"

- **Product Manager**: Leads market research, PRD creation
- **Architect**: Leads SAD creation, technical feasibility review
- **Business stakeholders**: Provide market context, approve scope
- **Engineering leads**: Review SAD feasibility, flag technical risks

### "What if we don't know all the answers?"

- Document as assumptions, note for Phase 2
- Never block on unknowns — proceed with best estimate
- Assumptions are living documents; update as you learn

### "Can we skip Phase 1?"

- No. Skipping DEFINE almost always causes 2x rework in BUILD
- Even 1 week invested upfront saves 2-3 weeks rebuilding later

### "What if requirements change during Phase 1?"

- Update PRD/SAD, re-validate with team
- Phase 1 is the time to catch misalignment
- Ask "is this in MVP or Phase 2?" for each change

---

## Phase 1 Success Checklist

✅ **DEFINE is complete when you can answer**:

1. **Market Context**: Why are we building this? Who needs it? What problem does it solve?
2. **Requirements**: What features are MVP (must-have) vs Phase 2+ (nice-to-have)?
3. **Architecture**: How will we build it? What technology choices? Why?
4. **Success**: How will we know if we succeeded? What are the metrics?
5. **Constraints**: What's our timeline, budget, team size? What are the assumptions?

---

## Next Phase

When Phase 1 is complete and approved:

- ✅ Move to **Phase 2: BUILD**
- Delegate to `@frontend-eng`, `@backend-eng`, `@qa-eng`
- Focus on implementing per PRD/SAD

---

**Ready to start Phase 1: DEFINE?**

Type `/phase-1-define` or ask: "Let's start Phase 1: DEFINE for the VIOMES homepage redesign."

The Product Manager will guide you through market research, requirements definition, and architecture planning.
