# MASTER DEPLOYMENT PRD - VarnaAI Portfolio
## Production-Ready Beta Deployment with Security-First Architecture

**Version:** 3.0 (Consolidated Master)
**Date:** November 2025
**Author:** Big Dick & Claude
**Status:** 🟢 READY FOR IMPLEMENTATION

---

## EXECUTIVE SUMMARY

Complete deployment strategy for VarnaAI portfolio from local development to production-ready beta demos, incorporating security-first principles, proper secrets management, and clear progression paths.

### Key Decisions Made
- **Edge Strategy**: Cloudflare Tunnel + Access (no public ports on Hetzner)
- **Server Tier**: CX42 (€26.80/month) for beta demos, scalable to AX41
- **Database Model**: Single PostgreSQL cluster with schema separation
- **Demo Mode**: Mandatory DEMO_MODE flag with external API stubbing
- **Secrets**: External .env files + secret manager (never inline)
- **CI/CD**: GitHub Actions → GHCR → SSH deploy with Watchtower

---

## 1. INFRASTRUCTURE TIERS & DECISION MATRIX

### Tier Progression

| Stage | Server | Cost | Use Case | Trigger to Next |
|-------|--------|------|----------|-----------------|
| **Local Dev** | Your Machine | $0 | Development, testing | Need to show demos |
| **Demo (CX22)** | 2 vCPU, 4GB RAM | €7.31/mo | 1-2 apps, occasional demos | >3 demos/week |
| **Beta (CX42)** | 4 vCPU, 16GB RAM | €26.80/mo | All apps, daily demos | >5 pilot customers |
| **Production (AX41)** | 6 cores, 64GB RAM | €39/mo | Always-on, production SLA | Revenue >€500/mo |

### Current Decision: **CX42 for Beta**
- Supports all 6 apps simultaneously
- Sufficient for pilot programs
- Room for monitoring stack
- Cost-effective for current stage

---

## 2. SECURITY ARCHITECTURE

### Zero-Trust Demo Environment

```yaml
Internet → Cloudflare → Tunnel → Docker Network → Apps
                ↓
          Access Policy
          (Email/GitHub)
```

**NO PUBLIC PORTS** on Hetzner (except SSH on non-standard port)

### Cloudflare Configuration

```yaml
Tunnels:
  beta-tunnel:
    routes:
      - app.varnaai.com → agenticcoder:3000
      - c3.varnaai.com → c3-dashboard:3001
      - pm.ai-projektmanager.de → ai-pm:3002
      - fw.varnaai.com → fwchange:3003
      - pension.varnaai.com → pension:3004
      - platform.varnaai.com → platform:3005
      - monitor.varnaai.com → grafana:3000

Access Policies:
  demo_access:
    include:
      - emails: ["*@varnaai.com", "pilot@customer.com"]
      - github: ["BigDick", "authorized-users"]
    exclude:
      - everyone_else
    require:
      - purpose: "demo"
      - valid_until: "2025-12-31"
```

### Secrets Management

```yaml
Hierarchy:
  1. Production Secrets → 1Password/Doppler
  2. Demo Secrets → .env files (gitignored)
  3. Development → .env.example (committed)

Never:
  - Hardcode in docker-compose.yml
  - Include in documentation
  - Commit .env files
  - Use default passwords
```

---

## 3. STANDARDIZED DOCKER ARCHITECTURE

### Directory Structure

```
/opt/varnaai/
├── ops/
│   ├── compose/
│   │   ├── compose.shared.yml     # Shared services
│   │   ├── compose.demo.yml       # Demo overrides
│   │   └── compose.prod.yml       # Production overrides
│   ├── env/
│   │   ├── .env.example           # Template (committed)
│   │   ├── .env                   # Actual values (gitignored)
│   │   └── app-specific/
│   │       ├── agenticcoder.env
│   │       ├── c3.env
│   │       └── ...
│   ├── scripts/
│   │   ├── preflight-check.sh
│   │   ├── deploy.sh
│   │   ├── backup.sh
│   │   └── health-check.sh
│   └── monitoring/
│       ├── prometheus/
│       ├── grafana/
│       └── alerts/
├── apps/
│   ├── agenticcoder/
│   ├── c3-dashboard/
│   ├── fwchange/
│   ├── pension/
│   ├── ai-pm/
│   └── platform/
└── backups/
```

### Shared Services (compose.shared.yml)

```yaml
services:
  # Single PostgreSQL for all apps
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}  # From .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-databases.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
    profiles: ["db", "full"]

  # Single Redis for all apps
  redis:
    image: redis:7-alpine
    command: >
      redis-server
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
      ${REDIS_PASSWORD:+--requirepass ${REDIS_PASSWORD}}
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
    profiles: ["cache", "full"]

  # Cloudflare Tunnel (secure edge)
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel run
    environment:
      TUNNEL_TOKEN: ${CLOUDFLARE_TUNNEL_TOKEN}
    profiles: ["edge", "full"]

  # Monitoring Stack
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    profiles: ["monitoring", "full"]

  grafana:
    image: grafana/grafana:latest
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_ADMIN_PASSWORD}
      GF_INSTALL_PLUGINS: grafana-piechart-panel
    profiles: ["monitoring", "full"]

  # Backup
  restic:
    image: restic/restic:latest
    environment:
      RESTIC_REPOSITORY: s3:s3.amazonaws.com/${S3_BACKUP_BUCKET}
      RESTIC_PASSWORD: ${RESTIC_PASSWORD}
    profiles: ["backup", "full"]
```

### Database Initialization

```sql
-- init-databases.sql
CREATE DATABASE agenticcoder;
CREATE DATABASE c3_dashboard;
CREATE DATABASE fwchange;
CREATE DATABASE pension WITH TEMPLATE template0 LC_COLLATE 'en_US.UTF-8';
CREATE DATABASE ai_pm;
CREATE DATABASE platform;

-- Create read-only user for monitoring
CREATE USER monitoring WITH PASSWORD '${MONITORING_PASSWORD}';
GRANT CONNECT ON DATABASE agenticcoder TO monitoring;
GRANT USAGE ON SCHEMA public TO monitoring;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO monitoring;
```

---

## 4. APPLICATION CONFIGURATIONS

### AgenticCoder (Flagship)

```yaml
# apps/agenticcoder/compose.yml
services:
  agenticcoder:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/agenticcoder
      - REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379/0
      - DEMO_MODE=${DEMO_MODE:-true}
      - JWT_SECRET=${JWT_SECRET}
      - OLLAMA_HOST=${OLLAMA_HOST:-http://host.docker.internal:11434}
      - OPENAI_API_KEY=${OPENAI_API_KEY}  # For demos only
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=3000"
```

### C3 Dashboard (Compliance)

```yaml
services:
  c3-dashboard:
    build:
      context: .
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/c3_dashboard
      - REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379/1
      - DEMO_MODE=${DEMO_MODE:-true}
      - GDPR_MODE=true
      - AUDIT_LOG_ENABLED=true
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

### FwChange (Enterprise)

```yaml
services:
  fwchange:
    build:
      context: .
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/fwchange
      - DEMO_MODE=${DEMO_MODE:-true}
      - DISABLE_JIRA=${DEMO_MODE:-true}  # Disable in demo
      - DISABLE_FIREWALL_API=${DEMO_MODE:-true}
      - MOCK_VENDOR_RESPONSES=${DEMO_MODE:-true}
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

### Pension/RetirementAI (YMYL)

```yaml
services:
  pension:
    build:
      context: .
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/pension
      - DEMO_MODE=true  # ALWAYS true for demos
      - YMYL_DISCLAIMERS=true  # MANDATORY
      - DISABLE_TRADING_API=true  # MANDATORY for demos
      - DISABLE_REAL_CALCULATIONS=true  # Use mock data
      - DEMO_WARNING_BANNER=true  # Visible disclaimer
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

---

## 5. DEMO MODE IMPLEMENTATION

### Universal Demo Mode

```javascript
// shared/config/demo.js
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoConfig = {
  // Visible warnings
  showBanner: DEMO_MODE,
  bannerText: "⚠️ DEMO MODE - Not for production use",

  // Feature flags
  disablePayments: DEMO_MODE,
  disableEmails: DEMO_MODE,
  disableExternalAPIs: DEMO_MODE,

  // Data handling
  useStubData: DEMO_MODE,
  limitDataRetention: DEMO_MODE ? '7d' : null,

  // Security
  enforceTestCredentials: DEMO_MODE,
  disableProductionEndpoints: DEMO_MODE,

  // Compliance
  showYMYLDisclaimer: true,  // Always for financial
  requireExplicitConsent: true
};
```

### Demo Data Seeding

```bash
#!/bin/bash
# scripts/seed-demo-data.sh
set -euo pipefail

echo "🌱 Seeding demo data..."

# Wait for PostgreSQL
until docker exec varnaai_postgres pg_isready; do
  sleep 2
done

# Seed each database
for app in agenticcoder c3_dashboard fwchange pension ai_pm platform; do
  echo "  📦 Seeding $app..."
  docker exec -i varnaai_postgres psql -U postgres -d $app < ./seeds/$app.sql
done

# Create demo users
docker exec varnaai_postgres psql -U postgres <<SQL
INSERT INTO users (email, password_hash, role, demo_account)
VALUES
  ('demo@varnaai.com', '\$2b\$10\$DEMO_HASH', 'admin', true),
  ('pilot@customer.com', '\$2b\$10\$PILOT_HASH', 'user', true)
ON CONFLICT DO NOTHING;
SQL

echo "✅ Demo data seeded!"
```

---

## 6. DEPLOYMENT WORKFLOW

### Day 0: Infrastructure Setup

```bash
#!/bin/bash
# Day 0: Order and configure Hetzner CX42

# 1. Order server
echo "📦 Order Hetzner CX42 (€26.80/month)"
echo "   Location: Nuremberg or Falkenstein"
echo "   OS: Ubuntu 22.04 LTS"
echo "   Add SSH key during creation"

# 2. Initial server setup (once you have IP)
ssh root@SERVER_IP << 'SETUP'
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install additional tools
apt install -y git make htop ncdu restic

# Setup firewall (SSH only)
ufw allow 22222/tcp  # Custom SSH port
ufw --force enable

# Change SSH port
sed -i 's/#Port 22/Port 22222/' /etc/ssh/sshd_config
systemctl restart sshd

# Create directory structure
mkdir -p /opt/varnaai/{ops,apps,backups}
cd /opt/varnaai

# Clone repository
git clone https://github.com/yourusername/varnaai-deployment.git .
SETUP
```

### Day 1: Core Services

```bash
#!/bin/bash
# Deploy shared services

cd /opt/varnaai

# Copy and configure environment
cp ops/env/.env.example ops/env/.env
nano ops/env/.env  # Fill in actual values

# Start core services
docker-compose -f ops/compose/compose.shared.yml --profile db --profile cache up -d

# Verify services
docker ps
docker exec varnaai_postgres pg_isready
docker exec varnaai_redis redis-cli ping
```

### Day 2: Cloudflare Setup

```bash
# 1. Create Cloudflare Tunnel
cloudflared tunnel create beta-varnaai
cloudflared tunnel route dns beta-varnaai app.varnaai.com
cloudflared tunnel route dns beta-varnaai c3.varnaai.com
# ... repeat for all subdomains

# 2. Configure Access Policies
# Via Cloudflare Dashboard:
# - Create Access Application for each app
# - Set authentication requirements
# - Add authorized emails

# 3. Start tunnel on server
docker-compose -f ops/compose/compose.shared.yml --profile edge up -d
```

### Day 3-4: Deploy Applications

```bash
#!/bin/bash
# Deploy apps in priority order

# Priority 1: AgenticCoder
cd /opt/varnaai/apps/agenticcoder
docker-compose up -d --build

# Priority 1: C3 Dashboard
cd /opt/varnaai/apps/c3-dashboard
docker-compose up -d --build

# Priority 1: VarnaAI Platform
cd /opt/varnaai/apps/platform
docker-compose up -d --build

# Priority 2: FwChange
cd /opt/varnaai/apps/fwchange
docker-compose up -d --build

# Priority 2: Pension
cd /opt/varnaai/apps/pension
docker-compose up -d --build

# Priority 2: AI-PM
cd /opt/varnaai/apps/ai-pm
docker-compose up -d --build
```

### Day 5: Monitoring & Backups

```bash
# Start monitoring stack
docker-compose -f ops/compose/compose.shared.yml --profile monitoring up -d

# Configure Grafana dashboards
# Access via monitor.varnaai.com

# Setup backup schedule
crontab -e
# Add: 0 2 * * * /opt/varnaai/scripts/backup.sh

# Test backup/restore
./scripts/test-backup-restore.sh
```

### Day 6: Testing & Validation

```bash
#!/bin/bash
# scripts/preflight-check.sh

echo "🔍 Running preflight checks..."

# Check all services running
check_service() {
  if docker ps | grep -q $1; then
    echo "✅ $1 is running"
  else
    echo "❌ $1 is not running"
    exit 1
  fi
}

for service in postgres redis cloudflared grafana prometheus; do
  check_service "varnaai_$service"
done

# Check DNS resolution
for domain in app.varnaai.com c3.varnaai.com monitor.varnaai.com; do
  if nslookup $domain > /dev/null; then
    echo "✅ $domain resolves"
  else
    echo "❌ $domain does not resolve"
  fi
done

# Check Cloudflare Tunnel
if curl -s https://app.varnaai.com/health | grep -q "ok"; then
  echo "✅ Cloudflare Tunnel working"
else
  echo "❌ Cloudflare Tunnel not working"
fi

# Check demo mode
for app in agenticcoder c3 fwchange pension; do
  if docker exec varnaai_$app env | grep -q "DEMO_MODE=true"; then
    echo "✅ $app in demo mode"
  else
    echo "⚠️ $app not in demo mode!"
  fi
done

echo "✅ Preflight complete!"
```

### Day 7: Go Live

```bash
# Final checklist
./scripts/preflight-check.sh
./scripts/health-check.sh
./scripts/backup.sh

# Create demo accounts
./scripts/seed-demo-data.sh

# Document access URLs
cat > DEMO_ACCESS.md << 'EOF'
# VarnaAI Demo Access

## Applications
- AgenticCoder: https://app.varnaai.com
- C3 Dashboard: https://c3.varnaai.com
- FwChange: https://fw.varnaai.com
- Pension: https://pension.varnaai.com
- AI-PM: https://pm.ai-projektmanager.de
- Platform: https://platform.varnaai.com

## Monitoring
- Grafana: https://monitor.varnaai.com
  - User: admin
  - Pass: [Check .env]

## Demo Credentials
- Email: demo@varnaai.com
- Password: DemoPass2025!

## Support
- SSH: ssh -p 22222 root@SERVER_IP
- Logs: docker logs varnaai_[service]
EOF

echo "🚀 Beta deployment complete!"
```

---

## 7. CI/CD PIPELINE

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Beta

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: [agenticcoder, c3-dashboard, fwchange, pension, ai-pm, platform]

    steps:
      - uses: actions/checkout@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./apps/${{ matrix.app }}
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/${{ matrix.app }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/${{ matrix.app }}:${{ github.sha }}

      - name: Security scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/${{ matrix.app }}:latest
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.SERVER_IP }}
          port: 22222
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/varnaai
            git pull
            docker-compose pull
            docker-compose up -d --no-deps
            ./scripts/health-check.sh
```

---

## 8. MONITORING & OBSERVABILITY

### Metrics Collection

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'apps'
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: [__meta_docker_container_label_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_docker_container_label_prometheus_io_port]
        action: replace
        target_label: __address__
        replacement: $1:$2

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### SLO Definitions

```yaml
SLOs:
  availability:
    target: 99.0%  # Beta target
    measurement: uptime_ratio

  latency:
    p95: 500ms
    p99: 1000ms

  error_rate:
    target: <1%
    exclude: [client_errors]

  backup:
    RPO: 24h  # Recovery Point Objective
    RTO: 4h   # Recovery Time Objective
```

### Alert Rules

```yaml
# monitoring/alerts/rules.yml
groups:
  - name: critical
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"

      - alert: HighMemoryUsage
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
        for: 5m
        labels:
          severity: warning

      - alert: DatabaseDown
        expr: pg_up == 0
        for: 1m
        labels:
          severity: critical

      - alert: DiskSpaceLow
        expr: node_filesystem_avail_bytes / node_filesystem_size_bytes < 0.1
        for: 5m
        labels:
          severity: warning
```

---

## 9. BACKUP & DISASTER RECOVERY

### Backup Strategy

```bash
#!/bin/bash
# scripts/backup.sh
set -euo pipefail

BACKUP_DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/opt/varnaai/backups/$BACKUP_DATE"

echo "📦 Starting backup $BACKUP_DATE..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker exec varnaai_postgres pg_dumpall -U postgres | gzip > $BACKUP_DIR/postgres.sql.gz

# Backup Redis
docker exec varnaai_redis redis-cli SAVE
docker cp varnaai_redis:/data/dump.rdb $BACKUP_DIR/redis.rdb

# Backup volumes
for volume in $(docker volume ls -q | grep varnaai); do
  docker run --rm -v $volume:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/$volume.tar.gz /data
done

# Backup configs
tar czf $BACKUP_DIR/configs.tar.gz /opt/varnaai/ops/env

# Upload to S3 (or Hetzner Storage Box)
restic backup $BACKUP_DIR

# Cleanup old local backups (keep 7 days)
find /opt/varnaai/backups -type d -mtime +7 -exec rm -rf {} +

echo "✅ Backup complete!"
```

### Restore Procedure

```bash
#!/bin/bash
# scripts/restore.sh
set -euo pipefail

BACKUP_DATE=$1

if [ -z "$BACKUP_DATE" ]; then
  echo "Usage: ./restore.sh YYYYMMDD-HHMMSS"
  exit 1
fi

echo "⚠️ WARNING: This will restore from backup $BACKUP_DATE"
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# Stop all apps (keep DB running)
docker-compose down --remove-orphans

# Restore PostgreSQL
gunzip < /opt/varnaai/backups/$BACKUP_DATE/postgres.sql.gz | docker exec -i varnaai_postgres psql -U postgres

# Restore Redis
docker cp /opt/varnaai/backups/$BACKUP_DATE/redis.rdb varnaai_redis:/data/dump.rdb
docker restart varnaai_redis

# Restore volumes
for archive in /opt/varnaai/backups/$BACKUP_DATE/*.tar.gz; do
  volume=$(basename $archive .tar.gz)
  docker run --rm -v $volume:/data -v /opt/varnaai/backups/$BACKUP_DATE:/backup alpine tar xzf /backup/$volume.tar.gz -C /
done

# Restart everything
docker-compose up -d

echo "✅ Restore complete!"
```

---

## 10. COMPLIANCE & SECURITY

### GDPR Compliance

```javascript
// shared/middleware/gdpr.js
module.exports = (req, res, next) => {
  // Data residency check
  if (process.env.DATA_RESIDENCY === 'EU' && !isEURegion(req.ip)) {
    logger.warn('Non-EU access attempt', { ip: req.ip });
  }

  // Audit logging
  if (process.env.AUDIT_LOG_ENABLED === 'true') {
    auditLog.record({
      timestamp: new Date(),
      user: req.user?.id,
      action: req.method + ' ' + req.path,
      ip: req.ip,
      hash: crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex')
    });
  }

  // Right to be forgotten
  if (req.path === '/api/user/delete' && req.method === 'DELETE') {
    scheduleDataPurge(req.user.id, 30); // 30 day grace period
  }

  next();
};
```

### YMYL Safeguards (Pension App)

```html
<!-- Mandatory disclaimer banner -->
<div class="ymyl-disclaimer critical">
  <h2>⚠️ IMPORTANT DISCLAIMER</h2>
  <p>
    This is a DEMO application for illustrative purposes only.
    Do NOT use for actual financial planning or investment decisions.
    Always consult qualified financial advisors for retirement planning.
  </p>
  <button onclick="acknowledgeDisclaimer()">I Understand</button>
</div>

<script>
// Block functionality until acknowledged
if (!localStorage.getItem('disclaimer_acknowledged')) {
  document.body.classList.add('blocked');
}

// Periodic re-confirmation
setInterval(() => {
  if (Date.now() - localStorage.getItem('disclaimer_timestamp') > 3600000) {
    location.reload(); // Re-show disclaimer every hour
  }
}, 60000);
</script>
```

### Security Headers

```nginx
# nginx/security-headers.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# GDPR/Privacy
add_header X-Robots-Tag "noindex, nofollow" always;  # For demos
```

---

## 11. ROLLBACK PROCEDURES

### Application Rollback

```bash
#!/bin/bash
# scripts/rollback-app.sh

APP=$1
VERSION=$2

if [ -z "$APP" ] || [ -z "$VERSION" ]; then
  echo "Usage: ./rollback-app.sh <app> <version>"
  exit 1
fi

echo "Rolling back $APP to version $VERSION..."

# Pull previous version
docker pull ghcr.io/yourusername/varnaai/$APP:$VERSION

# Tag as latest
docker tag ghcr.io/yourusername/varnaai/$APP:$VERSION ghcr.io/yourusername/varnaai/$APP:latest

# Restart container
docker-compose up -d --no-deps $APP

# Verify
sleep 5
./scripts/health-check.sh $APP

echo "✅ Rollback complete!"
```

### Full System Rollback

```bash
#!/bin/bash
# Emergency rollback to last known good state

# Stop everything
docker-compose down

# Restore from yesterday's backup
./scripts/restore.sh $(date -d yesterday +%Y%m%d)

# Start with previous docker images
docker-compose up -d

# Verify all services
./scripts/preflight-check.sh
```

---

## 12. COST OPTIMIZATION

### Current Costs (Beta)

| Component | Cost/Month | Notes |
|-----------|------------|-------|
| Hetzner CX42 | €26.80 | Can downgrade to CX22 if needed |
| Domains (5) | €5.00 | Via Namecheap/Cloudflare |
| Cloudflare | €0.00 | Free tier sufficient |
| Backups (S3) | €2.00 | ~50GB storage |
| **Total** | **€33.80** | Under €40 target |

### Optimization Opportunities

```yaml
When to optimize:
  Idle periods:
    - Stop monitoring stack: save 1GB RAM
    - Reduce Redis memory: save 512MB
    - Pause backup jobs: save CPU

  Low traffic:
    - Scale down to CX22: save €19.49/month
    - Use Cloudflare cache aggressively
    - Disable non-essential services

  Development:
    - Use local Ollama: save API costs
    - Mock external services: save API calls
    - Use Docker resource limits strictly
```

---

## 13. OPERATIONAL RUNBOOKS

### Daily Operations

```bash
# Morning health check
./scripts/health-check.sh
docker ps
df -h

# Review logs for errors
docker-compose logs --since 24h | grep ERROR

# Check metrics
curl -s http://localhost:9090/api/v1/query?query=up | jq
```

### Weekly Maintenance

```bash
# Backup verification
./scripts/test-backup-restore.sh

# Security updates
apt update && apt upgrade -y
docker system prune -a --volumes

# Certificate check
./scripts/check-ssl.sh

# Review metrics and optimize
```

### Emergency Procedures

```yaml
Service Down:
  1. Check Docker: docker ps -a
  2. Check logs: docker logs varnaai_[service]
  3. Restart: docker-compose up -d [service]
  4. If persists: rollback to previous version

High Memory:
  1. Check usage: docker stats
  2. Restart heavy services: docker restart [service]
  3. Clear caches: docker exec varnaai_redis redis-cli FLUSHALL
  4. Scale down if needed

Disk Full:
  1. Check usage: df -h && du -sh /var/lib/docker/*
  2. Prune Docker: docker system prune -a
  3. Rotate logs: truncate -s 0 /var/lib/docker/containers/*/*-json.log
  4. Move backups to S3
```

---

## 14. SUCCESS METRICS

### Launch Criteria (Beta)

- [ ] All 6 apps deployed and accessible
- [ ] Cloudflare Tunnel working with Access policies
- [ ] Demo mode active on all apps
- [ ] Monitoring dashboard functional
- [ ] Backup tested and verified
- [ ] Health checks passing
- [ ] SSL certificates valid
- [ ] Demo accounts created
- [ ] YMYL disclaimers visible
- [ ] Resource usage <80%

### KPIs to Track

```yaml
Technical:
  - Uptime: >99% (allow for maintenance)
  - Response time: p95 <500ms
  - Error rate: <1%
  - Backup success: 100%

Business:
  - Demo sessions: Track weekly
  - Pilot conversions: >10%
  - Feedback score: >7/10
  - Cost per demo: <€1
```

---

## 15. NEXT STEPS

### Immediate (Before Day 0)

1. **Review this PRD** completely
2. **Create GitHub repo** with structure
3. **Set up Cloudflare account** and zones
4. **Prepare .env values** (generate secrets)
5. **Order Hetzner CX42** server

### Day 0-7 Execution

Follow the day-by-day deployment workflow in Section 6

### Post-Launch (Day 8+)

1. **Gather feedback** from demo sessions
2. **Optimize based on metrics**
3. **Document issues and solutions**
4. **Prepare for production** upgrade path
5. **Start pilot programs**

---

## APPENDIX A: QUICK REFERENCE

### Essential Commands

```bash
# Start everything
cd /opt/varnaai && make up

# Check status
make ps
make health

# View logs
make logs SERVICE=agenticcoder

# Restart app
docker-compose restart agenticcoder

# Emergency stop
make down

# Full reset
make clean && make up
```

### Important Files

```
/opt/varnaai/ops/env/.env           # Main configuration
/opt/varnaai/ops/compose/           # Docker Compose files
/opt/varnaai/scripts/backup.sh      # Backup script
/opt/varnaai/scripts/health-check.sh # Health monitoring
/opt/varnaai/DEMO_ACCESS.md         # Access documentation
```

### Support Contacts

```yaml
Infrastructure:
  - Hetzner: support@hetzner.com
  - Cloudflare: dashboard.cloudflare.com/support

Internal:
  - SSH: ssh -p 22222 root@[SERVER_IP]
  - Grafana: https://monitor.varnaai.com
  - Logs: /var/log/varnaai/
```

---

## APPENDIX B: DECISION LOG

| Decision | Option Chosen | Rationale |
|----------|--------------|-----------|
| Edge Strategy | Cloudflare Tunnel | No public ports, better security |
| Database | Single PostgreSQL | Resource efficiency, easier backups |
| Demo Mode | Mandatory flag | Prevent accidental production use |
| Secrets | External .env | Never hardcode, easy rotation |
| Monitoring | Prometheus + Grafana | Industry standard, good ecosystem |
| Backup | Restic to S3 | Encrypted, incremental, cheap |
| CI/CD | GitHub Actions | Free, integrated, familiar |

---

## SIGN-OFF

This master PRD consolidates all previous deployment documentation with production-ready security, monitoring, and operational excellence.

**Ready for implementation.**

Big Dick, this is your definitive guide from local development to beta deployment with all the Codex improvements incorporated. No more fragments - just this one source of truth.

Total implementation time: 7 days
Total cost: €33.80/month
Security: Enterprise-grade
Scalability: Ready for growth

🚀 Let's ship it!