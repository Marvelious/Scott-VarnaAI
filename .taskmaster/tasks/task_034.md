# Task ID: 34

**Title:** Phase 4: Google Posts Weekly Schedule - Implement automated GBP post creation system

**Status:** pending

**Dependencies:** 24 ✓, 25 ✓

**Priority:** low

**Description:** Build automated weekly Google Business Profile posting system for all 5 brands with post type variety (Updates, Offers, Events, Products), CTA buttons with UTM parameters, keyword optimization, and image integration using Playwright MCP. Target: minimum 4 posts per month per brand.

**Details:**

Implement comprehensive automated Google Business Profile (GBP) posting system for all 5 VarnaAI portfolio brands (Classic Security, VarnaAI, AI Projektmanager, Varna Agenten, AI Marketing BG) using Playwright MCP for browser automation.

1. Prerequisites from Task 25 (GBP Setup):
   - Retrieve verified GBP credentials and authenticated session tokens from secure credential storage
   - Access GBP dashboards for all 5 brands via Playwright MCP automated login
   - Confirm verified status and posting permissions before creating content

2. Post Content Generation Strategy:
   - Create content templates for 4 post types:
     * Updates: News, feature announcements, service changes (50-100 words)
     * Offers: Limited-time promotions, discounts, bundles (60-80 words)
     * Events: Webinars, training sessions, consultations (70-90 words)
     * Products: Service highlights, case studies, achievements (80-100 words)
   - Implement keyword rotation system using focus keywords from /seo/nap-data/ per brand
   - Generate unique variations to prevent duplicate posting across weeks

3. CTA Button Implementation:
   - Generate UTM parameters: utm_source=gbp, utm_medium=post, utm_campaign=[brand]_[month], utm_content=[post_type]
   - CTA button configurations per post type:
     * Updates: "Learn More" → website homepage or relevant landing page
     * Offers: "Claim Offer" → promotional landing page with tracking
     * Events: "Register Now" → event sign-up page
     * Products: "View Case Study" or "Get Demo" → product/service page
   - Store URL mappings in config file for centralized management

4. Image Integration:
   - Retrieve prepared images from /assets/images/ (prepared in Task 24)
   - Images should be 1200x628px (GBP optimal size) for visual consistency
   - Use Playwright to upload images to GBP post creation form
   - Implement fallback to brand logo if specific post image unavailable

5. Playwright MCP Automation Workflow:
   - Create reusable Playwright script for GBP post creation:
     * Navigate to GBP dashboard: https://business.google.com/
     * Login with credentials from secure storage
     * Select business profile from dropdown
     * Click "Posts" section
     * Click "Create post" button
     * Select post type from dropdown (Update/Offer/Event/Product)
     * Fill title field with generated content
     * Paste description text with keyword optimization
     * Upload image via file input
     * Add CTA button with UTM-encoded URL
     * Click "Schedule" or "Post Now"
     * Confirm post creation and capture post ID
   - Implement error handling for rate limiting, session timeouts, network failures
   - Add retry logic with exponential backoff

6. Scheduling System:
   - Create weekly schedule JSON: /seo/gbp-schedule/schedule.json
   - Structure: {"brands": [{"name": "...", "posts": [{"type": "update", "day": "Monday", "time": "09:00"}]}]}
   - Post distribution: 1 Update (Monday), 1 Offer (Wednesday), 1 Event/Product (Friday)
   - Timezone consideration: Post at 9:00 AM local time for each brand's primary market
   - Implement cron job or scheduler (BullMQ recommended based on existing stack) to trigger posting

7. Content Generation Engine:
   - Create Python/Node.js script to generate monthly content:
     * Input: Brand keywords from NAP data, seasonal themes, promotional calendar
     * Output: 4 JSON objects per brand containing title, description, post_type, cta_url
     * Store generated content in /seo/gbp-content/[brand]/posts-[month].json
     * Implement AI content generation (Claude API or Ollama) if available, with manual review

8. Monitoring and Analytics:
   - Capture post IDs after creation for tracking
   - Store post metadata: created_timestamp, brand, type, cta_url, engagement_metrics
   - Implement weekly report generation showing:
     * Posts created per brand (target: ≥4/month)
     * CTA click-through rates via UTM parameter tracking
     * Engagement metrics (impressions, clicks, actions) from GBP dashboard
   - Generate monthly performance report at /seo/gbp-analytics/monthly-report-[month].json

9. File Structure:
   - /seo/gbp-schedule/schedule.json → Weekly posting schedule
   - /seo/gbp-content/[brand]/posts-[month].json → Generated post content
   - /seo/gbp-credentials/credentials.json → Encrypted GBP login credentials (read from secure storage)
   - /seo/gbp-analytics/monthly-report-[month].json → Performance metrics
   - scripts/gbp-poster.js → Playwright automation script
   - scripts/gbp-content-generator.js → Content generation engine

**Test Strategy:**

1. Playwright MCP Automation Verification:
   - Test GBP login for each of 5 brands successfully authenticates and loads dashboard
   - Verify Playwright can navigate to Posts section and identify post creation button
   - Confirm page load times under 5 seconds for each brand profile
   - Test image upload functionality with sample 1200x628px images
   - Verify CTA button form accepts UTM-encoded URLs without truncation

2. Post Content Quality:
   - Verify all 4 post types (Update, Offer, Event, Product) generate with appropriate word counts
   - Confirm focus keywords appear naturally in post descriptions (density check)
   - Validate CTA buttons contain correct UTM parameters for tracking
   - Check that images upload and display correctly in post preview
   - Verify no duplicate content across weekly posts (randomization working)

3. Scheduling and Automation:
   - Confirm schedule.json parses correctly and contains all 5 brands
   - Test that scheduler triggers post creation on correct days/times
   - Verify retry logic handles network failures and session timeouts
   - Validate posts are created at correct local time for each brand's market
   - Confirm minimum 4 posts per brand per month requirement met

4. Content Generation:
   - Verify generated content files contain all required fields (title, description, type, cta_url)
   - Check that keyword variations prevent duplicate messaging
   - Validate CTA URLs match brand's website structure and landing pages
   - Confirm content generator runs without errors for all 5 brands

5. Post Creation End-to-End:
   - Manually verify at least 1 post per brand successfully created in GBP dashboard
   - Check posted content appears in GBP feed within 5 minutes
   - Verify post metadata matches generated content (title, description, image, CTA)
   - Test CTA button functionality by clicking and confirming UTM parameters in Google Analytics
   - Confirm post ID captured and stored for analytics tracking

6. Analytics and Reporting:
   - Verify monthly report file generates with correct timestamp
   - Check report contains metrics for all 5 brands and post types
   - Validate UTM parameter tracking shows in Google Analytics
   - Confirm CTA click-through rates visible in GBP dashboard analytics
   - Test report accuracy against manual GBP dashboard count verification

7. Error Handling:
   - Test behavior when GBP login fails (credentials invalid)
   - Verify graceful handling of network timeouts during post creation
   - Confirm retry logic doesn't create duplicate posts on re-attempt
   - Test rate limiting detection and backoff implementation
   - Validate error logs capture sufficient detail for debugging

8. Compliance Check:
   - Verify all posts follow GBP content guidelines (no prohibited content)
   - Confirm images don't contain copyright violations
   - Check CTA buttons don't link to malicious or broken URLs
   - Validate no personal information exposed in post content or metadata
