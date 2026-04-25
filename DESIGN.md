# VIOMES Homepage DESIGN.md

This document is the design-side source of truth for the VIOMES homepage.
Any UI work in this repo should follow this file before inventing a new visual direction.

The goal is not to copy another brand. The goal is to make the homepage feel like VIOMES: industrial, dependable, Greek-first, and quietly premium.

## 1. Visual Theme & Atmosphere

The site should feel like a modern industrial catalog that has been carefully edited for retail clarity. It needs the confidence of a manufacturer, the restraint of a premium brand, and the warmth of a product showcase that is meant to be used rather than admired from a distance.

The present design language already leans into warm earth tones, soft surfaces, and a muted green accent. That is the right base. The interface should read as practical and trustworthy first, with modern polish added through spacing, typography, and image presentation rather than through flashy decoration.

The visual mood should stay calm and grounded. It should not drift into generic startup purple, flashy gradients, or over-designed SaaS marketing. Instead, it should preserve the sense of a real company with real products, real manufacturing, and a long-term presence.

**Key Characteristics:**

- Earth-toned and calm, with an industrial retail finish
- Premium, but not luxurious in a fragile or decorative way
- Clear and practical for Greek-first content
- Soft depth and subtle motion instead of heavy effects
- Product and brand trust should feel central, not bolted on

## 2. Color Palette & Roles

The current palette is defined in [src/index.css](src/index.css). It should be treated as the active system, not a placeholder.

### Core Surfaces

- **Background**: warm cream and sand tones for the page canvas
- **Card / Popover**: lighter warm neutrals that keep sections readable without feeling stark
- **Secondary surfaces**: beige and muted stone values for footer blocks, trust areas, and supporting panels

### Text & Emphasis

- **Foreground**: deep muted green for primary text
- **Muted text**: desaturated stone for supporting copy, metadata, and secondary labels
- **Accent / Primary**: muted VIOMES green for CTAs, links, key markers, and active states
- **Destructive**: a reserved warm red for errors only

### Rules

- Keep the palette rooted in warm neutrals and muted green.
- Use the accent sparingly so important actions still stand out.
- Preserve strong enough contrast for body text, chips, buttons, and footer links.
- Keep dark mode in the same family of colors rather than switching to a dramatic neon-dark system.
- Do not introduce brand colors that compete with the core earth-tone identity.

### Palette Direction Over Time

Past: the repository has already moved away from cluttered cleanup docs and toward a more stable, centralized documentation structure. The visual language should follow the same principle: fewer competing ideas, clearer hierarchy, less noise.

Present: the app uses a warm catalog palette, muted green CTA language, and soft borders/shadows. That should remain the default.

Future: if the design system evolves, the palette should become more consistent, not more colorful. Future work should tighten semantic color use, improve contrast discipline, and keep the system calm enough for large content-heavy pages.

## 3. Typography Rules

Typography is defined in [src/index.css](src/index.css). The current stack uses Poppins for body text and Inter for headings, which gives the site a clean, modern structure without becoming sterile.

### Typographic Voice

- Body text should feel readable, direct, and lightly rounded.
- Headings should be strong and compact enough to anchor product-led sections.
- Labels and chips should be used sparingly and with purpose.
- Technical or code-like snippets should remain limited to documentation contexts.

### Usage Guidance

- Use bold, concise headlines on the home page and category surfaces.
- Keep paragraphs short and easy to scan on mobile.
- Use uppercase labels only for metadata, trust chips, and section markers.
- Avoid introducing additional decorative typefaces unless they solve a very specific hierarchy problem.
- The site should feel editorial when it needs to, but never so stylized that it hurts clarity.

### Past / Present / Future Typographic Direction

Past: the project had a lot of cleanup and transitional content. The typography should not inherit that sense of improvisation. It should read as intentional and consistent.

Present: the strongest current pattern is a confident headline, one supporting paragraph, then action buttons and trust signals. That structure should remain the default.

Future: if the site gets more editorial or campaign-driven, the type system should support stronger hierarchy, but the underlying body copy must remain compact and readable.

## 4. Component Styling

The component system should feel designed, not merely assembled.

### Buttons

- Primary buttons should be rounded, filled, and visually calm.
- Secondary buttons should be outlined or transparent with clear hover feedback.
- Button language should remain direct and action-oriented.
- Buttons should be easy to spot without overwhelming nearby content.

### Cards & Containers

- Cards should be lightly elevated or softly bordered.
- Containers should feel like catalog surfaces rather than floating widgets.
- The site should use restrained depth and subtle separation between sections.
- Rounded corners should be moderate, not overly pill-shaped everywhere.

### Inputs & Forms

- Inputs should be simple, clean, and legible.
- Form controls should sit comfortably on the same warm surface system as the rest of the site.
- Focus states should be visible and consistent with the accent color.

### Navigation

- Navigation should stay compact and easy to parse.
- The header should communicate structure quickly, not dominate the screen.
- Active state, hover state, and scroll state should be obvious but understated.

### Badges & Trust Chips

- Badges should be small, pill-shaped, and used for trust signals or compact metadata.
- Chips should reinforce product quality, recyclable series, Greek production, and similar proof points.
- Avoid turning badges into decorative clutter.

### Image Treatment

- Product and hero images should lead the layout.
- On desktop, image blocks can be large and editorial.
- On mobile, images should remain swipeable or easy to navigate.
- Images should feel integrated with the warm UI instead of floating in a harsh frame.

## 5. Layout Principles

The layout should be spacious without feeling empty, and structured without feeling rigid.

### Structure

- Keep the page story simple: hero, discovery, supporting sections, trust content, footer.
- Use clear section breaks so the page remains easy to follow.
- Make sure the user can understand what the company sells within seconds.

### Spacing

- Use generous spacing around major blocks.
- Keep product and content grids aligned and predictable.
- Avoid dense dashboard-like layouts.
- Respect a consistent rhythm from section to section.

### Past / Present / Future Layout Direction

Past: the repository has gone through cleanup and documentation consolidation. The layout language should reflect that same discipline by removing unnecessary friction.

Present: the page already uses a strong hero, supporting trust signals, and a structured footer. That is the correct baseline.

Future: additional sections should only be added if they improve comprehension, conversion, or trust. New content should strengthen the narrative, not just increase length.

## 6. Depth & Elevation

- Use shallow shadows and soft borders.
- Favor material-like layering over dramatic floating panels.
- Keep overlays subtle and transparent enough that they never fight the content.
- Let whitespace and tone do most of the work instead of relying on heavy elevation.

The design should feel like warm printed catalog material with a digital finish, not like a glossy app shell trying to impress by force.

## 7. Responsive Behavior

- Mobile-first readability matters.
- Hero imagery can become interactive and swipeable on small screens.
- CTAs should stay visible and accessible above the fold on phones.
- Footer columns should stack cleanly and remain easy to scan.
- Touch targets should stay comfortably sized and spaced.

On smaller screens, the design should simplify without losing its identity. The home page should still feel like VIOMES, just compressed into a more vertical reading flow.

## 8. Motion

- Motion should support navigation and image changes, not become the attraction.
- Use fade, scale, and subtle slide transitions.
- Keep durations short and unobtrusive.
- Respect reduced-motion expectations and avoid constant movement.

Motion should feel like a gentle change in state, not a performance.

## 9. Do's and Don'ts

### Do

- Keep the interface clean, calm, and premium.
- Reuse the earth-tone palette and current spacing rhythm.
- Make important actions obvious through contrast and placement.
- Preserve Greek-first readability.
- Keep trust signals visible without overwhelming the layout.
- Use the DESIGN.md as the baseline for future UI choices.

### Don't

- Introduce purple-accented defaults or generic SaaS gradients.
- Add crowded sections just to fill space.
- Mix too many fonts, colors, or shadow styles.
- Turn the footer or navigation into decorative panels.
- Hide product discovery behind clever but confusing interactions.
- Let future design experiments override the baseline without updating this file.

## 10. Reference Sites & What To Borrow

These sites are not templates to copy. They are useful references for tone, hierarchy, and storytelling.

### Euro3plast

- Strong product-first homepage structure with a clear seasonal or collection-led opener.
- Good balance between product catalog, best sellers, sustainability, and company story.
- Useful as a reference for how to present a manufacturer without making the page feel sterile.

### Brabantia

- Extremely clear brand promise and a strong, memorable headline.
- Restraint matters: one core message, then proof through product quality and trust signals.
- Useful as a reference for premium calm, longevity, and confidence.

### elho

- Sustainability is embedded into the product story rather than added as a separate marketing layer.
- Brightness and energy are present, but the page still stays organized and product-led.
- Useful as a reference for making ecological values feel practical and credible.

### Artevasi

- Richer color and more expressive storytelling, but still tied to product categories and brand origin.
- Strong use of editorial sections, inspiration content, and heritage/production narrative.
- Useful as a reference for adding warmth and cultural identity without losing structure.

### Prosperplast

- Large-scale product breadth presented through clear collection, brand, and campaign entry points.
- Strong use of launch-led merchandising, trade fair moments, and sub-brands inside one ecosystem.
- Useful as a reference for organizing a wide catalog without making the homepage feel scattered.

### Cookshop

- Highly category-driven merchandising with strong best sellers, new products, offers, and editorial content.
- Uses useful utility signals like stores, newsletter, support, and trust badges to reduce purchase friction.
- Useful as a reference for balancing inspiration, commerce, and practical service information.

### Muuto (https://www.muuto.com)

- Excellent example of premium Scandinavian restraint: strong whitespace, quiet confidence, and product-first storytelling.
- Uses editorial composition and typography to make commerce feel like a curated brand experience rather than a dense catalog grid.
- Good benchmark for image pacing, section rhythm, and how to balance lifestyle atmosphere with clear product navigation.
- Useful as a reference for clean navigation behavior, minimal but intentional motion, and high-quality visual hierarchy on both desktop and mobile.

### What VIOMES Should Take From Them

- A homepage should explain the brand fast, then show products with confidence.
- Sustainability should feel operational and real, not decorative.
- The page should stay calm and premium, but not flat or anonymous.
- Visual richness should come from product photography, spacing, and hierarchy, not from busy effects.
- The site should feel like a manufacturer with taste, not a generic ecommerce theme.
- If the catalog grows, the homepage should rely on clear category grouping and campaign blocks rather than adding more free-form sections.
- Trust, service, and company proof should stay visible enough to support conversion without taking over the brand story.
- From Muuto specifically: use stronger editorial spacing and calmer composition so product imagery and typography feel more intentional and premium.

## 11. Homepage Concepts To Explore

The reference sites suggest a few concrete directions that would fit VIOMES well.

### Hero Direction

- Use one strong headline, one supporting statement, and one primary action.
- Consider a hero that feels more editorial and less like a generic slider.
- If imagery rotates, each slide should represent a distinct promise: collections, materials, Greek production, or sustainability.
- Preferred visual approach: one large dominant hero image plus one or two supporting images and a text card, all placed asymmetrically inside one shared background canvas.
- Avoid strict grid alignment in the hero. Composition should feel curated and artistic, with deliberate offsets, overlaps, and negative space.

### Collection Architecture

- Treat the categories section as a small showroom, not a list.
- Show the 3 core product families as large editorial cards:
  - Είδη Σπιτιού
  - Γλάστρες
  - Επαγγελματικός Εξοπλισμός
- Each card should use one strong image, one short title, one line of supporting copy, and one clear action.
- Avoid the current hover-reveal pattern; the section should be readable at a glance on first load.
- Let the cards carry different moods:
  - Είδη Σπιτιού: clean, calm, domestic, light-toned
  - Γλάστρες: organic, warm, tactile, nature-led
  - Επαγγελματικός Εξοπλισμός: structured, durable, more technical
- Use one dominant card and two supporting cards, or a 2+1 grid, so the section feels composed rather than symmetrical and flat.
- Keep the copy short enough that the photography stays primary.
- If needed, add a subtle section intro above the cards, but the cards themselves should do most of the work.

### Best Pattern for the 3 Categories

- Desktop: a 2-column layout where one category is larger and the other two stack beside or below it.
- Mobile: a vertical stack of three full-width cards with tightly controlled spacing.
- Interaction: hover/focus should only slightly lift or brighten the card; no animated emoji, no large swap effects.
- The section should feel closer to Artevasi's editorial category blocks and Euro3plast's campaign-led merchandising than to a standard e-commerce menu.

### Category Showcase Sketch

- Use a wide, calm section with a short introduction at the top and the three product families below.
- The layout should feel like a curated showroom wall, not a dense catalog index.
- The first card should be the most visually dominant, while the other two support it in a balanced grid.
- Suggested card roles:
  - Είδη Σπιτιού: the cleanest and brightest card, with a soft interior-style image.
  - Γλάστρες: the warmest and most organic card, with plant-led photography.
  - Επαγγελματικός Εξοπλισμός: the most structured and technical card, with a product or use-case photo that feels durable.
- Use one consistent card system, but vary image crop, headline position, and accent tone so each category has its own character.
- Keep the copy short and direct so the section works visually first and textually second.
- Add one clear action per card, but make the whole card clickable so the section feels quick to scan.
- If the cards are strong enough, do not add extra decorative labels, badges, or explanatory text.

### Social Proof & Trust

- Bring trust signals higher on the page: manufacturing origin, durability, sustainability, service, or stock reliability.
- Use short proof chips or compact highlight blocks instead of long paragraphs.
- Keep these signals visible but not louder than the products themselves.

### Editorial Layer

- Add one short story section that explains why VIOMES exists and what makes it different.
- This can be a sustainability statement, a production story, or a Greek-origin / quality narrative.
- Keep the editorial layer visual and concise, like a brand magazine strip rather than a blog homepage.

### Commerce Layer

- Surface new products, best sellers, or featured collections in a predictable way.
- Use cards that feel premium and easy to scan, with strong product photography and clear labels.
- Consider a seasonal or launch-led block when there is a new collection worth highlighting.

### Service Layer

- Keep practical information visible: contact, catalog access, company story, and maybe stock or shipping reassurance.
- Cookshop shows that utility content can reduce friction when it is easy to find.
- For VIOMES, this should stay light and elegant rather than turning the page into a support portal.

## 12. Homepage Sketch

This is the preferred high-level wireframe direction for the homepage.

### Section Order

1. Hero
2. Category gateway
3. Featured products or collections
4. Sustainability / content / news trio
5. Brand story / Greek manufacturing narrative
6. Service footer

### Section Intent

- Hero: explain what VIOMES is in one sentence and give one clear primary action.
- Category gateway: let users understand the catalog structure immediately.
- Featured products or collections: show what is most relevant now, not just what is broad.
- Sustainability / content / news trio: combine sustainability, articles, and updates into one balanced row of cards.
- Brand story: communicate history, scale, and local identity without becoming sentimental.
- Service footer: keep contact, catalog access, and secondary navigation easy to find.

### Hero Options

#### Figma Reference Direction

- Treat the hero as an asymmetric collage, not a centered marketing banner.
- Use one large dominant image, one floating text card, and one or two secondary images.
- Keep the composition intentionally off-balance, with the text card sitting in a natural gap rather than locked to the center.
- Use a soft atmospheric background inspired by the Mint, Viola, and Sunset shadergradient presets, but keep the effect subtle enough that the photography remains primary.
- The background should feel like a layered canvas of cool mint, soft violet, and warm sunset light, not a loud neon gradient.
- Recreate the sense of a curated mood board or editorial spread, but keep it cleaner and more premium than a scrapbook.
- Prefer real product or plant photography with clear whitespace so the text card can sit comfortably on top.
- When in doubt, prioritize readability and composition over symmetry.
- Supporting images should feel intentionally placed, not snapped to a uniform card grid.
- The whole hero should read as one art-directed scene rather than separate blocks.

#### 1. Split Hero, Product + Factory

- Left side: strong Greek headline, one concise supporting statement, one primary CTA.
- Right side: a large product image paired with a subtle factory or production detail.
- Best when the page needs to feel industrial, credible, and premium at the same time.

#### 2. Collection-First Hero with Category Mosaic

- One lead image and headline, then three smaller category tiles for key product families.
- Best when fast orientation matters more than narrative drama.

#### 3. Proof-Led Hero with Claim Bands

- One static hero image with three compact proof bands below it.
- Example proof bands: durable for everyday use, made in Greece, sustainable production.
- Best when the brand wants to sound serious and operational rather than promotional.

#### 4. Full-Screen Image with Floating Text Card

- Use one full-screen or near-full-screen image that fills the viewport.
- Place a text card on top of the image in an area with natural whitespace, such as a lighter sky area, an open corner, or negative space in the composition.
- The card should feel anchored and elegant, not centered by default unless the composition demands it.
- Best when the image is strong enough to carry atmosphere and the text only needs to give it meaning.
- This works well if the photo has a clear product-focus or industrial context while still leaving room for calm typography.

#### 5. Collage Hero with Gradient Canvas

- Use a large hero image as the anchor, then place one or two smaller supporting images around it.
- Add one floating text card that overlaps the collage and carries the main headline, subhead, and CTA.
- Place the image cluster against a custom gradient canvas derived from the Mint, Viola, and Sunset family, tuned down to support the photos.
- Allow the hero to feel like a designed spread: image, card, and background should all read as one composition.
- Best when we want the hero to feel more contemporary and visually layered than the split hero.

#### Composition Rules for the Collage Hero

- Desktop layout should be asymmetric by default:
  - One dominant image occupying the strongest visual area.
  - One or two supporting images offset vertically/horizontally.
  - One text card anchored in available negative space.
- Do not align all hero elements to a strict equal-column grid.
- Allow mild overlap between elements when it improves depth and rhythm.
- Keep at least one clear breathing zone around the text block for readability.
- Use controlled imbalance: artistic placement is intentional, not random.
- On mobile, preserve collage character but simplify to avoid clutter (stack/partial overlap is acceptable).

### Recommendation

The collage hero with a gradient canvas is the preferred direction after the Figma reference. It keeps the page editorial and premium, gives us room to showcase the real hero photos, and still leaves space for a floating message card without making the composition feel busy.

The split hero with product and factory cues remains the safest fallback if the collage becomes too hard to balance on smaller screens, but it should no longer be the default direction for the homepage hero.

### Combined Trio Section

- Use three equal cards or panels placed side by side on desktop and stacked on mobile.
- Card 1: sustainability proof, with concise language and one supporting visual.
- Card 2: content or editorial, such as a short article, tips, or a brand story snippet.
- Card 3: news or updates, such as launches, fairs, or company announcements.
- Keep the cards visually related but not identical, so the section feels curated rather than repetitive.
- This section should work as a bridge between commerce and brand narrative.

## 13. Agent Prompt Guide

When asking an agent to design for this repo, use prompts that reinforce the existing direction:

- Build a calm, earth-toned Greek retail homepage with strong typography and premium spacing.
- Keep the design minimal, practical, and industrial, with muted green CTAs and soft beige surfaces.
- Use responsive card layouts, restrained motion, and clear product discovery hierarchy.
- Extend the current visual language rather than replacing it.
- Treat https://www.muuto.com as an inspiration benchmark for spacing rhythm, editorial layout composition, and premium simplicity (without copying brand identity).

## 14. Inspiration Study Checklist (Muuto)

When analyzing Muuto for implementation ideas, study these layers in order:

- Information architecture: header structure, menu depth, category entry points, and how quickly users can reach products.
- Typography system: heading scale, paragraph density, contrast, and how text blocks pair with large imagery.
- Layout rhythm: section spacing, grid shifts, asymmetry, and transitions between editorial blocks and product blocks.
- Imagery behavior: crop styles, aspect ratios, lazy loading behavior, and desktop/mobile art direction differences.
- Interaction patterns: hover behavior, focus states, scrolling transitions, and motion restraint.
- Technical patterns: network waterfall, image formats/sizes, script payload strategy, and render timing.
- Accessibility baseline: heading hierarchy, keyboard flow, semantic landmarks, and contrast discipline.

Capture findings as reusable implementation rules for VIOMES, not as direct visual copies.

## 15. Reference Files

- [src/index.css](src/index.css)
- [src/App.tsx](src/App.tsx)
- [src/main.tsx](src/main.tsx)
- [src/components/layout/Layout.tsx](src/components/layout/Layout.tsx)
- [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)
- [src/pages/Home.tsx](src/pages/Home.tsx)
