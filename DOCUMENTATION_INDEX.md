# VarnaAI Websites - Complete Documentation Index

**Last Updated**: 2025-12-26
**Status**: Consulting pivot - VPS offline, static pages migration

---

## Table of Contents

1. [Quick Navigation](#quick-navigation)
2. [Documentation by Category](#documentation-by-category)
   - [WordPress Content Management](#1-wordpress-content-management)
   - [SEO Strategy & Analysis](#2-seo-strategy--analysis)
   - [Application Portfolio](#3-application-portfolio)
   - [Strategy & Business Planning](#4-strategy--business-planning)
   - [Sales & Marketing Materials](#5-sales--marketing-materials)
   - [Case Studies](#6-case-studies)
   - [Blog Content](#7-blog-content)
   - [Research Documents](#8-research-documents)
   - [Infrastructure & Operations](#9-infrastructure--operations)
   - [PRDs & Deployment](#10-prds--deployment)
   - [Claude Work Products](#11-claude-work-products)
   - [Task Management](#12-task-management)
   - [Credentials & Secrets](#13-credentials--secrets)
3. [WordPress Sites Reference](#wordpress-sites-reference)
4. [How to Find What You Need](#how-to-find-what-you-need)
5. [Project Status Dashboard](#project-status-dashboard)
6. [Cross-Reference Matrix](#cross-reference-matrix)

---

## Quick Navigation

### Essential Files (Start Here)
1. **[PROJECT_INDEX.md](./PROJECT_INDEX.md)** - Master project navigation
2. **[CLAUDE.md](./CLAUDE.md)** - WordPress workflow and page creation
3. **[INVENTORY_Q1_2026.md](./INVENTORY_Q1_2026.md)** - Complete status report
4. **[COMPANY_INFO.md](./COMPANY_INFO.md)** - Company details for all 4 sites

### Current Priority
- **[.taskmaster/tasks/task_083.md](./.taskmaster/tasks/task_083.md)** - VarnaAI Homepage (Priority)
- **[.taskmaster/tasks/task_085.md](./.taskmaster/tasks/task_085.md)** - Business Cards (URGENT)

---

## Documentation by Category

### 1. WordPress Content Management

#### Main Documentation
| Document | Purpose |
|----------|---------|
| [CLAUDE.md](./CLAUDE.md) | Complete WordPress workflow, SEO rules, credentials |
| [wordpress/README.md](./wordpress/README.md) | WordPress content guides |
| [wordpress/schema-templates.md](./wordpress/schema-templates.md) | Schema markup templates |
| [wordpress/kadence-design-options.txt](./wordpress/kadence-design-options.txt) | Kadence block settings |

#### Content Templates
- **wordpress/pages/** - Ready-to-paste page content
- **wordpress/snippets/** - Reusable code snippets

---

### 2. SEO Strategy & Analysis

#### Master SEO Documentation
| Document | Purpose |
|----------|---------|
| [seo/SEO_Portfolio_Strategy_2025.md](./seo/SEO_Portfolio_Strategy_2025.md) | Master SEO strategy |
| [seo/KEYWORD_RESEARCH_2025.md](./seo/KEYWORD_RESEARCH_2025.md) | Keyword research |
| [seo/BACKLINK_OPPORTUNITIES_2025-12.md](./seo/BACKLINK_OPPORTUNITIES_2025-12.md) | Backlink opportunities |

#### SEO Analysis Reports (claudedocs/)
| Report | Focus |
|--------|-------|
| SEO_AUDIT_COMPREHENSIVE_SUMMARY_2025.md | Full audit summary |
| AI_MARKETING_BG_SEO_ANALYSIS_2025.md | AIMarketingBG analysis |
| Q1_2025_SEO_ACTION_PLAN.md | Q1 action plan |

#### Site-Specific Audits
- **seo/site-audits/** - Individual site audits for each WordPress site

---

### 3. Application Portfolio

#### Portfolio Status (Dec 2025)

| App | Directory | Status | Demo | Tech Stack |
|-----|-----------|--------|------|------------|
| RetirementAI | apps/pension | Local Docker | OFFLINE | Next.js 14, PostgreSQL, Redis |
| C3 Compliance | apps/dashboard | Local Docker | OFFLINE | React 18, Node.js, PostgreSQL |
| FwChange | apps/fwchange | Local Docker | OFFLINE | React 18, FastAPI, PostgreSQL |
| SEO Agent | apps/seoagent | Development | - | Vite, React 19, Express |
| VarnaAI Agents | apps/varnaai | Development | - | Next.js 14, NestJS, Neo4j |
| WebScrap | apps/webscrap | Development | - | Web scraping platform |
| Project Manager | apps/projectmanager | Development | - | Node.js project management |
| Agentic Coder | apps/agenticcoder | Development | - | AI coding assistant |
| LibreChat | apps/LibreChat | Self-hosted | - | LibreChat (external) |
| Job Hunter | work/jobs | Development | - | Freelance job automation |

**Note**: VPS @ 78.47.125.174 is OFFLINE. All demos migrating to static HTML pages on All-Inkl.

#### Docker Port Allocation
| App | Frontend | Backend | PostgreSQL | Redis |
|-----|----------|---------|------------|-------|
| RetirementAI | 3001 | - | 5433 | 6380 |
| C3 Compliance | 3002 | 8001 | 5434 | 6381 |
| FwChange | 3003 | 8002 | 5435 | 6382 |

#### Static Landing Pages (assets/)
| File | App |
|------|-----|
| c3-landing-honest.html | C3 Compliance |
| fwchange-landing-honest.html | FwChange |
| retirementai-landing-honest.html | RetirementAI |

#### App Documentation
Each app has its own CLAUDE.md:
- apps/pension/CLAUDE.md
- apps/fwchange/CLAUDE.md
- apps/dashboard/CLAUDE.md
- apps/seoagent/CLAUDE.md
- apps/varnaai/CLAUDE.md

---

### 4. Strategy & Business Planning

#### Master Strategy
| Document | Purpose |
|----------|---------|
| [docs/strategy/BUSINESS_PLAN_2025.md](./docs/strategy/BUSINESS_PLAN_2025.md) | 12-month roadmap |
| [docs/strategy/APPS-PORTFOLIO.md](./docs/strategy/APPS-PORTFOLIO.md) | SaaS apps overview |
| [docs/strategy/PILOT-SOWS.md](./docs/strategy/PILOT-SOWS.md) | Pilot statements of work |

#### C3 Strategy (docs/strategy/C3/)
| Document | Purpose |
|----------|---------|
| MARKET_RESEARCH_2025.md | Enterprise market research |
| SME_MARKET_REALITY_2025.md | Bulgarian SME reality check |
| SERVICE_DELIVERY_PLAYBOOK.md | Service delivery guide |
| VCCI_Membership_Action_Plan.md | Chamber of Commerce plan |
| VARNA_LOCAL_MARKET_RESEARCH_2025.md | Local Varna research |

#### AIMarketingBG Strategy (docs/strategy/AIMarketingBG/)
| Document | Purpose |
|----------|---------|
| BUSINESS_PLAN_2025.md | Business plan |
| IMMEDIATE_ACTIONS_DEC2025.md | December priorities |
| PROSPECT_LIST_HOTELS.md | Hotel industry targets |

---

### 5. Sales & Marketing Materials

#### Marketing (docs/marketing/)
| Document | Purpose |
|----------|---------|
| linkedin-profile-optimization.md | LinkedIn profile guide |
| linkedin-posts-january-2026.md | 12 pre-written posts |
| security-checklist-bulgarian-smes.md | Lead magnet (25-point checklist) |
| seo-audit-template-free-offer.md | Free SEO audit offer |

#### Sales (docs/sales/)
| Document | Purpose |
|----------|---------|
| sales-materials-complete-toolkit.md | Complete sales toolkit |

#### Bulgarian Materials (assets/sales-materials-bg/) - 16 Files

**C3-Specific Materials:**
| Document | Purpose |
|----------|---------|
| c3-onepager-content-bg.md | C3 one-pager (Bulgarian) |
| c3-pilot-contract-bg.md | Pilot contract template |
| c3-pilot-program-terms.md | Pilot program terms |
| c3-cold-email-bg.txt | C3 cold email template |
| c3-followup-email-bg.txt | C3 follow-up email |
| c3-linkedin-dm-bg.txt | C3 LinkedIn DM script |
| c3-phone-script-bg.txt | C3 phone script |

**General Sales Materials:**
| Document | Purpose |
|----------|---------|
| cold-email-template.md | Generic cold email |
| phone-script-bulgarian.md | Phone script (Bulgarian) |
| invoice-template-bg.md | Invoice template |
| nurture-templates-bg.md | Lead nurturing templates |
| payment-setup-bg.md | Payment setup guide |
| bd-rep-job-posting-bg.md | BD rep job posting |
| one-pager-structure.md | One-pager structure guide |
| classic-security-emails.md | Classic Security email templates |
| vcci-application-letter-template.txt | VCCI membership application |

---

### 6. Case Studies

#### Location: docs/case-studies/

| File | Anonymous Client | Real Source |
|------|------------------|-------------|
| 01-industrial-iot-azure-iso27001.md | Industrial Manufacturer | Caterpillar |
| 02-payment-processing-fwchange-automation.md | Payment Processor | Worldline |
| 03-automotive-azure-xsoar-migration.md | Automotive Supplier | Mann und Hummel |

Each case study includes:
- Website version (500 words)
- LinkedIn version (150 words)
- Slide deck (3 slides)
- Verbal story (90 seconds)

---

### 7. Blog Content

#### Blog Workflow
| File | Purpose |
|------|---------|
| blogs/START_HERE.md | Quick start ("go" command) |
| blogs/URLS.md | 54 real internal URLs |
| blogs/INSTRUCTIONS.md | SEO rules, WordPress formatting |
| blogs/LESSONS_LEARNED.md | Error archive |
| blogs/TOPIC_DIVERSITY_MATRIX.md | 80+ unique topics |

#### Blog Posts Archive (blogs/blog_posts/)
```
2025-12-02/  - First batch (27 posts)
2025-12-08/
2025-12-13/
2025-12-16/
2025-12-17-honest-versions/
2025-12-19/
2025-12-22/
```

---

### 8. Research Documents

#### Location: research/

| Document | Focus |
|----------|-------|
| german-compliance-market-2025.md | German compliance market |
| ai-coding-market-2025.md | AI coding market |
| varna-business-ecosystem-research-2025.md | Varna business ecosystem |
| varna-networking-event-january-26-2026-research.md | Jan 26 event research |
| fwchange-strategy.md | FwChange market strategy |
| crosspromo-strategy.md | Cross-promotion strategy |

---

### 9. Infrastructure & Operations

#### Operations (operations/)
| Directory | Purpose |
|-----------|---------|
| compose/ | Docker Compose files |
| hub-worker/ | Cloudflare Worker |
| scripts/ | Automation scripts |
| cron/ | Cron job configs |
| monitoring/ | Monitoring configs |
| security/ | Security configs |

#### VPS Configurations (vps/) - ARCHIVED
**Note**: Hetzner VPS is OFFLINE. These configs are for reference only.
- vps/c3/
- vps/fwchange/
- vps/retirementai/
- vps/varnaai/

#### Google Sheets Dashboard (docs/operations/)
| Document | Purpose |
|----------|---------|
| google-sheets-dashboard-setup.md | Full setup guide |
| google-sheets-dashboard-quickstart.md | Quick start |
| scott-research-guide.md | Research assistant guide |

---

### 10. PRDs & Deployment

#### Location: docs/prds/

| Document | Status |
|----------|--------|
| MASTER-DEPLOYMENT-PRD.md | Master plan |
| HETZNER-CONSOLIDATION-PRD.md | ARCHIVED (VPS offline) |
| BETA-DEMO-DEPLOYMENT-PRD.md | Demo deployment |
| SECURE-PRELAUNCH.md | Security checklist |
| IMPLEMENTATION-CHECKLIST.md | Implementation tracking |

---

### 11. Claude Work Products

#### Location: claudedocs/

**50+ analysis reports** organized by category:

| Category | Examples |
|----------|----------|
| SEO Analysis | SEO_AUDIT_COMPREHENSIVE_SUMMARY_2025.md |
| Backlink Strategy | BACKLINK_STRATEGY_2025_COMPREHENSIVE.md |
| VPS Audits | VPS_AUDIT_REPORT_2025-12-*.md |
| Competitor Analysis | COMPETITOR_ANALYSIS_GERMAN_AI_COMPLIANCE_2025.md |
| Content Audits | BLOG_CONTENT_AUDIT_REPORT.md |
| Code Analysis | CODE_ANALYSIS_REPORT.md |
| Market Research | varna-ai-services-market-research-2025-12-18.md |
| Fake Content Audit | FAKE_CONTENT_AUDIT_2025-12-28.md |

---

### 12. Task Management

#### Task Master (.taskmaster/)
| File | Purpose |
|------|---------|
| .taskmaster/CLAUDE.md | Task Master instructions |
| .taskmaster/tasks/tasks.json | 11 cleanup tasks (all done) |
| .taskmaster/tasks/task_083-092.md | Jan 2026 launch tasks |

#### Task Status Summary

| Task | Title | Status |
|------|-------|--------|
| 83 | VarnaAI Homepage | IN-PROGRESS |
| 84 | Simplify Other Sites | PENDING |
| 85 | Business Cards | URGENT |
| 86 | Case Studies | DONE |
| 87 | LinkedIn Profile | DONE |
| 88 | Sales Materials | DONE |
| 89 | Google Sheets | PENDING |
| 90 | LinkedIn Posts | DONE |
| 91 | Lead Magnets | DONE |
| 92 | Networking Prep | PENDING |

---

### 13. Credentials & Secrets

#### Location: work/secrets/

```bash
# Usage
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py list                    # List all secrets
python keymanager.py get wordpress varnaai.com  # Get WordPress creds
python keymanager.py get api openai          # Get API key
```

---

## WordPress Sites Reference

| Site | URL | Language | Status |
|------|-----|----------|--------|
| VarnaAI | varnaai.com | English | PRIMARY |
| AI Projektmanager | ai-projektmanager.de | German | Dormant |
| Varna Agenten | varna-agenten.de | German | Dormant |
| AI Marketing BG | aimarketingbg.com | English/BG | Active |

**Credentials**: Use keymanager in work/secrets/

---

## How to Find What You Need

### I want to...

| Goal | Go To |
|------|-------|
| Create a WordPress page | [CLAUDE.md](./CLAUDE.md) |
| Optimize SEO | [seo/SEO_Portfolio_Strategy_2025.md](./seo/SEO_Portfolio_Strategy_2025.md) |
| Add Schema markup | [wordpress/schema-templates.md](./wordpress/schema-templates.md) |
| Write a blog post | [blogs/START_HERE.md](./blogs/START_HERE.md) |
| Check current tasks | [.taskmaster/tasks/](./.taskmaster/tasks/) |
| Access credentials | work/secrets/keymanager.py |
| View case studies | [docs/case-studies/](./docs/case-studies/) |
| Prepare sales materials | [docs/sales/](./docs/sales/) |
| Research market | [research/](./research/) |

---

## Project Status Dashboard

### Strategic Pivot (Jan 2026)
- FROM: SaaS product sales
- TO: Consulting services (ISO 27001, GDPR, AI implementation)
- FOCUS: Face-to-face networking in Varna, Bulgaria

### Key Dates
| Date | Milestone |
|------|-----------|
| Dec 23 | Order business cards |
| Jan 5 | Google Sheets dashboard ready |
| Jan 10 | Business cards delivered |
| **Jan 26** | **First networking event** |

### Infrastructure
- VPS (Hetzner): OFFLINE
- Demos: Migrating to static HTML on All-Inkl
- WordPress: All 4 sites on All-Inkl shared hosting

---

## Cross-Reference Matrix

### Document Relationships

| If you're working on... | Also check... |
|-------------------------|---------------|
| WordPress pages | CLAUDE.md → wordpress/schema-templates.md → seo/SEO_Portfolio_Strategy_2025.md |
| Blog posts | blogs/START_HERE.md → blogs/URLS.md → blogs/INSTRUCTIONS.md |
| App development | apps/[app]/CLAUDE.md → vps/[app]/ → operations/compose/ |
| Sales outreach | docs/sales/ → assets/sales-materials-bg/ → docs/case-studies/ |
| SEO optimization | seo/SEO_Portfolio_Strategy_2025.md → claudedocs/SEO_AUDIT_*.md |
| Task tracking | .taskmaster/tasks/ → INVENTORY_Q1_2026.md |
| Credentials | work/secrets/keymanager.py → (never commit secrets.yaml) |
| Strategy planning | docs/strategy/BUSINESS_PLAN_2025.md → research/*.md |

### Key File Dependencies

```
PROJECT_INDEX.md (master)
├── DOCUMENTATION_INDEX.md (this file)
├── CLAUDE.md (WordPress workflow)
├── INVENTORY_Q1_2026.md (status report)
└── .taskmaster/tasks/ (active tasks)

CLAUDE.md (WordPress)
├── wordpress/schema-templates.md
├── wordpress/kadence-design-options.txt
├── work/secrets/keymanager.py
└── blogs/START_HERE.md

seo/SEO_Portfolio_Strategy_2025.md
├── seo/KEYWORD_RESEARCH_2025.md
├── seo/site-audits/*.md
├── claudedocs/SEO_AUDIT_*.md
└── blogs/URLS.md

docs/strategy/BUSINESS_PLAN_2025.md
├── docs/strategy/C3/*.md
├── docs/strategy/AIMarketingBG/*.md
├── research/*.md
└── docs/case-studies/*.md
```

### Sensitive Files (Never Share/Commit)

| File/Directory | Contains |
|----------------|----------|
| work/secrets/secrets.yaml | All API keys and passwords |
| .env files | Environment variables |
| vps/*/.env.example | Template only - real .env never committed |
| credentials.md | WordPress login details |

---

**Maintained by**: Claude Code
**Primary Reference**: [PROJECT_INDEX.md](./PROJECT_INDEX.md)
**Last Updated**: 2025-12-26
