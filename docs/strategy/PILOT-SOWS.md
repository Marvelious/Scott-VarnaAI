# Pilot SOWs + Success Checklists + Website Strategy (Q4 2025)

This document provides ready-to-use pilot Statements of Work (SOW), success checklists, and a website strategy to support pilot acquisition and conversion for three products:
- Compliance Command Center (C3)
- FwChange (Firewall Change Management)
- AI Project Manager (German Enterprise focus)

Use together with:
- PORTFOLIO-SEO-STRATEGY.md — cross-site SEO and 90-day roadmap
- SECURE-PRELAUNCH.md — zero-trust staging and safe exposure

---

## 1) Compliance Command Center (C3) — Pilot SOW

Objectives
- Validate automated compliance scans and German document generation (GDPR, AI Act, NIS2, GoBD, BSI C5) for SMEs/consultancies.
- Prove time-to-compliant-docs reduction and audit acceptance.

Scope (In)
- Rules engine v1 (versioned) covering GDPR + AI Act + NIS2 + GoBD + BSI C5 (top checks).
- 60s scan, traffic-light dashboard (Rot/Gelb/Grün), German document generation: DSFA, Verfahrensdokumentation, Model Cards.
- Regulatory monitoring (BMF/BSI/DSK feeds) and update notifications.
- Multi-tenant (consultant) workspace; exports (PDF/Word/CSV) aligned to auditor expectations.

Scope (Out)
- Deep custom integrations (ERP/DMS), custom SSO; production SLAs (pilot best-effort only).

Deliverables
- Working staging instance behind Cloudflare Access.
- 3 core compliant templates (GDPR DSFA, GoBD Verfahrensdokumentation, AI Act Model Card) with legal review workflow.
- Pilot reports: gaps, prioritized remediation plan, audit-ready export bundle.

Success Criteria & KPIs
- Time-to-first compliant doc bundle ≤ 14 days from kickoff.
- ≥ 80% of generated docs accepted by pilot auditors without major rewrite.
- Consultant pilots: onboard ≥ 10 client orgs each or 30 aggregate.
- Update latency: regulatory change reflected in product ≤ 10 business days.

Timeline & Milestones (6–8 weeks)
- Weeks 1–2: Setup, legal-approved templates v1, rules engine v1; first scans.
- Weeks 3–5: Monitoring feeds live; export formats finalized; tenant onboarding.
- Weeks 6–8: Audit validation runs; finalize gap remediation plans; pilot review.

Roles & Responsibilities
- Vendor: delivery, templates, rules engine, monitoring, onboarding, support.
- Client: test data access, legal sign-off, auditor coordination, feedback cadence.

Data & Security
- EU hosting (Hetzner); Access SSO; separate staging DB; GDPR DPA; data retention ≤ 30 days unless required for audit.

Acceptance Criteria (Exit the pilot)
- Two real audits or audit-like reviews passed using generated bundles OR signed acceptance from compliance lead.
- KPI targets met or jointly agreed remediation plan with timeline.

Commercials (Pilot)
- Fixed pilot fee or reduced monthly for 2 months; upgrade credit applied on conversion.

Risks & Mitigations
- Legal accuracy → counsel review pipeline; disclaimers; human-in-the-loop approvals.
- Change velocity → versioned rules; update logs surfaced to clients.

Success Checklist (C3)
- [ ] Access SSO enabled; staging noindex
- [ ] Rules engine v1 deployed; version visible in UI
- [ ] 3 legal-approved templates live (GDPR/GoBD/AI Act)
- [ ] Monitoring feeds (BMF/BSI/DSK) operational
- [ ] Exports match auditor-required formats
- [ ] Tenants onboarded; first scans completed
- [ ] KPI dashboard available to client sponsor

---

## 2) FwChange — Pilot SOW

Objectives
- Reduce change approval time, improve auditability, and stabilize Jira integration for firewall changes (Palo Alto, Check Point).

Scope (In)
- Connectors (read) for Palo Alto + Check Point; change diffing and impact preview; Jira project templates and sync (issues/comments/status).
- Exportable audit packs (CSV/PDF) incl. change rationale, approvals, timestamps, diffs.

Scope (Out)
- Full write automation to production devices (pilot can include limited writes in controlled windows).

Deliverables
- Working staging instance; connectors (read) + Jira sync; change simulation prototype; audit export bundle.

Success Criteria & KPIs
- Approval lead time reduced by ≥ 30% vs baseline.
- Jira sync success ≥ 99% for pilot projects; zero data mismatch incidents.
- Rollback rate ≤ baseline; policy hygiene score trend improving.

Timeline & Milestones (6–8 weeks)
- Weeks 1–2: Read-only connectors + Jira sync; map pilot workflows.
- Weeks 3–5: Diffing + impact preview; audit packs; limited write tests.
- Weeks 6–8: Run change windows with simulation; measure lead time, errors, and rollback.

Roles & Responsibilities
- Vendor: connector delivery, Jira templates, simulation, training.
- Client: device/API access, pilot network window scheduling, Jira admin coordination.

Data & Security
- EU hosting; Access SSO; device creds stored encrypted; principle of least privilege; logs scrub secrets.

Acceptance Criteria (Exit the pilot)
- Lead-time reduction target met; audit exports accepted by security/compliance leads.
- Stable Jira sync; successful change window with simulation results.

Commercials (Pilot)
- Fixed pilot package or discounted seats for pilot teams; upgrade credits on conversion.

Risks & Mitigations
- Vendor API changes → version pinning; sandbox testing; rollback plan.
- Overly broad writes → limit to simulation or maintenance windows.

Success Checklist (FwChange)
- [ ] Access SSO enabled; staging noindex
- [ ] Connectors (PA/CP) read verified; limited writes scoped
- [ ] Jira templates configured; bi-directional sync validated
- [ ] Diffing + impact preview functional
- [ ] Audit export packs delivered
- [ ] Baseline lead-time measured; target reduction tracked

---

## 3) AI Project Manager (DE) — Pilot SOW

Objectives
- Generate explainable, audit-ready project plans for common IT changes in ≤ 3 minutes.

Scope (In)
- Deterministic templates (e.g., firewall migration, network segmentation, SaaS rollout) with risks, buffers, budgets, and resource plans.
- Explainability view (rationale); exportable audit PDF; plan acceptance tracking.

Scope (Out)
- Full PM suite parity; deep integrations (SAP/DATEV) beyond read-only during pilot.

Deliverables
- Staging instance; 2–3 IT project templates; acceptance workflow; audit PDF export.

Success Criteria & KPIs
- Time-to-first plan ≤ 3 minutes; ≥ 60% plan acceptance by pilot managers.
- Revisions per plan below agreed threshold; positive NPS from pilot users.

Timeline & Milestones (6–8 weeks)
- Weeks 1–2: Templates + export; pilot onboarding; baseline data capture.
- Weeks 3–5: Explainability view; acceptance tracking; iteration on templates.
- Weeks 6–8: Live trials; measure acceptance; finalize case study.

Roles & Responsibilities
- Vendor: templates, explainability, export, training; support sessions.
- Client: provide historical plans, define acceptance rules, feedback cadence.

Data & Security
- EU hosting; Access SSO; anonymized data where possible; GDPR DPA.

Acceptance Criteria (Exit the pilot)
- KPI targets achieved OR mutually agreed improvements within defined timeline.

Commercials (Pilot)
- Fixed pilot fee; discounted first-year subscription on conversion.

Risks & Mitigations
- AI reliability → deterministic templates; human-in-the-loop edits; clear disclaimers.

Success Checklist (AI PM)
- [ ] Access SSO enabled; staging noindex
- [ ] 2–3 deterministic templates live (DE, Sie-Form where applicable)
- [ ] Explainability view and audit export working
- [ ] Acceptance tracking instrumented; KPIs visible to sponsor
- [ ] Pilot managers onboarded; training delivered

---

## 4) Website Strategy to Support Pilots

Goals
- Acquire pilot candidates, enable smooth onboarding, and convert to paid by publishing the right pages, instrumentation, and trust signals.

Landing Pages (each product)
- Pilot Program LP: value, scope, timeline, eligibility, CTA (apply/book).
- Integration/Connector pages (FwChange), Templates pages (AI PM), Compliance modules pages (C3).
- Security & Compliance page: GDPR, EU hosting, headers, DPA process; link to Classic Security.

SEO & Content (see PORTFOLIO-SEO-STRATEGY.md)
- Single H1, canonical, titles/descriptions per LP; OG/Twitter tags fixed (use @Varna_Ai).
- Programmatic: integrations (VarnaAI Platform), vendor/compliance templates (FwChange), calculators (RetirementAI—SEO magnet only).
- Cross-links: footer network (all domains) and contextual links between LPs and documentation.

Tracking & Analytics
- GA4 events: pilot form submit, call booking, doc read depth, integration CTA.
- GSC: verify each domain; submit sitemaps; monitor coverage.
- UTM discipline for outreach; Looker Studio dashboard by product.

Conversion & Trust
- Case-study template ready; publish first two ASAP.
- Badges: GDPR/EU data residency; audits; team bios; DPA link.

Operations
- Secure staging (Access + noindex) for previews; production with headers (HSTS/CSP/etc.).
- CRM sync for leads; auto-email confirmations; calendar booking integration.

Website Checklist (per LP)
- [ ] One H1; canonical; unique title/meta
- [ ] Clear pilot scope, timeline, eligibility
- [ ] Primary CTA (apply/book) + fallback contact
- [ ] Social proof (logos/testimonials) if available
- [ ] GA4 events wired; GSC verified; sitemap updated
- [ ] Security & compliance blurbs + link to Classic Security

---

## 5) Appendices

A. Legal & Security Templates (pilot)
- DPA (GDPR) addendum; access logs retention; breach notification window.
- Security questionnaire answers: hosting (Hetzner EU), Access SSO, encryption, backups.

B. Pilot Exit & Conversion Options
- Option 1: Convert to annual subscription (apply pilot credit).
- Option 2: Extend pilot (time-boxed) with specific goals.
- Option 3: Offboarding with data export and feedback session.

---

Signatures (Pilot SOW acceptance)

Client: _________________________   Date: ___________

Vendor: _________________________   Date: ___________

