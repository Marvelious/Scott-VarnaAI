# VarnaAI Docker Architecture Audit

**Date**: 2025-12-25
**Auditor**: Claude Code
**Host**: Windows 11 | 64GB RAM | RTX 5070 8GB

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Total Containers** | 22 | - |
| **Running** | 5 | LibreChat only |
| **Stopped** | 17 | All VarnaAI apps |
| **Total Images** | 24 | - |
| **Disk Usage** | 71.18 GB | 🔴 HIGH |
| **Reclaimable Space** | 56.93 GB (79%) | ⚠️ ACTION NEEDED |
| **Total Volumes** | 25 | - |
| **Networks** | 8 | Properly isolated |

---

## Critical Issues

### 🔴 Issue 1: LibreChat API Healthcheck Failing

**Container**: `librechat-api`
**Status**: `unhealthy` (107 consecutive failures)
**Root Cause**: Healthcheck uses `curl` but image doesn't have `curl` installed

```
exec: "curl": executable file not found in $PATH
```

**Fix Required** in `docker-compose.override.yml`:
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3080/api/health"]
  # OR use node:
  # test: ["CMD", "node", "-e", "require('http').get('http://localhost:3080/api/health')"]
```

### 🔴 Issue 2: LibreChat RAG API Unhealthy

**Container**: `librechat-rag-api`
**Status**: `unhealthy`
**Root Cause**: Same `curl` issue - image doesn't include curl

### 🟡 Issue 3: Ollama Not Running

**Container**: `ollama`
**Status**: Exited (0) 3 hours ago
**Impact**: LibreChat's local LLM endpoint unavailable
**Fix**: `docker start ollama`

### 🟡 Issue 4: Excessive Disk Usage

**Total**: 71.18 GB used
**Reclaimable**: 56.93 GB (79%)

**Breakdown**:
| Type | Size | Reclaimable |
|------|------|-------------|
| Images | 71.18 GB | 56.93 GB (79%) |
| Containers | 362.3 MB | 116.1 MB |
| Volumes | 18.18 GB | 542.6 MB |
| Build Cache | 26.24 GB | 11.54 GB |

**Recommended Cleanup**:
```bash
# Remove unused images
docker image prune -a

# Remove build cache
docker builder prune

# Remove dangling volumes
docker volume prune
```

### 🟡 Issue 5: Bloated FwChange Backend Image

**Image**: `fwchange-fwchange-backend`
**Size**: 14.4 GB (!)
**Problem**: This is 10x larger than typical Python FastAPI images

**Likely Causes**:
- Node.js dev dependencies included
- Multiple build layers not optimized
- Conda/ML libraries bundled unnecessarily

---

## Architecture Overview

### Network Isolation ✅ CORRECT

| App | Subnet | Status |
|-----|--------|--------|
| **Pension** | 172.20.0.0/16 | ✅ Isolated |
| **C3** | 172.21.0.0/16 | ✅ Isolated |
| **FwChange** | 172.22.0.0/16 | ✅ Isolated |
| **LibreChat** | librechat_default | ✅ Isolated |
| **Twenty CRM** | crm_crm_net | ✅ Isolated |

### Port Allocation ✅ NO CONFLICTS

| App | Frontend | Backend | PostgreSQL | Redis |
|-----|----------|---------|------------|-------|
| **Pension** | 3001 | - | 5433 | 6380 |
| **C3** | 3002 | 8001 | 5434 | 6381 |
| **FwChange** | 3003 | 8002 | 5435 | 6382 |
| **LibreChat** | 3080 | - | (internal) | - |
| **Twenty CRM** | - | - | (internal) | (internal) |
| **Jira** | 8080 | - | - | - |

### Container Naming ✅ CORRECT

All containers follow prefix convention:
- `pension-*` (3 containers)
- `c3-*` (4 containers)
- `fwchange-*` (6 containers)
- `librechat-*` (5 containers)
- `twenty-*` (3 containers)
- `ollama` (1 container)

---

## Application Status

### LibreChat (RUNNING)

| Container | Status | Memory | CPU |
|-----------|--------|--------|-----|
| librechat-api | unhealthy | 278.6 MB / 2 GB | 0.57% |
| librechat-rag-api | unhealthy | 108.7 MB / 1 GB | 0.31% |
| librechat-mongodb | healthy | 120.4 MB / 1 GB | 1.12% |
| librechat-vectordb | healthy | 34.5 MB / 1 GB | 0.01% |
| librechat-meilisearch | healthy | 18.4 MB / 512 MB | 0.52% |

**MCP Bridge**: ✅ Running on ports 3100-3104 + health at 3099

### Pension App (STOPPED)

| Container | Image | Last Exit |
|-----------|-------|-----------|
| pension-app | pension-app | 2 hours ago (0) |
| pension-postgres | ankane/pgvector | 2 hours ago (0) |
| pension-redis | redis:7-alpine | 2 hours ago (0) |

### C3 Compliance (STOPPED)

| Container | Image | Last Exit |
|-----------|-------|-----------|
| c3-api | c3-api | 2 hours ago (0) |
| c3-frontend | c3-frontend | 2 hours ago (0) |
| c3-postgres | pgvector/pgvector:pg15 | 2 hours ago (0) |
| c3-redis | redis:7-alpine | 2 hours ago (0) |

### FwChange (STOPPED)

| Container | Image | Last Exit |
|-----------|-------|-----------|
| fwchange-backend | fwchange-fwchange-backend | 2 hours ago (137) |
| fwchange-frontend | fwchange-fwchange-frontend | 2 hours ago (137) |
| fwchange-postgres | postgres:15-alpine | 2 hours ago (0) |
| fwchange-redis | redis:7-alpine | 2 hours ago (0) |
| fwchange-jira | atlassian/jira-software | 2 hours ago (143) |
| fwchange-jira-postgres | postgres:16-alpine | 2 hours ago (1) ⚠️ |

### Twenty CRM (STOPPED)

| Container | Image | Last Exit |
|-----------|-------|-----------|
| twenty-crm | twentycrm/twenty | 11 min ago (137) |
| twenty-postgres | postgres:15 | 11 min ago (0) |
| twenty-redis | redis:7 | 11 min ago (0) |

### Ollama (STOPPED)

| Container | Image | Last Exit |
|-----------|-------|-----------|
| ollama | ollama/ollama | 3 hours ago (0) |

---

## Image Analysis

### Largest Images (Action Recommended)

| Image | Size | Recommendation |
|-------|------|----------------|
| fwchange-fwchange-backend | 14.4 GB | 🔴 REBUILD - way too big |
| fwchange-backend | 14.4 GB | 🔴 Remove duplicate |
| ollama/ollama | 6.14 GB | OK - contains models |
| ghcr.io/danny-avila/librechat-dev | 2.75 GB | OK |
| ghcr.io/danny-avila/librechat-rag-api-dev-lite | 2.35 GB | OK |
| twentycrm/twenty | 2.13 GB | OK |
| atlassian/jira-software | 1.91 GB | OK |
| c3-api | 1.62 GB | Review - could be smaller |

### Duplicate/Stale Images

```bash
# These appear to be build duplicates:
fwchange-fwchange-backend   14.4GB (5 hours old)
fwchange-backend            14.4GB (47 hours old)

fwchange-fwchange-frontend  89.9MB (33 hours old)
fwchange-frontend           89.9MB (4 days old)
```

---

## Configuration Quality

### Pension App ✅ GOOD
- Proper healthchecks
- Correct network isolation
- Fixed IPs assigned
- `restart: "no"` (test lab appropriate)

### C3 Compliance ✅ GOOD
- Resource limits defined
- Security secrets required (no defaults)
- Proper healthchecks
- Timezone configured

### FwChange ✅ GOOD
- Resource limits defined
- Redis password required
- Jira integration configured
- Proper healthchecks

### LibreChat ⚠️ NEEDS FIX
- Resource limits defined ✅
- MongoDB auth enabled ✅
- **Healthcheck broken** (curl not in image)
- MCP Bridge requires separate start

---

## Recommended Actions

### Immediate (Today)

1. **Fix LibreChat healthchecks** - change `curl` to `wget` or `node`
2. **Start Ollama** - `docker start ollama`
3. **Clean build cache** - save 11.54 GB

### Short Term (This Week)

4. **Rebuild FwChange backend** - reduce from 14.4 GB to ~1-2 GB
5. **Remove duplicate images** - save ~15 GB
6. **Prune unused images** - save up to 57 GB

### Long Term

7. **Add MCP Bridge to docker-compose** - auto-start with LibreChat
8. **Create startup script** - one command to start all services
9. **Add monitoring** - container health dashboard

---

## Quick Commands

```bash
# Start Ollama
docker start ollama

# Fix LibreChat (restart after config fix)
cd D:\VarnaAI\LibreChat
docker-compose down && docker-compose up -d

# Clean up disk space
docker system prune -a --volumes  # CAREFUL: removes all stopped containers!

# Safe cleanup (keeps volumes)
docker image prune -a
docker builder prune

# Start MCP Bridge (separate terminal)
cd D:\VarnaAI\LibreChat\mcp-bridge
node server.js

# Check all container health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

---

## Appendix: Volume Inventory

| Volume | Purpose |
|--------|---------|
| pension_postgres_data | Pension DB |
| pension_redis_data | Pension cache |
| c3_c3_postgres_data | C3 DB |
| c3_c3_redis_data | C3 cache |
| c3_c3_api_logs | C3 API logs |
| c3_c3_api_uploads | C3 uploads |
| fwchange_fwchange_postgres_data | FwChange DB |
| fwchange_fwchange_redis_data | FwChange cache |
| fwchange_fwchange_jira_data | Jira data |
| fwchange_fwchange_jira_postgres_data | Jira DB |
| librechat_mongodb_data | LibreChat DB |
| librechat_pgdata2 | LibreChat vector DB |
| librechat_ollama_data | Ollama models |
| crm_twenty_data | Twenty CRM data |
| crm_twenty_pg | Twenty CRM DB |
| ollama_data | Ollama models (separate) |

---

*Report generated by Claude Code - 2025-12-25 14:10 UTC*
