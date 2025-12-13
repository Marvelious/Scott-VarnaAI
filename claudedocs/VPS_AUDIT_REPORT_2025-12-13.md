# VPS Security Audit Report
**Date**: 2025-12-13
**VPS**: 78.47.125.174 (Hetzner)
**Auditor**: Claude Code

---

## Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| **Overall Security** | ✅ GOOD | 8.5/10 |
| **SSH Security** | ✅ Excellent | 10/10 |
| **Firewall** | ✅ Excellent | 10/10 |
| **Intrusion Prevention** | ✅ Excellent | 10/10 |
| **SSL/TLS** | ✅ Good | 9/10 |
| **Rate Limiting** | ✅ Excellent | 10/10 |
| **Updates** | ✅ Current | 10/10 |
| **Container Security** | ⚠️ Warning | 6/10 |

**Key Finding**: c3-backend container is reporting UNHEALTHY status.

---

## System Information

| Property | Value |
|----------|-------|
| **OS** | Ubuntu 22.04.5 LTS |
| **Kernel** | Linux (current) |
| **CPU** | AMD EPYC-Rome 8 cores |
| **RAM** | 15GB |
| **Disk** | 150GB (28% used / 41GB) |
| **Uptime** | 6 days |
| **Load Average** | 0.23, 0.25, 0.24 |

---

## Security Configuration

### SSH Security ✅ EXCELLENT

| Setting | Value | Status |
|---------|-------|--------|
| PermitRootLogin | prohibit-password | ✅ Key-only |
| PasswordAuthentication | no | ✅ Disabled |
| PubkeyAuthentication | yes | ✅ Enabled |
| MaxAuthTries | 3 | ✅ Limited |

**Assessment**: SSH is properly hardened with key-only authentication and limited retry attempts.

---

### Firewall (UFW) ✅ EXCELLENT

| Rule | Status |
|------|--------|
| Default Incoming | DENY |
| Default Outgoing | ALLOW |
| Port 22 (SSH) | ALLOW |
| Port 80 (HTTP) | ALLOW |
| Port 443 (HTTPS) | ALLOW |

**Assessment**: Only essential ports exposed. All internal services bound to 127.0.0.1.

---

### Fail2ban ✅ EXCELLENT

**Active Jails**: 4

| Jail | Max Retry | Ban Time | Currently Banned |
|------|-----------|----------|-----------------|
| sshd | 3 | 24h | Active |
| nginx-http-auth | 5 | 24h | Active |
| nginx-botsearch | 2 | 24h | Active |
| nginx-badbots | - | 24h | Active |

**Statistics**:
- Currently banned: ~190 IPs
- Total banned (all time): ~847 IPs

**Assessment**: Comprehensive protection against brute force and bot attacks.

---

### Rate Limiting (nginx) ✅ EXCELLENT

| Zone | Rate | Purpose |
|------|------|---------|
| api_limit | 10r/s | General API protection |
| login_limit | 1r/s | Login brute force protection |
| general | 30r/s | General traffic |
| conn_limit | Per IP | Connection limiting |

**Security Headers** (c3.varnaai.com):
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ HSTS: max-age=31536000; includeSubDomains; preload

---

## SSL Certificates ✅ GOOD

| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| c3.varnaai.com | 2026-02-22 | 71 days | ✅ Valid |
| demo-fwchange.varnaai.com | 2026-02-20 | 69 days | ✅ Valid |
| demo-retirement.varnaai.com | 2026-02-20 | 69 days | ✅ Valid |
| demo-agents.varnaai.com | 2026-02-22 | 71 days | ✅ Valid |
| demo-seoagent.varnaai.com | 2026-02-20 | 69 days | ✅ Valid |

**Assessment**: All certificates valid. Auto-renewal via Let's Encrypt/Certbot configured.

---

## Docker Containers ⚠️ WARNING

### Running Containers

| Container | Image | Status | Notes |
|-----------|-------|--------|-------|
| c3-backend | c3-c3-backend | ⚠️ UNHEALTHY | **NEEDS INVESTIGATION** |
| c3-frontend | c3-c3-frontend | ✅ Healthy | - |
| c3-redis | redis:7-alpine | ✅ Healthy | - |
| c3-postgres | pgvector/pgvector:pg16 | ✅ Healthy | - |
| fwchange-backend | fwchange-backend | ✅ Healthy | - |
| fwchange-frontend | nginx:alpine | ✅ Running | - |
| uptime-kuma | louislam/uptime-kuma:1 | ✅ Healthy | - |
| fwchange-postgres | postgres:15 | ✅ Healthy | - |
| fwchange-redis | redis:7-alpine | ✅ Healthy | - |

### Container Security Assessment

**Good Practices**:
- ✅ All containers bound to 127.0.0.1 (not exposed to internet)
- ✅ Separate database containers per application
- ✅ Using official/trusted images
- ✅ Health checks configured

**Concerns**:
- ⚠️ c3-backend reports UNHEALTHY despite login working
- ⚠️ Backend images are large (1.9-2.0GB) - could be optimized

### Docker Resource Usage

| Resource | Usage |
|----------|-------|
| Images | 8 images, 16.75GB total |
| Build Cache | 13.77GB (reclaimable) |
| Containers | 9 running |

---

## System Updates ✅ CURRENT

```
All packages are up to date.
```

- **Unattended Upgrades**: Enabled for security updates
- **Pending Updates**: None
- **Old Kernels**: Can be cleaned (linux-modules-5.15.0-161-generic)

---

## Network Security

### Listening Ports

| Port | Service | Binding | Status |
|------|---------|---------|--------|
| 22 | SSH | 0.0.0.0 | ✅ Required |
| 80 | nginx | 0.0.0.0 | ✅ Required |
| 443 | nginx | 0.0.0.0 | ✅ Required |
| 11434 | Ollama | 0.0.0.0 | ⚠️ Review |
| 8000-8002 | Docker apps | 127.0.0.1 | ✅ Internal only |
| 5432-5433 | PostgreSQL | 127.0.0.1 | ✅ Internal only |
| 6379-6380 | Redis | 127.0.0.1 | ✅ Internal only |

**Note**: Ollama (11434) is exposed on all interfaces. Consider binding to 127.0.0.1 if only used locally.

---

## Recommendations

### High Priority

1. **Investigate c3-backend health check**
   ```bash
   docker logs c3-backend --tail 100
   docker inspect c3-backend | grep -A10 "Health"
   ```
   Despite showing unhealthy, login is working. Health check may need adjustment.

2. **Consider binding Ollama to localhost**
   If Ollama is only used by local services:
   ```bash
   # In Ollama config, bind to 127.0.0.1:11434
   ```

### Medium Priority

3. **Clean Docker build cache** (recovers 13.77GB)
   ```bash
   docker system prune -a --volumes
   # Or just build cache:
   docker builder prune
   ```

4. **Remove old kernel packages**
   ```bash
   apt autoremove
   ```

5. **Optimize backend Docker images**
   Current: 1.9-2.0GB per backend
   Consider multi-stage builds to reduce size by 50-70%

### Low Priority

6. **Add Content-Security-Policy header**
   Already have good security headers, CSP would be an enhancement.

7. **Consider intrusion detection**
   Install `rkhunter` or `chkrootkit` for rootkit detection.

---

## Security Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| SSH Security | 15% | 10/10 | 1.5 |
| Firewall | 15% | 10/10 | 1.5 |
| Intrusion Prevention | 15% | 10/10 | 1.5 |
| SSL/TLS | 15% | 9/10 | 1.35 |
| Rate Limiting | 10% | 10/10 | 1.0 |
| Updates | 10% | 10/10 | 1.0 |
| Container Security | 10% | 6/10 | 0.6 |
| Network Exposure | 10% | 8/10 | 0.8 |
| **TOTAL** | 100% | | **9.25/10** |

---

## Conclusion

The VPS at 78.47.125.174 demonstrates **excellent security posture**:

✅ **Strengths**:
- SSH properly hardened with key-only auth
- UFW firewall with minimal exposure
- Aggressive fail2ban protection (847+ bans)
- Comprehensive rate limiting
- All certificates valid
- System fully patched

⚠️ **Action Items**:
1. Investigate c3-backend UNHEALTHY status
2. Consider restricting Ollama to localhost
3. Clean up Docker build cache (13.77GB)

**Overall Assessment**: Production-ready with minor optimizations recommended.

---

*Report generated: 2025-12-13 by Claude Code*
