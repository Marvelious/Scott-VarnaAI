# GitHub Audit Report - VarnaAI Websites

**Date**: 2025-12-26
**Status**: Audit Complete - Action Required

---

## Summary

| Category | Count |
|----------|-------|
| Total apps | 10 |
| Apps with GitHub repos | 5 |
| Apps needing GitHub setup | 5 |
| .env files found (SENSITIVE) | 20 |
| .gitignore files | 30+ |

---

## Current Repository Structure

### Root Repository
```
D:\VarnaAI\Websites
├── Remote: https://github.com/Marvelious/varnaai-seo.git
├── Branch: master
└── Status: Modified files + many untracked
```

### Apps WITH GitHub Remotes (5)

| App | Directory | GitHub URL | Owner |
|-----|-----------|------------|-------|
| FwChange | apps/fwchange | github.com/Marvelious/FwChange | Marvelious |
| RetirementAI | apps/pension | github.com/Marvelious/RetirementAI | Marvelious |
| VarnaAI Platform | apps/varnaai | github.com/Marvelious/varnaai-platform | Marvelious |
| WebScrap | apps/webscrap | github.com/Marvelious/webscrap | Marvelious |
| LibreChat | apps/LibreChat | github.com/danny-avila/LibreChat | External (fork) |

### Apps WITHOUT GitHub Remotes (5)

| App | Directory | Has .git | Action Needed |
|-----|-----------|----------|---------------|
| C3 Compliance | apps/dashboard | Yes | Create repo, add remote |
| Project Manager | apps/projectmanager | Yes | Create repo, add remote |
| SEO Agent | apps/seoagent | Yes | Create repo, add remote |
| Agentic Coder | apps/agenticcoder | No | git init, create repo |
| Job Hunter | work/jobs | No | git init, create repo |

---

## Sensitive Files Inventory (NEVER COMMIT)

### .env Files Found (20 total)

**Root Level:**
- `./.env`

**Apps with .env:**
```
apps/agenticcoder/agenticcoder/.env
apps/dashboard/.env
apps/dashboard/backend/.env
apps/dashboard/frontend/.env
apps/fwchange/.env
apps/fwchange/backend/.env
apps/LibreChat/.env
apps/pension/.env
apps/pension/.next/standalone/.env
apps/projectmanager/.env
apps/seoagent/.env
apps/seoagent/backend/.env
apps/varnaai/.env
apps/varnaai/varnaai-app/.env
apps/varnaai/varnaai-app/backend/.env
apps/varnaai/varnaai-app/frontend/.env
apps/varnaai/varnaai-app/services/llm-gateway/.env
```

**Other locations:**
```
complaints-generator/backend/.env
marketing-machine/config/.env
```

### Other Sensitive Files

| File/Directory | Contains |
|----------------|----------|
| work/secrets/secrets.yaml | All API keys and passwords |
| wordpress/credentials.md | WordPress login details |
| vps/*/.env.example | Templates only (safe) |

---

## Recommended Repository Structure

### Option A: VarnaAIMaster Monorepo (Recommended)

```
VarnaAIMaster (GitHub Organization)
├── varnaai-websites (main docs, SEO, strategy) - PRIVATE
├── c3-compliance (apps/dashboard) - PRIVATE
├── fwchange (apps/fwchange) - PRIVATE
├── retirementai (apps/pension) - PRIVATE
├── varnaai-platform (apps/varnaai) - PRIVATE
├── seo-agent (apps/seoagent) - PRIVATE
├── webscrap (apps/webscrap) - PRIVATE
├── project-manager (apps/projectmanager) - PRIVATE
├── agentic-coder (apps/agenticcoder) - PRIVATE
└── job-hunter (work/jobs) - PRIVATE
```

### Option B: Single Monorepo

```
VarnaAIMaster (single repo)
├── apps/
│   ├── c3-compliance/
│   ├── fwchange/
│   ├── retirementai/
│   ├── ...
├── docs/
├── seo/
├── wordpress/
└── operations/
```

**Recommendation**: Option A (separate repos) for:
- Better access control per app
- Independent versioning
- Easier to share specific apps with collaborators

---

## Scott Shareable Content

### CAN Share (Non-Sensitive)

| Category | Content | Notes |
|----------|---------|-------|
| Research | research/*.md | Market research, no secrets |
| Strategy | docs/strategy/*.md | Business plans, market analysis |
| Case Studies | docs/case-studies/*.md | Anonymized, safe |
| Marketing | docs/marketing/*.md | LinkedIn posts, templates |
| SEO Strategy | seo/*.md | Keyword research, audits |
| Blog Templates | blogs/*.md | Instructions, topics |
| Sales Templates | assets/sales-materials-bg/*.md | Bulgarian templates |

### CANNOT Share (Sensitive)

| Category | Reason |
|----------|--------|
| work/secrets/ | All credentials |
| wordpress/credentials.md | WordPress logins |
| Any .env file | API keys, DB passwords |
| vps/ configs with secrets | Server credentials |
| CLAUDE.md (full) | Contains credential paths |

### Recommended: Create Scott's Read-Only Folder

```
D:\VarnaAI\Websites\shared-with-scott\
├── research/           (symlink or copy)
├── strategy/           (symlink or copy)
├── case-studies/       (symlink or copy)
├── marketing-templates/
├── seo-guides/
└── README.md           (index for Scott)
```

---

## Action Plan

### Phase 1: Cleanup (Now)

1. [ ] Verify all .gitignore files include `.env`
2. [ ] Create `.env.example` templates for each app
3. [ ] Remove any accidentally committed secrets
4. [ ] Update root .gitignore with comprehensive patterns

### Phase 2: Repository Setup

1. [ ] Create GitHub repos for 5 apps without remotes
2. [ ] Push existing code to new repos
3. [ ] Set all repos to PRIVATE
4. [ ] Add README.md to each repo

### Phase 3: Organization Setup (Optional)

1. [ ] Create VarnaAI GitHub Organization
2. [ ] Transfer repos to organization
3. [ ] Set up teams and permissions

### Phase 4: Scott Access

1. [ ] Create shared folder structure
2. [ ] Copy/symlink shareable content
3. [ ] Create index README for Scott
4. [ ] Share Google Drive link or Git read-only access

---

## Git Commands Reference

### Create repo for app without remote

```bash
# For apps/dashboard (C3 Compliance)
cd apps/dashboard
gh repo create Marvelious/c3-compliance --private --source=. --remote=origin --push

# For apps/seoagent
cd apps/seoagent
gh repo create Marvelious/seo-agent --private --source=. --remote=origin --push

# For apps/projectmanager
cd apps/projectmanager
gh repo create Marvelious/project-manager --private --source=. --remote=origin --push

# For apps/agenticcoder (needs git init first)
cd apps/agenticcoder
git init
gh repo create Marvelious/agentic-coder --private --source=. --remote=origin --push
```

### Verify .gitignore coverage

```bash
# Check if .env is in .gitignore
grep -r "\.env" apps/*/.gitignore
```

---

## Files Modified in This Session

- D:\VarnaAI\Websites\PROJECT_INDEX.md (complete rewrite)
- D:\VarnaAI\Websites\DOCUMENTATION_INDEX.md (enhanced)
- D:\VarnaAI\Websites\claudedocs\GITHUB_AUDIT_2025-12-26.md (this file)

---

**Next Steps**: User to decide on repository structure (Option A or B) and proceed with Phase 1 cleanup.
