# Shared Ollama Setup for VarnaAI Test Lab

**UPDATED: 2025-12-26** - Unified architecture with health checks and memory limits

## Overview
One Ollama instance serving ALL apps - shared learning, shared models, single GPU utilization.

## Current Status
- **Container**: `ailab-ollama`
- **Port**: `11435` (host) → `11434` (container)
- **Network**: `ailab-network` (external, created by shared-ollama.yml)
- **Health Check**: `curl http://localhost:11434/api/tags` every 30s
- **Memory Limit**: 8GB RAM (container limit)

## Host Hardware (Lenovo Legion 5 15IAX10)
| Component | Specification |
|-----------|---------------|
| **Laptop** | Lenovo Legion 5 15IAX10 |
| **OS** | Windows 11 + WSL2 + Docker Desktop |
| **RAM** | 64GB DDR5 |
| **GPU** | NVIDIA RTX 5070 |
| **VRAM** | 8GB GDDR7 |

## Access from Apps

### From Docker Containers (RECOMMENDED)
All apps should connect to `ailab-network` and use container name:

```yaml
# In docker-compose.yml
services:
  your-app:
    networks:
      - your-app-network
      - ailab-network    # Add this for Ollama access
    environment:
      - OLLAMA_HOST=http://ailab-ollama:11434
      - OLLAMA_BASE_URL=http://ailab-ollama:11434

networks:
  your-app-network:
    driver: bridge
  ailab-network:
    external: true       # Must be external!
    name: ailab-network
```

### Apps Currently Connected
| App | Network | Ollama URL |
|-----|---------|------------|
| LibreChat | ailab-network | http://ailab-ollama:11434 |
| AI Lab (LlamaFactory) | ailab-network | http://ailab-ollama:11434 |
| AI Lab (Jupyter) | ailab-network | http://ailab-ollama:11434 |

### From Host/Local Development
```
http://localhost:11435
```

## Startup Order (IMPORTANT)

**Always start Ollama FIRST before other apps:**

```bash
# 1. Start shared Ollama (creates ailab-network)
docker compose -f D:/VarnaAI/Websites/operations/compose/shared-ollama.yml up -d

# 2. Verify Ollama is healthy
docker exec ailab-ollama curl -s http://localhost:11434/api/tags

# 3. Start LibreChat (connects to ailab-network)
cd D:/VarnaAI/Websites/apps/LibreChat
docker compose up -d

# 4. Start AI Lab services (optional)
cd D:/VarnaAI/Websites/apps/ai-lab
docker compose up -d
```

## GPU Setup (Windows 11 + RTX)

### Prerequisites
1. **NVIDIA Driver**: Latest Game Ready or Studio driver
2. **WSL2**: Updated to latest version
3. **Docker Desktop**: WSL2 backend enabled

### Verify GPU Access
```bash
# Check GPU in container
docker exec ailab-ollama nvidia-smi

# If no GPU, check WSL2 CUDA
wsl --update
wsl --shutdown
# Restart Docker Desktop
```

### Docker Compose GPU Config
```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

## Recommended Models

| Model | Size | Use Case |
|-------|------|----------|
| `nomic-embed-text` | 274MB | Embeddings (RAG) |
| `llama3.2:3b` | 2GB | Fast inference |
| `llama3.2:8b` | 4.7GB | Balanced |
| `mistral:7b` | 4.1GB | Coding/reasoning |
| `codellama:7b` | 3.8GB | Code generation |

## Pull Models
```bash
docker exec ailab-ollama ollama pull llama3.2:3b
docker exec ailab-ollama ollama pull mistral:7b
```

## Common Issues

### GPU Not Detected
1. Update NVIDIA driver (Windows host)
2. `wsl --update && wsl --shutdown`
3. Restart Docker Desktop
4. Ensure Docker Desktop → Settings → Resources → WSL Integration is ON

### Network Issues
```bash
# Create shared network if missing
docker network create ailab-network

# Connect existing container
docker network connect ailab-network your-app
```

### Container Won't Start
```bash
# Check logs
docker logs ailab-ollama

# Recreate with GPU
docker rm -f ailab-ollama
docker compose -f operations/compose/shared-ollama.yml up -d
```

## Environment Variables for Apps

```env
# .env file for any app
OLLAMA_HOST=http://ailab-ollama:11434
OLLAMA_MODEL=llama3.2:3b
EMBEDDING_MODEL=nomic-embed-text
```

## Test Connection
```bash
# From host
curl http://localhost:11435/api/tags

# From container
docker exec your-app curl http://ailab-ollama:11434/api/tags
```
