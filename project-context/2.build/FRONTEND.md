# Frontend Implementation Documentation - VIOMES Phase 2

**Project**: VIOMES S.A. Homepage  
**Phase**: 2. BUILD  
**Owner**: `@frontend-eng`  
**Status**: To Be Filled  
**Last Updated**: May 2026

---

## Component Implementation Status

### Core Components

- [ ] Layout components (Navbar, Footer, ScrollToTop)
- [ ] Page components (Home, Products, ProductDetail, About)
- [ ] UI component library integration
- [ ] Responsive design across breakpoints
- [ ] Navigation and routing
- [ ] Responsive typography scaling tied to viewport size

### Performance Optimizations

- [ ] Code splitting by route
- [ ] Image lazy loading
- [ ] CSS optimization via Tailwind
- [ ] Bundle size within targets

### Accessibility

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast validation

## Feature Checklist

- [ ] Homepage with hero section
- [ ] Category showcase section
- [ ] Top products section
- [ ] Sustainability messaging
- [ ] Product listing page with filters
- [ ] Product detail view
- [ ] About page
- [ ] Contact page
- [ ] Breadcrumb navigation
- [ ] Mobile menu

## Issues & Decisions

_To be documented during implementation_

- Catalog grouping has a manual override layer in [src/lib/familyGroupingRules.ts](src/lib/familyGroupingRules.ts).
- Mixed Excel families are split at runtime by `size_code` so one source group can become multiple product detail pages.
- The first `size_code` in each split group is used as the public product id.
- When a family split changes, update the grouped JSON copies and the family rules together so the runtime fetch and fallback import stay aligned.
- The shared text-size variables are now scaled from viewport dimensions in the navbar, then adjusted by the existing user-selected text-size controls.

## Performance Metrics

- Lighthouse score: \_\_\_/100
- Bundle size: \_\_\_ KB (gzipped)
- LCP: \_\_\_ ms

## Sign-Off

- [ ] All components implemented
- [ ] Responsive design validated
- [ ] Performance targets met
- [ ] Code review approved
