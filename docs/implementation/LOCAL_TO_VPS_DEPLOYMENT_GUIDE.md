# Complete Local Development → VPS Deployment Guide

**Your VPS**: Hetzner @ 78.47.125.174
**Running Products**: RetirementAI, FwChange, SEO Agent, VarnaAI Agents
**OS**: Ubuntu 22.04 LTS

---

## 🎯 **The Complete Workflow**

```
Local Dev (Windows) → Git Push → VPS Pull → Docker Deploy → Live Site
     D:\VarnaAI\          GitHub        Hetzner        Containers    demo-*.varnaai.com
```

---

## 📝 **Step-by-Step: Code Locally, Deploy to VPS**

### **Phase 1: Local Development** (Windows - Your Machine)

#### **1.1 Choose Your Product**
```bash
cd D:\VarnaAI\pension       # RetirementAI
cd D:\VarnaAI\fwchange      # FwChange
cd D:\VarnaAI\seoagent      # SEO Agent
cd D:\VarnaAI\Webscrap      # VarnaAI Agents
cd D:\VarnaAI\dashboard     # C3 (pending)
```

#### **1.2 Start Local Development Environment**

**Option A: Using Docker Compose** (Recommended)
```bash
# Start all services (frontend, backend, database, Redis)
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop when done
docker-compose down
```

**Option B: Manual Setup** (If no Docker)
```bash
# Backend (example: Node.js)
cd backend
npm install
npm run dev

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

#### **1.3 Make Your Code Changes**
- Edit files in your code editor (VS Code, etc.)
- Test locally at `http://localhost:3000` (or whatever port)
- Run tests: `npm test`
- Check for errors: `npm run lint`

#### **1.4 Commit Your Changes**
```bash
# Check what changed
git status

# Add files
git add .

# Commit with message
git commit -m "feat: add German pension calculator"

# Push to GitHub
git push origin main
```

---

### **Phase 2: Prepare for Deployment**

#### **2.1 Update Production Environment File**

Each product has a `.env.production.example`. Copy and configure:

```bash
# Example for FwChange
cp .env.production.example .env.production
nano .env.production
```

**Critical Settings to Configure:**
```bash
# Security
SECRET_KEY=your-random-32-char-hex-key    # Generate: openssl rand -hex 32
POSTGRES_PASSWORD=super-secure-password

# Domain
CORS_ORIGINS=https://demo-fwchange.varnaai.com

# Features
DISABLE_SIGNUP=true   # Disable public signups in production

# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/fwchange

# Redis Cache
REDIS_URL=redis://redis:6379/0
```

**Generate Secure Keys:**
```bash
# Windows PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Linux/Mac (if you SSH to VPS)
openssl rand -hex 32
```

#### **2.2 Test Production Build Locally**
```bash
# Build production version
npm run build

# Test production build
docker-compose -f docker-compose.prod.yml up --build

# If it works locally, it will work on VPS
```

---

### **Phase 3: Deploy to Hetzner VPS**

#### **3.1 SSH into Your VPS**
```bash
# From Windows (PowerShell or Git Bash)
ssh root@78.47.125.174

# First time? You'll need to accept fingerprint (type 'yes')
```

**IMPORTANT**: Save VPS password in password manager!

#### **3.2 Navigate to Product Directory**

Your VPS should have products in these locations:
```bash
/opt/retirement/       # RetirementAI
/opt/fwchange/         # FwChange
/opt/seoagent/         # SEO Agent
/opt/agents/           # VarnaAI Agents
/opt/c3/               # C3 (when ready)
```

Choose product and navigate:
```bash
cd /opt/fwchange   # Example: deploying FwChange
```

#### **3.3 Pull Latest Code from GitHub**
```bash
# Pull latest changes
git pull origin main

# If first time deploying this product:
# git clone https://github.com/yourusername/fwchange.git /opt/fwchange
```

#### **3.4 Run Deployment Script**

**If product has deploy.sh** (FwChange, RetirementAI have this):
```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

**What the script does**:
1. ✅ Checks if Docker is installed (installs if needed)
2. ✅ Creates deployment user (`fwchange`, `retirement`, etc.)
3. ✅ Backs up existing deployment
4. ✅ Copies new code to deployment directory
5. ✅ Builds Docker containers
6. ✅ Runs database migrations
7. ✅ Starts services
8. ✅ Performs health checks

**If NO deploy.sh** (manual deployment):
```bash
# Copy .env.production to .env
cp .env.production .env

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d --build

# Run database migrations (if applicable)
docker-compose -f docker-compose.prod.yml exec backend npm run db:migrate

# Or for Python backend:
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head
```

#### **3.5 Verify Deployment**
```bash
# Check containers are running
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check health endpoint (example)
curl http://localhost:8000/health

# Check frontend is accessible
curl http://localhost:5173
```

---

### **Phase 4: Configure Nginx Reverse Proxy** (One-Time Setup)

Your VPS runs Nginx to route traffic to the correct product based on domain.

#### **4.1 Nginx Configuration Location**
```bash
# Nginx configs are typically here:
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
```

#### **4.2 Example Nginx Config** (for demo-fwchange.varnaai.com)

Create/edit: `/etc/nginx/sites-available/fwchange`

```nginx
server {
    listen 80;
    server_name demo-fwchange.varnaai.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name demo-fwchange.varnaai.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/demo-fwchange.varnaai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo-fwchange.varnaai.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Frontend (React/Vue/Next.js)
    location / {
        proxy_pass http://localhost:5173;  # Frontend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;  # Backend port
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/fwchange /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

#### **4.3 Setup SSL (HTTPS) with Let's Encrypt**
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d demo-fwchange.varnaai.com

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

---

### **Phase 5: Port Management** (Which Product Uses Which Port)

You need to ensure each product runs on a different port to avoid conflicts.

**Current Port Allocation** (based on your setup):
```
RetirementAI:
  - Frontend: 3000
  - Backend: 3001 (Next.js API routes)

FwChange:
  - Frontend: 5173
  - Backend: 8000

SEO Agent:
  - Frontend: 4001
  - Backend: 4002

VarnaAI Agents:
  - Frontend: 6000
  - Backend: 6001

C3 (when ready):
  - Frontend: 3001
  - Backend: 3000
```

**How to Check Port Availability:**
```bash
# On VPS, check what's listening on a port
sudo netstat -tulpn | grep :3000

# If port is taken, either:
# 1. Stop that service
# 2. Change your product to use different port in docker-compose.prod.yml
```

**How to Change Port in Docker Compose:**

Edit `docker-compose.prod.yml`:
```yaml
services:
  frontend:
    ports:
      - "5173:5173"  # Change left number (host port)

  backend:
    ports:
      - "8000:8000"  # Change left number (host port)
```

---

## 🚀 **Quick Reference Commands**

### **On Your Local Machine (Windows)**

```bash
# Start development
docker-compose up

# Run tests
npm test

# Build production
npm run build

# Commit and push
git add .
git commit -m "feat: description"
git push origin main
```

### **On VPS (via SSH)**

```bash
# SSH into VPS
ssh root@78.47.125.174

# Navigate to product
cd /opt/fwchange

# Pull latest code
git pull origin main

# Deploy
sudo ./deploy.sh

# Manual deployment
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check running containers
docker ps

# Restart a service
docker-compose -f docker-compose.prod.yml restart backend

# Stop everything
docker-compose -f docker-compose.prod.yml down
```

### **Nginx Commands**

```bash
# Test nginx config
sudo nginx -t

# Reload nginx (apply config changes)
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔧 **Common Deployment Issues & Fixes**

### **Issue 1: Port Already in Use**
```bash
# Error: "bind: address already in use"

# Fix: Find what's using the port
sudo netstat -tulpn | grep :8000

# Kill the process
sudo kill -9 <PID>

# Or change port in docker-compose.prod.yml
```

### **Issue 2: Database Connection Failed**
```bash
# Error: "could not connect to database"

# Fix: Check PostgreSQL is running
docker-compose -f docker-compose.prod.yml ps

# Restart database
docker-compose -f docker-compose.prod.yml restart postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

### **Issue 3: 502 Bad Gateway (Nginx)**
```bash
# Error: Nginx shows 502 when accessing site

# Fix: Backend is not running or wrong port
docker-compose -f docker-compose.prod.yml ps

# Check nginx config points to correct port
sudo nano /etc/nginx/sites-available/fwchange

# Check backend logs
docker-compose -f docker-compose.prod.yml logs backend
```

### **Issue 4: Environment Variables Not Loading**
```bash
# Error: "SECRET_KEY not found"

# Fix: Ensure .env file exists
ls -la /opt/fwchange/.env

# Copy from .env.production
cp .env.production .env

# Restart containers to pick up changes
docker-compose -f docker-compose.prod.yml restart
```

### **Issue 5: SSL Certificate Expired**
```bash
# Error: "SSL certificate has expired"

# Fix: Renew certificate
sudo certbot renew

# Restart nginx
sudo systemctl reload nginx
```

---

## 📋 **Deployment Checklist**

Before deploying to production, verify:

- [ ] Code tested locally (`npm test` passes)
- [ ] Production build works (`npm run build` succeeds)
- [ ] `.env.production` configured with secure secrets
- [ ] Database migrations ready (if schema changed)
- [ ] Git committed and pushed to GitHub
- [ ] SSH access to VPS working
- [ ] Ports available on VPS (no conflicts)
- [ ] Nginx config created for domain
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] Backup of previous deployment created
- [ ] Health checks pass after deployment
- [ ] Logs show no errors

---

## 🎯 **Typical Deployment Flow** (Real Example)

**Scenario**: You added German pension calculator to RetirementAI

### **On Your Local Machine:**
```bash
# 1. Make changes
cd D:\VarnaAI\pension
code .  # Edit files in VS Code

# 2. Test locally
npm run dev
# Visit http://localhost:3000, test German pension calculator

# 3. Run tests
npm test

# 4. Build production
npm run build

# 5. Commit
git add .
git commit -m "feat: add German pension calculator (Deutsche Rentenversicherung)"
git push origin main
```

### **On VPS (SSH):**
```bash
# 1. SSH in
ssh root@78.47.125.174

# 2. Navigate to product
cd /opt/retirement

# 3. Pull latest code
git pull origin main

# 4. Deploy
sudo ./deploy.sh

# 5. Verify
curl https://demo-retirement.varnaai.com/health
# Should return: {"status": "ok"}

# 6. Check logs
docker-compose -f docker-compose.prod.yml logs -f

# 7. Test feature
# Visit https://demo-retirement.varnaai.com and test German pension calculator
```

**Total Time**: 5-10 minutes for full deployment

---

## 🔄 **Automated Deployment** (Next Level)

Want to deploy automatically when you push to GitHub?

### **Option 1: GitHub Actions** (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: 78.47.125.174
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/fwchange
            git pull origin main
            sudo ./deploy.sh
```

**Setup**:
1. Generate SSH key on your local machine
2. Add public key to VPS: `~/.ssh/authorized_keys`
3. Add private key to GitHub Secrets: Settings → Secrets → SSH_PRIVATE_KEY
4. Push code → GitHub Actions deploys automatically

### **Option 2: Webhook Deployment**

Set up a webhook endpoint on VPS that GitHub calls when you push:

```bash
# Install webhook listener on VPS
sudo apt install webhook

# Configure webhook
sudo nano /etc/webhook.conf
```

---

## 📚 **Additional Resources**

**Your Existing Deployment Docs:**
- FwChange: `D:\VarnaAI\fwchange\DEPLOYMENT.md`
- FwChange Quick: `D:\VarnaAI\fwchange\QUICK-DEPLOY.md`
- C3 Dashboard: `D:\VarnaAI\dashboard\DEPLOYMENT_GUIDE.md`

**External Resources:**
- Docker Compose Docs: https://docs.docker.com/compose/
- Nginx Reverse Proxy: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
- Let's Encrypt: https://letsencrypt.org/getting-started/
- GitHub Actions: https://docs.github.com/en/actions

---

**Questions?**
- Check product-specific DEPLOYMENT.md in each project folder
- SSH to VPS and check logs: `docker-compose logs -f`
- Nginx logs: `/var/log/nginx/error.log`

**Document Version**: 1.0
**Last Updated**: 2025-11-24
**VPS IP**: 78.47.125.174 (Hetzner)
