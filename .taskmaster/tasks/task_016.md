# Task ID: 16

**Title:** All-Inkl DNS Configuration

**Status:** done

**Dependencies:** 9 ✓, 13 ✓

**Priority:** high

**Description:** Configure DNS records for all portfolio domains

**Details:**

Configure DNS records for all 5 portfolio subdomains on All-Inkl platform to point to Hetzner VPS IP (78.47.125.174).

Domains to configure:
1. fwchange.varnaai.com - A record to Hetzner VPS IP
2. retirementai.varnaai.com - A record to Hetzner VPS IP
3. c3.varnaai.com - A record to Hetzner VPS IP
4. seoagent.varnaai.com - A record to Hetzner VPS IP
5. intelligence.varnaai.com - A record to Hetzner VPS IP

Steps:
1. Log into All-Inkl DNS management portal
2. Navigate to varnaai.com domain DNS settings
3. Create A records for each subdomain pointing to 78.47.125.174
4. Verify DNS propagation using nslookup or dig commands
5. Wait for TTL expiration and global DNS propagation
6. Confirm SSL certificate generation for each subdomain

Dependencies satisfied:
- Task 9 (Hetzner VPS) completed: VPS infrastructure ready at 78.47.125.174
- Task 13 (C3 Static Build) must be completed before DNS activation

DNS Record Template:
```
fwchange.varnaai.com    A   78.47.125.174
retirementai.varnaai.com A 78.47.125.174
c3.varnaai.com          A   78.47.125.174
seoagent.varnaai.com    A   78.47.125.174
intelligence.varnaai.com A 78.47.125.174
```

**Test Strategy:**

1. Verify each DNS record using nslookup:
   - nslookup fwchange.varnaai.com
   - nslookup retirementai.varnaai.com
   - nslookup c3.varnaai.com
   - nslookup seoagent.varnaai.com
   - nslookup intelligence.varnaai.com

2. Test each domain resolves to correct IP (78.47.125.174)

3. Verify DNS propagation across multiple nameservers using online DNS checker tools

4. Confirm SSL certificate generation for each subdomain (Let's Encrypt via Caddy/nginx)

5. Test domain accessibility via browser (https://subdomain.varnaai.com)

6. Check domain propagation time and global DNS distribution

7. Verify no DNS conflicts or overlapping records
