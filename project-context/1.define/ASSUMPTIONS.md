# Assumptions & Constraints - VIOMES Homepage

**Project**: VIOMES S.A. Corporate Website  
**Phase**: 1. DEFINE  
**Owner**: `@architect`  
**Status**: Draft  
**Last Updated**: April 2026

---

## Project Assumptions

### Technical Assumptions

- [x] **React & Vite Maturity**: React 18+ with Hooks + Vite 7.2+ support all MVP requirements
- [x] **Data Format**: Product catalog in `src/data/products-grouped.json` (100-500+ items) is stable and won't change during Phase 1
- [x] **Image Assets Available**: Product images stored in `public/images/` are optimized (<100KB per image)
- [x] **Hosting Platform**: Vercel or Netlify available, GitHub Actions CI/CD configured
- [x] **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions)
- [x] **No Complex Backend**: Phase 1 uses static JSON files; backend integration deferred to Phase 2
- [x] **TypeScript Strict Mode**: All code must pass `tsconfig.strict: true` (no `any`, proper typing)
- [x] **No Database Required**: Product catalog bundled with app; no need for MongoDB, PostgreSQL, etc. in Phase 1

### Business Assumptions

- [x] **Product Positioning Locked**: VIOMES messaging (40-year heritage, B2B focus, sustainability) will not change during Phase 1
- [x] **MVP Scope Approved**: B2B lead generation + B2C brand discovery (NO e-commerce, NO authentication, NO admin dashboard)
- [x] **Market Research Valid**: Artevasi identified as main competitor; other players offline; VIOMES has digital leadership opportunity
- [x] **Team Available**:
  - 1x Product Manager (PRD owner)
  - 1x Architect (SAD/performance owner)
  - 1x Frontend Engineer (implementation owner)
  - 1x QA Engineer (testing owner)
  - 0.5x DevOps (infrastructure, CI/CD)
- [x] **Timeline Realistic**: 2 weeks DEFINE phase possible with current artifact depth; 2 weeks BUILD phase for MVP development
- [x] **Budget Approved**: Fixed budget; no additional hiring; existing team capacity available
- [x] **Launch Date**: DEFINE complete by April 18, BUILD complete by May 2, 2026

### Data Assumptions

- [x] **Product Catalog**: Approximately 100-500+ products across categories (Planters, Professional, Home & Garden, etc.)
- [x] **Image Quality**: All product images pre-optimized for web (WebP format if available, JPEG fallback)
- [x] **No Product Changes**: Product line stable during Phase 1; new SKUs won't be added during development
- [x] **Catalog is Complete**: All products needed for launch are already in `products-grouped.json`; no gaps or missing data

### Infrastructure Assumptions

- [x] **Vercel / Netlify Available**: Hosting platform selected and configured; credentials available to team
- [x] **GitHub Actions Works**: CI/CD pipeline can run tests, linting, Lighthouse audits on every PR
- [x] **Domain Name**: viomes.com or viomes.gr available and DNS configured for Vercel/Netlify
- [x] **SSL/TLS**: HTTPS enforced; certificates auto-managed by hosting provider
- [x] **CDN Included**: Vercel/Netlify provides CDN; no additional CDN provider needed

---

## Explicit Constraints

### Scope Constraints

- ❌ **NOT INCLUDED Phase 1**: E-commerce (cart, checkout, payment), User authentication, Shopping history, Admin dashboard, Multi-language (only Greek/English)
- ✅ **INCLUDED Phase 1**: Product catalog, Product search/filter, B2B contact form, Company/Sustainability pages, Responsive design, SEO optimization
- ⏳ **Phase 2+**: Cart/Checkout, User accounts, Order history, Admin dashboard, Additional languages

### Technical Constraints

- **Framework**: React 18+ only (no Vue, Angular, others)
- **Language**: TypeScript 5.9+ strict mode (no JavaScript, no `any` types)
- **Styling**: Tailwind CSS only (no styled-components, CSS Modules, etc.)
- **Build Tool**: Vite 7.2+ only (no Webpack, Parcel, etc.)
- **Hosting**: Vercel or Netlify (no custom servers, no AWS EC2, etc.)
- **Data**: Static JSON files only in Phase 1 (no database)
- **Authentication**: None in Phase 1 (user accounts Phase 2+)

### Performance Constraints

- **Lighthouse Score**: MUST be >85 on all pages (not ≥85, but >85 — 90+ preferred)
- **WCAG Accessibility**: 100% WCAG 2.1 AA compliance (no WCAG A, must be AA)
- **Mobile Responsiveness**: Must work on 375px-2560px viewport widths
- **LCP (Largest Contentful Paint)**: Must be <2.5 seconds on mobile 3G (not <3s or <2s, but <2.5s)
- **FCP (First Contentful Paint)**: Must be <1.5 seconds
- **CLS (Cumulative Layout Shift)**: Must be <0.1 (no visual jumps/reflows)
- **Test Coverage**: Must be >70% (not ≥70%, but >70%)

### Timeline Constraints

- **DEFINE Phase**: April 9-18 (10 days including weekends)
- **BUILD Phase**: April 19 - May 2 (2 weeks)
- **Launch Target**: May 2, 2026 (hard deadline)
- **No Extensions**: Phase 1 MVP must launch on schedule; Phase 2 features deferred if needed

### Team Constraints

- **No Hiring**: Use existing team only (no contractors, no new hires in Phase 1)
- **Capacity**: Fixed FTE allocation; no overtime expected
- **Experience**: Team is familiar with React/TypeScript/Tailwind (assume competency)
- **Availability**: Team commits full-time to Phase 1; no context switching to other projects

### Budget Constraints

- **Fixed Budget**: No additional spend beyond existing infrastructure costs
- **Hosting**: Vercel/Netlify cost assumed ~$20-100/month (within existing budget)
- **Tools**: Use free/existing tools (GitHub, npm, Sentry free tier, etc.)
- **Licences**: No additional software licenses needed

---

## Risk Mitigations

### Performance Risk

**Assumption**: Lighthouse >85 is achievable with code splitting + image optimization  
**Mitigation**: Weekly Lighthouse CI checks; performance audit in Week 1; fail PRs that drop below target

### Accessibility Risk

**Assumption**: shadcn/ui components are WCAG AA compliant out-of-the-box  
**Mitigation**: Weekly a11y audits; axe-core CI checks; manual keyboard/screen reader testing

### Scope Creep Risk

**Assumption**: MVP features (catalog, contact form, B2B lead gen) will NOT expand mid-phase  
**Mitigation**: Explicit out-of-scope document; strict PR review; feature requests deferred to Phase 2

### Data Quality Risk

**Assumption**: products-grouped.json is complete and won't change during Phase 1  
**Mitigation**: Data snapshot at Day 1; track data changes; communicat updates immediately if needed

### Team Availability Risk

**Assumption**: All 4-5 team members remain available for 2 weeks without emergency pulls  
**Mitigation**: Weekly standup; blockers flagged immediately; escalation process defined

### Timeline Risk

**Assumption**: 2 weeks is sufficient for DEFINE + BUILD + QA launch  
**Mitigation**: Daily progress tracking; fail early if timeline in jeopardy; Phase 2 features deferred

---

## Validation Checklist (Before BUILD Phase)

- [ ] **Product Manager**: PRD reviewed, feature list final, success metrics quantified
- [ ] **Architect**: SAD approved, no technical blockers, performance strategy validated
- [ ] **Frontend Lead**: Component breakdown agreed, dependencies installed, development environment ready
- [ ] **QA Lead**: Test plan created, test data prepared, acceptance criteria defined
- [ ] **DevOps**: Hosting configured, CI/CD pipeline active, rollback procedure tested
- [ ] **Business**: Timeline confirmed, budget approved, team capacity locked

---

## Sign-Off

By signing below, stakeholders confirm that:

1. All assumptions documented above are correct
2. All constraints are understood and acceptable
3. No hidden blockers or unknowns remain
4. Team is ready to proceed to BUILD phase

| Role            | Name            | Date     | Signature  |
| --------------- | --------------- | -------- | ---------- |
| Product Manager | `@product-mgr`  | April 18 | **\_\_\_** |
| Architect       | `@architect`    | April 18 | **\_\_\_** |
| Frontend Lead   | `@frontend-eng` | April 18 | **\_\_\_** |
| QA Lead         | `@qa-eng`       | April 18 | **\_\_\_** |
| Business / CTO  | [TBD]           | April 18 | **\_\_\_** |

---

## Notes

- This document will be reviewed and updated during Phase 1
- Any changes to assumptions must be communicated to entire team immediately
- If an assumption proves false, escalate to leadership before proceeding
- This is a living document; update as new information emerges

### Business Assumptions

- [ ] **Market Need**: Corporate website redesign will improve lead generation and brand perception
- [ ] **User Behavior**: Visitors prefer mobile-friendly, fast-loading experiences
- [ ] **Competitive Gap**: VIOMES sustainability story is a differentiator worth highlighting
- [ ] **Timeline Feasibility**: MVP can be delivered in [X weeks] with current team capacity
- [ ] **Budget Allocation**: Sufficient budget for hosting, CDN, and any premium tools

### Team Assumptions

- [ ] **Skills Available**: Team has React, TypeScript, Tailwind expertise
- [ ] **Capacity**: Team can dedicate [X hours/week] to this project
- [ ] **Communication**: Daily standups and weekly reviews happen on schedule
- [ ] **Decision Making**: Product Manager + Architect can approve quickly

### User Assumptions

- [ ] **Traffic Volume**: Initial: 1k-10k monthly visitors; scale to 50k+ in Year 1
- [ ] **Device Split**: 60% mobile, 30% desktop, 10% tablet
- [ ] **Geography**: Primary traffic from EU (Greece + surrounding regions)
- [ ] **Conversion Intent**: B2B buyers serious about product research; B2C browsers moderate intent

---

## Project Constraints

### Technical Constraints

- **Tech Stack Locked**: React, TypeScript, Tailwind, Vite — no framework changes without re-architecting
- **Browser Support**: ES6+ only; no IE11 support
- **Mobile-First**: Must support 375px+ (smallest mobile)
- **Performance Ceiling**: Lighthouse >85 is hard target; <2.5s LCP is non-negotiable
- **Accessibility Baseline**: WCAG 2.1 AA minimum; AAA desirable but not required
- **State Management**: React Context + Hooks only; no Redux or MobX

### Business Constraints

- **Timeline**: [Define deadline — e.g., "Must launch by June 15, 2026"]
- **Budget**: [Define budget range — e.g., "$X-Y for hosting + tools for 6 months"]
- **Scope**: MVP only (no checkout, auth, or admin dashboard in Phase 1)
- **Content**: Existing product images and descriptions used; no new photography budget Phase 1

### Data Constraints

- **Product Catalog Size**: Currently ~100-300 products; designed to handle 1k+
- **Image Assets**: Stored locally or on CDN; no dynamic image generation
- **Real-Time Updates**: Phase 1 static only; Phase 2+ will enable dynamic updates
- **Multi-Language**: English & Greek only Phase 1; other languages in Phase 2+

### Team Constraints

- **Size**: [Define team size — e.g., "1 Frontend, 1 Backend, 1 QA"]
- **Availability**: [Define availability — e.g., "No team members until May 1"]
- **Skill Gaps**: [Define — e.g., "No Accessibility specialist; external audit required"]
- **Communication**: Sprint planning Mondays, code reviews Wednesdays

### Deployment Constraints

- **Hosting**: Vercel / Netlify only (no custom servers Phase 1)
- **CI/CD**: GitHub Actions for automation
- **Database**: None Phase 1; backend database in Phase 2+
- **Staging Environment**: Pre-production testing required before main

---

## Acceptance Criteria per Constraint

| Constraint          | Acceptance Criteria                              |
| ------------------- | ------------------------------------------------ |
| **Lighthouse >85**  | All pages score ≥85 in Performance category      |
| **LCP <2.5s**       | Real-world testing on mobile 3G network          |
| **WCAG AA**         | axe DevTools audit passes; no errors/warnings    |
| **Mobile Support**  | Functional 375px-480px; tested on actual devices |
| **Product Load**    | <100ms to render 300+ products                   |
| **Conversion Form** | <500ms response time on contact form             |

---

## Risk Mitigation for Each Constraint

| Constraint         | Risk                           | Mitigation                                                      |
| ------------------ | ------------------------------ | --------------------------------------------------------------- |
| **Lighthouse >85** | Hard to meet with large images | Image optimization, lazy loading, code splitting                |
| **WCAG AA**        | Manual testing tedious         | Automated axe + manual testing, accessibility specialist review |
| **Team Size**      | Bottlenecks                    | Clear division of labor, pair programming where needed          |
| **Timeline**       | Scope creep                    | Fixed PR at end of each phase, say "no" to Phase 2 items        |
| **Budget**         | Overspend on tools             | Use free tier; minimal paid services until Phase 2              |

---

## Known Unknowns / Questions

### Clarification Needed

- [ ] **Exact launch deadline**: Is June 2026 fixed or flexible?
- [ ] **Conversion goal**: Lead generation vs. direct sales — how to measure success?
- [ ] **SEO importance**: Must rank for specific keywords? What's the priority?
- [ ] **Multi-language scope**: Only English & Greek, or add others Phase 1?
- [ ] **Mobile app**: Separate React Native app needed, or web-only Phase 1?
- [ ] **Admin dashboard**: Who updates product data? Manual uploads or CMS?

### To Be Decided in Phase 2

- [ ] Shopping cart & checkout flow
- [ ] User authentication & accounts
- [ ] Backend API & database selection
- [ ] Real-time inventory sync
- [ ] Payment processing (Stripe, PayPal, etc.)

---

## Definition of "Done" for Define Phase

- [ ] All 5 Define documents complete (PRD, MRD, SAD, Assumptions, Success Criteria)
- [ ] Team questions answered above
- [ ] Stakeholders reviewed and approved
- [ ] No blockers to Build phase
- [ ] Component breakdown validated
- [ ] Data models agreed
- [ ] Performance targets set & accepted

---

## Sign-Off

**Reviewed & Approved By**:

- [ ] Product Manager (`@product-mgr`)
- [ ] System Architect (`@architect`)
- [ ] Frontend Lead
- [ ] Business Stakeholders

**Date Approved**: **\*\***\_\_\_\_**\*\***
