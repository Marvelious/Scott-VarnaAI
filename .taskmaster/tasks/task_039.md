# Task ID: 39

**Title:** SEO Agent - AI Content Generation from Audits with WordPress Auto-Publish and Backlink Analysis

**Status:** pending

**Dependencies:** 3 ✓, 4 ✓, 8 ✓, 22 ✓, 23 ✓, 26, 32

**Priority:** high

**Description:** Implement AI-powered content generation from SEO audits with automated WordPress publishing across 5 portfolio sites and integrate competitor backlink analysis capabilities into the SEO Agent application.

**Details:**

1. Analyze existing SEO Agent codebase (D:\VarnaAI\seoagent) to understand current architecture, AI provider integrations (OpenAI, Anthropic, Ollama, LM Studio), and database schema.

2. Implement AI Content Generation Engine:
   - Create content generation prompts based on SEO audit findings (keywords, gaps, competitor analysis)
   - Support multiple content types: blog posts (800-1200 words), landing pages (600-800 words), social media content (50-280 chars), email campaigns (3-5 sections)
   - Generate SEO-optimized content with: focus keyword placement (paragraph 2/3 start, H2 heading, 5-7 mentions), external authority links (BSI, BfDI, EU resources for German sites), internal linking suggestions
   - Implement content quality scoring (readability, keyword density, link optimization)
   - Support multi-language generation (English, German, Bulgarian)

3. WordPress Auto-Publish Integration:
   - Create WordPress REST API client for all 5 sites (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com)
   - Use stored WordPress credentials from CLAUDE.md (sites, usernames, passwords)
   - Implement page creation workflow: Create draft → Set SEO metadata (title, description, focus keyword) → Publish as draft → Return edit URL for Kadence block design addition
   - Add image placeholder integration with alt text generation
   - Implement scheduling for content publication (immediate, scheduled, draft-only modes)
   - Add content approval workflow: AI-generated → User review → Publish/Edit

4. Competitor Backlink Analysis:
   - Integrate Ahrefs/SEMrush API or web scraping for competitor analysis
   - Analyze competitor backlink profiles for: referring domains, anchor text patterns, link types (DoFollow/NoFollow), authority scores
   - Identify backlink opportunities: low-competition keywords, high-authority sources, industry-relevant linking sites
   - Generate backlink strategy recommendations with: top 10 most achievable backlink sources, anchor text suggestions (brand, keyword variation, natural), outreach email templates
   - Track backlink velocity limits (20-30 new per week per site)
   - Create competitor comparison reports (backlink count, referring domains, authority distribution)

5. Integration with Existing Features:
   - Connect to SEO audit results to generate targeted content addressing identified gaps
   - Link content generation to internal link optimization (suggest 2-3 internal links per page)
   - Integrate with existing AI assistants (reuse provider configurations)
   - Add to quick actions panel for one-click bulk generation

6. Database Schema Updates:
   - Add tables for: generated_content (id, site_id, content_type, title, body, seo_metadata, status, generated_at), backlink_analysis (id, site_id, competitor_url, referring_domain, anchor_text, authority, link_type, opportunity_score), backlink_outreach (id, site_id, target_domain, outreach_template, status, sent_date)
   - Track content generation history and performance metrics

7. Frontend UI Components:
   - Content generation interface: Select audit → Choose content type → Set parameters (tone, length, keywords) → Generate → Preview → Publish
   - Backlink analysis dashboard: Competitor analysis, opportunity scoring, velocity tracking, outreach templates
   - Content management: View generated content, edit before publishing, schedule publication, track performance

8. Error Handling & Safety:
   - Implement WordPress API error handling and retry logic
   - Add content quality validation before auto-publish (minimum word count, keyword density checks, link requirements)
   - Create audit logs for all generated content and WordPress changes
   - Implement rollback capability for published content if issues detected

**Test Strategy:**

1. SEO Agent Application Tests:
   - Verify content generation works with all 4 AI providers (OpenAI, Anthropic, Ollama, LM Studio)
   - Test content quality metrics: keyword density 1-2%, external links present, internal link suggestions generated
   - Test multi-language content generation (German, English, Bulgarian)

2. WordPress Integration Tests:
   - Test WordPress login with all 5 site credentials (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com)
   - Create test pages on WordPress sandbox/staging (NOT production) and verify:
     * Page created in drafts with correct title and content
     * SEO metadata (focus keyword, description) set correctly in Rank Math
     * Edit URL returned for design block addition
     * Images/placeholders included with alt text
   - Test content approval workflow: Generate → Review → Publish
   - Verify page persistence (check pages appear in WordPress admin)

3. Backlink Analysis Tests:
   - Pull competitor backlink data and verify data quality (minimum 10+ backlinks found)
   - Test anchor text analysis and variation detection
   - Verify opportunity scoring algorithm produces actionable results
   - Test outreach template generation (email tone, call-to-action)
   - Validate backlink velocity tracking (20-30 per week limits)

4. Integration Tests:
   - Generate content from actual SEO audit → Publish to WordPress → Verify in live site
   - Test internal link suggestions point to valid pages
   - Verify bulk generation for multiple pages
   - Test quick actions panel: One-click batch content generation

5. Database Tests:
   - Verify generated_content table stores all metadata correctly
   - Verify backlink_analysis records link characteristics accurately
   - Test queries for: content history, backlink opportunities, velocity tracking

6. Performance Tests:
   - Measure content generation latency (<30 seconds per page)
   - Verify WordPress API calls complete within <5 seconds
   - Test bulk operations don't timeout (10+ pages)

7. User Acceptance Tests:
   - Generate 5 sample pages across different sites
   - Have Big Dick review generated content quality and SEO optimization
   - Verify published pages achieve 70-80+/100 Rank Math score immediately
   - Test backlink analysis produces actionable recommendations
