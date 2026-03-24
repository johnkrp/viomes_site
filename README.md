# VIOMES S.A. - Developer Guide

Welcome to the VIOMES website repository! This is a modern React + TypeScript application built with Vite and Tailwind CSS. This guide explains the site's structure, key features, and how to modify them.

## 📋 Project Overview

VIOMES S.A. is a corporate website for a company with a professional product showcase, multiple pages, and interactive components. The site includes:

- **Homepage** - Landing page with hero section
- **Products Page** - Product listing with filtering and view modes (grid/list)
- **About Page** - Company information
- **Navigation System** - Multi-language support (Greek/English) with responsive navbar

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx       # Top navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   └── ScrollToTop.tsx  # Scroll-to-top button
│   └── ui/                  # Shadcn/ui components (pre-configured)
│       ├── button.tsx
│       ├── card.tsx
│       ├── check-box.tsx    # Checkboxes for filtering
│       ├── select.tsx       # Dropdown selects
│       └── ... (40+ UI components)
├── pages/                   # Page components
│   ├── Home.tsx            # Homepage
│   ├── Products.tsx        # Products listing page
│   ├── ProductDetail.tsx   # Single product detail page
│   └── About.tsx           # About us page
├── hooks/
│   └── use-mobile.tsx      # Mobile detection hook
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
└── index.css               # Global styles & CSS variables
```

## 🎨 Key Features & How to Modify

### 1. **Navigation Bar (Navbar)**

**File**: src/components/layout/Navbar.tsx

**Current Features**:

- Fixed top navigation with VIOMES logo
- Language toggle (Greek/English)
- Search, shopping cart, and user icons
- Mobile-responsive menu
- Smooth transitions on scroll

**How to Change**:

- **Logo**: Edit the `<img>` tag around line 43 to point to a different image
- **Navigation Links**: Modify the `navLinks` array (lines 22-27) to add/remove menu items
- **Colors/Styling**: Adjust Tailwind classes in the JSX
- **Logo Size**: Change the `h-10` class to scale the image

### 2. **Products Page**

**File**: src/pages/Products.tsx

**Current Features**:

- Product grid/list view toggle
- Filtering by category
- Sorting options
- Breadcrumb navigation
- Checkbox and select components for filters

**How to Change**:

- **Add Products**: Modify the `products` data array (typically at top of component)
- **Filter Logic**: Edit the filtering functions within the component
- **Layout**: Change Tailwind grid classes (`grid-cols-1`, `grid-cols-2`, etc.)
- **Remove Filters**: Delete the checkbox or select filter sections

### 3. **Site Title & Favicon**

**File**: index.html

**Current Settings**:

- Title: "VIOMES S.A." (line 7)
- Favicon: `/favicon.ico` (line 5)

**How to Change**:

- **Title**: Edit the `<title>` tag
- **Favicon**: Change `/favicon.ico` path to your icon file (must be in `public/` folder)

### 4. **Global Styles & Colors**

**File**: src/index.css

**Contains**:

- CSS variables for theming (colors, spacing, etc.)
- Tailwind configuration
- Global font imports
- Custom component styles

**How to Change**:

- **Color Scheme**: Modify CSS variables like `--primary`, `--secondary` in `:root {}`
- **Fonts**: Update `@import` statements or font family declarations
- **Spacing**: Adjust custom CSS variables for consistency

### 5. **UI Components**

**File**: src/components/ui/

All Shadcn/ui components are pre-installed here. These are ready-to-use components like buttons, cards, modals, etc.

**How to Use**:

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

**Note**: Use `check-box.tsx` not `checkbox.tsx` (file naming convention)

### 6. **Routing & Pages**

**File**: src/App.tsx

Contains the routing configuration for all pages.

**How to Add a New Page**:

1. Create a new file in `src/pages/` (e.g., `NewPage.tsx`)
2. Add it to the routing configuration in `App.tsx`
3. Add the link to `Navbar.tsx` navigation links

### 7. **Mobile Responsiveness**

**File**: src/hooks/use-mobile.tsx

This hook detects if the user is on mobile. Components use it to show/hide elements.

**How to Use**:

```tsx
const isMobile = useMobile();
return <>{isMobile ? <MobileView /> : <DesktopView />}</>;
```

## 🛠️ Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run all quality checks
npm run lint

# Individual checks
npm run lint:types   # TypeScript type checking
npm run typecheck    # TypeScript type checking
```

## 🧪 Temporary Packshot Test Mode

This project supports a reversible test mode for product packshots used in:

- Product list cards (`Products` page)
- Product main image (`ProductDetail` page)

Test images are loaded from:

- `public/images/packshot-test`

Enable the override in `.env.local`:

```bash
VITE_USE_TEST_PACKSHOTS=true
```

Disable and return to catalog JSON URLs:

```bash
VITE_USE_TEST_PACKSHOTS=false
```

Notes:

- The catalog data files are not modified.
- This mode is intended for temporary visual testing only.

## 📦 Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Pre-built accessible components
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## ⚙️ Configuration Files

- **`tsconfig.json`** - TypeScript configuration
- **`tailwind.config.cjs`** - Tailwind CSS theme configuration
- **`vite.config.ts`** - Vite build configuration
- **`postcss.config.cjs`** - PostCSS configuration for Tailwind

## 🚀 Quick Tips

1. **Path Alias**: Use `@/` to import from `src/` (configured in `tsconfig.json`)
2. **Component Imports**: Always import UI components from `@/components/ui/`
3. **File Naming**: UI components use kebab-case (e.g., `check-box.tsx`)
4. **Styling**: Prefer Tailwind classes over custom CSS
5. **Mobile First**: Design with mobile in mind, then enhance for desktop

## 🐛 Common Issues & Solutions

| Issue                             | Solution                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Import error "Cannot find module" | Check file path, ensure correct file naming (kebab-case for UI components)   |
| Style not applied                 | Verify CSS variable exists in `src/index.css` or use Tailwind class directly |
| Type errors                       | Run `npm run lint:types` to see detailed TypeScript errors                   |
| Component not rendering           | Check routing in `App.tsx` and ensure component is exported                  |

## 📝 Best Practices

- Keep components small and focused
- Use TypeScript types for props
- Leverage Shadcn/ui components for consistency
- Use Tailwind classes instead of custom CSS when possible
- Test responsive design on multiple screen sizes

---

For questions or issues, refer to the Vite, React, or Tailwind CSS documentation.

## AI Tooling Setup (21st.dev MCP + UI UX Pro Max)

This project includes workspace setup for:

- **21st.dev Magic MCP** (component generation in IDE)
- **UI UX Pro Max skill** (design-system/UI guidance for Copilot workflow mode)

### 1) 21st.dev MCP setup (VS Code workspace)

Create [/.vscode/mcp.json](.vscode/mcp.json) in your local workspace if it does not exist.

What you need:

1. Get an API key from 21st.dev Magic Console.
2. In VS Code, enable MCP and reload window.
3. On first use, enter the key when prompted (`apiKey` input).

Notes:

- This runs locally through `npx`.
- No server (Plesk) Node.js requirement for this tool.

### 2) UI UX Pro Max setup (GitHub Copilot workflow mode)

Run from project root:

```bash
npm run uipro:init:copilot
```

This installs/copied skill assets for Copilot usage.

Update later with:

```bash
npm run uipro:update
```

Usage in Copilot chat:

```text
/ui-ux-pro-max Build a landing page for my SaaS product
```

### Prerequisites

- Node.js (local machine)
- Python 3.x (required by UI UX Pro Max search scripts)

### Deployment note

These tools are **development-time only**. They do not replace Vite production build.

## Copilot Orchestra (project workflow)

Starter Orchestra agent files are included at project root:

- [Conductor.agent.md](Conductor.agent.md)
- [planning-subagent.agent.md](planning-subagent.agent.md)
- [implement-subagent.agent.md](implement-subagent.agent.md)
- [code-review-subagent.agent.md](code-review-subagent.agent.md)

Generated plan artifacts are stored in [plans/README.md](plans/README.md).

Suggested use:

1. Select **Conductor** mode in Copilot Chat.
2. Request the task (feature/fix/refactor).
3. Approve the generated plan.
4. Execute phase-by-phase (implement → review → commit).
