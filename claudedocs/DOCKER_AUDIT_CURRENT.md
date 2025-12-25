# VarnaAI Docker Architecture Audit

**Date**: 2025-12-25 23:55 ICT
**Auditor**: Claude Code
**Host**: Windows 11 | 64GB RAM | RTX 5070 8GB

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Total Containers** | 25 | - |
| **Running** | 1 | Ollama only |
| **Stopped** | 24 | All apps stopped |
| **Total Images** | 24 | - |
| **Disk Usage** | 54.13 GB | Cleaned from 71GB |
| **Reclaimable** | 47.22 GB (87%) | Available |
| **Volumes** | 33 | - |
| **Networks** | 9 | Isolated |
| **Build Cache** | 20.47 GB | 20.15 GB reclaimable |

---

## Container Status

### Running (1)

| Container | Status | Ports |
|-----------|--------|-------|
| **ollama** | Up 1 hour | 0.0.0.0:11434->11434/tcp |

### Stopped by App (24)

| App | Containers | Exit | Last Active |
|-----|------------|------|-------------|
| **Pension** | pension-app, pension-postgres, pension-redis | 0 | 5h ago |
| **C3** | c3-api, c3-frontend, c3-postgres, c3-redis | 0 | 5h ago |
| **FwChange** | frontend, backend, postgres, redis | 0/137 | 32m ago |
| **FwChange Jira** | jira, jira-postgres | 143/1 | 5h ago |
| **VarnaAI** | postgres, redis, qdrant, neo4j | 0/137/143 | 22m ago |
| **WebScrap** | postgres, redis, selenium-hub, selenium-chrome | 0/137 | 41m ago |
| **Twenty CRM** | twenty-crm, redis, postgres | 0/137 | 3h ago |

---

## Networks (9)

| Network | App |
|---------|-----|
| pension-network | Pension |
| c3_c3-network | C3 |
| fwchange_fwchange-network | FwChange |
| varnaai_varnaai-network | VarnaAI |
| webscrap_webscrap-network | WebScrap |
| crm_crm_net | Twenty CRM |

---

## Port Allocation

| App | Frontend | Backend | PostgreSQL | Redis | Other |
|-----|----------|---------|------------|-------|-------|
| **Pension** | 3001 | - | 5433 | 6380 | - |
| **C3** | 3002 | 8001 | 5434 | 6381 | - |
| **FwChange** | 3003 | 8002 | 5435 | 6382 | Jira:8080 |
| **Ollama** | - | - | - | - | 11434 |

---

## Image Sizes

### Large (>1GB)

| Image | Size | Notes |
|-------|------|-------|
| fwchange-fwchange-backend | **13.3 GB** | BLOATED |
| ollama/ollama | 6.14 GB | OK (models) |
| librechat-dev | 2.75 GB | OK |
| librechat-rag-api | 2.35 GB | OK |
| twentycrm/twenty | 2.13 GB | OK |
| selenium/node-chrome | 2.08 GB | OLD (2023) |
| atlassian/jira-software | 1.91 GB | OK |
| c3-api | 1.62 GB | OK |

### Normal (<1GB)

| Image | Size |
|-------|------|
| pension-app | 373 MB |
| fwchange-frontend | 90 MB |
| c3-frontend | 84 MB |
| redis:7-alpine | 61 MB |

---

## Disk Usage

| Type | Total | Reclaimable |
|------|-------|-------------|
| Images | 54.13 GB | 47.22 GB (87%) |
| Containers | 299.3 MB | 241.3 MB (80%) |
| Volumes | 29.51 GB | 821.6 MB (2%) |
| Build Cache | 20.47 GB | 20.15 GB (98%) |
| **TOTAL** | ~104 GB | **~68 GB** |

---

## Issues

### FwChange Backend Bloat
- **Size**: 13.3 GB (should be ~1-2 GB)
- **Cause**: ML/AI dependencies, unoptimized layers
- **Fix**: Multi-stage build, Alpine base

### Duplicate FwChange Volumes
- Old: fwchange_* (4 volumes)
- New: fwchange_fwchange_* (4 volumes)
- **Fix**: Migrate data, remove old

### Dangling Volumes
- 5 anonymous volumes with hash names
- **Fix**: docker volume prune

---

## Quick Commands

```bash
# Start apps
cd D:\VarnaAI\Websites\apps\pension && docker-compose up -d
cd D:\VarnaAI\Websites\apps\dashboard && docker-compose up -d
cd D:\VarnaAI\Websites\apps\fwchange && docker-compose up -d

# Cleanup (saves ~68 GB)
docker builder prune      # 20 GB
docker image prune -a     # 47 GB
docker volume prune       # 800 MB

# Status
docker ps -a --format "table {{.Names}}\t{{.Status}}"
docker system df
```

---

*Report: Claude Code - 2025-12-25 23:55 ICT*
