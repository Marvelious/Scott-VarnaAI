# ABOUTME: Actionable deployment checklist for Hetzner VPS operations
# ABOUTME: Execute these commands via SSH to complete infrastructure setup

# Hetzner VPS Deployment Actions

**Server**: 78.47.125.174
**Date**: 2025-11-24
**User**: Big Dick

---

## 🔴 URGENT: C3 Compliance Site Down

### Check C3 Status
```bash
# SSH into Hetzner VPS
ssh root@78.47.125.174

# Check if C3 container is running
docker ps | grep c3

# Check C3 container logs
docker logs c3-frontend --tail 50
docker logs c3-backend --tail 50

# Check Traefik routing
docker logs traefik --tail 50 | grep c3

# Restart C3 if needed
docker-compose -f /opt/varnaai/docker-compose.yml restart c3-frontend c3-backend
```

**Expected Result**: C3 accessible at https://c3.varnaai.com/

---

## 1️⃣ Security Hardening (PRIORITY)

### Run Master Security Script
```bash
cd /root  # or wherever you want to store scripts

# Download security scripts
mkdir -p /opt/security-hardening
cd /opt/security-hardening

# Copy scripts from Windows to VPS (use WinSCP or similar)
# Or create them directly on VPS from the files in:
# D:\VarnaAI\Websites\operations\security\

# Make executable
chmod +x *.sh

# Run master hardening script
./harden-vps.sh
```

### Security Scripts Checklist
- [ ] `01-ssh-hardening.sh` - Disable password auth, strong ciphers
- [ ] `02-ufw-firewall.sh` - Default deny, allow 22/80/443
- [ ] `03-fail2ban.sh` - Protect against brute force
- [ ] `04-auto-updates.sh` - Unattended security patches
- [ ] `05-security-audit.sh` - Lynis security audit

**Expected Result**: SSH key-only, firewall active, fail2ban monitoring

---

## 2️⃣ Monitoring Setup

### UptimeRobot Configuration

**Create monitors for these URLs:**
1. https://demo-retirement.varnaai.com/ (RetirementAI)
2. https://demo-fwchange.varnaai.com/ (FwChange)
3. https://demo-seoagent.varnaai.com/ (SEO Agent)
4. https://demo-agents.varnaai.com/ (VarnaAI Agents)
5. https://c3.varnaai.com/ (C3 Compliance)

**Monitor Settings:**
- Monitor Type: HTTPS
- Check Interval: 5 minutes
- Alert Contacts: [Your email/SMS]
- HTTP Method: GET (or HEAD for faster checks)

**Reference**: `D:\VarnaAI\Websites\operations\monitoring\UPTIMEROBOT_CONFIG.md`

### Health Check Endpoints (Future Enhancement)
Add `/health` endpoints to each app for more reliable monitoring:
- https://demo-retirement.varnaai.com/api/health
- https://demo-fwchange.varnaai.com/api/health
- etc.

---

## 3️⃣ Backup Automation

### Install Backup Script
```bash
# Create backup directory
mkdir -p /opt/backups
cd /opt/backups

# Copy backup script from Windows
# Source: D:\VarnaAI\Websites\operations\backup\backup-docker-volumes.sh

# Make executable
chmod +x backup-docker-volumes.sh

# Test backup manually
./backup-docker-volumes.sh

# Verify backup created
ls -lh /opt/backups/
```

### Schedule Daily Backups
```bash
# Edit crontab
crontab -e

# Add daily backup at 3 AM
0 3 * * * /opt/backups/backup-docker-volumes.sh >> /var/log/docker-backup.log 2>&1

# Verify cron job added
crontab -l
```

### Backup Verification
```bash
# Check latest backup
ls -lh /opt/backups/ | tail -5

# Test restoration (see RESTORATION_GUIDE.md)
# Source: D:\VarnaAI\Websites\operations\backup\RESTORATION_GUIDE.md
```

**Expected Result**: Daily backups at 3 AM, 7-day retention

---

## 4️⃣ Post-Deployment Verification

### Test All Services
```bash
# Check all containers running
docker ps

# Expected containers:
# - traefik
# - c3-frontend, c3-backend
# - fwchange-frontend, fwchange-backend
# - retirement-ai
# - seoagent
# - agents

# Check resource usage
docker stats --no-stream

# Check disk space
df -h

# Check memory
free -h
```

### External Access Tests
Run from your local machine:
```bash
# Test all sites
curl -I https://demo-retirement.varnaai.com/
curl -I https://demo-fwchange.varnaai.com/
curl -I https://demo-seoagent.varnaai.com/
curl -I https://demo-agents.varnaai.com/
curl -I https://c3.varnaai.com/

# All should return 200 OK with valid SSL
```

### Security Headers Verification
```bash
# Check security headers (should show HSTS, X-Frame-Options, CSP, etc.)
curl -I https://demo-retirement.varnaai.com/ | grep -E 'strict-transport|x-frame|x-content-type|x-xss'
```

---

## 5️⃣ Documentation Updates

### Update Deployment Status
After completing tasks, update:
- `D:\VarnaAI\Websites\operations\DEPLOYMENT_VERIFICATION_REPORT.md`
- Mark tasks as complete
- Add any issues encountered
- Document any configuration changes

### Files to Review
- `operations/security/README.md` - Security implementation details
- `operations/backup/README.md` - Backup procedures
- `operations/monitoring/UPTIMEROBOT_CONFIG.md` - Monitoring setup

---

## 🎯 Success Criteria

- [ ] All 5 apps accessible and returning 200 OK
- [ ] SSL certificates valid for all domains
- [ ] Security headers present on all responses
- [ ] SSH hardened (key-only auth)
- [ ] UFW firewall active and configured
- [ ] Fail2ban protecting SSH
- [ ] Automatic security updates enabled
- [ ] UptimeRobot monitoring all 5 apps
- [ ] Daily backups scheduled via cron
- [ ] Backup restoration tested and documented

---

## 🚨 Troubleshooting

### C3 Won't Start
```bash
# Check logs
docker logs c3-frontend
docker logs c3-backend

# Common issues:
# - Port conflict (check docker-compose.yml)
# - Missing environment variables (check .env)
# - Database connection (check PostgreSQL)

# Rebuild if needed
docker-compose -f /opt/varnaai/docker-compose.yml build c3-frontend c3-backend
docker-compose -f /opt/varnaai/docker-compose.yml up -d c3-frontend c3-backend
```

### Firewall Blocking Traefik
```bash
# Check UFW status
ufw status

# Ensure ports allowed
ufw allow 80/tcp
ufw allow 443/tcp

# Check if Traefik can bind
netstat -tulpn | grep -E '80|443'
```

### Backup Script Fails
```bash
# Check Docker socket permissions
ls -l /var/run/docker.sock

# Ensure script has execute permissions
chmod +x /opt/backups/backup-docker-volumes.sh

# Run manually to see errors
/opt/backups/backup-docker-volumes.sh
```

---

## 📞 Next Steps

1. **Execute security hardening** (highest priority)
2. **Fix C3 Compliance** (currently down)
3. **Set up monitoring** (UptimeRobot)
4. **Schedule backups** (cron job)
5. **Verify all services** (external tests)
6. **Update documentation** (mark tasks complete)

**Estimated Time**: 1-2 hours for complete setup

---

**Files Referenced**:
- Security scripts: `D:\VarnaAI\Websites\operations\security\*.sh`
- Backup script: `D:\VarnaAI\Websites\operations\backup\backup-docker-volumes.sh`
- Restoration guide: `D:\VarnaAI\Websites\operations\backup\RESTORATION_GUIDE.md`
- Monitoring config: `D:\VarnaAI\Websites\operations\monitoring\UPTIMEROBOT_CONFIG.md`
