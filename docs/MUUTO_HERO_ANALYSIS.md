# Muuto Hero Section Analysis

**Date:** May 4, 2026  
**Purpose:** Document key design patterns from Muuto's hero section to inform VIOMES hero redesign.

## Muuto Hero Layout Structure

### Visual Design Principles

1. **Asymmetrical Split Layout**
   - Left ~45%: Large, dominant product/lifestyle image (acts as background anchor)
   - Right ~55%: Content area with solid background color (green #9ed971 or similar)
   - Creates visual tension and guides eye through type hierarchy

2. **Typography Hierarchy**
   - Main headline: "tuning into nature" (broken across lines for visual rhythm)
   - Split into `<strong>` tags for semantic emphasis: "tuning into" + "nature"
   - Large, bold serif/modern font that anchors the layout
   - Supports both readability and emotional resonance

3. **Image Layering Strategy**
   - Primary image: large background/contextual (left side)
   - Secondary image: smaller overlay, positioned right-center (adds depth)
   - Creates compositional depth without overwhelming the type

4. **Color & Contrast**
   - Solid background color (bright but muted green) defines the content area
   - High contrast between text and background ensures legibility
   - Image acts as subtle atmospheric element

5. **Micro Copy & Labels**
   - Small "explore" label positioned bottom-right
   - Acts as secondary CTA, less prominent than main headline
   - Guides attention flow through the section

### DOM Structure Pattern

```html
<link />
<!-- clickable entire section -->
<h1>
  "tuning into nature"
  <strong>tuning into</strong>
  <strong>nature</strong>
</h1>
<figure>
  <!-- large left image -->
  <figure>
    <!-- secondary right image -->
    <div>"explore" label</div>
  </figure>
</figure>
```

### Design Principles Applied

1. **Simplicity with Impact**
   - Two images, one headline, one label = minimal elements, maximum impact
   - Avoids clutter by removing unnecessary UI

2. **Clear Information Hierarchy**
   - Headline dominates (largest, boldest)
   - Supporting image reinforces the mood
   - Label provides soft CTA without being pushy

3. **Emotional Over Transactional**
   - Leads with story/feeling (green outdoor collection) rather than product SKU
   - Creates narrative context for products below

4. **Responsive Simplicity**
   - Can stack on mobile: headline, then images, then label
   - Maintains visual impact even when reoriented

## Key Takeaways for VIOMES

### Applicable Patterns

- Use split-screen layout for hero (can shift to stacked on mobile)
- Layer images for visual depth (primary + overlay)
- Keep type hierarchy extremely clear (one strong headline)
- Use solid color background to define content area
- Add small supportive labels/CTAs alongside main action

### Avoid Copying

- Don't copy Muuto's specific green color (use VIOMES accent instead)
- Don't replicate their outdoor lifestyle tone (VIOMES is industrial product-first)
- Don't use Scandinavian serif fonts if not aligned with VIOMES brand

### Adaptation Strategy

1. Use VIOMES hero image(s) instead of Muuto's lifestyle photos
2. Apply the accent color (rgb(105, 78, 60) warm brown) as the content area background
3. Create headline that reflects VIOMES brand story (durability, quality, Greek, industrial)
4. Layer 2-3 product images for compositional interest
5. Maintain the same asymmetrical, clean layout structure
6. Keep secondary label/CTA as quiet call to explore collection

## Technical Considerations

- Hero section should be `<section>` with clear semantic structure
- Use CSS Grid or Flexbox to manage split layout + image layering
- Ensure images are optimized (use `<picture>` or srcset for responsive loading)
- Maintain 100vh height on desktop, compress gracefully on mobile
- Gradient overlay (if used) should be subtle and not fight the background color
- Scroll behaviors (fade, parallax) should be minimal and respect `prefers-reduced-motion`

## Next Steps

1. Create hero component structure (component shell ready)
2. Integrate VIOMES product/hero images
3. Build responsive breakpoints (desktop split, mobile stacked)
4. Test readability and image load performance
5. Validate with accessibility guidelines (text contrast, semantic HTML)
