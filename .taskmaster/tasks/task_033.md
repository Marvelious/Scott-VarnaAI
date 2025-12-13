# Task ID: 33

**Title:** Phase 4: Google Posts Weekly Schedule - Create weekly Google Business Profile posts for all 5 brands

**Status:** pending

**Dependencies:** 24 ✓, 25 ✓

**Priority:** low

**Description:** Automate weekly Google Business Profile post creation for all 5 brands with diverse post types (Updates, Offers, Events, Products), including CTA buttons with UTM parameters, keyword optimization, and image integration. Minimum 4 posts per month per brand.

**Details:**

Implement comprehensive weekly Google Business Profile (GBP) posting automation for all 5 VarnaAI portfolio brands (VarnaAI, VarnaAI, AI Projektmanager, Varna Agenten, AI Marketing BG) using Playwright MCP for browser automation.

1. Prerequisites from Task 25 (GBP Setup):
   - Retrieve verified GBP credentials and business profiles for all 5 brands
   - Access GBP dashboards via Playwright MCP automated login
   - Confirm verified status before posting

2. Post Content Generation Strategy:
   - Create 4 post type templates: Updates, Offers, Events, Products
   - Extract SEO keywords from site-specific content (/seo/site-audits/*.md)
   - Generate post descriptions (50-150 characters optimal)
   - Include natural keyword placement in descriptions
   - Create post-specific CTA buttons with UTM parameters
   - UTM structure: utm_source=gbp&utm_medium=post&utm_campaign=weekly_[brand]&utm_content=[post_type]

3. Image Management:
   - Use existing brand images from /assets/images/
   - Fallback to generated images using brand colors
   - Ensure images meet GBP requirements (minimum 800x600px, JPG/PNG)
   - Add text overlays with brand-specific messaging

4. Weekly Posting Automation:
   - Create schedule: Monday, Wednesday, Thursday, Saturday (4 posts/week)
   - Rotate post types: Update → Offer → Event → Product → repeat
   - Time posts for peak engagement (9 AM, 1 PM, 5 PM, 8 PM local time)
   - Randomize scheduling within ±30 minute windows to appear organic

5. Post Type Implementation:
   - Updates: Company news, feature announcements, blog post links
   - Offers: Time-limited promotions, seasonal discounts, bundle deals
   - Events: Webinars, workshops, product launches, training sessions
   - Products: Service highlights, case studies, success metrics

6. Playwright MCP Integration:
   - Authenticate GBP for each brand using stored credentials from CLAUDE.md
   - Navigate to Posts section of GBP dashboard
   - Fill post title, description, CTA button text, and URL
   - Upload image and set alt text with keywords
   - Schedule or publish post
   - Verify posting success and capture confirmation

7. Database/Tracking:
   - Log each posted item with timestamp, brand, post_type, keywords, url
   - Track monthly post count per brand (target: 4+ minimum)
   - Monitor engagement metrics via GBP dashboard
   - Store post templates in /seo/tools/gbp-templates/ for reuse

8. Error Handling:
   - Retry failed posts up to 3 times
   - Log failed posting attempts with error details
   - Send notification if monthly minimum (4 posts) not reached
   - Handle rate limiting gracefully with exponential backoff

**Test Strategy:**

1. Playwright MCP Automation Verification:
   - Test GBP login for each of 5 brands successfully authenticates
   - Verify Playwright can navigate to Posts section and identify post creation button
   - Confirm page load times under 5 seconds

2. Post Content Quality:
   - Verify all 4 post types (Updates, Offers, Events, Products) render correctly
   - Check descriptions are 50-150 characters and include focus keyword naturally
   - Validate CTA button text matches post type (Learn More, Claim Offer, Register, Shop Now)
   - Confirm UTM parameters are correctly appended to URLs

3. Image Processing:
   - Verify images upload successfully to GBP (800x600px minimum)
   - Check alt text includes brand name and keyword
   - Confirm image displays correctly in post preview

4. Weekly Schedule Execution:
   - Run dry-run for 2 weeks and verify 8 posts (4/week) are queued correctly
   - Check scheduling times distribute across Mon/Wed/Thu/Sat
   - Verify time randomization (±30 minute windows) works
   - Confirm timezone handling for all brand locations

5. Post Tracking & Metrics:
   - Verify database logs each post with brand, type, timestamp, keywords, url
   - Check monthly counter reaches 4+ posts per brand minimum
   - Confirm engagement metrics (views, clicks, actions) are captured
   - Validate reporting dashboard shows post history

6. Error Handling:
   - Simulate failed post and verify retry mechanism (3 attempts)
   - Check error logs capture failure details
   - Verify notifications sent when monthly minimum not achieved
   - Test rate limit handling with rapid posting

7. Brand-Specific Validation:
   - Classic Security: Verify security/compliance keywords in posts
   - VarnaAI: Confirm AI/intelligence themed content
   - AI Projektmanager: Check project management terminology
   - Varna Agenten: Verify agent/automation messaging
   - AI Marketing BG: Confirm marketing/growth focus

8. GBP Dashboard Confirmation:
   - Manually verify 1 posted item appears in actual GBP dashboard for each brand
   - Check post visibility and engagement metrics in GBP admin
   - Confirm no duplicate or malformed posts
