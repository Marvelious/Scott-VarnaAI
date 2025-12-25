# /sc:debug - Production Readiness Agent

> **Trigger**: Type `debug` or `/sc:debug [app-name]`
> **Purpose**: Systematically verify an app is production-ready before declaring "done"

---

## Quick Start

```
debug fwchange      → Run full production readiness check on FwChange
debug pension       → Run full production readiness check on RetirementAI
debug c3            → Run full production readiness check on C3 Compliance
debug               → Ask which app to test
```

---

## Agent Behavior

When triggered, the Debug Agent executes these phases IN ORDER:

### Phase 1: SMOKE TEST (Stop on failure)

```yaml
actions:
  - Check Docker containers are running
  - Check required ports are accessible
  - Load homepage in browser
  - Verify no immediate crash

on_failure: STOP → Report error → Wait for fix
on_success: Continue to Phase 2
```

### Phase 2: COMPONENT VERIFICATION (Stop on failure)

```yaml
actions:
  - Database: Test connection (pg_isready / redis-cli ping)
  - Backend: Test health endpoint (curl /health)
  - Frontend: Load page, check console for errors

on_failure: STOP → Report error → Wait for fix
on_success: Continue to Phase 3
```

### Phase 3: INTEGRATION VERIFICATION (Stop on failure)

```yaml
actions:
  - Frontend → Backend: Make API call via browser
  - Backend → Database: Query via API that uses DB
  - Auth flow: Login attempt

on_failure: STOP → Report error → Wait for fix
on_success: Continue to Phase 4
```

### Phase 4: E2E USER FLOWS (Document all)

```yaml
actions:
  - Registration flow (if applicable)
  - Login flow
  - Core feature flow
  - Logout flow

on_failure: Document failure → Continue testing other flows
on_success: Document success with screenshot
```

### Phase 5: REPORT

```yaml
actions:
  - Generate summary of all tests
  - List passed/failed checks
  - Provide screenshots as evidence
  - Declare: PRODUCTION READY or NEEDS FIXES

output: Structured report in claudedocs/debug/
```

---

## App Configurations

### FwChange

```yaml
name: fwchange
location: D:\VarnaAI\fwchange
docker_compose: D:\VarnaAI\fwchange\docker-compose.yml

containers:
  frontend:
    name: fwchange-frontend
    port: 3003
    health: HTTP 200 on /
  backend:
    name: fwchange-backend
    port: 8002
    health: HTTP 200 on /health or /docs
  postgres:
    name: fwchange-postgres
    port: 5435
    health: pg_isready
  redis:
    name: fwchange-redis
    port: 6382
    health: redis-cli ping

user_flows:
  - name: "Admin Login"
    steps:
      - Navigate to http://localhost:3003
      - Click login
      - Enter admin credentials
      - Verify dashboard loads
  - name: "Create Change Request"
    steps:
      - From dashboard, navigate to new request
      - Fill out form
      - Submit
      - Verify request appears in list
```

### RetirementAI (Pension)

```yaml
name: pension
location: D:\VarnaAI\pension
docker_compose: D:\VarnaAI\pension\docker-compose.yml

containers:
  app:
    name: pension-app
    port: 3001
    health: HTTP 200 on /
  postgres:
    name: pension-postgres
    port: 5433
    health: pg_isready
  redis:
    name: pension-redis
    port: 6380
    health: redis-cli ping

user_flows:
  - name: "User Registration"
    steps:
      - Navigate to http://localhost:3001
      - Click sign up
      - Fill registration form
      - Verify account created
  - name: "User Login"
    steps:
      - Navigate to login
      - Enter credentials
      - Verify dashboard loads
  - name: "View Portfolio"
    steps:
      - From dashboard, go to portfolio
      - Verify portfolio data displays
```

### C3 Compliance

```yaml
name: c3
location: D:\VarnaAI\dashboard
docker_compose: D:\VarnaAI\dashboard\docker-compose.yml

containers:
  frontend:
    name: c3-frontend
    port: 3002
    health: HTTP 200 on /
  backend:
    name: c3-api
    port: 8001
    health: HTTP 200 on /health
  postgres:
    name: c3-postgres
    port: 5434
    health: pg_isready
  redis:
    name: c3-redis
    port: 6381
    health: redis-cli ping

user_flows:
  - name: "User Login"
    steps:
      - Navigate to http://localhost:3002
      - Enter credentials
      - Verify dashboard loads
  - name: "Run Compliance Scan"
    steps:
      - From dashboard, start new scan
      - Enter target URL
      - Wait for scan completion
      - Verify results display
```

---

## Execution Rules

### MUST Follow

1. **Never skip phases** - Each phase must pass before continuing
2. **Stop on failure** - Fix issue before continuing (except Phase 4)
3. **Document everything** - Screenshots, logs, error messages
4. **Report root cause** - Not just "it failed" but WHY
5. **No guessing** - Use evidence from logs/errors

### MUST NOT Do

1. **Don't declare "working"** if any test failed
2. **Don't skip to user flows** without infrastructure passing
3. **Don't ignore warnings** - They become errors
4. **Don't assume** - Verify everything
5. **Don't work around issues** - Fix the root cause

---

## Output Format

After running, generate report:

```markdown
# Debug Report: [App Name]
**Date**: [timestamp]
**Status**: PRODUCTION READY | NEEDS FIXES

## Phase 1: Smoke Test
- [x] Containers running
- [x] Ports accessible
- [x] Homepage loads
- Result: PASS/FAIL

## Phase 2: Component Verification
- [x] Database: [status]
- [x] Backend: [status]
- [x] Frontend: [status]
- Result: PASS/FAIL

## Phase 3: Integration Verification
- [x] Frontend → Backend: [status]
- [x] Backend → Database: [status]
- [x] Auth flow: [status]
- Result: PASS/FAIL

## Phase 4: User Flows
- [x] Login: [status]
- [x] Core Feature: [status]
- [x] Logout: [status]
- Result: PASS/FAIL

## Issues Found
1. [Issue description]
   - Layer: [which layer]
   - Error: [actual error message]
   - Fix Required: [what needs to change]

## Evidence
- Screenshots: [list of files]
- Logs: [relevant log excerpts]

## Verdict
[PRODUCTION READY - User can sign up and use the app]
or
[NEEDS FIXES - See issues above]
```

---

## Integration with Claude Code

When user types `debug [app]`:

1. Load this agent configuration
2. Load app-specific config from above
3. Execute phases in order
4. Generate report
5. Save report to `claudedocs/debug/[app]-[date].md`

---

## EXECUTABLE COMMANDS: FwChange

### Phase 1: Smoke Test - EXECUTE THESE

```bash
# Step 1.1: Check all containers
docker ps -a --filter "name=fwchange" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Step 1.2: Check frontend port
curl -s -o /dev/null -w "%{http_code}" http://localhost:3003

# Step 1.3: Check backend health
curl -s http://localhost:8002/health

# Step 1.4: Check backend docs
curl -s -o /dev/null -w "%{http_code}" http://localhost:8002/docs
```

**Playwright Commands:**
```
browser_navigate → http://localhost:3003
browser_snapshot → capture page structure
browser_console_messages → check for JS errors
browser_take_screenshot → evidence
```

### Phase 2: Component Verification - EXECUTE THESE

```bash
# Step 2.1: PostgreSQL connection
docker exec fwchange-postgres pg_isready -U postgres

# Step 2.2: Redis connection
docker exec fwchange-redis redis-cli ping

# Step 2.3: Database exists with tables
docker exec fwchange-postgres psql -U postgres -d fwchange -c "\dt"

# Step 2.4: Backend container logs (last 50 lines)
docker logs fwchange-backend --tail 50

# Step 2.5: Frontend container logs
docker logs fwchange-frontend --tail 50
```

### Phase 3: Integration Verification - EXECUTE THESE

```bash
# Step 3.1: Test auth endpoint exists
curl -s -X POST http://localhost:8002/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'

# Step 3.2: Test changes endpoint (should require auth)
curl -s http://localhost:8002/api/v1/changes

# Step 3.3: Test analytics endpoint
curl -s http://localhost:8002/api/v1/analytics/dashboard

# Step 3.4: Test firewalls endpoint
curl -s http://localhost:8002/api/v1/firewalls
```

**Playwright Commands:**
```
browser_navigate → http://localhost:3003/login
browser_snapshot → verify login form exists
browser_network_requests → check API calls work
```

### Phase 4: E2E User Flows - EXECUTE THESE

**Flow 1: Login**
```
browser_navigate → http://localhost:3003/login
browser_snapshot → find email/password fields
browser_type → email field with test credentials
browser_type → password field
browser_click → login button
browser_wait_for → dashboard or error message
browser_take_screenshot → evidence
```

**Flow 2: Create Change Request**
```
browser_navigate → http://localhost:3003/changes/new
browser_snapshot → find form fields
browser_fill_form → source_ip, dest_ip, port, action
browser_click → submit button
browser_wait_for → success message
browser_take_screenshot → evidence
```

**Flow 3: View Analytics**
```
browser_navigate → http://localhost:3003/analytics
browser_snapshot → verify charts load
browser_take_screenshot → evidence
```

### Phase 5: Generate Report

After all tests, create report at:
`D:\VarnaAI\Websites\claudedocs\debug\fwchange-[date].md`

---

## EXECUTABLE COMMANDS: RetirementAI (Pension)

### Phase 1: Smoke Test

```bash
docker ps -a --filter "name=pension" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
```

### Phase 2: Component Verification

```bash
docker exec pension-postgres pg_isready -U postgres
docker exec pension-redis redis-cli ping
docker logs pension-app --tail 50
```

### Phase 3-5: Similar to FwChange

---

## EXECUTABLE COMMANDS: C3 Compliance

### Phase 1: Smoke Test

```bash
docker ps -a --filter "name=c3" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3002
curl -s http://localhost:8001/health
```

### Phase 2: Component Verification

```bash
docker exec c3-postgres pg_isready -U postgres
docker exec c3-redis redis-cli ping
docker logs c3-api --tail 50
docker logs c3-frontend --tail 50
```

### Phase 3-5: Similar to FwChange

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-25 | Initial agent definition |
| 1.1 | 2025-12-25 | Added executable commands for all apps |
