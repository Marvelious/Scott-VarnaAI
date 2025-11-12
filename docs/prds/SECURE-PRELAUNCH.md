# Secure Pre‑launch Deployment Playbook (VarnaAI Apps)

This playbook lets you put unfinished apps online safely for demos and internal testing without risking leaks, indexing, or attacks. It uses Cloudflare Zero Trust (Access + WAF) and avoids exposing origin ports.

---

## Goals

- Private-by-default exposure (SSO-gated, no public ports)
- Prevent search indexing and link leakage
- Strong TLS and security headers
- Separate staging data/secrets from production
- Simple rollout and rollback with Docker

---

## Recommended Architecture (secure and simple)

- Cloudflare (proxied orange-cloud) in front of everything
- Cloudflare Tunnel from your Hetzner VM (no inbound 80/443 required)
- Cloudflare Access (SSO) gate for all staging subdomains
- Response Header Transform Rules at Cloudflare for security headers
- Optional: local reverse proxy (Traefik/NGINX) if you prefer headers at origin

Subdomains (examples)
- `retirementai.dev.varnaai.com` → RetirementAI
- `platform.dev.varnaai.com` → VarnaAI Platform
- `fwchange.dev.varnaai.com` → FwChange

---

## Step‑by‑Step (Cloudflare Tunnel + Access)

1) DNS & Zero Trust
- Put domains in Cloudflare and proxy (orange cloud).
- Open Zero Trust dashboard → Access → Create an Application → Self‑hosted.
- Policy: Email/SSO allowlist (e.g., only `@classicsecurity.net` and designated testers).

2) Install cloudflared on the VM
```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo apt install ./cloudflared.deb
sudo cloudflared tunnel login   # Browser auth to Cloudflare
sudo cloudflared tunnel create varnaai-prelaunch
```

3) Configure routes to local services
Create `/etc/cloudflared/config.yml`:
```yaml
tunnel: varnaai-prelaunch
credentials-file: /etc/cloudflared/varnaai-prelaunch.json

ingress:
  - hostname: retirementai.dev.varnaai.com
    service: http://retirementai:3000
  - hostname: platform.dev.varnaai.com
    service: http://platform:3000
  - hostname: fwchange.dev.varnaai.com
    service: http://fwchange:3000
  - service: http_status:404
```
Map DNS in Cloudflare: Zero Trust → Tunnels → `varnaai-prelaunch` → Public Hostnames → add the three hostnames.

4) Run with Docker Compose
Use the sample compose below (apps + cloudflared sidecar). Adjust image/paths.

```yaml
version: "3.9"
services:
  retirementai:
    image: ghcr.io/varnaaicom/retirementai:latest
    env_file:
      - ./env/retirementai.staging.env
    networks: [internal]

  platform:
    image: ghcr.io/marvelious/varnaai-platform-frontend:latest
    env_file:
      - ./env/platform.staging.env
    networks: [internal]

  fwchange:
    image: ghcr.io/marvelious/fwchange:latest
    env_file:
      - ./env/fwchange.staging.env
    networks: [internal]

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel run varnaai-prelaunch
    volumes:
      - /etc/cloudflared:/etc/cloudflared:ro
    depends_on: [retirementai, platform, fwchange]
    networks: [internal]

networks:
  internal:
    driver: bridge
```

5) Enforce Access SSO
- Zero Trust → Access → Applications → select each hostname → add a policy that requires login via Google/Microsoft/Okta and/or allowed email list.
- Optional allowlist of specific IPs (Classic Security SOC, office IPs) for extra friction.

6) Block indexing (multiple layers)
- Cloudflare Transform Rule (HTTP Response Header): `X-Robots-Tag: noindex, nofollow, noarchive` on `*.dev.varnaai.com`.
- App‑level robots:
  - Next.js App Router: add `app/robots.ts` returning `disallow: '/'` for non‑prod.
  - WordPress: “Discourage search engines” in Reading settings.
- Meta robots tag on all staging templates: `<meta name="robots" content="noindex, nofollow" />`.

7) Security headers (at Cloudflare or origin)
Add Transform Rules to set these on staging hostnames:
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self' https: data:; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
If you prefer headers at origin, add the same via NGINX/Apache or Next.js middleware.

8) Rate limiting & WAF
- Cloudflare WAF: enable managed rules.
- Create rate limit rules for `/api/*` (e.g., 60 req/min/IP, 429 on exceed).
- Enable Bot Fight Mode on staging zones if needed.

9) Staging data & secrets
- Use separate staging DBs with anonymized data; never point staging at prod.
- Lock DB to private networks only; no public listener; enforce TLS if applicable.
- Store secrets in CI/CD or secret manager (1Password/Doppler); never commit `.env`.
- Rotate keys when promoting to prod.

10) Monitoring (private)
- Health checks via Cloudflare Access service tokens (so monitors can bypass login).
- UptimeRobot → custom header or token URL; do not make open unauthenticated health endpoints.

---

## Optional: Reverse proxy with Traefik (headers at origin)

If you want security headers, Basic Auth, and per‑service routing locally, add Traefik between apps and cloudflared (cloudflared then points to Traefik).

```yaml
version: "3.9"
services:
  traefik:
    image: traefik:v3.1
    command:
      - --entrypoints.web.address=:80
      - --providers.docker=true
    ports:
      - 127.0.0.1:8080:80   # only local; cloudflared connects internally
    networks: [internal]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  retirementai:
    image: ghcr.io/varnaaicom/retirementai:latest
    labels:
      - traefik.http.routers.retirementai.rule=Host(`retirementai.dev.varnaai.com`)
      - traefik.http.routers.retirementai.entrypoints=web
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.Strict-Transport-Security=max-age=63072000; includeSubDomains; preload
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.X-Content-Type-Options=nosniff
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.X-Frame-Options=SAMEORIGIN
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.Referrer-Policy=strict-origin-when-cross-origin
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.Permissions-Policy=camera=\(\), microphone=\(\), geolocation=\(\)
      - traefik.http.middlewares.sec-headers.headers.customresponseheaders.Content-Security-Policy=default-src 'self' https: data:; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests
      - traefik.http.routers.retirementai.middlewares=sec-headers
    networks: [internal]

  # Repeat similar labels for platform and fwchange services…

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel run varnaai-prelaunch
    networks: [internal]

networks: { internal: { driver: bridge } }
```

Point cloudflared `config.yml` services to `http://traefik:80` with `path`‑based routing or multiple routers.

---

## Next.js snippets (block indexing + env toggles)

Robots for non‑prod (App Router)
```ts
// app/robots.ts
export default function robots() {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';
  return isProd
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://example.com/sitemap.xml' }
    : { rules: { userAgent: '*', disallow: '/' } };
}
```

Meta robots helper
```tsx
// app/(marketing)/layout.tsx
export const metadata = {
  robots: process.env.NEXT_PUBLIC_ENV === 'prod' ? 'index,follow' : 'noindex,nofollow'
};
```

Simple Basic Auth (optional, for previews)
```ts
// middleware.ts (edge)
import { NextRequest, NextResponse } from 'next/server';
export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENV === 'prod') return NextResponse.next();
  const auth = req.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASS}`).toString('base64');
  if (auth === expected) return NextResponse.next();
  return new NextResponse('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Preview"' } });
}
```

---

## Database & Networking

- Use separate staging DBs; anonymize prod data before import.
- Bind DB to private interfaces only; security groups/firewalls deny public access.
- Rotate credentials regularly; least privilege (separate users for app vs migrations).
- Backups encrypted; restrict access; test restores.

---

## CI/CD Hardening

- GitHub Actions: use OIDC + short‑lived tokens; store secrets in repo/org secrets.
- Build SBOM (e.g., `cyclonedx`), run dependency audit (`npm audit --production`).
- Container scan (Trivy/Grype) on images before deploy.
- Protect main branch; require reviews and status checks.

---

## Final Checklist (staging)

- Cloudflare Tunnel running; no inbound ports open on VM
- Access SSO required on all staging hostnames
- X‑Robots‑Tag and app robots: noindex
- Security headers present (HSTS, CSP, XFO, XCTO, Referrer, Permissions)
- WAF + rate limits active for `/api/*`
- Separate staging DB; no production secrets; restricted networking
- Logs scrub PII; health checks require tokens
- GA4 disabled or limited on staging (respect consent)

When promoting to production, invert robots and indexing, remove Access gate (or keep for internal areas), and switch to production DB/secrets.

