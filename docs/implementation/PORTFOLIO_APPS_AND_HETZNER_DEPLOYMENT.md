# Portfolio Apps & Hetzner Deployment Plan

**Owner**: Big Dick
**Deployment Target**: Hetzner Cloud
**Timeline**: This Week (November 2025)

---

## 🌐 YOUR CURRENT APPS (5 WordPress Sites)

### 1. 🇩🇪 AI Projektmanager Deutschland
**URL**: https://ai-projektmanager.de
**Technology**: WordPress + Kadence Blocks
**Status**: ✅ Active, optimized (4 pages with 600+ words, SEO 85+/100)
**Purpose**: KI-gestütztes Projektmanagement für deutsche Unternehmen
**Current Host**: Unknown (needs verification)
**Pages**: 11 published
**Key Features**:
- IT-Sicherheit Projektmanagement
- Compliance Management (DSGVO, NIS2)
- Enterprise Projektmanagement
- Fallstudien (Case Studies)
- Integrationen

**Missing Critical Pages**:
- ❌ Impressum (LEGALLY REQUIRED)
- ❌ Datenschutz (LEGALLY REQUIRED)
- ❌ AGB (Terms of Service)

---

### 2. 🇧🇬 AI Marketing BG
**URL**: https://aimarketingbg.com
**Technology**: WordPress
**Status**: ✅ Active
**Purpose**: KI-Marketing-Lösungen für Bulgarien
**Languages**: English/Bulgarian
**Current Host**: Unknown
**WordPress Login**: claude / QJ50uT$ZFdY%vldvV@)!dV6c

**Needs**:
- Content audit (similar to ai-projektmanager.de)
- Bulgarian language optimization
- Local SEO for Bulgaria

---

### 3. 🛡️ Classic Security
**URL**: https://classicsecurity.net
**Technology**: WordPress
**Status**: ✅ Active
**Purpose**: IT-Sicherheitsberatung seit 2010
**Current Host**: Unknown
**WordPress Login**: claude / 7E0Gd@NWLG*rAPjue9SghN2r

**Focus**:
- Enterprise IT security consulting
- Firewall migrations
- Compliance audits

---

### 4. 🤖 Varna Agenten
**URL**: https://varna-agenten.de
**Technology**: WordPress
**Status**: ✅ Active
**Purpose**: Intelligente KI-Agenten für Geschäftsprozesse (German)
**Current Host**: Unknown
**WordPress Login**: claude / 6S&15%(V8zCWL2W@1AiEsTzi

**Focus**:
- AI agents for business processes
- German market
- DSGVO-compliant AI

---

### 5. 🌍 Varna AI
**URL**: https://varnaai.com
**Technology**: WordPress
**Status**: ✅ Active
**Purpose**: DSGVO-konforme KI für europäische KMU (English)
**Current Host**: Unknown
**WordPress Login**: claude / f87lajs70)fiLXZl5j@1ycZA

**Focus**:
- GDPR-compliant AI services
- European SMBs
- International (English)

---

## 🏢 HETZNER DEPLOYMENT ARCHITECTURE

### Recommended Hetzner Setup

#### Option 1: Shared VPS (Most Cost-Effective for 5 WordPress Sites)

**Server**: Hetzner Cloud VPS
**Plan**: CPX31 or CCX23
- 4 vCPUs
- 8 GB RAM
- 160 GB SSD
- **Cost**: ~€13.90/month
- **Handles**: All 5 WordPress sites easily

**Software Stack**:
```
Ubuntu 24.04 LTS
├─ Nginx (reverse proxy + caching)
├─ PHP 8.3-FPM (WordPress)
├─ MariaDB 11.x (database)
├─ Redis (object caching)
├─ Certbot (Let's Encrypt SSL)
└─ WordOps or EasyEngine (management tool)
```

**Estimated Performance**:
- Page load time: <1 second
- Concurrent users: 500-1000
- Monthly traffic: 100K+ visits

---

#### Option 2: Managed WordPress Hosting (Easier, More Expensive)

**Service**: Hetzner Managed WordPress or use CloudPanel
**Cost**: ~€29/month for 5 sites
**Benefits**:
- Pre-configured LEMP stack
- Automatic backups
- Built-in caching
- WordPress-optimized

---

#### Option 3: Multiple Small VPS (Maximum Isolation)

**Setup**: 5 separate VPS instances
**Plan**: CX22 per site (2 vCPU, 4GB RAM)
**Cost**: 5 × €6.90 = €34.50/month
**Benefits**:
- Complete isolation
- Independent scaling
- Better security separation

**Recommendation**: ❌ Overkill for your current traffic

---

## 🚀 DEPLOYMENT PLAN (This Week)

### Day 1: Server Setup

#### Step 1: Create Hetzner Cloud Account
1. Go to https://www.hetzner.com/cloud
2. Sign up / Log in
3. Create new project: "VarnaAI Portfolio"

#### Step 2: Provision Server
```bash
# Server specs
Location: Nuremberg (Germany) or Helsinki (Finland)
Image: Ubuntu 24.04
Type: CPX31 (4 vCPU, 8GB RAM)
Networking: IPv4 + IPv6
SSH Keys: Add your SSH public key

Cost: €13.90/month
```

#### Step 3: Initial Server Hardening
```bash
# SSH to server
ssh root@<server-ip>

# Update system
apt update && apt upgrade -y

# Install firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Create sudo user (not root)
adduser bigdick
usermod -aG sudo bigdick
```

---

### Day 2: Install WordPress Stack

#### Option A: Use WordOps (Recommended - Fastest)
```bash
# Install WordOps
wget -qO wo wops.cc && sudo bash wo

# Install WordPress stack
wo stack install
wo stack install --php83

# Create site (repeat for each domain)
wo site create ai-projektmanager.de --wpfc --php83
wo site create aimarketingbg.com --wpfc --php83
wo site create classicsecurity.net --wpfc --php83
wo site create varna-agenten.de --wpfc --php83
wo site create varnaai.com --wpfc --php83
```

**What WordOps Installs**:
- Nginx with FastCGI caching
- PHP 8.3-FPM
- MariaDB database
- Redis object cache
- Let's Encrypt SSL (automatic)
- Fail2ban (security)

**Time**: ~30 minutes for all 5 sites

---

#### Option B: Manual LEMP Stack Installation
```bash
# Install Nginx
apt install nginx -y

# Install PHP 8.3
add-apt-repository ppa:ondrej/php -y
apt install php8.3-fpm php8.3-mysql php8.3-curl php8.3-gd \
  php8.3-xml php8.3-mbstring php8.3-zip php8.3-redis -y

# Install MariaDB
apt install mariadb-server -y
mysql_secure_installation

# Install Redis
apt install redis-server -y

# Install Certbot
apt install certbot python3-certbot-nginx -y
```

**Time**: ~2 hours for all 5 sites (if doing manually)

---

### Day 3: Migrate WordPress Sites

#### Migration Method 1: All-in-One WP Migration Plugin

**On Old Server** (each site):
1. Install plugin: All-in-One WP Migration
2. Go to: All-in-One WP Migration → Export
3. Download export file (e.g., `ai-projektmanager.wppress`)

**On New Hetzner Server** (each site):
1. Install fresh WordPress
2. Install plugin: All-in-One WP Migration
3. Go to: Import → Select file
4. Upload `.wppress` file
5. Wait for migration to complete

**Time**: ~20 minutes per site = 1.5 hours total

---

#### Migration Method 2: Manual Database + Files

**Export Database** (on old server):
```bash
# Export WordPress database
mysqldump -u root -p wp_aiprojectmanager > aiprojectmanager.sql

# Compress files
tar -czf wordpress-files.tar.gz /var/www/html/
```

**Import to Hetzner** (new server):
```bash
# Upload files
scp wordpress-files.tar.gz root@<hetzner-ip>:/var/www/

# Extract
cd /var/www/ai-projektmanager.de/htdocs/
tar -xzf ../../wordpress-files.tar.gz

# Import database
mysql -u root -p wp_aiprojectmanager < aiprojectmanager.sql

# Update wp-config.php
nano wp-config.php
# Change DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
```

**Time**: ~30 minutes per site = 2.5 hours total

---

### Day 4: DNS Configuration

#### Update DNS Records (for each domain)

Go to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

```
ai-projektmanager.de:
  A     @       <Hetzner-Server-IP>      TTL: 3600
  A     www     <Hetzner-Server-IP>      TTL: 3600
  AAAA  @       <Hetzner-IPv6>           TTL: 3600
  AAAA  www     <Hetzner-IPv6>           TTL: 3600

aimarketingbg.com:
  A     @       <Hetzner-Server-IP>      TTL: 3600
  A     www     <Hetzner-Server-IP>      TTL: 3600

classicsecurity.net:
  A     @       <Hetzner-Server-IP>      TTL: 3600
  A     www     <Hetzner-Server-IP>      TTL: 3600

varna-agenten.de:
  A     @       <Hetzner-Server-IP>      TTL: 3600
  A     www     <Hetzner-Server-IP>      TTL: 3600

varnaai.com:
  A     @       <Hetzner-Server-IP>      TTL: 3600
  A     www     <Hetzner-Server-IP>      TTL: 3600
```

**Propagation Time**: 1-24 hours (usually < 2 hours)

---

### Day 5: SSL Certificates & Performance Optimization

#### Install SSL Certificates
```bash
# Using Certbot (automatic with WordOps)
certbot --nginx -d ai-projektmanager.de -d www.ai-projektmanager.de
certbot --nginx -d aimarketingbg.com -d www.aimarketingbg.com
certbot --nginx -d classicsecurity.net -d www.classicsecurity.net
certbot --nginx -d varna-agenten.de -d www.varna-agenten.de
certbot --nginx -d varnaai.com -d www.varnaai.com

# Auto-renewal (runs automatically via cron)
certbot renew --dry-run
```

#### Enable Performance Features

**Redis Object Cache**:
```bash
# WordPress plugin: Redis Object Cache
# Or via wp-cli:
wp plugin install redis-cache --activate
wp redis enable
```

**Nginx FastCGI Cache** (already enabled if using WordOps):
```nginx
# /etc/nginx/sites-available/ai-projektmanager.de
fastcgi_cache_path /var/run/nginx-cache levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
```

**Expected Results**:
- Page load: <800ms (down from 1.08s)
- TTFB: <200ms
- Lighthouse score: 90+/100

---

## 📊 PERFORMANCE BENCHMARKS (Expected on Hetzner)

| Metric | Current | After Hetzner | Improvement |
|--------|---------|---------------|-------------|
| Page Load Time | 1.08s | <0.8s | ✅ 26% faster |
| TTFB | Unknown | <200ms | ✅ Server response optimized |
| Concurrent Users | Unknown | 500-1000 | ✅ High capacity |
| Monthly Cost | Unknown | €13.90 | ✅ Cost-effective |
| Uptime | Unknown | 99.9%+ | ✅ Hetzner SLA |

---

## 🔒 SECURITY HARDENING CHECKLIST

### Server-Level Security

- ✅ UFW Firewall (ports 22, 80, 443 only)
- ✅ Fail2ban (block brute-force attempts)
- ✅ SSH key authentication (disable password login)
- ✅ Non-root user with sudo
- ✅ Automatic security updates enabled

### WordPress-Level Security

- ✅ Strong passwords (already have for claude user)
- ✅ Limit login attempts (plugin: Limit Login Attempts Reloaded)
- ✅ 2FA for admin users (plugin: Two-Factor)
- ✅ Security headers (X-Frame-Options, CSP)
- ✅ Regular backups (UpdraftPlus + Hetzner Snapshots)
- ✅ Malware scanning (Wordfence or Sucuri)

### DSGVO/GDPR Compliance

- ✅ Server location: Germany (Nuremberg datacenter)
- ✅ Data processing agreement with Hetzner
- ✅ Cookie consent banner (Real Cookie Banner plugin)
- ✅ Privacy policy page (must create)
- ✅ Data deletion procedures

---

## 💰 COST BREAKDOWN

### Hetzner Server Costs (Monthly)

| Component | Plan | Cost |
|-----------|------|------|
| VPS Server | CPX31 (4 vCPU, 8GB) | €13.90 |
| Backup | 20% of server cost | €2.78 |
| Traffic | Included (20 TB/month) | €0 |
| IPv4 Address | Included | €0 |
| **Total** | | **€16.68/month** |

**Annual Cost**: €200.16/year (~$218/year)

**Cost per Site**: €3.34/month per WordPress site

### Additional Costs (Optional)

| Service | Purpose | Cost |
|---------|---------|------|
| Cloudflare Pro | CDN + DDoS protection | $20/month |
| UpdraftPlus Premium | Advanced backups | $70/year |
| Wordfence Premium | Security scanning | $99/year |
| **Optional Total** | | ~$40/month |

**Recommendation**: Start with free tier, add premium later if needed.

---

## 🎯 DEPLOYMENT TIMELINE

### Week 1 (This Week)

**Monday**: Server provisioning + setup
**Tuesday**: Install LEMP stack (Nginx, PHP, MariaDB, Redis)
**Wednesday**: Migrate all 5 WordPress sites
**Thursday**: DNS configuration + SSL certificates
**Friday**: Performance optimization + testing

**Weekend**: Monitor, fix any issues

---

### Week 2 (Next Week)

**Monday-Tuesday**: Create missing legal pages (Impressum, Datenschutz, AGB)
**Wednesday-Thursday**: Implement new navigation menu design
**Friday**: Full website audit + SEO verification

---

## 🛠️ TOOLS & COMMANDS CHEAT SHEET

### Hetzner Cloud CLI

```bash
# Install hcloud CLI
wget https://github.com/hetznercloud/cli/releases/download/v1.42.0/hcloud-linux-amd64.tar.gz
tar -xzf hcloud-linux-amd64.tar.gz
sudo mv hcloud /usr/local/bin/

# Create server
hcloud server create --name portfolio-vps --type cpx31 --image ubuntu-24.04 --ssh-key <key-id>

# List servers
hcloud server list

# Create snapshot
hcloud server create-image --description "Weekly backup" <server-id>
```

### WordPress CLI (wp-cli)

```bash
# Install wp-cli
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

# Common commands
wp core update
wp plugin update --all
wp theme update --all
wp db optimize
wp cache flush
```

### Server Monitoring

```bash
# Install monitoring
apt install htop nethogs iotop -y

# Check resource usage
htop                    # CPU/RAM
df -h                   # Disk space
free -m                 # Memory usage
netstat -tulpn          # Network connections
```

---

## 📞 SUPPORT & RESOURCES

### Hetzner Support
- **Docs**: https://docs.hetzner.com/
- **Community**: https://community.hetzner.com/
- **Support**: support@hetzner.com (Ticket system)
- **Status**: https://status.hetzner.com/

### WordPress Resources
- **WordOps Docs**: https://wordops.net/
- **WordPress CLI**: https://wp-cli.org/
- **Performance Guide**: https://wp-rocket.me/

---

## ✅ POST-DEPLOYMENT CHECKLIST

After deploying to Hetzner, verify:

- [ ] All 5 sites load correctly (https://)
- [ ] SSL certificates installed and valid
- [ ] WordPress admin login works
- [ ] All plugins activated
- [ ] Redis object cache working (`wp redis status`)
- [ ] FastCGI cache enabled
- [ ] Page load time < 1 second
- [ ] Mobile-responsive design intact
- [ ] Contact forms working
- [ ] Email delivery configured (SMTP or SendGrid)
- [ ] Backups scheduled (daily)
- [ ] Security headers present
- [ ] SEO scores maintained (Rank Math)
- [ ] Analytics tracking active (Google Analytics)
- [ ] 404 errors resolved
- [ ] Redirects configured (if URLs changed)

---

## 🚨 EMERGENCY ROLLBACK PLAN

If deployment fails or sites break:

### Option 1: DNS Rollback
```
1. Change DNS A records back to old server IP
2. Wait 1-2 hours for propagation
3. Old sites become active again
```

### Option 2: Restore from Backup
```
1. Hetzner: Server → Backups → Restore snapshot
2. WordPress: UpdraftPlus → Restore backup
3. Database: Import old SQL dump
```

### Option 3: Parallel Run
```
Keep old server running for 1 week
Test Hetzner setup with /etc/hosts override
Only switch DNS when 100% confident
```

---

**RECOMMENDATION**: Start with ai-projektmanager.de as a test case. If successful, migrate the other 4 sites.

**Questions before starting**:
1. Do you have access to current hosting control panel?
2. What's the current monthly hosting cost?
3. Do you have domain registrar access for DNS changes?
4. Do you want me to write deployment automation scripts?

Ready to begin? 🚀
