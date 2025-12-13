# Task ID: 66

**Title:** Uptime Kuma DNS Configuration - status.varnaai.com

**Status:** pending

**Dependencies:** None

**Priority:** low

**Description:** Configure DNS A record for status.varnaai.com pointing to Hetzner VPS (78.47.125.174). Uptime Kuma already installed, needs public access.

**Details:**

**NOTE:** Infrastructure task, not Bulgaria-specific. Deprioritized for Bulgaria launch.

**Current Status:** Uptime Kuma installed on VPS, needs DNS
**VPS IP:** 78.47.125.174
**Target Domain:** status.varnaai.com

**DNS Configuration:**
1. Login to domain registrar (Cloudflare or other)
2. Add A record: status.varnaai.com → 78.47.125.174
3. Wait for DNS propagation (5-30 minutes)
4. Verify nginx config handles subdomain
5. SSL certificate via Let's Encrypt

**nginx Config Needed:**
```nginx
server {
    server_name status.varnaai.com;
    location / {
        proxy_pass http://127.0.0.1:3001;
    }
}
```

**Post-Setup:**
- Create status page for all demos
- Monitor: c3.varnaai.com, demo-retirement.varnaai.com, demo-fwchange.varnaai.com
- Set up alerts for downtime

**Test Strategy:**

1. DNS resolves status.varnaai.com to VPS IP
2. HTTPS works with valid certificate
3. Uptime Kuma dashboard accessible
4. Demo sites being monitored
5. Alerts configured and tested
