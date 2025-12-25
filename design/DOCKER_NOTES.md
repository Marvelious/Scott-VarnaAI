# Docker Testing Notes

## Resource Constraints

| Apps Running | RAM Usage | Status |
|--------------|-----------|--------|
| 1 app | ~25GB | Comfortable |
| 2 apps | ~50GB (90%) | Maximum recommended |
| 3 apps | >60GB | System slow, not recommended |

## Testing Strategy

- **Run maximum 2 apps simultaneously** for testing
- Test in pairs: C3 + FwChange, then C3 + Pension, then FwChange + Pension
- **Never run all 3 apps at once** during development

## Docker Commands

```bash
# Start individual app
cd D:\VarnaAI\dashboard && docker-compose up -d   # C3
cd D:\VarnaAI\fwchange && docker-compose up -d    # FwChange
cd D:\VarnaAI\pension && docker-compose up -d     # Pension

# Check running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Stop app when done
docker-compose -f D:\VarnaAI\dashboard\docker-compose.yml down
docker-compose -f D:\VarnaAI\fwchange\docker-compose.yml down
docker-compose -f D:\VarnaAI\pension\docker-compose.yml down
```

## Port Allocation

| App | Frontend | Backend | PostgreSQL | Redis |
|-----|----------|---------|------------|-------|
| C3 | 3002 | 8001 | 5434 | 6381 |
| FwChange | 3003 | 8002 | 5435 | 6382 |
| Pension | 3001 | - | 5433 | 6380 |

## Agent Testing Workflow

When auditing/rewriting apps:
1. **Run agents sequentially** (one after one) - not 3 in parallel
2. Start App 1 → Test → Stop App 1
3. Start App 2 → Test → Stop App 2
4. Or run 2 apps at once for comparison testing

## System Specs

- **Total RAM**: 64GB
- **Safe working threshold**: 50GB (leaving ~14GB for system)
- **GPU**: RTX 5070 (8GB VRAM) - for Ollama in Docker
