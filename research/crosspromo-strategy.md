# Cross-Promotion Implementation Plan
## Mapping the Strategy to Your Actual Sites + Ops Hub

**Date:** Nov 4, 2025
**Status:** Research & Analysis (No code yet)
**Objective:** Wire cross-promotion matrix + ops hub across 5 sites and 3 apps with minimal overhead

---

## CURRENT STATE ANALYSIS

### Websites (Assumed Tech Stack from Docs)

| Site | Domain | Current Tech | SEO Status | Cross-Promo Readiness |
|------|--------|--------------|-----------|----------------------|
| **VarnaAI.com** | varnaai.com | WordPress (likely) | 🔴 BROKEN (H1s, 404s, images) | ⚠️ Needs immediate fixes |
| **AI-Projektmanager.de** | ai-projektmanager.de | Unknown (Next.js or WordPress) | 🟡 Medium | 🟡 Needs plugin/embed |
| **Varna-Agenten.de** | varna-agenten.de | Unknown | 🟡 Medium | 🟡 Needs plugin/embed |
| **ClassicSecurity.net** | classicsecurity.net | Unknown | 🟡 Medium | 🟡 Needs plugin/embed |
| **AIMarketingBG.com** | aimarketingbg.com | Unknown | 🟡 Medium | 🟡 Needs plugin/embed |

### Apps (SaaS)

| App | Type | Tech Stack | Audience | Cross-Promo Need |
|-----|------|-----------|----------|------------------|
| **RetirementAI** | YMYL Consumer Finance | React/Vue? | B2C/Consumers | Limited (labs/footer only) |
| **VarnaAI Platform** | Dev/Infra | Next.js + NestJS | Developers | High (docs, integrations, examples) |
| **FwChange** | Enterprise SaaS | Node/TS + React | Security/Network Teams | High (pricing, features, integrations) |
| **AgenticCoder** | Multi-Agent Coding | FastAPI + React | Dev Teams | High (features, comparison pages) |
| **AI Project Manager** | Enterprise SaaS | Next.js or Node/Express | German SMB/Enterprise | High (features, pricing, integrations) |
| **C3 (Compliance)** | Enterprise SaaS | Node/TS + Postgres | German Compliance | High (features, pricing, integrations) |

---

## OPS HUB INTEGRATION POINTS

### What the Hub Can Provide (Per Site)

```
ops.yourdomain.com/
├── /flags/:project.json          ← Feature flags (per site)
├── /embed/feedback.js             ← Feedback widget
├── /hook/:project                 ← Webhook capture
├── /webhooks/:project/replay      ← Webhook replay (for dev)
├── /cancel?cust=...&sub=...       ← Stripe cancel retention flow
├── /digests/:project/slack        ← Slack digest config
├── /diffs/:project                ← Visual regression diffs
└── /config/:project               ← Project metadata (links, social, etc.)
```

### Module Priority (by ROI × Implementation Difficulty)

**🟢 IMMEDIATE (Week 1 - High Value, Low Complexity)**
1. **Flags Module** (`/flags/:project.json`)
   - Purpose: Feature toggles, A/B test controls, gradual rollouts
   - Sites needing: VarnaAI.com (hero alternates), AI-PM (pricing variants)
   - Effort: Already built, just wire it in
   - ROI: Can A/B test CTAs, gradual rollout of cross-promo links

2. **Feedback Widget** (`/embed/feedback.js`)
   - Purpose: Collect user feedback (bug reports, feature requests, confusion)
   - Sites needing: All 5 sites + 3 apps
   - Effort: Add 1 script tag to footer
   - ROI: Tells you what's confusing users; feeds into roadmap

3. **Footer Config** (`/config/:project`)
   - Purpose: Centralized "Brands & Products" footer links, social links, legal links
   - Sites needing: All 5 sites
   - Effort: Hub serves JSON; each site fetches and renders (custom per site)
   - ROI: Single source of truth for cross-links; A/B test footer link order/messaging

**🟡 WEEK 2-3 (Medium Value, Medium Complexity)**
4. **Webhook Inbox** (`/hook/:project + /replay`)
   - Purpose: Capture Stripe webhooks, GitHub events; replay in dev
   - Sites needing: SaaS apps (FwChange, AI-PM, C3, AgenticCoder) + main hub
   - Effort: Update webhook endpoints in Stripe/GitHub to point to hub
   - ROI: Easier debugging, can test cancel flow without manual Stripe calls

5. **Slack Digests** (`/digests/:project/slack`)
   - Purpose: Daily rollup of user feedback, flagged issues, churn signals
   - Sites needing: All products (ops visibility)
   - Effort: Parse feedback/hook logs, format, post to Slack at 8am
   - ROI: Ops hygiene; you see churn/bugs early

**🔴 MONTH 2 (Nice-to-Have, Higher Complexity)**
6. **Visual Regression** (`/diffs/:project`)
   - Purpose: Screenshot landing pages daily/on-deploy; spot broken layouts
   - Sites needing: Marketing sites (VarnaAI, AI-PM, Varna-Agenten, ClassicSecurity, AIMarketingBG)
   - Effort: Playwright script + cron, Slack webhook
   - ROI: Catch broken images/layouts before users complain

7. **Cancel Retention Flow** (`/cancel?...`)
   - Purpose: Replace "Cancel subscription" link; offer pause/discount before kill
   - Sites needing: SaaS apps (FwChange, AI-PM, C3, AgenticCoder)
   - Effort: Swap cancel URL, hub calls Stripe API server-side
   - ROI: Reduce churn by 5-15% (proven in SaaS)

---

## PER-SITE CROSS-PROMO CHECKLIST

### 1. VarnaAI.com (Hub)

**Current Role:** Hub site, promotes all B2B apps
**Cross-Promo Targets:** AI-PM, C3, FwChange, Varna-Agenten, ClassicSecurity, VarnaAI Platform

**Ops Hub Modules Needed:**
- ✅ Flags (hero CTA variants)
- ✅ Feedback widget
- ✅ Footer config (network links)
- ⚠️ Visual regression (homepage hero, product cards)

**Pages to Update (No Code Yet, Just Map):**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage Hero | Single "Get Started" CTA | Add "Explore Products" nav | "Secure AI tools for SMEs" | /products (nav page listing all) |
| /Products (NEW) | Doesn't exist | Top nav link | "All Varna AI products" | Listing with 4-6 product cards |
| /Pricing | Current pricing | Right sidebar "Related tools" | "Need project compliance?" | ai-projektmanager.de/pricing?utm_source=... |
| Docs | Architecture docs | Inline "Related products" | "Build on VarnaAI Platform" | platform.varnaai.com/docs |
| Footer | Current | Replace/expand "Brands & Products" | Fetch from hub config | /config/varnaai |
| Case Studies | Existing | Add "Built with [tool]" tag | "See how AI-PM + FwChange worked together" | c3.example/case-studies?utm_... |
| Blog | Existing articles | "Related tools" block after para 4 | Context-matched (e.g., GDPR post → C3 link) | Manual + UTM |

**Tech Stack Implication:**
- If WordPress: use custom plugin to fetch `ops.yourdomain/config/varnaai` and render footer; or hardcode links + update via Cloudflare Worker redirect
- If headless/Next.js: fetch config in `_app` layout; render Footer component

**Immediate Wins (this week):**
1. Add top nav "Products" → link to new /products page
2. List 5 B2B apps with 1-line description + CTA
3. Add footer "Brands & Products" block with AI-PM, C3, FwChange, Varna-Agenten, ClassicSecurity
4. Update pricing page to mention C3/FwChange in right rail

---

### 2. AI-Projektmanager.de (German SaaS)

**Current Role:** Core SaaS product, enterprise PM + compliance
**Cross-Promo Targets:** C3 (compliance pack), FwChange (audit trails), VarnaAI Platform (tech credibility), ClassicSecurity (trust)

**Ops Hub Modules Needed:**
- ✅ Flags (pricing tiers, trial length variants)
- ✅ Feedback widget (German support needed?)
- ✅ Footer config
- ⚠️ Webhook inbox (for trial signups, onboarding webhooks)
- ✅ Cancel retention flow (high-value customers)

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage | Hero + Features | Top nav → "Integrations & Tools" | "Komplettes Compliance-Ökosystem" | /integrations |
| /Integrations (EXISTS?) | Unknown | Right rail "Governance Partners" | "Automatisiere Compliance mit C3" | c3.example/de?utm_... |
| /Pricing | Current tiers | Right sidebar "Compliance Pack" | "GDPR/NIS2 Docs: C3 integration" | c3.example/de/pricing?utm_... |
| /Security | Security/compliance page | Sidebar "Audit Trail + Compliance" | "Automate evidence for FwChange audits" | fwchange.example/audits?utm_... |
| Onboarding Checklist | Exists? | "Add compliance pack" checkbox | "Document projects with AI PM; auto-gen evidence" | c3.example/demo?utm_source=aipm-onboarding |
| Empty States (no projects) | Unknown | Upsell CTA | "Need firewall change governance?" | fwchange.example/integrations?utm_... |
| Docs | Existing | Inline links to platform/C3/FwChange | "See integration guides" | platform.varnaai.com/guides/aipm-fwchange |
| Footer | Current | Fetch from hub | "Related Tools" block | /config/aipm-de |

**Tech Stack Implication:**
- Language: German UI required; copy needs native "Sie" form
- If WordPress with WPML: update strings per language, fetch hub config per lang
- If Next.js: i18n setup; fetch config with `?lang=de`

**Immediate Wins:**
1. Add /integrations page listing C3, FwChange, VarnaAI Platform
2. Pricing page: add "Compliance Pack" upsell (C3 link)
3. Security page: add FwChange audit trail mention
4. Update onboarding: "Add C3 for automatic compliance docs"

---

### 3. C3 (Compliance Command Center)

**Current Role:** Compliance automation SaaS
**Cross-Promo Targets:** AI-Projektmanager.de (governed delivery), FwChange (audit trails), ClassicSecurity (trust), VarnaAI Platform (tech credibility)

**Ops Hub Modules Needed:**
- ✅ Flags (compliance rule versions, feature toggles)
- ✅ Feedback widget
- ✅ Footer config
- ✅ Webhook inbox (scan results, exports)
- ✅ Cancel retention (compliance is sticky; low churn expected)

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage Hero | Unknown | Add secondary CTA | "Plan projects with AI PM →" | ai-projektmanager.de?utm_source=c3-hero |
| /Scan Results (in-app) | Unknown | "Export Evidence" banner | "Automate firewall changes → FwChange" | fwchange.example/integrations?utm_... |
| /Compliance Rules (in-app) | Unknown | "Related Tools" sidebar | "Governed project planning" | ai-projektmanager.de/compliance?utm_... |
| /Resources Hub | Exists? | "Related Tools" block | "Learn governance with AI PM" | ai-projektmanager.de/blog/gdpr-projects?utm_... |
| Documentation | Existing | Inline "See how FwChange + C3 work together" | Case studies, integration guides | platform.varnaai.com/guides/c3-fwchange |
| Footer | Current | Fetch from hub | "Related Tools" block | /config/c3 |
| Pricing | Current | Right sidebar | "Need project governance?" | ai-projektmanager.de/pricing?utm_... |

**Tech Stack Implication:**
- Backend: Node/TS + Postgres; probably Next.js or custom React
- In-app banners: fetch flags from hub; conditionally show based on user.plan or scan.result_type
- Integrations page: hardcode or fetch from CMS

**Immediate Wins:**
1. Add in-app banner: "Export compliance docs + automate evidence in FwChange"
2. Pricing page: "Need project plans for SOX/PCI? AI-PM integrates here"
3. Resources: "AI-PM + C3 case study" blog post
4. Footer: add AI-PM, FwChange, ClassicSecurity links

---

### 4. FwChange (Firewall Change Mgmt)

**Current Role:** Enterprise security SaaS (Jira-native)
**Cross-Promo Targets:** C3 (compliance pack), AI-Projektmanager.de (change planning), ClassicSecurity (audits), VarnaAI Platform (integration recipes/Jira)

**Ops Hub Modules Needed:**
- ✅ Flags (Jira workflow variants, vendor toggles)
- ✅ Feedback widget
- ✅ Footer config
- ✅ Webhook inbox (Jira change requests, Palo Alto webhooks)
- ✅ Cancel retention (enterprise = sticky, low churn)

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage Hero | Unknown | Secondary CTA | "Automate compliance evidence" | c3.example?utm_source=fwchange-hero |
| /Integrations Page | Exists? | "Compliance & Governance" section | "Generate SOX/PCI evidence with C3" | c3.example/guides/fwchange?utm_... |
| /Jira Integration | Exists? | Sidebar "Governance Tools" | "Plan changes with AI PM" | ai-projektmanager.de/integrations/jira?utm_... |
| Success Toasts (in-app) | Unknown | "Change approved!" → next step | "Auto-generate compliance evidence?" | c3.example/demo?utm_source=fwchange-approval |
| /Resources Hub | Unknown | "Related Tools" section | "AI PM for change planning; C3 for evidence" | ai-projektmanager.de + c3.example (both UTM) |
| Docs / Integration Guides | Existing | Inline links | "See how Jira + FwChange + C3 work" | platform.varnaai.com/guides/fwchange-c3 |
| Footer | Current | Fetch from hub | "Related Tools" block | /config/fwchange |
| Pricing | Current | Right sidebar | "Need compliance reporting?" | c3.example/pricing?utm_... |

**Tech Stack Implication:**
- Likely Node/TS + React frontend
- In-app success toasts: fetch flags; A/B test messaging
- Jira integration: deep linking to `ai-projektmanager.de/integrations/jira`

**Immediate Wins:**
1. Pricing page: add right rail "Compliance pack" upsell → C3
2. Jira integration docs: add "Plan changes in AI PM" link
3. Success toast: "Changes approved! Generate evidence in C3" CTA
4. Footer: add C3, AI-PM, ClassicSecurity links

---

### 5. Varna-Agenten.de (German Agency)

**Current Role:** Agency/automation services
**Cross-Promo Targets:** VarnaAI Platform (build on it), AI-Projektmanager.de (service bundle), C3 (audits), ClassicSecurity (cred)

**Ops Hub Modules Needed:**
- ✅ Flags (service offerings, case study variants)
- ✅ Feedback widget
- ✅ Footer config

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage Hero | Unknown | Tagline | "Powered by VarnaAI Platform" | platform.varnaai.com?utm_... |
| /Services | Unknown | Service cards | "We ship [X service] + [Y compliance]" | c3.example or ai-projektmanager.de |
| Case Studies | Existing | Service bundle highlight | "We delivered AI PM + C3 in 4 weeks" | c3.example + ai-projektmanager.de (links) |
| /Process or Workflow | Unknown | "Tooling we use" section | "VarnaAI Platform, AI PM, C3" | Each product link + UTM |
| Contact / RFQ Flow | Unknown | Sidebar | "Ask about bundled solutions" | Demo booking form |
| Blog / Playbooks | Existing | Inline "See how AI PM automates this" | Contextual links to tutorial/guide | ai-projektmanager.de/tutorials?utm_... |
| Footer | Current | Fetch from hub | "Related Brands & Tools" block | /config/varnaagenten-de |

**Tech Stack Implication:**
- Likely WordPress or Webflow (agency site usually low-code)
- Case studies: hardcode links or use custom post type meta

**Immediate Wins:**
1. Homepage: add "Powered by VarnaAI Platform" tagline + link
2. Case studies: tag with "AI-PM + C3" or similar; add "Learn more" CTA per tool
3. Footer: add VarnaAI Platform, AI-PM, C3, ClassicSecurity links
4. Blog/playbooks: "Related tools" inline links (manual for now)

---

### 6. ClassicSecurity.net (Corporate Trust)

**Current Role:** Trust anchor + compliance narrative
**Cross-Promo Targets:** C3, AI-Projektmanager.de, FwChange, VarnaAI Platform, Varna-Agenten

**Ops Hub Modules Needed:**
- ✅ Flags (content variants, service offerings)
- ✅ Feedback widget
- ✅ Footer config

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage | Unknown | Services CTA | "See our AI-driven compliance tools" | /products (internal nav) |
| /Services | Existing | Tooling subsection | "We implement C3, AI PM, FwChange" | Each tool + UTM |
| /Compliance / /GDPR | Existing | Right sidebar "Automation" | "See C3 in action" | c3.example?utm_source=classicsecurity-gdpr |
| /Security / /Framework | Existing | Right sidebar | "FwChange for firewall audits" | fwchange.example?utm_... |
| Case Studies | Existing | Footer "Built with..." tags | Tag by tool used (C3, AI-PM, FwChange, etc.) | Link per tool + UTM |
| Blog / Articles | Existing | Inline "See tool in action" | Context-matched (GDPR post → C3) | Each tool + UTM |
| Footer | Current | Fetch from hub | "Tools & Brands" block | /config/classicsecurity |

**Tech Stack Implication:**
- Likely WordPress or static site
- Probably has blog system ready for inline links

**Immediate Wins:**
1. Services page: add "Powered by C3, AI PM, FwChange" section
2. GDPR/compliance pages: add C3 sidebar CTA
3. Case studies: tag and link by tool
4. Footer: add all product links

---

### 7. AIMarketingBG.com (AI Marketing Automation)

**Current Role:** Niche marketing automation (lower cross-promo priority)
**Cross-Promo Targets:** Varna-Agenten (services), VarnaAI Platform (tech), optionally RetirementAI (as lead magnets)

**Ops Hub Modules Needed:**
- ✅ Flags (automation rule variants)
- ✅ Feedback widget
- ✅ Footer config

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage | Unknown | Secondary CTA | "Built on VarnaAI Platform" | platform.varnaai.com?utm_... |
| /Tools | Unknown | "Powered by" section | "We use VarnaAI Platform agents" | platform.varnaai.com/docs?utm_... |
| Blog / Tutorials | Existing | Inline "See how VarnaAI handles this" | Case study or guide | platform.varnaai.com/guides?utm_... |
| Case Studies | Existing | "Implemented by..." footer | Optionally Varna-Agenten link | varna-agenten.de?utm_... |
| Newsletter | Exists? | Footer | "Explore VarnaAI Platform" 1x/month | platform.varnaai.com?utm_medium=email |
| Footer | Current | Minimal (brand mismatch) | No cross-promo; keep separate | Simplify footer |

**Tech Stack Implication:**
- Likely WordPress, Webflow, or custom
- Low overhead; mostly manual links

**Immediate Wins:**
1. Homepage: add "Built on VarnaAI Platform" tagline
2. Blog: add 1 inline link per 5 articles (context-matched)
3. Footer: minimal (don't overdo it; brand mismatch)

---

### 8. RetirementAI (YMYL Consumer)

**Current Role:** Consumer finance (limited cross-promo)
**Cross-Promo Targets:** None to enterprise; accept inbound from VarnaAI + AI Marketing BG only

**Ops Hub Modules Needed:**
- ✅ Flags (disclaimer variants, calculator features)
- ✅ Feedback widget
- ⚠️ Footer config (minimal)

**Pages to Update:**

| Page | Current | Cross-Promo Placement | Suggested Message | Link Target |
|------|---------|---------------------|------------------|------------|
| Homepage | Unknown | Disclaimer footer | "Built by VarnaAI Labs" | varnaai.com/labs?utm_... |
| Calculators | Unknown | "Disclaimer" section | "(Experimental tool; not investment advice)" | varnaai.com/labs/retirement?utm_... |
| Footer | Current | Minimal | VarnaAI link + legal disclaimer | varnaai.com/labs |

**Tech Stack Implication:**
- Likely Next.js or React (simple SPA)
- Minimal ops hub integration needed

**Immediate Wins:**
1. Add VarnaAI "Labs" mention in footer/disclaimer
2. Link homepage to "VarnaAI Labs" page
3. Don't promote to enterprise sites (brand mismatch + YMYL)

---

## IMPLEMENTATION SEQUENCING (By Value × Effort)

### Week 1 (CRITICAL - Fixes + Flags Foundation)
**Parallel with VarnaAI optimization fixes:**

1. **Ops Hub - Deploy Locally** (2 hours)
   - Copy `projects.sample.yaml` → `projects.yaml`
   - List all 5 sites + 3 apps as projects
   - Run `npm run dev` in hub-worker
   - Test `/flags/varnaai.json` returns valid JSON

2. **VarnaAI.com - Top Nav + Footer** (3 hours)
   - Add "Products" nav link → new /products page
   - Create /products page with 5 B2B app cards
   - Replace footer "Brands & Products" with hub config fetch (or hardcode + stub for hub fetch)
   - Test responsive; test links work

3. **AI-PM - Pricing Right Rail** (2 hours)
   - Add right sidebar "Compliance Pack" section
   - Link to C3 pricing with UTM
   - Test on desktop + mobile

4. **Footer Standardization** (2 hours)
   - Define standard footer "Brands & Products" block (5-6 links)
   - Apply to C3, FwChange, ClassicSecurity, Varna-Agenten (copy; don't fetch hub yet)
   - Test all 5 sites render footer correctly

**Subtotal: ~9 hours**

### Week 2 (INTEGRATION - Ops Hub Wiring + App Pages)

1. **Ops Hub - Config Endpoint** (2 hours)
   - Add `GET /config/:project.json` endpoint
   - Return footer links, social, legal URLs per project
   - Update projects.yaml with full config for each site

2. **Ops Hub - Webhook Inbox** (3 hours)
   - Add `POST /hook/:project` endpoint
   - Log webhook payloads to KV or file
   - Add `GET /replay/:project/:webhook_id` for local dev replay

3. **Per-Site Integration Pages** (6 hours)
   - VarnaAI: Wire /products page to flags (A/B test hero message)
   - AI-PM: Create /integrations page (C3, FwChange, VarnaAI Platform)
   - C3: Create /integrations page (AI-PM, FwChange)
   - FwChange: Create /integrations page (C3, AI-PM, VarnaAI Platform)
   - Add "Related Tools" sidebar to pricing pages (all 3 SaaS apps)

4. **Slack Feedback Widget** (2 hours)
   - Wire feedback widget to all 5 sites + add to 3 apps
   - Test form submission; ensure CORS works
   - Add [optional] German translation to widget on DE sites

**Subtotal: ~13 hours**

### Week 3 (POLISH - In-App + Email)

1. **In-App Cross-Promo** (4 hours)
   - FwChange: Add success toast for "Generate compliance evidence"
   - AI-PM: Add onboarding checklist item "Add C3 for docs"
   - C3: Add banner on scan results "Automate firewall changes"
   - Test on staging; get feedback

2. **Email Footer** (2 hours)
   - Update transactional email templates
   - Add 1 cross-promo footer link per app (rotate weekly or A/B test)
   - Test preview in Litmus/Mailtrap

3. **Blog/Doc Cross-Linking** (3 hours)
   - VarnaAI: Add "Related tools" block to 10 top articles (manual UTM links)
   - AI-PM: Add "Related tools" to 5 DE articles (manual)
   - C3: Add "Related tools" to docs (manual)
   - Use consistent UTM format

4. **UTM Standardization** (1 hour)
   - Create UTM template: `?utm_source=[domain]&utm_medium=[footer|sidebar|email|inapp]&utm_campaign=crosspromo-q1-2025&utm_content=[slot]`
   - Document in shared sheet
   - Audit all new links for consistency

**Subtotal: ~10 hours**

### Month 2 (OPTIMIZATION - Visual Regression + Retention)

1. **Visual Regression Script** (4 hours)
   - Write Playwright script to screenshot all landing pages
   - Schedule daily via Cloudflare Cron (or GitHub Actions)
   - Post diffs to Slack #ops

2. **Cancel Retention Flow** (6 hours)
   - FwChange: Update "Cancel subscription" link to hub cancel flow
   - AI-PM: Same
   - C3: Same
   - Implement Stripe API calls in hub; test with fake subscription

3. **Analytics Dashboard** (2 hours)
   - Set up tracking in Google Analytics 4
   - Create custom dashboard: cross-promo CTR by slot, assisted conversions
   - Daily check-in on metrics

**Subtotal: ~12 hours**

---

## MEASUREMENT & QUICK WINS

### Track These (Via Google Analytics 4 + UTM)

| Metric | Tool | Target | Frequency |
|--------|------|--------|-----------|
| CTR by slot (footer/sidebar/inapp/email) | GA4 | >0.5% for footer; >1.5% for sidebar | Weekly |
| Assisted conversions (first-click, last-click) | GA4 | >5% of demos/trials from cross-promo | Weekly |
| Demo/trial CVR from cross-domain | GA4 | >2% on landing pages | Bi-weekly |
| Bounce rate change (post-cross-promo) | GA4 | <5% change | Bi-weekly |
| Feedback volume (via widget) | Ops hub | >5 submissions/week per site | Weekly |
| Webhook replay success rate | Ops hub logs | 95%+ | Weekly |

### Quick Wins (Highest ROI × Lowest Effort)

1. **Pricing Page Sidebars** (30 min setup, ~1.5% CTR expected)
   - AI-PM pricing → C3 sidebar CTA
   - C3 pricing → AI-PM sidebar CTA
   - FwChange pricing → C3 sidebar CTA
   - Easiest to implement; highest perceived relevance

2. **Footer Links** (1 hour setup, ~0.3% CTR expected)
   - Standard footer "Brands & Products" block on all 5 sites
   - Persistent, always visible
   - Huge brand awareness uplift even if low CTR

3. **In-App Success Toasts** (2 hours setup, ~2-3% CTR expected)
   - "Change approved! Generate compliance evidence?" → C3 demo
   - Contextual, high-intent moment
   - Highest likely conversion

4. **Blog "Related Tools" Inline** (3 hours setup, ~1.5% CTR expected)
   - Add to top 10 articles per site
   - Manual links (no code), easy to maintain
   - Relevant to reader context

5. **Feedback Widget** (1 hour setup, ~0.1% submission rate expected)
   - Tells you what users are confused about
   - Feeds roadmap and messaging improvements
   - Cheap insight

---

## RISKS & BLOCKERS

### Tech Unknowns (Resolve First)

| Item | Risk | Resolution |
|------|------|-----------|
| **WordPress vs headless on 5 sites** | Don't know how to fetch hub config | SSH into each server; check wp-config.php or framework detection |
| **German language support** | Widget/feedback in English only | Add i18n to ops hub; per-site language detection |
| **Email template access** | Can't update transactional emails | Check each SaaS app's email service (Sendgrid/Mailgun/etc.) |
| **Jira integration depth** | FwChange Jira sync specifics unknown | Check FwChange docs / codebase for webhook targets |
| **Stripe webhook URLs** | Need current Stripe endpoints | Check Stripe dashboard for each app's registered webhooks |

### Brand/Messaging Risks

| Risk | Mitigation |
|------|-----------|
| **Overpromotion → spam feel** | Keep cross-promo to 1 slot per page; prioritize relevance |
| **Language mix (DE + EN)** | German sites: German cross-promo copy; English sites: English. Use hreflang + UTM lang |
| **YMYL (RetirementAI)** | No cross-promo to enterprise; explicit disclaimer on calculator pages |
| **Duplicate content** | Each cross-promo link has unique UTM; no rel=canonical needed |

### Ops Complexity

| Risk | Mitigation |
|------|-----------|
| **Hub single point of failure** | Deploy to Cloudflare + auto-failover DNS; KV as backup storage |
| **Config drift** | Keep projects.yaml in Git; version it; run `npm run validate` pre-deploy |
| **Privacy (feedback data)** | Clearly disclose feedback submission; hash sensitive data; GDPR checkbox |

---

## FINAL SUMMARY

**What's Ready Now:**
- ✅ Ops hub scaffold (flags, feedback, config endpoints)
- ✅ Cross-promo matrix (sites → targets, messaging, slots)
- ✅ UTM standard (ready to apply)
- ✅ Implementation sequencing (3-week plan)

**What You Need to Do (No Code Yet):**
1. Resolve tech unknowns (WordPress vs headless, email templates, Jira details)
2. Audit each site for current cross-promo state (are there any links already?)
3. Assign priority: which 2-3 quick wins first?
4. Grab logins/API keys for each platform (Stripe, GitHub, Slack, email service)

**Expected Outcome (90 Days):**
- All 5 marketing sites + 3 apps wired with contextual cross-promo links
- Ops hub powering flags, feedback, webhooks, and config
- ~5-15% demo/trial conversion uplift from cross-domain traffic
- Single source of truth for network links (no more manual updates)

---

**Next Step:** Which 2-3 quick wins do you want to implement first, Big Dick?

1. **Pricing sidebars** (easy, high ROI)
2. **Footer links standardization** (easy, brand lift)
3. **In-app toasts** (medium, high CTR)

Or jump straight to Week 1 implementation plan?
