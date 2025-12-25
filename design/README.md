# VarnaAI Unified Dashboard Design System

**Created**: 2025-12-25
**Purpose**: Shared dashboard design for C3, FwChange, and Pension apps
**Reference**: `D:/VarnaAI/SEO/comprehensive-compliance-reporting-gdpr-pci-dss-iso.png`

---

## Design Overview

Premium compliance dashboard with dark theme and gold accents.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a1628` | Main background |
| `--bg-secondary` | `#0d1e36` | Card backgrounds |
| `--bg-elevated` | `#132743` | Hover states |
| `--accent-gold` | `#c9a227` | Border accents, highlights |
| `--accent-blue` | `#3b82f6` | Charts, progress bars |
| `--accent-cyan` | `#06b6d4` | Secondary highlights |
| `--text-primary` | `#ffffff` | Main text |
| `--text-secondary` | `#94a3b8` | Muted text |
| `--success` | `#10b981` | Compliant status |
| `--warning` | `#f59e0b` | Partial compliance |
| `--error` | `#ef4444` | Non-compliant |

### Layout Structure

```
+--------------------------------------------------+
|  [Logo]                              [User Menu] |
+--------+-----------------------------------------+
| TABS   |  MAIN CONTENT AREA                      |
|        |  +-------------+  +------------------+  |
| [Auto] |  | GDPR Chart  |  | ISO 27001 Bars   |  |
| [Audit]|  +-------------+  +------------------+  |
| [Exec] |                                         |
|        |  +-------------+  +------------------+  |
|        |  | 92% Score   |  | Report Gen       |  |
|        |  | [Badges]    |  +------------------+  |
|        |  +-------------+                        |
|        |                                         |
|        |  +-------------+  +------------------+  |
|        |  | PCI-DSS     |  | Audit Activity   |  |
|        |  | File List   |  | Line Chart       |  |
|        |  +-------------+  +------------------+  |
+--------+-----------------------------------------+
```

### Components

1. **Gold Border Container** - Main wrapper with 1px gold border
2. **Left Tab Navigation** - Vertical tabs for report types
3. **Compliance Score Circle** - Large circular progress (92%)
4. **Bar Chart** - GDPR compliance metrics
5. **Progress Bars** - ISO 27001 tracking
6. **Shield Badges** - Compliance status icons
7. **File List** - PCI-DSS audit documents
8. **Line Chart** - Audit trail activity

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Test dashboard (standalone) |
| `styles.css` | Dashboard styles |
| `dashboard.js` | Chart rendering |
| `README.md` | This documentation |

---

## App-Specific Customization

Each app uses the same base design with different data:

| App | Primary Data | Secondary Data |
|-----|--------------|----------------|
| **C3** | GDPR, ISO 27001, PCI-DSS | Compliance scans |
| **FwChange** | Firewall rules, Change requests | Approval workflows |
| **Pension** | Portfolio health, Risk score | Investment tracking |

---

## Implementation

### Option A: Copy HTML/CSS
Copy the test dashboard files directly into each app's frontend.

### Option B: Shared NPM Package
Create `@varnaai/dashboard-ui` package with shared components.

### Option C: Web Components
Build framework-agnostic web components.

**Recommended**: Option A for speed, Option B for long-term maintenance.
