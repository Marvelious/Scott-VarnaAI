# VPS Infrastructure Audit Report

**Date:** 2025-12-11
**Server:** Hetzner VPS (78.47.125.174)
**Auditor:** Claude Code

---

## Executive Summary

VPS infrastructure audit completed successfully. **Critical issue found and fixed:** C3 Compliance service was offline due to missing Docker network and disabled nginx site. All services now operational.

### Service Status After Audit

| Service | Status | URL |
|---------|--------|-----|
| RetirementAI | **ONLINE** | https://demo-retirement.varnaai.com |
| FwChange | **ONLINE** | https://demo-fwchange.varnaai.com |
| C3 Compliance | **ONLINE** (Fixed) | https://c3.varnaai.com |
| Uptime Kuma | **PENDING DNS** | https://status.varnaai.com |

---

## Server Specifications

- **OS:** Ubuntu 22.04.5 LTS
- **Kernel:** 5.15.0-127-generic (x86_64)
- **CPU:** AMD EPYC-Rome (8 cores)
- **RAM:** 16 GB
- **Disk:** 150 GB SSD (18% used, 27 GB / 150 GB)
- **Provider:** Hetzner Cloud

---

## Running Services

### Docker Containers (9 total)

| Container | Status | Ports |
|-----------|--------|-------|
| c3-frontend | healthy | 127.0.0.1:8001->80/tcp |
| c3-backend | running* | 127.0.0.1:8002->8000/tcp |
| c3-redis | healthy | 127.0.0.1:6380->6379/tcp |
| c3-postgres | healthy | 127.0.0.1:5433->5432/tcp |
| fwchange-backend | healthy | 127.0.0.1:8000->8000/tcp |
| fwchange-frontend | running | 127.0.0.1:5173->80/tcp |
| fwchange-postgres | healthy | 5432/tcp |
| fwchange-redis | healthy | 6379/tcp |
| uptime-kuma | healthy | 127.0.0.1:3001->3001/tcp |

*Note: c3-backend shows "unhealthy" because health check endpoint `/api/v1/health` is not defined, but service is operational.

### PM2 Processes

| App | Status | CPU | RAM |
|-----|--------|-----|-----|
| retirementai | online | 0% | 141.4 MB |

---

## Security Configuration

### Firewall (UFW)

- **Status:** Active
- **Default Policy:** Deny incoming, Allow outgoing
- **Open Ports:**
  - 22/tcp (SSH) - Limited
  - 80/tcp (HTTP) - Allow
  - 443/tcp (HTTPS) - Allow

### fail2ban

- **Status:** Active (4 jails)
- **Jails:**
  - `sshd` - 75+ IPs banned
  - `nginx-botsearch` - Active
  - `nginx-http-auth` - Active
  - `nginx-badbots` - 58+ IPs banned

### SSL Certificates (Let's Encrypt)

| Domain | Expiry | Days Remaining |
|--------|--------|----------------|
| c3.varnaai.com | 2026-02-22 | 73 days |
| demo-agents.varnaai.com | 2026-02-22 | 73 days |
| demo-fwchange.varnaai.com | 2026-02-20 | 71 days |
| demo-retirement.varnaai.com | 2026-02-20 | 71 days |
| demo-seoagent.varnaai.com | 2026-02-20 | 71 days |

### nginx Rate Limiting

Configured rate limiting zones:
- `api_limit`: 10 req/sec (API endpoints)
- `login_limit`: 1 req/sec (Auth endpoints)
- `general`: 30 req/sec (General traffic)

### Container Security

All containers bound to `127.0.0.1` (localhost only):
- Not directly exposed to internet
- Traffic routed through nginx reverse proxy
- Rate limiting applied at nginx level

---

## Issues Found & Resolved

### Issue 1: C3 Service Offline

**Symptom:** https://c3.varnaai.com returning no response (000 status)

**Root Cause Analysis:**
1. C3 Docker containers were not running
2. `docker compose up` failed because external network `varnaai-network` didn't exist
3. nginx site configuration existed but was NOT enabled (missing symlink in sites-enabled)

**Resolution:**
```bash
# Step 1: Create required Docker network
docker network create varnaai-network

# Step 2: Start C3 containers
cd /opt/varnaai/c3 && docker compose up -d

# Step 3: Enable nginx site
ln -s /etc/nginx/sites-available/c3.varnaai.com /etc/nginx/sites-enabled/
systemctl reload nginx
```

**Result:** C3 now responding with HTTP 200

---

## Warnings & Recommendations

### High Priority

1. **Node.js Version Mismatch (C3 Backend)**
   - Current: Node 18 (in Dockerfile)
   - Required: Node 20+ (by several packages)
   - Affected packages: jsdom, isomorphic-dompurify, cssstyle, data-urls
   - **Recommendation:** Update C3 backend Dockerfile to `node:20-alpine`

2. **npm Vulnerabilities (C3 Backend)**
   - 6 vulnerabilities detected (1 moderate, 5 high)
   - **Recommendation:** Run `npm audit fix --force` in C3 backend

### Medium Priority

3. **Deprecated Packages (C3 Backend)**
   - multer@1.4.5-lts.2 (has security vulnerabilities, upgrade to 2.x)
   - puppeteer@21.11.0 (< 24.15.0 no longer supported)
   - lodash.get, lodash.isequal (deprecated)
   - glob@7.x/8.x (no longer supported)
   - **Recommendation:** Update package.json with newer versions

4. **Status Page DNS**
   - Uptime Kuma is running but `status.varnaai.com` DNS may not be configured
   - **Recommendation:** Verify DNS A record points to 78.47.125.174

### Low Priority

5. **Docker Compose Version Warning**
   - Message: "the attribute `version` is obsolete"
   - **Recommendation:** Remove `version:` line from docker-compose.yml files

6. **System Updates Available**
   - 6 packages can be upgraded (including 3 security updates)
   - **Recommendation:** Run `apt update && apt upgrade`

---

## Directory Structure

```
/opt/
├── fwchange/               # FwChange Docker stack
│   └── docker-compose.yml
├── varnaai/
│   └── c3/                 # C3 Compliance Docker stack
│       ├── docker-compose.yml
│       ├── frontend/
│       └── backend/
├── demos/
│   └── retirementai/       # RetirementAI (PM2)
└── uptime-kuma/            # Uptime Kuma Docker
```

---

## Resource Usage

| Resource | Current | Capacity | Usage |
|----------|---------|----------|-------|
| Disk | 27 GB | 150 GB | 18% |
| RAM | ~2 GB estimated | 16 GB | ~12% |
| Containers | 9 | - | Running |

---

## Audit Checklist

- [x] Server specifications verified
- [x] All services status checked
- [x] Firewall configuration audited
- [x] fail2ban status reviewed
- [x] SSL certificates verified
- [x] Docker containers inspected
- [x] nginx configuration reviewed
- [x] Rate limiting confirmed
- [x] Critical issues resolved (C3 service)
- [x] Security recommendations documented

---

## Next Steps

1. **Immediate:** Consider upgrading C3 backend to Node 20
2. **This Week:** Update deprecated packages in C3
3. **This Week:** Verify status.varnaai.com DNS
4. **Ongoing:** Monitor SSL certificate expiry (auto-renewal should handle)
5. **Monthly:** Review fail2ban logs for patterns

---

*Report generated by Claude Code during VPS audit session*
