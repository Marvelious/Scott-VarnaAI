# BETA DEMO DEPLOYMENT PRD
## Getting ALL Your Apps Online NOW

**Version:** 1.0 - Action Plan
**Date:** November 4, 2025
**Author:** Big Dick & Claude
**Goal:** All apps online for demos within 7 days
**Budget:** €26.80/month (Hetzner CX42)
**Status:** 🚀 READY TO EXECUTE

---

## YOUR APPS INVENTORY

### What We're Deploying (From D:\VarnaAI\Old)

| Priority | App | Status | URL Target | Tech Stack |
|----------|-----|--------|------------|------------|
| **1** | AgenticCoder | Has Docker ✅ | code.varnaai.com | FastAPI + React |
| **2** | C3 Dashboard | Has Ollama ✅ | c3.varnaai.com | Node/TS + PostgreSQL |
| **3** | VarnaAI Platform | Monorepo | platform.varnaai.com | Next.js + NestJS |
| **4** | FwChange | Unknown | fwchange.varnaai.com | Node/Express? |
| **5** | ProjectManager | Unknown | pm.varnaai.com | Node/Express? |
| **6** | SEOAgent | Unknown | seo.varnaai.com | Python? |
| **7** | Pension/RetirementAI | Unknown | retire.varnaai.com | React? |

---

## THE INFRASTRUCTURE PLAN

### Server Choice: Hetzner CX42 (We Need RAM for Multiple Apps)

```yaml
Hetzner CX42:
  Price: €26.80/month ($30)
  CPU: 4 vCPU (AMD)
  RAM: 16 GB  # Enough for 5-6 apps
  Storage: 160 GB NVMe
  Transfer: 20 TB
  Location: Nuremberg, Germany
```

### Why CX42 Instead of CX22?
- **CX22 (4GB RAM)**: Can run 1-2 apps max
- **CX42 (16GB RAM)**: Can run ALL your apps
- **Cost difference**: €19.50/month extra
- **Worth it**: Show all products to clients

---

## PHASE 1: SERVER SETUP (Day 1 - 2 Hours)

### Step 1.1: Order Hetzner Server

```bash
# Go to: https://console.hetzner.cloud/
# 1. Create new project: "VarnaAI-Beta"
# 2. Add server:
#    - Type: CX42
#    - Location: Nuremberg
#    - Image: Ubuntu 22.04
#    - SSH Key: Add your public key
#    - Name: varnaai-beta
# 3. Note IP: 123.456.789.0 (example)
```

### Step 1.2: Initial Server Setup

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Install essentials
apt install -y \
  docker.io docker-compose \
  nginx certbot python3-certbot-nginx \
  git htop ncdu ufw fail2ban \
  postgresql-client redis-tools

# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Add swap (important for 16GB server)
fallocate -l 8G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Install Ollama (for C3 Dashboard)
curl -fsSL https://ollama.ai/install.sh | sh
systemctl enable ollama
ollama pull llama3.2:3b  # 2GB model
ollama pull mistral:7b   # 4GB model
```

### Step 1.3: Setup Docker Networks

```bash
# Create shared networks
docker network create web
docker network create database
docker network create redis

# Create app directories
mkdir -p /opt/apps/{agenticcoder,c3,varnaai,fwchange,pm,seoagent,pension}
mkdir -p /opt/shared/{postgres,redis,nginx}
```

### Step 1.4: Setup Shared Services

```bash
# /opt/shared/docker-compose.yml
cat > /opt/shared/docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: shared-postgres
    environment:
      POSTGRES_PASSWORD: varna2025secure
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-databases.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - database
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: shared-redis
    command: redis-server --requirepass varna2025redis
    volumes:
      - redis_data:/data
    networks:
      - redis
    restart: unless-stopped

  adminer:
    image: adminer:latest
    container_name: shared-adminer
    networks:
      - web
      - database
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.adminer.rule=Host(`db.varnaai.com`)"

volumes:
  postgres_data:
  redis_data:

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF

# Create database initialization
cat > /opt/shared/init-databases.sql << 'EOF'
CREATE DATABASE agenticcoder;
CREATE DATABASE c3_dashboard;
CREATE DATABASE varnaai_platform;
CREATE DATABASE fwchange;
CREATE DATABASE projectmanager;
CREATE DATABASE seoagent;
CREATE DATABASE pension;

-- Create users for each app
CREATE USER agenticcoder_user WITH PASSWORD 'agenticcoder_pass';
CREATE USER c3_user WITH PASSWORD 'c3_pass';
CREATE USER varnaai_user WITH PASSWORD 'varnaai_pass';
CREATE USER fwchange_user WITH PASSWORD 'fwchange_pass';
CREATE USER pm_user WITH PASSWORD 'pm_pass';

GRANT ALL ON DATABASE agenticcoder TO agenticcoder_user;
GRANT ALL ON DATABASE c3_dashboard TO c3_user;
GRANT ALL ON DATABASE varnaai_platform TO varnaai_user;
GRANT ALL ON DATABASE fwchange TO fwchange_user;
GRANT ALL ON DATABASE projectmanager TO pm_user;
EOF

# Start shared services
cd /opt/shared
docker-compose up -d
```

### Step 1.5: Install Traefik (Reverse Proxy)

```bash
# /opt/shared/traefik/docker-compose.yml
mkdir -p /opt/shared/traefik
cat > /opt/shared/traefik/docker-compose.yml << 'EOF'
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.network=web"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=admin@varnaai.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - web
    restart: unless-stopped

networks:
  web:
    external: true
EOF

cd /opt/shared/traefik
docker-compose up -d
```

---

## PHASE 2: DEPLOY AGENTICCODER (Day 2 - Priority 1)

### Step 2.1: Prepare AgenticCoder

```bash
# On your LOCAL machine
cd D:\VarnaAI\Old\agenticcoder

# Create production Dockerfile
cat > Dockerfile.prod << 'EOF'
# Backend
FROM python:3.11-slim as backend
WORKDIR /app/backend
COPY agenticcoder/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY agenticcoder/backend .
ENV PYTHONUNBUFFERED=1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Frontend
FROM node:20-alpine as frontend-build
WORKDIR /app
COPY agenticcoder/frontend/package*.json ./
RUN npm ci
COPY agenticcoder/frontend .
RUN npm run build

FROM nginx:alpine as frontend
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EOF

# Create docker-compose for production
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.prod
      target: backend
    environment:
      DATABASE_URL: postgresql://agenticcoder_user:agenticcoder_pass@shared-postgres:5432/agenticcoder
      REDIS_URL: redis://:varna2025redis@shared-redis:6379
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
    networks:
      - web
      - database
      - redis
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.agenticcoder-api.rule=Host(`api.code.varnaai.com`)"

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.prod
      target: frontend
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.agenticcoder.rule=Host(`code.varnaai.com`)"

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 2.2: Deploy to Server

```bash
# Create archive
tar czf agenticcoder.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=__pycache__ \
  .

# Copy to server
scp agenticcoder.tar.gz root@YOUR_SERVER_IP:/opt/apps/agenticcoder/

# SSH to server and deploy
ssh root@YOUR_SERVER_IP
cd /opt/apps/agenticcoder
tar xzf agenticcoder.tar.gz
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## PHASE 3: DEPLOY C3 DASHBOARD (Day 3 - Priority 2)

### Step 3.1: Prepare C3 Dashboard

```bash
# On LOCAL machine
cd D:\VarnaAI\Old\dashboard

# Create production config
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  c3-app:
    build: .
    container_name: c3-dashboard
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://c3_user:c3_pass@shared-postgres:5432/c3_dashboard
      REDIS_URL: redis://:varna2025redis@shared-redis:6379
      OLLAMA_BASE_URL: http://host.docker.internal:11434
      JWT_SECRET: c3_jwt_secret_2025
    networks:
      - web
      - database
      - redis
    extra_hosts:
      - "host.docker.internal:host-gateway"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.c3.rule=Host(`c3.varnaai.com`)"
    restart: unless-stopped

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 3.2: Deploy C3

```bash
# Archive and copy
tar czf c3.tar.gz --exclude=node_modules --exclude=.git .
scp c3.tar.gz root@YOUR_SERVER_IP:/opt/apps/c3/

# Deploy on server
ssh root@YOUR_SERVER_IP
cd /opt/apps/c3
tar xzf c3.tar.gz
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## PHASE 4: DEPLOY VARNAAI PLATFORM (Day 4 - Priority 3)

### Step 4.1: Prepare VarnaAI Platform

```bash
# On LOCAL machine
cd D:\VarnaAI\Old\varnaai

# Production config
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  platform:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: varnaai-platform
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://varnaai_user:varnaai_pass@shared-postgres:5432/varnaai_platform
      REDIS_URL: redis://:varna2025redis@shared-redis:6379
      NEXTAUTH_URL: https://platform.varnaai.com
      NEXTAUTH_SECRET: platform_secret_2025
    networks:
      - web
      - database
      - redis
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.platform.rule=Host(`platform.varnaai.com`)"
    restart: unless-stopped

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 4.2: Deploy Platform

```bash
# Build locally if large
docker build -t varnaai-platform:latest .
docker save varnaai-platform:latest | gzip > platform.tar.gz

# Copy and deploy
scp platform.tar.gz root@YOUR_SERVER_IP:/opt/apps/varnaai/
ssh root@YOUR_SERVER_IP
cd /opt/apps/varnaai
docker load < platform.tar.gz
docker-compose -f docker-compose.prod.yml up -d
```

---

## PHASE 5: DEPLOY REMAINING APPS (Day 5-6)

### Step 5.1: Quick Deploy Template

For apps without Docker configs, use this template:

```bash
# Generic Node.js app template
cat > /opt/apps/APP_NAME/docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: node:20-alpine
    container_name: APP_NAME
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run start"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://pm_user:pm_pass@shared-postgres:5432/projectmanager
      PORT: 3000
    networks:
      - web
      - database
      - redis
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.APP_NAME.rule=Host(`APP_NAME.varnaai.com`)"
    restart: unless-stopped

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 5.2: Deploy Each App

```bash
# FwChange
cd /opt/apps/fwchange
# Copy files from local
docker-compose up -d

# ProjectManager
cd /opt/apps/pm
# Copy files from local
docker-compose up -d

# SEOAgent (if Python)
cd /opt/apps/seoagent
# Use python:3.11-slim image instead
docker-compose up -d

# Pension/RetirementAI
cd /opt/apps/pension
# Copy files from local
docker-compose up -d
```

---

## PHASE 6: DOMAIN SETUP (Day 2, Parallel)

### Step 6.1: DNS Configuration

Add these A records to your DNS (Cloudflare recommended):

```
# Main domains
varnaai.com           →  YOUR_SERVER_IP
*.varnaai.com         →  YOUR_SERVER_IP

# Specific subdomains
code.varnaai.com      →  YOUR_SERVER_IP  # AgenticCoder
c3.varnaai.com        →  YOUR_SERVER_IP  # C3 Dashboard
platform.varnaai.com  →  YOUR_SERVER_IP  # VarnaAI Platform
fwchange.varnaai.com  →  YOUR_SERVER_IP  # FwChange
pm.varnaai.com        →  YOUR_SERVER_IP  # ProjectManager
seo.varnaai.com       →  YOUR_SERVER_IP  # SEOAgent
retire.varnaai.com    →  YOUR_SERVER_IP  # RetirementAI
db.varnaai.com        →  YOUR_SERVER_IP  # Adminer
monitor.varnaai.com   →  YOUR_SERVER_IP  # Grafana (optional)
```

### Step 6.2: SSL Certificates

Traefik automatically gets Let's Encrypt certificates when domains are accessed.

---

## PHASE 7: DEMO DATA & ACCOUNTS (Day 7)

### Step 7.1: Create Demo Data Script

```bash
# /opt/apps/demo-setup.sh
cat > /opt/apps/demo-setup.sh << 'EOF'
#!/bin/bash

# Connect to PostgreSQL
PGPASSWORD=varna2025secure psql -h localhost -U postgres << SQL

-- AgenticCoder demo data
\c agenticcoder;
INSERT INTO users (email, name, role) VALUES
  ('demo@varnaai.com', 'Demo User', 'admin'),
  ('client@example.com', 'Client Demo', 'user');

-- C3 Dashboard demo data
\c c3_dashboard;
INSERT INTO companies (name, compliance_status) VALUES
  ('Demo Company GmbH', 'active'),
  ('Test Corp AG', 'pending');

-- Add more demo data as needed
SQL

echo "Demo data created!"
EOF

chmod +x /opt/apps/demo-setup.sh
/opt/apps/demo-setup.sh
```

### Step 7.2: Create Demo Accounts

```bash
# Create unified demo credentials
cat > /opt/apps/DEMO_CREDENTIALS.md << 'EOF'
# Demo Credentials

## AgenticCoder
- URL: https://code.varnaai.com
- Email: demo@varnaai.com
- Password: VarnaDemo2025!

## C3 Dashboard
- URL: https://c3.varnaai.com
- Email: demo@varnaai.com
- Password: VarnaDemo2025!

## VarnaAI Platform
- URL: https://platform.varnaai.com
- Email: demo@varnaai.com
- Password: VarnaDemo2025!

## Database Admin
- URL: https://db.varnaai.com
- Server: shared-postgres
- Username: postgres
- Password: varna2025secure
EOF
```

---

## MONITORING & MAINTENANCE

### Daily Health Check Script

```bash
# /opt/apps/health-check.sh
cat > /opt/apps/health-check.sh << 'EOF'
#!/bin/bash

echo "=== VarnaAI Apps Health Check ==="
echo "Date: $(date)"
echo ""

# Check Docker containers
echo "Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "Memory Usage:"
free -h

echo ""
echo "Disk Usage:"
df -h /

echo ""
echo "App URLs:"
curl -s -o /dev/null -w "AgenticCoder: %{http_code}\n" https://code.varnaai.com
curl -s -o /dev/null -w "C3 Dashboard: %{http_code}\n" https://c3.varnaai.com
curl -s -o /dev/null -w "Platform: %{http_code}\n" https://platform.varnaai.com

echo ""
echo "Database Connections:"
PGPASSWORD=varna2025secure psql -h localhost -U postgres -c "SELECT datname, numbackends FROM pg_stat_database WHERE numbackends > 0;"
EOF

chmod +x /opt/apps/health-check.sh

# Add to cron
echo "0 9 * * * /opt/apps/health-check.sh > /opt/apps/health.log 2>&1" | crontab -
```

### Backup Script

```bash
# /opt/apps/backup.sh
cat > /opt/apps/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/opt/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup databases
PGPASSWORD=varna2025secure pg_dumpall -h localhost -U postgres > $BACKUP_DIR/all_databases.sql

# Backup Docker volumes
docker run --rm -v postgres_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/postgres_data.tar.gz -C /data .

# Keep only last 7 days
find /opt/backups -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x /opt/apps/backup.sh
echo "0 2 * * * /opt/apps/backup.sh > /opt/apps/backup.log 2>&1" | crontab -
```

---

## OPTIMIZATION TIPS

### Memory Management

```bash
# If running out of RAM
docker system prune -a  # Clean up unused images
docker volume prune     # Clean up unused volumes

# Restart specific app
docker-compose -f /opt/apps/agenticcoder/docker-compose.prod.yml restart

# Limit container memory
# Add to docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 2G
```

### Performance Tuning

```bash
# PostgreSQL optimization
cat >> /opt/shared/postgres.conf << 'EOF'
shared_buffers = 2GB
work_mem = 10MB
maintenance_work_mem = 512MB
effective_cache_size = 6GB
EOF

# Redis optimization
echo "maxmemory 2gb" >> /opt/shared/redis.conf
echo "maxmemory-policy allkeys-lru" >> /opt/shared/redis.conf
```

---

## TROUBLESHOOTING

### Common Issues

**Problem: App not accessible**
```bash
# Check if container is running
docker ps | grep APP_NAME

# Check logs
docker logs CONTAINER_NAME

# Check Traefik routing
docker logs traefik

# Check DNS
nslookup code.varnaai.com
```

**Problem: Out of memory**
```bash
# Check memory usage
htop

# Restart apps one by one
cd /opt/apps/agenticcoder && docker-compose down && docker-compose up -d

# Add swap if needed
fallocate -l 16G /swapfile2
mkswap /swapfile2
swapon /swapfile2
```

**Problem: Database connection issues**
```bash
# Check PostgreSQL
docker logs shared-postgres

# Test connection
PGPASSWORD=varna2025secure psql -h localhost -U postgres -l

# Restart database
docker restart shared-postgres
```

---

## COST BREAKDOWN

### Monthly Costs

| Item | Cost | Notes |
|------|------|-------|
| **Hetzner CX42** | €26.80 | 16GB RAM, 4 vCPU |
| **Domains** | $10 | varnaai.com + subdomains |
| **Cloudflare** | $0 | Free tier |
| **API Credits** | $20 | OpenAI/Anthropic for demos |
| **Backup Storage** | €1.60 | Hetzner Storage Box |
| **Total** | **~€40/month** | ~$45 USD |

### Cost Optimization Options

1. **Start with CX32** (€13.50, 8GB RAM) - Run 3-4 apps
2. **Use Ollama only** - Save $20/month API costs
3. **Turn off unused apps** - docker-compose down when not demoing

---

## GO-LIVE CHECKLIST

### Before Demo Day

- [ ] All apps accessible via domains
- [ ] Demo accounts created
- [ ] Demo data populated
- [ ] SSL certificates working
- [ ] Backup script running
- [ ] Health check passing
- [ ] Documentation updated
- [ ] Client access credentials ready

### Demo Day

- [ ] Health check at 8 AM
- [ ] Clear Redis cache if needed
- [ ] Monitor server resources
- [ ] Have local backup ready
- [ ] Test all demo accounts

### After Demo

- [ ] Collect feedback
- [ ] Check error logs
- [ ] Note any issues
- [ ] Update demo data if needed
- [ ] Plan improvements

---

## SUCCESS METRICS

### Week 1 Goals
- ✅ All 7 apps deployed
- ✅ All domains working
- ✅ SSL certificates active
- ✅ Demo accounts ready
- ✅ Health monitoring active

### Month 1 Goals
- 10 demo sessions completed
- 3 client trials started
- 1 paying customer
- <1 hour downtime total
- All apps optimized

---

## NEXT STEPS TIMELINE

### Day 1 (Today)
- [ ] Order Hetzner CX42
- [ ] Setup server basics
- [ ] Install Docker, Traefik, Ollama
- [ ] Start shared services

### Day 2
- [ ] Deploy AgenticCoder
- [ ] Setup DNS records
- [ ] Test access

### Day 3
- [ ] Deploy C3 Dashboard
- [ ] Test Ollama integration

### Day 4
- [ ] Deploy VarnaAI Platform
- [ ] Create demo accounts

### Day 5-6
- [ ] Deploy remaining apps
- [ ] Setup monitoring

### Day 7
- [ ] Populate demo data
- [ ] Final testing
- [ ] Document everything

---

## SUPPORT SCRIPTS

### Quick App Status

```bash
# /usr/local/bin/varna
cat > /usr/local/bin/varna << 'EOF'
#!/bin/bash

case "$1" in
  status)
    docker ps --format "table {{.Names}}\t{{.Status}}"
    ;;
  restart)
    cd /opt/apps/$2 && docker-compose -f docker-compose.prod.yml restart
    ;;
  logs)
    cd /opt/apps/$2 && docker-compose -f docker-compose.prod.yml logs -f
    ;;
  *)
    echo "Usage: varna [status|restart|logs] [app-name]"
    ;;
esac
EOF

chmod +x /usr/local/bin/varna
```

Now you can:
```bash
varna status          # See all apps
varna restart agenticcoder  # Restart specific app
varna logs c3        # See logs
```

---

## FINAL NOTES

**This is BETA, not production:**
- Some manual setup required
- Not fully automated yet
- Good enough for demos
- Can handle 20-50 concurrent users

**When to upgrade:**
- 100+ users: Move to dedicated server
- Revenue >$1000/month: Add redundancy
- Enterprise clients: Add monitoring, backup, security

**Emergency Contacts:**
- Hetzner Support: https://console.hetzner.cloud/
- Domain issues: Cloudflare dashboard
- Your backup: Local development still works

---

## SIGN-OFF

**Ready to execute?**

1. **Order Hetzner CX42 NOW** (€26.80/month)
2. **Follow Phase 1** setup (2 hours)
3. **Deploy apps** one by one (1-2 days)
4. **Test everything** (Day 7)

**Total time:** 7 days to all apps online
**Total cost:** €40/month
**Result:** Professional demo environment

Let's ship it, Big Dick! 🚀