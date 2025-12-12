# Task ID: 32

**Title:** Phase 4: Backlink Quality Audit - Analyze and Clean Toxic Backlinks

**Status:** pending

**Dependencies:** 24 ✓, 25 ✓, 27, 28, 29, 30, 31

**Priority:** high

**Description:** Conduct comprehensive backlink quality audit across all 5 portfolio sites using Ahrefs/SEMrush, identify and remove toxic backlinks, verify NAP consistency in automated listings, and maintain healthy anchor text distribution while respecting velocity limits of 20-30 new backlinks per week.

**Details:**

1. Backlink Analysis Setup:
   - Access Ahrefs or SEMrush account and pull complete backlink profiles for all 5 sites (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com)
   - Export backlink reports including: referring domain authority, anchor text, spam score, link type (DoFollow/NoFollow), and link source category
   - Establish baseline metrics: total backlinks, referring domains, toxic link ratio

2. Toxic Backlink Identification:
   - Flag backlinks with Domain Authority < 20 OR Spam Score > 40 as potential toxicity candidates
   - Identify common toxic sources: auto-generated directories, link farms, PBN networks, unrelated niche directories
   - Review automated directory listings (from Task 29, 28) for quality: verify NAP consistency, check for duplicate entries, audit listing quality scores
   - Cross-reference GSC disavow list from Task 31 for previously identified toxic domains

3. NAP Consistency Verification for Automated Listings:
   - For each automated directory submission from Tasks 28 and 29, verify:
     - Business name matches standardized NAP data from Task 24
     - Address displays correctly (no truncation, correct format per country)
     - Phone number formats correctly per regional standards
     - Create audit spreadsheet: Directory Name | Site | NAP Match | Quality Score
   - Flag inconsistencies for manual correction

4. Anchor Text Distribution Analysis:
   - Audit current anchor text distribution across all backlinks:
     - Brand anchors (site name, branded keywords): target 40%
     - Naked URLs: target 20%
     - Generic anchors (click here, learn more): target 20%
     - Keyword-rich anchors: target 20%
   - Identify over-optimized anchor profiles (excessive keyword-rich anchors suggesting unnatural link patterns)
   - Document anchor text distribution per site

5. Backlink Removal and Disavowal:
   - For toxic backlinks: attempt removal through webmaster contact (3-day window per domain)
   - Document removal requests with dates and responses
   - Compile disavow file for Google Search Console (format: domain:// or specific URL per Google spec)
   - Submit disavow files through GSC (Task 31) for all 5 sites

6. Velocity Limit Enforcement:
   - Track new backlinks added per week from Tasks 28, 29, 30 submissions
   - Ensure growth rate: 20-30 new backlinks maximum per week per site
   - Calculate: (Total backlinks this week - Total backlinks last week) ≤ 30
   - Document velocity metrics in weekly monitoring report (prerequisite for Task 31 reporting)

7. Quality Score Documentation:
   - Create per-site backlink profile report including:
     - Total backlinks and referring domains (post-cleanup)
     - Average referring domain authority
     - Toxic backlink count (removed + disavowed)
     - Anchor text distribution percentages
     - Weekly velocity (new backlinks added)
     - NAP consistency score for automated listings

**Test Strategy:**

1. Backlink Profile Verification:
   - Export baseline backlink reports from Ahrefs/SEMrush for all 5 sites
   - Verify reports include minimum 10+ backlinks per site (confirm data completeness)
   - Confirm spam score calculations are visible for each backlink

2. Toxic Backlink Removal Testing:
   - Document at least 3 removal requests sent to toxic domain webmasters
   - Verify removal attempts logged with domain name, contact email, removal request date
   - Re-check Ahrefs/SEMrush after 7 days to confirm removals processed
   - Confirm disavow file uploaded to GSC for each site showing proper format: domain:// or specific URLs

3. NAP Consistency Verification:
   - Audit spreadsheet completed for all automated directory submissions from Tasks 28, 29
   - Minimum 80% of automated listings should show NAP match (name, address, phone match exactly)
   - Flag any sites with < 80% consistency for manual correction
   - Verify no duplicate listings exist for same site in same directory

4. Anchor Text Distribution Validation:
   - Current anchor text distribution report generated showing percentages by category
   - Verify: Brand anchors 38-42%, Naked URLs 18-22%, Generic 18-22%, Keyword 18-22% (±2% tolerance)
   - Document over-optimized profiles if any site exceeds keyword anchor ratio of 25%
   - Anchor text report shows individual anchor variations for top 20 backlinks

5. Velocity Limit Compliance:
   - Weekly tracking sheet created with columns: Week | Site | New Backlinks | Velocity Status
   - Verify each site shows ≤ 30 new backlinks per week
   - Confirm velocity calculated by comparing week-over-week backlink count from Ahrefs/SEMrush
   - All 5 sites within velocity limits for current and previous 4 weeks

6. Final Quality Report:
   - Comprehensive backlink audit report generated including:
     - Per-site backlink profiles (total count, referring domains, authority distribution)
     - Toxic backlinks removed (count, domains)
     - NAP consistency score for automated listings (%) 
     - Anchor text distribution percentages (all 4 categories)
     - Weekly velocity metrics (backlinks added per week, all within 20-30 limit)
     - GSC disavow file status (uploaded confirmation)
   - Report shows no toxic backlinks remaining (spam score < 40, DA > 20)
   - All automated directory NAP data matches standardized data from Task 24
