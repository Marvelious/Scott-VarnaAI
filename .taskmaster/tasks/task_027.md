# Task ID: 27

**Title:** Phase 2: WordPress SEO Configuration - Rank Math Setup Across All 5 Sites

**Status:** pending

**Dependencies:** 22 ✓, 23 ✓, 24 ✓, 25 ✓, 26

**Priority:** high

**Description:** Configure Rank Math SEO plugin across all 5 WordPress sites with focus keywords, meta titles/descriptions, Open Graph settings, and XML sitemaps. Achieve minimum SEO score of 70/100 on all pages using Playwright MCP for automated WordPress admin interaction.

**Details:**

1. Prerequisites and Site Access:
   - Access WordPress admin panels using credentials from CLAUDE.md (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com)
   - Verify Rank Math plugin is installed and activated on all 5 sites
   - Verify all pages from Phase 1 content creation (Tasks 22-26) are published

2. Rank Math Global Configuration (per site):
   - Navigate to Rank Math Settings → General Settings
   - Set site tagline/description for home page
   - Configure XML sitemap settings: Enable sitemaps, set update frequency to weekly
   - Configure Open Graph: Enable for all post types, set default image
   - Set up Knowledge Graph: Organization type, logo URL, social profiles
   - Configure breadcrumbs for site navigation
   - Enable automatic rich snippets (FAQ, Howto, Article)

3. Focus Keyword and Meta Configuration (per page):
   - For each published page from Tasks 22-26, open Rank Math panel in editor
   - Set focus keyword: Use primary keyword from content plan (examples: "IT-Sicherheit Projektmanagement", "DSGVO-konform", "AI Marketing", "Zero-Click Search")
   - Auto-generate or customize SEO Title (60 chars max): Include focus keyword + power word + number if available
   - Auto-generate or customize meta description (160 chars max): Include focus keyword, benefit statement, CTA
   - Set URL slug (if not already set): Lowercase, kebab-case, include keyword when possible
   - Verify Open Graph title and description are set
   - Set featured image for Open Graph display

4. Content Optimization Review:
   - For each page, check Rank Math score in editor:
     * Word count: Verify 600+ words (from content in Tasks 22-26)
     * Keyword density: Target 1% (focus keyword appears 7-8 times in 600-word content)
     * Keyword placement: Verify focus keyword at start of second paragraph
     * Headings: Confirm focus keyword in at least one H2/H3 heading
     * Links: Verify 1-2 external DoFollow links + 2-3 internal links
   - Apply Rank Math suggestions to reach 70+/100 score
   - Common fixes: Expand content if <600 words, add missing internal links, verify keyword distribution

5. XML Sitemap and Robots Configuration:
   - Rank Math Settings → Sitemaps: Enable, set update frequency
   - Verify /sitemap.xml is accessible and valid (use online XML validator)
   - Verify robots.txt is configured correctly: Disallow none, Allow all
   - Submit sitemaps to Google Search Console (via task verification step)

6. Open Graph and Social Configuration:
   - Rank Math Settings → Open Graph: Verify all fields are populated
   - Test Open Graph preview (use Facebook Sharing Debugger tool)
   - Verify Twitter Card settings (if applicable)
   - Check featured images display correctly in social previews

7. Local SEO Settings (for German sites: ai-projektmanager.de, varna-agenten.de):
   - Set up local business schema if applicable
   - Configure service area (Germany, EU, etc.)
   - Link to Google Business Profile (if created in Task 25)

8. Multi-Language Configuration (if applicable):
   - For aimarketingbg.com: Configure language settings in Rank Math
   - Set hreflang tags for language variants (English/Bulgarian)
   - Verify language switcher is SEO-optimized

9. Final Verification:
   - Run Rank Math SEO audit for entire site: Rank Math → Tools → Site Audit
   - Review audit report and fix critical issues
   - Verify no redirect chains or broken links detected
   - Check for duplicate content issues

**Test Strategy:**

1. Site Access Verification:
   - Successfully log into WordPress admin for all 5 sites using stored credentials
   - Confirm Rank Math plugin is active (visible in Rank Math menu)
   - Verify all pages from Tasks 22-26 are in Published status

2. Global Configuration Testing:
   - Navigate to Rank Math Settings on each site
   - Verify XML sitemap is generated and accessible at /sitemap.xml (HTTP 200 response)
   - Test sitemap validity using XML validator (no syntax errors)
   - Confirm Open Graph settings are populated in page source code (inspect og:title, og:description, og:image meta tags)
   - Verify Knowledge Graph configuration is present

3. Per-Page SEO Score Verification:
   - For each published page, open in WordPress editor
   - Check Rank Math panel shows SEO score ≥ 70/100
   - Document final score for all pages in test report
   - Target: 100% of pages ≥ 70/100 score
   - Take Playwright screenshots of Rank Math panel for each page showing score

4. Content Validation:
   - Verify word count ≥ 600 words for each page (Rank Math shows word count)
   - Confirm focus keyword appears 7-8 times (approximately 1% density)
   - Check keyword appears in first 100 words of content
   - Verify at least one H2/H3 heading contains focus keyword

5. Link Validation:
   - Extract all links from each page
   - Verify 1-2 external DoFollow links (BSI, BfDI, official sources for German sites)
   - Verify 2-3 internal links to other portfolio pages
   - Test all links are valid (no 404 errors)
   - Use browser DevTools to confirm link rel="dofollow" (no nofollow)

6. Meta Data Testing:
   - For each page, view page source (Ctrl+U) and search for meta tags
   - Verify meta description is present and 150-160 characters
   - Verify og:title, og:description, og:image are present
   - Verify title tag is 50-60 characters and includes focus keyword

7. Social Media Preview Testing:
   - Use Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/sharing/) for each page URL
   - Verify Open Graph preview displays correctly:
     * Image displays without errors
     * Title matches SEO title
     * Description matches meta description
   - Use Twitter Card Validator for twitter:card tags (if applicable)

8. Sitemap and Search Engine Submission:
   - Visit /sitemap.xml on each site (verify HTTP 200, valid XML)
   - Count entries: Verify sitemap includes all published pages
   - Submit sitemaps to Google Search Console (if GBP setup from Task 25 provides GSC access)
   - Verify robots.txt allows crawling: /robots.txt shows "Allow: /"

9. SEO Audit Report:
   - Run Rank Math Site Audit (Rank Math → Tools → Site Audit)
   - Verify "Issues" count is minimal (0-5 critical issues acceptable)
   - Check no duplicate content detected
   - Verify no broken internal links
   - Confirm all redirects are correct (no chains)

10. Final Score Reporting:
   - Create summary table showing per-page SEO scores
   - Format: Site | Page | URL | Focus Keyword | SEO Score | Status
   - Example: ai-projektmanager.de | IT-Sicherheit | /anwendungsfaelle/it-sicherheit | IT-Sicherheit Projektmanagement | 86/100 | ✅ PASS
   - Success criteria: All pages show ≥ 70/100, all meta data configured, all links verified
