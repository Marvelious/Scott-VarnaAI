# VarnaAI App Audit Status

**Purpose**: Track app audits and design fixes needed
**Last Updated**: 2025-12-25

---

## App Audit Status

| App | Location | Audit Status | Issues Found |
|-----|----------|--------------|--------------|
| C3 Compliance | `D:\VarnaAI\dashboard` | ❌ NOT DONE | TBD |
| FwChange | `D:\VarnaAI\fwchange` | ❌ NOT DONE | TBD |
| Pension | `D:\VarnaAI\pension` | ❌ NOT DONE | TBD |

---

## Known Issues From Previous Work

### Previous Lies / Incomplete Work
- Claimed to add landing page reviews to todo but didn't
- Dashboard pain points identified but not fixed
- App audits claimed but never properly done

### Footer Issues (Previous Session)
- Footer design was inconsistent
- Legal links didn't work
- App-specific branding not applied
- Mobile responsiveness problems

---

## Design Components Needed

### 1. Header Menu (Shared Template)
```
Logo | Features | Benefits | Pricing | Contact | [Login] [CTA]
```
- Sticky navigation
- Mobile hamburger menu
- App-specific accent colors
- Consistent across all 3 apps

### 2. Footer (Shared Template, App-Specific Names)
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]           Product    Company    Legal    Connect    │
│  App tagline      Features   About      Privacy  Twitter    │
│                   Pricing    Careers    Terms    LinkedIn   │
│                   Demo       Contact    Impressum GitHub    │
│                   Docs       Blog       GDPR               │
├─────────────────────────────────────────────────────────────┤
│  © 2025 VarnaAI. All rights reserved.  |  Made in Varna    │
└─────────────────────────────────────────────────────────────┘
```

### 3. Legal Pages (Same Template, Different App Names)
- Privacy Policy
- Terms of Service
- Impressum (German requirement)
- GDPR/DSGVO

Each legal page uses identical template, just replace:
- `[APP_NAME]` → C3 / FwChange / RetirementAI
- `[APP_URL]` → domain
- `[APP_DESCRIPTION]` → one-liner

---

## Docker Testing Constraints

| Apps Running | RAM Usage | Recommendation |
|--------------|-----------|----------------|
| 1 app | ~25GB | ✅ Comfortable |
| 2 apps | ~50GB (90%) | ⚠️ Maximum |
| 3 apps | >60GB | ❌ Don't do it |

**Audit Strategy**: Run agents ONE AT A TIME, max 2 Docker apps simultaneously.

---

## Audit Checklist Per App

### Structure Audit
- [ ] Review folder structure
- [ ] Check component organization
- [ ] Verify routing setup
- [ ] Review state management
- [ ] Check API structure

### Design Audit
- [ ] Header matches new design
- [ ] Footer matches template
- [ ] Legal pages exist and work
- [ ] Color tokens use CSS variables
- [ ] Mobile responsive
- [ ] Accessibility basics (contrast, focus states)

### Landing Page Audit
- [ ] Hero section showcases app properly
- [ ] Features highlight real capabilities
- [ ] CTAs are clear and work
- [ ] Stats/metrics are accurate
- [ ] Images/screenshots present

---

## Next Steps

1. **User Approval**: Wait for "yes" to start audits
2. **Audit Order**: C3 → FwChange → Pension (one at a time)
3. **Fix Issues**: Document and fix as discovered
4. **Apply Design**: Header, footer, legal pages to all apps
