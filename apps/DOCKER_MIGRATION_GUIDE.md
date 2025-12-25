# VarnaAI Docker Migration Guide

**Created**: 2025-12-25
**Purpose**: Migrate Webscrap and VarnaAI to isolated Docker containers

---

## Port Allocation (VarnaAI 5-App Architecture)

| App | Frontend | Backend | PostgreSQL | Redis | Neo4j | Qdrant | Subnet |
|-----|----------|---------|------------|-------|-------|--------|--------|
| **Pension** | 3001 | - | 5433 | 6380 | - | - | 172.20.0.0/16 |
| **C3** | 3002 | 8001 | 5434 | 6381 | - | - | 172.21.0.0/16 |
| **FwChange** | 3003 | 8002 | 5435 | 6382 | - | - | 172.22.0.0/16 |
| **Webscrap** | 3004 | 8003 | 5436 | 6383 | - | - | 172.23.0.0/16 |
| **VarnaAI** | 3005 | 8004 | 5437 | 6384 | 7475 | 6335 | 172.25.0.0/16 |

---

## Container Naming Convention

| App | Prefix | Example Containers |
|-----|--------|-------------------|
| Pension | `pension-*` | pension-app, pension-postgres, pension-redis |
| C3 | `c3-*` | c3-frontend, c3-api, c3-postgres, c3-redis |
| FwChange | `fwchange-*` | fwchange-frontend, fwchange-backend, fwchange-postgres |
| Webscrap | `webscrap-*` | webscrap-frontend, webscrap-backend, webscrap-postgres |
| VarnaAI | `varnaai-*` | varnaai-frontend, varnaai-backend, varnaai-postgres |

---

## Setup Instructions

### Step 1: Copy Dockerfiles to Source Directories

**For Webscrap** (`D:\VarnaAI\Webscrap`):
```powershell
# Copy from templates
copy "D:\VarnaAI\Websites\apps\webscrap\Dockerfile.backend" "D:\VarnaAI\Webscrap\Dockerfile"
copy "D:\VarnaAI\Websites\apps\webscrap\Dockerfile.frontend" "D:\VarnaAI\Webscrap\Dockerfile.frontend"
```

**For VarnaAI** (`D:\VarnaAI\varnaai`):
```powershell
# Backend
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.backend" "D:\VarnaAI\varnaai\varnaai-app\backend\Dockerfile"

# Frontend
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.frontend" "D:\VarnaAI\varnaai\varnaai-app\frontend\Dockerfile"

# Services (copy to each service directory)
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.service" "D:\VarnaAI\varnaai\varnaai-app\services\agent-orchestrator\Dockerfile"
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.service" "D:\VarnaAI\varnaai\varnaai-app\services\llm-gateway\Dockerfile"
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.service" "D:\VarnaAI\varnaai\varnaai-app\services\rag-service\Dockerfile"
copy "D:\VarnaAI\Websites\apps\varnaai\Dockerfile.service" "D:\VarnaAI\varnaai\varnaai-app\services\memory-service\Dockerfile"
```

### Step 2: Create .env Files

**For Webscrap**:
```powershell
cd D:\VarnaAI\Websites\apps\webscrap
copy .env.example .env
# Edit .env with your actual values
```

**For VarnaAI**:
```powershell
cd D:\VarnaAI\Websites\apps\varnaai
copy .env.example .env
# Edit .env with your actual values
```

### Step 3: Start Containers

**Webscrap**:
```powershell
cd D:\VarnaAI\Websites\apps\webscrap
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f webscrap-backend
```

**VarnaAI**:
```powershell
cd D:\VarnaAI\Websites\apps\varnaai
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f varnaai-backend
```

---

## Access Points Summary

### Webscrap
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3004 |
| Backend API | http://localhost:8003 |
| API Docs | http://localhost:8003/docs |
| Selenium Hub | http://localhost:4444 |

### VarnaAI
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3005 |
| Backend API | http://localhost:8004/api |
| API Docs | http://localhost:8004/api/docs |
| Neo4j Browser | http://localhost:7475 |
| Qdrant Dashboard | http://localhost:6335/dashboard |

---

## IP Address Map

### Webscrap (172.23.0.0/16)
| Container | IP Address |
|-----------|------------|
| webscrap-postgres | 172.23.0.10 |
| webscrap-redis | 172.23.0.11 |
| webscrap-backend | 172.23.0.12 |
| webscrap-frontend | 172.23.0.13 |
| webscrap-selenium-hub | 172.23.0.20 |
| webscrap-selenium-chrome | 172.23.0.21 |

### VarnaAI (172.25.0.0/16)
| Container | IP Address |
|-----------|------------|
| varnaai-postgres | 172.25.0.10 |
| varnaai-redis | 172.25.0.11 |
| varnaai-neo4j | 172.25.0.12 |
| varnaai-qdrant | 172.25.0.13 |
| varnaai-backend | 172.25.0.20 |
| varnaai-frontend | 172.25.0.21 |
| varnaai-orchestrator | 172.25.0.30 |
| varnaai-llm-gateway | 172.25.0.31 |
| varnaai-rag | 172.25.0.32 |
| varnaai-memory | 172.25.0.33 |

---

## Quick Commands

### Check All VarnaAI Platform Containers
```powershell
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | findstr /i "pension c3 fwchange webscrap varnaai"
```

### Start All 5 Apps
```powershell
# From D:\VarnaAI\Websites\apps
cd pension && docker-compose up -d && cd ..
cd dashboard && docker-compose up -d && cd ..
cd fwchange && docker-compose up -d && cd ..
cd webscrap && docker-compose up -d && cd ..
cd varnaai && docker-compose up -d && cd ..
```

### Stop All Apps
```powershell
cd D:\VarnaAI\Websites\apps
cd pension && docker-compose down && cd ..
cd dashboard && docker-compose down && cd ..
cd fwchange && docker-compose down && cd ..
cd webscrap && docker-compose down && cd ..
cd varnaai && docker-compose down && cd ..
```

---

## Troubleshooting

### Container Won't Start
```powershell
# Check logs
docker-compose logs -f <service-name>

# Rebuild without cache
docker-compose build --no-cache <service-name>
docker-compose up -d <service-name>
```

### Database Connection Issues
```powershell
# Check if postgres is healthy
docker exec webscrap-postgres pg_isready -U webscrap

# Connect to database
docker exec -it webscrap-postgres psql -U webscrap -d webscrap
```

### Port Conflicts
```powershell
# Check what's using a port
netstat -ano | findstr ":3004"

# Kill process by PID
taskkill /PID <pid> /F
```

### Network Issues Between Containers
```powershell
# Inspect network
docker network inspect webscrap-network

# Test connectivity
docker exec webscrap-backend ping webscrap-postgres
```

---

## Files Created

```
D:\VarnaAI\Websites\apps\
├── webscrap\
│   ├── docker-compose.yml      # Main Docker config
│   ├── .env.example            # Environment template
│   ├── Dockerfile.backend      # FastAPI Dockerfile (copy to source)
│   └── Dockerfile.frontend     # Next.js Dockerfile (copy to source)
├── varnaai\
│   ├── docker-compose.yml      # Main Docker config
│   ├── .env.example            # Environment template
│   ├── init-db.sql             # PostgreSQL init script
│   ├── Dockerfile.backend      # NestJS Dockerfile (copy to source)
│   ├── Dockerfile.frontend     # Next.js Dockerfile (copy to source)
│   └── Dockerfile.service      # Microservice template (copy to each service)
└── DOCKER_MIGRATION_GUIDE.md   # This file
```

---

## Next Steps

1. **Verify Source Structure**: Check that `D:\VarnaAI\Webscrap` and `D:\VarnaAI\varnaai` match the expected structure
2. **Copy Dockerfiles**: Move Dockerfiles to their respective source directories
3. **Configure .env**: Set actual passwords, API keys, and secrets
4. **Test Build**: Run `docker-compose build` to verify Dockerfiles work
5. **Start Services**: Run `docker-compose up -d`
6. **Verify Health**: Check all containers are healthy with `docker-compose ps`

---

**Created**: 2025-12-25
**Author**: Claude (AI Assistant)
**Status**: Ready for verification against actual source structure
