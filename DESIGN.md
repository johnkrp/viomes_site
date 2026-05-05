# VIOMES Homepage DESIGN.md

This document is the design-side source of truth for the VIOMES homepage.
Any UI work in this repo should follow this file before inventing a new visual direction.

The goal is not to copy another brand. The goal is to make the homepage feel like VIOMES: industrial, dependable, Greek-first, and quietly premium.

## 1. Visual Theme & Atmosphere

The site should feel like a modern industrial catalog that has been carefully edited for retail clarity. It needs the confidence of a manufacturer, the restraint of a premium brand, and the warmth of a product showcase that is meant to be used rather than admired from a distance.

## Brand Section (VERDIA / GUSTO Strip)

This section is a key visual identity block and should be treated differently from standard responsive sections.

### Core Principle

The brand strip is an **art-directed composition**, not a fluid layout.

### Desktop Behavior

- Use a **fixed aspect ratio canvas** (currently ~4:1) so all elements scale proportionally.
- All positioning should be relative (percent-based) to that canvas.
- Avoid responsive height systems (`h-[...]`) for this section.
- The section can be either:
  - **Full-bleed** (preferred for strong visual impact), or
  - **Max-width capped** with intentional side margins (catalog style).

### Typography Rules (Critical)

- Headlines must NOT rely on natural wrapping.
- Always enforce **manual line breaks** for art direction.
- Use:
  - `block` spans for line control
  - `whitespace-nowrap` to prevent reflow

Example pattern:

```tsx
<span className="block whitespace-nowrap">Προϊόντα με</span>
<span className="block whitespace-nowrap">σύγχρονη</span>
<span className="block whitespace-nowrap">αισθητική</span>
```

- Typography should behave like a **graphic element**, not flowing content.

### Layout Rules

- Treat the section like a **poster/banner composition**.
- Do not attempt to make it behave like a grid system.
- Preserve asymmetry and negative space intentionally.
- Elements should feel placed, not aligned by system defaults.

### Image Handling

- Use `object-fit: cover` and adjust composition with `object-position`.
- Avoid dynamic aspect-ratio calculations based on image load.
- Frame size defines layout — not the image’s intrinsic ratio.

### Responsive Strategy

- Desktop: art-directed fixed canvas
- Mobile: separate stacked layout

Do NOT try to compress the desktop composition into mobile.

### Anti-Patterns

Do NOT:

- Use flexible widths that change text wrapping
- Use dynamic height breakpoints (`sm:h-...` etc.)
- Let text reflow across breakpoints
- Mix intrinsic image ratios into layout positioning logic

### Goal

The section should feel like a **designed brand panel inside a catalog**, not a responsive UI block.

## (rest of file unchanged)
