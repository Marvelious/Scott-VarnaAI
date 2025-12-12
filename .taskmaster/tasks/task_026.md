# Task ID: 26

**Title:** Phase 2: Internal Linking Optimization - Hub-and-Spoke Model Implementation

**Status:** pending

**Dependencies:** 22 ✓, 23 ✓, 24 ✓, 25 ✓

**Priority:** medium

**Description:** Implement strategic internal linking across all 5 portfolio sites using a hub-and-spoke model with 5-10 links per 2000 words, ensuring 3-click maximum depth and varied contextual anchor text for improved navigation and SEO.

**Details:**

1. Analyze current site structure across all 5 domains (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com) to identify hub pages (homepages, service index pages) and spoke pages (individual service/use case pages).

2. Map internal link opportunities:
   - Identify hub pages that should receive links from 3-5 spoke pages minimum
   - Map spoke-to-spoke contextual linking opportunities within topic clusters
   - Ensure every page is reachable within maximum 3 clicks from homepage
   - Document current link depth analysis per site

3. Create internal linking patterns using Morphllm MCP:
   - Pattern 1: Hub linking (footer/navigation patterns that repeat across similar pages)
   - Pattern 2: Related content links (contextual within body paragraphs)
   - Pattern 3: Cross-site portfolio links (connecting sister sites via VarnaAI Network footer)

4. Implement contextual linking in body content using native Claude:
   - Review each page's focus keyword and related topics
   - Identify 2-3 natural linking opportunities per 600-word page
   - Use varied anchor text: focus keywords, long-tail keywords, branded terms, generic descriptors
   - Maintain 1-2% keyword density with varied anchor text distribution
   - Example: 'DSGVO-konform Projektmanagement' page links to 'Compliance Management', 'Enterprise Deployment', and 'IT-Sicherheit' pages

5. Link distribution targets:
   - Pages 400-600 words: 2-3 internal links minimum
   - Pages 600-800 words: 3-5 internal links
   - Pages 800-1000 words: 5-7 internal links
   - Pages 1000+ words: 7-10 internal links

6. Anchor text variation strategy:
   - 30% exact match or close variant (e.g., 'IT-Sicherheit Projektmanagement' for IT-Sicherheit page)
   - 30% partial matches or long-tail variations (e.g., 'Security project management solutions')
   - 20% branded/generic terms (e.g., 'learn more', 'AI Projektmanager platform')
   - 20% navigation terms (e.g., 'see related services', 'explore enterprise options')

7. Verification checklist per site:
   - All pages linked from at least 1 other page
   - No page deeper than 3 clicks from homepage
   - Link distribution within specified targets
   - Anchor text natural and contextual (not over-optimized)
   - External footer links to sister sites functional
   - Rank Math SEO scores reflect improved internal linking (80+/100)

8. Technical implementation:
   - Use Morphllm for bulk footer/navigation link patterns across similar page templates
   - Use Native Claude for contextual body paragraph linking requiring semantic understanding
   - Preserve existing design and layout (no modification to Kadence blocks)
   - Update pages via WordPress editor, saving frequently to prevent data loss

**Test Strategy:**

1. Site Structure Verification (per site):
   - Map site hierarchy by visiting /sitemap.xml or WordPress admin → Pages
   - Create visual diagram showing hub pages (homepage, services index) and spoke pages
   - Document current link depth of each page

2. 3-Click Rule Validation:
   - From each site's homepage, follow longest path to deepest page
   - Verify maximum click depth is 3 or less
   - Use browser dev tools to trace navigation paths
   - Test both main navigation and internal content links

3. Link Distribution Audit:
   - Count internal links on 5-10 sample pages per site
   - Verify link counts match word count targets (2-3 for 400-600 words, etc.)
   - Document page word count and link count in spreadsheet
   - Flag pages with insufficient/excessive links

4. Anchor Text Analysis:
   - Extract all internal link anchor text using regex or Grep
   - Categorize by type: exact match, partial match, branded, generic
   - Verify distribution matches 30/30/20/20 targets (±10%)
   - Check for over-optimization or keyword stuffing

5. Contextual Link Quality:
   - Read 3-5 contextual links per page and verify semantic relevance
   - Confirm links flow naturally within paragraph content
   - Verify linked page addresses mentioned topic/keyword
   - Take screenshots of 3-5 well-implemented contextual links as evidence

6. Functionality Testing:
   - Click all internal links on 10 sample pages
   - Verify each link navigates to correct destination page
   - Test on desktop, tablet, and mobile viewports
   - Confirm no broken links (404 errors)

7. Footer Cross-Links Verification:
   - Verify 'Part of VarnaAI Network' footer appears on all 5 sites
   - Click all 5 sister site links from each site
   - Confirm links point to correct external domains
   - Test on 3-5 different pages per site

8. Rank Math SEO Score Verification:
   - Check Rank Math SEO panel on updated pages
   - Verify internal link recommendations satisfied (80+/100 score)
   - Document SEO score improvements for 10 sample pages
   - Compare scores before/after linking optimization

9. Crawl Simulation:
   - Use free SEO tools (Screaming Frog, Ahrefs free tier, or Rank Math) to crawl each site
   - Verify no orphaned pages (unreachable from navigation)
   - Confirm internal link topology matches hub-and-spoke model
   - Generate site structure report showing link connections

10. Final Sign-Off:
   - Document all 5 sites pass 3-click rule test
   - Confirm link distribution within targets for 100% of pages
   - Verify anchor text variety audit passes
   - Collect before/after Rank Math scores
   - Verify footer cross-links functional across all 5 domains
