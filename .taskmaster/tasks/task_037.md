# Task ID: 37

**Title:** C3 - Fix authentication system - Repair JWT implementation, restore user sessions, fix middleware security

**Status:** in-progress

**Dependencies:** 35 ✓, 36, 19 ✓

**Priority:** high

**Description:** Repair the C3 authentication system by fixing JWT token generation/validation, restoring user session persistence, and implementing proper security middleware to prevent unauthorized access and session hijacking vulnerabilities.

**Details:**

1. JWT Implementation Analysis Phase:
   - Examine D:\VarnaAI\dashboard source code for JWT token generation and validation logic
   - Identify current JWT library (likely jsonwebtoken or similar) and token payload structure
   - Check token expiration settings, refresh token implementation, and secret key management
   - Review token storage mechanism (localStorage, sessionStorage, httpOnly cookies)
   - Identify any issues: expired tokens not being refreshed, invalid signature validation, missing token rotation

2. Session Persistence Restoration:
   - Implement proper session storage mechanism (Redis recommended for distributed sessions on Hetzner VPS)
   - Create session middleware to validate JWT tokens against server-side session store
   - Implement token refresh endpoint that validates old token and issues new token with extended expiration
   - Add session timeout logic (recommend 15-30 minute idle timeout, 7-day absolute timeout)
   - Ensure session data includes user ID, roles, permissions for authorization checks

3. Security Middleware Implementation:
   - Create authentication middleware to verify JWT on protected routes
   - Implement CORS security headers and CSRF protection
   - Add rate limiting on login/token refresh endpoints (prevent brute force attacks)
   - Implement proper error handling that doesn't leak information about token validity
   - Add token blacklisting mechanism for logout functionality
   - Ensure sensitive endpoints require re-authentication for critical operations (password change, admin actions)
   - Configure secure cookie flags: httpOnly, Secure, SameSite=Strict

4. Implementation Details:
   - Use asymmetric key pair (RS256 algorithm) for token signing if distributed across multiple servers
   - Implement JWT claims: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration), iat (issued at), nbf (not before)
   - Store JWT secret securely in environment variables, never in source code
   - Implement proper password hashing (bcrypt with salt rounds 10+) if fixing credential storage
   - Add audit logging for authentication events (successful login, failed attempts, token refresh)

5. Testing Against Common JWT Vulnerabilities:
   - Verify tokens cannot be used after logout
   - Confirm expired tokens are rejected
   - Validate tokens signed with different secrets are rejected
   - Test that modifying token payload invalidates token
   - Confirm missing or malformed tokens are handled securely
   - Verify CORS headers prevent unauthorized domain access

**Test Strategy:**

1. JWT Token Validation Testing:
   - Generate valid JWT token and verify it grants access to protected endpoints
   - Attempt access with expired token and confirm 401/403 response
   - Modify token payload and verify signature validation rejects it
   - Test token refresh endpoint: submit valid but expired token and confirm new token issued
   - Verify new token has updated expiration time

2. Session Persistence Testing:
   - Log in user and verify session created in Redis/session store
   - Close browser, reopen same domain, verify user remains logged in within timeout window
   - Wait for session timeout period and verify user must re-authenticate
   - Test multiple concurrent sessions for same user and verify all sessions properly managed
   - Verify logout clears session from store and invalidates token

3. Security Middleware Testing:
   - Attempt to access protected endpoints without token - confirm rejection
   - Attempt to access with malformed token - confirm rejection
   - Test rate limiting on login endpoint by making 20+ login attempts rapidly - confirm blocking after threshold
   - Verify CORS headers prevent requests from unauthorized origins
   - Test CSRF protection by attempting cross-site requests
   - Verify httpOnly flag prevents JavaScript access to authentication cookies
   - Confirm sensitive operations (password change, admin functions) require re-authentication

4. Integration Testing:
   - Perform full login/logout/login cycle and verify session continuity
   - Test across multiple browser tabs - verify session shared correctly
   - Test on different devices/browsers and verify proper session isolation
   - Verify audit logs record all authentication events with timestamps and IP addresses
   - Deploy to Hetzner VPS test environment and verify authentication works across HTTPS connection

5. Security Vulnerability Scan:
   - Run OWASP ZAP or Burp Suite security scanner against authentication endpoints
   - Check for token leakage in logs or error messages
   - Verify no tokens hardcoded in frontend source or configuration files
   - Confirm no session fixation vulnerabilities exist
