# Production Readiness Workflow for Claude Code

> **Purpose**: A systematic workflow for Claude Code to verify that an application is truly ready for users - not just "looks done" but actually works end-to-end.

**Created**: 2025-12-25
**Research Basis**: Industry best practices for E2E testing, smoke testing, production readiness checklists

---

## The Problem We're Solving

After 4 months of development, apps are declared "done" but:
- Users can't sign up
- Features are broken
- Docker containers don't start properly
- API endpoints return errors
- Database connections fail

**Root Cause**: No systematic verification before declaring "done"

---

## Testing Terminology Reference

| Term | What It Means | When To Use |
|------|---------------|-------------|
| **Smoke Testing** | Quick "does it even run?" check | After every deployment/restart |
| **E2E Testing** | Complete user journey testing | Before declaring feature complete |
| **Integration Testing** | Components work together | After connecting services |
| **Production Readiness** | Full go-live verification | Before user access |
| **UAT (User Acceptance)** | Real user can complete tasks | Final gate before launch |

---

## Claude Code's Testing Arsenal

### Tools Available

| Tool | Use For | MCP Required |
|------|---------|--------------|
| **Playwright MCP** | Browser automation, clicking, typing, screenshots | Yes |
| **Chrome DevTools MCP** | Console errors, network requests, performance | Yes |
| **Bash** | Docker commands, curl API tests, port checks | No |
| **PostgreSQL MCP** | Direct database queries | Yes |
| **Read/Grep** | Log file analysis | No |

### Tool Selection Matrix

| Task | Best Tool |
|------|-----------|
| Check if container is running | `docker ps` via Bash |
| Check if port is open | `curl` or `netstat` via Bash |
| Check database tables exist | PostgreSQL MCP |
| Load a webpage | Playwright `browser_navigate` |
| Click a button | Playwright `browser_click` |
| Check for JS errors | Chrome DevTools `list_console_messages` |
| Check API response | `curl` via Bash |
| Take screenshot proof | Playwright `browser_take_screenshot` |
| Fill a form | Playwright `browser_type` or `browser_fill_form` |

---

## The 5-Layer Production Readiness Checklist

### Layer 1: Infrastructure (Docker/Containers)

**Goal**: All containers start and are healthy

```bash
# Check all containers are running
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep [app-prefix]

# Check container health
docker inspect --format='{{.State.Health.Status}}' [container-name]

# Check logs for errors
docker logs [container-name] --tail 50 2>&1 | grep -i "error\|exception\|failed"
```

**Checklist**:
- [ ] All containers show "Up" status
- [ ] Health checks pass (if configured)
- [ ] No crash loops (container restarting repeatedly)
- [ ] Required ports are exposed and accessible

### Layer 2: Database

**Goal**: Database is accessible and schema is correct

```bash
# Check PostgreSQL is accepting connections
docker exec [db-container] pg_isready -U [user] -d [database]

# Check Redis is responding
docker exec [redis-container] redis-cli ping
```

**Using PostgreSQL MCP**:
- List all tables: Verify expected tables exist
- Query key tables: Check they're not empty (if they shouldn't be)
- Verify migrations ran: Check schema version table

**Checklist**:
- [ ] Database accepts connections
- [ ] All expected tables exist
- [ ] Migrations have been applied
- [ ] Required seed data is present (if applicable)

### Layer 3: Backend API

**Goal**: API endpoints respond correctly

```bash
# Health check endpoint
curl -s http://localhost:[port]/health | jq

# API documentation (FastAPI)
curl -s http://localhost:[port]/docs -o /dev/null -w "%{http_code}"

# Test a GET endpoint
curl -s http://localhost:[port]/api/[endpoint] | jq

# Test authentication endpoint
curl -s -X POST http://localhost:[port]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}' | jq
```

**Checklist**:
- [ ] Health endpoint returns 200
- [ ] API docs load (FastAPI: /docs, Express: /api-docs)
- [ ] Public endpoints respond
- [ ] Auth endpoints work (login returns token or valid error)
- [ ] Protected endpoints reject unauthenticated requests

### Layer 4: Frontend

**Goal**: Frontend loads and renders without errors

**Using Playwright MCP**:

```
1. browser_navigate → Load homepage
2. browser_snapshot → Check page structure
3. browser_console_messages → Check for JS errors
4. browser_take_screenshot → Visual proof
```

**Using Chrome DevTools MCP**:
```
1. navigate_page → Load homepage
2. list_console_messages → Check for errors
3. list_network_requests → Check for failed requests
```

**Checklist**:
- [ ] Homepage loads (HTTP 200)
- [ ] No JavaScript console errors (level: error)
- [ ] No failed network requests (4xx, 5xx)
- [ ] Key UI elements are visible
- [ ] Page is not blank/white

### Layer 5: User Flows (E2E)

**Goal**: A real user can complete critical journeys

**Critical User Flows to Test**:

1. **Registration Flow**
   - Navigate to signup page
   - Fill registration form
   - Submit form
   - Verify success (redirect or confirmation)

2. **Login Flow**
   - Navigate to login page
   - Enter credentials
   - Submit form
   - Verify authenticated state (dashboard loads)

3. **Core Feature Flow**
   - From authenticated state
   - Navigate to main feature
   - Perform primary action
   - Verify result

4. **Logout Flow**
   - Click logout
   - Verify logged out state

**Using Playwright MCP**:

```
# Example: Login Flow
1. browser_navigate → /login
2. browser_snapshot → Verify form exists
3. browser_type → Email field
4. browser_type → Password field
5. browser_click → Submit button
6. browser_wait_for → Success indicator
7. browser_snapshot → Verify dashboard
8. browser_take_screenshot → Proof of success
```

**Checklist**:
- [ ] User can register (if applicable)
- [ ] User can log in
- [ ] User can access main feature
- [ ] User can perform core action
- [ ] User can log out

---

## The Production Readiness Workflow

### Phase 1: Smoke Test (2 minutes)

Quick verification that the app is running at all.

```
1. Check Docker containers are running
2. Check ports are accessible
3. Load homepage in browser
4. Verify no immediate errors
```

**If ANY smoke test fails → STOP and fix before continuing**

### Phase 2: Component Verification (5 minutes)

Verify each component works in isolation.

```
1. Database: pg_isready, redis-cli ping
2. Backend: curl health endpoint
3. Frontend: Load page, check console for errors
```

**If ANY component fails → STOP and fix before continuing**

### Phase 3: Integration Verification (5 minutes)

Verify components work together.

```
1. Frontend can reach backend (network request succeeds)
2. Backend can reach database (query succeeds)
3. Auth flow completes (login works)
```

**If ANY integration fails → STOP and fix before continuing**

### Phase 4: E2E User Flows (10 minutes)

Test complete user journeys.

```
1. Registration flow (if applicable)
2. Login flow
3. Core feature flow
4. Logout flow
```

**If ANY user flow fails → STOP and fix before continuing**

### Phase 5: Documentation & Evidence (2 minutes)

Create proof that testing was done.

```
1. Take screenshots of key states
2. Document test results
3. Note any warnings (non-blocking issues)
4. Update status: PRODUCTION READY or NEEDS FIXES
```

---

## App-Specific Configurations

### FwChange (React + FastAPI + PostgreSQL + Redis)

| Component | Container | Port | Health Check |
|-----------|-----------|------|--------------|
| Frontend | fwchange-frontend | 3003 | HTTP 200 on / |
| Backend | fwchange-backend | 8002 | HTTP 200 on /health |
| PostgreSQL | fwchange-postgres | 5435 | pg_isready |
| Redis | fwchange-redis | 6382 | redis-cli ping |

**Critical User Flows**:
1. Login as admin
2. Create firewall change request
3. View change requests
4. Approve/reject request

### RetirementAI (Next.js + PostgreSQL + Redis)

| Component | Container | Port | Health Check |
|-----------|-----------|------|--------------|
| App | pension-app | 3001 | HTTP 200 on / |
| PostgreSQL | pension-postgres | 5433 | pg_isready |
| Redis | pension-redis | 6380 | redis-cli ping |

**Critical User Flows**:
1. User registration
2. User login
3. View portfolio
4. AI advisor interaction

### C3 Compliance (React + Node.js + PostgreSQL)

| Component | Container | Port | Health Check |
|-----------|-----------|------|--------------|
| Frontend | c3-frontend | 3002 | HTTP 200 on / |
| Backend | c3-api | 8001 | HTTP 200 on /health |
| PostgreSQL | c3-postgres | 5434 | pg_isready |
| Redis | c3-redis | 6381 | redis-cli ping |

**Critical User Flows**:
1. User login
2. Run compliance scan
3. View scan results
4. Generate report

---

## Failure Response Protocol

### When Smoke Test Fails

1. **Read the error message** - What exactly failed?
2. **Check logs** - `docker logs [container] --tail 100`
3. **Identify the layer** - Infrastructure? Database? API? Frontend?
4. **Fix the specific issue** - Don't guess, use evidence
5. **Re-run smoke test** - Verify fix worked

### When Integration Test Fails

1. **Identify which connection failed** - Frontend→Backend? Backend→DB?
2. **Check network** - Are containers on same network?
3. **Check environment variables** - Connection strings correct?
4. **Check CORS** - Frontend blocked from reaching backend?
5. **Fix and re-test** - Don't skip to next test

### When E2E Test Fails

1. **Take screenshot of failure state**
2. **Check browser console for errors**
3. **Check network requests for failures**
4. **Identify if UI, API, or data issue**
5. **Fix root cause, not symptoms**

---

## Success Criteria

An app is **PRODUCTION READY** when:

- [ ] All 5 layers pass their checks
- [ ] A new user can sign up (or existing user can log in)
- [ ] User can complete the primary feature flow
- [ ] No console errors in browser
- [ ] No failed API requests
- [ ] Screenshots document success

---

## Anti-Patterns to Avoid

| Bad Practice | Why It's Bad | Do This Instead |
|--------------|--------------|-----------------|
| Skip tests to "save time" | Broken app wastes more time | Run all tests every time |
| Declare "done" without testing | Users find bugs, not you | Test before declaring done |
| Fix symptoms, not causes | Bug comes back | Find root cause |
| Test only happy path | Edge cases break | Test error scenarios too |
| Ignore console warnings | Warnings become errors | Fix all warnings |
| Assume "it worked before" | Regression happens | Test after every change |

---

## Quick Reference Commands

### Docker Health Checks
```bash
# All containers status
docker ps -a --format "table {{.Names}}\t{{.Status}}"

# Specific container logs
docker logs [container] --tail 50

# Container health
docker inspect --format='{{.State.Health.Status}}' [container]

# Restart container
docker restart [container]
```

### Database Checks
```bash
# PostgreSQL ready
docker exec [db-container] pg_isready -U postgres

# Redis ready
docker exec [redis-container] redis-cli ping

# PostgreSQL tables
docker exec [db-container] psql -U postgres -d [database] -c "\dt"
```

### API Checks
```bash
# Health endpoint
curl -s http://localhost:[port]/health | jq

# GET request
curl -s http://localhost:[port]/api/endpoint | jq

# POST request
curl -s -X POST http://localhost:[port]/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}' | jq
```

### Playwright Quick Reference
```
browser_navigate    → Load URL
browser_snapshot    → Get page structure (accessibility tree)
browser_click       → Click element
browser_type        → Type into field
browser_fill_form   → Fill multiple fields
browser_wait_for    → Wait for text/element
browser_take_screenshot → Capture visual proof
browser_console_messages → Check for JS errors
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-25 | Initial workflow based on research |
