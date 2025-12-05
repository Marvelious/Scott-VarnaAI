# VPS Audit Report - Hetzner varnaai-demos

**Date**: 2025-12-04 13:26 UTC
**Server**: 78.47.125.174 (varnaai-demos)
**Auditor**: Claude Code

---

## Executive Summary

| Category | Status | Notes |
|----------|--------|-------|
| **Overall Health** | ✅ GOOD | All services running, low resource usage |
| **Security** | ✅ STRONG | UFW active, fail2ban protecting, 151 IPs banned |
| **Apps** | ⚠️ WARNING | RetirementAI has Redis warnings |
| **SSL** | ✅ VALID | All certs valid 77-79 days |
| **Disk** | ✅ OK | 27% used (39GB of 150GB) |
| **Backups** | ⚠️ NONE | No application backups configured |

---

## 1. System Overview

### Hardware & OS
| Metric | Value |
|--------|-------|
| **Hostname** | varnaai-demos |
| **OS** | Ubuntu 22.04.5 LTS |
| **Kernel** | 5.15.0-161-generic |
| **CPU** | AMD EPYC-Rome (8 cores) |
| **RAM** | 16GB (1.2GB used, 13GB available) |
| **Uptime** | 4 days, 10 hours |
| **Load Average** | 0.11, 0.12, 0.09 (very low) |

### Resource Utilization
```
Memory: 1.2GB / 16GB (7.5% used) ✅
Swap:   26MB / 4GB (0.6% used) ✅
CPU:    <1% average load ✅
```

---

## 2. Live Applications

### Status Summary
| App | URL | Container/Process | Status | Health |
|-----|-----|-------------------|--------|--------|
| **RetirementAI** | demo-retirement.varnaai.com | PM2 (retirementai) | ✅ Online | ⚠️ Redis warnings |
| **FwChange** | demo-fwchange.varnaai.com | Docker (4 containers) | ✅ All Up | ✅ Healthy |
| **C3 Compliance** | c3.varnaai.com | Docker (4 containers) | ✅ All Up | ✅ Healthy |
| **Uptime Kuma** | status.varnaai.com | Docker (uptime-kuma) | ✅ Up | ✅ Healthy |

### Docker Containers (9 total)
```
uptime-kuma         Up 13 hours (healthy)   127.0.0.1:3001
c3-backend          Up 10 hours (healthy)   127.0.0.1:8002
c3-frontend         Up 24 hours (healthy)   127.0.0.1:8001
c3-redis            Up 25 hours (healthy)   127.0.0.1:6380
c3-postgres         Up 25 hours (healthy)   127.0.0.1:5433
fwchange-frontend   Up 25 hours             127.0.0.1:5173
fwchange-backend    Up 25 hours (healthy)   127.0.0.1:8000
fwchange-postgres   Up 25 hours (healthy)   5432/tcp (internal)
fwchange-redis      Up 25 hours (healthy)   6379/tcp (internal)
```

### PM2 Processes
```
retirementai    online    202MB    4 restarts    11h uptime
```

---

## 3. Security Assessment

### Firewall (UFW) ✅
```
Default: deny (incoming), allow (outgoing)

Allowed:
- 22/tcp   (SSH)
- 80/tcp   (HTTP)
- 443/tcp  (HTTPS)

Denied:
- 3000     (direct app access blocked)
- 11434    (Ollama blocked except Docker)
```

### Fail2Ban ✅ ACTIVE
| Jail | Currently Banned | Total Banned | Total Failed |
|------|-----------------|--------------|--------------|
| **sshd** | 25 | 92 | 1,217 |
| **nginx-badbots** | 126 | 149 | 716 |
| **nginx-botsearch** | Active | - | - |
| **nginx-http-auth** | Active | - | - |

**Total IPs Blocked**: 151+ unique IPs

### Open Ports (Listening)
```
External:
- 22   SSH
- 80   nginx (HTTP)
- 443  nginx (HTTPS)

Internal Only (127.0.0.1):
- 3000  RetirementAI (Next.js)
- 3001  Uptime Kuma
- 5173  FwChange frontend
- 5432  PostgreSQL (system)
- 5433  PostgreSQL (C3 Docker)
- 6379  Redis (system)
- 6380  Redis (C3 Docker)
- 8000  FwChange backend
- 8001  C3 frontend
- 8002  C3 backend

Ollama:
- 11434 (all interfaces, but UFW blocks external)
```

### Security Grade: A-
- ✅ UFW properly configured
- ✅ All apps behind nginx (not exposed)
- ✅ Fail2ban actively blocking attacks
- ✅ SSL on all endpoints
- ⚠️ 1234/tcp open (socat - investigate)
- ⚠️ Root SSH enabled (consider key-only)

---

## 4. SSL Certificates

| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| c3.varnaai.com | 2026-02-22 | 79 days | ✅ Valid |
| demo-agents.varnaai.com | 2026-02-22 | 79 days | ✅ Valid |
| demo-fwchange.varnaai.com | 2026-02-20 | 77 days | ✅ Valid |
| demo-retirement.varnaai.com | 2026-02-20 | 78 days | ✅ Valid |
| demo-seoagent.varnaai.com | 2026-02-20 | 77 days | ✅ Valid |

**Certbot Auto-Renewal**: Configured via systemd timer

---

## 5. Database Status

### System Services
| Service | Status | Notes |
|---------|--------|-------|
| **PostgreSQL** | ✅ Active | System instance on port 5432 |
| **Redis** | ✅ Active | Version 6.0.16 (consider upgrade to 6.2+) |

### Docker Databases
| Container | Database | Status |
|-----------|----------|--------|
| c3-postgres | PostgreSQL 16 + pgvector | ✅ Healthy |
| c3-redis | Redis 7 Alpine | ✅ Healthy |
| fwchange-postgres | PostgreSQL 15 | ✅ Healthy |
| fwchange-redis | Redis 7 Alpine | ✅ Healthy |

### Databases Present
- `fwchange` (FwChange app)
- `postgres` (system default)
- RetirementAI uses system PostgreSQL + Redis

---

## 6. Disk Usage

### Storage Summary
```
Total:     150GB
Used:      39GB (27%)
Available: 106GB (73%)
```

### Large Directories
| Path | Size | Notes |
|------|------|-------|
| /opt | 7.9GB | Demo apps |
| /var/lib/docker | 4.9GB | Docker images/containers |
| /root | 908MB | Root home |
| /var/log | 110MB | System logs |

### Docker Disk Usage
```
Images:        15.31GB (13.29GB reclaimable - 86%)
Containers:    2.68MB
Volumes:       235.3MB (99.73MB reclaimable - 42%)
Build Cache:   9.43GB (5.67GB reclaimable)
```

**Recommendation**: Run `docker system prune` to reclaim ~19GB

---

## 7. Ollama AI

| Metric | Value |
|--------|-------|
| **Status** | ✅ Active (1d 8h uptime) |
| **Memory** | 3.2GB |
| **CPU Time** | 50m 37s |

### Models Installed
| Model | Size | Modified |
|-------|------|----------|
| local-model:latest | 4.4GB | 30 hours ago |
| mistral:latest | 4.4GB | 33 hours ago |

---

## 8. Issues & Warnings

### Critical (Fix Now)
None

### Warning (Address Soon)

1. **RetirementAI Redis Warnings**
   ```
   It is highly recommended to use a minimum Redis version of 6.2.0
   Current: 6.0.16
   ```
   **Fix**: Upgrade system Redis from 6.0.16 to 6.2+

2. **No Application Backups**
   - No backup cronjobs configured
   - No backup files found in last 7 days
   **Fix**: Set up automated database and app backups

3. **Port 1234 Open (socat)**
   - Investigate what's using this port
   **Fix**: Remove if not needed

4. **Systemd Reload Needed**
   ```
   Warning: The unit file of ollama.service changed on disk.
   Run 'systemctl daemon-reload' to reload units.
   ```

### Minor (Nice to Have)

5. **Docker Cleanup Opportunity**
   - 13.29GB of reclaimable images
   - 5.67GB of reclaimable build cache
   **Fix**: `docker system prune -a`

6. **APT Updates Available**
   - docker-compose-plugin upgrade available

---

## 9. Nginx Error Analysis

### Recent Errors (Last 24h)
| Error | Count | Severity | Notes |
|-------|-------|----------|-------|
| SSL bad key share | 3 | Low | Malformed client requests (bots) |
| Connect upstream 111 | 1 | Medium | C3 backend briefly unavailable |

Most errors are from automated scanners/bots being blocked - this is expected.

---

## 10. Recommendations

### Immediate Actions
1. ⚡ Run `systemctl daemon-reload` on VPS
2. ⚡ Investigate socat on port 1234

### Short-Term (This Week)
1. 📦 Upgrade system Redis to 6.2+
2. 💾 Set up automated database backups
3. 🧹 Run `docker system prune -a` to free 19GB

### Long-Term
1. 🔐 Consider disabling root SSH (use key-only sudo user)
2. 📊 Configure Uptime Kuma monitoring properly
3. 🔄 Set up DNS for status.varnaai.com

---

## 11. Quick Commands Reference

```bash
# System health
ssh root@78.47.125.174 "htop"

# Docker cleanup
ssh root@78.47.125.174 "docker system prune -a"

# Restart RetirementAI
ssh root@78.47.125.174 "pm2 restart retirementai"

# Check fail2ban
ssh root@78.47.125.174 "fail2ban-client status"

# View live logs
ssh root@78.47.125.174 "pm2 logs retirementai"
ssh root@78.47.125.174 "docker logs -f c3-backend"

# SSL renewal check
ssh root@78.47.125.174 "certbot renew --dry-run"
```

---

**Audit Complete** | Generated by Claude Code | 2025-12-04
