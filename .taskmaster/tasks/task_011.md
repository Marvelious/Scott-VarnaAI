# Task ID: 11

**Title:** FwChange Static Site Deployment

**Status:** cancelled

**Dependencies:** 9 ✓, 10 ✗

**Priority:** medium

**Description:** Deploy FwChange landing page as static site with Docker

**Details:**

1. Create Dockerfile for Nginx Alpine
2. Copy FwChange landing page files
3. Configure Traefik labels for routing
4. Set up domain fwchange.varnaai.com
Pseudo-code:
```dockerfile
FROM nginx:alpine
COPY landing/ /usr/share/nginx/html
```
```yaml
# Docker Compose Service
fwchange:
  labels:
    - traefik.http.routers.fwchange.rule=Host(`fwchange.varnaai.com`)
    - traefik.enable=true
```

**Test Strategy:**

1. Verify site accessible via HTTPS
2. Check Lighthouse performance score
3. Test mobile responsiveness
4. Validate all links and resources load correctly
