# Product Requirements Document
## Hetzner Infrastructure Consolidation + New SaaS Integration

**Version:** 1.0
**Date:** November 4, 2025
**Author:** Big Dick & Claude
**Status:** 🟡 PLANNING

---

## 1. EXECUTIVE SUMMARY

### Problem Statement
Currently running multiple apps and websites across various hosting providers with:
- Fragmented infrastructure costing $200+/month
- No unified deployment strategy
- Missed cross-sell opportunities
- No operational visibility across portfolio
- Manual deployment processes

### Proposed Solution
Consolidate entire portfolio onto single Hetzner dedicated server with:
- Unified infrastructure (<$100/month total)
- Three new revenue-generating SaaS tools
- Automated cross-sell/bundling system
- Central ops hub for all properties
- Single deployment pipeline

### Expected Outcomes
- **Cost Reduction:** $200+ → <$100/month (50% savings)
- **Revenue Increase:** +30-50% via bundling/cross-sell
- **Time Savings:** 10 hours/week operational overhead → 2 hours
- **New Revenue:** $500-2000/month from new SaaS tools
- **Simplified Operations:** 1 server, 1 backup, 1 monitoring stack

---

## 2. CURRENT STATE ANALYSIS

### Existing Portfolio

| Product | Type | Current Hosting | Monthly Cost | Status |
|---------|------|-----------------|--------------|---------|
| VarnaAI.com | Marketing Site | Unknown | ~$20 | 🔴 SEO issues |
| AI-Projektmanager.de | SaaS App | Unknown | ~$50 | 🟡 Active |
| C3 Compliance | SaaS App | Unknown | ~$50 | 🟡 Active |
| FwChange | SaaS App | Unknown | ~$50 | 🟡 Active |
| AgenticCoder | SaaS App | Unknown | ~$30 | 🟢 Development |
| RetirementAI | Consumer App | Unknown | ~$20 | 🟢 Development |
| 3 other sites | Marketing | Various | ~$30 | 🟡 Active |
| **TOTAL** | | | **~$250/month** | |

### Pain Points
1. **Cost:** $250/month for fragmented hosting
2. **Complexity:** 8+ different hosting accounts to manage
3. **Deployment:** Manual, error-prone, inconsistent
4. **Monitoring:** No unified view of system health
5. **Backup:** Inconsistent backup strategies
6. **Cross-sell:** Zero integration between properties

---

## 3. PROPOSED ARCHITECTURE

### Hetzner Server Specification

```yaml
Server: AX41-NVMe
Price: €39/month (~$42 USD)
Location: Nuremberg, Germany (EU data residency)

Hardware:
  CPU: AMD Ryzen 5 3600 (6 cores, 12 threads)
  RAM: 64 GB DDR4
  Storage: 2 × 512 GB NVMe SSD (RAID 1)
  Network: 1 Gbit/s (unlimited traffic)

Software Stack:
  OS: Ubuntu 22.04 LTS
  Container: Docker 24.0 + Docker Compose
  Proxy: Traefik 3.0 (automatic SSL)
  Database: PostgreSQL 15 (single cluster, multiple schemas)
  Cache: Redis 7.2
  Queue: Redis Queue (shared)
  Monitoring: Prometheus + Grafana
  Backup: Restic to Hetzner Storage Box
  Security: Cloudflare Tunnel + Fail2ban
```

### Network Architecture

```
Internet
    ↓
Cloudflare (CDN + WAF)
    ↓
Cloudflare Tunnel
    ↓
Traefik (Reverse Proxy)
    ├── *.varnaai.com
    ├── *.ai-projektmanager.de
    ├── *.c3-compliance.de
    ├── *.fwchange.com
    ├── *.webhookhub.dev
    └── *.statusbuddy.io
        ↓
Docker Network (Internal)
    ├── Apps Container Network
    ├── Database Network (isolated)
    └── Redis Network (isolated)
```

### Database Architecture

```sql
-- Single PostgreSQL Cluster
varnaai_production (database)
  ├── public (schema) -- shared tables
  ├── aipm (schema) -- AI Project Manager
  ├── c3 (schema) -- Compliance Command Center
  ├── fwchange (schema) -- FwChange
  ├── agenticoder (schema) -- AgenticCoder
  ├── varnaai_platform (schema) -- Platform
  ├── webhookhub (schema) -- NEW: Webhook tool
  ├── statusbuddy (schema) -- NEW: Status page tool
  └── prdigest (schema) -- NEW: PR digest tool

-- User separation
CREATE USER aipm_app WITH PASSWORD 'xxx';
GRANT ALL ON SCHEMA aipm TO aipm_app;
-- Repeat for each app
```

---

## 4. NEW SAAS PRODUCTS

### 4.1 WebhookHub (Priority 1)

**Purpose:** Webhook testing and replay tool for developers

**MVP Features (Week 1):**
- Permanent webhook URL (username.webhookhub.dev)
- Capture all incoming webhooks
- SQLite storage (100k webhooks)
- Replay to localhost or staging
- Basic auth + user registration

**V1 Features (Week 2):**
- Stripe/GitHub/Shopify parsers
- Search and filter
- Webhook history (30 days)
- Team workspaces
- Billing integration

**Tech Stack:**
- Backend: Node.js + Express
- Frontend: React + Tailwind
- Database: PostgreSQL (webhookhub schema)
- Storage: Local filesystem for payloads
- Auth: Supabase Auth or Auth0

**Revenue Model:**
- Free: 100 webhooks/month
- Pro: $19/month (10k webhooks, 30-day history)
- Team: $99/month (unlimited, 5 users)

### 4.2 StatusBuddy (Priority 2)

**Purpose:** Simple, affordable status pages

**MVP Features (Week 1):**
- 5 components to monitor
- Auto-check every 5 minutes
- Static page generation
- Custom domain support

**V1 Features (Week 2):**
- Email/SMS subscribers
- Scheduled maintenance
- Custom CSS
- API for updates
- Incident history

**Tech Stack:**
- Backend: Node.js + Fastify
- Frontend: Next.js (static export)
- Monitoring: Node-cron + Axios
- Database: PostgreSQL (statusbuddy schema)

**Revenue Model:**
- Free: 1 status page, 3 components
- Starter: $9/month (custom domain, 10 components)
- Pro: $29/month (3 pages, 50 components, API)

### 4.3 PRDigest (Priority 3)

**Purpose:** GitHub PR management via Slack

**MVP Features (Week 1):**
- GitHub webhook listener
- Daily digest to Slack
- Basic priority scoring

**V1 Features (Week 2):**
- Smart filtering
- Custom rules
- Multiple repos
- Team analytics

**Tech Stack:**
- Backend: Node.js
- Integrations: GitHub API + Slack API
- Database: PostgreSQL (prdigest schema)

**Revenue Model:**
- Free: 1 repo, daily digest
- Pro: $10/user/month
- Team: $99/month unlimited

---

## 5. IMPLEMENTATION PHASES

### Phase 0: Preparation (Week 0 - 3 days)

**Tasks:**
1. **Inventory Current Infrastructure**
   - [ ] List all current hosting accounts
   - [ ] Document DNS settings for each domain
   - [ ] Backup all databases
   - [ ] Export all environment variables
   - [ ] Document current monthly costs

2. **Hetzner Setup**
   - [ ] Order AX41-NVMe server
   - [ ] Setup payment method
   - [ ] Configure firewall rules
   - [ ] Order backup storage box (BX11, 1TB, €3.20/month)

3. **Preparation Checklist**
   - [ ] Backup all production data
   - [ ] Document all API keys/secrets
   - [ ] List all cron jobs
   - [ ] Export DNS records

**Deliverables:**
- Infrastructure inventory spreadsheet
- Backup verification
- Hetzner server access

### Phase 1: Base Infrastructure (Week 1)

**Day 1-2: Server Setup**
```bash
# Initial setup script
apt update && apt upgrade -y
apt install -y docker.io docker-compose git htop ncdu ufw fail2ban

# UFW firewall
ufw allow 22/tcp  # SSH
ufw allow 80/tcp  # HTTP
ufw allow 443/tcp # HTTPS
ufw --force enable

# Docker setup
usermod -aG docker $USER
systemctl enable docker
```

**Day 3-4: Core Services**
```yaml
# docker-compose.yml (core services)
version: '3.8'

services:
  traefik:
    image: traefik:3.0
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./traefik:/etc/traefik
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - "traefik.enable=true"

  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: ${PG_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7.2-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Day 5: Monitoring & Backup**
```yaml
# monitoring stack
grafana:
  image: grafana/grafana:latest
  volumes:
    - grafana_data:/var/lib/grafana

prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
    - prometheus_data:/prometheus
```

**Deliverables:**
- Running Traefik proxy
- PostgreSQL + Redis operational
- Monitoring dashboard live
- Automated backup configured

### Phase 2: Ops Hub Deployment (Week 2, Day 1-2)

**Deploy Central Ops Hub:**
```bash
cd /opt/varnaai
git clone [ops-hub-repo]
cd ops-hub

# Configure projects.yaml
cp projects.sample.yaml projects.yaml
# Edit with actual projects

# Deploy
docker-compose up -d ops-hub
```

**Configure Flags & Feedback:**
- Setup flag configuration for each app
- Deploy feedback widget
- Test webhook endpoints
- Configure Slack integration

**Deliverables:**
- Ops hub live at ops.varnaai.com
- Flags endpoint working
- Feedback widget deployed

### Phase 3: Migrate Existing Apps (Week 2, Day 3-7)

**Migration Order (Risk-based):**

1. **Static Sites First** (Low risk)
   - classicsecurity.net
   - aimarketingbg.com
   - varna-agenten.de

2. **Low-Traffic Apps** (Medium risk)
   - RetirementAI
   - AgenticCoder

3. **Production SaaS** (High risk - migrate on weekend)
   - FwChange
   - C3 Compliance
   - AI-Projektmanager.de

4. **Main Hub Last**
   - VarnaAI.com
   - VarnaAI Platform

**Migration Checklist per App:**
```markdown
- [ ] Dockerize application
- [ ] Test locally with production data copy
- [ ] Setup subdomain (staging.app.com)
- [ ] Deploy to Hetzner staging
- [ ] Run integration tests
- [ ] Update DNS (low TTL first)
- [ ] Monitor for 24 hours
- [ ] Update DNS to normal TTL
- [ ] Shutdown old hosting
```

### Phase 4: Build WebhookHub (Week 3)

**Day 1-2: Backend Core**
```javascript
// Webhook capture service
const express = require('express');
const { Pool } = require('pg');

app.post('/hook/:username/:project', async (req, res) => {
  await pool.query(
    'INSERT INTO webhooks (username, project, payload, headers) VALUES ($1, $2, $3, $4)',
    [username, project, req.body, req.headers]
  );
  res.json({ received: true });
});

app.post('/replay/:id', async (req, res) => {
  const webhook = await getWebhook(id);
  await forwardTo(req.body.target, webhook);
  res.json({ replayed: true });
});
```

**Day 3-4: Frontend Dashboard**
- List webhooks with search/filter
- Replay interface
- Webhook details viewer
- User settings

**Day 5: Billing Integration**
- Stripe Checkout
- Usage tracking
- Plan enforcement

**Day 6-7: Testing & Polish**
- Load testing
- Security audit
- Documentation
- ProductHunt assets

**Deliverables:**
- WebhookHub live at webhookhub.dev
- 10 beta users onboarded
- Stripe billing active
- Documentation complete

### Phase 5: Deploy StatusBuddy (Week 4, Day 1-3)

**Quick Implementation:**
- Fork existing OSS status page
- Add multi-tenant support
- Add billing
- Deploy to statusbuddy.io

**Integration:**
- Create status pages for all your apps
- Bundle with existing customers

### Phase 6: Cross-Sell Integration (Week 4, Day 4-7)

**Bundle Configuration:**

| Base Product | Included Add-ons | Upsell Add-ons |
|--------------|------------------|----------------|
| AI-PM Pro | StatusBuddy | WebhookHub (+$10) |
| C3 Enterprise | StatusBuddy, WebhookHub | - |
| FwChange | - | StatusBuddy (+$15), WebhookHub (+$10) |
| VarnaAI Platform | WebhookHub, StatusBuddy | PRDigest (+$99) |

**Implementation:**
1. Update pricing pages
2. Add in-app upsell prompts
3. Email existing customers
4. Update documentation

---

## 6. SUCCESS METRICS

### Technical Metrics

| Metric | Current | Target (30 days) | Target (90 days) |
|--------|---------|------------------|------------------|
| Infrastructure Cost | $250/month | $100/month | $100/month |
| Deployment Time | 2 hours | 30 minutes | 10 minutes |
| Uptime | Unknown | 99.5% | 99.9% |
| Page Load Time | Unknown | <2 seconds | <1 second |
| Backup Recovery Time | Unknown | <4 hours | <1 hour |

### Business Metrics

| Metric | Current | Target (30 days) | Target (90 days) |
|--------|---------|------------------|------------------|
| Total MRR | Unknown | +$500 | +$2000 |
| Bundle Adoption | 0% | 20% | 50% |
| Cross-sell Rate | 0% | 10% | 25% |
| WebhookHub Users | 0 | 50 | 500 |
| StatusBuddy Pages | 0 | 20 | 100 |

### Operational Metrics

| Metric | Current | Target (30 days) | Target (90 days) |
|--------|---------|------------------|------------------|
| Deploy Frequency | Weekly | Daily | Multiple/day |
| Mean Time to Recovery | Unknown | <30 min | <15 min |
| Monitoring Coverage | 0% | 80% | 100% |
| Automated Tests | Unknown | 50% | 80% |

---

## 7. RISK ASSESSMENT

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Medium | High | Full backups, staged migration, rollback plan |
| Hetzner server failure | Low | High | Automated backups, quick restore procedure |
| DDoS attack | Medium | Medium | Cloudflare protection, rate limiting |
| Database corruption | Low | High | Daily backups, point-in-time recovery |
| SSL certificate issues | Low | Low | Traefik auto-renewal, monitoring |

### Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Customer churn during migration | Low | Medium | Staged migration, status page, communication |
| WebhookHub doesn't get traction | Medium | Low | Low investment, pivot quickly |
| Bundle complexity confuses customers | Medium | Medium | Clear pricing, simple packages |
| Competitor copies idea | High | Low | Move fast, build moat with integrations |

---

## 8. BUDGET

### One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Domain registration (webhookhub.dev, statusbuddy.io) | $24 | Annual |
| SSL certificates | $0 | Traefik + Let's Encrypt |
| Migration time | 80 hours | Your time |
| **Total One-Time** | **$24** | |

### Monthly Recurring Costs

| Item | Cost | Notes |
|------|------|-------|
| Hetzner AX41-NVMe | $42 | Primary server |
| Hetzner Storage Box (1TB) | $3.20 | Backups |
| Cloudflare Pro | $20 | WAF + CDN |
| Domain renewals | $2 | Amortized |
| Monitoring (optional) | $0 | Self-hosted |
| **Total Monthly** | **$67.20** | |

### Revenue Projections

| Month | WebhookHub | StatusBuddy | Bundles | Total MRR |
|-------|------------|-------------|---------|-----------|
| 1 | $100 | $50 | $100 | $250 |
| 2 | $300 | $150 | $300 | $750 |
| 3 | $500 | $300 | $500 | $1,300 |
| 6 | $1,000 | $500 | $1,000 | $2,500 |

**ROI Break-even:** Month 1 (infrastructure pays for itself)
**Profit by Month 6:** $2,500 - $67 = **$2,433/month profit**

---

## 9. TIMELINE

### Week 0 (Prep)
- Day 1-3: Inventory, backups, Hetzner order

### Week 1 (Infrastructure)
- Day 1-2: Server setup
- Day 3-4: Core services
- Day 5-7: Monitoring & backup

### Week 2 (Migration)
- Day 1-2: Ops hub deployment
- Day 3-7: App migrations (staged)

### Week 3 (WebhookHub)
- Day 1-2: Backend
- Day 3-4: Frontend
- Day 5: Billing
- Day 6-7: Launch

### Week 4 (Optimization)
- Day 1-3: StatusBuddy
- Day 4-7: Cross-sell integration

### Week 5-8 (Growth)
- Marketing push
- Feature iterations
- Customer onboarding
- Performance optimization

---

## 10. LAUNCH STRATEGY

### Soft Launch (Week 3)
1. WebhookHub beta to 10 friendly users
2. Fix critical bugs
3. Refine onboarding

### ProductHunt Launch (Week 4)
1. Tuesday launch (optimal)
2. Prepared assets:
   - Demo GIF
   - Clear value prop
   - Special offer

### Marketing Channels
1. **Show HN:** "I made ngrok but with replay"
2. **Dev.to:** "Stop losing webhooks in development"
3. **Twitter/X:** Demo videos
4. **Your existing customers:** Email blast with special offer

---

## 11. DECISION POINTS

### Go/No-Go Criteria for Each Phase

**Phase 1 (Infrastructure):**
- ✅ Traefik routing works
- ✅ Database connections stable
- ✅ Monitoring operational
- **If any fail:** Debug before proceeding

**Phase 2 (Migration):**
- ✅ Staging environment matches production
- ✅ All integration tests pass
- ✅ Rollback procedure tested
- **If any fail:** Fix before DNS switch

**Phase 3 (WebhookHub):**
- ✅ Can capture and replay webhooks
- ✅ Billing integration works
- ✅ 10 beta users happy
- **If any fail:** Iterate before public launch

---

## 12. NEXT ACTIONS

### Immediate (Today)

1. **Review this PRD** - Any concerns or questions?
2. **Order Hetzner server** - AX41-NVMe
3. **Start inventory** - List all current hosting/domains
4. **Backup everything** - Don't skip this

### Tomorrow

1. **Setup Hetzner** - Initial OS and security
2. **Install Docker** - Get base infrastructure running
3. **Test Traefik** - Verify routing works

### This Week

1. **Complete Phase 1** - Base infrastructure operational
2. **Start Phase 2** - Begin app migrations
3. **WebhookHub design** - Finalize MVP features

---

## APPENDIX A: Configuration Files

### Traefik Configuration
```yaml
# traefik.yml
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

certificatesResolvers:
  cloudflare:
    acme:
      email: admin@varnaai.com
      storage: /letsencrypt/acme.json
      dnsChallenge:
        provider: cloudflare
        resolvers:
          - "1.1.1.1:53"
          - "8.8.8.8:53"

providers:
  docker:
    network: proxy
    exposedByDefault: false
```

### Docker Network Setup
```bash
# Create networks
docker network create proxy
docker network create database
docker network create redis

# Verify
docker network ls
```

---

## APPENDIX B: Migration Checklist Template

```markdown
## App: [NAME]
Migration Date: [DATE]
Current Host: [PROVIDER]
Database Size: [SIZE]

### Pre-Migration
- [ ] Full database backup
- [ ] Export environment variables
- [ ] Document current DNS settings
- [ ] List all cron jobs
- [ ] Note current monthly cost

### Migration
- [ ] Create Docker image
- [ ] Test with production data copy
- [ ] Deploy to staging subdomain
- [ ] Run integration tests
- [ ] Performance testing

### Cutover
- [ ] Lower DNS TTL (5 minutes)
- [ ] Update DNS to Hetzner
- [ ] Monitor for errors
- [ ] Verify all functions work

### Post-Migration
- [ ] Monitor for 24 hours
- [ ] Restore DNS TTL
- [ ] Cancel old hosting
- [ ] Update documentation
- [ ] Inform team/customers
```

---

## APPROVAL

**Ready to proceed?**

- [ ] PRD reviewed and approved
- [ ] Budget approved ($67/month)
- [ ] Timeline acceptable (4 weeks)
- [ ] Risks understood and accepted

**Sign-off:**
- Big Dick: _______________ Date: _______________

---

## CHANGE LOG

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Nov 4, 2025 | Initial PRD | Big Dick & Claude |

---

**Next Step:** Review this PRD, then let's order that Hetzner server and start Phase 0.