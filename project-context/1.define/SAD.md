# Solution Architecture Document (SAD) - VIOMES Homepage

**Project**: VIOMES S.A. Corporate Website  
**Phase**: 1. DEFINE → 2. BUILD  
**Owner**: `@architect`  
**Status**: Draft  
**Last Updated**: April 2026

---

## Executive Summary

This SAD documents a **high-performance, accessibility-first React SPA** for VIOMES Phase 1 MVP. Key architectural commitments:

- ✅ **Lighthouse >85** via code splitting, lazy loading, image optimization, and critical CSS inlining
- ✅ **WCAG AA 100%** compliance built into component layer (shadcn/ui pre-tested)
- ✅ **Scalability**: 100 → 500+ products via efficient filtering, pagination, and static generation
- ✅ **SEO-Friendly**: Static HTML generation (SSG) ensures crawlability; JSON-LD structured data
- ✅ **Zero Backend**: Product data bundled (products-grouped.json), no database queries in Phase 1
- ✅ **Fast Time-to-Market**: shadcn/ui accelerates development; Vite enables 10x faster HMR

This architecture prioritizes **delivery speed** (2-week MVP) while maintaining **quality standards** (Lighthouse >85, WCAG AA) required for B2B credibility and organic search rankings.

---

## Technology Stack

### Frontend

| Category          | Technology                     | Version | Rationale                                           |
| ----------------- | ------------------------------ | ------- | --------------------------------------------------- |
| **Framework**     | React                          | 18+     | Component-based, large ecosystem, performance       |
| **Language**      | TypeScript                     | 5.9+    | Type safety, better DX, fewer runtime errors        |
| **Styling**       | Tailwind CSS                   | Latest  | Utility-first, rapid development, consistent design |
| **Build Tool**    | Vite                           | 7.2+    | Fast HMR, optimized builds, modern ES modules       |
| **UI Components** | shadcn/ui                      | Latest  | Radix-based, accessible, customizable               |
| **Form Handling** | React Hook Form                | 7+      | Lightweight, performant, good DX                    |
| **Testing**       | Vitest + React Testing Library | Latest  | Fast unit/component tests, standard tools           |
| **Linting**       | ESLint + Prettier              | Latest  | Code consistency, auto-formatting                   |

### Backend / Data

| Category              | Technology               | Purpose                         |
| --------------------- | ------------------------ | ------------------------------- |
| **Data Source**       | `products-grouped.json`  | Product catalog, categories     |
| **Additional Images** | `additional-images.json` | Marketing images, gallery       |
| **API**               | REST / Mock (Phase 1)    | Product list, search, filtering |
| **Authentication**    | [None - Phase 1]         | Planned for Phase 2             |
| **Database**          | [N/A - Phase 1]          | Planned for Phase 2             |

### Hosting & DevOps

| Category           | Technology                   | Rationale                             |
| ------------------ | ---------------------------- | ------------------------------------- |
| **Hosting**        | Vercel / Netlify / [TBD]     | Fast edge deployment, auto-scaling    |
| **CI/CD**          | GitHub Actions               | Integrated with repo, free for public |
| **Error Tracking** | Sentry (optional)            | Error monitoring & debugging          |
| **Analytics**      | Google Analytics / Plausible | User behavior tracking                |
| **CDN**            | Vercel / Cloudflare          | Global asset distribution             |

---

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        VIOMES Homepage                       │
├─────────────────────────────────────────────────────────────┤
│  Browser / Mobile App                                       │
│  ├─ React SPA (UI Layer)                                    │
│  │  ├─ Layout (Navbar, Footer, ScrollToTop)               │
│  │  ├─ Pages (Home, Products, ProductDetail, About)       │
│  │  └─ Components (ui/ library from shadcn)               │
│  │                                                          │
│  ├─ State Management (React hooks + Context)              │
│  └─ Styling (Tailwind CSS)                               │
└──────────┬──────────────────────────────────────────────────┘
           │ HTTPS
┌──────────▼──────────────────────────────────────────────────┐
│            Data & API Layer (Phase 1)                       │
├────────────────────────────────────────────────────────────┤
│  ├─ products-grouped.json (static catalog)                 │
│  ├─ additional-images.json (marketing images)             │
│  └─ Mock API endpoints (for testing)                       │
└──────────┬──────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────┐
│              Static Assets (CDN)                            │
├────────────────────────────────────────────────────────────┤
│  ├─ Product images                                         │
│  ├─ Marketing images                                       │
│  ├─ CSS bundles (Tailwind)                                 │
│  ├─ JavaScript bundles (chunks)                            │
│  └─ Fonts & icons                                          │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Directory Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Top navigation bar
│   │   ├── Footer.tsx              # Footer component
│   │   ├── Layout.tsx              # Main layout wrapper
│   │   ├── ScrollToTop.tsx         # Scroll-to-top button
│   │   └── navbar/                 # Navbar subcomponents
│   │       ├── MobileMenu.tsx
│   │       ├── DesktopMenu.tsx
│   │       └── LanguageToggle.tsx
│   │
│   ├── home/
│   │   ├── CategoriesShowcaseSection.tsx   # Category display
│   │   ├── TopProductsSection.tsx          # Featured products
│   │   ├── SustainabilitySection.tsx       # Eco messaging
│   │   └── homeData.ts                     # Homepage constants
│   │
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       └── ... (40+ reusable components)
│
├── pages/
│   ├── Home.tsx                    # Landing page
│   ├── Products.tsx                # Product listing
│   ├── ProductDetail.tsx           # Single product detail
│   ├── About.tsx                   # Company info
│   ├── Contact.tsx                 # Contact form
│   └── Sustainability.tsx          # Env commitments
│
├── hooks/
│   ├── use-mobile.tsx              # Mobile detection
│   ├── use-products.ts             # Product data fetching
│   └── use-filters.ts              # Filtering state
│
├── lib/
│   ├── catalogDataLoader.ts        # Load products.json
│   ├── catalogTypes.ts             # TypeScript types
│   ├── colorSwatch.ts              # Color utilities
│   ├── productCategories.ts        # Category definitions
│   ├── utils.ts                    # General utilities
│   └── testPackshotOverrides.ts   # Test mock data
│
├── data/
│   ├── products-grouped.json       # Product catalog
│   ├── additional-images.json      # Marketing images
│   └── [API responses from mock]
│
├── App.tsx                         # Root component + routing
├── main.tsx                        # Entry point
└── index.css                       # Global styles
```

### Component Tree

```
<Layout>
  ├─ <Navbar />
  │   ├─ Logo
  │   ├─ DesktopMenu / MobileMenu
  │   ├─ LanguageToggle
  │   └─ Icons (Search, Cart, User)
  │
  ├─ <Routes>
  │   ├─ <Home />
  │   │   ├─ Hero section
  │   │   ├─ <CategoriesShowcaseSection />
  │   │   ├─ <TopProductsSection />
  │   │   ├─ <SustainabilitySection />
  │   │   └─ CTA buttons
  │   │
  │   ├─ <Products />
  │   │   ├─ Breadcrumbs
  │   │   ├─ Filters (category, sort)
  │   │   ├─ Search box
  │   │   ├─ Grid/List toggle
  │   │   └─ Product cards (infinite scroll / pagination)
  │   │
  │   ├─ <ProductDetail />
  │   │   ├─ Breadcrumbs
  │   │   ├─ Image gallery / carousel
  │   │   ├─ Product specs
  │   │   ├─ Related products
  │   │   └─ CTA (Contact / Add to Cart)
  │   │
  │   └─ <About />, <Contact />, <Sustainability />
  │
  └─ <Footer />
      ├─ Links
      ├─ Social media
      └─ Copyright
```

---

## Data Flow

### Product Discovery Flow

```
User → Search / Navigate → Products Page
  ↓
Load products-grouped.json (cached)
  ↓
Apply filters (category, price, sort)
  ↓
Display filtered product cards
  ↓
Click product → ProductDetail page
  ↓
Load product image gallery
  ↓
Show related products → back to step 1 or contact
```

### State Management Strategy

- **React Hooks**: Local component state (forms, toggles)
- **Context API**: Global state for:
  - Language / localization
  - User device preferences
  - Cart (Phase 2)
  - User session (Phase 2)
- **URL State**: Category filters, search query, pagination (via URL params)
- **Local Storage**: Persistent user preferences (language, cart)

### Data Loading Strategy

```
Phase 1 (Now):
├─ Static JSON files (products-grouped.json, additional-images.json)
├─ Loaded at build time OR on first page load
├─ Cached by CDN / browser
└─ No database needed

Phase 2 (Future):
├─ REST API endpoints
├─ Database backing (MongoDB, PostgreSQL, etc.)
├─ Real-time updates for inventory
└─ Authentication layer
```

---

## Performance Strategy

### Code Splitting & Lazy Loading

```typescript
// Route-based code splitting
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

// Component-level lazy loading for heavy components
const Gallery = lazy(() => import("./components/Gallery"));
```

### Image Optimization

- [ ] WebP format with PNG fallback
- [ ] Responsive images (`srcset`)
- [ ] Lazy loading for below-fold images
- [ ] CDN compression
- [ ] Size target: <50KB per product image

### Bundle Optimization

- [ ] Tree-shaking enabled (Vite default)
- [ ] CSS purging (Tailwind)
- [ ] Minification (Vite)
- [ ] Compression (gzip, brotli)
- [ ] Target: Main bundle <80KB (gzipped)

### Caching Strategy

| Asset Type | Cache Duration | CDN | Browser   |
| ---------- | -------------- | --- | --------- |
| HTML       | 1 hour         | No  | 5 minutes |
| JS/CSS     | 12 months      | Yes | 12 months |
| Images     | 30 days        | Yes | 30 days   |
| JSON       | 1 day          | Yes | 1 day     |

### Performance Targets

| Metric                   | Target | Tool               |
| ------------------------ | ------ | ------------------ |
| Lighthouse Score         | >85    | PageSpeed Insights |
| First Contentful Paint   | <1.5s  | Lighthouse         |
| Largest Contentful Paint | <2.5s  | Lighthouse         |
| Time to Interactive      | <3.5s  | Lighthouse         |
| Cumulative Layout Shift  | <0.1   | Lighthouse         |

---

## Scalability & Maintenance

### Horizontal Scaling

- **CDN Distribution**: Vercel / Netlify auto-scale
- **Product Catalog**: Start with 100 products, designed to handle 1k+
- **Traffic**: Supports 10k+ concurrent users via CDN edge

### Code Organization

- **Modular Components**: Each page/feature self-contained
- **Type Safety**: TypeScript strict mode
- **Testing**: Unit tests for utils, component tests for critical UI
- **Documentation**: JSDoc, README, inline comments

### Maintenance Plan

- **Dependency Updates**: Monthly security patches, quarterly minor/major
- **Performance Monitoring**: Lighthouse CI on each PR
- **Bug Fixes**: Prioritized by severity, hotfixed if needed
- **Feature Requests**: Collected for Phase 2+

---

## Security Considerations

### Frontend Security

- [ ] HTTPS/TLS encryption
- [ ] Content Security Policy (CSP) headers
- [ ] XSS prevention (React's default escaping)
- [ ] CSRF tokens on forms (Phase 2)
- [ ] No sensitive data in localStorage without encryption

### Data Security

- [ ] No API keys / secrets in code
- [ ] Environment variables for config
- [ ] Regular dependency scanning (npm audit)
- [ ] Security headers configured on server

### Compliance

- [ ] GDPR consent (if tracking enabled)
- [ ] CCPA privacy options (if applicable)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] ADA compliance monitoring

---

## Monitoring & Observability

### Performance Monitoring

- [ ] Lighthouse CI in GitHub Actions
- [ ] Real User Monitoring (RUM) with Sentry
- [ ] Core Web Vitals tracking
- [ ] Error rate monitoring

### Application Monitoring

- [ ] Error tracking (Sentry)
- [ ] User journey tracking (optional: Plausible)
- [ ] Build size monitoring (Bundle Analyzer)
- [ ] Uptime monitoring (99.5% SLA)

---

## Phase 2+ Architecture Additions

### When Adding Backend / Auth:

```
Phase 2:
├─ Backend API (Node.js / Python / [TBD])
├─ Database (PostgreSQL / MongoDB / [TBD])
├─ Authentication (JWT / OAuth)
├─ Shopping Cart & Checkout (Stripe)
└─ User Accounts & History
```

### When Adding Real-Time Features:

```
Phase 2+:
├─ WebSockets for live updates
├─ Real-time inventory sync
├─ Live chat support
└─ Notifications
```

---

## Decisions & Rationale

| Decision       | Choice                | Why                                           |
| -------------- | --------------------- | --------------------------------------------- |
| **Framework**  | React                 | Ecosystem, performance, component reusability |
| **Styling**    | Tailwind CSS          | Rapid development, consistent design system   |
| **Build Tool** | Vite                  | Fast HMR, optimized production builds         |
| **Testing**    | Vitest                | Fast, Vue/React compatible, ESM-first         |
| **State**      | React Hooks + Context | Lightweight, avoids Redux complexity for MVP  |
| **Hosting**    | Vercel / Netlify      | Auto-deploy, CDN, no server management        |
| **Database**   | None (Phase 1)        | Faster launch, static JSON simpler            |

---

## Risks & Mitigation

| Risk                               | Mitigation                                                |
| ---------------------------------- | --------------------------------------------------------- |
| Performance degradation with scale | Lighthouse monitoring, code splitting, image optimization |
| Data sync issues (catalog updates) | Version control, CDN cache invalidation, monitoring       |
| Mobile UX problems                 | Responsive testing at each stage, mobile testing tool     |
| SEO issues                         | Semantic HTML, meta tags, Lighthouse monitoring           |

---

## Handoff to Build Phase

**Approved By**:

- [ ] Architect
- [ ] Frontend Lead
- [ ] DevOps / Platform Engineer

**Team Can Proceed When**:

1. SAD reviewed and signed off
2. Component breakdown validated
3. Data models agreed
4. Performance targets set
5. Build kickoff meeting scheduled

---

## Appendix

### A. Technology Decision Matrix

[Detailed comparison of alternatives]

### B. Dependency List

[Package.json with pinned versions]

### C. Deployment Architecture

[Detailed deployment flow, rollback procedures]

### D. Monitoring Dashboard Setup

[Links to monitoring tools, alert thresholds]
