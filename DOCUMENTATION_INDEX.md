# VarnaAI Websites - Complete Documentation Index

**Last Updated**: November 23, 2025

---

## 🎯 Quick Navigation

### Essential Files (Start Here)
1. **[README.md](./README.md)** - Project overview and quick start
2. **[CLAUDE.md](./CLAUDE.md)** - WordPress workflow and page creation
3. **[COMPANY_INFO.md](./COMPANY_INFO.md)** - Company details for all 5 sites

### Portfolio Status
- **[VarnaAI App Portfolio](#varnaai-app-portfolio)** - 4 apps deployed, 1 pending
- **[Live Demos](#live-demos)** - All demo URLs at Hetzner VPS

---

## 📂 Documentation by Category

### 1. WordPress Content Management

#### Main Documentation
- **[CLAUDE.md](./CLAUDE.md)** - Complete WordPress workflow
  - Page creation process (3-step workflow)
  - SEO optimization (600+ words, 80+ SEO score)
  - Rank Math error fixes
  - 5-site portfolio tracking

#### WordPress Guides
- **[wordpress/README.md](./wordpress/README.md)** - WordPress content guides
- **[wordpress/workflow-guide.md](./wordpress/workflow-guide.md)** - Detailed workflow
- **[wordpress/schema-templates.md](./wordpress/schema-templates.md)** - Schema markup templates
- **[wordpress/kadence-design-options.txt](./wordpress/kadence-design-options.txt)** - Kadence block settings

#### Content Templates
- **wordpress/pages/** - Ready-to-paste page content
- **wordpress/snippets/** - Reusable code snippets

---

### 2. SEO Strategy & Analysis

#### Master SEO Documentation
- **[seo/SEO_Portfolio_Strategy_2025.md](./seo/SEO_Portfolio_Strategy_2025.md)** - Master SEO strategy
  - Portfolio-wide SEO approach
  - Keyword strategies for all 5 sites
  - Technical SEO requirements
  - Link building strategy

#### SEO Reports (claudedocs/)
- **[SEO_AUDIT_COMPREHENSIVE_SUMMARY_2025.md](./claudedocs/SEO_AUDIT_COMPREHENSIVE_SUMMARY_2025.md)** - Comprehensive audit
- **[PORTFOLIO_SEO_PDF_AUDIT_COMPARISON_NOV_2025.md](./claudedocs/PORTFOLIO_SEO_PDF_AUDIT_COMPARISON_NOV_2025.md)** - Portfolio comparison
- **[Q1_2025_SEO_ACTION_PLAN.md](./claudedocs/Q1_2025_SEO_ACTION_PLAN.md)** - Q1 2025 action plan

#### SEO Guides
- **seo/guides/** - Implementation guides
- **seo/site-audits/** - Individual site audits
  - varnaai-audit-2025.md
  - ai-projektmanager-audit-2025.md
  - aimarketingbg-audit-2025.md
  - classicsecurity-audit-2025.md
  - varna-agenten-audit-2025.md

---

### 3. VarnaAI App Portfolio

#### Portfolio Status Summary
**📊 4 Apps Live** | **🚀 All Deployed to Hetzner VPS** | **📈 SEO 89-90/100**

#### Live Apps
1. **RetirementAI** - https://demo-retirement.varnaai.com/
   - Portfolio: ✅ COMPLETE (Post ID: 317163)
   - SEO Score: 89/100
   - Tech: Next.js 14, PostgreSQL 15+, Redis 7+, OpenAI GPT-4, Studio LM
   - Location: D:\VarnaAI\pension

2. **FwChange** - https://demo-fwchange.varnaai.com/
   - Portfolio: ✅ COMPLETE (Post ID: 317353)
   - SEO Score: 90/100
   - Tech: React 18 + TypeScript, FastAPI, PostgreSQL 15+, Redis 7
   - Location: D:\VarnaAI\fwchange

3. **SEO Agent** - https://demo-seoagent.varnaai.com/
   - Portfolio: ✅ COMPLETE
   - Tech: Vite, React 19, Express, PostgreSQL, Redis, BullMQ
   - Location: D:\VarnaAI\seoagent

4. **VarnaAI Agents** - https://demo-agents.varnaai.com/
   - Portfolio: ✅ COMPLETE
   - Tech: Next.js 14, FastAPI, PostgreSQL, Redis, Llama 3.1
   - Location: D:\VarnaAI\Webscrap

#### Pending Portfolio Pages
5. **C3 (Compliance Command Center)** - ⏳ PENDING
   - Tech: React 18 + TypeScript, Node.js, PostgreSQL, Playwright
   - Location: D:\VarnaAI\dashboard

---

### 4. Marketing & Content Strategy

#### Backlink Strategy
- **[BACKLINK_AUTOMATION_STRATEGY_2025.md](./claudedocs/BACKLINK_AUTOMATION_STRATEGY_2025.md)** - Backlink automation
- **[BACKLINK_STRATEGY_2025_COMPREHENSIVE.md](./claudedocs/BACKLINK_STRATEGY_2025_COMPREHENSIVE.md)** - Comprehensive strategy
- **[BACKLINK_ACTIVATION_REPORT.md](./claudedocs/BACKLINK_ACTIVATION_REPORT.md)** - Activation report

#### Directory Submissions
- **[AI_DIRECTORY_SUBMISSIONS_REPORT_2025.md](./claudedocs/AI_DIRECTORY_SUBMISSIONS_REPORT_2025.md)** - AI directory strategy
- **[VERIFIED_FREE_DIRECTORIES_2025.md](./claudedocs/VERIFIED_FREE_DIRECTORIES_2025.md)** - Verified directories

#### Content Strategy
- **[BLOG_CONTENT_AUDIT_REPORT.md](./claudedocs/BLOG_CONTENT_AUDIT_REPORT.md)** - Blog content audit
- **[PRODUCT_HUNT_LAUNCH_STRATEGY_2025.md](./claudedocs/PRODUCT_HUNT_LAUNCH_STRATEGY_2025.md)** - Product Hunt strategy

#### Blog Content
- **blogs/blog_posts/** - Blog posts for all sites
  - ai-projektmanager/
  - aimarketingbg/
  - classicsecurity/
  - varna-agenten/
  - varnaai/

---

### 5. Research & Market Analysis

#### Market Research
- **[research/german-compliance-market-2025.md](./research/german-compliance-market-2025.md)** - German compliance market
- **[research/ai-coding-market-2025.md](./research/ai-coding-market-2025.md)** - AI coding market
- **[research/fwchange-strategy.md](./research/fwchange-strategy.md)** - FwChange market strategy
- **[research/crosspromo-strategy.md](./research/crosspromo-strategy.md)** - Cross-promotion strategy

---

### 6. Infrastructure & Deployment

#### Deployment Info
- **Server**: Hetzner VPS @ 78.47.125.174
- **Apps Deployed**: 4 (RetirementAI, FwChange, SEO Agent, VarnaAI Agents)
- **Reverse Proxy**: Nginx with SSL (Let's Encrypt)

#### Docker Containers Running
```
retirementai-app        (Port 3000)
retirementai-postgres   (Port 5432)
retirementai-redis      (Port 6379)

fwchange-frontend       (Port 5173)
fwchange-backend        (Port 8000)
fwchange-postgres
fwchange-redis

seoagent-backend        (Port 4001)
seoagent-db
seoagent-redis

varnaai-app-frontend    (Port 6000)
varnaai-app-backend
varnaai-app-postgres    (Port 5434)
varnaai-app-llm-gateway
```

#### Operations Documentation
- **[operations/README.md](./operations/README.md)** - Operations overview

---

### 7. AI Provider Configuration

#### MCP Configuration
- **[.mcp.json](./.mcp.json)** - MCP server configuration
- **[claudedocs/WORDPRESS_MCP_CONFIGURATION.md](./claudedocs/WORDPRESS_MCP_CONFIGURATION.md)** - WordPress MCP setup
- **[claudedocs/WORDPRESS_MCP_TEST_RESULTS.md](./claudedocs/WORDPRESS_MCP_TEST_RESULTS.md)** - Test results

#### AI Integration
- **[claudedocs/MCP_SERVERS_INSTALLED.md](./claudedocs/MCP_SERVERS_INSTALLED.md)** - MCP servers list
- **[AI_PROVIDER_TEST_RESULTS.md](./AI_PROVIDER_TEST_RESULTS.md)** - AI provider tests

---

### 8. Cloud Hosting & Infrastructure

#### Hosting Analysis
- **[CLOUD_HOSTING_ALTERNATIVES_2025.md](./claudedocs/CLOUD_HOSTING_ALTERNATIVES_2025.md)** - Cloud hosting options

---

### 9. Project Management

#### Task Management
- **.taskmaster/** - Task Master AI integration
  - **[.taskmaster/CLAUDE.md](./.taskmaster/CLAUDE.md)** - Task Master guide
  - **[.taskmaster/tasks/tasks.json](./.taskmaster/tasks/tasks.json)** - Tasks database

#### AI Rules & Config
- **.clinerules/** - Cline AI rules
- **.gemini/** - Gemini AI config
- **[AGENT.md](./AGENT.md)** - Agent instructions
- **[AGENTS.md](./AGENTS.md)** - Multi-agent setup

---

### 10. Archived Documentation

#### Completed Work
- **[done/CLEANUP_REPORT_2025-11-23.md](./done/CLEANUP_REPORT_2025-11-23.md)** - Latest cleanup
- **[done/CLEANUP_REPORT_2025-11-21.md](./done/CLEANUP_REPORT_2025-11-21.md)** - Previous cleanup
- **done/playwright-screenshots-2025-11/** - Archived screenshots
- **done/temp-files/** - Obsolete documents
- **done/wordpress-exports-2025-11-11/** - WordPress backups

---

## 🌐 WordPress Sites Reference

| Site | URL | Username | Language | Focus |
|------|-----|----------|----------|-------|
| AI Projektmanager | https://ai-projektmanager.de/wp-admin/ | claude | German | AI Project Management |
| AI Marketing BG | https://aimarketingbg.com/wp-admin/ | claude | English/Bulgarian | AI Marketing |
| Classic Security | https://classicsecurity.net/wp-admin/ | claude | English | Security Services |
| Varna Agenten | https://varna-agenten.de/wp-admin/ | claude | German | AI Agents |
| Varna AI | https://varnaai.com/wp-admin/ | claude | English | AI Services |

**Full credentials**: See [CLAUDE.md](./CLAUDE.md) WordPress Access Credentials section

---

## 🔍 How to Find What You Need

### I want to...

**Create a WordPress page**
→ Read [CLAUDE.md](./CLAUDE.md) - Page Creation Process section

**Optimize SEO**
→ Read [seo/SEO_Portfolio_Strategy_2025.md](./seo/SEO_Portfolio_Strategy_2025.md)

**Add Schema markup**
→ Read [wordpress/schema-templates.md](./wordpress/schema-templates.md)
→ Read [SCHEMA_ORG_TEMPLATES.md](./SCHEMA_ORG_TEMPLATES.md)

**Deploy an app**
→ SSH to 78.47.125.174 (see Infrastructure section)

**Research a market**
→ Read [research/](./research/) directory

**Write blog content**
→ Check [blogs/blog_posts/](./blogs/blog_posts/) for examples

**Build backlinks**
→ Read [claudedocs/BACKLINK_AUTOMATION_STRATEGY_2025.md](./claudedocs/BACKLINK_AUTOMATION_STRATEGY_2025.md)

**Submit to directories**
→ Read [claudedocs/VERIFIED_FREE_DIRECTORIES_2025.md](./claudedocs/VERIFIED_FREE_DIRECTORIES_2025.md)

---

## 📊 Project Status Dashboard

### Portfolio Pages
- ✅ RetirementAI (89/100 SEO)
- ✅ FwChange (90/100 SEO)
- ✅ SEO Agent
- ✅ VarnaAI Agents
- ⏳ C3 (Compliance Command Center) - PENDING

### WordPress Sites
- ✅ ai-projektmanager.de (7 pages complete)
- 🔄 aimarketingbg.com
- 🔄 classicsecurity.net
- 🔄 varna-agenten.de
- 🔄 varnaai.com

### Deployment
- ✅ Hetzner VPS configured (78.47.125.174)
- ✅ 4 apps deployed with Nginx SSL
- ✅ All demo URLs live
- ✅ Docker containers running

### Documentation
- ✅ Main guides complete
- ✅ SEO strategy documented
- ✅ Workflows documented
- ✅ Infrastructure documented

---

## 🚀 Getting Started

1. **Read [README.md](./README.md)** - Project overview
2. **Read [CLAUDE.md](./CLAUDE.md)** - WordPress workflow
3. **Check portfolio status** - See VarnaAI App Portfolio section above
4. **Access WordPress** - Use credentials from CLAUDE.md
5. **Deploy apps** - SSH to 78.47.125.174

---

**Maintained by**: Claude Code
**Project**: VarnaAI Websites Portfolio
**Contact**: See COMPANY_INFO.md for business details
