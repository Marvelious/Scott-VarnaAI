# SEO Agent Automation Tools

**Created**: November 8, 2025
**Purpose**: Automate SEO analysis, keyword research, and content optimization for WordPress sites

---

## 🎯 What This Does

These scripts use the VarnaAI SEO Agent app to **automate 6 key SEO features** from the command line:

1. ✅ **Analyze Websites for SEO** - Check any website and get SEO score + problems
2. ✅ **Research Keywords** - Find good keywords to target for rankings
3. ✅ **Monitor Rankings** - Watch your website positions in Google
4. ✅ **Find Backlinks** - Discover who links to your site
5. ✅ **Get Analytics** - See traffic, visitors, page views
6. ✅ **Get Content Ideas** - Suggestions for what to write about

---

## 📁 Files Created

### 1. `automate-seo-analysis.js`
**General SEO automation tool** - Works with any website

**Features**:
- Analyze SEO scores
- Research keywords
- Check rankings
- Find backlinks
- Get analytics
- Generate content ideas

### 2. `wordpress-seo-helper.js`
**WordPress-specific helper** - Optimized for WordPress workflow

**Features**:
- Analyze WordPress pages
- Generate actionable fix lists
- Batch analyze multiple pages
- WordPress-specific recommendations

---

## 🚀 Quick Start

### Prerequisites

**BEFORE running these scripts, you MUST:**

1. **Start the SEO Agent app**:
```bash
# Terminal 1 - Backend
cd D:\VarnaAI\seoagent\backend
npm run dev

# Terminal 2 - Frontend (optional, API only needed)
cd D:\VarnaAI\seoagent
npm run dev
```

2. **Verify it's running**:
```bash
curl http://localhost:4000/api/health
# Should return 200 OK
```

### Install Dependencies

```bash
cd D:\VarnaAI\Websites\SeoAgent
npm install axios
```

---

## 📖 Usage Examples

### Example 1: Analyze a WordPress Page

```bash
node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/enterprise "Enterprise Projektmanagement"
```

**Output**:
```
🎯 WORDPRESS SEO ANALYSIS

📄 Page: https://ai-projektmanager.de/anwendungsfaelle/enterprise
🎯 Focus Keyword: Enterprise Projektmanagement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Analyzing current SEO...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SEO ANALYSIS RESULTS:
   SEO Score: 73/100
   Status: ⚠️ NEEDS WORK

❌ PROBLEMS FOUND:
   1. CRITICAL - Focus keyword not at beginning of content
   2. HIGH - Word count below 600 (current: 548)
   3. MEDIUM - Missing external authoritative links

✅ RECOMMENDATIONS:
   1. Move focus keyword to start of paragraph 2 or 3
   2. Add 52+ more words of quality content
   3. Add 1-2 links to BSI or other German authorities

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ACTION ITEMS FOR WORDPRESS PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Optimize Focus Keyword Placement
   Priority: 🟡 HIGH
   Action: Ensure "Enterprise Projektmanagement" appears in:
   ✓ URL slug
   ✓ First paragraph
   ✓ H2/H3 heading
   ✓ 3-5 times in content

2. Increase Word Count
   Priority: 🟡 HIGH
   Action: Current: 548 words. Target: 600+ words.

3. Add External Authoritative Links
   Priority: 🟡 HIGH
   Action: Add 1-2 DoFollow links to BSI.de
```

---

### Example 2: Research Keywords

```bash
node automate-seo-analysis.js keywords "Enterprise Projektmanagement" de
```

**Output**:
```
🔍 Researching keywords for: Enterprise Projektmanagement (de)

📈 TOP KEYWORDS:
   Keyword                          | Volume | Difficulty | CPC
   ----------------------------------------------------------------------
   enterprise projektmanagement     | 2400   | 45         | €3.20
   projekt management software      | 8100   | 52         | €4.50
   enterprise project management    | 5400   | 48         | €3.80
   projektmanagement tools          | 3600   | 41         | €2.90
   agile projektmanagement          | 4200   | 38         | €2.50
```

---

### Example 3: Batch Analyze All WordPress Pages

```bash
node wordpress-seo-helper.js batch
```

**Output**:
```
🚀 Batch analyzing 3 WordPress pages...

==================================================
Analyzing: IT-Sicherheit
==================================================
[... analysis for IT-Sicherheit page ...]

==================================================
Analyzing: Compliance
==================================================
[... analysis for Compliance page ...]

==================================================
Analyzing: Enterprise
==================================================
[... analysis for Enterprise page ...]

✅ Batch analysis complete! Summary saved to: batch-seo-summary-1699459200000.json

📊 BATCH ANALYSIS SUMMARY:

✅ it-sicherheit: 86/100
⚠️ compliance: 73/100
⚠️ enterprise: 68/100
```

---

### Example 4: Get Content Ideas

```bash
node automate-seo-analysis.js ideas "IT Sicherheit" "enterprise" de
```

**Output**:
```
💡 Getting content ideas for: IT Sicherheit in enterprise

💡 CONTENT IDEAS:

   1. 10 Kritische IT-Sicherheitsrisiken in Enterprise-Umgebungen
      Type: List Article
      Target Keywords: it-sicherheit, enterprise, risiken
      Estimated Traffic: 1200 visits/month
      Difficulty: 6/10

   2. NIS2-Compliance: Der ultimative Leitfaden für Unternehmen
      Type: Guide
      Target Keywords: nis2, compliance, unternehmen
      Estimated Traffic: 800 visits/month
      Difficulty: 5/10
```

---

### Example 5: Find Backlinks

```bash
node automate-seo-analysis.js backlinks https://ai-projektmanager.de
```

**Output**:
```
🔗 Finding backlinks for: https://ai-projektmanager.de

🔗 BACKLINK PROFILE:
   Total Backlinks: 127
   Referring Domains: 45
   Domain Authority: 38/100

📊 TOP BACKLINKS:
   Source Domain              | Authority | Link Type
   ------------------------------------------------------------
   blog.beispiel.de           | 52        | ✅ DoFollow
   tech-magazin.com           | 68        | ✅ DoFollow
   projektmanagement-hub.de   | 41        | ⚠️ NoFollow
```

---

### Example 6: Check Rankings

```bash
node automate-seo-analysis.js rankings https://ai-projektmanager.de "projektmanagement,enterprise,it-sicherheit"
```

**Output**:
```
📊 Checking rankings for: https://ai-projektmanager.de

🎯 CURRENT RANKINGS:
   Keyword                    | Position | Change
   -------------------------------------------------------
   projektmanagement          | #12      | 📈 +3
   enterprise                 | #28      | —
   it-sicherheit              | Not ranked | —
```

---

## 🔧 All Available Commands

### General SEO Tools (`automate-seo-analysis.js`)

```bash
# Analyze website SEO
node automate-seo-analysis.js analyze <url>

# Research keywords
node automate-seo-analysis.js keywords <topic> [language]

# Check rankings
node automate-seo-analysis.js rankings <url> <keywords>

# Find backlinks
node automate-seo-analysis.js backlinks <url>

# Get analytics
node automate-seo-analysis.js analytics <websiteId> [timeRange]

# Get content ideas
node automate-seo-analysis.js ideas <topic> <niche> [language]
```

### WordPress Tools (`wordpress-seo-helper.js`)

```bash
# Analyze single WordPress page
node wordpress-seo-helper.js analyze <url> <focusKeyword>

# Batch analyze all WordPress pages
node wordpress-seo-helper.js batch
```

---

## 📊 Output Files

All commands save detailed reports to JSON files:

- `seo-report-{timestamp}.json` - Full SEO analysis
- `keywords-{topic}-{timestamp}.json` - Keyword research data
- `rankings-{timestamp}.json` - Ranking positions
- `backlinks-{timestamp}.json` - Backlink profile
- `analytics-{websiteId}-{timestamp}.json` - Analytics data
- `content-ideas-{topic}-{timestamp}.json` - Content suggestions
- `wordpress-seo-report-{timestamp}.json` - WordPress-specific analysis
- `batch-seo-summary-{timestamp}.json` - Batch analysis summary

---

## 🎯 WordPress Workflow Integration

### Step 1: Create New Page in WordPress
```
Manually create blank page in WordPress
Wait for Big Dick to add Kadence design blocks
```

### Step 2: Analyze Existing Similar Page
```bash
node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/it-sicherheit "IT-Sicherheit Projektmanagement"
```

### Step 3: Research Keywords for New Page
```bash
node automate-seo-analysis.js keywords "Compliance Management" de
```

### Step 4: Get Content Ideas
```bash
node automate-seo-analysis.js ideas "Compliance Management" "enterprise" de
```

### Step 5: Write Content
```
Use keyword research and content ideas to write optimized content
Fill Kadence design blocks
Apply SEO recommendations from analysis
```

### Step 6: Verify After Publishing
```bash
node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/compliance "Compliance Management"
```

---

## ⚠️ Important Notes

### Prerequisites
1. **SEO Agent MUST be running** (`http://localhost:4000`)
2. **Database migrations MUST be completed** (already done)
3. **Backend must be started** before running scripts

### Limitations
- These scripts call the SEO Agent API
- If SEO Agent has bugs, automation will fail
- Currently, SEO Agent has 16 critical bugs (see PROJECT_ANALYSIS.md)
- Automation will work AFTER bugs are fixed

### Current Status
- ✅ Database migrations completed (Nov 8, 2025)
- ❌ SEO Agent has critical bugs blocking features
- ⏳ Automation scripts ready, waiting for app fixes

---

## 🐛 Troubleshooting

### Error: "ECONNREFUSED"
**Problem**: SEO Agent backend not running

**Solution**:
```bash
cd D:\VarnaAI\seoagent\backend
npm run dev
```

### Error: "Request failed with status code 500"
**Problem**: SEO Agent API endpoint broken

**Solution**: Check PROJECT_ANALYSIS.md for known bugs and fixes

### Error: "Cannot find module 'axios'"
**Problem**: Missing dependency

**Solution**:
```bash
npm install axios
```

---

## 📚 Additional Resources

- **Full Feature Analysis**: `PROJECT_ANALYSIS.md`
- **Quick Fix Guide**: `QUICK_FIX_GUIDE.md`
- **SEO Agent Project**: `D:\VarnaAI\seoagent\`

---

**Created**: November 8, 2025
**Status**: Ready for use after SEO Agent bugs are fixed
**Next Steps**: Fix SEO Agent critical bugs, then automation works!
