# VarnaAI Design System

**Location**: `D:\VarnaAI\Websites\design\`
**Purpose**: Unified design system for all VarnaAI apps (C3, FwChange, Pension, SEO)
**Theme**: Electric Luxury (dark purple + neon accents)

---

## Quick Start

Open files in browser to preview:

```bash
# Windows - Open individual landing pages
start landing-c3-electric.html      # C3 Compliance (cyan/purple)
start landing-fwchange.html         # FwChange (blue/violet)
start landing-pension-v2-electric.html  # RetirementAI (green/purple)
start landing-seo.html              # SEO Agent (cyan/purple)

# Login pages (app-specific)
start login-c3.html
start login-fwchange.html
start login-pension.html
start login-seo.html

# Dashboards
start dashboard-c3.html
start dashboard-pension.html
start dashboard-seo.html
```

---

## File Structure

```
design/
├── CLAUDE.md                      # This file (design instructions)
├── README.md                      # Design system overview
│
├── Landing Pages (Electric Luxury Theme)
│   ├── landing-c3-electric.html   # C3 Compliance (cyan/purple)
│   ├── landing-fwchange.html      # FwChange (blue/violet)
│   ├── landing-pension-v2-electric.html  # RetirementAI (green/purple)
│   └── landing-seo.html           # SEO Agent (cyan/purple)
│
├── Login Pages
│   ├── login-c3.html              # C3 login
│   ├── login-fwchange.html        # FwChange login
│   ├── login-pension.html         # RetirementAI login
│   └── login-seo.html             # SEO Agent login
│
├── Dashboards
│   ├── dashboard-c3.html          # C3 dashboard
│   ├── dashboard-pension.html     # RetirementAI dashboard
│   └── dashboard-seo.html         # SEO Agent dashboard
│
└── reference/                     # Reference images
```

---

## Electric Luxury Theme

All landing pages use a unified "Electric Luxury" aesthetic with app-specific accent colors.

### Shared Foundation

| Element | Value |
|---------|-------|
| **Background** | Dark purple `#030014` |
| **Secondary BG** | `#0a0520` |
| **Card BG** | `#110830` with glassmorphism |
| **Text Primary** | `#ffffff` |
| **Text Secondary** | `#94a3b8` |

### App Color Palettes

| App | Primary | Secondary | Tertiary |
|-----|---------|-----------|----------|
| **C3 Compliance** | Cyan `#06b6d4` | Purple `#7c3aed` | Violet `#a78bfa` |
| **FwChange** | Cyan `#06b6d4` | Purple `#7c3aed` | Light Cyan `#22d3ee` |
| **RetirementAI** | Green `#10b981` | Purple `#7c3aed` | Emerald `#34d399` |
| **SEO Agent** | Cyan `#06b6d4` | Purple `#7c3aed` | Violet `#a78bfa` |

---

## 🚨 CRITICAL WORKFLOW RULE 🚨

**THE DESIGN FOLDER IS THE SOURCE OF TRUTH FOR ALL APPS.**

When updating themes/styles:
1. **UPDATE HERE FIRST** - Make all changes in `D:\VarnaAI\Websites\design\`
2. **THEN DEPLOY** - Copy updated templates to individual apps
3. **THEN REBUILD** - Rebuild the app's Docker container

### Deployment Paths

| Template | Target App Location |
|----------|---------------------|
| `landing-fwchange-electric.html` | `apps/fwchange/landing/index.html` |
| `dashboard-fwchange.html` | `apps/fwchange/src/` (React components) |
| `login-fwchange.html` | `apps/fwchange/src/` (React components) |
| `landing-c3-electric.html` | `apps/dashboard/landing/index.html` |
| `landing-pension-v2-electric.html` | `apps/pension/landing/index.html` |

### Why This Matters
- **Consistency**: All apps share the same design language
- **Single Source**: Changes in one place propagate to all apps
- **Version Control**: Design system is versioned with the repo
- **Efficiency**: No hunting for styles across multiple codebases

---

## Electric Luxury Features

### 1. Animated Mesh Gradients
```css
.mesh-gradient-1 {
    background: radial-gradient(ellipse at 20% 20%,
        var(--accent-primary) 0%, transparent 50%);
    filter: blur(100px);
    mix-blend-mode: screen;
    animation: mesh-float 20s ease-in-out infinite;
}
```

### 2. Floating Neon Particles
```css
.particle {
    background: radial-gradient(circle,
        var(--accent-primary), transparent 70%);
    animation: particle-float 15s ease-in-out infinite;
}
```

### 3. Glassmorphism Cards
```css
.feature-card {
    background: rgba(17, 8, 48, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(var(--accent-primary-rgb), 0.15);
}
```

### 4. Aurora CTA Border
```css
.cta-card::before {
    background: conic-gradient(from var(--gradient-angle),
        var(--accent-primary), var(--accent-secondary),
        var(--accent-tertiary), var(--accent-primary));
    animation: gradient-rotate 3s linear infinite;
}
```

### 5. Gradient Text
```css
.gradient-text {
    background: var(--gradient-hero);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

---

## CSS Variables Template

```css
:root {
    /* App-specific accents (change per app) */
    --accent-primary: #06b6d4;
    --accent-secondary: #7c3aed;
    --accent-tertiary: #a78bfa;
    --accent-primary-rgb: 6, 182, 212;

    /* Shared backgrounds */
    --bg-primary: #030014;
    --bg-secondary: #0a0520;
    --bg-card: #110830;

    /* Gradients */
    --gradient-hero: linear-gradient(135deg,
        var(--accent-primary) 0%,
        var(--accent-secondary) 50%,
        var(--accent-tertiary) 100%);
    --gradient-button: linear-gradient(135deg,
        var(--accent-primary) 0%,
        color-mix(in srgb, var(--accent-primary), #000 20%) 100%);

    /* Text */
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
}
```

---

## User Flow

```
Landing Page → Login → Dashboard
     ↓           ↓         ↓
  Product    App Selector  App-specific
  Showcase   (C3/FwChange/ Dashboard
             Pension)
```

---

## Design Principles

### 1. Gold Border Container
Main dashboard wrapped in 1px gold border with subtle glow.

### 2. Left Tab Navigation
Vertical tabs for switching between:
- Automated Reports
- Audit Trail
- Executive Summaries

### 3. Card Grid System
- 2-column grid on desktop
- 1-column on mobile
- Consistent spacing (24px gaps)

### 4. Large Compliance Score
Central 92% circular progress with gold stroke.

### 5. Shield Badges
Compliance status icons for each framework (GDPR, ISO, PCI, NIS2).

### 6. App-Specific Accents
Each app has its own accent color while sharing the dark navy theme.

---

## Implementation Guide

### For C3 (Compliance)
```
Primary data: GDPR, ISO 27001, PCI-DSS compliance scores
Charts: Compliance bar chart, audit activity line
Files: Audit documentation list
```

### For FwChange (Firewall)
```
Primary data: Rule compliance, change request status
Charts: Rule analysis, approval timeline
Files: Change request documents
```

### For Pension (RetirementAI)
```
Primary data: Portfolio health, risk score
Charts: Portfolio allocation, performance timeline
Files: Investment reports
```

---

## Typography

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Headings */
h1: 2rem, 700 weight
h2: 1.5rem, 600 weight
h3 (card titles): 0.875rem, 600 weight, uppercase

/* Body */
body1: 1rem
body2: 0.875rem
caption: 0.75rem
```

---

## Component Specs

### Cards
```css
background: #0f2340;
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;
padding: 24px;
```

### Progress Bars
```css
height: 6px;
background: rgba(255, 255, 255, 0.1);
fill: linear-gradient(90deg, #3b82f6, #06b6d4);
border-radius: 3px;
```

### Buttons
```css
background: linear-gradient(135deg, #3b82f6, #2563eb);
border-radius: 8px;
padding: 8px 16px;
font-weight: 600;
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 1024px | 2-column grid, full sidebar |
| 768-1024px | 1-column grid, icon-only sidebar |
| < 768px | 1-column, horizontal tabs |

---

## Dependencies

- **Chart.js**: Bar and line charts
- **Inter Font**: Typography (system fallback available)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## Migration Checklist

When applying to an app:

- [ ] Copy CSS variables to app's theme
- [ ] Replace existing cards with new design
- [ ] Update color tokens (remove hardcoded values)
- [ ] Add gold border container wrapper
- [ ] Replace sidebar with tab navigation
- [ ] Update charts to match Chart.js config
- [ ] Test responsive breakpoints
- [ ] Verify accessibility (contrast ratios)

---

## Known Issues

1. **Safari**: Glassmorphism blur may need `-webkit-` prefix
2. **Chart.js**: Requires v3+ for rounded bar corners
3. **Mobile**: Tab text may overflow on small screens

---

## Changelog

### 2025-12-25 (Electric Luxury Update)
- ✅ Applied Electric Luxury theme to all 4 landing pages
- ✅ C3 Compliance: Cyan/Purple palette (approved)
- ✅ RetirementAI: Green/Purple palette (approved)
- ✅ SEO Agent: Cyan/Purple palette (approved)
- ✅ FwChange: Blue/Violet palette (approved) - replaced orange
- ✅ Created app-specific login pages
- ✅ Created app-specific dashboards
- ✅ Documented CSS variables and theme features

### 2025-12-25 (Initial)
- Initial design system created
- Test dashboard built
- Reference image documented
