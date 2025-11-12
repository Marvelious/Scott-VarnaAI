# VarnaAI Beta Deployment - Implementation Checklist
## From Local to Live in 7 Days

**Generated from:** MASTER-DEPLOYMENT-PRD.md
**Target Cost:** €33.80/month
**Server:** Hetzner CX42

---

## 📋 PRE-LAUNCH PREPARATION

### Accounts & Access
- [ ] Create/verify Cloudflare account
- [ ] Add all 5 domains to Cloudflare
- [ ] Create GitHub repository for deployment configs
- [ ] Create AWS S3 account for backups (or Hetzner Storage Box)
- [ ] Prepare SSH key pair for server access

### Local Preparation
- [ ] Install required tools locally:
  - [ ] Docker Desktop
  - [ ] Git
  - [ ] Make
  - [ ] cloudflared CLI
  - [ ] OpenSSL (for secret generation)

### Secrets Generation
- [ ] Generate JWT secret: `openssl rand -base64 32`
- [ ] Generate session secret: `openssl rand -base64 32`
- [ ] Generate encryption key: `openssl rand -base64 32`
- [ ] Generate database passwords (unique per environment)
- [ ] Generate Grafana admin password
- [ ] Generate Redis password
- [ ] Generate Restic backup password
- [ ] Obtain API keys:
  - [ ] OpenAI API key (for demos)
  - [ ] Cloudflare API token
  - [ ] Optional: Anthropic API key

### Repository Setup
- [ ] Create directory structure:
  ```
  varnaai-deployment/
  ├── ops/
  │   ├── env/
  │   ├── compose/
  │   ├── scripts/
  │   └── monitoring/
  ├── apps/
  └── docs/
  ```
- [ ] Copy MASTER-DEPLOYMENT-PRD.md to docs/
- [ ] Create .gitignore with:
  - [ ] .env files
  - [ ] *.pem, *.key files
  - [ ] backups/
  - [ ] logs/

---

## 🚀 DAY 0: SERVER SETUP

### Order Hetzner Server
- [ ] Go to https://www.hetzner.com/cloud
- [ ] Select CX42 (4 vCPU, 16GB RAM, 160GB disk)
- [ ] Choose location: Nuremberg or Falkenstein
- [ ] Select Ubuntu 22.04 LTS
- [ ] Add your SSH public key
- [ ] Name server: varnaai-beta
- [ ] Complete purchase (€26.80/month)
- [ ] Note server IP: _______________

### Initial Server Configuration
- [ ] SSH to server: `ssh root@SERVER_IP`
- [ ] Update system: `apt update && apt upgrade -y`
- [ ] Install Docker:
  ```bash
  curl -fsSL https://get.docker.com | sh
  ```
- [ ] Install additional tools:
  ```bash
  apt install -y git make htop ncdu restic jq
  ```
- [ ] Configure firewall:
  ```bash
  ufw allow 22222/tcp  # Custom SSH
  ufw --force enable
  ```
- [ ] Change SSH port:
  ```bash
  sed -i 's/#Port 22/Port 22222/' /etc/ssh/sshd_config
  systemctl restart sshd
  ```
- [ ] Reconnect on new port: `ssh -p 22222 root@SERVER_IP`

### Create Directory Structure
- [ ] Create base directories:
  ```bash
  mkdir -p /opt/varnaai/{ops,apps,backups}
  cd /opt/varnaai
  ```
- [ ] Clone deployment repository:
  ```bash
  git clone https://github.com/YOUR_USERNAME/varnaai-deployment.git .
  ```

---

## 🔧 DAY 1: CORE SERVICES

### Environment Configuration
- [ ] Copy environment template:
  ```bash
  cp ops/env/.env.example ops/env/.env
  ```
- [ ] Edit .env with actual values:
  - [ ] Set HETZNER_IP
  - [ ] Set DOMAIN_BASE
  - [ ] Set all passwords (generated earlier)
  - [ ] Set API keys
  - [ ] Set DEMO_MODE=true
  - [ ] Set ENVIRONMENT=demo

### Deploy Shared Services
- [ ] Start PostgreSQL:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile db up -d
  ```
- [ ] Verify PostgreSQL: `docker exec varnaai_postgres pg_isready`
- [ ] Start Redis:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile cache up -d
  ```
- [ ] Verify Redis: `docker exec varnaai_redis redis-cli ping`
- [ ] Initialize databases:
  ```bash
  docker exec -i varnaai_postgres psql -U postgres < ops/scripts/init-databases.sql
  ```

### Setup Monitoring (Optional for Day 1)
- [ ] Start Prometheus:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile monitoring up -d prometheus
  ```
- [ ] Start Grafana:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile monitoring up -d grafana
  ```
- [ ] Start Loki:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile monitoring up -d loki
  ```

---

## 🌐 DAY 2: CLOUDFLARE SETUP

### Create Cloudflare Tunnel
- [ ] Install cloudflared locally
- [ ] Login to Cloudflare: `cloudflared tunnel login`
- [ ] Create tunnel: `cloudflared tunnel create beta-varnaai`
- [ ] Note tunnel ID: _______________
- [ ] Note tunnel token: _______________

### Configure DNS Routes
- [ ] Route AgenticCoder:
  ```bash
  cloudflared tunnel route dns beta-varnaai app.varnaai.com
  ```
- [ ] Route C3 Dashboard:
  ```bash
  cloudflared tunnel route dns beta-varnaai c3.varnaai.com
  ```
- [ ] Route FwChange:
  ```bash
  cloudflared tunnel route dns beta-varnaai fw.varnaai.com
  ```
- [ ] Route Pension:
  ```bash
  cloudflared tunnel route dns beta-varnaai pension.varnaai.com
  ```
- [ ] Route Platform:
  ```bash
  cloudflared tunnel route dns beta-varnaai platform.varnaai.com
  ```
- [ ] Route AI-PM:
  ```bash
  cloudflared tunnel route dns beta-varnaai pm.ai-projektmanager.de
  ```
- [ ] Route Monitoring:
  ```bash
  cloudflared tunnel route dns beta-varnaai monitor.varnaai.com
  ```

### Configure Access Policies
- [ ] Go to Cloudflare Zero Trust dashboard
- [ ] Create Access Application for each app:
  - [ ] app.varnaai.com (AgenticCoder)
  - [ ] c3.varnaai.com (C3 Dashboard)
  - [ ] fw.varnaai.com (FwChange)
  - [ ] pension.varnaai.com (Pension)
  - [ ] platform.varnaai.com (Platform)
  - [ ] pm.ai-projektmanager.de (AI-PM)
  - [ ] monitor.varnaai.com (Grafana)
- [ ] Set authentication method: Email or GitHub
- [ ] Add authorized emails:
  - [ ] Your email
  - [ ] demo@varnaai.com
  - [ ] Pilot customer emails

### Start Tunnel on Server
- [ ] Update .env with CLOUDFLARE_TUNNEL_TOKEN
- [ ] Start cloudflared:
  ```bash
  docker-compose -f ops/compose/compose.shared.yml --profile edge up -d
  ```
- [ ] Verify tunnel: `docker logs varnaai_cloudflared`

---

## 📦 DAY 3: DEPLOY APPS (Priority 1)

### Deploy AgenticCoder
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/agenticcoder
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3000/health`
- [ ] Verify via tunnel: `https://app.varnaai.com`

### Deploy C3 Dashboard
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/c3-dashboard
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3001/health`
- [ ] Verify via tunnel: `https://c3.varnaai.com`

### Deploy VarnaAI Platform
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/platform
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3005/health`
- [ ] Verify via tunnel: `https://platform.varnaai.com`

---

## 📦 DAY 4: DEPLOY APPS (Priority 2)

### Deploy FwChange
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/fwchange
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3003/health`
- [ ] Verify DEMO_MODE active
- [ ] Verify via tunnel: `https://fw.varnaai.com`

### Deploy Pension/RetirementAI
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/pension
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3004/health`
- [ ] Verify YMYL disclaimers visible
- [ ] Verify DEMO_MODE active
- [ ] Verify via tunnel: `https://pension.varnaai.com`

### Deploy AI Project Manager
- [ ] Navigate to app directory:
  ```bash
  cd /opt/varnaai/apps/ai-pm
  ```
- [ ] Build and start:
  ```bash
  docker-compose up -d --build
  ```
- [ ] Check health: `curl http://localhost:3002/health`
- [ ] Verify via tunnel: `https://pm.ai-projektmanager.de`

---

## 💾 DAY 5: BACKUPS & MONITORING

### Configure Backup System
- [ ] Create S3 bucket or Hetzner Storage Box
- [ ] Update .env with backup credentials:
  - [ ] S3_BACKUP_BUCKET
  - [ ] AWS_ACCESS_KEY_ID
  - [ ] AWS_SECRET_ACCESS_KEY
  - [ ] RESTIC_PASSWORD
- [ ] Initialize Restic repository:
  ```bash
  restic init
  ```
- [ ] Test manual backup:
  ```bash
  ./ops/scripts/backup.sh
  ```
- [ ] Setup cron for daily backups:
  ```bash
  crontab -e
  # Add: 0 2 * * * /opt/varnaai/ops/scripts/backup.sh
  ```
- [ ] Test restore procedure:
  ```bash
  ./ops/scripts/test-backup-restore.sh
  ```

### Configure Monitoring Dashboards
- [ ] Access Grafana: https://monitor.varnaai.com
- [ ] Login with admin password from .env
- [ ] Import dashboards:
  - [ ] Node Exporter Full
  - [ ] Docker Container Stats
  - [ ] PostgreSQL Statistics
  - [ ] Redis Statistics
- [ ] Configure alert channels:
  - [ ] Email notifications
  - [ ] Optional: Slack/Discord webhook
- [ ] Set up alert rules:
  - [ ] Service down alerts
  - [ ] High memory usage (>90%)
  - [ ] Disk space low (<10%)
  - [ ] Backup failure

---

## ✅ DAY 6: TESTING & VALIDATION

### Run Preflight Checks
- [ ] Run comprehensive health check:
  ```bash
  ./ops/scripts/preflight-check.sh
  ```
- [ ] Fix any issues reported

### Service Validation
- [ ] Check all containers running:
  ```bash
  docker ps | grep varnaai
  ```
- [ ] Verify service health:
  - [ ] PostgreSQL: `docker exec varnaai_postgres pg_isready`
  - [ ] Redis: `docker exec varnaai_redis redis-cli ping`
  - [ ] All apps responding on health endpoints

### DNS & SSL Verification
- [ ] Test DNS resolution for all domains:
  ```bash
  for domain in app.varnaai.com c3.varnaai.com fw.varnaai.com pension.varnaai.com platform.varnaai.com pm.ai-projektmanager.de monitor.varnaai.com; do
    nslookup $domain
  done
  ```
- [ ] Verify SSL certificates (via browser)
- [ ] Test Cloudflare Access authentication

### Demo Mode Verification
- [ ] Verify DEMO_MODE=true in all apps:
  ```bash
  for app in agenticcoder c3 fwchange pension ai-pm platform; do
    docker exec varnaai_$app env | grep DEMO_MODE
  done
  ```
- [ ] Check demo banners visible on:
  - [ ] Pension app (YMYL disclaimer)
  - [ ] All other apps (demo mode indicator)
- [ ] Verify external APIs disabled
- [ ] Verify payment processing disabled

### Performance Testing
- [ ] Check resource usage:
  ```bash
  docker stats --no-stream
  ```
- [ ] Verify usage <80% for all resources
- [ ] Test page load times (<2 seconds)
- [ ] Check database connection pooling

### Security Validation
- [ ] Verify no public ports (except SSH):
  ```bash
  netstat -tuln | grep LISTEN
  ```
- [ ] Check Cloudflare Tunnel active:
  ```bash
  docker logs varnaai_cloudflared | tail -20
  ```
- [ ] Test unauthorized access (should be blocked)
- [ ] Verify security headers present

---

## 🚀 DAY 7: GO LIVE

### Seed Demo Data
- [ ] Run demo data seeding:
  ```bash
  ./ops/scripts/seed-demo-data.sh
  ```
- [ ] Create demo accounts:
  - [ ] demo@varnaai.com
  - [ ] pilot@customer.com
  - [ ] Additional pilot accounts as needed

### Final Health Check
- [ ] Run complete system validation:
  ```bash
  ./ops/scripts/health-check.sh
  ```
- [ ] Check all monitoring dashboards
- [ ] Verify backup completed successfully
- [ ] Review logs for any errors:
  ```bash
  docker-compose logs --since 1h | grep -i error
  ```

### Documentation
- [ ] Create access documentation:
  ```bash
  cat > /opt/varnaai/DEMO_ACCESS.md << 'EOF'
  # Demo Access URLs and Credentials
  [Content from PRD Section 6 - Day 7]
  EOF
  ```
- [ ] Document any deviations from PRD
- [ ] Note any issues encountered
- [ ] Create pilot onboarding guide

### Communication
- [ ] Send demo URLs to stakeholders
- [ ] Share Cloudflare Access instructions
- [ ] Provide demo credentials
- [ ] Schedule pilot demos

### Go-Live Checklist
- [ ] All apps accessible via Cloudflare Tunnel
- [ ] Demo mode active on all apps
- [ ] YMYL disclaimers visible (Pension)
- [ ] Monitoring dashboards working
- [ ] Backups configured and tested
- [ ] Demo accounts created
- [ ] Documentation complete
- [ ] Resource usage <80%
- [ ] No errors in logs
- [ ] SSL certificates valid

---

## 🔧 POST-LAUNCH

### Day 8+ Maintenance
- [ ] Daily health checks
- [ ] Monitor resource usage
- [ ] Review error logs
- [ ] Validate backup completion
- [ ] Check SSL certificate expiry

### Weekly Tasks
- [ ] Test backup restoration
- [ ] Security updates: `apt update && apt upgrade`
- [ ] Docker cleanup: `docker system prune -a`
- [ ] Review metrics and optimize
- [ ] Update demo data if needed

### Optimization Opportunities
- [ ] Analyze Grafana metrics
- [ ] Identify performance bottlenecks
- [ ] Optimize Docker resource limits
- [ ] Tune PostgreSQL settings
- [ ] Adjust Redis memory limits

---

## 🚨 EMERGENCY PROCEDURES

### If Service Down
1. [ ] Check Docker: `docker ps -a`
2. [ ] Check logs: `docker logs varnaai_[service]`
3. [ ] Restart service: `docker-compose restart [service]`
4. [ ] If persists, rollback: `./ops/scripts/rollback-app.sh [app] [version]`

### If High Memory
1. [ ] Check usage: `docker stats`
2. [ ] Restart heavy services
3. [ ] Clear Redis: `docker exec varnaai_redis redis-cli FLUSHALL`
4. [ ] Scale down non-essential services

### If Disk Full
1. [ ] Check usage: `df -h && du -sh /*`
2. [ ] Prune Docker: `docker system prune -a --volumes`
3. [ ] Move old backups to S3
4. [ ] Truncate logs if needed

### If Cloudflare Tunnel Down
1. [ ] Check tunnel status: `docker logs varnaai_cloudflared`
2. [ ] Restart tunnel: `docker restart varnaai_cloudflared`
3. [ ] Regenerate token if needed
4. [ ] Verify DNS routes in Cloudflare dashboard

---

## 📊 SUCCESS CRITERIA

### Technical Success
- [ ] Uptime >99% achieved
- [ ] Response time p95 <500ms
- [ ] Error rate <1%
- [ ] All backups successful
- [ ] No security incidents

### Business Success
- [ ] Demo sessions conducted: ___
- [ ] Pilot customers onboarded: ___
- [ ] Feedback score >7/10
- [ ] Cost maintained <€40/month
- [ ] Ready for production upgrade path

---

## 📝 NOTES SECTION

### Issues Encountered
_Document any problems and solutions here_

### Deviations from PRD
_Note any changes made during implementation_

### Lessons Learned
_What worked well, what could be improved_

### Next Steps
_Plans for optimization and scaling_

---

**Checklist Complete!** 🎉

Total Items: ~250 checkboxes
Estimated Time: 7 days
Result: Production-ready beta deployment

---