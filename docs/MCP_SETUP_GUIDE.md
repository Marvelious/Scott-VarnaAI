# MCP Server Setup Guide for Claude Code

**For**: Scott (and team)
**Project**: VarnaAI Websites
**Last Updated**: 2025-12-12

---

## Required MCP Servers

### 1. Playwright (ESSENTIAL)
**Purpose**: Browser automation for WordPress editing, E2E testing, visual validation

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"]
    }
  }
}
```

**Used For**:
- WordPress page editing via browser
- WPML translation workflows
- Screenshot capture and visual testing
- Form filling and content updates

---

### 2. Context7 (RECOMMENDED)
**Purpose**: Official library documentation lookup

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@anthropic/context7-mcp"]
    }
  }
}
```

**Used For**:
- React/Next.js documentation
- WordPress/PHP patterns
- Framework best practices

---

### 3. Sequential Thinking (RECOMMENDED)
**Purpose**: Complex multi-step reasoning and analysis

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sequential-thinking"]
    }
  }
}
```

**Used For**:
- Complex debugging
- Architecture decisions
- Multi-component analysis

---

### 4. Memory (OPTIONAL)
**Purpose**: Knowledge graph for cross-session context

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"]
    }
  }
}
```

**Used For**:
- Project context persistence
- Entity relationship tracking
- Session memory

---

### 5. GitHub (RECOMMENDED)
**Purpose**: GitHub repository operations

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**Used For**:
- Creating PRs
- Managing issues
- Code search
- Repository operations

---

### 6. Exa (OPTIONAL)
**Purpose**: AI-powered web search

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "your_exa_api_key"
      }
    }
  }
}
```

**Used For**:
- Web research
- Code context search
- Current documentation lookup

---

### 7. Fetch/Scrape (OPTIONAL)
**Purpose**: Web content fetching and scraping

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-fetch"]
    }
  }
}
```

**Used For**:
- Scraping web pages
- Fetching API documentation
- Content extraction

---

### 8. PostgreSQL (PROJECT-SPECIFIC)
**Purpose**: Direct database access for C3/RetirementAI apps

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "mcp-postgres-server"],
      "env": {
        "PG_HOST": "localhost",
        "PG_PORT": "5432",
        "PG_USER": "postgres",
        "PG_PASSWORD": "your_password",
        "PG_DATABASE": "your_database"
      }
    }
  }
}
```

---

## Complete .mcp.json Example

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@anthropic/context7-mcp"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sequential-thinking"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "${EXA_API_KEY}"
      }
    }
  }
}
```

---

## Installation Steps

### 1. Install Node.js
Ensure Node.js 18+ is installed:
```bash
node --version  # Should be v18+
```

### 2. Create .mcp.json
Place in your project root or `~/.claude/` for global access.

### 3. Set Environment Variables
```bash
# Windows (PowerShell)
$env:GITHUB_TOKEN = "ghp_your_token"
$env:EXA_API_KEY = "your_exa_key"

# Linux/Mac
export GITHUB_TOKEN="ghp_your_token"
export EXA_API_KEY="your_exa_key"
```

### 4. Restart Claude Code
MCP servers are loaded on startup.

---

## Minimum Setup for WordPress Work

If you only need to work on WordPress sites, install just:

1. **Playwright** (required) - Browser automation
2. **Context7** (recommended) - Documentation lookup

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@anthropic/context7-mcp"]
    }
  }
}
```

---

## Troubleshooting

### MCP Server Not Starting
```bash
# Test manually
npx @anthropic/mcp-playwright

# Check Node.js version
node --version
```

### Permission Errors
- Run terminal as administrator (Windows)
- Check file permissions on .mcp.json

### Environment Variables Not Found
- Ensure variables are set in the shell where Claude Code runs
- Restart terminal after setting variables

---

## VarnaAI Project-Specific Notes

- **WordPress Sites**: Playwright is essential for WPML translations and page editing
- **C3 Compliance**: PostgreSQL MCP needed for database operations
- **Research Tasks**: Exa provides better search results than native WebSearch
- **Task Management**: We use Task Master CLI, not MCP (see `.taskmaster/` folder)

---

*Document created for team onboarding - December 2025*
