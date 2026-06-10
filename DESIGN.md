# VIOMES Homepage Design Guide

> Calm industrial daylight, warm surfaces, product-first composition.

**Theme:** light

This document is the design source of truth for the VIOMES homepage.
Use it to keep design, implementation, and future changes aligned.

Canonical design files:

- [tokens.json](tokens.json)
- [variables.css](variables.css)
- [theme.css](theme.css)

## Design Intent

VIOMES should feel dependable, premium, and product-first. The tone is Greek-first, restrained, and practical. The visual language favors calm structure, warm materials, and clear hierarchy over decorative noise.

Design rules:

- Keep the TSX layer free of hardcoded visual decisions whenever the value can live in a token.
- Prefer a token, then a semantic alias, then a component style primitive.
- Make page-specific art direction live in structured files first, not inside React components.
- Use the same palette and typography system across homepage, navigation, and supporting pages.

## Tokens

### Colors

| Name                  | Value     | Token                             | Role                                                            |
| --------------------- | --------- | --------------------------------- | --------------------------------------------------------------- |
| Light Warm Canvas     | `#DCD8CF` | `--viomes-bg`                     | Primary page background, hero canvas, and soft section surfaces |
| Warm Olive            | `#807244` | `--viomes-primary`                | Primary interactive color, main hero text, and brand emphasis   |
| Deep Olive Brown      | `#4C4326` | `--viomes-dark`                   | Deep grounding tone for text, headers, and footer surfaces      |
| Plum Brown Accent     | `#56393E` | `--viomes-accent`                 | High-contrast accent for emphasis and CTA contrast              |
| Muted Warm Sage       | `#B7B69C` | `--viomes-surface`                | Secondary panels, muted cards, and supportive surfaces          |
| Warm Neutral          | `#CBC7C1` | `--viomes-panel`                  | Borders, framed containers, and neutral panel shells            |
| Light Warm Neutral    | `#D2CEC8` | `--viomes-frame`                  | Image frame backgrounds and media container fills               |
| Soft Light Text       | `#F5F0EA` | `--viomes-light`                  | High-contrast text on banners, cards, and dark overlays         |
| Secondary Neutral     | `#887B6D` | `--viomes-muted`                  | Helper text, secondary labels, and muted copy                   |
| Footer Grounding Tone | `#4C4326` | `--viomes-footer`                 | Footer and header grounding color                               |
| Deep Dark Tone        | `#32271A` | `--viomes-dark` (dark mode usage) | Dark mode surfaces and overlays                                 |

### Typography

| Name       | Value        | Token            | Role                                  |
| ---------- | ------------ | ---------------- | ------------------------------------- |
| Ubuntu     | `Ubuntu`     | `--font-sans`    | Primary body, navigation, and UI copy |
| Ubuntu     | `Ubuntu`     | `--font-heading` | All major headings                    |
| Geist Mono | `Geist Mono` | `--font-mono`    | Technical copy and diagnostics        |

### Type Scale

| Role                  | Size                            | Line Height | Letter Spacing | Token                          |
| --------------------- | ------------------------------- | ----------- | -------------- | ------------------------------ |
| hero-heading          | clamp(4rem, 6.7vw, 8rem)        | 0.90        | -0.03em        | `--type-hero-heading`          |
| hero-mobile-heading   | clamp(3rem, 14vw, 5.3rem)       | 0.88        | -0.03em        | `--type-hero-mobile-heading`   |
| hero-banner-title     | clamp(2.8rem, 6vw, 5.8rem)      | 0.92        | -0.04em        | `--type-hero-banner-title`     |
| brand-wordmark-verdia | clamp(2.4rem, 4.05vw, 4.8rem)   | 1.00        | 0.04em         | `--type-brand-wordmark-verdia` |
| brand-wordmark-kiklos | clamp(2rem, 3.25vw, 4.1rem)     | 1.00        | 0.03em         | `--type-brand-wordmark-kiklos` |
| brand-headline        | clamp(2rem, 2.55vw, 3.35rem)    | 1.04        | -0.02em        | `--type-brand-headline`        |
| category-title        | clamp(1.5rem, 1.5vw, 2.35rem)   | 1.10        | -0.01em        | `--type-category-title`        |
| category-copy         | clamp(0.9rem, 0.72vw, 1rem)     | 1.45        | 0em            | `--type-category-copy`         |
| category-mobile-title | clamp(1.1rem, 3.1vw, 1.875rem)  | 1.10        | -0.01em        | `--type-category-mobile-title` |
| category-mobile-copy  | clamp(0.75rem, 1.2vw, 1rem)     | 1.45        | 0em            | `--type-category-mobile-copy`  |
| page-display          | clamp(3rem, 6vw, 5.5rem)        | 1.00        | -0.02em        | `--type-page-display`          |
| page-section          | clamp(2rem, 4vw, 3rem)          | 1.05        | -0.02em        | `--type-page-section`          |
| page-card-title       | clamp(1.25rem, 2.2vw, 1.875rem) | 1.10        | -0.01em        | `--type-page-card-title`       |
| page-body             | clamp(0.95rem, 1vw, 1.125rem)   | 1.50        | 0em            | `--type-page-body`             |
| page-lead             | clamp(1rem, 1.2vw, 1.25rem)     | 1.45        | 0em            | `--type-page-lead`             |
| page-eyebrow          | 0.75rem                         | 1.20        | 0.15em         | `--type-page-eyebrow`          |

### Spacing & Shapes

**Density:** comfortable

| Name | Value | Token          |
| ---- | ----- | -------------- |
| 6    | 6px   | `--spacing-6`  |
| 9    | 9px   | `--spacing-9`  |
| 11   | 11px  | `--spacing-11` |
| 12   | 12px  | `--spacing-12` |
| 14   | 14px  | `--spacing-14` |
| 15   | 15px  | `--spacing-15` |
| 16   | 16px  | `--spacing-16` |
| 18   | 18px  | `--spacing-18` |
| 20   | 20px  | `--spacing-20` |
| 23   | 23px  | `--spacing-23` |
| 24   | 24px  | `--spacing-24` |
| 34   | 34px  | `--spacing-34` |
| 36   | 36px  | `--spacing-36` |
| 45   | 45px  | `--spacing-45` |
| 77   | 77px  | `--spacing-77` |
| 86   | 86px  | `--spacing-86` |

| Element | Value |
| ------- | ----- |
| cards   | 12px  |
| badges  | 36px  |
| buttons | 36px  |

### Layout

- Section gap: 45px
- Card padding: 18px
- Element gap: 18px

### Motion

| Name     | Value            | Token                                               |
| -------- | ---------------- | --------------------------------------------------- |
| fade     | 0.3s ease-in-out | `--shadow-elegant` equivalent timing in transitions |
| slide    | 0.5s ease-out    | motion timing used for staged reveals               |
| carousel | 800ms            | carousel transition timing                          |

## Current Homepage Structure

Implemented homepage order:

1. Hero carousel
2. Category showcase mosaic
3. Brand strip carousel (VERDIA / KIKLOS)
4. Top products spotlight carousel
5. News cards

This sequence should remain the default unless there is a strong business reason to change it.

## Runtime Theme Behavior

The settings menu supports runtime personalization:

- language toggle
- typography family
- title size and body size scaling
- palette generation from a base color

Palette generation writes CSS variables directly to `document.documentElement.style`.
This behavior is intentional and should remain deterministic.

## Typography System

Current defaults:

- body: `Ubuntu` at light weight (`300`)
- headings: `Ubuntu`

Typography is controlled through CSS variables and responsive scaling.
The system should feel editorial and confident, but always readable on mobile.

Rules:

- keep heading lines compact and intentional
- keep body copy short and scannable
- avoid introducing decorative type without a clear hierarchy need
- use `Ubuntu` weights to separate hierarchy rather than switching font families

## Hero Section

Current behavior:

- desktop hero uses a `16:9` stage that fits inside the viewport
  - stage width: `min(100vw, 100svh * 16/9)`
  - stage height: `min(100svh, 100vw * 9/16)`
- mobile hero keeps full viewport height (`100svh`)
- two-slide image carousel
- auto-rotate every 20s
- text card overlay with strong heading + short supporting line + CTA
- manual scroll cue to categories
- image + text composition scales within the stage using percentage positioning/sizing to keep proportions stable
- secondary editorial banner may sit beneath the hero stage as a companion panel
- secondary banner should keep the same warm-canvas / olive-brown palette and remain width-driven so the image and text keep their ratio on desktop
- if the banner is art-directed, prefer a separate responsive panel instead of squeezing it into the main hero stage

Hero aspect-ratio principle (Muuto-style):

- On `16:9` viewports, the desktop hero stage should visually fill the screen.
- On narrower or shorter viewports, the stage must shrink the opposite dimension to preserve `16:9`.
- Never force desktop hero to fixed `100svh` + `100vw` at the same time, because that breaks the ratio.
- Keep this rule as the canonical implementation contract:
  - width: `min(100vw, 100svh * 16/9)`
  - height: `min(100svh, 100vw * 9/16)`

Hero palette lock:

- hero background: `#DCD8CF` (`hsl(42 16% 84%)`)
- hero overlay text + CTA text: `#807244` (`hsl(46 31% 38%)`)

Design rules:

- image remains primary visual layer
- text card remains legible under all hero images
- avoid clutter in hero controls

## Categories Showcase Section

Current behavior:

- editorial 4-card mosaic
- asymmetric spans on desktop (`md:grid-cols-6` composition)
- strong photography + dark gradient overlay + compact text
- hover reveals additional copy on desktop

Design rules:

- section should read as curated showroom, not menu grid
- each card should be immediately understandable at a glance
- when a section needs a fixed width/height relationship, make the section stage width-driven and let height derive from the ratio
- do not cap the stage with an unrelated `max-width` that flattens the ratio on large screens unless the intent is to stop scaling
- keep the stage ratio in one place and use percentage-based internal layout for the card contents
- if a section needs different behavior on mobile, prefer a separate mobile fallback instead of compressing the desktop stage into the same flow
- future art-directed sections should follow the same pattern as the hero and categories stages: stage ratio first, internal proportions second, viewport cap only when it is explicitly part of the design intent

## Brand Strip (VERDIA / KIKLOS)

This is an art-directed section and should not be treated like a normal responsive block.

### Desktop behavior

- fixed canvas composition (`aspect-[4.08/1]`)
- two slide states with fade transitions
- percent-based absolute positioning for all visual elements
- controls pinned low-right (`bottom-[3%] right-[2%]`)
- auto-rotate every 8s

### Mobile behavior

- separate stacked composition
- controls placed at the bottom of the section
- no attempt to compress desktop art direction into a fluid mini-layout

### Critical rules

- use manual line breaks for art-directed headline control
- do not convert this section to generic grid logic
- preserve asymmetry and negative space

## Top Products Spotlight

Current behavior:

- carousel with content + image split
- auto-rotate every 6s (paused on hover)
- transition duration ~800ms
- manual prev/next buttons + progress selectors
- swipe support on touch devices

Design rules:

- keep motion smooth and restrained
- content hierarchy must remain clear during transitions

## Imagery

The site uses a mix of high-fidelity product renders and abstract visual textures. Product imagery is the hero; photography is limited and supportive. Iconography stays minimal and functional. Avoid lifestyle clutter and keep compositions object-focused.

## Layout

The page primarily uses a full-bleed, warm background model that creates an immersive canvas. Hero and brand sections are art-directed and ratio-driven. Content sections beneath should stay structured and readable, with vertical spacing used as the primary separator.

## Component Rules

### Primary Action Button

Filled button. Background: `#807244`, text: `#F5F0EA`, full pill radius.

### Secondary Action Button

Filled button. Background: `#56393E`, text: `#F5F0EA`, full pill radius.

### Ghost Button

Outlined button. Background: transparent, text: `#4C4326`, border: `1px solid #4C4326`, full pill radius.

### Card

Card radius: 12px. Card padding: 18px.

## Do's and Don'ts

### Do

- Prioritize warm canvas surfaces and soft neutrals.
- Use warm olive for primary emphasis and actions.
- Keep typography compact, editorial, and legible.
- Preserve 36px radii for pills and badges.
- Keep ratio-driven sections stage-first, content-second.
- Use tokens and semantic aliases before introducing component-local values.

### Don't

- Do not introduce extra saturated colors beyond the core palette without a product reason.
- Do not hardcode visual tokens in TSX when a shared token can cover the value.
- Do not force art-directed sections into generic grid patterns.
- Do not flatten the hero or brand strip aspect ratio with unrelated max widths.
- Do not use system fonts when the design system font is available.

## Image Frame Analysis & Dimensions

All homepage images are positioned in percentage-based frames. Here's the exact pixel breakdown by component.

### Hero Section (Home.tsx)

**Canvas:** 16:9 aspect ratio  
**Image location:** Right panel = 56% width × 87% height

| Viewport | Stage Size | Image Frame      |
| -------- | ---------- | ---------------- |
| Desktop  | 1920×1080  | **1075 × 939px** |
| Laptop   | 1440×810   | **806 × 704px**  |
| Tablet   | 1024×576   | **574 × 501px**  |
| Mobile   | 375×211    | **210 × 183px**  |

**Create at:** 1920 × 1080px (16:9)

---

### Brand Section - VERDIA Slide

**Canvas:** 4.08:1 aspect ratio (1920 × 470px desktop)  
**3 images with different aspect ratios:**

| Image               | Frame CSS                      | Desktop Size    | Tablet Size     | Crop Purpose            |
| ------------------- | ------------------------------ | --------------- | --------------- | ----------------------- |
| **gusto_main**      | `left-3% top-8% h-80% w-38%`   | **728 × 376px** | **389 × 201px** | Main product (portrait) |
| **gusto_secondary** | `right-2% top-22% h-66% w-21%` | **403 × 310px** | **215 × 166px** | Detail shot (portrait)  |
| **verdia_logo**     | `left-52% top-60% w-20%`       | **384 × auto**  | **205 × auto**  | Logo (vector/PNG)       |

**Create gusto_main at:** 1400 × 1100px (portrait, crops to 728×376)  
**Create gusto_secondary at:** 800 × 750px (portrait, crops to 403×310)

---

### Brand Section - KIKLOS Slide

**Canvas:** 4.08:1 aspect ratio (1920 × 470px desktop)  
**3 product images with different heights:**

| Image           | Frame CSS                        | Desktop Size    | Tablet Size     | Position            |
| --------------- | -------------------------------- | --------------- | --------------- | ------------------- |
| **cubo_set**    | `left-1.35% top-8% h-80% w-24%`  | **460 × 376px** | **245 × 201px** | Left                |
| **cubo_cherry** | `left-60.5% top-16% h-68% w-21%` | **403 × 320px** | **215 × 171px** | Center-right        |
| **cubo_black**  | `right-1.35% top-6% h-82% w-18%` | **345 × 385px** | **184 × 206px** | Far right (tallest) |

**Create cubo_set at:** 1000 × 820px (portrait)  
**Create cubo_cherry at:** 900 × 750px (portrait, medium-tall)  
**Create cubo_black at:** 1000 × 1100px (portrait, tallest - will crop to 345×385)

---

### Brand Section - Mobile Layout

**Stacked layout:** `aspect-[1.55/1]` (1.55:1 ratio)

| Viewport | Main Image Size |
| -------- | --------------- |
| 375px    | **375 × 242px** |
| 640px    | **640 × 413px** |

---

### Categories Showcase Section

**Grid:** 6-column asymmetric, all tiles use `object-cover` (1:1 squares)

| Card   | Grid Span | Desktop            | Tablet           | Mobile          |
| ------ | --------- | ------------------ | ---------------- | --------------- |
| Card 0 | 4 of 6    | **~1075 × 1075px** | **~570 × 570px** | **375 × 375px** |

---

### Brand Section - Mobile Layout

**Stacked layout:** `aspect-[1.55/1]` (1.55:1 ratio)

| Viewport | Main Image Size |
| -------- | --------------- |
| 375px    | **375 × 242px** |
| 640px    | **640 × 413px** |

---

### Categories Showcase Section

**Grid:** 6-column asymmetric, all tiles use `object-cover` (1:1 squares)

| Card   | Grid Span | Desktop            | Tablet           | Mobile          |
| ------ | --------- | ------------------ | ---------------- | --------------- |
| Card 0 | 4 of 6    | **~1075 × 1075px** | **~570 × 570px** | **375 × 375px** |
| Card 1 | 2 of 6    | **~537 × 537px**   | **~285 × 285px** | **375 × 375px** |
| Card 2 | 2 of 6    | **~537 × 537px**   | **~285 × 285px** | **375 × 375px** |
| Card 3 | 4 of 6    | **~1075 × 1075px** | **~570 × 570px** | **375 × 375px** |

**Create all at:** 1200 × 1200px (1:1 square). `object-cover` crops to each tile.

---

### Top Products Carousel

**Image container:** Right column (1.05fr flex basis in 1320px max container)

| Viewport | Container Size              | Purpose              |
| -------- | --------------------------- | -------------------- |
| Desktop  | **~545 × 680px** (portrait) | Full-height showcase |
| Tablet   | **~450 × 520px**            | Responsive fit       |
| Mobile   | **100% width × 330-420px**  | Full-width vertical  |

**Create at:** 800 × 1000px (4:5 portrait ratio)

---

### Sustainability Section

**Single image + content split**

| Viewport | Image Size           |
| -------- | -------------------- |
| Desktop  | **~700 × 500px**     |
| Tablet   | **~450 × 330px**     |
| Mobile   | **100% × 280-300px** |

**Create at:** 1400 × 1000px (landscape 4:3 ratio)

---

### Summary: Creation Dimensions by Component

| Component              | Create At     | Aspect Ratio           | Notes                       |
| ---------------------- | ------------- | ---------------------- | --------------------------- |
| Hero image             | 1920 × 1080px | 16:9                   | Single frame, downscales    |
| VERDIA gusto_main      | 1400 × 1100px | 1.27:1 (portrait)      | Crops to 728×376            |
| VERDIA gusto_secondary | 800 × 750px   | 1.07:1 (portrait)      | Crops to 403×310            |
| KIKLOS cubo_set        | 1000 × 820px  | 1.22:1 (portrait)      | Crops to 460×376            |
| KIKLOS cubo_cherry     | 900 × 750px   | 1.2:1 (portrait)       | Crops to 403×320            |
| KIKLOS cubo_black      | 1000 × 1100px | 0.91:1 (tall portrait) | Crops to 345×385            |
| Category tiles (all)   | 1200 × 1200px | 1:1 (square)           | object-cover crops per tile |
| Product carousel       | 800 × 1000px  | 4:5 (portrait)         | Downscales on mobile        |
| Sustainability         | 1400 × 1000px | 1.4:1 (landscape)      | Downscales all viewports    |

**Golden rule:** Create at the size you see in this table. The browser downscales—never upscales.

## 11. Sustainability Section

Current behavior:

- large image + narrative content split
- patterned background and subtle tone layering
- 3 highlight cards with icon/stat structure

Design rules:

- emphasize credibility and clarity, not campaign-style effects
- maintain readable body copy lengths and spacing rhythm

## 12. Motion Principles

Motion should support comprehension, not decoration.

Allowed patterns:

- soft fade
- subtle translate/scale
- short easing transitions

Avoid:

- constant looping motion outside carousels
- exaggerated parallax or heavy transform effects

## 13. Accessibility and UX Baselines

- maintain clear visual contrast on all primary text and interactive controls
- keep touch targets comfortable on mobile
- preserve keyboard focus visibility
- keep section structure readable and predictable

## 14. Change Protocol

When major design decisions change:

1. update this file in the same change set
2. keep `README.md`, `PROJECT_OVERVIEW.md`, and `MEMORY.md` consistent
3. verify key screens on desktop and mobile before merging

Use this guide as the implementation contract for homepage design decisions.
