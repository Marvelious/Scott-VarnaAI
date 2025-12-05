# Three-Flow Development Strategy

**Your Goal**: Simultaneously develop new features, deploy products, and maintain live sites

---

## 🎯 **The Three Parallel Workflows**

```
┌─────────────────────┐
│  FLOW 1: LOCAL DEV  │  ← Add features, innovate
│  (New Features)     │
└──────────┬──────────┘
           │ git push
           ↓
┌─────────────────────┐
│  FLOW 2: DEPLOYMENT │  ← Ship to production
│  (VPS Deploy)       │
└──────────┬──────────┘
           │ goes live
           ↓
┌─────────────────────┐
│  FLOW 3: LIVE FIXES │  ← Monitor & maintain
│  (Online Issues)    │
└─────────────────────┘
```

---

## 📊 **Flow 1: Local Feature Development** (Windows Machine)

### **🎯 Goal**: Build new features in controlled environment

### **Products to Enhance** (Priority Order):

#### **Week 1-2: RetirementAI** (Highest ROI)
**Why First?**: Already mature, European market ready
**Features to Add**:
- ✅ German Pension Calculator (Deutsche Rentenversicherung)
- ✅ Multi-currency support (EUR, GBP, CHF)
- ✅ Cross-border tax optimization

**Local Development Process**:
```bash
cd D:\VarnaAI\pension

# Create feature branch
git checkout -b feature/german-pension-calculator

# Start local environment
docker-compose up

# Develop feature
npm run dev
# Visit: http://localhost:3000

# Test thoroughly
npm test
npm run lint

# Build production
npm run build

# Commit when ready
git add .
git commit -m "feat: add German pension calculator"
git push origin feature/german-pension-calculator
```

**Time Estimate**: 3-4 weeks (matches EUROPEAN_FEATURE_ROADMAP.md)

---

#### **Week 3-4: SEO Agent** (Highest Revenue Potential)
**Why Second?**: Can generate content for your 5 WordPress sites
**Features to Add**:
- ✅ Content generation from SEO audits
- ✅ WordPress integration (auto-publish to your 5 sites)
- ✅ Competitor backlink analysis

**Local Development Process**:
```bash
cd D:\VarnaAI\seoagent

git checkout -b feature/content-generation

# Start local services
docker-compose up

# Develop AI content generation
npm run dev

# Test with demo WordPress site
# Test endpoint: POST /api/generate-content

# Commit when tested
git add .
git commit -m "feat: add AI content generation from audits"
git push origin feature/content-generation
```

**Time Estimate**: 2-3 weeks

---

#### **Week 5-6: FwChange** (Enterprise Sales)
**Why Third?**: Big revenue opportunity, need these for sales
**Features to Add**:
- ✅ ServiceNow integration
- ✅ Multi-factor authentication (MFA)
- ✅ AI policy conflict prediction

**Local Development Process**:
```bash
cd D:\VarnaAI\fwchange

git checkout -b feature/servicenow-integration

# Start with Docker
docker-compose up

# Backend development
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend development (separate terminal)
cd frontend
npm run dev

# Test ServiceNow API integration
curl -X POST http://localhost:8000/api/v1/servicenow/test

# Commit when ready
git add .
git commit -m "feat: add ServiceNow CMDB integration"
git push origin feature/servicenow-integration
```

**Time Estimate**: 4-6 weeks (complex enterprise feature)

---

### **Local Development Best Practices**

**1. Branch Strategy**:
```bash
main                    # Production-ready code
├── feature/german-pension
├── feature/content-generation
└── feature/servicenow
```

**2. Testing Before Commit**:
```bash
# Always run before pushing
npm test                # Unit tests
npm run lint            # Code quality
npm run build           # Production build test
docker-compose up       # Integration test
```

**3. Keep Features Small**:
- ✅ One feature per branch
- ✅ Complete feature in 1-2 weeks
- ✅ Deploy small increments (easier to debug)

---

## 🚀 **Flow 2: VPS Deployment** (Hetzner Server)

### **🎯 Goal**: Ship features to production smoothly

### **Deployment Schedule** (Weekly Deploys)

**Every Friday Afternoon** (Low traffic time):
1. Merge feature branch to `main`
2. SSH to VPS
3. Pull latest code
4. Run deployment script
5. Verify health checks
6. Monitor for 30 minutes

**Deployment Checklist**:
```bash
# On VPS (SSH: ssh root@78.47.125.174)

# 1. Navigate to product
cd /opt/retirement    # or /opt/fwchange, /opt/seoagent

# 2. Backup current deployment
sudo tar -czf /opt/backups/retirement-$(date +%Y%m%d).tar.gz .

# 3. Pull latest code
git pull origin main

# 4. Deploy
sudo ./deploy.sh

# 5. Health check
curl https://demo-retirement.varnaai.com/health
# Expected: {"status": "ok"}

# 6. Monitor logs
docker-compose -f docker-compose.prod.yml logs -f

# 7. If issues, rollback
sudo tar -xzf /opt/backups/retirement-YYYYMMDD.tar.gz
docker-compose -f docker-compose.prod.yml restart
```

**Rollback Plan** (If Deployment Fails):
```bash
# Quick rollback (5 minutes)
cd /opt/retirement
git reset --hard HEAD~1  # Go back one commit
docker-compose -f docker-compose.prod.yml restart
```

---

### **Port Management** (Current Allocation)

| Product | Frontend Port | Backend Port | Domain |
|---------|--------------|--------------|--------|
| RetirementAI | 3000 | 3001 | demo-retirement.varnaai.com |
| FwChange | 5173 | 8000 | demo-fwchange.varnaai.com |
| SEO Agent | 4001 | 4002 | demo-seoagent.varnaai.com |
| VarnaAI Agents | 6000 | 6001 | demo-agents.varnaai.com |
| C3 (pending) | 3002 | 3003 | demo-c3.varnaai.com |

**Add New Product Ports**:
```bash
# Edit docker-compose.prod.yml
services:
  frontend:
    ports:
      - "7000:3000"  # New port for new product

  backend:
    ports:
      - "7001:8000"  # New backend port
```

**Update Nginx**:
```bash
sudo nano /etc/nginx/sites-available/new-product

# Add:
location / {
    proxy_pass http://localhost:7000;  # Match frontend port
}

location /api/ {
    proxy_pass http://localhost:7001;  # Match backend port
}

# Enable site
sudo ln -s /etc/nginx/sites-available/new-product /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🛠️ **Flow 3: Live Site Maintenance** (Production Issues)

### **🎯 Goal**: Keep live sites running, fix bugs quickly

### **Monitoring Strategy**

**Daily Health Checks** (Automated):
```bash
# Create health check script on VPS
sudo nano /opt/scripts/health-check.sh

#!/bin/bash
# Check all products are responding

PRODUCTS=(
    "https://demo-retirement.varnaai.com/health"
    "https://demo-fwchange.varnaai.com/api/v1/health"
    "https://demo-seoagent.varnaai.com/health"
    "https://demo-agents.varnaai.com/health"
)

for url in "${PRODUCTS[@]}"; do
    if curl -f -s "$url" > /dev/null; then
        echo "✓ $url is UP"
    else
        echo "✗ $url is DOWN - ALERT!"
        # Send email alert (optional)
        # mail -s "ALERT: $url is DOWN" your@email.com
    fi
done

# Run every hour
sudo crontab -e
# Add: 0 * * * * /opt/scripts/health-check.sh >> /var/log/health-check.log
```

**Weekly Maintenance** (Every Sunday):
```bash
# 1. Check disk space
df -h
# If >80% full, clean up old Docker images:
docker system prune -a

# 2. Update system packages
sudo apt update && sudo apt upgrade -y

# 3. Backup databases
docker-compose -f /opt/retirement/docker-compose.prod.yml exec postgres \
    pg_dump -U retirement_ai retirement_ai > /opt/backups/retirement-$(date +%Y%m%d).sql

# 4. Check SSL certificates
sudo certbot renew --dry-run

# 5. Review logs for errors
sudo tail -100 /var/log/nginx/error.log
```

---

### **Common Live Issues & Quick Fixes**

#### **Issue 1: Site is Down (503 Error)**
```bash
# Check if containers are running
ssh root@78.47.125.174
docker ps

# Restart containers
cd /opt/fwchange
docker-compose -f docker-compose.prod.yml restart

# If still down, check logs
docker-compose -f docker-compose.prod.yml logs --tail=100
```

#### **Issue 2: Database Connection Errors**
```bash
# Check PostgreSQL is running
docker-compose -f docker-compose.prod.yml ps

# Restart database
docker-compose -f docker-compose.prod.yml restart postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

#### **Issue 3: SSL Certificate Expired**
```bash
# Renew all certificates
sudo certbot renew

# Restart nginx
sudo systemctl reload nginx
```

#### **Issue 4: Out of Memory**
```bash
# Check memory usage
free -h

# Find memory-hogging containers
docker stats

# Restart specific container
docker-compose -f docker-compose.prod.yml restart backend
```

#### **Issue 5: Disk Space Full**
```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a  # Removes unused images

# Clean up old backups (keep last 7 days)
find /opt/backups -mtime +7 -delete
```

---

### **Hotfix Workflow** (Emergency Fixes)

When production is broken and needs immediate fix:

**On Local Machine**:
```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/fix-login-bug

# Make minimal fix
# Edit only the broken file(s)

# Test locally
npm test
npm run build

# Commit and push
git add .
git commit -m "hotfix: fix login bug causing 500 error"
git push origin hotfix/fix-login-bug

# Merge to main immediately
git checkout main
git merge hotfix/fix-login-bug
git push origin main
```

**On VPS** (Deploy hotfix):
```bash
ssh root@78.47.125.174
cd /opt/fwchange

# Pull hotfix
git pull origin main

# Quick deploy (skip full script)
docker-compose -f docker-compose.prod.yml up -d --build backend

# Verify fix
curl https://demo-fwchange.varnaai.com/api/v1/health

# Monitor for 5 minutes
docker-compose -f docker-compose.prod.yml logs -f backend
```

**Time to Fix**: 10-15 minutes for critical hotfix

---

## 📅 **Weekly Schedule** (Recommended)

### **Monday-Thursday**: Local Development (Flow 1)
- 🏠 Work on features locally
- ✅ Test thoroughly
- 📝 Commit to feature branches

### **Friday Afternoon**: Deployment (Flow 2)
- 🚀 Merge features to main
- 📦 Deploy to VPS
- ✅ Verify production health
- 📊 Monitor for issues

### **Saturday-Sunday**: Maintenance (Flow 3)
- 🛠️ Fix any issues from Friday deployment
- 🔍 Monitor live sites
- 📈 Check analytics/logs
- 💾 Backup databases

---

## 🎯 **Your 6-Week Roadmap** (All 3 Flows)

### **Week 1-2: RetirementAI - German Pension**
- **Flow 1** (Mon-Thu): Build German pension calculator locally
- **Flow 2** (Fri): Deploy to demo-retirement.varnaai.com
- **Flow 3** (Weekend): Monitor, fix any issues

### **Week 3-4: SEO Agent - Content Generation**
- **Flow 1** (Mon-Thu): Build AI content generator locally
- **Flow 2** (Fri): Deploy to demo-seoagent.varnaai.com
- **Flow 3** (Weekend): Test WordPress integration, fix issues

### **Week 5-6: FwChange - ServiceNow Integration**
- **Flow 1** (Mon-Thu): Build ServiceNow CMDB integration
- **Flow 2** (Fri): Deploy to demo-fwchange.varnaai.com
- **Flow 3** (Weekend): Test enterprise integration, fix bugs

**Result**: 3 major features shipped in 6 weeks

---

## 🔄 **Automation Opportunities** (Save Time)

### **1. GitHub Actions - Auto-Deploy on Push**
```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: 78.47.125.174
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/fwchange
            git pull origin main
            ./deploy.sh
```

**Benefit**: Push to GitHub → Auto-deploys to VPS (saves 10 min/deploy)

### **2. Automated Testing Before Deploy**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          npm install
          npm test
```

**Benefit**: Catch bugs before deployment (prevents broken deploys)

### **3. Automated Health Checks**
```bash
# Cron job on VPS (every 5 minutes)
*/5 * * * * /opt/scripts/health-check.sh
```

**Benefit**: Get alerted immediately when site goes down

---

## 📊 **Success Metrics** (Track Progress)

### **Flow 1: Local Development**
- ✅ Features completed per week
- ✅ Test coverage % (aim for >80%)
- ✅ Build success rate (should be 100%)

### **Flow 2: Deployment**
- ✅ Deploy frequency (weekly)
- ✅ Deploy success rate (aim for >95%)
- ✅ Time to deploy (should be <15 min)
- ✅ Rollback rate (should be <5%)

### **Flow 3: Live Maintenance**
- ✅ Uptime % (aim for >99.9%)
- ✅ Mean time to fix (MTTF) (aim for <30 min)
- ✅ Number of production incidents (aim for <2/month)

---

## 🚨 **Emergency Contact Sheet**

**VPS Access**:
- IP: 78.47.125.174
- User: root
- SSH: `ssh root@78.47.125.174`

**Product Locations on VPS**:
- RetirementAI: `/opt/retirement`
- FwChange: `/opt/fwchange`
- SEO Agent: `/opt/seoagent`
- VarnaAI Agents: `/opt/agents`

**Important Commands**:
```bash
# Quick status check
docker ps

# Restart all services
docker-compose -f docker-compose.prod.yml restart

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Emergency stop (if VPS is overloaded)
docker-compose -f docker-compose.prod.yml down
```

**Backup Locations**:
- Code backups: `/opt/backups/`
- Database backups: `/opt/backups/`

---

**Ready to Start?** Pick your first feature to build locally!

**Document Version**: 1.0
**Created**: 2025-11-24
**Next Review**: After Week 2 (first feature deployed)
