# VarnaAI Static Demo Pages - Domain Mapping

**Created**: 2025-12-26
**Hosting**: All-Inkl (static HTML files)
**Status**: Ready for upload

---

## Domain Mapping Table

| Landing Page | Subdomain | Full URL | Status |
|--------------|-----------|----------|--------|
| `retirement.html` | demo-retirement | https://demo-retirement.varnaai.com | 📦 Ready |
| `fwchange.html` | demo-fwchange | https://demo-fwchange.varnaai.com | 📦 Ready |
| `c3.html` | demo-c3 | https://demo-c3.varnaai.com | 📦 Ready |
| `seo.html` | demo-seo | https://demo-seo.varnaai.com | 📦 Ready |
| `varnaai-agents.html` | demo-agents | https://demo-agents.varnaai.com | 📦 Ready |
| `webscrap.html` | demo-webscrap | https://demo-webscrap.varnaai.com | 📦 Ready |
| `projectmanager.html` | demo-pm | https://demo-pm.varnaai.com | 📦 Ready |
| `agenticcoder.html` | demo-coder | https://demo-coder.varnaai.com | 📦 Ready |

---

## Files to Upload Per Subdomain

Each subdomain needs these files:

```
/public_html/
├── index.html     (renamed from [app].html)
└── landing.css    (shared stylesheet)
```

### Upload Checklist

| Subdomain | Rename File | Copy landing.css |
|-----------|-------------|------------------|
| demo-retirement | retirement.html → index.html | ✅ |
| demo-fwchange | fwchange.html → index.html | ✅ |
| demo-c3 | c3.html → index.html | ✅ |
| demo-seo | seo.html → index.html | ✅ |
| demo-agents | varnaai-agents.html → index.html | ✅ |
| demo-webscrap | webscrap.html → index.html | ✅ |
| demo-pm | projectmanager.html → index.html | ✅ |
| demo-coder | agenticcoder.html → index.html | ✅ |

---

## All-Inkl DNS Setup Required

In KAS (All-Inkl admin panel):
1. **Domains** → **Subdomains** → Add each subdomain
2. Point each to its own folder under varnaai.com
3. Enable SSL (Let's Encrypt automatic)

### DNS Records to Create

| Subdomain | Type | Target |
|-----------|------|--------|
| demo-retirement.varnaai.com | A | All-Inkl server IP |
| demo-fwchange.varnaai.com | A | All-Inkl server IP |
| demo-c3.varnaai.com | A | All-Inkl server IP |
| demo-seo.varnaai.com | A | All-Inkl server IP |
| demo-agents.varnaai.com | A | All-Inkl server IP |
| demo-webscrap.varnaai.com | A | All-Inkl server IP |
| demo-pm.varnaai.com | A | All-Inkl server IP |
| demo-coder.varnaai.com | A | All-Inkl server IP |

---

## App Color Themes (Reference)

| App | Primary Color | Hex Code |
|-----|---------------|----------|
| RetirementAI | Green/Emerald | #10b981 |
| FwChange | Blue/Cyan | #06b6d4 |
| C3 Compliance | Cyan/Purple | #06b6d4 |
| SEO Agent | Cyan/Purple | #06b6d4 |
| VarnaAI Agents | Orange/Gold | #f59e0b |
| WebScrap | Blue/Sky | #0ea5e9 |
| ProjectManager | Green/Lime | #22c55e |
| AgenticCoder | Pink/Rose | #ec4899 |

---

## Next Steps

1. [ ] Create 8 subdomains in All-Inkl KAS
2. [ ] Upload files via FTP to each subdomain folder
3. [ ] Enable SSL certificates
4. [ ] Test all 8 URLs
5. [ ] Update portfolio pages on varnaai.com with new demo links
6. [ ] Update CLAUDE.md with live URLs

---

## Alternative: Single Demos Subdomain

If 8 subdomains is too many, alternative approach:

```
https://demos.varnaai.com/
├── retirement/index.html
├── fwchange/index.html
├── c3/index.html
├── seo/index.html
├── agents/index.html
├── webscrap/index.html
├── pm/index.html
└── coder/index.html
```

URLs would be:
- https://demos.varnaai.com/retirement/
- https://demos.varnaai.com/fwchange/
- etc.

**Pros**: One subdomain, easier to manage
**Cons**: Less professional-looking URLs
