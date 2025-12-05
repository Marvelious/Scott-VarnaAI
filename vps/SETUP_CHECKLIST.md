# VPS Demo Apps - Complete Setup Checklist

**VPS**: Hetzner @ 78.47.125.174
**Created**: 2025-12-04
**Last Updated**: 2025-12-04 (Full Testing Complete)
**Status**: TESTED - ISSUES FOUND

---

## Quick Status

| App | URL | Frontend | Database | Backend API | Auth | AI Features | Full Working |
|-----|-----|----------|----------|-------------|------|-------------|--------------|
| RetirementAI | demo-retirement.varnaai.com | ✅ | ✅ | ✅ | ✅ (no auth) | ❌ No API keys | ⚠️ Partial |
| FwChange | demo-fwchange.varnaai.com | ✅ | ✅ | ⚠️ 401 errors | ✅ demo/demo123 | N/A | ⚠️ Partial |
| C3 Compliance | c3.varnaai.com | ✅ | ❓ | ❌ 404 errors | ❌ Broken | ❓ | ❌ Non-functional |

**See detailed STATUS_REPORT.md in each app folder for full testing results.**

---

## App 1: RetirementAI

**Location**: `/opt/demos/retirementai`
**Process**: PM2 standalone Next.js (not Docker)
**Port**: 3000 (proxied via nginx)

### Infrastructure
- [x] Next.js app deployed
- [x] PM2 process running
- [x] nginx reverse proxy configured
- [x] SSL certificate valid (until Feb 2026)
- [x] Domain resolving correctly

### Database
- [x] PostgreSQL connected
- [x] Chat history persisting (verified - saw past conversations)
- [ ] Check if all tables exist
- [ ] Verify migrations ran

### External APIs
- [x] Market data API working (S&P 500, Bitcoin prices loading)
- [ ] Trading212 API integration (needs API key?)

### AI Configuration
**PROBLEM FOUND**: API keys are empty in `.env`

```
/opt/demos/retirementai/.env:
OPENAI_API_KEY=          ← EMPTY - NEEDS KEY
ANTHROPIC_API_KEY=       ← EMPTY - NEEDS KEY
```

**To Fix**:
```bash
ssh root@78.47.125.174
nano /opt/demos/retirementai/.env
# Add: OPENAI_API_KEY=sk-...
# Add: ANTHROPIC_API_KEY=sk-ant-...
pm2 restart retirementai
```

### Features to Test (After AI Keys Added)
- [ ] AI Chat responds to questions
- [ ] Portfolio analysis works
- [ ] Monte Carlo simulation runs
- [ ] Goal tracking saves data
- [ ] Budget planner works
- [ ] Risk assessment completes
- [ ] Reports generate

### Known Issues
1. `manifest.json` 404 - PWA manifest missing (minor)
2. AI providers all show unavailable (API keys needed)

---

## App 2: FwChange

**Location**: Docker containers in `/opt/fwchange` (assumed)
**Containers**: fwchange-frontend, fwchange-backend, fwchange-postgres, fwchange-redis
**Port**: 5173 (frontend), backend port TBD

### Infrastructure
- [x] Docker containers running
- [x] nginx reverse proxy configured
- [x] SSL certificate valid
- [x] Domain resolving correctly

### Database
- [ ] PostgreSQL has correct schema
- [ ] Demo data seeded
- [ ] Migrations applied

### Authentication
- [ ] Demo user exists (demo@fwchange.varnaai.com?)
- [ ] Login actually works
- [ ] Session persists

### Backend API
- [ ] Health endpoint responds
- [ ] CRUD operations work
- [ ] Firewall rule parsing works

### Features to Test
- [ ] Login with demo credentials
- [ ] Dashboard loads with data
- [ ] Create firewall change request
- [ ] View change history
- [ ] Export reports
- [ ] Multi-vendor support (Palo Alto, Check Point, Cisco, Fortinet)

### Configuration Needed
```bash
# Find and check env file
ssh root@78.47.125.174
docker exec fwchange-backend cat .env
# or
cat /opt/fwchange/.env
```

### Known Issues
- TBD after testing

---

## App 3: C3 Compliance

**Location**: Docker containers
**Containers**: c3-frontend, c3-backend, c3-postgres, c3-redis
**Port**: Frontend and backend ports TBD

### Infrastructure
- [x] Docker containers running
- [x] nginx reverse proxy configured
- [x] SSL certificate valid
- [x] Domain resolving correctly

### Database
- [ ] PostgreSQL has correct schema
- [ ] Demo organization exists
- [ ] Demo user seeded

### Authentication
- [x] Login page shows demo credentials (demo@c3.varnaai.com / demo123)
- [ ] Login actually authenticates
- [ ] JWT tokens working
- [ ] Session persists

### Backend API
- [ ] Health endpoint responds
- [ ] Compliance scan API works
- [ ] Document generation works

### Features to Test
- [ ] Login with demo credentials
- [ ] Dashboard shows compliance status
- [ ] Run DSGVO scan
- [ ] Run NIS2 scan
- [ ] Generate compliance report
- [ ] View audit history

### Configuration Needed
```bash
ssh root@78.47.125.174
docker exec c3-backend cat .env
# Check for:
# - DATABASE_URL
# - JWT_SECRET
# - Any AI API keys
```

### Known Issues
- TBD after testing

---

## Shared Infrastructure

### nginx Configuration
- [x] Rate limiting configured (`/etc/nginx/conf.d/rate-limiting.conf`)
- [x] All sites have valid SSL
- [x] Reverse proxy working for all apps

### Security
- [x] fail2ban active (sshd, nginx-botsearch, nginx-http-auth, nginx-badbots)
- [x] UFW firewall enabled
- [x] SSH key-only authentication

### Monitoring
- [x] Uptime Kuma installed (`/opt/uptime-kuma`)
- [ ] Uptime Kuma accessible (needs DNS: status.varnaai.com → 78.47.125.174)
- [ ] Monitoring configured for all 3 apps

---

## Action Items (Priority Order)

### HIGH - Get Apps Working
1. [ ] **RetirementAI**: Add OpenAI/Anthropic API keys to `.env`
2. [ ] **FwChange**: Test login, find/fix any issues
3. [ ] **C3**: Test login, find/fix any issues

### MEDIUM - Complete Setup
4. [ ] Verify all database schemas are correct
5. [ ] Seed demo data for all apps
6. [ ] Test all major features per app

### LOW - Polish
7. [ ] Add DNS record for status.varnaai.com
8. [ ] Configure Uptime Kuma monitors
9. [ ] Fix RetirementAI manifest.json 404
10. [ ] Document all demo credentials

---

## Demo Credentials (To Be Verified)

| App | Email | Password | Status |
|-----|-------|----------|--------|
| RetirementAI | ? | ? | No auth required? |
| FwChange | demo@fwchange.varnaai.com | ? | TBD |
| C3 | demo@c3.varnaai.com | demo123 | Visible on login page |

---

## Commands Reference

### Check Container Status
```bash
ssh root@78.47.125.174 "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
```

### Check PM2 Status
```bash
ssh root@78.47.125.174 "pm2 list"
```

### View App Logs
```bash
# RetirementAI
ssh root@78.47.125.174 "pm2 logs retirementai --lines 50"

# FwChange
ssh root@78.47.125.174 "docker logs fwchange-backend --tail 50"

# C3
ssh root@78.47.125.174 "docker logs c3-backend --tail 50"
```

### Restart Apps
```bash
# RetirementAI
ssh root@78.47.125.174 "pm2 restart retirementai"

# FwChange
ssh root@78.47.125.174 "cd /opt/fwchange && docker-compose restart"

# C3
ssh root@78.47.125.174 "cd /opt/c3 && docker-compose restart"
```

---

## Progress Log

### 2025-12-04
- Created this checklist
- Discovered RetirementAI AI keys are empty
- Verified all frontends load
- Verified market data API works on RetirementAI
- Need to systematically test and fix remaining issues

---

*Last Updated: 2025-12-04*
