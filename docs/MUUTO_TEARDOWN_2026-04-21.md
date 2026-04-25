# Muuto Website Technical Teardown (2026-04-21)

Source analyzed:
- https://www.muuto.com

## 1) Platform and Rendering Model

Observed evidence indicates a server-rendered ASP.NET MVC + Optimizely (Episerver) setup with Vue hydration/islands for interactive modules.

Evidence:
- Response headers include `X-AspNetMvc-Version: 5.2` and `X-AspNet-Version: 4.0.30319`.
- Cookies/markers include `EPi:*` and script include `https://dl.episerver.net/.../epi-util/find.js`.
- HTML contains many Vue directives (`v-if`, `v-for`, `v-on`, `inline-template`) and mounts under `#app` / `.js--vue-app-instance`.
- JS bundle bootstraps with webpack runtime (`window.webpackJsonp`, module wrapper) and creates Vue app instances (`new Vue(...)`).

Interpretation:
- Content is strongly CMS-driven and pre-rendered in HTML.
- Interactivity is attached component-by-component using Vue on top of rendered markup.

## 2) Frontend Stack Signals

Core stack clues from source and bundles:
- Build/runtime: webpack split bundles (`app.js`, `vendor.js`).
- UI framework: Vue 2-style API (`new Vue`, `inline-template`, `delimiters` customization).
- State management: Vuex-like action/commit patterns in bundle.
- Slider/carousel patterns: Swiper classes in markup.
- Integrations:
  - OneTrust cookie management (`cdn.cookielaw.org`)
  - Google Tag Manager (`GTM-N5824ZR`)
  - Cylindo 3D viewer (`viewer.cylindo.com`)

## 3) Asset and Caching Strategy

### Versioned static assets
- CSS/JS served from versioned paths, e.g.:
  - `/Static/dist/js/v-639074302020000000/app.js`
  - `/Static/dist/js/v-639074302020000000/vendor.js`
  - `/Static/dist/css/v-639074302020000000/styles.css`

### Cache policy
- Static bundles return `Cache-Control: public, max-age=31536000` and Cloudflare `CF-Cache-Status: HIT`.
- HTML is dynamic/private (`Cache-Control: private`, `cf-cache-status: DYNAMIC`).

### Bundle sizes (downloaded)
- `app.js`: ~487 KB
- `vendor.js`: ~918 KB
- `styles.css`: ~1.23 MB

Interpretation:
- They rely on long-lived immutable-ish versioned assets + dynamic HTML delivery.
- CSS payload is substantial, likely due broad component coverage + utility/legacy layers.

## 4) Content/Data Flow Patterns

The client consumes many internal APIs, including:
- `/api/search`
- `/api/products`
- `/api/getproducts`
- `/api/carts/current/*`
- `/api/checkout/*`
- `/api/store-locator`
- `/api/country/change`
- `/api/usertype/change`

Interpretation:
- Hybrid model: server-rendered page shell + API-driven interaction for search/cart/configurator/stateful UI.

## 5) UI/UX Coding Patterns Worth Learning

### 5.1 Editorial layout + robust interaction shell
- Rich semantic shell (`header/nav/main/footer`) present while interactive modules mount within it.
- Overlay-driven UX (search/menu/cart/account) managed through centralized state actions.

### 5.2 Responsive image pipeline
- Frequent `srcset` + `sizes` usage with CMS-generated width transforms.
- URLs include resize/format/revision params (e.g. `?width=1500&format=jpg&revision=...`).

### 5.3 Motion and responsiveness
- Heavy responsive CSS system with extensive media queries and `clamp()` typography usage.
- `prefers-reduced-motion` support is present.

### 5.4 Progressive enhancement direction
- Significant HTML present before JS enhancement.
- JS enriches components rather than requiring a blank SPA shell for first paint.

## 6) What This Means For VIOMES

Practical patterns we can adopt now (without copying branding):

1. Keep route content server/initial-render friendly and let JS enhance interactions.
2. Standardize responsive image strategy (`srcset` + `sizes`) for hero/cards/product media.
3. Use long-cache versioned static assets for deploy stability and speed.
4. Centralize overlays and global UI transitions in one state layer to simplify behavior.
5. Expand typography fluid scaling with `clamp()` where appropriate.
6. Respect motion preferences and keep transitions intentionally restrained.

## 7) Cautions

- Muuto appears to carry legacy stack weight (large CSS/JS). We should copy patterns selectively, not payload size.
- Their architecture is CMS + Vue + ASP.NET specific; VIOMES should adapt concepts to current Vite/React stack.

## 8) Suggested Next Study Pass

If needed, run a page-by-page comparative audit:
- Homepage
- Product listing
- Product detail
- Search overlay

For each page: map module boundaries, media strategy, and interaction state transitions into a VIOMES-specific implementation checklist.
