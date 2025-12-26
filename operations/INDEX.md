# Operations Directory Index

**Location**: `D:\VarnaAI\Websites\operations\`
**Last Updated**: 2025-12-26
**Purpose**: Infrastructure configuration, Docker files, automation scripts, and security

---

## Directory Structure

```
operations/
├── compose/            # Docker compose shared configs
├── cron/               # Scheduled automation scripts
├── env/                # Environment variable templates
├── hub-worker/         # Cloudflare Worker
├── monitoring/         # Uptime monitoring config
├── scripts/            # Blog publishing and automation
├── security/           # VPS security hardening
├── snippets/           # Reusable code snippets
└── [root files]        # Deployment guides and Makefile
```

---

## Root Files

| File | Purpose |
|------|---------|
| `Makefile` | Build and deployment commands |
| `README.md` | Operations overview |
| `projects.sample.yaml` | Sample projects configuration |
| `DEPLOYMENT_VERIFICATION_REPORT.md` | Deployment verification status |
| `HETZNER_DEPLOYMENT_ACTIONS.md` | Hetzner VPS deployment actions |
| `OLLAMA_SHARED_SETUP.md` | Shared Ollama LLM setup |

---

## Compose (`operations/compose/`)

Docker compose shared configurations:

| File | Purpose |
|------|---------|
| `compose.shared.yml` | Shared Docker compose base |
| `shared-ollama.yml` | Shared Ollama service config |

---

## Cron (`operations/cron/`)

Scheduled automation scripts:

| File | Platform | Purpose |
|------|----------|---------|
| `backlink-automation.bat` | Windows | Backlink automation |
| `backlink-automation.sh` | Linux | Backlink automation |

---

## Env (`operations/env/`)

| File | Purpose |
|------|---------|
| `.env.example` | Environment variable template |

---

## Hub Worker (`operations/hub-worker/`)

Cloudflare Worker for project routing:

| File | Purpose |
|------|---------|
| `package.json` | Node.js dependencies |
| `projects-loader.js` | Load project configs |
| `wrangler.toml` | Cloudflare Wrangler config |
| `src/index.js` | Worker source code |

---

## Monitoring (`operations/monitoring/`)

| File | Purpose |
|------|---------|
| `UPTIMEROBOT_CONFIG.md` | UptimeRobot monitoring setup |

---

## Scripts (`operations/scripts/`)

Blog publishing and automation scripts:

### Blog Publishing

| File | Purpose |
|------|---------|
| `auto-publish-blog.js` | Automated blog publishing |
| `AUTO-PUBLISH-README.md` | Auto-publish documentation |
| `audit-blog-posts.js` | Audit existing blog posts |
| `blog-automation-complete.js` | Complete blog automation |
| `blog-config.json` | Blog configuration |
| `check-blog-lengths.js` | Verify blog post lengths |
| `delete-test-posts.js` | Delete test posts |
| `generate-blog-ai.js` | AI blog generation |
| `generate-blog-post.js` | Blog post generator |
| `publish-all-blogs.js` | Publish all blogs |
| `publish-blog-complete.js` | Complete publish workflow |
| `publish-manual.js` | Manual publishing |
| `publish-one-fixed.js` | Publish single (fixed) |
| `publish-one-test.js` | Test single publish |
| `publish-with-playwright.js` | Playwright-based publishing |
| `quick-publish.js` | Quick publish script |
| `test-single-blog.js` | Test single blog |

### Status Files

| File | Purpose |
|------|---------|
| `AUTOMATION-SUMMARY.md` | Automation summary |
| `BLOG_PUBLISHING_ERRORS.md` | Publishing error log |
| `BLOG_PUBLISHING_STATUS_2025-12-16.md` | December 16 status |
| `PUBLISHING_MISTAKES_2025-12-16.md` | Publishing mistakes log |
| `.env.example` | Script environment template |

---

## Security (`operations/security/`)

VPS security hardening scripts:

### Hardening Scripts

| File | Purpose |
|------|---------|
| `01-ssh-hardening.sh` | SSH security hardening |
| `02-ufw-firewall.sh` | UFW firewall setup |
| `03-fail2ban.sh` | Fail2ban configuration |
| `04-auto-updates.sh` | Automatic security updates |
| `05-security-audit.sh` | Security audit script |
| `harden-vps.sh` | Complete VPS hardening |
| `FIX_ALL_2025-12-13.sh` | December 2025 fixes |

### Audit Reports

| File | Purpose |
|------|---------|
| `COMPREHENSIVE_SECURITY_AUDIT_2025-11-24.md` | November security audit |
| `VPS_AUDIT_2025-12-13.md` | December VPS audit |
| `README.md` | Security scripts overview |

---

## Snippets (`operations/snippets/`)

| File | Purpose |
|------|---------|
| `feedback.js` | User feedback collection |

---

## Infrastructure Overview

### Current Status (December 2025)

| Component | Status | Notes |
|-----------|--------|-------|
| Hetzner VPS | **OFFLINE** | Shutdown Dec 2025 |
| Local Docker | **ACTIVE** | All 10 apps running |
| Cloudflare Worker | **ACTIVE** | Project routing |
| All-Inkl Hosting | **ACTIVE** | WordPress sites |

### Port Allocation (Local Development)

| App | Frontend | Backend | PostgreSQL | Redis |
|-----|----------|---------|------------|-------|
| pension | 3001 | - | 5433 | 6380 |
| c3 | 3002 | 8001 | 5434 | 6381 |
| fwchange | 3003 | 8002 | 5435 | 6382 |
| seoagent | 3004 | 4000 | 5436 | 6383 |
| pm | 5173 | 3005 | 5438 | - |
| varnaai | 3007 | 8004 | 5437 | 6384 |

---

## Quick Commands

```bash
# Start all Docker apps
cd D:\VarnaAI\Websites\apps
docker-compose up -d

# Run security audit
./operations/security/05-security-audit.sh

# Publish blog posts
node operations/scripts/quick-publish.js

# Deploy Cloudflare Worker
cd operations/hub-worker && npx wrangler deploy
```

---

## Cross-References

- **Main CLAUDE.md**: `D:\VarnaAI\Websites\CLAUDE.md`
- **Apps**: `D:\VarnaAI\Websites\apps\INDEX.md`
- **Blogs**: `D:\VarnaAI\Websites\blogs\INDEX.md`
- **Secrets**: `D:\VarnaAI\Websites\work\secrets\`

---

*Generated: 2025-12-26*
