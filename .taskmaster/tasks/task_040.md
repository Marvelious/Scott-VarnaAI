# Task ID: 40

**Title:** FwChange - Implement ServiceNow CMDB Integration with MFA and AI Policy Conflict Prediction

**Status:** pending

**Dependencies:** 3 ✓, 4 ✓, 8 ✓, 19 ✓

**Priority:** high

**Description:** Integrate ServiceNow CMDB with FwChange backend, implement multi-factor authentication for enterprise access, and develop AI-powered firewall policy conflict prediction engine for enterprise firewall management.

**Details:**

1. Analyze existing FwChange backend architecture (D:\VarnaAI\fwchange) to understand current ITSM integrations (Jira, ServiceNow) and multi-vendor firewall support (Palo Alto, Check Point, Cisco, Fortinet).

2. Implement ServiceNow CMDB Integration:
   - Create ServiceNow API client wrapper using existing OAuth2 authentication patterns
   - Map firewall device inventory to CMDB Configuration Items (CIs) with automatic bidirectional sync
   - Implement webhook handlers for CMDB change events to trigger FwChange policy reviews
   - Store CMDB sync state in PostgreSQL with timestamp and change tracking
   - Create data transformation layer to normalize multi-vendor firewall configs into CMDB-compatible format
   - Example: Palo Alto security objects → ServiceNow firewall rule CIs

3. Implement Multi-Factor Authentication (MFA):
   - Add TOTP (Time-based One-Time Password) support using speakeasy or similar library
   - Implement SMS-based OTP as secondary factor using Twilio or AWS SNS
   - Create MFA enrollment workflow in user settings with backup codes
   - Update JWT token generation to include MFA verification claim
   - Implement MFA challenge middleware for enterprise user sessions
   - Store MFA secrets encrypted in PostgreSQL with secure key rotation

4. Develop AI Policy Conflict Prediction Engine:
   - Analyze existing firewall policy data structure across multi-vendor platforms
   - Create conflict detection rules based on: overlapping source/destination CIDR blocks, conflicting allow/deny rules, undefined application protocols, missing logging clauses
   - Implement ML model using historical policy data (leverage existing Ollama/LM Studio setup from RetirementAI) for predictive conflict identification
   - Create scoring system: critical conflicts (blocks legitimate traffic), medium conflicts (inconsistent security posture), low conflicts (style/documentation issues)
   - Build recommendation engine to suggest rule consolidation, reordering, or remediation steps
   - Integrate with ServiceNow to create change tickets automatically for detected conflicts

5. API Endpoints:
   - POST /api/cmdb/sync - Trigger manual CMDB synchronization
   - GET /api/cmdb/devices - List synchronized CMDB devices
   - POST /api/mfa/setup - Enroll new MFA device
   - POST /api/mfa/verify - Verify MFA token during login
   - POST /api/policies/analyze-conflicts - Run conflict prediction on firewall policies
   - GET /api/policies/conflicts - Retrieve detected conflicts with risk scoring
   - POST /api/policies/create-remediation-ticket - Auto-create ServiceNow change tickets

6. Database Schema Updates:
   - Add mfa_secrets table with encrypted TOTP secrets and backup codes
   - Add cmdb_sync_log table for tracking CMDB synchronization history
   - Add policy_conflicts table with conflict type, severity, affected rules, and remediation suggestions
   - Add audit_trail entries for all MFA and CMDB operations

7. Security Considerations:
   - Encrypt MFA secrets using AES-256 with key rotation
   - Implement rate limiting on MFA verification endpoints (max 5 attempts per 15 minutes)
   - Ensure ServiceNow API credentials stored in secure vault (AWS Secrets Manager or HashiCorp Vault)
   - Log all CMDB access and policy conflict analysis for compliance audit trails
   - Implement IP whitelisting for ServiceNow API calls from FwChange backend

**Test Strategy:**

1. ServiceNow CMDB Integration Tests:
   - Unit tests: Verify CMDB API client correctly maps firewall devices to CIs
   - Integration test: Sync 50+ firewall devices from Palo Alto, Check Point, Cisco, Fortinet instances to ServiceNow test instance
   - Verify bidirectional sync: Update CI in CMDB, confirm change reflected in FwChange within 5 seconds
   - Test webhook handlers: Trigger CMDB change event, confirm FwChange receives and processes notification
   - Validate data transformation: Compare original firewall config vs CMDB CI representation for accuracy

2. MFA Implementation Tests:
   - Unit tests: TOTP generation, verification, time window tolerance (±30 seconds)
   - Integration test: Complete MFA enrollment flow with TOTP secret generation
   - Test SMS OTP delivery and verification with mock Twilio API
   - Verify JWT tokens include MFA claim when user authenticates
   - Test backup codes: Use 10+ backup codes, verify one-time usage enforcement
   - Security test: Attempt brute force on MFA endpoints, verify rate limiting blocks after 5 failed attempts
   - Test MFA session expiration and re-authentication requirements

3. AI Policy Conflict Prediction Tests:
   - Create test dataset: 200+ firewall rules with known conflicts (overlapping CIDRs, conflicting allow/deny, missing logging)
   - Unit tests: Verify each conflict detection rule identifies expected issues
   - Test conflict scoring: High-severity conflicts (blocks legitimate traffic) score > 80, medium > 40, low > 0
   - Integration test: Run conflict analysis on representative Palo Alto, Check Point, Cisco, Fortinet rulesets
   - Verify ML model predictions: Compare AI-predicted conflicts vs manual expert review (target > 85% accuracy)
   - Test recommendation generation: Verify suggested rule changes resolve conflicts without breaking security policy
   - Test ServiceNow ticket creation: Generate 5+ conflict-based tickets, verify they appear in ServiceNow with correct priority/description

4. End-to-End Enterprise Workflow Test:
   - Create test user account with MFA enabled
   - Authenticate with password + TOTP token
   - Trigger CMDB sync for test firewall devices
   - Run policy conflict analysis
   - Verify conflict results and auto-generated ServiceNow tickets
   - Confirm audit trail logs all operations with user, timestamp, and MFA status

5. Performance Benchmarks:
   - CMDB sync: < 2 minutes for 100+ devices
   - Conflict analysis: < 30 seconds for 1000-rule policies
   - MFA verification: < 500ms per attempt
   - API response times: < 1 second for all new endpoints

6. Security Audit:
   - Verify MFA secrets never logged in plaintext
   - Confirm ServiceNow API credentials not exposed in error messages or logs
   - Test that CMDB sync respects ServiceNow role-based access controls
   - Validate rate limiting on MFA endpoints prevents brute force
