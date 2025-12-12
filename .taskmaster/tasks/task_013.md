# Task ID: 13

**Title:** C3 Compliance React Static Build

**Status:** done

**Dependencies:** 9 ✓, 10 ✗

**Priority:** medium

**Description:** Convert React TypeScript frontend to static site

**Details:**

1. Use create-react-app build for static export
2. Configure Docker for static hosting
3. Set up Traefik routing for c3.varnaai.com
Pseudo-code:
```bash
# Build static files
npm run build

# Dockerfile for static hosting
FROM nginx:alpine
COPY build/ /usr/share/nginx/html
```
```yaml
# Traefik configuration
c3:
  labels:
    - traefik.http.routers.c3.rule=Host(`c3.varnaai.com`)
```

**Test Strategy:**

1. Verify static build completes
2. Check site loads without errors
3. Test Lighthouse performance
4. Validate responsive design
