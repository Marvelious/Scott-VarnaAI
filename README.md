# VarnaAI Websites - Complete Portfolio Management System

**Complete automation and management system for 5 WordPress portfolio sites**

---

## 🎯 Quick Start

### Interactive Automation Menu
```bash
cd SeoAgent
node seoagent-menu.js
```

### Read All Documentation
```bash
cd SeoAgent
node docs-reader.js
```

### WordPress Workflow
```bash
# See claude.md for complete workflow
# See automatic.md for automation tasks
```

---

## 📁 Folder Structure

```
D:\VarnaAI\Websites/
├── SeoAgent/                      ← Main automation hub
│   ├── automate-seo-analysis.js   ← SEO automation
│   ├── wordpress-seo-helper.js    ← WordPress SEO helper
│   ├── lead-generation-automation.js  ← Find SME leads
│   ├── market-research-automation.js  ← Market analysis
│   ├── seoagent-menu.js           ← Interactive menu (NEW)
│   ├── docs-reader.js             ← Documentation browser (NEW)
│   └── [documentation files]
│
├── docs/                          ← Documentation
│   ├── prds/                      ← Project requirement documents
│   ├── strategy/                  ← Strategy documents
│   └── archive/                   ← Archived documents
│
├── wordpress-content/             ← WordPress page content
│   ├── contact-page/              ← Contact page iterations
│   ├── faq-page/                  ← FAQ page iterations
│   └── templates/                 ← Reusable templates
│
├── ops/                           ← Operations & deployment
│   ├── compose/                   ← Docker Compose files
│   ├── env/                       ← Environment configurations
│   ├── hub-worker/                ← Hub worker scripts
│   └── snippets/                  ← Code snippets
│
├── claude.md                      ← WordPress workflow documentation
├── automatic.md                   ← Automation tracking
└── README.md                      ← This file
```

---

## 🌐 WordPress Portfolio Sites (5 Total)

| Site | URL | Language | Focus |
|------|-----|----------|-------|
| AI Projektmanager | https://ai-projektmanager.de | German | AI Project Management |
| AI Marketing BG | https://aimarketingbg.com | English/Bulgarian | AI Marketing |
| Classic Security | https://classicsecurity.net | English | Security Services |
| Varna Agenten | https://varna-agenten.de | German | AI Agents |
| Varna AI | https://varnaai.com | English | AI Services |

**WordPress Credentials**: See `claude.md` for all login details

---

## 🚀 SeoAgent Automation Hub

**Location**: `D:\VarnaAI\Websites\SeoAgent`

### Available Automations

#### 1. SEO Automation
- Analyze WordPress pages for SEO
- Research keywords for German market
- Check Google rankings
- Find backlinks
- Get analytics
- Generate content ideas

**Usage**:
```bash
cd SeoAgent
node automate-seo-analysis.js analyze <url>
node automate-seo-analysis.js keywords "IT Services" de
node wordpress-seo-helper.js analyze <url> <focusKeyword>
```

#### 2. Lead Generation (Webscrap Integration)
- Find German SME leads from Firmenwissen, WLW, Handelsregister
- Find Bulgarian SME leads from business directories
- Get sales pipeline summary
- Enrich lead data with social profiles and technologies

**Usage**:
```bash
cd SeoAgent
node lead-generation-automation.js german "IT Services" "Bayern" 20
node lead-generation-automation.js bulgarian "IT Services" "Varna" 15
node lead-generation-automation.js pipeline
```

**Prerequisites**: Webscrap backend must be running
```bash
cd D:\VarnaAI\Webscrap
python main.py
```

#### 3. Market Research (Webscrap Integration)
- Analyze German markets (industry trends, competitors, economic indicators)
- Analyze Bulgarian markets (regional intelligence)
- Compare Germany vs Bulgaria markets
- Get trending topics for content creation
- Generate comprehensive market reports with SEO keywords

**Usage**:
```bash
cd SeoAgent
node market-research-automation.js german "IT Services" "Bayern"
node market-research-automation.js bulgarian "IT Services" "Varna"
node market-research-automation.js compare "IT Services"
node market-research-automation.js trending germany "IT Services"
node market-research-automation.js report germany "Enterprise Software" "Bayern"
```

---

## 📚 Documentation

### Main Documentation Files

1. **claude.md** - WordPress workflow documentation
   - Page creation process
   - SEO requirements (600+ words, 80+ score)
   - Rank Math error fixes
   - 5-site portfolio tracking

2. **automatic.md** - Automation workflow tracking
   - Work queue
   - SEO checklist
   - Automation tasks

3. **SeoAgent/START_HERE.md** - SeoAgent quick start guide

4. **SeoAgent/AUTOMATION_README.md** - Full SEO automation guide

5. **SeoAgent/WEBSCRAP_INTEGRATION_README.md** - Lead Gen + Market Research guide

6. **SeoAgent/IMPROVEMENTS_REPORT.md** - Improvement recommendations

7. **COMPLETE_FOLDER_ANALYSIS.md** - Complete folder analysis

### Documentation Browser
```bash
cd SeoAgent
node docs-reader.js

# Interactive menu to:
# - Read individual files
# - Read ALL files in sequence
# - Search documentation
# - Export all docs to one file
# - Generate quick reference card
```

---

## 📖 Complete WordPress Content Pipeline

**Workflow**: Find Leads → Research Market → Get Keywords → Write Content → Verify SEO

### Example: Create Case Study Page

**Step 1: Find German Leads**
```bash
node lead-generation-automation.js german "IT Security" "Bayern" 15
# Result: 15 qualified German SME companies for case studies
```

**Step 2: Research Market**
```bash
node market-research-automation.js german "IT Security" "Bayern"
# Result: Market trends, competitors, opportunities
```

**Step 3: Get SEO Keywords**
```bash
node market-research-automation.js trending germany "IT Security"
# Result: Trending keywords with search volumes
```

**Step 4: Analyze Similar Page**
```bash
node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/it-sicherheit "IT-Sicherheit"
# Result: SEO checklist and recommendations
```

**Step 5: Write Content**
- Use leads, market data, and keywords to create comprehensive content
- Fill Kadence design blocks
- Apply SEO recommendations

**Step 6: Verify SEO**
```bash
node wordpress-seo-helper.js analyze https://ai-projektmanager.de/fallstudien "Fallstudien"
# Result: Verify 80+ SEO score achieved
```

---

## 🛠️ Operations & Deployment

**Location**: `D:\VarnaAI\Websites\ops`

### Infrastructure Files
- **compose/** - Docker Compose configurations
- **env/** - Environment variable files
- **hub-worker/** - Hub worker scripts
- **snippets/** - Reusable code snippets

### Deployment Documentation
See `docs/prds/` for complete deployment PRDs:
- MASTER-DEPLOYMENT-PRD.md
- BETA-DEMO-DEPLOYMENT-PRD.md
- HETZNER-CONSOLIDATION-PRD.md
- SECURE-PRELAUNCH.md

---

## 🎯 WordPress Page Creation Workflow

**See `claude.md` for complete workflow**

### Standard Process

1. **Create Blank Page in WordPress**
   - Navigate to Seiten → Neu hinzufügen
   - Create blank page with title only

2. **WAIT for Design Blocks**
   - Big Dick adds Kadence design blocks
   - Do NOT write content before design blocks are added

3. **Fill Content**
   - 600+ words minimum
   - Focus keyword in first 10% of content
   - Focus keyword density 0.8-0.9%
   - External DoFollow link to BSI or official sources
   - Internal links to other pages

4. **SEO Verification**
   - Use Rank Math SEO panel
   - Target: 80+ SEO score
   - Fix all critical errors

5. **Publish**
   - Change status to Veröffentlichen
   - Notify Big Dick

---

## 🔧 Prerequisites

### For SEO Automation
- SEO Agent backend running: `cd D:\VarnaAI\seoagent\backend && npm run dev`
- Port: http://localhost:4000

### For Lead Generation & Market Research
- Webscrap backend running: `cd D:\VarnaAI\Webscrap && python main.py`
- Port: http://localhost:8000

### Dependencies
```bash
cd SeoAgent
npm install axios chalk inquirer ora dotenv
```

---

## 📊 German Market Focus

### Priority Industries (Mittelstand)
- Manufacturing (Fertigung)
- Mechanical Engineering (Maschinenbau)
- Automotive (Automobilindustrie)
- IT Services (IT-Dienstleistungen)
- Software Development (Softwareentwicklung)
- Chemical Industry (Chemieindustrie)
- Medical Technology (Medizintechnik)
- Engineering Services (Ingenieurdienstleistungen)
- Electrical Engineering (Elektrotechnik)
- Industrial Automation (Industrielle Automation)

### Priority Regions (Bundesländer)
- Bayern (Bavaria)
- Baden-Württemberg
- Nordrhein-Westfalen (NRW)
- Hessen (Hesse)
- Niedersachsen (Lower Saxony)
- Berlin
- Hamburg
- Rheinland-Pfalz (Rhineland-Palatinate)

---

## 🐛 Troubleshooting

### SEO Agent Not Running
```bash
cd D:\VarnaAI\seoagent\backend
npm run dev
```

### Webscrap Not Running
```bash
cd D:\VarnaAI\Webscrap
python main.py
```

### Missing Dependencies
```bash
cd D:\VarnaAI\Websites\SeoAgent
npm install axios
```

### Can't Find Documentation
```bash
cd D:\VarnaAI\Websites\SeoAgent
node docs-reader.js
# Choose: "Read ALL Files in Sequence"
```

---

## 🎛️ VarnaAI Control Dashboard

**Location**: `D:\VarnaAI\Websites\dashboard`

A comprehensive web-based control panel for managing all 5 WordPress sites with AI-powered features.

### Features

#### 📊 Dashboard Overview
- Real-time site health monitoring (5/5 sites active)
- Content queue tracking (23 scheduled posts)
- Visitor analytics and lead tracking
- Quick action buttons (Audit, Keywords, AI Chat, Settings)

#### 🌐 WordPress Management
- Multi-site SEO monitoring with Rank Math integration
- Real-time SEO score tracking (70-90 range)
- Site status monitoring (online/offline)
- Quick access to WordPress admin panels

#### 🤖 AI Integration
- **Multi-Provider Support**: Ollama (local), Claude (API), LM Studio (local)
- **AI Chat Assistant**: Real-time chat with provider selection
- **Dynamic Model Selection**:
  - Ollama: 7 models (qwen2.5-coder:14b, deepseek-coder:33b, etc.)
  - Claude: 2 models (Haiku, Sonnet)
  - LM Studio: 10+ models (dynamically fetched)
- **Smart Fallback**: Automatic failover between providers
- **Cost Tracking**: Real-time API usage monitoring

#### ⚙️ AI Settings
- **Provider Configuration**: Select default providers for blog posts, social media, email campaigns
- **Model Selection**: Choose specific models for each provider
- **Performance Metrics**: Response times, success rates, uptime tracking
- **GPU Recommendations**: Hardware specs for RTX 3070/4070/5070
- **Model Recommendations (2025 Research)**:
  - Best for JSON/Structured Output: Qwen 2.5 Coder (88.4% benchmark)
  - Best for Creative Content: Qwen 3, DeepSeek-V3, Llama 3/4
  - Use Case Specific: Blog posts, social media, SEO content, JSON generation

#### 📈 Analytics & Performance
- Cost tracking (daily, weekly, monthly projections)
- Provider performance metrics
- API usage statistics
- Response time monitoring

### Tech Stack

- **Frontend**: Alpine.js, Tailwind CSS, vanilla JavaScript
- **Backend**: Node.js, Express
- **AI Providers**:
  - Ollama (http://localhost:11434) - Local, free
  - Claude API - Best quality, paid
  - LM Studio (http://localhost:1234) - Local, free, OpenAI-compatible

### Quick Start

```bash
# Start the dashboard
cd D:\VarnaAI\Websites\dashboard
node server.js

# Access dashboard
open http://localhost:3333
```

### API Endpoints

```
GET  /api/wordpress/sites       - Get all WordPress sites status
GET  /api/ai/status             - Get AI providers status
GET  /api/ai/models             - Get available models
GET  /api/ai/config             - Get AI configuration
POST /api/ai/config             - Save AI configuration
POST /api/ai/chat               - Send chat message
GET  /api/ai/cost               - Get cost tracking
POST /api/content/blog          - Generate blog post
POST /api/content/social        - Generate social media
POST /api/content/email         - Generate email campaign
```

### Configuration

AI providers are configured in AI Settings page:
- **Default Providers**: Blog Posts, Social Media, Email Campaigns
- **Model Selection**: Choose specific models per provider
- **Fallback Chain**: Primary → Fallback → Error

### Recent Updates (2025-01-13)

✅ Complete AI Settings functionality with LM Studio integration
✅ GPU hardware recommendations (RTX 3070/4070/5070)
✅ LM Studio model recommendations for content generation
✅ Dynamic LM Studio model fetching (30 models)
✅ AI chat endpoint with multi-provider support
✅ Quick Action buttons with click handlers
✅ Fixed AI Settings dropdown z-index issues
✅ Improved SEO score display with placeholder logic

**GitHub**: https://github.com/Marvelious/varnaai-seo

---

## 🎉 Key Features

✅ **Web Dashboard** - Complete control panel for 5 WordPress sites with AI integration
✅ **SEO Automation** - Complete WordPress SEO analysis and optimization
✅ **Lead Generation** - Real German/Bulgarian SME leads from business directories
✅ **Market Research** - Comprehensive market analysis with trending topics
✅ **AI Content Generation** - Multi-provider AI support (Ollama, Claude, LM Studio)
✅ **Interactive Menus** - Easy-to-use CLI interfaces
✅ **Documentation Browser** - Read all docs interactively
✅ **Complete Workflows** - End-to-end content creation pipeline
✅ **5 WordPress Sites** - Centralized management for entire portfolio

---

## 📞 Support

**For Dashboard**: Access http://localhost:3333 after starting server
**For WordPress Issues**: See `claude.md` for credentials and workflow
**For Automation Issues**: See `SeoAgent/` documentation
**For Infrastructure**: See `ops/` folder and `docs/prds/`

---

**Last Updated**: January 13, 2025
**Status**: Production ready with complete automation pipeline
**Quick Start Options**:
- 🎛️ Dashboard: `cd dashboard && node server.js` → http://localhost:3333
- 🤖 CLI Automation: `cd SeoAgent && node seoagent-menu.js`
