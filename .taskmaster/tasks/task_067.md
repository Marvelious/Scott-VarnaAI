# Task ID: 67

**Title:** VPS Security Hardening Review - Q1 2026

**Status:** pending

**Dependencies:** None

**Priority:** low

**Description:** Quarterly security review of Hetzner VPS. Verify fail2ban effectiveness, update firewall rules, rotate credentials, and audit container security.

**Details:**

**NOTE:** Infrastructure task, not Bulgaria-specific. Deprioritized for Bulgaria launch.

**Current Security (per CLAUDE.md):**
- UFW firewall (deny all, allow 22/80/443)
- fail2ban: 4 jails, 75+ IPs banned SSH, 58+ bad bots
- Rate limiting: API 10r/s, login 1r/s, general 30r/s
- All containers bound to 127.0.0.1
- SSL certs valid until Feb 2026

**Review Tasks:**
1. Check fail2ban logs for new patterns
2. Update banned IP lists
3. Review nginx rate limiting effectiveness
4. Audit Docker container security
5. Check for OS security updates
6. Rotate any aging credentials
7. Verify backup procedures

**Documentation:**
- Update VPS_AUDIT_REPORT with findings
- Document any configuration changes
- Schedule next quarterly review

**Test Strategy:**

1. Security audit report generated
2. All services running post-review
3. No unauthorized access detected
4. Credentials rotated where needed
5. Documentation updated
