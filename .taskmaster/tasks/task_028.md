# Task ID: 28

**Title:** Phase 3: German/DACH Directory Submissions - Automated Form Filing and Verification

**Status:** pending

**Dependencies:** 24 ✓, 25 ✓, 27

**Priority:** high

**Description:** Submit ai-projektmanager.de and varna-agenten.de to 8 Tier 1 German directories (Google Business Profile, Das Örtliche, Gelbe Seiten, 11880.com, GoYellow, YellowMap, Yelp Germany, Hotfrog Germany) using Playwright MCP for automated form submission with manual approval verification.

**Details:**

Implement automated directory submission workflow for ai-projektmanager.de and varna-agenten.de across 8 German/DACH directories using Playwright MCP browser automation.

1. Prerequisites and Data Preparation:
   - Retrieve standardized NAP data from Task 24 outputs (/seo/nap-data/data.json files)
   - Prepare business descriptions (50, 100, 250 word variants from Task 24)
   - Retrieve logos in PNG/JPG/SVG formats from Task 24 assets
   - Document directory-specific requirements (category codes, service area formats, verification methods)

2. Directory-Specific Submission Automation:
   - Google Business Profile: Navigate to GBP dashboard (should already exist from Task 25), verify and enhance listing
   - Das Örtliche (Germany): Automate business registration form with NAP data, category selection ("IT-Sicherheit", "Projektmanagement")
   - Gelbe Seiten (Germany): Submit business entry with premium listing options, service area configuration
   - 11880.com (Germany): Automate registration with category mapping, contact form setup
   - GoYellow (Germany): Submit business profile with service descriptions, opening hours
   - YellowMap (Germany): Register business with map location, category tags
   - Yelp Germany: Submit business profile (may require additional verification beyond submission)
   - Hotfrog Germany: Register business entry with detailed business description

3. Playwright MCP Implementation:
   - Create browser automation scripts for each directory's submission workflow
   - Handle dynamic form validation (required fields, format requirements, captchas)
   - Implement screenshot capture at submission confirmation pages
   - Store submission confirmation URLs and reference numbers
   - Handle account creation flows where required (email verification)
   - Log all submissions with timestamp, directory name, confirmation status

4. Manual Verification Workflow:
   - After automated submission, generate verification checklist per directory
   - Document which listings require email/SMS verification from business owners
   - Note any listings requiring additional admin approval steps
   - Track pending approval status for each directory
   - Create follow-up schedule for approvals (typically 3-7 days)

5. Documentation and Tracking:
   - Create submission report documenting all 8 directories, submission dates, reference numbers
   - Maintain status tracker: Pending, Submitted, Email Verification Sent, Approved, Live
   - Document any directory-specific requirements discovered during submission
   - Store directory login credentials securely (for future updates)

6. Technical Considerations:
   - Some directories may implement bot detection - use realistic delays between interactions
   - Handle cookie/session management for multi-page forms
   - Implement error handling and retry logic for network timeouts
   - Capture and log any error messages for troubleshooting
   - Respect directory robots.txt and terms of service
   - Consider rate limiting to avoid IP blocking

7. File Organization:
   - Create /seo/directory-submissions/ with subdirectories per directory
   - Store submission scripts in /seo/directory-submissions/scripts/
   - Log submission results to /seo/directory-submissions/results.json
   - Document verification steps in /seo/directory-submissions/verification-checklist.md

**Test Strategy:**

1. Submission Verification (per directory, per site):
   - For each of 8 directories × 2 sites = 16 submission tests:
   - Verify automated form completion: all NAP fields populated correctly
   - Confirm submission page reached and confirmation message displayed
   - Capture screenshot of confirmation page showing reference number/submission ID
   - Verify confirmation email received (if email verification required)

2. Listing Visibility Verification (after approval, 7-10 days post-submission):
   - Search each directory directly by business name to confirm listing appears
   - Verify NAP data matches standardized data from Task 24 (no typos or inconsistencies)
   - Confirm correct categories selected ("IT-Sicherheit", "Projektmanagement", etc.)
   - Verify service descriptions display correctly with proper formatting
   - Check that logo displays (where applicable per directory)
   - Validate all links (website URL, email, phone) are clickable and functional

3. Approval Status Tracking:
   - For each directory, confirm approval status in directory admin (if accessible)
   - Track email verification completion (mark as "Verified" once confirmed)
   - Document any directories requiring additional admin approval
   - Create final status report: 8+ directory listings live per site (16+ total)

4. Acceptance Criteria:
   - ai-projektmanager.de: 8+ directory listings live with verified NAP data
   - varna-agenten.de: 8+ directory listings live with verified NAP data
   - Total: 16+ directory listings across both sites
   - All listings publicly searchable by business name
   - All NAP data matches standardized format from Task 24
   - All submission confirmations and approval documentation archived

5. Cross-Directory Consistency Check:
   - Compare NAP data across all 8 directories to ensure consistency
   - Verify no conflicting information (duplicate listings, outdated phone numbers)
   - Document any discrepancies found and correction steps taken

6. Search Engine Visibility:
   - After 14+ days from approval, verify directories appear in Google Search results
   - Check Google Search Console for directory listings in indexation reports
   - Confirm directory backlinks appear in Ahrefs or similar SEO tool
