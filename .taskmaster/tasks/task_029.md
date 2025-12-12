# Task ID: 29

**Title:** Phase 3: International Directory Submissions - Automated Multi-Site Submission

**Status:** pending

**Dependencies:** 24 ✓, 25 ✓

**Priority:** medium

**Description:** Submit varnaai.com, aimarketingbg.com, and classicsecurity.net to 500+ international business directories using automated submission tools (GetMoreBacklinks.org or ListingBott) with manual verification, targeting 100+ directory listings per site.

**Details:**

Implement automated international directory submission workflow for 3 portfolio sites (varnaai.com, aimarketingbg.com, classicsecurity.net) using directory automation platforms.

1. Prerequisites and Preparation:
   - Retrieve standardized NAP data from Task 24 outputs (/seo/nap-data/data.json files for all 5 sites, filter for the 3 international sites)
   - Prepare business descriptions (50, 100, 250 word variants from Task 24)
   - Retrieve logos in PNG/JPG/SVG formats from Task 24 assets
   - Document directory-specific requirements (categories, services, keywords)
   - Compile Google Business Profile URLs from Task 25 for cross-referencing

2. Directory Automation Tool Setup:
   - Choose automation platform: GetMoreBacklinks.org (360+ directories, verified submissions) OR ListingBott (500+ directories, API-driven)
   - Create accounts on selected platform(s)
   - Configure API keys or authentication credentials
   - Upload NAP data templates and business descriptions
   - Configure logo upload batches

3. Batch Submission Configuration:
   - For each of 3 international sites:
     - Create submission profile with standardized NAP data
     - Select target directory categories (Business Services, IT Services, Security, AI/Technology)
     - Set keyword targeting (site-specific keywords from SEO audit)
     - Configure description variants (50-word for directories with limits, 100-250 word for premium listings)
     - Queue 150-200 directories per site (aiming for 100+ confirmed listings)

4. Automated Submission Execution:
   - Launch batch submissions across selected directories
   - Monitor submission progress via tool dashboard
   - Log submission confirmations and any rejections
   - Track response codes and error messages
   - Document submission timeline (expect 2-4 weeks for full completion)

5. Manual Verification Process:
   - For each submitted directory:
     - Verify NAP data accuracy (name, address, phone match Task 24 standards)
     - Confirm business information matches Google Business Profile from Task 25
     - Check logo display and quality
     - Verify category assignments are appropriate
     - Test clickthrough to website
     - Capture verification screenshots
   - Create verification checklist: minimum 100 unique directories per site
   - Document any correction requests or resubmissions needed

6. Tracking and Documentation:
   - Create /seo/directory-submissions/ directory for tracking
   - Log all submissions: directory name, URL, submission date, status, NAP accuracy, verification date
   - Generate per-site submission report showing:
     - Total directories submitted to
     - Confirmed active listings
     - Pending verification
     - Rejected (with reasons)
     - Response metrics
   - Track backlink generation from directory listings using Ahrefs/Semrush

**Test Strategy:**

1. Automation Tool Configuration Verification:
   - Confirm account setup on chosen platform (GetMoreBacklinks.org or ListingBott)
   - Verify API key authentication working
   - Test file upload functionality with sample NAP data and logo
   - Confirm directory category taxonomy is accessible

2. Batch Submission Testing:
   - For each of 3 sites, verify:
     - NAP data correctly populated in submission profiles
     - Business descriptions match Task 24 variants
     - Logo files upload without errors
     - Keyword targeting is relevant to site vertical (varnaai.com = AI services, aimarketingbg.com = marketing AI, classicsecurity.net = security)
     - Directory count shows 150+ queued submissions per site

3. Manual Verification Spot-Check (minimum 30 directories per site):
   - Random sample of 10+ directories per site after 2-week submission window
   - For each verified directory:
     - Navigate to directory listing URL
     - Confirm business name matches NAP data from Task 24
     - Verify address and phone number accuracy
     - Check logo displays correctly
     - Confirm category assignments are appropriate
     - Test website clickthrough works
     - Capture screenshot showing listing details
   - Document any missing or incorrect information

4. Submission Report Validation:
   - Verify tracking file contains all submission attempts
   - Confirm minimum 100 confirmed listings per site
   - Check accuracy of status classifications (confirmed, pending, rejected)
   - Validate that rejection reasons are documented
   - Ensure submission timeline is captured

5. Quality Metrics:
   - Count total unique directories per site
   - Verify NAP consistency across all verified listings
   - Check for citation patterns across directories
   - Estimate potential backlink volume from submissions
   - Compare submission success rates across the 3 sites
