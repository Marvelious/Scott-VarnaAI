# VarnaAI Docker Infrastructure Audit Report

**Date**: 2025-12-26
**Auditor**: Claude AI
**Scope**: All Docker applications in `D:\VarnaAI\Websites\apps\`

---

## Executive Summary

**Total Apps**: 11 applications + 2 standalone services
**Running Containers**: 14 containers active
**Critical Issues**: ~~2~~ → **0 RESOLVED** ✅
**Warnings**: ~~5~~ → **3 remaining** (documentation updated)

---

## Container Status (Current)

### Running Containers
| Container | Status | Ports |
|-----------|--------|-------|
| agenticcoder-grafana | Up | 3008→3000 |
| agenticcoder-adminer | Up | 8082→8080 |
| agenticcoder-redis-commander | Up | 8081→8081 |
| agenticcoder-jaeger | Up | 14268, 16686 |
| agenticcoder-qdrant | Up | 6333-6334 (internal) |
| seoagent-frontend | Up (healthy) | 3004→80 |
| seoagent-pgadmin | Up | 5050→80 |
| seoagent-backend | Up (healthy) | 4000→4000 |
| seoagent-redis | Up (healthy) | 6383→6379 |
| seoagent-postgres | Up (healthy) | 5436→5432 |

### Exited Containers (Healthy - Manual Start)
| Container | Exit Reason |
|-----------|-------------|
| pension-app, pension-postgres, pension-redis | Manual start only |
| c3-frontend, c3-api, c3-postgres, c3-redis | Manual start only |
| fwchange-frontend, fwchange-backend, fwchange-postgres, fwchange-redis | Manual start only |
| varnaai-postgres, varnaai-redis, varnaai-qdrant, varnaai-neo4j | Manual start only |
| webscrap-postgres, webscrap-redis, webscrap-selenium-* | Manual start only |
| librechat-api, librechat-mongodb, librechat-meilisearch | Manual start only |
| projectmanager-app, projectmanager-postgres | Manual start only |
| twenty-crm, twenty-redis, twenty-postgres | Manual start only |
| ollama | Manual start only |

### Failed Containers
| Container | Issue |
|-----------|-------|
| agenticcoder-postgres | Exited (1) - Check environment variables |
| agenticcoder-prometheus | Exited (2) - Missing prometheus.yml |
| agenticcoder-redis | Exited (1) - Check REDIS_PASSWORD env |
| agenticcoder-mongodb | Exited (1) - Check MONGODB_PASSWORD env |
| seoagent-worker | Exited (255) - Worker dependency issue |
| varnaai-neo4j | Exited (1) - Check NEO4J_PASSWORD env |

---

## Port Allocation Map (Corrected)

### Definitive Port Assignments

| App | Frontend | Backend | PostgreSQL | Redis | Special | Subnet |
|-----|----------|---------|------------|-------|---------|--------|
| **Pension** | 3001 | - | 5433 | 6380 | - | 172.20.0.0/16 |
| **C3** | 3002 | 8001 | 5434 | 6381 | - | 172.21.0.0/16 |
| **FwChange** | 3003 | 8002 | 5435 | 6382 | Jira:8080 | 172.22.0.0/16 |
| **SEOAgent** | 3004 | 4000 | 5436 | 6383 | pgAdmin:5050 | 172.26.0.0/16 |
| **Webscrap** | 3006 | 8003 | 5439 | 6385 | Selenium:4444 | 172.23.0.0/16 |
| **VarnaAI** | 3007 | 8004 | 5437 | 6384 | Neo4j:7475, Qdrant:6335 | 172.25.0.0/16 |
| **ProjectManager** | 3005 | - | 5438 | - | - | (dynamic) |
| **AgenticCoder** | 3008* | - | (internal) | (internal) | Grafana:3008 | 172.28.0.0/16 |
| **TaxApp** | 3009 | 8005 | 5440 | 6386 | Ollama:11436 | 172.29.0.0/16 ✅ |
| **LibreChat** | ${PORT} | - | - | - | MongoDB, Meili | (dynamic) |
| **Twenty CRM** | - | - | - | - | External | (external) |

*AgenticCoder uses Grafana on 3008 as primary UI

---

## Critical Issues

### ✅ Issue #1: TaxApp Port Conflicts - **RESOLVED**

**Severity**: ~~CRITICAL~~ → RESOLVED (2025-12-26)
**Impact**: ~~Cannot run TaxApp and SEOAgent/Webscrap simultaneously~~ → Fixed

**Resolution Applied**:
- Updated `apps/taxapp/docker-compose.yml` with new ports:
  - Frontend: 3004 → **3009**
  - Backend: 8003 → **8005**
  - PostgreSQL: 5436 → **5440**
  - Redis: 6383 → **6386**
  - Subnet: 172.23.0.0/16 → **172.29.0.0/16**
- Added fixed IP addresses for all containers
- Added Ollama on port **11436**

### ✅ Issue #2: Port 8080 Conflict - **RESOLVED**

**Severity**: ~~HIGH~~ → RESOLVED (2025-12-26)
**Impact**: ~~Cannot run FwChange Jira and AgenticCoder Adminer simultaneously~~ → Fixed

**Resolution Applied**:
- Changed AgenticCoder Adminer from port 8080 to **8082**
- Updated `apps/agenticcoder/agenticcoder/docker-compose.yml`

---

## Warnings

### 🟡 Warning #1: LibreChat Naming Convention

**Issue**: Uses `LibreChat`, `chat-mongodb`, `chat-meilisearch` instead of `librechat-*`
**Impact**: Inconsistent with VarnaAI container naming pattern
**Recommendation**: Accept as-is (external project)

### ✅ Warning #2: Documentation Inconsistencies - **RESOLVED**

**Issue**: ~~DOCKER_MIGRATION_GUIDE.md shows outdated ports~~ → Fixed
**Files Updated** (2025-12-26):
- ✅ `DOCKER_MIGRATION_GUIDE.md`: Updated port allocation table with correct values
- ✅ `seoagent/CLAUDE.md`: Fixed subnet from 172.23.0.0/16 → 172.26.0.0/16

### 🟡 Warning #3: Missing .env Files

**Issue**: Several apps have failing containers due to missing environment variables
**Affected**: AgenticCoder (postgres, redis, mongodb), SEOAgent (worker), VarnaAI (neo4j)
**Recommendation**: Create `.env` files from `.env.example` templates

### 🟡 Warning #4: ProjectManager No Fixed Subnet

**Issue**: ProjectManager uses dynamic networking
**Impact**: Could conflict with other apps if Docker assigns overlapping subnet
**Recommendation**: Add fixed subnet 172.27.0.0/16

### 🟡 Warning #5: Inconsistent Restart Policies

**Issue**: Some apps use `restart: "no"`, others use `restart: always`
**Pattern**:
- Test lab apps: `restart: "no"` (correct for dev)
- LibreChat: `restart: always` (production-oriented)
**Recommendation**: Standardize based on environment

---

## Network Topology

```
VarnaAI Docker Networks
========================

172.20.0.0/16 - pension-network
├── 172.20.0.10  pension-postgres
├── 172.20.0.11  pension-redis
└── 172.20.0.12  pension-app

172.21.0.0/16 - c3-network
├── 172.21.0.10  c3-postgres
├── 172.21.0.11  c3-redis
├── 172.21.0.12  c3-api
└── 172.21.0.13  c3-frontend

172.22.0.0/16 - fwchange-network
├── 172.22.0.10  fwchange-postgres
├── 172.22.0.11  fwchange-redis
├── 172.22.0.12  fwchange-backend
├── 172.22.0.13  fwchange-frontend
├── 172.22.0.20  fwchange-jira-postgres
└── 172.22.0.21  fwchange-jira

172.23.0.0/16 - webscrap-network
├── 172.23.0.10  webscrap-postgres
├── 172.23.0.11  webscrap-redis
├── 172.23.0.12  webscrap-backend
├── 172.23.0.13  webscrap-frontend
├── 172.23.0.20  webscrap-selenium-hub
└── 172.23.0.21  webscrap-selenium-chrome

172.25.0.0/16 - varnaai-network
├── 172.25.0.10  varnaai-postgres
├── 172.25.0.11  varnaai-redis
├── 172.25.0.12  varnaai-neo4j
├── 172.25.0.13  varnaai-qdrant
├── 172.25.0.20  varnaai-backend
├── 172.25.0.21  varnaai-frontend
├── 172.25.0.30  varnaai-orchestrator
├── 172.25.0.31  varnaai-llm-gateway
├── 172.25.0.32  varnaai-rag
└── 172.25.0.33  varnaai-memory

172.26.0.0/16 - seoagent-network
├── 172.26.0.10  seoagent-postgres
├── 172.26.0.11  seoagent-redis
├── 172.26.0.12  seoagent-backend
├── 172.26.0.13  seoagent-frontend
├── 172.26.0.14  seoagent-worker
├── 172.26.0.15  seoagent-pgadmin
└── 172.26.0.20  seoagent-ollama (GPU profile)

172.28.0.0/16 - agenticcoder-network
├── agenticcoder-qdrant
├── agenticcoder-mongodb
├── agenticcoder-redis
├── agenticcoder-postgres
├── agenticcoder-adminer (8082)
├── agenticcoder-redis-commander
├── agenticcoder-prometheus
├── agenticcoder-grafana
└── agenticcoder-jaeger

172.29.0.0/16 - taxapp-network ✅ NEW
├── 172.29.0.10  taxapp-postgres
├── 172.29.0.11  taxapp-redis
├── 172.29.0.12  taxapp-backend
├── 172.29.0.13  taxapp-frontend
└── 172.29.0.20  taxapp-ollama

(dynamic) - projectmanager_default
├── projectmanager-postgres
└── projectmanager-app

(dynamic) - librechat_default
├── LibreChat (api)
├── chat-mongodb
├── chat-meilisearch
├── vectordb
└── rag_api

(external) - crm_crm_net
├── twenty-crm
├── twenty-redis
└── twenty-postgres
```

---

## Reserved Port Ranges

| Range | Purpose | Assigned To |
|-------|---------|-------------|
| 3001-3009 | Frontend Apps | Pension, C3, FwChange, SEOAgent, ProjectManager, Webscrap, VarnaAI, AgenticCoder, **TaxApp (3009)** |
| 4000-4999 | Node.js APIs | SEOAgent (4000) |
| 5050 | pgAdmin | SEOAgent |
| 5433-5440 | PostgreSQL | All apps including **TaxApp (5440)** |
| 6333-6336 | Qdrant | VarnaAI, AgenticCoder |
| 6379-6386 | Redis | All apps including **TaxApp (6386)** |
| 7474-7688 | Neo4j | VarnaAI |
| 8001-8005 | Python APIs | C3, FwChange, Webscrap, VarnaAI, **TaxApp (8005)** |
| 8080-8082 | Admin UIs | Jira (8080), Adminer **(8082)** |
| 9090 | Prometheus | AgenticCoder |
| 11434-11436 | Ollama | Global, SEOAgent, **TaxApp (11436)** |
| 14268, 16686 | Jaeger | AgenticCoder |

---

## Recommended Actions

### Immediate (Priority 1) - ✅ COMPLETED
1. ✅ Fix TaxApp port conflicts → **DONE** (2025-12-26)
2. ✅ Change AgenticCoder Adminer to port 8082 → **DONE** (2025-12-26)

### Short-term (Priority 2) - PARTIAL
3. ☐ Create `.env` files for apps with missing environment variables
4. ✅ Update DOCKER_MIGRATION_GUIDE.md with correct ports → **DONE** (2025-12-26)
5. ✅ Fix seoagent/CLAUDE.md subnet reference (172.23 → 172.26) → **DONE** (2025-12-26)

### Long-term (Priority 3)
6. ☐ Add fixed subnet to ProjectManager (172.27.0.0/16)
7. ☐ Standardize restart policies across all apps
8. ☐ Consider consolidating LibreChat into VarnaAI naming convention

---

## App-by-App Configuration Summary

### 1. Pension (RetirementAI)
- **Status**: ✅ Properly configured
- **Compose**: `apps/pension/docker-compose.yml`
- **Services**: app, postgres, redis
- **Notes**: Uses pgvector for embeddings

### 2. C3 (Compliance Command Center)
- **Status**: ✅ Properly configured
- **Compose**: `apps/dashboard/docker-compose.yml`
- **Services**: frontend, api, postgres, redis
- **Notes**: Uses pgvector for embeddings, resource limits defined

### 3. FwChange
- **Status**: ✅ Properly configured
- **Compose**: `apps/fwchange/docker-compose.yml`
- **Services**: frontend, backend, postgres, redis, jira, jira-postgres
- **Notes**: Includes Jira integration for ticketing

### 4. SEOAgent
- **Status**: ✅ Properly configured
- **Compose**: `apps/seoagent/docker-compose.yml`
- **Services**: frontend, backend, worker, postgres, redis, pgadmin, ollama (GPU)
- **Notes**: Worker service currently failing, optional Ollama with GPU

### 5. Webscrap
- **Status**: ✅ Properly configured
- **Compose**: `apps/webscrap/docker-compose.yml`
- **Services**: frontend, backend, postgres, redis, selenium-hub, selenium-chrome
- **Notes**: Selenium grid for browser automation

### 6. VarnaAI
- **Status**: ⚠️ Neo4j failing (missing password)
- **Compose**: `apps/varnaai/docker-compose.yml`
- **Services**: frontend, backend, postgres, redis, neo4j, qdrant, + 4 microservices
- **Notes**: Most complex setup with microservices architecture

### 7. ProjectManager
- **Status**: ⚠️ No fixed subnet
- **Compose**: `apps/projectmanager/docker-compose.yml`
- **Services**: app, postgres
- **Notes**: Simpler compose, missing IPAM config

### 8. TaxApp
- **Status**: ✅ Properly configured (fixed 2025-12-26)
- **Compose**: `apps/taxapp/docker-compose.yml`
- **Services**: frontend (3009), backend (8005), postgres (5440), redis (6386), ollama (11436)
- **Subnet**: 172.29.0.0/16
- **Notes**: Port conflicts resolved, fixed IP addresses assigned

### 9. LibreChat
- **Status**: ⚠️ Non-standard naming
- **Compose**: `apps/LibreChat/docker-compose.yml`
- **Services**: api, mongodb, meilisearch, vectordb, rag_api
- **Notes**: External project, accept naming convention

### 10. AgenticCoder
- **Status**: ⚠️ Missing env vars (port conflict fixed 2025-12-26)
- **Compose**: `apps/agenticcoder/agenticcoder/docker-compose.yml`
- **Services**: qdrant, mongodb, redis, postgres, adminer (8082), redis-commander (8081), prometheus, grafana (3008), jaeger
- **Notes**: Full monitoring stack, infrastructure-only (no app containers), Adminer moved to 8082

---

## Appendix: Quick Commands

```bash
# Check all VarnaAI containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Start specific app
cd D:\VarnaAI\Websites\apps\<app-name>
docker-compose up -d

# View logs
docker-compose logs -f <service-name>

# Check network conflicts
docker network ls
docker network inspect <network-name>

# Find port usage
netstat -ano | findstr ":<port>"
```

---

**Report Generated**: 2025-12-26T11:30:00Z
**Next Audit Due**: 2026-01-26
