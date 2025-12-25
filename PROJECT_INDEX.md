# VarnaAI Websites - Project Index

**Generated**: 2025-12-26
**Purpose**: Complete portfolio management for 4 WordPress sites + SaaS applications
**Maintainer**: Claude Code

---

## Table of Contents

1. [Quick Navigation](#quick-navigation)
2. [Current Status Summary](#current-status-summary)
3. [Directory Structure](#directory-structure)
4. [WordPress Portfolio Sites](#wordpress-portfolio-sites)
5. [Application Portfolio](#application-portfolio)
6. [Task Master Tasks](#task-master-tasks-jan-2026-launch)
7. [Strategy Documents](#strategy-documents)
8. [Case Studies](#case-studies)
9. [Sales & Marketing Materials](#sales--marketing-materials)
10. [PRDs & Deployment](#prds--deployment)
11. [Blog Content](#blog-content)
12. [Infrastructure & Operations](#infrastructure--operations)
13. [SEO Resources](#seo-resources)
14. [Research Documents](#research-documents)
15. [Claude Work Products](#claude-work-products)
16. [Key Reference Files](#key-reference-files)
17. [Credentials & Secrets](#credentials--secrets)
18. [GitHub Repositories](#github-repositories)
19. [Troubleshooting](#troubleshooting)
20. [Changelog](#changelog)

---

## Quick Navigation

| Need | Go To |
|------|-------|
| **Current Tasks** | [Task Master Tasks](#task-master-tasks-jan-2026-launch) |
| **Business Strategy** | [Strategy Documents](#strategy-documents) |
| **WordPress Workflow** | [CLAUDE.md](./CLAUDE.md) |
| **Sales Materials** | [Sales & Marketing](#sales--marketing-materials) |
| **Case Studies** | [Case Studies](#case-studies) |
| **SaaS Applications** | [Application Portfolio](#application-portfolio) |
| **GitHub Repos** | [GitHub Repositories](#github-repositories) |
| **Scott Beta Tester** | [Scott Setup](#scott-beta-tester-setup) |
| **Infrastructure** | [Infrastructure & Operations](#infrastructure--operations) |
| **Blog Workflow** | [Blog Content](#blog-content) |
| **SEO Resources** | [SEO Resources](#seo-resources) |
| **Troubleshooting** | [Troubleshooting](#troubleshooting) |

---

## Current Status Summary

### Strategic Pivot (Dec 2025 → Jan 2026)

**Goal**: Simplify operations for January 2026 Varna return - consulting focus

| Item | Status | Action |
|------|--------|--------|
| VPS (Hetzner) | OFF | Shutdown complete - migrating to static pages |
| VarnaAI.com | PRIMARY | Business card homepage (Task 83) |
| Other 3 sites | SIMPLIFY | Redirect or minimal landing pages |
| Demo apps | ARCHIVE | Static HTML versions on All-Inkl |

### Task Completion Status

**Task Master (JSON)**: 11 cleanup tasks - ALL DONE
- Fake testimonials removed
- Fake stats deleted
- Footer lies fixed

**Task Markdown Files (10 Jan 2026 tasks)**: 6/10 DONE

| Task | Title | Status | Due |
|------|-------|--------|-----|
| 83 | VarnaAI Business Card Homepage | IN-PROGRESS | Priority |
| 84 | Simplify Other 3 Sites | PENDING | After 83 |
| 85 | Business Cards Design & Order | URGENT | Order NOW |
| 86 | 3 Anonymized Case Studies | DONE | - |
| 87 | LinkedIn Profile Optimization | DONE | - |
| 88 | Sales Materials Templates | DONE | - |
| 89 | Google Sheets Dashboard | PENDING | Jan 5, 2026 |
| 90 | January LinkedIn Posts (12) | DONE | - |
| 91 | Lead Magnets Preparation | DONE | - |
| 92 | Networking Event Prep | PENDING | Jan 26, 2026 |

---

## Directory Structure

```
D:\VarnaAI\Websites\
│
├── ROOT DOCUMENTS
│   ├── CLAUDE.md              ← Primary workflow reference
│   ├── README.md              ← Project overview
│   ├── PROJECT_INDEX.md       ← This file
│   ├── INVENTORY_Q1_2026.md   ← Complete status report
│   ├── COMPANY_INFO.md        ← Company details (4 sites)
│   ├── SCHEMA_ORG_TEMPLATES.md ← Schema markup reference
│   ├── AGENT.md / AGENTS.md   ← Agent configurations
│   └── FEATURES.md            ← Feature documentation
│
├── .taskmaster/               ← Task Master AI
│   ├── tasks/
│   │   ├── tasks.json         ← 11 cleanup tasks (done)
│   │   └── task_083-092.md    ← Jan 2026 launch tasks
│   ├── config.json
│   └── CLAUDE.md              ← Task Master instructions
│
├── apps/                      ← SaaS Applications (10 apps)
│   ├── pension/               ← RetirementAI (Next.js)
│   ├── fwchange/              ← FwChange (React + FastAPI)
│   ├── dashboard/             ← C3 Compliance (React + Node)
│   ├── seoagent/              ← SEO Agent (Vite + Express)
│   ├── varnaai/               ← VarnaAI Agents (Next.js + NestJS)
│   ├── agenticcoder/          ← Agentic Coder
│   ├── projectmanager/        ← Project Manager
│   ├── webscrap/              ← Web Scraper
│   ├── LibreChat/             ← Self-hosted chat
│   └── taxapp/                ← Tax Application
│
├── docs/                      ← Core Documentation
│   ├── strategy/              ← Business plans, market research
│   │   ├── C3/                ← C3 Compliance strategy
│   │   ├── AIMarketingBG/     ← AIMarketingBG strategy
│   │   └── FwChange/          ← FwChange strategy
│   ├── prds/                  ← Product requirement documents
│   ├── case-studies/          ← 3 anonymized case studies
│   ├── marketing/             ← LinkedIn, lead magnets
│   ├── sales/                 ← Sales toolkit
│   ├── operations/            ← Google Sheets, guides
│   ├── planning/              ← Execution plans
│   ├── analysis/              ← Audits, analysis
│   ├── implementation/        ← Deployment guides
│   └── reference/             ← Technical references
│
├── assets/                    ← Media & Materials
│   ├── images/                ← Site images
│   ├── sales-materials-bg/    ← Bulgarian sales materials
│   ├── business-card-design-spec.md
│   ├── c3-landing-honest.html
│   ├── fwchange-landing-honest.html
│   └── retirementai-landing-honest.html
│
├── blogs/                     ← Blog Content
│   ├── blog_posts/            ← Published posts by date
│   │   ├── 2025-12-02/        ← First batch
│   │   ├── 2025-12-08/
│   │   ├── 2025-12-13/
│   │   ├── 2025-12-16/
│   │   ├── 2025-12-17-honest-versions/
│   │   ├── 2025-12-19/
│   │   └── 2025-12-22/
│   ├── archive/               ← Archived posts
│   ├── docs/                  ← Blog workflow docs
│   ├── START_HERE.md          ← Quick start guide
│   ├── URLS.md                ← 54 real internal URLs
│   ├── SAAS_APPS.md           ← Apps to promote
│   ├── INSTRUCTIONS.md        ← SEO rules
│   └── LESSONS_LEARNED.md     ← Error archive
│
├── claudedocs/                ← Claude Work Products
│   ├── debug/                 ← Debug reports
│   ├── proposals/             ← Proposals
│   └── [50+ analysis reports]
│
├── operations/                ← Infrastructure
│   ├── compose/               ← Docker configs
│   ├── hub-worker/            ← Cloudflare Worker
│   ├── scripts/               ← Automation scripts
│   ├── cron/                  ← Cron jobs
│   ├── monitoring/            ← Monitoring configs
│   ├── security/              ← Security configs
│   └── snippets/              ← Code snippets
│
├── vps/                       ← VPS Configurations (ARCHIVED)
│   ├── c3/                    ← C3 VPS config
│   ├── fwchange/              ← FwChange VPS config
│   ├── retirementai/          ← RetirementAI VPS config
│   ├── varnaai/               ← VarnaAI VPS config
│   └── webscrap/              ← WebScrap VPS config
│
├── seo/                       ← SEO Strategy
│   ├── SEO_Portfolio_Strategy_2025.md
│   ├── audits-raw/            ← PDF audits
│   ├── site-audits/           ← Per-site analysis
│   ├── backlink-campaign/     ← Backlink outreach
│   ├── guest-posts/           ← Guest post content
│   ├── outreach/              ← Outreach templates
│   └── tools/                 ← SEO scripts
│
├── wordpress/                 ← WordPress Content
│   ├── pages/                 ← Ready-to-paste content
│   ├── snippets/              ← Reusable code
│   ├── kadence-design-options.txt
│   ├── schema-templates.md
│   └── README.md
│
├── research/                  ← Market Research
│   ├── german-compliance-market-2025.md
│   ├── ai-coding-market-2025.md
│   ├── varna-business-ecosystem-research-2025.md
│   ├── varna-networking-event-january-26-2026-research.md
│   └── [additional research files]
│
├── work/                      ← Active Work
│   ├── secrets/               ← Centralized credentials
│   │   ├── keymanager.py      ← get/set/list secrets
│   │   └── secrets.yaml       ← All credentials (gitignored)
│   ├── jobs/                  ← Freelance job hunter
│   ├── crm/                   ← CRM tools
│   └── accountant/            ← Accounting tools
│
├── done/                      ← Completed Work Archive
│   ├── 2025-01-implementation/
│   ├── 2025-12-root-cleanup/
│   ├── old-audits/
│   ├── playwright-screenshots-archive/
│   └── [archived exports and reports]
│
└── config/                    ← Configuration Files
    └── [various configs]
```

---

## WordPress Portfolio Sites

| Site | URL | Language | Status | Focus |
|------|-----|----------|--------|-------|
| **VarnaAI** | varnaai.com | English | PRIMARY | Enterprise AI services |
| **AI Projektmanager** | ai-projektmanager.de | German | Dormant | AI project management |
| **Varna Agenten** | varna-agenten.de | German | Dormant | AI agents |
| **AI Marketing BG** | aimarketingbg.com | English/BG | Active | AI marketing |

**Credentials**: Use keymanager in `work/secrets/`
```bash
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py get wordpress varnaai.com
```

---

## Application Portfolio

### Production-Ready Apps (Local Docker)

| App | Directory | Frontend Port | Backend Port | Tech Stack |
|-----|-----------|---------------|--------------|------------|
| **RetirementAI** | `apps/pension` | 3001 | - | Next.js 14, PostgreSQL, Redis, OpenAI |
| **C3 Compliance** | `apps/dashboard` | 3002 | 8001 | React 18, Node.js, PostgreSQL (pgvector) |
| **FwChange** | `apps/fwchange` | 3003 | 8002 | React 18, FastAPI, PostgreSQL, Redis |

### Development Apps

| App | Directory | Status | Tech Stack |
|-----|-----------|--------|------------|
| **SEO Agent** | `apps/seoagent` | Development | Vite, React 19, Express |
| **VarnaAI Agents** | `apps/varnaai` | Development | Next.js 14, NestJS, Neo4j |
| **Agentic Coder** | `apps/agenticcoder` | Development | AI coding assistant |
| **Project Manager** | `apps/projectmanager` | Development | Node.js |
| **WebScrap** | `apps/webscrap` | Development | Web scraping platform |
| **Tax App** | `apps/taxapp` | Development | Tax application |
| **LibreChat** | `apps/LibreChat` | Self-hosted | External project |

### App Documentation

Each app has its own `CLAUDE.md` with specific instructions:
- `apps/pension/CLAUDE.md` - RetirementAI workflow
- `apps/fwchange/CLAUDE.md` - FwChange workflow
- `apps/dashboard/CLAUDE.md` - C3 workflow
- `apps/seoagent/CLAUDE.md` - SEO Agent workflow
- `apps/varnaai/CLAUDE.md` - VarnaAI workflow

---

## Task Master Tasks (Jan 2026 Launch)

### Location: `.taskmaster/tasks/`

| File | Title | Status | Priority |
|------|-------|--------|----------|
| `task_083.md` | VarnaAI Business Card Homepage | IN-PROGRESS | HIGH |
| `task_084.md` | Simplify Other 3 Sites | PENDING | After 83 |
| `task_085.md` | Business Cards Design & Order | URGENT | Order NOW |
| `task_086.md` | 3 Anonymized Case Studies | DONE | - |
| `task_087.md` | LinkedIn Profile Optimization | DONE | - |
| `task_088.md` | Sales Materials Templates | DONE | - |
| `task_089.md` | Google Sheets Dashboard | PENDING | Jan 5 |
| `task_090.md` | January LinkedIn Posts (12) | DONE | - |
| `task_091.md` | Lead Magnets Preparation | DONE | - |
| `task_092.md` | Networking Event Prep (Jan 26) | PENDING | Jan 17-25 |

---

## Strategy Documents

### Location: `docs/strategy/`

| Document | Purpose |
|----------|---------|
| `BUSINESS_PLAN_2025.md` | **Master strategic plan** - 12-month roadmap |
| `PORTFOLIO-SEO-STRATEGY.md` | SEO strategy for all sites |
| `APPS-PORTFOLIO.md` | SaaS apps overview |
| `PILOT-SOWS.md` | Pilot project statements of work |
| `BACKLINK_AUTOMATION_PLAN.md` | Backlink building strategy |
| `THREE_FLOW_DEVELOPMENT_STRATEGY.md` | Development workflow |

### C3 Strategy (`docs/strategy/C3/`)

| Document | Purpose |
|----------|---------|
| `MARKET_RESEARCH_2025.md` | Enterprise market research |
| `SME_MARKET_REALITY_2025.md` | Realistic Bulgarian SME assessment |
| `ACTION_PLAN_DECEMBER_2025.md` | December tasks |
| `SERVICE_DELIVERY_PLAYBOOK.md` | How to deliver C3 services |
| `VCCI_Membership_Action_Plan.md` | Chamber of Commerce plan |
| `VARNA_LOCAL_MARKET_RESEARCH_2025.md` | Local Varna research |
| `DIGITAL_MARKETING_CAMPAIGN_2025.md` | Marketing campaign |

### AIMarketingBG Strategy (`docs/strategy/AIMarketingBG/`)

| Document | Purpose |
|----------|---------|
| `BUSINESS_PLAN_2025.md` | AIMarketingBG business plan |
| `IMMEDIATE_ACTIONS_DEC2025.md` | December priorities |
| `BD_JOB_DESCRIPTION.md` | Business development role |
| `PROSPECT_LIST_HOTELS.md` | Hotel industry targets |

### FwChange Strategy (`docs/strategy/FwChange/`)

| Document | Purpose |
|----------|---------|
| `MARKET_RESEARCH_2025.md` | German firewall market |

---

## Case Studies

### Location: `docs/case-studies/`

| File | Anonymous Client | Real Source |
|------|------------------|-------------|
| `01-industrial-iot-azure-iso27001.md` | Global Industrial Equipment Manufacturer | Caterpillar |
| `02-payment-processing-fwchange-automation.md` | European Payment Processor | Worldline |
| `03-automotive-azure-xsoar-migration.md` | Global Automotive Supplier | Mann und Hummel |

**Output Formats in Each File**:
- Website version (500 words)
- LinkedIn version (150 words)
- Slide deck (3 slides)
- Verbal story (90 seconds)

---

## Sales & Marketing Materials

### Marketing (`docs/marketing/`)

| Document | Purpose |
|----------|---------|
| `linkedin-profile-optimization.md` | LinkedIn profile guide |
| `linkedin-posts-january-2026.md` | 12 pre-written posts |
| `security-checklist-bulgarian-smes.md` | 25-point checklist (lead magnet) |
| `seo-audit-template-free-offer.md` | Free SEO audit offer |

### Sales (`docs/sales/`)

| Document | Purpose |
|----------|---------|
| `sales-materials-complete-toolkit.md` | **Complete sales toolkit** |

**Toolkit Contents**:
- Discovery call script
- 3 proposal templates (Entry/Project/Retainer)
- 6 email templates
- NDA template
- Client onboarding checklist

### Bulgarian Sales Materials (`assets/sales-materials-bg/`)

**16 templates** for Bulgarian market outreach:

| Document | Purpose |
|----------|---------|
| `c3-onepager-content-bg.md` | C3 one-pager in Bulgarian |
| `c3-pilot-contract-bg.md` | Pilot contract template |
| `c3-pilot-program-terms.md` | Pilot program terms |
| `c3-cold-email-bg.txt` | Cold email template |
| `c3-followup-email-bg.txt` | Follow-up email template |
| `c3-linkedin-dm-bg.txt` | LinkedIn DM template |
| `c3-phone-script-bg.txt` | Phone script (C3 focused) |
| `cold-email-template.md` | General cold email |
| `phone-script-bulgarian.md` | General phone script |
| `invoice-template-bg.md` | Invoice template |
| `nurture-templates-bg.md` | Nurture email sequence |
| `payment-setup-bg.md` | Payment setup guide |
| `bd-rep-job-posting-bg.md` | BD rep job posting |
| `one-pager-structure.md` | One-pager template |
| `classic-security-emails.md` | Classic Security emails |
| `vcci-application-letter-template.txt` | VCCI membership letter |

---

## PRDs & Deployment

### Location: `docs/prds/`

| Document | Purpose |
|----------|---------|
| `MASTER-DEPLOYMENT-PRD.md` | Master deployment plan |
| `HETZNER-CONSOLIDATION-PRD.md` | VPS consolidation (archived) |
| `BETA-DEMO-DEPLOYMENT-PRD.md` | Demo deployment |
| `BETA-DEMO-DEPLOYMENT-ADDENDUM.md` | Demo addendum |
| `LOCAL-DEV-HETZNER-DEMO-PRD.md` | Local to VPS guide |
| `SECURE-PRELAUNCH.md` | Security checklist |
| `IMPLEMENTATION-CHECKLIST.md` | Implementation tracking |

---

## Blog Content

### Location: `blogs/`

**Key Files**:
| File | Purpose |
|------|---------|
| `START_HERE.md` | Quick start guide ("go" command) |
| `URLS.md` | 54 real internal URLs for 4 websites |
| `SAAS_APPS.md` | Portfolio apps to promote |
| `INSTRUCTIONS.md` | SEO rules, WordPress formatting |
| `LESSONS_LEARNED.md` | Error archive (56K tokens saved) |
| `TOPIC_DIVERSITY_MATRIX.md` | 80+ unique topics |
| `GAP_ANALYSIS_2025.md` | Content gaps and priorities |

**Blog Posts Archive** (`blogs/blog_posts/`):

| Date | ai-projektmanager | aimarketingbg | varna-agenten | varnaai | Total |
|------|-------------------|---------------|---------------|---------|-------|
| 2025-12-02 | 10 posts | - | - | 8 posts | 18 |
| 2025-12-08 | + | + | + | + | - |
| 2025-12-13 | + | + | + | + | - |
| 2025-12-16 | + | + | + | + | - |
| 2025-12-17 | Honest rewrites | - | - | - | - |
| 2025-12-19 | + | + | + | + | - |
| 2025-12-22 | + | + | + | + | - |

**Total Blog Posts**: 50+ across all dates and sites

---

## Infrastructure & Operations

### Location: `operations/`

| Directory | Purpose |
|-----------|---------|
| `compose/` | Docker Compose configurations |
| `hub-worker/` | Cloudflare Worker |
| `scripts/` | Automation scripts |
| `cron/` | Cron job configurations |
| `monitoring/` | Monitoring configurations |
| `security/` | Security configurations |
| `snippets/` | Reusable code snippets |

### Google Sheets Dashboard (`docs/operations/`)

| Document | Purpose |
|----------|---------|
| `google-sheets-dashboard-setup.md` | Full setup guide |
| `google-sheets-dashboard-quickstart.md` | Quick start |
| `scott-research-guide.md` | Research assistant guide |
| `scott-lead-research-template.csv` | Lead research template |

---

## SEO Resources

### Location: `seo/`

| Path | Content |
|------|---------|
| `SEO_Portfolio_Strategy_2025.md` | Master SEO strategy |
| `KEYWORD_RESEARCH_2025.md` | Keyword research |
| `SEO_KEYWORD_CHANGES_Q1_2025.md` | Q1 2025 changes |
| `BACKLINK_OPPORTUNITIES_2025-12.md` | December backlink opportunities |
| `audits-raw/` | Raw PDF audits from tools |
| `site-audits/` | Per-site analysis |
| `backlink-campaign/` | Backlink outreach campaign |
| `guest-posts/` | Guest post content |
| `outreach/` | Outreach templates |
| `tools/` | SEO automation scripts |

---

## Research Documents

### Location: `research/`

| Document | Purpose |
|----------|---------|
| `german-compliance-market-2025.md` | German compliance market analysis |
| `ai-coding-market-2025.md` | AI coding market research |
| `varna-business-ecosystem-research-2025.md` | Varna business ecosystem |
| `varna-networking-event-january-26-2026-research.md` | Jan 26 event research |
| `fwchange-strategy.md` | FwChange strategy |
| `fwchange-linkedin-outreach.md` | FwChange LinkedIn outreach |
| `crosspromo-strategy.md` | Cross-promotion strategy |
| `varna-business-landscape-2024-2025.md` | Varna business landscape |

---

## Claude Work Products

### Location: `claudedocs/`

**50+ analysis reports** including:

| Category | Examples |
|----------|----------|
| **SEO Analysis** | AI_MARKETING_BG_SEO_ANALYSIS_2025.md, SEO_AUDIT_COMPREHENSIVE_SUMMARY_2025.md |
| **Backlink Strategy** | BACKLINK_STRATEGY_2025_COMPREHENSIVE.md, BACKLINK_OUTREACH_STRATEGY_2025.md |
| **VPS Audits** | VPS_AUDIT_REPORT_2025-12-*.md (multiple dates) |
| **Competitor Analysis** | COMPETITOR_ANALYSIS_GERMAN_AI_COMPLIANCE_2025.md |
| **Content Audits** | BLOG_CONTENT_AUDIT_REPORT.md, VARNAAI_CONTENT_AUDIT_2025-12-21.md |
| **Code Analysis** | CODE_ANALYSIS_REPORT.md, CLEANUP_ANALYSIS_REPORT.md |
| **Market Research** | varna-ai-services-market-research-2025-12-18.md |

---

## Key Reference Files

| File | Purpose | Location |
|------|---------|----------|
| `CLAUDE.md` | WordPress workflow, credentials, SEO rules | Root |
| `COMPANY_INFO.md` | Company details for all sites | Root |
| `SCHEMA_ORG_TEMPLATES.md` | Schema markup reference | Root |
| `INVENTORY_Q1_2026.md` | Complete status report | Root |
| `wordpress/README.md` | WordPress reference | wordpress/ |
| `blogs/START_HERE.md` | Blog generation workflow | blogs/ |
| `blogs/URLS.md` | 54 real internal URLs | blogs/ |
| `apps/DOCKER_MIGRATION_GUIDE.md` | Docker setup guide | apps/ |

---

## Credentials & Secrets

### Location: `work/secrets/`

**Keymanager Usage**:
```bash
# List all available secrets
python keymanager.py list

# Get WordPress credentials
python keymanager.py get wordpress varnaai.com

# Get API key
python keymanager.py get api openai
```

**In Python**:
```python
import sys
sys.path.insert(0, "D:/VarnaAI/Websites/work")
from secrets.keymanager import get_wordpress

creds = get_wordpress("varnaai.com")
```

---

## Privacy & Security Notes

- **Never use real names**: Owner = "Gennadius", Partner = "Vanderbilt"
- **Case studies**: Always anonymized (see CV-based templates in CLAUDE.md)
- **Credentials**: Managed via keymanager (gitignored)
- **VPS Access**: OFFLINE - migrated to static pages

---

## Timeline (Jan 2026 Launch)

| Date | Milestone |
|------|-----------|
| Dec 23 | Order business cards |
| Dec 28 - Jan 10 | Target company research |
| Jan 5 | Google Sheets dashboard ready |
| Jan 10 | Business cards delivered |
| Jan 10-17 | Find networking events |
| Jan 17-25 | Event preparation |
| **Jan 26** | **First networking event** |

---

## Quick Actions

### Start Working on VarnaAI Homepage
```
1. Read CLAUDE.md for workflow
2. Check .taskmaster/tasks/task_083.md for homepage spec
3. Create blank page in WordPress
4. Wait for Big Dick to add Kadence blocks
5. Fill content per spec
```

### Check Current Tasks
```bash
# View all tasks
cat .taskmaster/tasks/tasks.json | jq '.tasks[] | {id, title, status}'

# Or use Task Master MCP
mcp__task-master__get_tasks --projectRoot "D:\VarnaAI\Websites"
```

### Access Credentials
```bash
cd work/secrets
python keymanager.py get wordpress varnaai.com
```

### Start Local Docker Apps
```bash
# Start all 3 apps
cd apps/pension && docker-compose up -d
cd ../dashboard && docker-compose up -d
cd ../fwchange && docker-compose up -d

# Check status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Generate Blog Post
```
1. Read blogs/START_HERE.md
2. Say "go" → Choose website → Execute 3-phase workflow
```

---

## Social Media Profiles

| Brand | Facebook | Instagram | LinkedIn | X/Twitter |
|-------|----------|-----------|----------|-----------|
| **Varna AI** | [varnaai](https://facebook.com/varnaai/) | [varnaaicom](https://instagram.com/varnaaicom) | [varnaai](https://linkedin.com/company/varnaai/) | [Varna_Ai](https://x.com/Varna_Ai) |
| **AI Projektmanager** | [AIProjektmanager](https://facebook.com/AIProjektmanager/) | [aiprojectmanger](https://instagram.com/aiprojectmanger) | [ai-projektmanager](https://linkedin.com/company/ai-projektmanager/) | [AiProjekt](https://x.com/AiProjekt) |
| **Varna Agenten** | [VarnaAgenten](https://facebook.com/VarnaAgenten/) | [varnaagents](https://instagram.com/varnaagents) | [varna-agenten](https://linkedin.com/company/varna-agenten/) | [VarnaAgenten](https://x.com/VarnaAgenten) |
| **AI Marketing BG** | [aimarketingbg](https://facebook.com/aimarketingbg/) | [aimarketingbg](https://instagram.com/aimarketingbg/) | [ai-marketing-bg](https://linkedin.com/company/ai-marketing-bg/) | [aimarketingbg](https://x.com/aimarketingbg) |

---

## Troubleshooting

### Common Issues

#### WordPress Access Issues
```bash
# Verify credentials
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py get wordpress varnaai.com

# Test login URL
# https://varnaai.com/wp-admin/
# Username: claude
```

#### Docker Apps Not Starting
```bash
# Check if containers exist
docker ps -a

# View logs
docker logs pension-app
docker logs c3-frontend
docker logs fwchange-frontend

# Restart specific app
cd apps/pension && docker-compose down && docker-compose up -d
```

#### Dead Demo Links on VarnaAI.com
**Status**: VPS is OFFLINE. Demo links point to dead subdomains.
**Solution**: Update to static HTML pages on All-Inkl or remove buttons
**Files affected**: Portfolio pages on varnaai.com

#### Task Master Not Finding Tasks
```bash
# Verify project root
cd D:\VarnaAI\Websites

# Check tasks file exists
cat .taskmaster/tasks/tasks.json | jq '.tasks | length'

# View task details
cat .taskmaster/tasks/task_083.md
```

#### MCP Server Not Connected
```bash
# Check MCP configuration
cat .mcp.json

# Verify server is running (example for playwright)
# MCP servers are configured in Claude Code settings, not project files
```

### File Not Found Errors

| Error | Solution |
|-------|----------|
| `keymanager.py not found` | Navigate to `work/secrets/` first |
| `secrets.yaml missing` | File is gitignored - create from template |
| `CLAUDE.md not loading` | Ensure correct project root in Claude Code |
| `tasks.json invalid` | Validate JSON syntax with `jq .` |

---

## GitHub Repositories

### Repository Structure

| Repo | Visibility | Purpose | URL |
|------|------------|---------|-----|
| **VarnaAIMaster** | Private | Master repo with all folders | github.com/Marvelious/VarnaAIMaster |
| **Scott-VarnaAI** | Public | Synced repo for Scott (beta tester) | github.com/Marvelious/Scott-VarnaAI |

### App Repositories

| App | Repo | Status |
|-----|------|--------|
| RetirementAI | `Marvelious/RetirementAI` | ✅ Active |
| FwChange | `Marvelious/FwChange` | ✅ Active |
| C3 Compliance | `Marvelious/compliance-command-center` | ✅ Active |
| SEO Agent | `Marvelious/seoagent` | ✅ Active |
| VarnaAI Agents | `Marvelious/varnaai-platform` | ✅ Active |
| Project Manager | `Marvelious/projectmanager` | ✅ Active |
| Agentic Coder | `Marvelious/agenticcoder` | ✅ Active |
| Tax App | `Marvelious/taxapp` | ✅ Active |
| WebScrap | `Marvelious/webscrap` | ✅ Active |

### Scott Beta Tester Setup

**Files for Scott** (in repo root):
| File | Purpose |
|------|---------|
| `SCOTT_SETUP.bat` | One-click Docker launcher (menu-driven) |
| `SCOTT_STOP.bat` | Stop all Docker containers |
| `SCOTT_README.md` | Simple setup guide |

**Scott's Workflow**:
```bash
# Clone repo
git clone https://github.com/Marvelious/Scott-VarnaAI.git

# Run setup
cd Scott-VarnaAI
# Double-click SCOTT_SETUP.bat → Choose app → Done!
```

**Sync Commands**:
```bash
# Push to both repos
git push origin master && git push scott master

# Pull Scott's changes
git pull scott master
```

### Excluded from Scott-VarnaAI
- `cv/` - Personal CV files
- `mcp-bridge/` - MCP bridge internals
- `ml_models/` - ML models
- `work/secrets/` - Credentials

---

## Changelog

### 2025-12-26 (Update 2)
- **GitHub Setup**: VarnaAIMaster + Scott-VarnaAI repos created
- **Scott Beta Tester**: SCOTT_SETUP.bat, SCOTT_STOP.bat, SCOTT_README.md added
- All 10 apps now have GitHub repos with proper remotes
- Dual-remote sync (origin + scott) configured

### 2025-12-26
- **PROJECT_INDEX.md**: Complete rewrite with comprehensive documentation
- **DOCUMENTATION_INDEX.md**: Updated to reflect current project state
- Added Table of Contents for easier navigation
- Added Troubleshooting section
- Fixed Bulgarian sales materials list (16 files, was 5)
- Updated blog post counts and archive structure
- Added changelog section

### 2025-12-25
- **INVENTORY_Q1_2026.md**: Created Q1 2026 action plan
- Task Master cleanup tasks completed (11/11)
- Documentation CLAUDE.md files updated across apps

### 2025-12-23
- Strategic pivot decision: VPS shutdown, consulting focus
- Business card spec finalized
- Case studies completed (3/3)

### 2025-12-21
- Fake content audit completed
- VarnaAI.com cleanup finished
- AIMarketingBG cleanup finished

### Earlier Updates
- See `done/` directory for archived cleanup reports
- See `claudedocs/` for historical analysis reports

---

**Last Updated**: 2025-12-26
**Maintained By**: Claude Code
