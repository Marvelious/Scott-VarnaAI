# Task ID: 36

**Title:** C3 - Fix SSL certificate vulnerability (CRITICAL) - Remove self-signed certificate and implement Let's Encrypt

**Status:** pending

**Dependencies:** 19 ✓

**Priority:** high

**Description:** Remove self-signed SSL certificate from C3 dashboard and implement Let's Encrypt with automatic renewal to eliminate security vulnerability and improve trust.

**Details:**

1. Assess current SSL configuration on C3 dashboard (D:\VarnaAI\dashboard) - identify self-signed certificate details, expiration date, and current implementation method.

2. Set up Let's Encrypt certificate:
   - Install certbot on Hetzner VPS (78.47.125.174)
   - Choose appropriate Let's Encrypt plugin (nginx or standalone depending on C3 reverse proxy configuration)
   - Generate Let's Encrypt certificate for C3 subdomain (likely demo-c3.varnaai.com or similar)
   - Verify domain ownership during certificate generation

3. Configure automatic renewal:
   - Set up certbot auto-renewal via cron job (certbot renew --quiet runs twice daily)
   - Test renewal process: `certbot renew --dry-run`
   - Verify renewal logs in /var/log/letsencrypt/

4. Update reverse proxy/web server configuration:
   - Modify nginx or proxy configuration to use new Let's Encrypt certificate paths
   - Update certificate paths in Docker compose (D:\VarnaAI\operations\compose/) if containerized
   - Remove self-signed certificate from configuration completely
   - Add HTTP to HTTPS redirect (redirect port 80 → 443)

5. Update application code if necessary:
   - Check C3 source code (D:\VarnaAI\dashboard) for any hardcoded certificate references
   - Update any certificate pinning or validation logic if present
   - Verify Playwright MCP tests point to HTTPS URL

6. Configure certificate renewal notifications:
   - Set up email alerts for certificate renewal failures
   - Add monitoring for certificate expiration (30, 14, 7 days before expiration)

7. Document changes:
   - Record Let's Encrypt certificate details in operations documentation
   - Update deployment guide with certificate renewal process
   - Add certificate monitoring to runbook

**Test Strategy:**

1. SSL Certificate Verification:
   - Access C3 dashboard via HTTPS and click certificate icon in browser
   - Verify certificate issuer is 'Let's Encrypt Authority X3' (or current LE issuer)
   - Confirm certificate is valid (not self-signed, not expired)
   - Check certificate common name matches C3 domain
   - Verify certificate chain is complete (no chain errors)

2. Browser Security Tests:
   - Load C3 in Chrome/Firefox/Safari - verify no SSL warnings or errors
   - Run https://www.ssllabs.com/ssltest/ on C3 domain - target grade A or A+
   - Verify no mixed content warnings (all resources load over HTTPS)
   - Test on multiple browsers for consistency

3. Automatic Renewal Testing:
   - Run `certbot renew --dry-run` and verify success (no errors)
   - Check /var/log/letsencrypt/letsencrypt.log for successful renewal simulation
   - Verify cron job is scheduled: `sudo crontab -l | grep certbot`
   - Wait 24 hours and verify no renewal failure emails sent

4. HTTP Redirect Testing:
   - Access C3 via HTTP (port 80) - verify automatic redirect to HTTPS
   - Confirm redirect status code is 301 (permanent) or 302 (temporary)
   - Test that all resources load correctly after redirect

5. Downtime Verification:
   - Monitor C3 availability during certificate installation - should be <5 seconds
   - Verify application continues functioning normally post-update
   - Check application logs (Docker logs if containerized) for SSL-related errors

6. Security Scan:
   - Run vulnerability scan on updated C3 instance using tools like Nessus or OpenVAS
   - Verify no SSL/TLS vulnerabilities remain
   - Confirm no self-signed certificate references in security reports
