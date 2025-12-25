# MCP Server Installation Commands for Claude Code (2025)

**Last Updated**: 2025-12-25
**Tested With**: Claude Code CLI

---

## Quick Install (Copy-Paste Ready)

### Tier 1: Essential MCP Servers

```bash
# 1. GitHub MCP (Official) - Version control
claude mcp add github

# 2. Playwright MCP (Microsoft) - Browser automation
claude mcp add playwright -- npx -y @anthropic-ai/mcp-server-playwright

# 3. Context7 MCP - Real-time documentation
claude mcp add context7 -- npx -y @upstash/context7-mcp

# 4. Sequential Thinking (Anthropic) - Structured reasoning
claude mcp add sequential-thinking -- npx -y @anthropic-ai/mcp-server-sequential-thinking

# 5. Filesystem MCP (Anthropic) - File operations
claude mcp add filesystem -- npx -y @anthropic-ai/mcp-server-filesystem
```

### Tier 2: Design & UI

```bash
# 6. Figma MCP (Official) - Design-to-code
# First enable in Figma Desktop: Settings > Dev Mode > Enable MCP Server
claude mcp add figma

# 7. Magic MCP (21st.dev) - AI UI components
# Get API key from https://21st.dev/magic
npx @21st-dev/cli@latest install
claude mcp add magic -- npx -y @21st-dev/magic-mcp

# 8. Shadcn UI MCP - Component registry
claude mcp add shadcn-ui -- npx -y @anthropic-ai/mcp-server-shadcn
```

### Tier 3: Database & Data

```bash
# 9. PostgreSQL MCP - Database queries
claude mcp add postgres -- npx -y @anthropic-ai/mcp-server-postgres \
  -e POSTGRES_CONNECTION_STRING="postgresql://user:pass@localhost:5432/db"

# Alternative with individual env vars:
claude mcp add postgres-c3 \
  -e PG_HOST=localhost \
  -e PG_PORT=5432 \
  -e PG_USER=postgres \
  -e PG_PASSWORD=changeme \
  -e PG_DATABASE=compliance_db \
  -- npx -y mcp-postgres-server
```

### Tier 4: Cloud & Infrastructure

```bash
# 10. AWS MCP - AWS services
claude mcp add aws -- npx -y @anthropic-ai/mcp-server-aws

# 11. Docker MCP - Container management
claude mcp add docker -- npx -y @anthropic-ai/mcp-server-docker
```

### Tier 5: Productivity

```bash
# 12. Notion MCP - Documentation
claude mcp add notion -- npx -y @anthropic-ai/mcp-server-notion \
  -e NOTION_API_KEY="your-notion-api-key"

# 13. Sentry MCP - Error monitoring
claude mcp add sentry -- npx -y @anthropic-ai/mcp-server-sentry \
  -e SENTRY_AUTH_TOKEN="your-sentry-token"

# 14. Slack MCP - Communication
claude mcp add slack -- npx -y @anthropic-ai/mcp-server-slack \
  -e SLACK_BOT_TOKEN="xoxb-your-token"
```

### Tier 6: Search & Research

```bash
# 15. Exa MCP - Web search
claude mcp add exa -- npx -y @anthropic-ai/mcp-server-exa \
  -e EXA_API_KEY="your-exa-key"

# 16. Tavily MCP - Research
claude mcp add tavily -- npx -y @anthropic-ai/mcp-server-tavily \
  -e TAVILY_API_KEY="your-tavily-key"

# 17. Fetch MCP - Web content
claude mcp add fetch -- npx -y @anthropic-ai/mcp-server-fetch
```

---

## Detailed Installation Instructions

### GitHub MCP
```bash
# Simple install (uses GitHub CLI auth)
claude mcp add github

# With personal access token
claude mcp add github -- npx -y @anthropic-ai/mcp-server-github \
  -e GITHUB_TOKEN="ghp_your_token_here"
```

**Required**: GitHub CLI (`gh`) authenticated OR personal access token

---

### Playwright MCP (Microsoft)
```bash
# Basic install
claude mcp add playwright -- npx -y @anthropic-ai/mcp-server-playwright

# With browser options
claude mcp add playwright -- npx -y @anthropic-ai/mcp-server-playwright \
  --browser chromium \
  --headless
```

**Note**: First run may download browser binaries (~200MB)

---

### Context7 MCP
```bash
# Option A: Remote server (simplest)
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# Option B: Local server
claude mcp add context7 -- npx -y @upstash/context7-mcp

# Option C: With API key (for higher rate limits)
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

**API Key**: Get from https://context7.com (optional, increases rate limits)

---

### Sequential Thinking MCP
```bash
# Anthropic reference implementation
claude mcp add sequential-thinking -- npx -y @anthropic-ai/mcp-server-sequential-thinking

# Enhanced version with tool recommendations
claude mcp add sequential-thinking -- npx -y mcp-sequentialthinking-tools
```

---

### Figma MCP
```bash
# Step 1: Enable in Figma Desktop App
# Settings > Dev Mode Preferences > Enable MCP Server

# Step 2: Add to Claude Code
claude mcp add figma

# Alternative: With access token
claude mcp add figma -- npx -y @anthropic-ai/mcp-server-figma \
  -e FIGMA_ACCESS_TOKEN="your-figma-token"
```

**Get Token**: Figma > Settings > Personal Access Tokens

---

### Magic MCP (21st.dev)
```bash
# Step 1: Install CLI and get API key
npx @21st-dev/cli@latest install

# Step 2: Add to Claude Code
claude mcp add magic -- npx -y @21st-dev/magic-mcp

# Usage in Claude Code:
# /ui create a modern navigation bar with dropdown
```

**API Key**: Get from https://21st.dev/magic/console

---

### PostgreSQL MCP
```bash
# Option A: Connection string
claude mcp add postgres -- npx -y @anthropic-ai/mcp-server-postgres \
  -e POSTGRES_CONNECTION_STRING="postgresql://user:pass@host:5432/db"

# Option B: Individual variables (better for secrets)
claude mcp add postgres \
  -e PG_HOST=localhost \
  -e PG_PORT=5432 \
  -e PG_USER=myuser \
  -e PG_PASSWORD=mypassword \
  -e PG_DATABASE=mydb \
  -- npx -y mcp-postgres-server

# Option C: For VarnaAI Docker setup
claude mcp add postgres-pension \
  -e PG_HOST=localhost \
  -e PG_PORT=5433 \
  -e PG_USER=postgres \
  -e PG_PASSWORD=changeme \
  -e PG_DATABASE=pension_db \
  -- npx -y mcp-postgres-server
```

---

## Scope Options

```bash
# Local scope (current project only)
claude mcp add --scope local github

# User scope (all projects for current user)
claude mcp add --scope user github

# Project scope (shared in .mcp.json)
claude mcp add --scope project github
```

---

## Management Commands

```bash
# List all installed MCP servers
claude mcp list

# Remove an MCP server
claude mcp remove github

# Check MCP server status
claude mcp status

# View MCP configuration
claude mcp config
```

---

## Environment Variables

Store sensitive keys in environment:

```bash
# ~/.bashrc or ~/.zshrc
export GITHUB_TOKEN="ghp_xxx"
export FIGMA_ACCESS_TOKEN="figd_xxx"
export NOTION_API_KEY="secret_xxx"
export EXA_API_KEY="xxx"
export TAVILY_API_KEY="tvly-xxx"
export CONTEXT7_API_KEY="xxx"
```

Then install without inline secrets:
```bash
claude mcp add github
claude mcp add figma
claude mcp add notion
```

---

## Recommended Stack by Use Case

### Full-Stack Developer
```bash
claude mcp add github
claude mcp add playwright
claude mcp add context7
claude mcp add sequential-thinking
claude mcp add postgres
```

### Frontend/UI Developer
```bash
claude mcp add figma
claude mcp add magic
claude mcp add shadcn-ui
claude mcp add playwright
claude mcp add context7
```

### DevOps/Infrastructure
```bash
claude mcp add github
claude mcp add aws
claude mcp add docker
claude mcp add sentry
```

### Research/Writing
```bash
claude mcp add exa
claude mcp add tavily
claude mcp add notion
claude mcp add sequential-thinking
```

---

## Troubleshooting

### "Command not found: npx"
```bash
# Install Node.js first
# Windows: https://nodejs.org/
# macOS: brew install node
# Linux: sudo apt install nodejs npm
```

### "MCP server failed to start"
```bash
# Check if npx package exists
npx -y @anthropic-ai/mcp-server-github --help

# Clear npx cache
npx clear-npx-cache
```

### "Authentication failed"
```bash
# Verify token is set
echo $GITHUB_TOKEN

# Re-authenticate GitHub CLI
gh auth login
```

### "Rate limit exceeded" (Context7)
```bash
# Get API key for higher limits
# https://context7.com
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_KEY
```

---

## Quick Reference Card

| Server | Install Command |
|--------|-----------------|
| GitHub | `claude mcp add github` |
| Playwright | `claude mcp add playwright -- npx -y @anthropic-ai/mcp-server-playwright` |
| Context7 | `claude mcp add context7 -- npx -y @upstash/context7-mcp` |
| Sequential | `claude mcp add sequential-thinking -- npx -y @anthropic-ai/mcp-server-sequential-thinking` |
| Filesystem | `claude mcp add filesystem -- npx -y @anthropic-ai/mcp-server-filesystem` |
| Figma | `claude mcp add figma` |
| Magic | `claude mcp add magic -- npx -y @21st-dev/magic-mcp` |
| Postgres | `claude mcp add postgres -- npx -y @anthropic-ai/mcp-server-postgres` |
| AWS | `claude mcp add aws -- npx -y @anthropic-ai/mcp-server-aws` |
| Docker | `claude mcp add docker -- npx -y @anthropic-ai/mcp-server-docker` |
| Notion | `claude mcp add notion -- npx -y @anthropic-ai/mcp-server-notion` |
| Sentry | `claude mcp add sentry -- npx -y @anthropic-ai/mcp-server-sentry` |
| Exa | `claude mcp add exa -- npx -y @anthropic-ai/mcp-server-exa` |
| Tavily | `claude mcp add tavily -- npx -y @anthropic-ai/mcp-server-tavily` |

---

## Sources

- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)
- [Context7 GitHub](https://github.com/upstash/context7)
- [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp)
- [MCP Hunt Installation Guides](https://mcp-hunt.com/blog/)
- [Developer Toolkit MCP Setup](https://developertoolkit.ai/en/claude-code/quick-start/mcp-setup/)
