# WordPress Websites Execution Plan - Hetzner Deployment

**Owner**: Big Dick
**Timeline**: This Week (November 9-15, 2025)
**Goal**: Deploy 5 WordPress sites to Hetzner, make demo-ready

---

## 🎯 EXECUTIVE SUMMARY

**5 WordPress Marketing Sites**:
1. **ai-projektmanager.de** - German AI project management (TIER 1 - Demo Ready)
2. **varnaai.com** - English GDPR-compliant AI (TIER 1 - Demo Ready)
3. **varna-agenten.de** - German AI agents (TIER 2 - Needs Content)
4. **classicsecurity.net** - IT security consulting (TIER 2 - Needs Repositioning)
5. **aimarketingbg.com** - Bulgarian marketing (TIER 2 - Needs Bulgarian Content)

**Current Status**: All 5 sites are LIVE on unknown hosting
**Target**: Migrate to Hetzner Cloud VPS this week
**Demo Priority**: ai-projektmanager.de and varnaai.com ready for demos ASAP

---

## 📋 PHASE 1: CRITICAL FIXES BEFORE DEMO (TODAY)

### Task 1.1: Add Legal Pages to ai-projektmanager.de
**Priority**: 🔴 **CRITICAL - LEGALLY REQUIRED IN GERMANY**

**Missing Pages** (§5 TMG + DSGVO):
1. **Impressum** (Imprint)
2. **Datenschutzerklärung** (Privacy Policy)
3. **AGB** (Terms of Service)

**Action Steps**:
```
1. Use generator tools:
   - Impressum: https://www.e-recht24.de/impressum-generator.html
   - Datenschutz: https://datenschutz-generator.de/

2. Required Information:
   - Company name: TBD (What legal entity owns this?)
   - Address: TBD (Your business address)
   - Email: contact@ai-projektmanager.de
   - Phone: TBD (Your business phone)
   - VAT ID: TBD (if applicable)
   - Responsible for content: Gennadius (pseudonym)

3. Create 3 new WordPress pages:
   - /impressum/
   - /datenschutz/
   - /agb/

4. Add footer links to legal pages
```

**Status**: ⏳ **BLOCKED - Need your business details**

**Questions for Big Dick**:
- What's your legal company name?
- What's your business address?
- What's your business email?
- What's your business phone?
- Do you have a VAT ID?

---

### Task 1.2: Verify varnaai.com Legal Pages
**Priority**: 🟡 **IMPORTANT**

**Check Existing**:
```
✅ Privacy Policy - EXISTS
✅ Terms - EXISTS
✅ Cookie Policy - EXISTS
```

**Action**: Verify these pages are complete and accurate
**Timeline**: 30 minutes

---

## 📋 PHASE 2: HETZNER SERVER SETUP (MONDAY-TUESDAY)

### Task 2.1: Create Hetzner Cloud Account
**Priority**: 🔴 **CRITICAL**

**Action Steps**:
```bash
1. Go to https://www.hetzner.com/cloud
2. Sign up for account
3. Add payment method
4. Create new project: "VarnaAI WordPress Portfolio"
```

**Timeline**: 15 minutes
**Cost**: €0 (billing starts after server creation)

---

### Task 2.2: Provision Hetzner Server
**Priority**: 🔴 **CRITICAL**

**Server Specs**:
```yaml
Plan: CPX31
CPU: 4 vCPU
RAM: 8 GB
Storage: 160 GB SSD
Location: Nuremberg, Germany (or Helsinki, Finland)
Image: Ubuntu 24.04 LTS
Networking: IPv4 + IPv6
Cost: €13.90/month
```

**Action Steps**:
```bash
# Create server via Hetzner Cloud Console
1. Click "Add Server"
2. Select "Ubuntu 24.04"
3. Select "CPX31" plan
4. Choose "Nuremberg" location (DE) or "Helsinki" (FI)
5. Add SSH key (if you have one)
6. Name: "varnaai-wordpress-vps"
7. Click "Create & Buy Now"

# Note the server IP address
# Example: 95.217.123.456
```

**Timeline**: 5 minutes
**Status**: ⏳ **WAITING FOR YOU TO CREATE**

---

### Task 2.3: Initial Server Hardening
**Priority**: 🔴 **CRITICAL - SECURITY**

**Action Steps**:
```bash
# SSH to server (use Hetzner web console if no SSH key)
ssh root@<server-ip>

# Update system
apt update && apt upgrade -y

# Install firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Create sudo user (NOT root)
adduser bigdick
usermod -aG sudo bigdick

# Switch to new user
su - bigdick
```

**Timeline**: 10 minutes
**Security**: ✅ Basic hardening complete

---

## 📋 PHASE 3: INSTALL WORDPRESS STACK (TUESDAY-WEDNESDAY)

### Task 3.1: Install WordOps (Recommended - Fast)
**Priority**: 🟡 **RECOMMENDED**

**Why WordOps**:
- ✅ Installs Nginx + PHP + MariaDB + Redis automatically
- ✅ SSL certificates (Let's Encrypt) automatic
- ✅ FastCGI caching built-in
- ✅ WordPress-optimized configuration
- ✅ Creates all 5 sites in ~30 minutes

**Action Steps**:
```bash
# Install WordOps
wget -qO wo wops.cc && sudo bash wo

# Install WordPress stack
wo stack install
wo stack install --php83

# Create site for each domain (repeat 5 times)
wo site create ai-projektmanager.de --wpfc --php83
wo site create aimarketingbg.com --wpfc --php83
wo site create classicsecurity.net --wpfc --php83
wo site create varna-agenten.de --wpfc --php83
wo site create varnaai.com --wpfc --php83

# WordOps automatically:
# - Installs WordPress
# - Creates database
# - Configures Nginx
# - Enables FastCGI cache
# - Creates wp-config.php
# - Sets up SSL (after DNS points to server)
```

**Timeline**: 30 minutes for all 5 sites
**What You Get**:
- Nginx with FastCGI caching
- PHP 8.3-FPM
- MariaDB database
- Redis object cache
- Let's Encrypt SSL (automatic)
- Fail2ban (security)

---

### Task 3.2: Manual LEMP Stack (Alternative - If WordOps Fails)
**Priority**: 🟢 **BACKUP OPTION**

**Only use if WordOps doesn't work**

**Action Steps**:
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

# Install Certbot (SSL)
apt install certbot python3-certbot-nginx -y
```

**Timeline**: 2 hours for all 5 sites (manual configuration)
**Recommendation**: ❌ **Use WordOps instead** (faster, easier)

---

## 📋 PHASE 4: MIGRATE WORDPRESS SITES (WEDNESDAY-THURSDAY)

### Task 4.1: Export from Current Hosting
**Priority**: 🔴 **CRITICAL**

**Method 1: All-in-One WP Migration Plugin (RECOMMENDED)**

**On CURRENT server (each site)**:
```
1. Login to WordPress: https://ai-projektmanager.de/wp-admin/
   Username: claude
   Password: KHBFm8LL6tRqFwhZS8O(RtNx

2. Install plugin: "All-in-One WP Migration"
   - Plugins → Add New → Search "All-in-One WP Migration"
   - Install & Activate

3. Export site:
   - All-in-One WP Migration → Export
   - Export to → File
   - Download .wppress file (e.g., ai-projektmanager.wppress)

4. Repeat for all 5 sites
```

**Timeline**: 20 minutes per site = 1.5 hours total

**Files to Download**:
- `ai-projektmanager.wppress` (~500MB estimate)
- `aimarketingbg.wppress`
- `classicsecurity.wppress`
- `varna-agenten.wppress`
- `varnaai.wppress`

---

### Task 4.2: Import to Hetzner Server
**Priority**: 🔴 **CRITICAL**

**On NEW Hetzner server (each site)**:
```
1. Access fresh WordPress install:
   - WordOps creates default admin user
   - Check: wo site info ai-projektmanager.de

2. Install plugin: "All-in-One WP Migration"

3. Import site:
   - All-in-One WP Migration → Import
   - Import from → File
   - Upload .wppress file
   - Wait for import (5-10 minutes per site)
   - Click "Permalink Structure" after import

4. Verify site works:
   - Check homepage loads
   - Check admin login works
   - Verify all pages and images
```

**Timeline**: 20 minutes per site = 1.5 hours total

---

### Task 4.3: Manual Migration (Backup Method)
**Priority**: 🟢 **ONLY IF PLUGIN FAILS**

**Export Database**:
```bash
# On old server (via SSH or phpMyAdmin)
mysqldump -u root -p wp_aiprojectmanager > aiprojectmanager.sql

# Compress files
tar -czf wordpress-files.tar.gz /var/www/html/
```

**Import to Hetzner**:
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
# Change: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
```

**Timeline**: 30 minutes per site = 2.5 hours total
**Recommendation**: ❌ **Use Plugin Method** (easier)

---

## 📋 PHASE 5: DNS CONFIGURATION (THURSDAY)

### Task 5.1: Update DNS Records
**Priority**: 🔴 **CRITICAL**

**For EACH domain** (at your domain registrar):

**ai-projektmanager.de**:
```dns
Type    Name    Value                   TTL
A       @       <Hetzner-Server-IP>     3600
A       www     <Hetzner-Server-IP>     3600
AAAA    @       <Hetzner-IPv6>          3600
AAAA    www     <Hetzner-IPv6>          3600
```

**Repeat for**:
- aimarketingbg.com
- classicsecurity.net
- varna-agenten.de
- varnaai.com

**Timeline**: 5 minutes per domain = 25 minutes
**Propagation**: 1-24 hours (usually < 2 hours)

---

### Task 5.2: Install SSL Certificates
**Priority**: 🔴 **CRITICAL - HTTPS REQUIRED**

**Action Steps**:
```bash
# Using Certbot (automatic with WordOps)
certbot --nginx -d ai-projektmanager.de -d www.ai-projektmanager.de
certbot --nginx -d aimarketingbg.com -d www.aimarketingbg.com
certbot --nginx -d classicsecurity.net -d www.classicsecurity.net
certbot --nginx -d varna-agenten.de -d www.varna-agenten.de
certbot --nginx -d varnaai.com -d www.varnaai.com

# Auto-renewal test
certbot renew --dry-run
```

**Timeline**: 5 minutes per domain = 25 minutes
**Result**: ✅ HTTPS enabled for all sites

---

## 📋 PHASE 6: PERFORMANCE OPTIMIZATION (FRIDAY)

### Task 6.1: Enable Redis Object Cache
**Priority**: 🟡 **RECOMMENDED**

**Action Steps** (on each site):
```bash
# WordPress admin → Plugins → Add New
# Search: "Redis Object Cache"
# Install & Activate

# Or via wp-cli:
wp plugin install redis-cache --activate
wp redis enable
```

**Timeline**: 5 minutes per site = 25 minutes
**Result**: ✅ Faster page loads (30-50% improvement)

---

### Task 6.2: Configure FastCGI Cache
**Priority**: 🟡 **RECOMMENDED**

**Already Done** (if using WordOps):
```nginx
# /etc/nginx/sites-available/ai-projektmanager.de
fastcgi_cache_path /var/run/nginx-cache levels=1:2
  keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
```

**Timeline**: ✅ Automatic with WordOps
**Result**: ✅ Page load < 800ms (down from 1.08s)

---

### Task 6.3: Performance Testing
**Priority**: 🟢 **NICE TO HAVE**

**Action Steps**:
```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s https://ai-projektmanager.de

# Or use online tools:
# - https://pagespeed.web.dev/
# - https://gtmetrix.com/
```

**Expected Results**:
| Metric | Current | After Hetzner | Target |
|--------|---------|---------------|--------|
| Page Load | 1.08s | <0.8s | ✅ 26% faster |
| TTFB | Unknown | <200ms | ✅ Optimized |
| Lighthouse | Unknown | 90+/100 | ✅ Excellent |

---

## 📋 PHASE 7: NEW NAVIGATION MENU (WEEKEND)

### Task 7.1: Implement Mega Menu (ai-projektmanager.de)
**Priority**: 🟡 **IMPORTANT**

**Current Navigation** (Basic):
```
Home | Features | Pricing | About | Blog
```

**New Navigation** (Mega Menu):
```
Produkt ▼ | Lösungen ▼ | Ressourcen ▼ | Über uns ▼ | [CTA: Kostenlos testen]
```

**Mega Menu Structure** (from COMPLETE_WEBSITE_AUDIT_AND_DESIGN.md):

**Produkt** dropdown:
- Features
- Integrationen
- Sicherheit
- Preise

**Lösungen** dropdown:
- IT-Sicherheit
- Compliance Management
- Enterprise Projektmanagement

**Ressourcen** dropdown:
- Blog
- Fallstudien
- Dokumentation
- Support

**Über uns** dropdown:
- Unser Team
- Karriere
- Kontakt

**Action Steps**:
```
1. WordPress admin → Design → Menüs
2. Create new menu: "Hauptnavigation 2025"
3. Add menu items with hierarchies
4. Set mega menu structure (may need plugin like "Max Mega Menu")
5. Assign to "Primary Navigation" location
```

**Timeline**: 1 hour per site
**Plugin**: Max Mega Menu (free) or Kadence Menu (if using Kadence theme)

---

### Task 7.2: Mobile Hamburger Menu
**Priority**: 🟡 **IMPORTANT - MOBILE UX**

**Implementation**:
```css
/* Mobile hamburger icon (☰) */
@media (max-width: 768px) {
  .mega-menu {
    display: none; /* Hide desktop menu */
  }
  .mobile-hamburger {
    display: block; /* Show hamburger */
  }
}
```

**Timeline**: ✅ Automatic with most WordPress themes
**Test**: Resize browser to mobile width, verify menu works

---

## 📋 PHASE 8: PORTFOLIO FOOTER (WEEKEND)

### Task 8.1: Add Portfolio Network Footer
**Priority**: 🟢 **NICE TO HAVE**

**Already Done**: ai-projektmanager.de has portfolio footer
**Action**: Copy to other 4 sites

**Portfolio Footer Content**:
```html
<h3>Unser Portfolio-Netzwerk</h3>
<p>Europäische KI & IT-Sicherheitslösungen seit 2010</p>

🛡️ Classic Security - IT-Sicherheitsberatung seit 2010
🤖 Varna AI - DSGVO-konforme KI für europäische KMU
📊 AI Projektmanager - KI-gestützte Projektplanung für deutsche Unternehmen
⚡ Varna Agenten - Intelligente KI-Agenten für Geschäftsprozesse
📈 AI Marketing BG - KI-Marketing-Lösungen für Bulgarien

🇪🇺 Vertraut von 5.000+ europäischen KMU • DSGVO-konform • EU-gehostet
```

**Timeline**: 30 minutes to copy to all sites

---

## 🚨 CRITICAL QUESTIONS FOR BIG DICK

Before we can proceed, I need answers to:

### Legal Information (for Impressum):
1. **Company Name**: What's your legal entity name?
2. **Business Address**: What's your business address? (required by German law)
3. **Business Email**: contact@ai-projektmanager.de or different?
4. **Business Phone**: Your business phone number?
5. **VAT ID**: Do you have a VAT ID? (if selling services)
6. **Responsible Person**: "Gennadius" as pseudonym - is this OK for legal pages?

### Domain Registrar Access:
7. **Where are domains registered**: Namecheap? GoDaddy? Cloudflare? Other?
8. **Do you have registrar login**: Need access to update DNS records

### Current Hosting:
9. **Current hosting provider**: Where are the 5 WordPress sites hosted now?
10. **Do you have SSH/FTP access**: Need to export sites or use plugin method?
11. **cPanel/Admin access**: Do you have admin panel access?

### Hetzner Account:
12. **Do you have Hetzner account**: Or should I create one for you?
13. **Payment method ready**: Credit card for Hetzner billing?

---

## 📊 TIMELINE SUMMARY

| Phase | Days | Tasks | Blocker |
|-------|------|-------|---------|
| Phase 1: Legal Pages | TODAY | Impressum, Datenschutz, AGB | ⏳ Need your business info |
| Phase 2: Hetzner Setup | Mon-Tue | Account, server, hardening | ⏳ Need you to create account |
| Phase 3: WordPress Stack | Tue-Wed | Install WordOps/LEMP | ✅ Ready after Phase 2 |
| Phase 4: Site Migration | Wed-Thu | Export/Import all 5 sites | ✅ Ready after Phase 3 |
| Phase 5: DNS & SSL | Thu | Update DNS, install SSL | ⏳ Need registrar access |
| Phase 6: Performance | Fri | Redis, caching, testing | ✅ Ready after Phase 5 |
| Phase 7: Navigation | Weekend | Mega menus, mobile | ✅ Ready after Phase 5 |
| Phase 8: Portfolio Footer | Weekend | Cross-site footer | ✅ Ready after Phase 5 |

**Total Timeline**: 7 days (1 week)
**Blockers**: 3 items need your input/action

---

## ✅ WHAT I CAN DO RIGHT NOW

**Without Waiting for You**:
1. ✅ Generate Impressum/Datenschutz templates (generic)
2. ✅ Create WordPress mega menu HTML structure
3. ✅ Write Hetzner deployment scripts
4. ✅ Document DNS record configurations
5. ✅ Prepare performance optimization checklist

**What I'm Blocked On**:
1. ⏳ Creating actual Impressum (need your business details)
2. ⏳ Hetzner server setup (need you to create account)
3. ⏳ DNS updates (need your registrar access)
4. ⏳ Site migration (need current hosting access)

---

## 🎯 NEXT IMMEDIATE ACTIONS

**FOR YOU (Big Dick)**:
1. Provide business information for Impressum (company name, address, email, phone)
2. Create Hetzner Cloud account → https://www.hetzner.com/cloud
3. Share domain registrar login (for DNS updates)
4. Share current hosting access (for site export)

**FOR ME (Claude)**:
1. Generate Impressum/Datenschutz templates once you provide info
2. Create Hetzner deployment scripts
3. Prepare migration checklist
4. Design mega menu HTML/CSS

---

**Ready to proceed? What information can you provide first?**
