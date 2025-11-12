# Portfolio SEO & Growth Strategy — Classic Security Group (5 Sites + 3 Apps)

Covers VarnaAI ecosystem websites and applications:
- Websites: varnaai.com, ai-projektmanager.de, varna-agenten.de, classicsecurity.net, aimarketingbg.com
- Apps: RetirementAI, VarnaAI Platform, FwChange

This document defines business goals, KPIs, architecture, per‑site/app tactics, programmatic SEO, technical/security controls, analytics, CRO, link building, governance, and a 90‑day roadmap. Includes ready‑to‑use code/config snippets.

---

## 1) Executive Summary

- Goal: Build durable organic acquisition across all brands while protecting security/compliance.
- Strategy: Hub‑and‑spoke information architecture, programmatic pages for calculators/integrations/templates, strong technical baseline, and cross‑domain authority flow.
- Outcome: +150% organic sessions in 6 months; ≥25% demos/trials from organic; Top‑3 for 20 money terms per property; CWV “Good” on mobile; hardened security headers and zero‑trust staging.

---

## 2) Portfolio & Roles

- Varna AI — https://varnaai.com (Hub; Secure AI for SMEs; links to all brands)
- AI‑Projektmanager.de — https://ai-projektmanager.de (DE; compliance‑oriented AI PM SaaS)
- Varna‑Agenten.de — https://varna-agenten.de (DE; agency/process automation)
- Classic Security — https://classicsecurity.net (Corporate trust + GDPR/security)
- AI Marketing BG — https://aimarketingbg.com (AI marketing automation)

Applications
- RetirementAI (finance, YMYL): AI retirement planning, calculators, Monte Carlo
- VarnaAI Platform (dev/infra): multi‑agent orchestration, RAG + memory, docs
- FwChange (enterprise security): firewall change management, Jira, Palo Alto/Check Point

---

## 3) Objectives & KPIs

Portfolio (6 months)
- Organic sessions: +150%
- Pipeline: ≥25% of demos/trials from organic
- Rankings: Top‑3 for 20 money terms/app, 80+ supporting
- Engagement: >2.5 pages/session; >3% trial/demo CVR on LPs
- Quality: CWV mobile “Good”; GSC coverage healthy; 0 soft‑404 clusters

Per property (examples)
- VarnaAI.com: 10 case studies, 12 integration/alt pages, +2 sitewide authority hubs
- AI‑Projektmanager.de: 12 DE articles (EU AI Act, DSGVO), 6 use‑case LPs, hreflang
- Varna‑Agenten.de: 12 service/how‑to pages, local SEO, German testimonials
- ClassicSecurity.net: 8 compliance pillars, LocalBusiness schema, lead gen
- AI Marketing BG: 8 automation LPs, 12 tutorials, cross‑brand offers

---

## 4) Information Architecture (Hub‑and‑Spoke)

- Hub: VarnaAI.com as the corporate/knowledge hub.
- Spokes: Product and local market sites (DE brands) + Classic Security trust anchor.
- Footer Network: Persistent “Brands & Products” links on all domains (Appendix A).
- Sitemaps: Individual XML sitemaps per site; optionally expose "Network Sitemaps" page listing each domain’s sitemap to aid discovery.
- Canonicalization: One canonical per URL; consolidate www/non‑www + http→https with single 301 hop.

---

## 5) Technical Baseline & Security

Minimum across all domains
- Indexing controls: robots.txt present; sitemap index; no orphaned indexable pages.
- Headings: One H1 per page; descriptive H2/H3; no empty/duplicate H1s.
- Meta: Unique titles/descriptions; consistent OG/Twitter; valid canonical.
- Structured Data: Organization/ProfessionalService + page‑level schema (Product/SoftwareApplication/TechArticle/FAQPage/HowTo/LocalBusiness).
- Speed: Image WebP/AVIF; defer 3rd‑party; preconnect for critical hosts; Lighthouse >90 mobile.
- Security headers: HSTS, CSP, X‑Content‑Type‑Options, X‑Frame‑Options, Referrer‑Policy, Permissions‑Policy. See Appendix C.
- Zero‑Trust staging: Cloudflare Tunnel + Access SSO, noindex headers, separate staging DBs. See SECURE-PRELAUNCH.md.

VarnaAI.com quick wins (verified live)
- Add a single homepage H1.
- Fix Twitter tags to use handle (e.g., @Varna_Ai) not URLs.
- Correct JSON‑LD Organization.sameAs to the proper X/Twitter URL.
- Add footer cross‑links to ai-projektmanager.de, varna-agenten.de, classicsecurity.net, aimarketingbg.com.
- Add security headers at Apache/Cloudflare.

---

## 6) Per‑Site Tactics

VarnaAI.com (Hub)
- Content: Security‑first AI for SMEs, case studies, architecture deep‑dives, pricing/security pages.
- Hubs: “Secure AI for SMEs” and “AI Agents & Orchestration” hubs linking to product/docs.
- Programmatic: Integrations (OpenAI/Claude/Gemini/Qdrant/Kafka/Kubernetes/LangChain).
- Trust: Organization/ProfessionalService schema, address/NAP (BG), reviews/case studies.

AI‑Projektmanager.de (DE SaaS)
- Language: Native German copy; WPML/Polylang; hreflang de / x‑default.
- Topics: KI‑Projektmanagement, EU‑AI‑Act konform, DSGVO, IT‑Compliance; German market problems/solutions.
- Pages: Use‑case LPs (Security, Compliance, IT), Preisgestaltung, Sicherheit, Demo.
- Links: From VarnaAI hub and Classic Security compliance content.

Varna‑Agenten.de (DE Agency)
- Services: Prozessautomatisierung, Social automation, lead agents; industry landing pages.
- Local SEO: Address + LocalBusiness schema; Google Business Profile; German testimonials.
- Blog: Playbooks and workflow recipes, interlink to VarnaAI Platform tutorials.

ClassicSecurity.net (Corporate)
- Content: GDPR, ISO 27001, AI risk assessments, security audits; enterprise tone.
- Schema: Organization + LocalBusiness; services with Service schema.
- Cross‑trust: Link to VarnaAI brands; publish policies/audits; team bios.

AI Marketing BG (BG/EU Marketing Automation)
- Focus: Campaign automation, AI content distribution, analytics; EN/BG.
- Pages: Service LPs, playbooks, tool integrations, pricing; case studies.
- Links: Reciprocal across network; schema for services/offers.

---

## 7) Per‑App Tactics

RetirementAI (Finance, YMYL)
- Calculators: RMD, Roth conversion, SWR, Monte Carlo, tax brackets, SSA estimator.
- Content: Retirement planning pillars (tax, healthcare/Medicare, income); compare strategies.
- Compliance: Prominent disclaimers; expert review; E‑E‑A‑T signals; no personalized advice claims.
- Schema: SoftwareApplication for calculators; FAQPage; Product/Offer for app.

VarnaAI Platform (Dev/Infra)
- Docs: /docs/* with examples, quickstarts, deployment (Docker/K8s/Terraform), recipes.
- Integrations & Alternatives: "{Provider} integration" and "{Competitor} alternative" pages.
- Dev SEO: TechArticle/HowTo schema; code snippets; copy‑code instrumentation.
- Community: Marketplace listing pages + release notes changelog.

FwChange (Enterprise Security)
- Vendor: Palo Alto, Check Point, Juniper; rule governance and workflows.
- Compliance: SOX, PCI‑DSS, NERC CIP, ITIL change control; template packs.
- Integrations: Jira change sync LP; ROI calculator (time saved, audit readiness).
- Schema: Product/SoftwareApplication; CaseStudy; HowTo.

---

## 8) Content Plan (Pillars → Clusters → Converters)

Cadence per app/site: 2 pillars + 8 clusters/month; RetirementAI adds 2 calculators/month; VarnaAI/FwChange add 2 integrations/alternatives/month.

Examples
- RetirementAI: 4 pillars (Tax‑Efficient Retirement; Healthcare & Medicare; Risk & Income; Planning Guide) → 24 clusters (calculators, Social Security timing, portfolio risk).
- VarnaAI Platform: 3 pillars (Agents Orchestration; RAG + Memory; LLM Gateway/Observability) → 24 clusters (integrations, workflows, deployment guides).
- FwChange: 3 pillars (Change Management Playbook; Vendor Guides; ITIL/Compliance) → 20 clusters (Jira, segmentation, audit evidence).
- DE Sites: German how‑tos and sector LPs; compliance articles localized.

Converters
- Feature LPs, Pricing, Security, Integrations, Case Studies, Demo/Trial.

---

## 9) Programmatic SEO Blueprints

Calculators (RetirementAI)
- Route pattern: `/calculators/{tool}` and `/calculators/{tool}/{locale}`.
- Inputs → SSR results + unique copy + examples + FAQs; canonical to main locale if same language.
- Schema: SoftwareApplication + FAQPage. Internal links to related calculators.

Integrations & Alternatives (VarnaAI Platform)
- Route pattern: `/integrations/{provider}` and `/alternatives/{competitor}`.
- Template sections: overview, features, setup, code sample, FAQs, related guides; consistent table of support.
- Schema: TechArticle or WebPage; add VideoObject if you have walkthroughs.

Vendor/Compliance Templates (FwChange)
- Route pattern: `/vendors/{vendor}/change-management` and `/compliance/{framework}`.
- Include checklists, audit artifacts, sample policies, and Jira workflow mapping.
- Schema: TechArticle + HowTo + BreadcrumbList.

Dedup & Canonicals
- Ensure one canonical per template; paginated/tags set to noindex,follow as needed.

---

## 10) On‑Page & Technical Implementation

Next.js 14 (App Router) metadata
```ts
// app/(marketing)/some-page/page.tsx
export const metadata = {
  title: 'AI Agents Platform | VarnaAI',
  description: 'Multi-agent orchestration with RAG and memory.',
  alternates: { canonical: 'https://varnaai.com/agents-platform' },
  openGraph: {
    type: 'website', url: 'https://varnaai.com/agents-platform',
    title: 'AI Agents Platform | VarnaAI',
    description: 'Multi-agent orchestration with RAG and memory.',
    images: [{ url: 'https://cdn.example/og/agents.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image', site: '@Varna_Ai', creator: '@Varna_Ai',
    title: 'AI Agents Platform | VarnaAI',
    description: 'Multi-agent orchestration with RAG and memory.',
    images: ['https://cdn.example/og/agents.png']
  }
} satisfies import('next').Metadata
```

Robots and sitemap
```ts
// app/robots.ts
export default function robots() {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';
  return isProd
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://example.com/sitemap.xml' }
    : { rules: { userAgent: '*', disallow: '/' } };
}

// app/sitemap.ts
export default async function sitemap() {
  const now = new Date().toISOString();
  return [
    { url: 'https://example.com/', lastModified: now },
    { url: 'https://example.com/pricing', lastModified: now },
  ];
}
```

JSON‑LD helper
```tsx
export function JsonLd<T extends object>({ data }: { data: T }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

WordPress (Rank Math + Kadence)
- Ensure the template renders one `<h1>` per page.
- Rank Math → Titles & Meta → Global Meta: set Twitter `@Varna_Ai`, default OG.
- Rank Math → Schema → Organization/LocalBusiness: set NAP, sameAs (correct X/Twitter URL).
- Add footer menu “Brands & Products” linking all domains (Appendix A snippet).

Internationalization & hreflang
```html
<link rel="alternate" href="https://example.com/" hreflang="en" />
<link rel="alternate" href="https://example.com/de/" hreflang="de" />
<link rel="alternate" href="https://example.com/bg/" hreflang="bg" />
<link rel="alternate" href="https://example.com/" hreflang="x-default" />
```

---

## 11) Security & Performance

- Headers: HSTS, CSP, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy.
- CDN: Cloudflare proxy (orange cloud) for TLS, Brotli, Tiered Cache, Early Hints.
- Cache: Far‑future cache for assets with hashed URLs; HTML `max-age=0`.
- Prelaunch: Cloudflare Tunnel + Access SSO; X‑Robots‑Tag: noindex; staging DBs. See SECURE-PRELAUNCH.md.
- Monitoring: Uptime with private tokens; Sentry/Logs; GA4/GSC only on production.

---

## 12) Analytics & Measurement

- GA4 & GSC per domain; consent‑aware firing.
- Conversions: demo request, trial start, calculator completion, integration CTA.
- Event map: doc read depth, copy code, pricing clicks, ROI calculator usage.
- Dashboards: Looker Studio by app and channel; weekly KPI review; core queries.

---

## 13) Link Building & Authority

- Digital PR: Data studies (e.g., retirement readiness index); calculators as link magnets.
- Integrations co‑marketing: OpenAI/Anthropic/Qdrant; Palo Alto/Check Point/Jira ecosystems.
- Directories: G2/Capterra for VarnaAI Platform & FwChange; finance tool directories for RetirementAI.
- Thought leadership: podcasts, compliance/AI engineering publications; case studies (2/quarter/app).

---

## 14) CRO & UX

- CTAs per stage (Learn → Demo/Trial → Onboarding).
- Pricing pages with value tables and FAQs schema.
- Alternatives/comparisons vs incumbents (factual, compliance‑safe).
- Trust: GDPR/EU residency badges, audits, bios; finance disclaimers on RetirementAI.

---

## 15) 90‑Day Roadmap

Weeks 1–2: Foundation
- VarnaAI.com quick wins: H1, Twitter tags, JSON‑LD sameAs, footer links, headers.
- GA4/GSC per domain; submit sitemaps; verify single 301 hops.
- Staging hardening per SECURE-PRELAUNCH.md.

Weeks 3–6: Launch
- RetirementAI: 4 calculators + 6 clusters + Trading212 integration LP.
- VarnaAI Platform: 6 integration pages + 2 alternatives + docs IA kickoff.
- FwChange: Jira LP + Palo Alto/Check Point LP + ITIL/compliance pillar.
- DE sites: 6 German articles + 3 service LPs; hreflang plan.

Weeks 7–10: Scale
- RetirementAI: +2 calculators + 6 clusters.
- VarnaAI Platform: +6 integrations/alternatives.
- FwChange: +6 compliance/vendor clusters + ROI calculator page.
- Case studies: publish 3; start PR outreach.

Weeks 11–13: Optimize
- Internal links, schema validation, CWV tuning; CRO tests on pricing/demos.
- Iterate via GSC queries; expand winning clusters; prune thin/duplicate content.

---

## 16) Governance & Compliance (YMYL/Security)

- RetirementAI: Expert review, citations, disclaimers; no personalized advice; protect PII.
- All: GDPR/WP consent; transparent data handling; EU hosting statements where applicable.
- Security audits quarterly; MFA enforced; backups encrypted.

---

## 17) Open Issues (Checklist)

- [ ] VarnaAI.com: Add homepage H1
- [ ] VarnaAI.com: Fix Twitter tags (`@Varna_Ai`)
- [ ] VarnaAI.com: Fix JSON‑LD sameAs (X/Twitter URL)
- [ ] Network: Add footer cross‑links across all domains
- [ ] Headers: Add HSTS, CSP, XFO, XCTO, Referrer‑Policy, Permissions‑Policy
- [ ] CDN: Enable Cloudflare proxy + Brotli; asset cache rules
- [ ] i18n: Implement hreflang when DE/BG live; localized sitemaps

---

## Appendix A — Shared Footer Block

```html
<nav aria-label="Brands & Products" class="brands-products">
  <ul>
    <li><a href="https://varnaai.com/">Varna AI</a></li>
    <li><a href="https://ai-projektmanager.de/">AI‑Projektmanager.de</a></li>
    <li><a href="https://varna-agenten.de/">Varna‑Agenten.de</a></li>
    <li><a href="https://classicsecurity.net/">Classic Security</a></li>
    <li><a href="https://aimarketingbg.com/">AI Marketing BG</a></li>
  </ul>
  <!-- Style as a simple two‑column list or stacked links in mobile footer -->
  <!-- Add rel="noopener noreferrer" when using target="_blank" -->
  <!-- Optionally add UTM parameters for cross‑domain attribution tracking -->
  <!-- Example: ?utm_source=footer-network&utm_medium=referral&utm_campaign=portfolio -->
  <!-- Ensure canonicalization to prevent parameter duplication issues -->
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </ul>
</nav>
```

## Appendix B — JSON‑LD Examples

SoftwareApplication (Calculator)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Roth Conversion Calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://retirementai.example/calculators/roth-conversion",
  "description": "Estimate tax impact and break‑even for Roth conversions.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

TechArticle (Integration)
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "VarnaAI + Qdrant Integration Guide",
  "url": "https://varnaai.com/integrations/qdrant",
  "proficiencyLevel": "Intermediate",
  "dependencies": "Node.js >= 18, Docker",
  "about": ["RAG", "Vector Database", "Qdrant"]
}
```

## Appendix C — Security Headers (Apache / Cloudflare)

Apache
```apache
<IfModule mod_headers.c>
  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" env=HTTPS
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Content-Security-Policy "default-src 'self' https: data:; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests"
</IfModule>
```

Cloudflare Transform Rules (Response Headers)
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self' https: data:; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

— End —

