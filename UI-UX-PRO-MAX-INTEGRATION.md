# UI UX Pro Max Integration Guide

## Overview

**UI UX Pro Max** is an AI-powered design system generator integrated into your superagent arsenal. It provides intelligent design recommendations across 161 industries with 67 UI styles, 161 color palettes, and 57 typography pairings.

For your VIOMES project: **Plastic Products Manufacturer → Home/Office category** applies reasoning rules for Home & Garden e-commerce.

---

## Quick Start

### Installation (CLI)

```bash
npm install -g uipro-cli
cd /path/to/viomes/homepage
uipro init --ai copilot
```

### Or Manual Integration

```bash
# Clone the repository
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git ui-ux-pro-max

# Install design system to your project
cp -r ui-ux-pro-max/.claude/skills/ui-ux-pro-max .claude/skills/
```

---

## For Your VIOMES Project

### Product Type: Home & Garden E-commerce

Your design system should follow:

- **Primary Pattern**: Clean + Browsing (Grid-based with filters)
- **Style**: Minimalism + E-commerce
- **Colors**: Natural earth tones (greens, terracottas, warm grays, whites)
- **Typography**: Clean sans-serif for readability (Montserrat, Inter, Poppins)
- **Effects**: Smooth transitions (200-300ms), hover highlights, soft shadows
- **Anti-patterns**: Avoid AI purple/pink gradients, avoid cluttered CTAs, no auto-play videos

### Key Design Rules to Follow

✅ **DO:**

- Use natural material imagery (plastic sheets, finished products in-situ)
- Grid layouts with 3-4 columns (responsive)
- Clear product categorization (Planters, Home Items, Professional)
- Smooth color swatches (similar to current implementation)
- Trust badges (EU Manufacturing, 1978 heritage)
- Hero section with hero imagery carousel ← **Already implemented!**

❌ **AVOID:**

- Overly bright neon colors (stick to greens, grays, natural earth tones)
- Harsh animations or jarring transitions
- Flooded CTAs (Amazon-style button overload)
- Auto-rotating galleries without user control
- Emojis as primary icons (use Lucide/Heroicons like current code)

---

## Usage Examples

### 1. Generate Design System for Current Page

```bash
# Generate design system matching VIOMES as e-commerce home/garden brand
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "home garden plasticware e-commerce sustainable" --design-system -p "VIOMES"
```

### 2. Get Color Palette Recommendations

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "earth tones green beige sustainable" --domain colors
```

### 3. Typography Pairing Search

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "modern clean premium e-commerce" --domain typography
```

### 4. UI Style Recommendations

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "minimalism clean e-commerce grid" --domain style
```

### 5. Anti-Patterns for Home & Garden

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "home garden e-commerce" --domain guidelines
```

---

## Design System Persistence (Recommended)

Save your VIOMES design system as source of truth:

```bash
# Generate and persist VIOMES design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "VIOMES plastic products sustainable EU manufacturing e-commerce" --design-system --persist -p "VIOMES"
```

This creates:

```
design-system/
├── MASTER.md           # Global design rules (colors, typography, spacing, components)
└── pages/
    ├── home.md         # Home page overrides
    ├── products.md     # Products page overrides
    ├── product-detail.md # Product detail overrides
    ├── about.md        # About page overrides
    └── contact.md      # Contact page overrides
```

### Hierarchical Retrieval Usage

When implementing a feature:

```
I'm building the product detail page.
Please read design-system/MASTER.md.
If design-system/pages/product-detail.md exists, prioritize its rules.
Otherwise use MASTER.md exclusively.
Now generate the code respecting these design guidelines...
```

---

## Integration with Superagent

When you request UI/UX work:

```
@superagent Create a product card component with proper spacing and hover effects
```

**Routes automatically to ui-ux-pro-max-skill** which will:

1. ✅ Check VIOMES design system (MASTER.md)
2. ✅ Apply industry rules (e-commerce home & garden)
3. ✅ Use correct colors, typography, spacing
4. ✅ Include accessibility checks (WCAG AA)
5. ✅ Validate against anti-patterns
6. ✅ Generate stack-specific code (React/TypeScript with Tailwind)

---

## Supported Tech Stacks for VIOMES

Based on current stack (React 18 + TypeScript + Tailwind + shadcn/ui):

✅ **Fully supported:**

- React (17, 18, 19+)
- Next.js (13, 14, 15+)
- Tailwind CSS
- shadcn/ui components
- TypeScript

---

## File Structure

```
.claude/skills/ui-ux-pro-max/
├── data/
│   ├── colors.csv           # 161 color palettes
│   ├── styles.csv           # 67 UI styles
│   ├── typography.csv       # 57 font pairings
│   ├── industries.csv       # 161 reasoning rules
│   └── anti-patterns.csv    # Guidelines & don'ts
├── scripts/
│   └── search.py            # Design system generator
└── templates/
    └── ui-ux-pro-max.md     # Skill prompt template

design-system/               # Your project's design system (generated)
├── MASTER.md
└── pages/
    ├── home.md
    ├── products.md
    ├── product-detail.md
    ├── about.md
    └── contact.md
```

---

## Commands for VIOMES

### Current State Analysis

```bash
# Analyze VIOMES current brand against best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "VIOMES current design" --design-system -p "VIOMES Current Analysis"
```

### Component Library Audit

```bash
# Verify shadcn/ui components align with design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "shadcn/ui components accessibility" --stack react
```

### Mobile Responsiveness Check

```bash
# Generate responsive design guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive e-commerce mobile first" --domain guidelines
```

---

## Next Steps

1. **Run the CLI installer:**

   ```bash
   uipro init --ai copilot
   ```

2. **Generate VIOMES design system:**

   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "VIOMES plastic products home garden e-commerce sustainable EU" --design-system --persist -p "VIOMES"
   ```

3. **Review generated design-system/MASTER.md** - this becomes your source of truth

4. **Update superagent prompts** to reference the design system for all UI/UX requests

5. **For any UI work**, say:
   ```
   @superagent [design request] - use VIOMES design system
   ```

---

## Resources

- **Official Repo:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Website:** https://uupm.cc/
- **Quick Start:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill#installation
- **CLI Docs:** npm package `uipro-cli`

---

## Support

If you encounter issues:

1. Ensure Python 3.x is installed: `python3 --version`
2. Clear cache: `rm -rf .claude/skills/ui-ux-pro-max/.cache`
3. Reinstall: `uipro init --ai copilot`
4. Check GitHub issues: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues
