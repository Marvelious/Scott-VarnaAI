# VarnaAI Apps Git Setup Status
**Date**: 2025-12-26

## Current Status Summary

| App | Folder | Has .git | GitHub Remote | Status |
|-----|--------|----------|---------------|--------|
| **dashboard** | apps/dashboard/ | ✅ | ✅ compliance-command-center | Ready |
| **fwchange** | apps/fwchange/ | ✅ | ✅ FwChange | Ready |
| **pension** | apps/pension/ | ✅ | ✅ RetirementAI | Ready |
| **projectmanager** | apps/projectmanager/ | ✅ | ❌ **NEEDS REMOTE** | Needs repo |
| **seoagent** | apps/seoagent/ | ✅ | ✅ seoagent | Ready |
| **varnaai** | apps/varnaai/ | ✅ | ✅ varnaai-platform | Ready |
| **webscrap** | apps/webscrap/ | ✅ | ✅ webscrap | Ready |
| **LibreChat** | apps/LibreChat/ | ✅ | ✅ danny-avila/LibreChat | External |
| **agenticcoder** | apps/agenticcoder/ | ✅ | ❌ **NEEDS REMOTE** | Needs repo |
| **taxapp** | apps/taxapp/ | ✅ | ❌ **NEEDS REMOTE** | Needs repo |

## Nested Apps Structure

```
apps/
├── agenticcoder/           # Needs GitHub repo
│   └── agenticcoder/       # Main app code
├── dashboard/              # ✅ compliance-command-center
│   ├── backend/
│   ├── frontend/
│   └── shared/
├── fwchange/               # ✅ FwChange
│   └── Jira-MCP-Server/
├── LibreChat/              # External fork (danny-avila)
│   ├── api/
│   ├── client/
│   └── mcp-bridge/
├── pension/                # ✅ RetirementAI
├── projectmanager/         # Needs GitHub repo
├── seoagent/               # ✅ seoagent
│   └── backend/
├── taxapp/                 # Needs GitHub repo
│   └── frontend/
├── varnaai/                # ✅ varnaai-platform
│   ├── playwright-mcp/
│   └── varnaai-app/
└── webscrap/               # ✅ webscrap
```

## Action Required: GitHub Authentication

**Problem**: GitHub CLI token is invalid/expired

**Solution**: Run this command in terminal:
```bash
gh auth login -h github.com
```

Follow the prompts to authenticate with browser or token.

## After Authentication: Create Repos & Push

Once authenticated, run these commands:

### 1. Create Missing Repos
```bash
# projectmanager
gh repo create projectmanager --private -d "AI-powered project management tool"
cd D:/VarnaAI/Websites/apps/projectmanager
git remote add origin https://github.com/Marvelious/projectmanager.git
git push -u origin master

# agenticcoder
gh repo create agenticcoder --private -d "Agentic AI coding assistant platform"
cd D:/VarnaAI/Websites/apps/agenticcoder
git remote add origin https://github.com/Marvelious/agenticcoder.git
git push -u origin master

# taxapp
gh repo create taxapp --private -d "Tax calculation and planning application"
cd D:/VarnaAI/Websites/apps/taxapp
git remote add origin https://github.com/Marvelious/taxapp.git
git push -u origin master
```

### 2. Push Updates to Existing Repos
```bash
# Check and push all repos with remotes
cd D:/VarnaAI/Websites/apps/dashboard && git push
cd D:/VarnaAI/Websites/apps/fwchange && git push
cd D:/VarnaAI/Websites/apps/pension && git push
cd D:/VarnaAI/Websites/apps/seoagent && git push
cd D:/VarnaAI/Websites/apps/varnaai && git push
cd D:/VarnaAI/Websites/apps/webscrap && git push
```

## GitHub Repositories (Marvelious Account)

| Repo Name | App | URL |
|-----------|-----|-----|
| compliance-command-center | dashboard | https://github.com/Marvelious/compliance-command-center |
| FwChange | fwchange | https://github.com/Marvelious/FwChange |
| RetirementAI | pension | https://github.com/Marvelious/RetirementAI |
| seoagent | seoagent | https://github.com/Marvelious/seoagent |
| varnaai-platform | varnaai | https://github.com/Marvelious/varnaai-platform |
| webscrap | webscrap | https://github.com/Marvelious/webscrap |
| projectmanager | projectmanager | **TO CREATE** |
| agenticcoder | agenticcoder | **TO CREATE** |
| taxapp | taxapp | **TO CREATE** |

## Scott Shareable Repo Plan

Create a curated repo for Scott containing:
- LibreChat (full - he already uses it)
- Documentation templates
- CLAUDE.md examples
- MCP configuration examples
- Setup guides

**Excludes** (proprietary):
- Business logic from production apps
- Customer data
- API keys/secrets
- Paid service integrations

## VarnaAIMaster Monorepo Plan

Create a master repo that references all apps as submodules:
```
VarnaAIMaster/
├── apps/
│   ├── dashboard -> git submodule
│   ├── fwchange -> git submodule
│   ├── pension -> git submodule
│   ├── projectmanager -> git submodule
│   ├── seoagent -> git submodule
│   ├── varnaai -> git submodule
│   ├── webscrap -> git submodule
│   ├── agenticcoder -> git submodule
│   └── taxapp -> git submodule
├── docs/
├── scripts/
└── docker-compose.yml
```

## Security Notes

1. ✅ All apps use `.env.example` (no real secrets committed)
2. ✅ `.gitignore` files exclude `node_modules/`, `.env`, `.secrets/`
3. ⚠️ `agenticcoder/.secrets/` folder has restricted permissions (not committed)
4. ✅ No password/credential files in staged changes
