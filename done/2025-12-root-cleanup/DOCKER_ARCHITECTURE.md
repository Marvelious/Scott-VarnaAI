# VarnaAI 4-App Docker Architecture

## Master Port Allocation

| App | Frontend | Backend | PostgreSQL | Redis | Other | Subnet |
|-----|----------|---------|------------|-------|-------|--------|
| **Pension** | 3001 | - | 5433 | 6380 | - | 172.20.0.0/16 |
| **C3** | 3002 | 8001 | 5434 | 6381 | - | 172.21.0.0/16 |
| **FwChange** | 3003 | 8002 | 5435 | 6382 | 8080 (Jira) | 172.22.0.0/16 |
| **LibreChat** | 3080 | - | 5436 | - | 7700 (Meili) | 172.23.0.0/16 |
| **Ollama** | - | - | - | - | 11434 | host network |

## Container Naming Convention

**MANDATORY PREFIX PATTERN**: `{app}-{service}`

| App | Container Prefix | Example Containers |
|-----|------------------|-------------------|
| Pension | `pension-*` | pension-app, pension-postgres, pension-redis |
| C3 | `c3-*` | c3-frontend, c3-api, c3-postgres, c3-redis |
| FwChange | `fwchange-*` | fwchange-frontend, fwchange-backend, fwchange-postgres |
| LibreChat | `librechat-*` | librechat-api, librechat-mongodb, librechat-vectordb |
| AI | `ollama` | ollama (standalone) |

## Network Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         VarnaAI Platform                                │
│                   Windows 11 | 64GB RAM | RTX 5070                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │    PENSION      │  │       C3        │  │    FWCHANGE     │         │
│  │  172.20.0.0/16  │  │  172.21.0.0/16  │  │  172.22.0.0/16  │         │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤         │
│  │ pension-app     │  │ c3-frontend     │  │ fwchange-frontend│        │
│  │ pension-postgres│  │ c3-api          │  │ fwchange-backend │        │
│  │ pension-redis   │  │ c3-postgres     │  │ fwchange-postgres│        │
│  │                 │  │ c3-redis        │  │ fwchange-redis   │        │
│  │ :3001 :5433     │  │ :3002 :8001     │  │ fwchange-jira    │        │
│  │ :6380           │  │ :5434 :6381     │  │ :3003 :8002      │        │
│  └─────────────────┘  └─────────────────┘  │ :5435 :6382 :8080│        │
│                                            └─────────────────┘         │
│  ┌──────────────────────────────────────────────────────────┐          │
│  │                     LIBRECHAT                             │          │
│  │                   172.23.0.0/16                           │          │
│  ├──────────────────────────────────────────────────────────┤          │
│  │ librechat-api (:3080)     librechat-mongodb              │          │
│  │ librechat-meilisearch     librechat-vectordb (:5436)     │          │
│  │ librechat-rag-api                                         │          │
│  └──────────────────────────────────────────────────────────┘          │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────┐          │
│  │                      OLLAMA (GPU)                         │          │
│  │                    Host Network                           │          │
│  ├──────────────────────────────────────────────────────────┤          │
│  │ ollama (:11434) - llama3.2, mistral, nomic-embed-text    │          │
│  │ GPU: RTX 5070 8GB VRAM                                    │          │
│  └──────────────────────────────────────────────────────────┘          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Fixed IP Addresses

### Pension (172.20.0.0/16)
| Container | IP | Port |
|-----------|-----|------|
| pension-postgres | 172.20.0.10 | 5432 |
| pension-redis | 172.20.0.11 | 6379 |
| pension-app | 172.20.0.12 | 3000 |

### C3 (172.21.0.0/16)
| Container | IP | Port |
|-----------|-----|------|
| c3-postgres | 172.21.0.10 | 5432 |
| c3-redis | 172.21.0.11 | 6379 |
| c3-api | 172.21.0.12 | 8000 |
| c3-frontend | 172.21.0.13 | 80 |

### FwChange (172.22.0.0/16)
| Container | IP | Port |
|-----------|-----|------|
| fwchange-postgres | 172.22.0.10 | 5432 |
| fwchange-redis | 172.22.0.11 | 6379 |
| fwchange-backend | 172.22.0.12 | 8000 |
| fwchange-frontend | 172.22.0.13 | 80 |
| fwchange-jira-postgres | 172.22.0.20 | 5432 |
| fwchange-jira | 172.22.0.21 | 8080 |

### LibreChat (172.23.0.0/16)
| Container | IP | Port |
|-----------|-----|------|
| librechat-mongodb | 172.23.0.10 | 27017 |
| librechat-vectordb | 172.23.0.11 | 5432 |
| librechat-meilisearch | 172.23.0.12 | 7700 |
| librechat-rag-api | 172.23.0.13 | 8000 |
| librechat-api | 172.23.0.14 | 3080 |

## Volume Naming Convention

**MANDATORY PATTERN**: `{app}_{service}_data`

| App | Volume Examples |
|-----|-----------------|
| Pension | pension_postgres_data, pension_redis_data |
| C3 | c3_postgres_data, c3_redis_data, c3_api_logs |
| FwChange | fwchange_postgres_data, fwchange_redis_data |
| LibreChat | librechat_mongodb_data, librechat_vectordb_data |
| Ollama | ollama_data |

## Quick Start Commands

```bash
# Start individual apps
cd D:\VarnaAI\pension && docker-compose up -d
cd D:\VarnaAI\dashboard && docker-compose up -d
cd D:\VarnaAI\fwchange && docker-compose up -d
cd D:\VarnaAI\LibreChat && docker-compose up -d

# Start Ollama (standalone)
docker run -d --gpus all -v ollama_data:/root/.ollama -p 11434:11434 --name ollama --restart no ollama/ollama

# Check all containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check all networks
docker network ls

# View logs for specific app
docker-compose -f D:\VarnaAI\fwchange\docker-compose.yml logs -f
```

## Access Points

| Service | URL |
|---------|-----|
| Pension | http://localhost:3001 |
| C3 Compliance | http://localhost:3002 |
| C3 API | http://localhost:8001 |
| FwChange | http://localhost:3003 |
| FwChange API | http://localhost:8002/docs |
| Jira | http://localhost:8080 |
| LibreChat | http://localhost:3080 |
| Ollama API | http://localhost:11434 |

## Cleanup Commands (when needed)

```bash
# Remove duplicate images
docker image prune -a

# Remove unused volumes
docker volume prune

# Full cleanup (CAUTION: removes data)
docker system prune -a --volumes
```

## COMPOSE_PROJECT_NAME

Each docker-compose.yml MUST set COMPOSE_PROJECT_NAME to prevent conflicts:

| App | COMPOSE_PROJECT_NAME |
|-----|---------------------|
| Pension | pension |
| C3 | c3 |
| FwChange | fwchange |
| LibreChat | librechat |
