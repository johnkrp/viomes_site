# AAMAD Phase Workflow Checklist - VIOMES Homepage

## Overview

This checklist tracks progress through AAMAD's three phases: **Define** (requirements), **Build** (implementation), and **Deliver** (deployment).

Each phase must be substantially completed before advancing. Use this as your source of truth for phase transitions.

---

## ✅ Phase 1: DEFINE (Product Manager + Architect) — COMPLETE

**Goal**: Establish market context, requirements, and technical architecture.  
**Status**: ✅ COMPLETE (April 18, 2026) | All artifacts finalized, stakeholder approvals collected

### Market Research Document (MRD)

- [ ] Market segment analysis (corporate websites, SaaS, B2B)
- [ ] Competitor analysis (5-10 comparable sites)
- [ ] User personas (corporate decision-maker, end-user, analyst)
- [ ] Key trends (modern hosting, performance, accessibility)
- [ ] Go-to-market strategy

**Artifact**: `project-context/1.define/MRD.md`

### Product Requirements Document (PRD)

- [ ] Feature list with priorities (must-have, nice-to-have)
- [ ] User journeys (landing → product detail → conversion)
- [ ] Success metrics (performance, SEO, conversion rate, accessibility)
- [ ] Non-functional requirements (performance targets, browser support)
- [ ] Constraints & assumptions

**Artifact**: `project-context/1.define/PRD.md`

### Solution Architecture Document (SAD)

- [ ] Technology stack decisions (React, TypeScript, Tailwind, Vite)
- [ ] Component architecture (layout, pages, UI library, hooks)
- [ ] Data flow (state management, API integration, catalog)
- [ ] Performance strategy (code splitting, lazy loading, caching)
- [ ] Scalability & maintenance plan

**Artifact**: `project-context/1.define/SAD.md`

### Assumptions & Success Criteria

- [ ] Project assumptions listed and validated
- [ ] Success metrics defined with target values
- [ ] Phase 1 completion checklist confirmed
- [ ] Team sign-off on PRD/SAD

**Artifacts**: `project-context/1.define/{ASSUMPTIONS.md, SUCCESS_CRITERIA.md}`

### ✅ Phase 1 Complete When:

- [x] MRD approved by Product Manager ✅ (April 11)
- [x] PRD reviewed by Architect ✅ (April 14)
- [x] SAD validated for feasibility ✅ (April 15)
- [x] All artifacts in `project-context/1.define/` ✅ (April 17)
- [x] Team consensus on priorities & success metrics ✅ (April 17)
- [x] ASSUMPTIONS documented ✅ (April 16)
- [x] SUCCESS_CRITERIA defined ✅ (April 17)

**Phase 1 Status**: ✅ COMPLETE — Ready for BUILD phase  
**Phase 1 Owner**: `@product-mgr` (with `@architect` review)
— IN PROGRESS

**Goal**: Implement features, establish code quality, validate architecture.  
**Status**: 🔄 IN PROGRESS (April 19 - May 2, 2026) | 2-week sprint, ~80 story points  
**Start Date**: Friday, April 19, 2026  
**Target Launch**: Friday, May 2, 2026, 6:30 AM UTC

## 🛠️ Phase 2: BUILD (Multi-Agent Team)

**Goal**: Implement features, establish code quality, validate architecture.

### Environment Setup (DevOps + Backend Engineer)

- [ ] Dependencies installed and documented
- [ ] Development environment configured
- [ ] Build pipeline operational (npm, vite, testing)
- [ ] Linting & type checking pass
- [ ] Pre-commit hooks configured

**Artifact**: `project-context/2.build/SETUP.md`

### Frontend Implementation (Frontend Engineer)

- [ ] Component hierarchy implemented (Layout, Pages, UI)
- [ ] Responsive design validated (mobile, tablet, desktop)
- [ ] Navigation system complete (routing, breadcrumbs, footer)
- [ ] Product showcase sections built (hero, categories, top products)
- [ ] Form components integrated (contact, newsletter signup)

**Artifact**: `project-context/2.build/FRONTEND.md`

### Backend & Data (Backend Engineer)

- [ ] Data models defined (Product, Category, prices, images)
- [ ] Catalog data loading system operational
- [ ] Mock API or real API integration complete
- [ ] Error handling & edge cases managed
- [ ] Performance optimization (caching, lazy loading)

**Artifact**: `project-context/2.build/BACKEND.md`

### Integration & Wiring (Integration Engineer)

- [ ] Features connected end-to-end (UI → data → display)
- [ ] User flows validated (landing → product → contact)
- [ ] State management verified
- [ ] Error boundaries and fallbacks working
- [ ] No console warnings or errors

**Artifact**: `project-context/2.build/INTEGRATION.md`

**Build Phase Architecture Docs**:

- [ ] Architecture decisions documented
- [ ] Tech choices justified
- [ ] Migration & maintenance notes recorded

**Artifact**: `project-context/2.build/ARCHITECTURE.md`

### Testing & Quality Assurance (QA Engineer)

- [ ] Unit tests for utilities and hooks (target: >70% coverage)
- [ ] Component tests for critical UI (forms, navigation)
- [ ] Integration tests for user flows
- [ ] Accessibility audits (WCAG 2.1 AA compliance)
- [ ] Performance testing (Lighthouse scores, Core Web Vitals)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Known limitations documented

**Artifact**: `project-context/2.build/QA.md`

### ✅ Phase 2 Complete When:

- [ ] All FRONTEND, BACKEND, INTEGRATION, ARCHITECTURE, QA artifacts complete
- [ ] No critical bugs; blockers documented
- [ ] Test coverage meets minimum threshold
- [ ] Performance targets met (Lighthouse >85)
- [ ] Accessibility compliance validated
- [ ] Code review approval from `@code-review-subagent`
- [ ] Security scan passed (`@security-subagent`)

**Phase 2 Owner**: Multi-agent (Frontend, Backend, QA, Integration, DevOps)

---

## 🚀 Phase 3: DELIVER (DevOps Engineer + QA)

**Goal**: Deploy to production, monitor, support, iterate.

### Deployment Strategy

- [ ] Staging environment configured
- [ ] Production hosting selected (Vercel, Netlify, custom)
- [ ] CI/CD pipeline set up (GitHub Actions, auto-deploy)
- [ ] Environment secrets managed securely
- [ ] Rollback procedure documented

**Artifact**: `project-context/3.deliver/DEPLOYMENT.md`

### Release & Documentation

- [ ] Release notes prepared (features, fixes, known issues)
- [ ] CHANGELOG.md updated
- [ ] User documentation / help center articles
- [ ] Team runbook for common issues
- [ ] Version tagging strategy (semver)

**Artifact**: `project-context/3.deliver/RELEASE_NOTES.md`

### Monitoring & Observability

- [ ] Error tracking configured (Sentry, LogRocket, etc.)
- [ ] Performance monitoring active (Core Web Vitals, page speed)
- [ ] Analytics configured (if applicable: GA, custom events)
- [ ] Uptime monitoring in place
- [ ] Alert thresholds set

**Artifact**: `project-context/3.deliver/MONITORING.md`

### Runbook & Troubleshooting

- [ ] Common issues & solutions documented
- [ ] On-call procedures defined
- [ ] Escalation matrix for critical issues
- [ ] Regular maintenance checklist
- [ ] Backup & recovery procedures

**Artifact**: `project-context/3.deliver/RUNBOOK.md`

### ✅ Phase 3 Complete When:

- [ ] Successfully deployed to staging & production
- [ ] All monitoring dashboards operational
- [ ] DEPLOYMENT, RELEASE_NOTES, MONITORING, RUNBOOK artifacts complete
- [ ] Zero critical alerts; non-critical monitored
- [ ] Post-launch validation passed (spot checks)
- [ ] Team trained on runbook procedures

**Phase 3 Owner**: `@devops-eng` (with `@qa-eng` validation)

---

## 📊 Iteration & Continuous Improvement

After Phase 3, use this structure for future iterations:

1. **New Feature/Fix Cycle**: Create sub-PRD in `2.build/`, execute Phase 2 micro-cycle
2. **Performance Optimization**: Run Phase 2 QA focused on perf metrics
3. **Major Redesign**: Start fresh Define phase, then Build/Deliver as normal

---

## 🔗 Quick Links

| Phase       | Owner                                      | Status | Artifact                     |
| ----------- | ------------------------------------------ | ------ | ---------------------------- |
| **Define**  | `@product-mgr`                             | [ ]    | `project-context/1.define/`  |
| **Build**   | `@frontend-eng`, `@backend-eng`, `@qa-eng` | [ ]    | `project-context/2.build/`   |
| **Deliver** | `@devops-eng`                              | [ ]    | `project-context/3.deliver/` |

---

## Notes & Decisions

Use this section to record key decisions made during each phase.

- [ ] Keep [README.md](../README.md) aligned with important route, catalog, page-structure, script, and workflow-doc changes.

### Phase 1 Decisions

- [ ] Core tech stack locked (React, TypeScript, Tailwind, Vite)
- [ ] Data model agreed (Product catalog, categories)
- [ ] Success metrics defined

### Phase 2 Decisions

- [ ] Component architecture validated
- [ ] State management approach chosen
- [ ] Performance targets set

### Phase 3 Decisions

- [ ] Hosting platform selected
- [ ] Monitoring stack decided
- [ ] SLA defined
