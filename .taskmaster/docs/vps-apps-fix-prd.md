# VPS Demo Apps - Fix All 3 Applications PRD

## Overview

Fix the three demo applications running on Hetzner VPS (78.47.125.174) so they are fully functional for customer demos.

**VPS Details:**
- IP: 78.47.125.174
- Access: SSH root@78.47.125.174
- Apps: RetirementAI, FwChange, C3 Compliance

## Current State (From Testing 2025-12-04)

### RetirementAI (demo-retirement.varnaai.com)
- **Status**: Partially working
- **Frontend**: Working (35+ pages load)
- **Database**: Connected (PostgreSQL)
- **Market Data**: Working (S&P 500, Bitcoin prices)
- **AI Features**: BLOCKED - API keys empty
- **Auth**: No auth required (demo mode)
- **Deployment**: PM2 standalone Next.js (port 3000)
- **Config**: /opt/demos/retirementai/.env

**Issues to Fix:**
1. Add OpenAI API key to .env
2. Add Anthropic API key to .env
3. Restart PM2 after adding keys
4. Verify AI chat responds

### FwChange (demo-fwchange.varnaai.com)
- **Status**: Partially working
- **Frontend**: Working (12+ pages)
- **Database**: Connected (PostgreSQL)
- **Auth**: Working with demo/demo123
- **API**: 401 errors on /api/v1/changes
- **Deployment**: Docker containers
- **Config**: /opt/fwchange/.env

**Issues to Fix:**
1. Debug 401 API errors on changes endpoint
2. Create Privacy Policy page content
3. Create Terms of Service page content
4. Create Security page content
5. Remove or fix license alert banner
6. Seed demo firewall change data (optional)

### C3 Compliance (c3.varnaai.com)
- **Status**: Non-functional (only landing page works)
- **Frontend**: Landing page excellent, login broken
- **Database**: Unknown (cannot test - auth blocks)
- **Auth**: BROKEN - login button doesn't make API call
- **API**: All endpoints return 404 "Endpunkt nicht gefunden"
- **Deployment**: Docker containers (c3-frontend, c3-backend, postgres, redis)
- **Config**: /opt/c3/.env (assumed path)

**Issues to Fix:**
1. Debug why API endpoints return 404
2. Check Docker container logs for c3-backend
3. Verify database connection from backend
4. Fix API routing in backend
5. Seed demo user (demo@c3.varnaai.com / demo123)
6. Wire up login form to make POST request
7. Test all 5 compliance scan types after auth fixed

## Technical Requirements

### SSH Access Commands
```bash
# Connect to VPS
ssh root@78.47.125.174

# Check RetirementAI
pm2 list
pm2 logs retirementai --lines 50
cat /opt/demos/retirementai/.env

# Check FwChange
docker ps --filter name=fwchange
docker logs fwchange-backend --tail 50
docker exec fwchange-backend cat .env

# Check C3
docker ps --filter name=c3
docker logs c3-backend --tail 100
docker exec c3-backend cat .env
```

### Priority Order
1. **HIGH - RetirementAI**: Just needs API keys (5 minutes)
2. **HIGH - C3**: Backend completely broken, needs debugging
3. **MEDIUM - FwChange**: Auth works, just needs 401 fix and content

## Success Criteria

1. **RetirementAI**: AI chat responds to questions, portfolio analysis works
2. **FwChange**: Changes list loads, can create new firewall change requests
3. **C3**: Can login with demo credentials, can run compliance scans

## Out of Scope

- Adding new features
- Performance optimization
- Changing deployment architecture
- Mock data - use real data only
