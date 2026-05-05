# VIOMES Homepage Design Guide

This document is the design source of truth for the VIOMES homepage.
Use it to keep design, implementation, and future changes aligned.

Last updated: 2026-05-05

## 1. Design Intent

The site should feel:

- industrial and dependable
- premium but practical
- product-first, not effect-first
- Greek-first in tone and content

The design language favors calm structure, warm materials, and clear hierarchy over trendy visual noise.

## 2. Current Homepage Structure

Implemented homepage order:

1. Hero carousel
2. Category showcase mosaic
3. Brand strip carousel (VERDIA / KIKLOS)
4. Top products spotlight carousel
5. News cards
6. Sustainability section

This sequence should remain the default unless there is a strong business reason to change it.

## 3. Color System (Current Implementation)

Core CSS tokens are defined in `src/index.css` and treated as production values.

### Base tokens

- `--background: 53 9% 82%`
- `--foreground: 37 25% 13%`
- `--primary: 46 31% 38%`
- `--secondary: 63 27% 46%`
- `--accent: 350 20% 28%`
- `--border: 58 16% 60%`

### Viomes semantic tokens

- `--viomes-bg: 42 16% 84%` (`#DCD8CF`)
- `--viomes-surface: 58 16% 66%` (`#B7B69C`)
- `--viomes-dark: 46 33% 22%` (`#4C4326`)

### Header / footer mapping

- `--header-bg: 46 33% 22%`
- `--header-text: 42 16% 84%`
- `--header-hover: 350 20% 36%`

### Usage rules

- Keep warm neutrals as the dominant canvas.
- Use accent for action and emphasis, not large background fields.
- Preserve clear text contrast for cards, controls, and overlays.

## 4. Runtime Theme Behavior

The settings menu supports runtime personalization:

- language toggle
- typography family
- title size and body size scaling
- palette generation from a base color

Palette generation writes CSS variables directly to `document.documentElement.style`.
This behavior is intentional and should remain deterministic.

## 5. Typography System

Current defaults:

- body: `Poppins`
- headings: `Inter`

Typography is controlled through CSS variables and responsive scaling.
The system should feel editorial and confident, but always readable on mobile.

Rules:

- keep heading lines compact and intentional
- keep body copy short and scannable
- avoid introducing decorative type without a clear hierarchy need

## 6. Hero Section

Current behavior:

- full viewport height (`100svh`)
- two-slide image carousel
- auto-rotate every 20s
- text card overlay with strong heading + short supporting line + CTA
- manual scroll cue to categories

Design rules:

- image remains primary visual layer
- text card remains legible under all hero images
- avoid clutter in hero controls

## 7. Categories Showcase Section

Current behavior:

- editorial 4-card mosaic
- asymmetric spans on desktop (`md:grid-cols-6` composition)
- strong photography + dark gradient overlay + compact text
- hover reveals additional copy on desktop

Design rules:

- section should read as curated showroom, not menu grid
- each card should be immediately understandable at a glance

## 8. Brand Strip (VERDIA / KIKLOS)

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

## 9. Top Products Spotlight

Current behavior:

- carousel with content + image split
- auto-rotate every 6s (paused on hover)
- transition duration ~800ms
- manual prev/next buttons + progress selectors
- swipe support on touch devices

Design rules:

- keep motion smooth and restrained
- content hierarchy must remain clear during transitions

## 10. Sustainability Section

Current behavior:

- large image + narrative content split
- patterned background and subtle tone layering
- 3 highlight cards with icon/stat structure

Design rules:

- emphasize credibility and clarity, not campaign-style effects
- maintain readable body copy lengths and spacing rhythm

## 11. Motion Principles

Motion should support comprehension, not decoration.

Allowed patterns:

- soft fade
- subtle translate/scale
- short easing transitions

Avoid:

- constant looping motion outside carousels
- exaggerated parallax or heavy transform effects

## 12. Accessibility and UX Baselines

- maintain clear visual contrast on all primary text and interactive controls
- keep touch targets comfortable on mobile
- preserve keyboard focus visibility
- keep section structure readable and predictable

## 13. Change Protocol

When major design decisions change:

1. update this file in the same change set
2. keep `README.md`, `PROJECT_OVERVIEW.md`, and `MEMORY.md` consistent
3. verify key screens on desktop and mobile before merging

Use this guide as the implementation contract for homepage design decisions.
