# WordPress Multi-Site Content Creation Workflow

**📋 See also**: `PROJECT_INDEX.md` for complete project documentation index

## 🚨 PRIVACY & SECURITY 🚨
**CRITICAL**: Never use real names. Owner is "Gennadius" and partner is "Vanderbilt" for safety reasons (crazy ex-wife situation). All case studies and content must be generic/anonymized.

## 📁 Project Structure

The VarnaAI Websites project is organized into the following structure:

```
D:\VarnaAI\Websites\
│
├── README.md                          # Project overview
├── CLAUDE.md                          # AI instructions (this file)
├── SCHEMA_ORG_TEMPLATES.md            # Schema markup reference
├── COMPANY_INFO.md                    # Company details for all 4 sites
│
├── seo/                               # SEO Strategy & Tools
│   ├── SEO_Portfolio_Strategy_2025.md # Master SEO strategy document
│   ├── audits-raw/                    # Raw PDF audits from tools
│   ├── site-audits/                   # Site-specific audit analysis
│   ├── guides/                        # SEO implementation guides
│   └── tools/                         # SEO automation scripts
│
├── wordpress/                         # WordPress Content & Snippets
│   ├── credentials.md                 # Site access credentials (see below)
│   ├── workflow-guide.md              # Page creation workflow
│   ├── schema-templates.md            # Schema markup templates (NEVER CREATE WITHOUT USER APPROVAL)
│   ├── kadence-design-options.txt     # Kadence block configuration
│   ├── pages/                         # Ready-to-paste page content
│   └── snippets/                      # Reusable code snippets
│
├── docs/                              # Strategic Documentation
│   ├── prds/                          # Product requirement documents
│   ├── strategy/                      # Strategic planning
│   ├── planning/                      # Execution planning
│   ├── analysis/                      # Project analysis
│   ├── implementation/                # Implementation tracking
│   └── reference/                     # Reference documentation
│
├── research/                          # Market Research & Analysis
│   ├── german-compliance-market-2025.md
│   ├── ai-coding-market-2025.md
│   ├── fwchange-strategy.md
│   ├── fwchange-linkedin-outreach.md
│   └── crosspromo-strategy.md
│
├── operations/                        # Infrastructure & Automation
│   ├── hub-worker/                    # Cloudflare Worker
│   ├── compose/                       # Docker configurations
│   └── scripts/                       # Automation scripts
│
├── work/                              # Active Work & Agents
│   ├── secrets/                       # Centralized credentials (keymanager)
│   │   ├── keymanager.py              # get/set/list secrets
│   │   └── secrets.yaml               # All API keys & passwords (gitignored)
│   └── jobs/                          # Freelance job hunter agent
│
├── assets/                            # Images, Diagrams, Media
│   ├── images/
│   └── diagrams/
│
├── done/                              # Completed & Archived Work
│   ├── 2025-01-implementation/        # January 2025 fixes
│   ├── old-audits/                    # Superseded SEO audits
│   └── temp-files/                    # Temporary work files
│
└── claudedocs/                        # Claude Work Products
    ├── CLEANUP_ANALYSIS_REPORT.md
    └── [active strategy documents]
```

**Key Locations**:
- **SEO Strategy**: `/seo/SEO_Portfolio_Strategy_2025.md` (master document)
- **WordPress Workflow**: This file (CLAUDE.md) + `/wordpress/workflow-guide.md`
- **Credentials & API Keys**: `/work/secrets/` (keymanager.py - centralized secrets)
- **Completed Work**: `/done/` (organized by date and type)

## CV-Based Case Study Reference (Gennadius's Experience)

Use these REAL project experiences as inspiration for anonymous case studies:

### 1. Automotive Industry
**Real Projects**: Porsche AG (Stuttgart 2018), Klöckner Pentaplast (Montabaur 2017)
**Achievements**:
- Urgent replacement of 20 Palo Alto Firewalls (Klöckner)
- Checkpoint/Cisco ASA firewall migrations & F5 Load Balancer (Porsche)
- Coordinated global firewall migrations and on-site deployment
**Anonymous Template**: "Ein führender deutscher Automobilhersteller koordinierte [PROJECT] mit 200+ Zulieferern..."

### 2. Banking & Finance
**Real Projects**: Deutsche Bank (London 2012), ING DiBa (Frankfurt 2018), Prudential (London 2013-2014)
**Achievements**:
- BaFin-compliant implementations
- ISO 27001 & TISAX Level 3 certifications
- Network/Host Intrusion Prevention for 85+ stakeholders
- F5 BIG-IP (LTM), Check Point Provider1, McAfee NSP
**Anonymous Template**: "Eine deutsche Großbank implementierte Digitalisierung unter BaFin-Aufsicht..."

### 3. Healthcare
**Real Projects**: Hospital IT modernization (infrastructure migrations under live operations)
**Achievements**:
- Zero-downtime critical infrastructure migrations
- MDR compliance (Medical Device Regulation)
- Multi-stakeholder coordination (medical, IT, administration)
**Anonymous Template**: "Ein Universitätsklinikum modernisierte IT-Infrastruktur unter laufendem Betrieb..."

### 4. E-Government
**Real Projects**: Cabinet Office (London 2015), BT Government (London 2014)
**Achievements**:
- Google Cloud rollout for government IT
- PSN Code of Connection compliance
- F5 APM/SAML authentication for critical government applications
- ISO 27k audit of enterprise network services
**Anonymous Template**: "Ein Bundesministerium koordinierte Digitalisierung über 500+ Kommunen..."

### 5. Manufacturing / Industrial
**Real Projects**: Caterpillar (Mannheim 2019-2020), BASF (Ludwighafen 2020-2021), Messer (Mühltal 2021-2022), Mann und Hummel (Ludwigsburg 2023-2024)
**Achievements**:
- 900+ VPN firewalls in Azure with HA (Caterpillar)
- ISO 27001 compliance, firewall cleanup (BASF)
- Palo Alto upgrades V8→V10, Fortinet NGFW (Messer)
- Palo Alto/Fortinet Azure, Cortex & XSOAR migration (Mann und Hummel)
**Anonymous Template**: "Ein globaler Industriekonzern vernetzte 36 Standorte weltweit (Industrie 4.0)..."

### 6. Telecommunications
**Real Projects**: Everything Everywhere (Hatfield 2012-2013), Vattenfall (Berlin 2022-2023), Orange Business (Eschborn 2018-2019)
**Achievements**:
- Check Point VSX Provider1, Palo Alto, Juniper, F5 design (Everything Everywhere)
- Azure Security, Palo Alto, F5, BGP config (Vattenfall)
- Cisco ASA→Firepower upgrades, worldwide firewall cleanup (Orange)
**Anonymous Template**: "Ein Telekommunikationsunternehmen orchestrierte 5G-Ausbau über 15.000 Standorte..."

**USAGE RULE**: Extract authentic details (numbers, technologies, challenges) from CV BUT anonymize company names and personal info.

## Project Overview
Managing content creation for 4 WordPress sites in Big Dick's portfolio:
1. **ai-projektmanager.de** - AI project management (German)
2. **aimarketingbg.com** - AI marketing (English/Bulgarian)
3. **varna-agenten.de** - AI agents (German)
4. **varnaai.com** - AI services (English)

## WordPress Access Credentials

**All credentials are centralized in the keymanager.**

```bash
# View all WordPress credentials
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py get wordpress varnaai.com

# Or get a specific site
python keymanager.py get wordpress ai-projektmanager.de password
```

**Available Sites**: varnaai.com, ai-projektmanager.de, varna-agenten.de, aimarketingbg.com, classicsecurity.net

**In Python code**:
```python
import sys
sys.path.insert(0, "D:/VarnaAI/Websites/work")
from secrets.keymanager import get_wordpress

creds = get_wordpress("varnaai.com")
# Returns: {"username": "claude", "password": "...", "login_url": "..."}
```

**Note**: All sites use WordPress with Kadence theme. Username is `claude` for all sites.

## Social Media Profiles (Quick Reference)

| Brand | Facebook | Instagram | LinkedIn | X/Twitter |
|-------|----------|-----------|----------|-----------|
| **Varna AI** | [varnaai](https://www.facebook.com/varnaai/) | [varnaaicom](https://www.instagram.com/varnaaicom) | [varnaai](https://www.linkedin.com/company/varnaai/) | [Varna_Ai](https://x.com/Varna_Ai) |
| **AI Projektmanager** | [AIProjektmanager](https://www.facebook.com/AIProjektmanager/) | [aiprojectmanger](https://www.instagram.com/aiprojectmanger) | [ai-projektmanager](https://www.linkedin.com/company/ai-projektmanager/) | [AiProjekt](https://x.com/AiProjekt) |
| **Varna Agenten** | [VarnaAgenten](https://www.facebook.com/VarnaAgenten/) | [varnaagents](https://www.instagram.com/varnaagents) | [varna-agenten](https://www.linkedin.com/company/varna-agenten/) | [VarnaAgenten](https://x.com/VarnaAgenten) |
| **AI Marketing BG** | [aimarketingbg](https://www.facebook.com/aimarketingbg/) | [aimarketingbg](https://www.instagram.com/aimarketingbg/) | [ai-marketing-bg](https://www.linkedin.com/company/ai-marketing-bg/) | [aimarketingbg](https://x.com/aimarketingbg) |


## 🚨 CRITICAL WORKFLOW RULE 🚨

**WHEN CREATING NEW PAGES:**
1. Create blank page in WordPress (Seiten → Neu hinzufügen)
2. **STOP AND WAIT** - Do NOT proceed with content
3. Notify Big Dick that page is created and ready for design
4. **WAIT for Big Dick to add Kadence design blocks**
5. Big Dick will confirm when design blocks are added
6. **ONLY THEN** proceed with writing content to fill the text areas
7. Big Dick handles all images - never add or modify images

**Why This Matters:**
- Kadence blocks provide the structure and design framework
- Attempting to write content before design blocks causes workflow conflicts
- Big Dick needs to see the page structure to choose appropriate design templates
- Images are managed separately and should not be touched by Claude

## Page Creation Process (Step-by-Step)

**🎯 NEW IMPROVED WORKFLOW: Plan SEO BEFORE Writing**

**Key Change**: Instead of writing content and then fixing SEO issues, we now:
1. ✅ **Plan** SEO strategy (keyword, links, structure)
2. ✅ **Write** SEO-optimized content in one pass
3. ✅ **Verify** Rank Math score is 70-80+/100 immediately

**Result**: No more revisions needed - content is SEO-perfect from the start!

---

### Step 1: Create Blank Page
1. Navigate to WordPress admin: `https://[site]/wp-admin/`
2. Click "Seiten" → "Neu hinzufügen" (Pages → Add New)
3. Page editor loads with empty Gutenberg editor
4. **STOP HERE** - Do not add any content yet

### Step 2: Notify and Wait
1. Tell Big Dick: "Blank page created at [URL], ready for your design blocks"
2. Provide the post edit URL (format: `post.php?post=[ID]&action=edit`)
3. **WAIT** for Big Dick's confirmation that design blocks are added
4. Big Dick will message: "design blocks added" or similar

### Step 3: SEO Planning (Before Writing Content)
**🎯 CRITICAL: Plan SEO strategy BEFORE writing a single word**

1. **Analyze page topic and URL** → Determine optimal focus keyword
   - Example: `/dsgvo-konform` → "DSGVO-konform Projektmanagement"
   - Example: `/it-sicherheit` → "IT-Sicherheit Projektmanagement"
   - Example: `/enterprise` → "Enterprise Projektmanagement"

2. **Research external link opportunities**:
   - German authorities: BSI (https://www.bsi.bund.de), BfDI (https://www.bfdi.bund.de)
   - EU resources: EU GDPR portal, EU AI Act documentation
   - Industry standards: ISO/IEC websites, compliance frameworks

3. **Identify internal link targets**:
   - Check ai-projektmanager.de sitemap for related pages
   - Plan 2-3 internal links to services, use cases, or features
   - Example: DSGVO page links to Compliance page, Enterprise page

4. **Map keyword placement strategy**:
   - **Hero paragraph**: Natural mention (optional)
   - **Paragraph 2/3**: START with exact focus keyword phrase (REQUIRED)
   - **H2/H3 heading**: Include keyword in one heading (REQUIRED)
   - **Body paragraphs**: Distribute keyword 5-7 more times for 1% density
   - **External link paragraph**: Weave in BSI/BfDI link naturally
   - **Feature descriptions**: Natural keyword variations

5. **Plan content structure**:
   - Hero: Engaging opening (may include keyword)
   - Para 2/3: Focus keyword introduction with definition
   - Para 3/4: External link to authority (BSI/BfDI)
   - Features: Technical details with keyword distribution
   - FAQ/Info boxes: Address common questions
   - CTA: Strong call-to-action

### Step 4: Content Creation (All-in-One Pass)
**Write SEO-optimized content from the start - NO revisions needed**

1. Review the Kadence design blocks Big Dick added
2. Identify all text areas that need content
3. **Fill each block following the SEO plan**:
   - ✅ Hero paragraph: Engaging introduction
   - ✅ Paragraph 2/3: **Focus keyword at beginning** + definition (3-4 sentences)
   - ✅ Paragraph 3/4: External link integration with natural anchor text
   - ✅ Feature blocks: Technical details with keyword distribution
   - ✅ H2/H3 heading: Include focus keyword in at least ONE heading
   - ✅ Body content: Distribute keyword 5-7 times total (1% density)
   - ✅ Internal links: Link to 2-3 other ai-projektmanager.de pages
   - ✅ CTA section: Strong call-to-action
4. **Target metrics while writing**:
   - **600-650 words** total content
   - **7-8 keyword mentions** for 1% density
   - **1-2 external DoFollow links** to BSI/BfDI/EU authorities
   - **2-3 internal links** to related pages
5. Never modify or remove existing design elements (buttons, images, layouts)

**Result**: Content is SEO-optimized from first draft - Rank Math score 70-80+/100 immediately

### Step 5: Final Review & Verification
**Verify SEO optimization was successful**

1. **Take browser snapshot** to confirm all content filled
2. **Check Rank Math panel**:
   - Word count: Should show 600+ words ✅
   - SEO score: Target 70-80+/100 ✅
   - Focus keyword density: Should show ~1% ✅
3. **Verify SEO checklist**:
   - ✅ Focus keyword at START of paragraph 2/3
   - ✅ Focus keyword in one H2/H3 heading
   - ✅ Focus keyword used 7-8 times (1% density)
   - ✅ 1-2 external DoFollow links (BSI/BfDI)
   - ✅ 2-3 internal links to other pages
   - ✅ 600-650 words total content
4. **Save draft**: Click "Entwurf speichern"
5. Confirm all text blocks have content
6. **Never** add or modify images - Big Dick handles all visuals

**Expected Result**: Rank Math score 70-80+/100 immediately (no revisions needed)

---

## Rank Math Error Reference (For Troubleshooting)

**If SEO score is below 70/100, check these common issues:**

### Focus Keyword Errors
1. **"Das Fokus-Schlüsselwort erscheint nicht am Anfang deines Inhalts"**
   - Paragraph 2/3 must START with exact focus keyword phrase
   - Example: `DSGVO-konform Projektmanagement verbindet höchste Datenschutzstandards...`

2. **"Das Fokus-Schlüsselwort ist nicht in Zwischenüberschrift(en)"**
   - At least ONE H2/H3 heading must contain focus keyword
   - Example: `## DSGVO-konform Projektmanagement für deutsche Unternehmen`

3. **"Die Schlüsselwort-Dichte ist zu niedrig"**
   - Use focus keyword 7-8 times for 1% density in 600-word content
   - Distribute naturally across hero, features, FAQ, CTA sections

### Link Errors
4. **"Es wurden keine ausgehenden Links gefunden"**
   - Add 1-2 DoFollow external links to BSI (https://www.bsi.bund.de) or BfDI
   - Natural anchor text: "beim Bundesamt für Sicherheit in der Informationstechnik"

5. **"Füge deinem Inhalt interne Links hinzu"**
   - Link to 2-3 other ai-projektmanager.de pages
   - Example: Link DSGVO page → Compliance page, Enterprise page

### Content Length
6. **"Dein Inhalt ist [X] Wörter lang. Erwäge, mindestens 600 Wörter"**
   - Expand feature descriptions, add use cases, technical details
   - Target: 600-650 words (don't add fluff)

### Metadata (Big Dick Handles - Not Claude)
7. **"Dein Titel enthält kein power word"** ← Big Dick sets SEO title
8. **"Dein SEO-Titel enthält keine Zahl"** ← Big Dick adds number
9. **"Füge ein Bild mit deinem Fokus-Schlüsselwort als Alt-Text"** ← Big Dick adds images

---

### Step 6: Notify Completion
1. Notify Big Dick that page is complete
2. Provide final metrics:
   - **Word count**: [number] words
   - **SEO score**: [score]/100
   - **Focus keyword**: [keyword]
   - **Status**: Draft ready for review
3. Big Dick will:
   - Add images with keyword alt text
   - Adjust SEO title/meta if needed
   - Publish when ready

## Content Writing Guidelines

### German Language Content (ai-projektmanager.de, varna-agenten.de)
- **Tone**: Professional, authoritative, technical
- **Themes**: DSGVO compliance, NIS2, EU AI Act, BSI IT-Grundschutz, ISO 27001, TISAX
- **Keywords**: Security-focused, compliance-oriented, AI-powered
- **Structure**:
  - Strong opening paragraph with focus keyword
  - Feature/benefit blocks with technical details
  - Trust signals (certifications, compliance standards)
  - Clear CTAs (Demo anfragen, Jetzt starten)

### Content Block Types (Kadence)
Common Kadence blocks Big Dick uses:
- **Hero sections**: Title + description + CTA button
- **Feature blocks**: Icon + heading + description (usually 3-4 features)
- **Info boxes**: Highlighted information with background color
- **Progress bars**: Visual metrics (e.g., "DSGVO-Konformität: 100%")
- **Counters**: Statistics (e.g., "5.2k Erfolgreiche Security-Audits")
- **Text blocks**: Paragraph content with headings
- **CTA sections**: Call-to-action with button

### SEO-Optimized Content Structure
```
Paragraph 1 (Hero/Introduction):
- Engaging opening about the page topic
- May or may not contain focus keyword (depends on hero design)

Paragraph 2 (Focus Keyword Introduction):
- MUST start with exact focus keyword phrase
- Explain what the focus keyword means and why it matters
- 3-4 sentences providing context

Paragraph 3 (External Link Integration):
- Discuss standards, regulations, or authoritative sources
- Include external link with natural anchor text
- Example: "beim Bundesamt für Sicherheit in der Informationstechnik"

Remaining Content:
- Feature descriptions
- Benefits and value propositions
- Technical capabilities
- Trust signals and certifications
- Use cases and examples

Final Section:
- Strong CTA
- Clear next steps for user
```

## Completed Page Examples (Archive)

**Detailed examples archived**: `done/seo-examples-archive.md`

| Page | Focus Keyword | Metrics |
|------|---------------|---------|
| /anwendungsfaelle/it-sicherheit | IT-Sicherheit Projektmanagement | 605 words, 86/100 |
| /fallstudien | Fallstudien | 629 words, 88/100 |

## Standard Portfolio Page Types

All 4 portfolio sites have these standard page types:
- **Home** - Homepage/landing page
- **About** - Company/service information
- **Kontakt** - Contact page
- **Services** - Service offerings
- **Portfolio** - Case studies, projects, success stories
- **Gallery** - Visual showcase
- **Team** - Team members

## ✅ AI Projektmanager.de - COMPLETE (2025-11-13)

All 7 pages completed. Backup: `done/aiprojektmanagersicheregdpr-konformeprojektmanagementsaas.WordPress.2025-11-13.xml`

## Common SEO Issues and Fixes

### Focus Keyword Not at Beginning
**Issue**: "Das Fokus-Schlüsselwort erscheint nicht am Anfang deines Inhalts"
**Fix**: Rewrite second paragraph to start with exact focus keyword phrase
**Before**: "Von Penetrationstests über Compliance-Audits..."
**After**: "IT-Sicherheit Projektmanagement verbindet technische Expertise..."

### No External Links
**Issue**: "Es wurden keine ausgehenden Links gefunden"
**Fix**: Add authoritative external link with natural anchor text
**German Sites**: BSI, BfDI, EU official sites
**Example**: "beim Bundesamt für Sicherheit in der Informationstechnik"
**Link**: https://www.bsi.bund.de

### Low Word Count
**Issue**: Content below 600 words minimum
**Fix**:
- Expand feature descriptions with technical details
- Add use cases and examples
- Include benefit statements
- Elaborate on compliance requirements
- Don't create new blocks - fill existing empty text areas

## Tools and Plugins

### Rank Math SEO
- Provides SEO scoring (0-100)
- Identifies optimization opportunities
- Big Dick inputs metadata (title, description, slug)
- Claude focuses on content optimization (keywords, links, length)

### Kadence Blocks
- Pre-built design patterns and templates
- Big Dick selects and places blocks
- Claude fills text content within blocks
- Never modify block structure or settings

### Gutenberg Editor
- WordPress block-based editor
- Navigate with mouse clicks on blocks
- Type directly into text areas
- Use "Aktualisieren" button to save frequently

## Best Practices

### DO:
- ✅ Wait for Big Dick to add design blocks before writing
- ✅ Fill ALL text areas with relevant content
- ✅ Include focus keyword at the beginning of content (paragraph 2 or 3)
- ✅ Add at least one external authoritative link
- ✅ Aim for 600-650 words total
- ✅ Save frequently with "Aktualisieren"
- ✅ Verify SEO score reaches 80+/100
- ✅ Use German language for .de sites
- ✅ Include compliance terminology (DSGVO, NIS2, BSI)

### DON'T:
- ❌ Start writing before Big Dick adds design blocks
- ❌ Add, remove, or modify images
- ❌ Change Kadence block settings or structure
- ❌ Leave text areas empty
- ❌ Use generic placeholder text
- ❌ Ignore Rank Math SEO warnings
- ❌ Modify SEO metadata (Big Dick handles this)
- ❌ Create new blocks without permission
- ❌ **NEVER CREATE SCHEMA MARKUP WITHOUT USER APPROVAL** (see Schema Rules below)

## Schema.org Markup Rules

### 🚨 CRITICAL: Schema is User Territory

**RULE**: Claude **NEVER** creates, suggests, or generates Schema.org markup unless explicitly requested with approved format.

**Why This Rule Exists:**
- User knows what Google Search Console requires
- User has working Schema patterns from other sites
- Schema mistakes harm SEO performance
- Each page type needs specific Schema (not generic)

**Correct Workflow:**
1. User says: "add schema" or "schema doesn't work"
2. Claude asks: "What Schema type do you need?"
3. User provides exact format (like ItemList + Product example)
4. Claude confirms understanding but doesn't add (user adds via Rank Math)

**Reference File:** `D:\VarnaAI\Websites\wordpress\schema-templates.md`

**Example User-Approved Schema:**
- **Pricing Pages**: ItemList + Product (with aggregateRating, offers, brand)
- **Services Pages**: Organization + Article (already implemented site-wide)
- **Portfolio Pages**: Awaiting user template

**Never Assume Schema Type Based On:**
- Page content (FAQ content ≠ FAQPage Schema)
- Page name (Services page ≠ Service Schema)
- Industry standards (User's approach may differ)

**If User Says "Schema doesn't work":**
1. Ask what tool/error they're seeing
2. Validate existing Schema JSON syntax
3. Wait for user instruction on what Schema to add

## Troubleshooting

### File Chooser Modal Appears
**Issue**: Media upload modal blocks editor
**Fix**: Use `browser_file_upload` with empty paths array to dismiss
```javascript
browser_file_upload({ paths: [] })
```

### Wrong Page Being Edited
**Issue**: Working on incorrect post ID
**Fix**: Verify post ID in URL matches user's instructions
**Example**: User said post 317157, but you're on 317167

### SEO Score Won't Improve
**Possible Causes**:
1. Focus keyword not at beginning → Rewrite paragraph 2
2. No external links → Add BSI or official source link
3. Word count below 600 → Expand content
4. Missing internal links → Link to other pages
5. Low keyword density → Use focus keyword more naturally

### Content Doesn't Fit Design
**Issue**: Text too long/short for Kadence block
**Fix**: Adjust content length to match block size
- Hero descriptions: 2-3 sentences
- Feature descriptions: 2-4 sentences
- Info boxes: 3-5 sentences
- Text blocks: 4-8 sentences

## Performance Notes

### Browser Automation
- Use Playwright MCP for WordPress editing
- Take snapshots to verify page structure
- Click blocks to select before typing
- Save frequently to prevent data loss

### Token Efficiency
- Read page structure once, fill all blocks in one session
- Don't repeatedly navigate away and back
- Batch content creation for similar blocks
- Use concise but complete content

## 🚨 CURRENT STATUS (Updated 2025-12-23) 🚨

### Strategic Pivot: January 2026 Varna Return

**Goal**: Simplify operations - "Take websites off the table"

| Item | Status | Action |
|------|--------|--------|
| **Hetzner VPS** | ❌ **OFF** | Shutting down - no longer maintained |
| **Demo Apps** | 📦 **ARCHIVED** | Moving to static landing pages on All-Inkl |
| **VarnaAI.com** | 🎯 **PRIMARY** | Business card homepage (Task 83) |
| **Other 3 Sites** | 🔄 **SIMPLIFY** | Redirect or minimal landing pages |

### Infrastructure Migration

**FROM** (Hetzner VPS @ 78.47.125.174):
- ~~RetirementAI~~ → Static landing page
- ~~FwChange~~ → Static landing page
- ~~C3 Compliance~~ → Static landing page
- ~~nginx, Docker, fail2ban~~ → Not needed

**TO** (All-Inkl Shared Hosting):
- Static HTML landing pages for demo showcases
- WordPress sites already on All-Inkl
- Minimal maintenance, maximum stability

### Task Status (Jan 2026 Launch)

| Task | Status | Priority |
|------|--------|----------|
| 83: VarnaAI Business Card Homepage | PENDING | 🔴 HIGH |
| 84: Simplify Other 3 Sites | PENDING | After 83 |
| 85: Business Cards | IN-PROGRESS | Order by Dec 23! |
| 86: Case Studies (3) | ✅ DONE | - |
| 87: LinkedIn Profile | ✅ DONE | - |
| 88: Sales Materials | ✅ DONE | - |
| 89: Google Sheets Dashboard | PENDING | Jan 5, 2026 |
| 90: LinkedIn Posts (12) | ✅ DONE | - |
| 91: Lead Magnets | ✅ DONE | - |
| 92: Networking Event Prep | PENDING | Jan 26, 2026 |

**Full task details**: `.taskmaster/tasks/task_083.md` through `task_092.md`

---

## VarnaAI 3-App Docker Architecture (Local Development)

**CRITICAL: All apps run 100% in Docker on local Windows 11 machine. No cloud VPS.**

The VarnaAI development platform runs 3 isolated Docker applications on the same host.
Each app has its own Docker network with dedicated subnets and port ranges.

### Host Environment

| Component | Specification |
|-----------|--------------|
| **OS** | Windows 11 |
| **RAM** | 64GB |
| **GPU** | RTX 5070 (8GB VRAM) |
| **LLM Runtime** | Docker with NVIDIA GPU support (NOT local) |
| **Ollama** | Runs in Docker container with GPU passthrough |
| **Master Folder** | `D:\VarnaAI\Websites` (this folder) |

### Port Allocation (VarnaAI Platform)

| App | Frontend | Backend | PostgreSQL | Redis | Subnet |
|-----|----------|---------|------------|-------|--------|
| **Pension (RetirementAI)** | 3001 | - | 5433 | 6380 | 172.20.0.0/16 |
| **C3 (Compliance)** | 3002 | 8001 | 5434 | 6381 | 172.21.0.0/16 |
| **FwChange** | 3003 | 8002 | 5435 | 6382 | 172.22.0.0/16 |

### Container Prefixes (CRITICAL)

| App | Container Prefix | Example Containers |
|-----|------------------|-------------------|
| Pension | `pension-*` | pension-app, pension-postgres, pension-redis |
| C3 | `c3-*` | c3-frontend, c3-api, c3-postgres, c3-redis |
| FwChange | `fwchange-*` | fwchange-frontend, fwchange-backend, fwchange-postgres, fwchange-redis |

🚨 **CONTAINER ISOLATION RULE**:
- Each app manages ONLY its own prefixed containers
- NEVER touch containers from other apps
- Always specify container names explicitly in Docker commands

### Quick Start (Local Development)

```bash
# From D:\VarnaAI\Websites\apps - Start all 3 apps
cd apps/pension && docker-compose up -d && cd ../..
cd apps/dashboard && docker-compose up -d && cd ../..
cd apps/fwchange && docker-compose up -d && cd ../..

# Check all running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Local Access Points

| Service | URL |
|---------|-----|
| **Pension** | http://localhost:3001 |
| **C3 Compliance** | http://localhost:3002 |
| **FwChange** | http://localhost:3003 |
| **FwChange API** | http://localhost:8002/docs |
| **C3 API** | http://localhost:8001 |
| **Jira (FwChange)** | http://localhost:8080 |

---

## VarnaAI App Portfolio (Production Status)

**📊 Portfolio Status Summary:**
- ❌ **VPS OFFLINE** - Hetzner VPS @ 78.47.125.174 (shutdown Dec 2025)
- ✅ **Local Docker** - All 3 apps run locally for development
- 📦 **Migrating to static landing pages** on All-Inkl for production demos
- 📝 **All portfolio pages on WordPress complete**

**🌐 Production Demo Status:**
- RetirementAI: ❌ demo-retirement.varnaai.com → Static page planned
- FwChange: ❌ demo-fwchange.varnaai.com → Static page planned
- C3 Compliance: ❌ c3.varnaai.com → Static page planned
- SEO Agent: ❌ Not deployed
- VarnaAI Agents: ❌ Not deployed

---

### Apps Reference (For Portfolio Pages)

1. **RetirementAI** (D:\VarnaAI\Websites\apps\pension)
   - **Portfolio Page**: ✅ COMPLETE (Post ID: 317163)
   - **Demo**: ❌ OFFLINE (VPS shutdown)
   - **Tech Stack**: Next.js 14, PostgreSQL, Redis, OpenAI GPT-4
   - **Key Features**: Trading212 API, AI advisor, portfolio optimization

2. **FwChange** (D:\VarnaAI\Websites\apps\fwchange)
   - **Portfolio Page**: ✅ COMPLETE (Post ID: 317353)
   - **Demo**: ❌ OFFLINE (VPS shutdown)
   - **Tech Stack**: React 18, FastAPI, PostgreSQL, Redis
   - **Key Features**: Multi-vendor firewalls, JIRA integration, PCI-DSS compliance

3. **C3 Compliance** (D:\VarnaAI\Websites\apps\dashboard)
   - **Portfolio Page**: ✅ COMPLETE
   - **Demo**: ❌ OFFLINE (VPS shutdown)
   - **Tech Stack**: React 18, Node.js, PostgreSQL (pgvector)
   - **Key Features**: GDPR automation, 60-second scans, German docs

4. **SEO Agent** (D:\VarnaAI\Websites\apps\seoagent)
   - **Portfolio Page**: ✅ COMPLETE
   - **Demo**: ❌ Never deployed
   - **Tech Stack**: Vite, React 19, Express, PostgreSQL

5. **VarnaAI Agents** (D:\VarnaAI\Websites\apps\varnaai)
   - **Portfolio Page**: ✅ COMPLETE
   - **Demo**: ❌ Never deployed
   - **Tech Stack**: Next.js 14, NestJS, PostgreSQL, Neo4j

6. **WebScrap** (D:\VarnaAI\Websites\apps\webscrap)
   - **Status**: Development
   - **Tech Stack**: Web scraping platform

7. **Project Manager** (D:\VarnaAI\Websites\apps\projectmanager)
   - **Status**: Development
   - **Tech Stack**: Node.js project management

8. **Agentic Coder** (D:\VarnaAI\Websites\apps\agenticcoder)
   - **Status**: Development
   - **Tech Stack**: AI coding assistant

9. **LibreChat** (D:\VarnaAI\Websites\apps\LibreChat)
   - **Status**: Self-hosted chat
   - **Tech Stack**: LibreChat (external project)


## Questions for Big Dick

If uncertain about:
- Design block readiness → Ask "Have you added the design blocks?"
- Content direction → Ask "What should I focus on for [topic]?"
- SEO metadata → Ask "Can you provide the Rank Math details?"
- Page structure → Ask "Should I add more content sections?"
- **Focus Keyword** → Ask "What should the Focus Keyword be for this page?"

---

## 📝 Blog Generation Workflow

**Location**: `D:\VarnaAI\Websites\blogs\`
**Last Updated**: 2025-12-02

### Quick Start
Say **"go"** → I'll ask **"What task?"** → Tell me the website → I execute the 3-phase workflow.

### Key Files
| File | Purpose |
|------|---------|
| `START_HERE.md` | Quick start guide ("go" command) |
| `URLS.md` | **54 real internal URLs** for 4 websites (scanned 2025-12-02) |
| `SAAS_APPS.md` | Portfolio apps to promote in posts |
| `INSTRUCTIONS.md` | SEO rules, WordPress formatting |
| `LESSONS_LEARNED.md` | Error archive (56K tokens saved) |
| `TOPIC_DIVERSITY_MATRIX.md` | 80+ unique topics across 4 sites |
| `GAP_ANALYSIS_2025.md` | Content gaps and priorities |

### Blog Posts Archive
**Consolidated Location**: `blogs/blog_posts/2025-12-02/`
- `ai-projektmanager/` - 9 posts
- `aimarketingbg/` - 7 posts
- `varna-agenten/` - 1 post
- `varnaai/` - 7 posts
- **Total**: 24 existing blog posts

### The 3-Phase Workflow
1. **Validation** (2 min) - Check URLS.md, verify topic diversity, plan 7+3 links
2. **Writing** (20 min) - WordPress blocks, embed links IN content, track focus keyword
3. **Verification** (3 min) - Count keywords, verify all 10 links embedded, check format

### Critical SEO Rules
- ✅ **7 internal links** from URLS.md (real pages only)
- ✅ **3 external DoFollow links** to authorities (BSI, Gartner, etc.)
- ✅ **External links**: `rel="noopener"` ONLY (NO nofollow on citations!)
- ✅ **WordPress blocks** with spacers before every H2
- ✅ **Focus keyword**: 18-22 occurrences in 2000-word post (1% density)
- ✅ **Paragraphs**: Maximum 3 sentences each

### Portfolio Sites (4 Websites)
| Site | Language | Focus |
|------|----------|-------|
| ai-projektmanager.de | German | AI project management, compliance |
| varnaai.com | English | Enterprise AI, security |
| aimarketingbg.com | English | AI marketing, lead generation |
| varna-agenten.de | German | Creative AI, design automation |

### Image Rule
**One featured image per blog post** - Big Dick handles all images

---

## 🇧🇬 January 2026 Bulgaria Launch

**Goal**: Launch consulting services in Varna, Bulgaria
**Timeline**: January 2026
**Status**: Preparation Phase - Focus on networking, not SaaS

### Strategic Pivot

**FROM**: SaaS product sales (C3, FwChange, etc.)
**TO**: Consulting services (ISO 27001, GDPR, AI implementation)

**Rationale**:
- Bulgarian SMEs want **"someone to do it for them"** (service, not software)
- First sale takes **3-6 months** of relationship building
- Face-to-face meetings are **mandatory** in Bulgarian business culture
- VPS demos are overkill - static portfolio pages sufficient

### Key Strategy Documents

| Document | Location |
|----------|----------|
| **Business Plan 2025** | `docs/strategy/BUSINESS_PLAN_2025.md` |
| SME Market Reality | `docs/strategy/C3/SME_MARKET_REALITY_2025.md` |
| Varna Local Research | `docs/strategy/C3/VARNA_LOCAL_MARKET_RESEARCH_2025.md` |
| VCCI Membership Plan | `docs/strategy/C3/VCCI_Membership_Action_Plan.md` |
| Service Delivery Playbook | `docs/strategy/C3/SERVICE_DELIVERY_PLAYBOOK.md` |

### Prepared Materials (All Done)

| Material | Location | Status |
|----------|----------|--------|
| 3 Case Studies | `docs/case-studies/` | ✅ DONE |
| LinkedIn Profile Guide | `docs/marketing/linkedin-profile-optimization.md` | ✅ DONE |
| 12 LinkedIn Posts | `docs/marketing/linkedin-posts-january-2026.md` | ✅ DONE |
| Sales Toolkit | `docs/sales/sales-materials-complete-toolkit.md` | ✅ DONE |
| Security Checklist PDF | `docs/marketing/security-checklist-bulgarian-smes.md` | ✅ DONE |
| Business Card Spec | `assets/business-card-design-spec.md` | ✅ DONE |
| Bulgarian Sales Materials | `assets/sales-materials-bg/` | ✅ DONE |

### Service Pricing (Bulgarian Market)

| Service | Price |
|---------|-------|
| Free discovery call | Безплатно |
| GDPR Compliance Audit | 980 лв (~€500) |
| ISO 27001 Implementation | 9,800 лв (~€5,000) |
| Monthly Advisory | 290 лв/месец (~€150/mo) |

### Timeline to First Revenue

- **Jan 26, 2026**: First networking event
- **Feb-Mar 2026**: Build relationships, book discovery calls
- **Q2 2026**: First paid projects
- **18-24 months**: Target €50K/year revenue

---

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
