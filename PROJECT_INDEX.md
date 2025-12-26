# VarnaAI Websites - Project Index

**Last Updated**: 2025-12-26
**Repository**: `D:\VarnaAI\Websites`
**Branch**: master

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Directory Structure](#directory-structure)
3. [Applications Inventory](#applications-inventory)
4. [Port Allocation Matrix](#port-allocation-matrix)
5. [Docker Networks](#docker-networks)
6. [WordPress Portfolio Sites](#wordpress-portfolio-sites)
7. [Key Documentation Files](#key-documentation-files)
8. [Infrastructure & Operations](#infrastructure--operations)
9. [Quick Reference](#quick-reference)
10. [Related Audit Reports](#related-audit-reports)

---

## Repository Overview

### Purpose

The VarnaAI Websites repository is a comprehensive monorepo that serves as the central hub for:

1. **WordPress Portfolio Management** - 4 WordPress sites for AI services marketing
2. **SaaS Application Development** - 10+ Docker-based applications for various AI/business solutions
3. **SEO & Content Strategy** - Automated SEO tools, blog generation, and content optimization
4. **Business Operations** - Bulgarian market launch preparation, sales materials, and strategy documents

### Architecture

```
+---------------------------+
|    VarnaAI Websites       |
|    (Master Monorepo)      |
+---------------------------+
            |
    +-------+-------+
    |               |
+-------+     +------------+
| apps/ |     | wordpress/ |
| (11)  |     | (4 sites)  |
+-------+     +------------+
    |
+---+---+---+---+---+---+---+---+---+---+---+
|   |   |   |   |   |   |   |   |   |   |   |
pension c3 fwchange seo pm agenticcoder tax webscrap master outreach LibreChat
```

### Current Status (December 2025)

| Component | Status | Notes |
|-----------|--------|-------|
| Local Docker Development | Active | 33 containers running |
| Hetzner VPS | OFFLINE | Shutdown December 2025 |
| WordPress Sites | Active | All-Inkl shared hosting |
| Production Demos | Migrating | Moving to static landing pages |

### Strategic Pivot: Consulting-First (January 2026)

**Business Model**: Consulting services first, SaaS demos revived Q3 2026+

| Item | Status | Action |
|------|--------|--------|
| Business Mode | CONSULTING | Face-to-face Bulgarian SME clients |
| VPS (Hetzner) | OFFLINE | Shutdown complete - demos archived |
| SaaS Demos | ARCHIVED | Static landing pages on All-Inkl |
| VarnaAI.com | PRIMARY | Business card homepage (Task 83) |
| Other 3 sites | DORMANT | WordPress running, no development |

**Consulting Services**:
| Service | Price (EUR) |
|---------|-------------|
| GDPR Compliance Audit | ~€500 |
| ISO 27001 Implementation | ~€5,000 |
| NIS2 Readiness Assessment | ~€1,000 |
| Monthly Advisory Retainer | ~€150/month |

**2026 Targets**: €2,000/mo consulting revenue, 10 clients by Q4 2026
**SaaS Revival Decision**: Q3 2026 (when consulting stable)

---

## Directory Structure

```
D:\VarnaAI\Websites\
|
+-- ROOT DOCUMENTS
|   +-- CLAUDE.md              <- Primary workflow reference
|   +-- README.md              <- Project overview
|   +-- PROJECT_INDEX.md       <- This file
|   +-- COMPANY_INFO.md        <- Company details (4 sites)
|   +-- SCHEMA_ORG_TEMPLATES.md <- Schema markup reference
|   +-- AGENT.md / AGENTS.md   <- Agent configurations
|
+-- .taskmaster/               <- Task Master AI
|   +-- tasks/
|   |   +-- tasks.json         <- Task definitions
|   |   +-- task_083-092.md    <- Jan 2026 launch tasks
|   +-- config.json
|   +-- templates/
|
+-- apps/                      <- SaaS Applications (11 apps)
|   +-- varnaai-pension/       <- RetirementAI (Next.js)
|   +-- varnaai-c3/            <- C3 Compliance (React + Node)
|   +-- varnaai-fwchange/      <- FwChange (React + FastAPI)
|   +-- varnaai-seo/           <- SEO Agent (Vite + Express)
|   +-- varnaai-pm/            <- Project Manager
|   +-- varnaai-agenticcoder/  <- Agentic Coder
|   +-- varnaai-tax/           <- Tax App (Bulgarian)
|   +-- varnaai-webscrap/      <- Web Scraper (skipped)
|   +-- varnaai-master/        <- VarnaAI Master (skipped)
|   +-- varnaai-outreach/      <- Outreach Platform
|   +-- ai-lab/                <- AI Lab experiments
|   +-- LibreChat/             <- Self-hosted chat (external)
|   +-- COMPLETE_INVENTORY_2025-12-26.md
|   +-- DOCKER_AUDIT_REPORT_2025-12-26.md
|
+-- assets/                    <- Images, diagrams, media
|   +-- images/
|   +-- diagrams/
|   +-- sales-materials-bg/    <- Bulgarian sales materials
|
+-- blogs/                     <- Blog generation system
|   +-- blog_posts/            <- Generated blog posts archive
|   +-- docs/                  <- Blog workflow documentation
|   +-- INSTRUCTIONS.md        <- SEO rules, WordPress formatting
|   +-- URLS.md                <- 54 real internal URLs for linking
|   +-- START_HERE.md          <- Quick start guide
|   +-- TOPIC_DIVERSITY_MATRIX.md <- 80+ unique topics
|
+-- claudedocs/                <- Claude AI work products
|
+-- config/                    <- Configuration files
|
+-- cv/                        <- CV/Resume materials
|
+-- design/                    <- Design mockups and specs
|   +-- dashboard-fwchange.html
|   +-- login-fwchange.html
|   +-- REACT_IMPLEMENTATION_GUIDE.md
|
+-- docs/                      <- Strategic documentation
|   +-- analysis/              <- Project analysis
|   +-- case-studies/          <- 3 case studies (DONE)
|   +-- implementation/        <- Implementation tracking
|   +-- marketing/             <- LinkedIn posts, profiles
|   +-- operations/            <- Operational docs
|   +-- planning/              <- Execution planning
|   +-- prds/                  <- Product requirement documents
|   +-- reference/             <- Reference documentation
|   +-- sales/                 <- Sales toolkit
|   +-- strategy/              <- Strategic planning
|       +-- BUSINESS_PLAN_2025.md   <- Master business plan
|       +-- C3/                <- C3-specific strategy
|       +-- FwChange/          <- FwChange-specific strategy
|       +-- AIMarketingBG/     <- Bulgaria marketing strategy
|
+-- done/                      <- Completed & archived work
|   +-- 2025-12-cleanup/       <- Cleanup archive
|
+-- marketing-machine/         <- Marketing automation
|
+-- mcp-bridge/                <- MCP server bridge
|
+-- ml_models/                 <- Machine learning models
|
+-- online-demos/              <- Demo landing pages
|
+-- operations/                <- Infrastructure & automation
|   +-- compose/               <- Docker configurations
|   +-- cron/                  <- Scheduled tasks
|   +-- env/                   <- Environment files
|   +-- hub-worker/            <- Cloudflare Worker
|   +-- monitoring/            <- Monitoring setup
|   +-- scripts/               <- Automation scripts
|   +-- security/              <- Security configurations
|   +-- snippets/              <- Code snippets
|
+-- outreach/                  <- Outreach campaigns
|
+-- public/                    <- Public assets
|
+-- research/                  <- Market research & analysis
|   +-- german-compliance-market-2025.md
|   +-- ai-coding-market-2025.md
|   +-- fwchange-strategy.md
|
+-- scripts/                   <- Utility scripts
|
+-- seo/                       <- SEO strategy & tools
|   +-- audits-raw/            <- Raw PDF audits
|   +-- backlink-campaign/     <- Backlink strategies
|   +-- guest-posts/           <- Guest posting
|   +-- guides/                <- SEO implementation guides
|   +-- nap-data/              <- NAP consistency data
|   +-- outreach/              <- SEO outreach
|   +-- site-audits/           <- Site-specific audits
|   +-- tools/                 <- SEO automation scripts
|   +-- SEO_Portfolio_Strategy_2025.md  <- Master SEO strategy
|
+-- vps/                       <- VPS configurations (deprecated)
|
+-- wordpress/                 <- WordPress content & snippets
|   +-- pages/                 <- Ready-to-paste page content
|   +-- snippets/              <- Reusable code snippets
|   +-- kadence-design-options.txt <- Kadence block configuration
|   +-- schema-templates.md    <- Schema markup templates
|
+-- work/                      <- Active work & agents
|   +-- secrets/               <- Centralized credentials (keymanager)
|   |   +-- keymanager.py      <- get/set/list secrets
|   |   +-- secrets.yaml       <- All credentials (gitignored)
|   +-- jobs/                  <- Freelance job hunter
|   +-- accountant/            <- Accountant tools
|   +-- crm/                   <- CRM tools
|   +-- gastro/                <- Gastro industry tools
|   +-- IOT/                   <- IoT projects
|   +-- realestate/            <- Real estate tools
```

---

## Applications Inventory

### Summary

| Total Apps | Running | Skipped | External |
|------------|---------|---------|----------|
| 11 | 7 | 2 | 1 |

### Detailed Application List

#### 1. Pension (RetirementAI)

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-pension` |
| **Purpose** | AI-powered retirement planning and portfolio management |
| **Tech Stack** | Next.js 16, React 19, PostgreSQL, Redis |
| **Frontend Port** | 3001 |
| **PostgreSQL Port** | 5433 |
| **Redis Port** | 6380 |
| **Docker Network** | 172.20.0.0/16 |
| **Container Prefix** | `pension-*` |
| **Status** | Production-Ready (Grade A) |
| **Key Features** | Trading212 API, AI advisor, portfolio optimization |
| **CLAUDE.md** | `apps/varnaai-pension/CLAUDE.md` |

---

#### 2. C3 Compliance

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-c3` |
| **Purpose** | GDPR/ISO 27001 compliance automation platform |
| **Tech Stack** | Express 4.18, React 18, PostgreSQL (pgvector), Redis |
| **Frontend Port** | 3002 |
| **Backend Port** | 8001 |
| **PostgreSQL Port** | 5434 |
| **Redis Port** | 6381 |
| **Docker Network** | 172.21.0.0/16 |
| **Container Prefix** | `c3-*` |
| **Status** | Production-Ready (Grade A) |
| **Key Features** | GDPR automation, 60-second scans, German documentation |
| **CLAUDE.md** | `apps/varnaai-c3/CLAUDE.md` |

---

#### 3. FwChange

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-fwchange` |
| **Purpose** | Enterprise firewall change management system |
| **Tech Stack** | FastAPI 0.121, React 18, Vite 7, PostgreSQL, Redis |
| **Frontend Port** | 3003 |
| **Backend Port** | 8002 |
| **PostgreSQL Port** | 5435 |
| **Redis Port** | 6382 |
| **Docker Network** | 172.22.0.0/16 |
| **Container Prefix** | `fwchange-*` |
| **Additional Services** | Jira (8080) |
| **Status** | Production-Ready (Grade A-) |
| **Key Features** | Multi-vendor firewalls, JIRA integration, PCI-DSS compliance |
| **CLAUDE.md** | `apps/varnaai-fwchange/CLAUDE.md` |

---

#### 4. SEO Agent

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-seo` |
| **Purpose** | AI-powered SEO analysis and optimization |
| **Tech Stack** | Vite 7, React 18, Express 4.19, PostgreSQL, Redis |
| **Frontend Port** | 3004 |
| **Backend Port** | 4000 |
| **PostgreSQL Port** | 5436 |
| **Redis Port** | 6383 |
| **Docker Network** | 172.26.0.0/16 |
| **Container Prefix** | `seoagent-*` |
| **Additional Services** | pgAdmin (5050), Ollama (11435) |
| **Status** | Production-Ready (Grade A) |
| **CLAUDE.md** | `apps/varnaai-seo/CLAUDE.md` |

---

#### 5. Project Manager

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-pm` |
| **Purpose** | AI-assisted project management tool |
| **Tech Stack** | Vite 7, React 19, Express 4.18, Sequelize, PostgreSQL |
| **Frontend Port** | 5173 |
| **Backend Port** | 3005 |
| **PostgreSQL Port** | 5438 |
| **Docker Network** | 172.27.0.0/16 |
| **Container Prefix** | `projectmanager-*` |
| **Status** | Development (Grade C+) |
| **CLAUDE.md** | `apps/varnaai-pm/CLAUDE.md` |

---

#### 6. Agentic Coder

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-agenticcoder/agenticcoder` |
| **Purpose** | AI coding assistant with monitoring infrastructure |
| **Tech Stack** | Vite 5.4, React 18, FastAPI 0.109, PostgreSQL |
| **Grafana Port** | 3008 |
| **Docker Network** | 172.28.0.0/16 |
| **Container Prefix** | `agenticcoder-*` |
| **Additional Services** | Prometheus (9090), Adminer (8082), Redis Commander (8081), Jaeger (16686) |
| **Status** | Development/Monitoring (Grade B) |
| **CLAUDE.md** | `apps/varnaai-agenticcoder/CLAUDE.md` |

---

#### 7. Tax App

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-tax` |
| **Purpose** | Bulgarian tax management and calculation |
| **Tech Stack** | React 18, Vite, FastAPI, Python 3.11, PostgreSQL, Redis |
| **Frontend Port** | 3009 |
| **Backend Port** | 8005 |
| **PostgreSQL Port** | 5440 |
| **Redis Port** | 6386 |
| **Docker Networks** | 172.29.0.0/16 (taxapp-network), ailab-network |
| **Ollama** | Uses shared `ailab-ollama` via ailab-network |
| **Status** | Development (Grade D - security issues) |

---

#### 8. Web Scraper (Skipped)

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-webscrap` |
| **Purpose** | Web scraping and data extraction platform |
| **Tech Stack** | Next.js 15, React 19, Prisma 5.22, PostgreSQL, Redis |
| **Frontend Port** | 3006 |
| **Backend Port** | 8003 |
| **Docker Network** | 172.23.0.0/16 |
| **Status** | Skipped (missing external path `D:/VarnaAI/Webscrap`) |

---

#### 9. VarnaAI Master (Skipped)

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-master` |
| **Purpose** | Multi-agent AI platform with orchestration |
| **Tech Stack** | NestJS 10.3, Next.js 16, React 19, TypeORM, PostgreSQL, Redis, Neo4j |
| **Frontend Port** | 3007 |
| **Backend Port** | 8004 |
| **Docker Network** | 172.25.0.0/16 |
| **Additional Services** | Neo4j (7475/7688), Qdrant (6335/6336) |
| **Status** | Skipped (missing external path `D:/VarnaAI/varnaai/varnaai-app/`) |

---

#### 10. Outreach Platform

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/varnaai-outreach` |
| **Purpose** | Lead generation and outreach automation |
| **Tech Stack** | Next.js, FastAPI, PostgreSQL, Prisma |
| **CLAUDE.md** | `apps/varnaai-outreach/CLAUDE.md` |
| **Status** | Development |

---

#### 11. LibreChat (External)

| Attribute | Value |
|-----------|-------|
| **Folder** | `apps/LibreChat` |
| **Purpose** | Self-hosted AI chat interface |
| **Tech Stack** | Express 5.1, React 18, Vite 6, MongoDB, Redis, Meilisearch |
| **Frontend Port** | 3080 |
| **Docker Network** | 172.18.0.0/16 |
| **Status** | External project - follow upstream |

---

## Port Allocation Matrix

### Frontend Ports (3000-3100)

| Port | Application | Service |
|------|-------------|---------|
| 3001 | Pension | Next.js Frontend |
| 3002 | C3 Compliance | React Frontend |
| 3003 | FwChange | React Frontend |
| 3004 | SEO Agent | React Frontend |
| 3005 | Project Manager | Backend API |
| 3006 | Web Scraper | Next.js Frontend |
| 3007 | VarnaAI Master | Next.js Frontend |
| 3008 | Agentic Coder | Grafana Dashboard |
| 3009 | Tax App | React Frontend |
| 3080 | LibreChat | Frontend |

### Backend Ports (4000-8100)

| Port | Application | Service |
|------|-------------|---------|
| 4000 | SEO Agent | Express Backend |
| 5173 | Project Manager | Vite Dev Server |
| 8001 | C3 Compliance | Express Backend |
| 8002 | FwChange | FastAPI Backend |
| 8003 | Web Scraper | Backend |
| 8004 | VarnaAI Master | NestJS Backend |
| 8005 | Tax App | FastAPI Backend |
| 8080 | FwChange | Jira |
| 8082 | Agentic Coder | Adminer |

### Database Ports (5432-5450)

| Port | Application | Database |
|------|-------------|----------|
| 5433 | Pension | PostgreSQL |
| 5434 | C3 Compliance | PostgreSQL |
| 5435 | FwChange | PostgreSQL |
| 5436 | SEO Agent | PostgreSQL |
| 5437 | VarnaAI Master | PostgreSQL |
| 5438 | Project Manager | PostgreSQL |
| 5439 | Web Scraper | PostgreSQL |
| 5440 | Tax App | PostgreSQL |

### Redis Ports (6379-6390)

| Port | Application |
|------|-------------|
| 6380 | Pension |
| 6381 | C3 Compliance |
| 6382 | FwChange |
| 6383 | SEO Agent |
| 6384 | VarnaAI Master |
| 6385 | Web Scraper |
| 6386 | Tax App |

### Monitoring & Tools

| Port | Application | Service |
|------|-------------|---------|
| 5050 | SEO Agent | pgAdmin |
| 9090 | Agentic Coder | Prometheus |
| 16686 | Agentic Coder | Jaeger |
| 11435 | Shared (ailab-ollama) | Ollama (GPU) |

---

## Docker Networks

### Network Allocation

| Subnet | Application | Status |
|--------|-------------|--------|
| 172.18.0.0/16 | LibreChat | Active |
| 172.20.0.0/16 | Pension | Active |
| 172.21.0.0/16 | C3 Compliance | Active |
| 172.22.0.0/16 | FwChange | Active |
| 172.23.0.0/16 | Web Scraper | Reserved |
| 172.25.0.0/16 | VarnaAI Master | Reserved |
| 172.26.0.0/16 | SEO Agent | Active |
| 172.27.0.0/16 | Project Manager | Active |
| 172.28.0.0/16 | Agentic Coder | Active |
| 172.29.0.0/16 | Tax App | Active |

### Container Naming Convention

All containers follow the pattern: `{app-prefix}-{service}`

| App | Prefix | Example Containers |
|-----|--------|-------------------|
| Pension | `pension-` | pension-app, pension-postgres, pension-redis |
| C3 | `c3-` | c3-frontend, c3-api, c3-postgres, c3-redis |
| FwChange | `fwchange-` | fwchange-frontend, fwchange-backend, fwchange-postgres |
| SEO Agent | `seoagent-` | seoagent-frontend, seoagent-backend, seoagent-postgres |
| Project Manager | `projectmanager-` | projectmanager-app, projectmanager-postgres |
| Agentic Coder | `agenticcoder-` | agenticcoder-postgres, agenticcoder-grafana |
| Tax App | `taxapp-` | taxapp-frontend, taxapp-backend, taxapp-postgres |

---

## WordPress Portfolio Sites

### Site Overview

| Site | URL | Language | Focus | Theme |
|------|-----|----------|-------|-------|
| AI Projektmanager | https://ai-projektmanager.de | German | AI Project Management | Kadence |
| AI Marketing BG | https://aimarketingbg.com | English/Bulgarian | AI Marketing | Kadence |
| Varna Agenten | https://varna-agenten.de | German | AI Agents | Kadence |
| Varna AI | https://varnaai.com | English | AI Services | Kadence |

### WordPress Access

Credentials are centralized in the keymanager:

```bash
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py get wordpress varnaai.com
```

All sites use:
- **Username**: `claude`
- **Theme**: Kadence
- **SEO Plugin**: Rank Math

### Social Media Profiles

| Brand | Facebook | Instagram | LinkedIn | X/Twitter |
|-------|----------|-----------|----------|-----------|
| Varna AI | [varnaai](https://facebook.com/varnaai/) | [varnaaicom](https://instagram.com/varnaaicom) | [varnaai](https://linkedin.com/company/varnaai/) | [Varna_Ai](https://x.com/Varna_Ai) |
| AI Projektmanager | [AIProjektmanager](https://facebook.com/AIProjektmanager/) | [aiprojectmanger](https://instagram.com/aiprojectmanger) | [ai-projektmanager](https://linkedin.com/company/ai-projektmanager/) | [AiProjekt](https://x.com/AiProjekt) |
| Varna Agenten | [VarnaAgenten](https://facebook.com/VarnaAgenten/) | [varnaagents](https://instagram.com/varnaagents) | [varna-agenten](https://linkedin.com/company/varna-agenten/) | [VarnaAgenten](https://x.com/VarnaAgenten) |
| AI Marketing BG | [aimarketingbg](https://facebook.com/aimarketingbg/) | [aimarketingbg](https://instagram.com/aimarketingbg/) | [ai-marketing-bg](https://linkedin.com/company/ai-marketing-bg/) | [aimarketingbg](https://x.com/aimarketingbg) |

---

## Key Documentation Files

### Root Level

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Main AI instructions, WordPress workflow, Docker architecture |
| `README.md` | Project overview, quick start, automation hub |
| `PROJECT_INDEX.md` | This comprehensive index (you are here) |
| `COMPANY_INFO.md` | Company details for all 4 sites |
| `SCHEMA_ORG_TEMPLATES.md` | Schema markup reference |

### Strategy Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Business Plan 2025 | `docs/strategy/BUSINESS_PLAN_2025.md` | Master business strategy |
| SEO Portfolio Strategy | `seo/SEO_Portfolio_Strategy_2025.md` | SEO master plan |
| SME Market Reality | `docs/strategy/C3/SME_MARKET_REALITY_2025.md` | Bulgarian SME analysis |
| Varna Local Research | `docs/strategy/C3/VARNA_LOCAL_MARKET_RESEARCH_2025.md` | Local market research |
| Service Delivery Playbook | `docs/strategy/C3/SERVICE_DELIVERY_PLAYBOOK.md` | Service delivery guide |

### Application CLAUDE.md Files

Each application has its own instruction file:

| Application | CLAUDE.md Location |
|-------------|-------------------|
| Pension | `apps/varnaai-pension/CLAUDE.md` |
| C3 Compliance | `apps/varnaai-c3/CLAUDE.md` |
| FwChange | `apps/varnaai-fwchange/CLAUDE.md` |
| SEO Agent | `apps/varnaai-seo/CLAUDE.md` |
| Project Manager | `apps/varnaai-pm/CLAUDE.md` |
| Agentic Coder | `apps/varnaai-agenticcoder/CLAUDE.md` |
| VarnaAI Master | `apps/varnaai-master/CLAUDE.md` |
| Outreach | `apps/varnaai-outreach/CLAUDE.md` |

### Audit Reports (2025-12-26)

| Report | Location |
|--------|----------|
| Complete Inventory | `apps/COMPLETE_INVENTORY_2025-12-26.md` |
| Docker Audit | `apps/DOCKER_AUDIT_REPORT_2025-12-26.md` |
| Frontend Audit | `apps/FRONTEND_AUDIT_REPORT_2025-12-26.md` |
| Backend Audit | `apps/BACKEND_AUDIT_REPORT_2025-12-26.md` |
| Apps Inventory | `apps/APPS_INVENTORY_2025-12-26.md` |

---

## Infrastructure & Operations

### Host Environment (Lenovo Legion 5 15IAX10)

| Component | Specification |
|-----------|---------------|
| Laptop | Lenovo Legion 5 15IAX10 |
| OS | Windows 11 |
| RAM | 64GB DDR5 |
| GPU | NVIDIA RTX 5070 |
| VRAM | 8GB GDDR7 |
| Docker | Docker Desktop with WSL2 |
| Ollama | Shared container with GPU passthrough |
| Master Folder | `D:\VarnaAI\Websites` |

### Shared Services

#### Ollama (GPU-enabled) - UNIFIED ARCHITECTURE

**Single Shared Instance**: All apps now use ONE Ollama container for GPU efficiency.

| Component | Value |
|-----------|-------|
| **Container Name** | `ailab-ollama` |
| **Host Port** | 11435 |
| **Container Port** | 11434 |
| **Network** | `ailab-network` (external) |
| **GPU** | NVIDIA RTX 5070 (8GB VRAM) |
| **Memory Limit** | 8GB RAM (container) |
| **Health Check** | Every 30s via `/api/tags` |

**Apps Connected to ailab-network**:
| App | Container | Ollama URL |
|-----|-----------|------------|
| LibreChat | librechat-api, librechat-rag-api | http://ailab-ollama:11434 |
| AI Lab | ailab-llamafactory, ailab-jupyter, ailab-mlflow | http://ailab-ollama:11434 |
| Tax App | taxapp-backend | http://ailab-ollama:11434 |

**Startup Order**:
```bash
# 1. Start shared Ollama FIRST (creates ailab-network)
docker compose -f D:/VarnaAI/Websites/operations/compose/shared-ollama.yml up -d

# 2. Start other apps (connect to existing network)
cd D:/VarnaAI/Websites/apps/LibreChat && docker compose up -d
cd D:/VarnaAI/Websites/apps/ai-lab && docker compose up -d
```

**Configuration File**: `operations/compose/shared-ollama.yml`

### Operations Folder Structure

```
operations/
+-- compose/          # Docker Compose templates
+-- cron/             # Scheduled task definitions
+-- env/              # Environment file templates
+-- hub-worker/       # Cloudflare Worker scripts
+-- monitoring/       # Prometheus/Grafana configs
+-- scripts/          # Automation scripts
+-- security/         # Security configurations
+-- snippets/         # Reusable code snippets
+-- OLLAMA_SHARED_SETUP.md
+-- README.md
```

### Secrets Management

All credentials are centralized:

```
work/secrets/
+-- keymanager.py     # get/set/list secrets
+-- secrets.yaml      # All API keys & passwords (gitignored)
```

Usage:
```bash
# Get WordPress credentials
python keymanager.py get wordpress varnaai.com

# List all secrets
python keymanager.py list
```

---

## Quick Reference

### Start All Apps (Development)

```bash
# From apps/ folder - Start individual apps
cd D:\VarnaAI\Websites\apps\varnaai-pension && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-c3 && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-fwchange && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-seo && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-pm && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-agenticcoder\agenticcoder && docker-compose up -d
cd D:\VarnaAI\Websites\apps\varnaai-tax && docker-compose up -d
```

### Check Running Containers

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Check Resource Usage

```bash
docker stats --no-stream
```

### Local Access Points

| Service | URL |
|---------|-----|
| Pension | http://localhost:3001 |
| C3 Compliance | http://localhost:3002 |
| FwChange | http://localhost:3003 |
| SEO Agent | http://localhost:3004 |
| FwChange API | http://localhost:8002/docs |
| C3 API | http://localhost:8001 |
| Jira (FwChange) | http://localhost:8080 |
| pgAdmin (SEO) | http://localhost:5050 |
| Grafana (Agentic) | http://localhost:3008 |

### Blog Generation

```bash
# Quick start for blog generation
cd D:\VarnaAI\Websites\blogs
# See START_HERE.md for the "go" command workflow
```

### Task Master

```bash
# View tasks
cd D:\VarnaAI\Websites
# Tasks are in .taskmaster/tasks/
```

---

## Related Audit Reports

### Latest Audits (2025-12-26)

1. **COMPLETE_INVENTORY_2025-12-26.md**
   - Total apps: 10 (7 running, 2 skipped, 1 external)
   - All port conflicts resolved
   - Folder naming convention: `varnaai-*`

2. **DOCKER_AUDIT_REPORT_2025-12-26.md**
   - 33 containers running
   - Grades: A (3 apps), A- (1), B+ (2), B (1), C+ (1), C (1), D (1)
   - Critical issues: taxapp security, projectmanager credentials

3. **FRONTEND_AUDIT_REPORT_2025-12-26.md**
   - React versions: 18-19
   - Build tools: Vite 5-7, Next.js 14-16
   - CRA migration complete (agenticcoder)

4. **BACKEND_AUDIT_REPORT_2025-12-26.md**
   - Frameworks: Express, FastAPI, NestJS
   - ORMs: Prisma, Sequelize, TypeORM
   - All services with health checks

---

## January 2026 Bulgaria Launch

### Task Status

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

### Prepared Materials

| Material | Status | Location |
|----------|--------|----------|
| 3 Case Studies | DONE | `docs/case-studies/` |
| LinkedIn Profile | DONE | `docs/marketing/` |
| 12 LinkedIn Posts | DONE | `docs/marketing/` |
| Sales Toolkit | DONE | `docs/sales/` |
| Business Cards | In Progress | `assets/` |

### Service Pricing (Bulgarian Market)

| Service | Price |
|---------|-------|
| Free discovery call | Bezplatno |
| GDPR Compliance Audit | 980 lv (~EUR 500) |
| ISO 27001 Implementation | 9,800 lv (~EUR 5,000) |
| Monthly Advisory | 290 lv/month (~EUR 150/mo) |

---

## GitHub Repositories

### Repository Structure

| Repo | Visibility | Purpose | URL |
|------|------------|---------|-----|
| VarnaAIMaster | Private | Master repo with all folders | github.com/Marvelious/VarnaAIMaster |
| Scott-VarnaAI | Public | Synced repo for Scott (beta tester) | github.com/Marvelious/Scott-VarnaAI |

### Scott Beta Tester Setup

Files for Scott (in repo root):
- `SCOTT_SETUP.bat` - One-click Docker launcher (menu-driven)
- `SCOTT_STOP.bat` - Stop all Docker containers
- `SCOTT_README.md` - Simple setup guide

---

## Privacy & Security Notes

- **Never use real names**: Owner = "Gennadius", Partner = "Vanderbilt"
- **Case studies**: Always anonymized (see CV-based templates in CLAUDE.md)
- **Credentials**: Managed via keymanager (gitignored)
- **VPS Access**: OFFLINE - migrated to static pages

---

## Changelog

### 2025-12-26 (Update 4)
- **Shared Ollama Architecture**: Unified all apps to use single `ailab-ollama` container
- Removed duplicate Ollama instances (taxapp-ollama eliminated)
- LibreChat, AI Lab, and Tax App now share GPU resources via `ailab-network`
- Added health checks and memory limits to Ollama configuration
- Updated `operations/OLLAMA_SHARED_SETUP.md` with complete documentation

### 2025-12-26 (Update 3)
- **PROJECT_INDEX.md**: Complete rewrite with comprehensive documentation
- Added complete apps inventory with 11 applications
- Added port allocation matrix (3000-8100 range)
- Added Docker networks table
- Added infrastructure and operations section
- Added January 2026 Bulgaria launch section
- Added GitHub repositories section

### 2025-12-26 (Update 2)
- **GitHub Setup**: VarnaAIMaster + Scott-VarnaAI repos created
- **Scott Beta Tester**: SCOTT_SETUP.bat, SCOTT_STOP.bat, SCOTT_README.md added
- All apps now have GitHub repos with proper remotes

### 2025-12-26 (Update 1)
- Docker infrastructure audit completed
- All port conflicts resolved
- Folder naming convention standardized to `varnaai-*`

---

*Generated by Claude Code on 2025-12-26*
*Next update recommended: After significant infrastructure changes*
