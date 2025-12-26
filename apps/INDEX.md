# Apps Directory Index

**Location**: `D:\VarnaAI\Websites\apps\`
**Last Updated**: 2025-12-26
**Total Applications**: 10

---

## Quick Reference

| App | Type | Port | Status | Description |
|-----|------|------|--------|-------------|
| [pension](#1-pension-retirementai) | Next.js 16 | 3001 | Active | AI retirement planning platform |
| [varnaai-c3](#2-varnaai-c3-compliance) | React 18 + Express | 3002/8001 | Active | GDPR compliance scanner |
| [varnaai-fwchange](#3-varnaai-fwchange) | React 18 + FastAPI | 3003/8002 | Active | Firewall change management |
| [varnaai-seo](#4-varnaai-seo) | React 18 + Express | 3004/4000 | Active | SEO automation agent |
| [varnaai-pm](#5-varnaai-pm) | React 19 + Express | 5173/3005 | Active | Project management |
| [varnaai-master](#6-varnaai-master) | Next.js 16 + NestJS | 3007/8004 | Active | Microservices platform |
| [varnaai-agenticcoder](#7-varnaai-agenticcoder) | React 18 + FastAPI | 3008 | MVP | AI coding assistant |
| [varnaai-pension](#8-varnaai-pension) | Next.js | 3001 | Active | Legacy pension folder |
| [varnaai-tax](#9-varnaai-tax) | Unknown | 3009/8005 | Dev | Tax application |
| [LibreChat](#10-librechat) | React 18 + Express 5 | ENV | External | Self-hosted chat |

---

## Application Details

### 1. pension (RetirementAI)

**Path**: `apps/varnaai-pension/`
**Docker**: `docker-compose.yml`
**Grade**: A - Production Ready

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | Next.js 16 | 3001 |
| Database | PostgreSQL | 5433 |
| Cache | Redis | 6380 |
| Network | 172.20.0.0/16 | - |

**Key Features**:
- Trading212 API integration
- AI financial advisor (GPT-4)
- Portfolio optimization
- Monte Carlo simulations

---

### 2. varnaai-c3 (Compliance)

**Path**: `apps/varnaai-c3/`
**Docker**: `docker-compose.yml`
**Grade**: A - Production Ready

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 18 | 3002 |
| Backend | Express | 8001 |
| Database | PostgreSQL + pgvector | 5434 |
| Cache | Redis | 6381 |
| Network | 172.21.0.0/16 | - |

**Key Features**:
- 60-second GDPR scans
- German documentation
- AI-powered compliance analysis
- Automated reporting

---

### 3. varnaai-fwchange

**Path**: `apps/varnaai-fwchange/`
**Docker**: `docker-compose.yml`
**Grade**: A- - Production Ready

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 18 | 3003 |
| Backend | FastAPI | 8002 |
| Database | PostgreSQL | 5435 |
| Cache | Redis | 6382 |
| Jira | Atlassian Jira | 8080 |
| Network | 172.22.0.0/16 | - |

**Key Features**:
- Multi-vendor firewall support (Palo Alto, Fortinet, Checkpoint)
- JIRA integration
- PCI-DSS compliance tracking
- Change automation

---

### 4. varnaai-seo

**Path**: `apps/varnaai-seo/`
**Docker**: `docker-compose.yml`
**Grade**: A - Production Ready

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 18 | 3004 |
| Backend | Express | 4000 |
| Database | PostgreSQL | 5436 |
| Cache | Redis | 6383 |
| pgAdmin | pgAdmin 4 | 5050 |
| Ollama | Local LLM | 11435 |
| Network | 172.26.0.0/16 | - |

**Key Features**:
- Automated SEO audits
- Keyword research
- Content optimization
- Local AI processing

---

### 5. varnaai-pm

**Path**: `apps/varnaai-pm/`
**Docker**: `docker-compose.yml`
**Grade**: C+ - Development

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 19 | 5173 |
| Backend | Express | 3005 |
| Database | PostgreSQL | 5438 |
| Network | bridge | - |

**Key Features**:
- Project tracking
- Task management
- Team collaboration

**Issues**: Hardcoded credentials, needs resource limits

---

### 6. varnaai-master

**Path**: `apps/varnaai-master/`
**Docker**: `docker-compose.yml`
**Grade**: B+ - Near Production

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | Next.js 16 | 3007 |
| Backend | NestJS | 8004 |
| Database | PostgreSQL | 5437 |
| Cache | Redis | 6384 |
| Graph DB | Neo4j | 7475/7688 |
| Vector DB | Qdrant | 6335/6336 |
| Network | 172.25.0.0/16 | - |

**Key Features**:
- Multi-agent orchestration
- Knowledge graphs
- Vector embeddings
- Enterprise integrations

---

### 7. varnaai-agenticcoder

**Path**: `apps/varnaai-agenticcoder/agenticcoder/`
**Docker**: `docker-compose.yml`
**Grade**: B - Development/Monitoring

| Component | Technology | Port |
|-----------|------------|------|
| Grafana | Monitoring UI | 3008 |
| Prometheus | Metrics | 9090 |
| Adminer | DB Admin | 8082 |
| Redis Commander | Cache Admin | 8081 |
| Jaeger | Tracing | 16686 |
| Network | 172.28.0.0/16 | - |

**Key Features**:
- AI coding assistant
- Monitoring infrastructure
- Observability stack

**Issues**: MVP level, needs CRA to Vite migration

---

### 8. varnaai-pension

**Path**: `apps/varnaai-pension/`
**Status**: Legacy folder reference

This is the reorganized pension application folder. See pension entry above.

---

### 9. varnaai-tax

**Path**: `apps/varnaai-tax/`
**Docker**: `docker-compose.yml`
**Grade**: D - Development Only

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | Unknown | 3009 |
| Backend | Unknown | 8005 |
| Database | PostgreSQL | 5440 |
| Cache | Redis | 6386 |
| Ollama | Local LLM (GPU) | 11436 |
| Network | 172.29.0.0/16 | - |

**Status**: Needs full audit

---

### 10. LibreChat

**Path**: `apps/LibreChat/`
**Docker**: `docker-compose.yml`
**Grade**: C - External Project

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 18 | ENV variable |
| Backend | Express 5 | - |
| Search | MeiliSearch | 7700 |
| Network | bridge | - |

**Note**: External open-source project, not maintained by VarnaAI

---

## Additional Directories

### ai-lab
**Path**: `apps/ai-lab/`
**Purpose**: AI experimentation workspace

### varnaai-outreach
**Path**: `apps/varnaai-outreach/`
**Purpose**: Outreach automation (in development)

---

## Documentation Files

| File | Description |
|------|-------------|
| `APPS_INVENTORY_2025-12-26.md` | Complete apps inventory with grades |
| `FRONTEND_AUDIT_REPORT_2025-12-26.md` | Frontend technology audit |
| `BACKEND_AUDIT_REPORT_2025-12-26.md` | Backend technology audit |
| `DOCKER_AUDIT_REPORT_2025-12-26.md` | Docker infrastructure audit |
| `DOCKER_MIGRATION_GUIDE.md` | Docker port migration guide |
| `COMPLETE_INVENTORY_2025-12-26.md` | Full technical inventory |
| `DOCKER_AUDIT_PROMPT.md` | Audit prompt template |

---

## Port Allocation Summary

| Range | Purpose |
|-------|---------|
| 3001-3009 | Frontend applications |
| 4000-4999 | SEOAgent backend |
| 5173 | ProjectManager (Vite default) |
| 5433-5440 | PostgreSQL instances |
| 6380-6386 | Redis instances |
| 8001-8005 | Backend APIs |
| 8080-8082 | Admin tools |
| 9090 | Prometheus |
| 16686 | Jaeger |

---

## Quick Start

```bash
# Start any app
cd D:\VarnaAI\Websites\apps\varnaai-[appname]
docker-compose up -d

# Check running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# View logs
docker-compose logs -f [service-name]
```

---

## Cross-References

- **Main CLAUDE.md**: `D:\VarnaAI\Websites\CLAUDE.md`
- **Operations**: `D:\VarnaAI\Websites\operations\INDEX.md`
- **Design Files**: `D:\VarnaAI\Websites\design\INDEX.md`

---

*Generated: 2025-12-26*
