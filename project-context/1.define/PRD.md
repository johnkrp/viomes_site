# Product Requirements Document (PRD) - VIOMES Homepage

**Project**: VIOMES S.A. Corporate Website  
**Phase**: 1. DEFINE  
**Owner**: `@product-mgr`  
**Status**: Draft  
**Last Updated**: April 2026

---

## Executive Summary

**VIOMES S.A.** — _Since 1982, manufacturing in Greece._

VIOMES is a 40+ year heritage manufacturer of high-quality plastic products for home and garden. This PRD defines the requirements for the **Phase 1 MVP website** that:

- ✅ Communicates VIOMES' heritage, quality, and sustainability positioning
- ✅ Drives **B2B lead generation** (wholesalers, distributors, professional buyers)
- ✅ Enables **B2C brand discovery** (end-consumers via search + social)
- ✅ Establishes **digital leadership** vs. competitors (most offline or outdated)
- ✅ Provides foundation for Phase 2 e-commerce expansion

**Phase 1 (MVP) Scope**: Product catalog showcase + sustainability storytelling + B2B lead capture (NO checkout, NO user accounts - Phase 2+)

**Key Success Metrics**:

- Lighthouse performance score: **>85** (SEO competitive advantage)
- WCAG 2.1 AA accessibility: **100% compliance** (legal requirement)
- Mobile responsiveness: **100%** (60%+ traffic is mobile)
- B2B Contact Form Conversion: **2-5%** (lead generation KPI)
- Page load time: **<2.5s** (mobile 3G constraint)

---

## Who We're Building For

### Primary Personas

#### 1. B2B Wholesaler / Distributor (PRIMARY - 40% of target audience)

- **Goal**: Evaluate VIOMES as reliable wholesale supplier; verify product range, capacity, pricing terms
- **Pain Points**: Needs detailed catalog, bulk pricing, company credibility (trust), mobile checks before meetings
- **Success Criteria**: Find product specs quickly, verify company heritage (40 years = stability), easy contact form to request wholesale terms
- **Device**: Desktop 80% (work hours) + mobile 20% (urgent checks before meetings)
- **Journey**: Google search ("wholesale planters", "VIOMES distributors") → Homepage credibility check → Product catalog review → Contact form → Sales follow-up
  Consumer / Homeowner (B2C) (SECONDARY - 40% of target audience)

- **Goal**: Find beautiful, durable planters; appreciate brand heritage and sustainability
- **Pain Points**: Poor product photos, unclear materials/durability, no brand story, slow sites
- **Success Criteria**: See high-quality images, understand product quality + sustainability commitment, read VIOMES story (40 years + Greek heritage)
- **Device**: Mobile 70% (inspiration + browsing) + desktop 30% (research + comparison)
- **Journey**: Pinterest/Instagram inspiration → Google search ("quality planters", "VIOMES products") → Homepage brand story → Product gallery → Contact for info or wishlistct categories, easy checkout
- \*\*Devicearch Engines / Crawlers (SYSTEM USER - 20% of evaluation criteria)

- **Goal**: Crawl, index, rank site for relevant keywords
- **Pain Points**: Slow pages (Core Web Vitals), poor semantics, missing metadata, no accessibility
- **Success Criteria**: Lighthouse >85, WCAG AA compliance, JSON-LD structured data, mobile-first indexing
- **Device**: Mobile crawler (standard — mobile-first indexing)
- **Keywords to Rank For**:
  - B2B: "wholesale planters", "VIOMES distributors", "bulk garden products"
  - B2C: "quality planters", "sustainable garden products", "durable plant containers"
  - Brand: "VIOMES", "VIOMES products", "Greek planters", "made in Greece"s, low accessibility
- **Success**: Fast Core Web Vitals, semantic HTML, rich metadata
- **Device**: Crawlers (no device affinity)

---

## Core Features

### Must-Have (MVP)

#### 1. Homepage / Landing Page

- [x] **Hero section** with tagline: "Since 1982, designing and manufacturing in Greece"
- [x] **Product showcase** with 6-8 featured product collections (Miami, Olympus, Professional, etc.)
- [x] **Heritage section**: "40+ years of quality and trust" + company story (values)
- [x] **Sustainability section**: VIOMES' environmental commitment + responsible practices (differentiator vs. Artevasi)
- [x] **Social proof**: Key stats (since 1982, Greek manufacturing, sustainable, quality focus)
- [x] **CTA buttons**: "Browse Catalog" (primary), "Request Wholesale Info" (B2B), "Learn About VIOMES"
- [x] **Testimonials/Trust indicators**: (Consumer choice award, credentials, certifications)
- [x] **Footer**: Company info, contact details, social media links, privacy policy

#### 2. Product Catalog / Browsing

- [x] **Product listing page** with grid (6 cols desktop → 3 cols tablet → 2 cols mobile)
- [x] **Filter sidebar**:
  - Category (Planters, Professional, Home & Garden, etc.)
  - Material (Plastic, Recycled, etc.)
  - Color (by available options)
  - Size range (small, medium, large)
- [x] **Sort options**: Featured, Name A-Z, Price (low-high), Newest
- [x] **Search bar** (global + within catalog) — target keywords: material, color, size
- [x] **Pagination/Lazy loading**: Support 100-500+ products
- [x] **Product gallery**: 4-6 high-res images (carousel, zoom on desktop, auto-rotate)
- [x] **Product specs**: Name, SKU, category, material, color, size (dimensions), weight
- [x] **Description**: Product benefits, use cases (e.g., "Perfect for modern interiors", "Weather-resistant", "Durable plastic")
- [x] **Key info**: In stock status, sustainability notes (e.g., "Recycled plastic", "Made in Greece")
- [x] **B2B pricing note**: "For bulk pricing and wholesale inquiries, please contact us" (CTA)
- [x] **Related products**: 4-6 similar products carousel (related category or material)
- [x] **Breadcrumb navigation**: Category > Subcategory > Product Name
- [x] **Next/Previous navigation**: Browse adjacent products
- [x] **Share buttons**: Social media sharing (optional — Phase 2+)es (carousel/gallery)
- [x] **Fixed navbar**: VIOMES logo (link to home), Menu (Products, About, Sustainability, Contact), Search icon, Language toggle (Greek/English)
- [x] **Mobile responsive menu**: Hamburger menu, full-screen menu on mobile (backdrop)
- [x] **Footer**:
  - Company info (VIOMES S.A., Athens, phone, email)
  - Quick links (About, Sustainability, Privacy, Terms)
  - Social media (Facebook, Instagram, LinkedIn, YouTube)
  - Newsletter signup (Phase 2+)
  - Copyright © 1982-2026
- [x] **About page**:
  - "Since 1982" tagline, company story (40+ years heritage)
  - Manufacturing expertise (materials science, equipment evolution, attention to detail)
  - Greek manufacturing positioning (precision, quality control, local economy)
  - Team/Leadership (optional — can be Phase 2+)
  - Awards/Recognitions (if any)

- [x] **Sustainability page**:
  - VIOMES' environmental philosophy (integrated across operations, not just marketing)
  - Responsible manufacturing practices
  - Sustainable materials / Phase 2+)

- [ ] Shopping cart & wishlist (Phase 2 - E-commerce)
- [ ] User accounts & saved products (Phase 2 - E-commerce)
- [ ] Product reviews & ratings (Phase 2+ - Community building)
- [ ] Multi-language support — additional languages beyond Greek/English (Phase 2+)
- [ ] Newsletter subscription (Phase 2 - Marketing automation)
- [ ] Live chat support (Phase 2+ - Customer service)
- [ ] Blog / news section (Phase 2+ - Content marketing)
- [ ] Video product tours (Phase 2+ - Rich media)
- [ ] Testimonials / customer stories (Phase 2+ - Social proof)Maps)
  - Response time expectation ("We'll respond within 24h")

- [x] **Legal pages**: Privacy Policy, Terms of Service (links in footer)
- [x] **Multi-language**: Greek + English (toggle in navbar)

#### 4. Navigation & Layout

- [ ] Fixed navbar with logo, menu, search, icons
- [ ] Responsive mobile menu (hamburger)
- [ ] Footer with company info, links, copyright
- [ ] Breadcrumb trails on category/product pages
- [ ] Scroll-to-top button

#### 5. About & Company Pages

- [ ] About page (company story, values, team, contact)
- [ ] Contact page (form + map)
- [ ] Sustainability page (environmental commitments)
- [ ] Privacy policy & terms of service

### Nice-to-Have (Post-MVP)

- [ ] Product reviews & ratings
- [ ] Shopping cart & wishlist
- [ ] User accounts & saved products
- [ ] Multi-language support (Greek, English)
- [ ] Newsletter subscription
- [ ] Live chat support
- [ ] Blog / news section

---

## Technical Requirements

### Performance

- **Lighthouse Score**: Target >85 (all sections)
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **Time to Interactive (TTI)**: <3.5s

### Accessibility

- **WCAG 2.1 Level AA** compliance minimum
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Color contrast ratios ≥4.5:1
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)

### Browser Support

- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+
- [ ] Mobile browsers (Chrome, Safari iOS)

### Responsive Design

- [ ] Mobile: 375px - 480px
- [ ] Tablet: 768px - 1024px
- [ ] Desktop: 1025px+
- [ ] Touch-target size: ≥48x48px

### Data & Content

- [ ] Product catalog: ~[X] products from `products-grouped.json`
- [ ] Multiple languages: Greek, English (initial)
- [ ] Currency support: EUR
- [ ] Images: catalog photos + marketing images

---

## Success Criteria & Metrics

### Quantitative - Phase 1 MVP Launch Targets

| Metric                           | Target                    | Measurement                           | Priority    |
| -------------------------------- | ------------------------- | ------------------------------------- | ----------- |
| **Lighthouse Performance**       | >85                       | Chrome DevTools (all pages)           | 🔴 CRITICAL |
| **Page Load Time (LCP)**         | <2.5s                     | PageSpeed Insights (mobile 3G)        | 🔴 CRITICAL |
| **WCAG AA Compliance**           | 100%                      | axe, WebAIM, screen reader testing    | 🔴 CRITICAL |
| **Mobile Responsiveness**        | 100%                      | iOS/Android testing (375px-2560px)    | 🔴 CRITICAL |
| **Core Web Vitals Score**        | >90                       | Chrome PageSpeed Insights             | 🔴 CRITICAL |
| **Search Indexing**              | Top 5 for target keywords | SEMrush/Ahrefs (3 months post-launch) | 🟠 HIGH     |
| **B2B Contact Form Submissions** | 80+/month                 | Form analytics (target by month 2)    | 🟠 HIGH     |
| **Monthly Organic Visitors**     | 8k-10k                    | Google Analytics (target by month 2)  | 🟠 HIGH     |
| **Bounce Rate**                  | <50%                      | GA, normalized by page type           | 🟡 MEDIUM   |
| **Avg Time-on-Site**             | >2 min                    | GA (indicating engagement)            | 🟡 MEDIUM   |
| **Test Coverage**                | >70%                      | Vitest + Istanbul (code coverage)     | 🔴 CRITICAL |
| **Accessibility Score**          | 100%                      | axe DevTools, Lighthouse              | 🔴 CRITICAL |

### Qualitative - Phase 1 MVP Assessment

- ✅ **Functionality**: All MVP features working without critical bugs
- ✅ **User Experience**: Navigation is intuitive; visitors can find products/contact form easily
- ✅ **Brand Consistency**: VIOMES heritage and sustainability messaging clear on every page
- ✅ **Code Quality**: TypeScript strict mode, zero ESLint errors, Prettier-formatted
- ✅ **Performance**: No images >200KB (optimized), no render-blocking resources,CDN-ready
- ✅ **Accessibility**: Passes automated + manual accessibility audits (keyboard nav, screen reader, color contrast)
- ✅ **Documentation**: README, component library, deployment guide documented

---

## Non-Functional Requirements

### Deployment & DevOps

- [x] **Hosting**: Vercel (recommended for React/Vite) OR Netlify
- [x] **CI/CD**: GitHub Actions (automated tests, Lighthouse CI, accessibility audits on every PR)
- [x] **Environments**: Production + Staging (for QA testing before launch)
- [x] **Testing**: Automated tests run on every PR; must pass before merge
- [x] **Rollback**: Git-based deployment allows rollback within 5 minutes if critical issue found
- [x] **Monitoring**: Sentry (error tracking) + Google Analytics (user behavior)
- [x] **Uptime Monitoring**: Uptime Robot or Vercel's built-in monitoring (target 99.5% SLA)

### Scalability

- [x] **Product Catalog**: Must support 100-500+ products without performance degradation
- [x] **Concurrent Users**: Designed to handle 10k+ concurrent visitors (via CDN + Vercel auto-scaling)
- [x] **SEO Readiness**: Static generation (SSG) or incremental static regeneration (ISR) for optimal crawling
- [x] **CDN Distribution**: Global asset delivery (Vercel CDN default)

### Security

- [x] **HTTPS/TLS**: All traffic encrypted (HTTPS enforced)
- [x] **Secrets Management**: No API keys/secrets in code (env variables via GitHub Secrets)
- [x] **CSRF Protection**: Form tokens for any server-side interactions
- [x] **XSS Prevention**: React's built-in XSS protection; input sanitization
- [x] **Data Privacy**: GDPR-compliant (privacy policy + cookie consent if analytics enabled)
- [x] **Security Audits**: npm audit regularly, dependency updates automated (Dependabot)
      x] **Error Tracking**: Sentry integration to catch runtime errors in production
- [x] **Performance Monitoring**: Real User Monitoring (RUM) data via Vercel Analytics
- [x] **Uptime Monitoring**: Automated checks (99.5% uptime target)
- [x] **Analytics**: Google Analytics 4 (if approved) - track B2B contact form submissions, product page views, bounce rate
- [x] **SEO Monitoring**: Google Search Console integration (track rankings for target keywordset)
- [ ] Performance monitoring (real user monitoring)
- [ ] Uptime monitoring (99.5% SLA)
- [ ] Analytics tPhase 2+ / Post-MVP)

**Explicitly NOT included in Phase 1 MVP:**

- ❌ **E-commerce features**: Shopping cart, checkout, payment processing (Phase 2)
- ❌ **User authentication**: User accounts, login, saved products (Phase 2)
- ❌ **Order management**: Order history, tracking, invoices (Phase 2+)
- ❌ **Admin dashboard**: Product management, inventory, analytics (Phase 2+)
- ❌ **Multi-language translation**: Only Greek + English (Phase 2+ for additional languages)
- ❌ **B2B Wholesale portal**: Tiered pricing, bulk ordering interface (Phase 2+)
- ❌ **Product reviews & ratings**: Community features (Phase 2+)
- ❌ **Content management system (CMS)**: Manual content updates OK for MVP (Phase 2+ for dynamic CMS)
- ❌ **Advanced analytics**: Heatmaps, session recording (Phase 2+ if budget approved)
- ❌ **Marketing automation**: Email campaigns, personalization (Phase 2+)
  (LOCKED): React 18+, TypeScript 5.9+, Tailwind CSS, Vite, shadcn/ui, Vitest
- **Node Environment**: Node 18+ LTS
- **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **No Backend Changes**: Use existing REST APIs or mock data from `products-grouped.json`
- **Frontend-Only**: No server-side rendering/backend modifications in Phase 1
- **Deployment**: Vercel/Netlify (no custom infrastructure needed)

### Business Constraints

- **Timeline**: 2 weeks (Phase 1: DEFINE complete by April 18, 2026; Phase 2: BUILD weeks of May)
- **Budget**: Fixed (no additional hiring; use existing team)
- **Team Capacity**:
  - 1x Product Manager (`@product-mgr`)
  - 1x System Architect (`@architect`)
  - 1x Frontend Engineer (`@frontend-eng`)
  - 1x QA Engineer (`@qa-eng`)
  - 0.5x DevOps support (`@devops-eng` - infrastructure only if needed)

### Business Assumptions

: BUILD

**Sign-Off Required Before BUILD Phase Proceeds**:

1. ✅ **Product Manager** (`@product-mgr`):
   - PRD approved, feature list complete, success metrics quantified
   - Market positioning and messaging validated

2. ✅ **System Architect** (`@architect`):
   - SAD (Solution Architecture Document) created
   - Tech stack decisions documented and approved
   - Performance strategy defined (how to achieve Lighthouse >85)

3. ✅ **Business Stakeholders / Leadership**:
   - Timeline, budget, team capacity confirmed
   - MVP scope approved (explicit agreement on Phase 2+ features)
   - Launch date locked (April 18 DEFINE phase completion; May START BUILD)

**Sign-Off Checklist**:

- [ ] PRD reviewed and approved with no TBDs
- [ ] SAD created and reviewed (no technical blockers identified)
- [ ] Assumptions validated (data access, team capacity, infra available)
- [ ] Team has access to all resources (product data, images, hosting account)
- [ ] Competitive positioning clear (vs. Artevasi, Capi, others)
- [ ] Success metrics documented and measurable

**Next Steps (Week 3+, BUILD Phase)**:

1. Frontend Engineer reviews component breakdown from SAD
2. Backend Engineer (if needed) validates data/API requirements
3. QA Engineer creates test plan from PRD requirements
4. Architect completes detailed technical specifications
5. **Team kickoff**: BUILD phase sprint planning (May timeline)

---

## Appendix

### A. Competitive Analysis (from MRD)

**Direct Competitor**: Artevasi (Portugal)

- Modern website, B2C-focused consumer brand
- **VIOMES advantage**: B2B wholesale positioning + 40-year Greek heritage

**Offline Competitors**: VASAR, Tera, Capi (website down)

- **VIOMES opportunity**: Digital leadership while competitors are offline

**Not Competitors**: Europlast, Plastecnics (industrial, not decorative)

See `project-context/1.define/MRD.md` for full competitive analysis.

### B. Product Data Reference

- **Catalog source**: `src/data/products-grouped.json`
- **Sample products**: ~100-500+ products across categories (Planters, Professional, Home & Garden, etc.)
- **Images**: Stored in `public/images/` (verify optimization before launch)
- **Categories**: [Verify actual category list from products-grouped.json]

### C. Analytics Targets (Phase 1)

| KPI                     | Target       | Tool              |
| ----------------------- | ------------ | ----------------- |
| Weekly Organic Visitors | 1.5k-2k      | Google Analytics  |
| B2B Contact Forms       | 15-20/week   | Form analytics    |
| Avg Session Duration    | 2+ minutes   | GA (by page type) |
| Bounce Rate             | <50% overall | GA                |
| Mobile Traffic %        | 60%+         | GA                |

### D. Future Roadmap (Phase 2+)

**Phase 2 (May-June 2026)**: E-commerce enablement

- Shopping cart + checkout
- User accounts + wishlists
- Payment processing (Stripe/PayPal)

**Phase 3 (Q3 2026)**: Scale & personalization

- B2B wholesale portal (tiered pricing, bulk ordering)
- Customer portal (order history, invoices)
- Advanced analytics (heatmaps, session recording)

1. Architect creates SAD (Solution Architecture Document)
2. Frontend Engineer reviews component breakdown
3. Backend Engineer identifies data requirements
4. QA Engineer creates test plan based on requirements
5. Move to Phase 2: BUILD

---

## Appendix

### A. Competitive Analysis

[To be filled with competitor site analysis]

### B. Wireframes / Mockups

[Link to Figma, Adobe XD, or sketch files]

### C. Analytics Targets

[Define KPIs, tracking events]

### D. Future Roadmap

[Post-launch features, major milestones]
