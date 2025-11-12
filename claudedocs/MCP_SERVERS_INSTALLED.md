# Installed MCP Servers for SEO & Backlink Building

**Date**: January 11, 2025
**Purpose**: Support directory submission automation and backlink tracking

---

## Successfully Installed (2 of 3)

### 1. Google Search Console MCP ✅
**Provider**: Ahonn Jiang (ahonn/mcp-server-gsc)
**Location**: `C:\Users\nfals\mcp-server-gsc`
**Status**: ✅ Installed
**Cost**: FREE (requires free Google account)

**Capabilities**:
- Website search performance analytics
- Indexing status monitoring
- Track backlinks Google finds
- SEO metrics analysis

**Setup Required**:
- Google Search Console account (free)
- Add all 5 portfolio sites to GSC
- Generate API credentials
- Configure in Claude Code MCP settings

**Configuration Path**:
```json
{
  "mcpServers": {
    "google-search-console": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\mcp-server-gsc\\dist\\index.js"],
      "env": {
        "GOOGLE_SEARCH_CONSOLE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

---

### 2. SEO Inspector MCP ✅
**Provider**: mgsrevolver (mgsrevolver/seo-inspector-mcp)
**Location**: `C:\Users\nfals\seo-inspector-mcp`
**Status**: ✅ Installed
**Cost**: FREE (no API key required)

**Capabilities**:
- Scan HTML files and websites
- Identify SEO optimization issues
- Detect missing titles, meta descriptions
- Analyze heading structures
- Local analysis (no external API)

**Setup Required**:
- No API key needed
- No account required
- Ready to use immediately

**Configuration Path**:
```json
{
  "mcpServers": {
    "seo-inspector": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\seo-inspector-mcp\\dist\\index.js"]
    }
  }
}
```

**Usage Example**:
```javascript
// Analyze a portfolio site
seo_inspector.analyze('https://ai-projektmanager.de/')

// Expected output:
{
  "missing_title": false,
  "missing_meta_description": false,
  "missing_h1": false,
  "duplicate_h1": true,  // Known issue
  "heading_structure": ["H1", "H2", "H2", "H3"],
  "missing_alt_tags": 5,
  "word_count": 605,
  "recommendations": [...]
}
```

---

### 3. Keyphrases MCP ❌
**Provider**: Ivan Rublev (ivanrublev/keyphrases-mcp)
**Location**: `C:\Users\nfals\keyphrases-mcp`
**Status**: ❌ Installation Failed
**Issue**: Python dependency conflicts (requires torch==2.2.2, not available for Python 3.14)

**Capabilities** (when working):
- Extract meaningful keyphrases from text
- BERT-based analysis
- SEO keyword optimization
- No API key required

**Workaround**:
- Use alternative: Manual keyword research with existing tools
- Consider different Python version (3.11 or 3.12)
- Not critical for directory submission automation

---

## Next Steps

### 1. Configure Google Search Console MCP
- [ ] Create Google Search Console account
- [ ] Add all 5 sites to GSC:
  - classicsecurity.net
  - varnaai.com
  - ai-projektmanager.de
  - varna-agenten.de
  - aimarketingbg.com
- [ ] Verify site ownership (DNS or HTML file method)
- [ ] Generate API credentials
- [ ] Add to Claude Code MCP config

### 2. Configure SEO Inspector MCP
- [ ] Add to Claude Code MCP config (no API key needed)
- [ ] Test on all 5 portfolio sites
- [ ] Generate baseline SEO reports before directory submissions
- [ ] Track improvements after backlink building

### 3. Begin Directory Submissions
- [ ] Use Playwright MCP for automation
- [ ] Start with 5 easy directories (Hotfrog, Branchenbuch, etc.)
- [ ] Track submissions in spreadsheet
- [ ] Monitor GSC for new backlinks appearing

---

## MCP Server Commands Reference

### Google Search Console
```javascript
// Get search analytics
gsc.getSearchAnalytics({
  siteUrl: 'https://varnaai.com',
  startDate: '2025-01-01',
  endDate: '2025-01-31'
});

// Get site index status
gsc.getIndexStatus({
  siteUrl: 'https://varnaai.com'
});

// Get backlink data
gsc.getBacklinks({
  siteUrl: 'https://varnaai.com'
});
```

### SEO Inspector
```javascript
// Analyze website SEO
seoInspector.analyze('https://ai-projektmanager.de/');

// Analyze local HTML file
seoInspector.analyzeFile('./path/to/page.html');

// Get specific SEO metrics
seoInspector.checkMetaTags('https://varnaai.com');
seoInspector.checkHeadings('https://varna-agenten.de');
seoInspector.checkImages('https://classicsecurity.net');
```

---

## Integration with Directory Submission Workflow

### Phase 1: Baseline Analysis (Before Submissions)
1. Run SEO Inspector on all 5 sites
2. Document current SEO scores
3. Note existing backlink count (GSC)

### Phase 2: Directory Submissions (Week 1-3)
1. Use Playwright MCP for form automation
2. Submit to 20 directories per site
3. Track submissions in spreadsheet

### Phase 3: Monitoring (Week 2-4)
1. Check GSC daily for new backlinks
2. Run SEO Inspector weekly for improvements
3. Verify directory listings are live
4. Track ranking changes

### Phase 4: Reporting (Monthly)
1. Generate backlink growth report (GSC)
2. SEO score improvements (SEO Inspector)
3. Organic traffic changes (Google Analytics)
4. Keyword ranking improvements (Rank Math)

---

## Expected Results Timeline

### Week 1
- **SEO Inspector**: Baseline reports generated
- **GSC**: Sites added and verified
- **Backlinks**: 0-5 early approvals

### Week 2
- **SEO Inspector**: Track on-page improvements
- **GSC**: 10-15 backlinks appearing
- **Directories**: 50+ submissions completed

### Week 3
- **SEO Inspector**: Monitor technical SEO fixes
- **GSC**: 20-30 backlinks live
- **Rankings**: Small improvements in long-tail keywords

### Month 1
- **SEO Inspector**: Consistent 85+ scores
- **GSC**: 50+ quality backlinks per site
- **Rankings**: Measurable SERP improvements
- **Traffic**: 20-30% organic traffic increase

---

## Troubleshooting

### Google Search Console MCP
**Issue**: API authentication fails
**Fix**: Regenerate API credentials, check scopes

**Issue**: Sites not showing data
**Fix**: Verify site ownership, wait 48-72 hours for data

### SEO Inspector MCP
**Issue**: Cannot connect to website
**Fix**: Check URL format (include https://), test site accessibility

**Issue**: Incorrect analysis results
**Fix**: Re-run analysis, check for JavaScript-heavy pages

---

## Cost Summary

| MCP Server | Installation Cost | API Cost | Monthly Cost |
|------------|-------------------|----------|--------------|
| Google Search Console | FREE | FREE | €0 |
| SEO Inspector | FREE | N/A | €0 |
| Keyphrases (failed) | FREE | N/A | €0 |
| **Total** | **€0** | **€0** | **€0** |

**Comparison to Paid Alternatives**:
- Ahrefs MCP: €99/month ❌
- Semrush MCP: €129/month ❌
- DataForSEO MCP: €50-100/month ❌

**Savings**: €1,500-2,000 per year by using free MCP servers

---

## Documentation Links

- **Google Search Console MCP**: https://github.com/ahonn/mcp-server-gsc
- **SEO Inspector MCP**: https://github.com/mgsrevolver/seo-inspector-mcp
- **Directory Submission Strategy**: `D:\VarnaAI\Websites\claudedocs\DIRECTORY_SUBMISSION_STRATEGY_2025.md`
- **Comprehensive Improvement Report**: `D:\VarnaAI\Websites\COMPREHENSIVE_IMPROVEMENT_REPORT_2025.md`

---

**Created**: January 11, 2025
**Last Updated**: January 11, 2025
**Status**: 2 of 3 servers installed, ready for configuration
