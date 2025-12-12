# Task ID: 31

**Title:** Phase 4: Backlink Monitoring Setup - Configure Google Search Console and Weekly Reporting

**Status:** pending

**Dependencies:** 27, 28, 30

**Priority:** medium

**Description:** Configure Google Search Console (GSC) for all 5 portfolio sites, set up weekly automated backlink monitoring, and create reports tracking organic traffic growth, keyword ranking improvements, and backlink quality scores using GSC API integration.

**Details:**

1. Google Search Console Configuration (per site):
   - Log into GSC for each of 5 sites: ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com
   - Verify site ownership (DNS record or HTML file method)
   - Configure property settings: preferred domain, crawl rate, sitemaps
   - Enable backlinks report under Links → External Links
   - Set up coverage monitoring under Coverage tab
   - Enable Core Web Vitals monitoring

2. Google Search Console API Setup:
   - Create Google Cloud project for GSC API access
   - Enable Google Search Console API and Webmasters API
   - Generate service account credentials (JSON key file)
   - Store credentials securely in environment variables
   - Install Google API client library (google-auth, google-api-python-client)
   - Set up authentication with stored service account credentials

3. Backlink Monitoring Implementation:
   - Query GSC API for new backlinks: GET /sites/{siteUrl}/searchanalytics/query
   - Filter for new referring domains acquired in past week
   - Calculate domain authority metrics (using Ahrefs/Moz data if integrated, or GSC metrics)
   - Track backlink quality scores: domain authority, relevance, spam score
   - Monitor directory approval rates from Task 28 submissions (Tier 1 German directories)
   - Create backlink quality classification: premium (DA>50), good (DA 30-50), standard (DA<30)

4. Organic Metrics Tracking:
   - Query GSC API for organic search performance: impressions, clicks, CTR, average position
   - Track keyword ranking data: top 20 keywords by impressions, position changes week-over-week
   - Monitor organic traffic changes from Google Analytics 4 API
   - Calculate metrics: % growth in organic sessions, new keyword rankings, position improvements
   - Track traffic by device type and country/language (German sites vs international)

5. Weekly Automated Report Generation:
   - Create Python/Node.js script using GSC API for data collection
   - Schedule via cron job (weekly Sunday 6 AM) or serverless function (AWS Lambda, Google Cloud Functions)
   - Report template includes:
     * Executive summary: organic traffic change %, new backlinks count, DA improvement
     * Backlinks section: new domains acquired, quality distribution, directory approvals
     * Keyword rankings: top movers (up/down), new rankings, position changes
     * Traffic metrics: sessions change, CTR change, average position change
     * Directory approval status: submission status per Tier 1 directory from Task 28
   - Export as PDF or HTML with charts (Chart.js or Plotly)
   - Deliver via email to stakeholder email list
   - Store reports in /seo/backlink-monitoring/reports/ directory

6. Integration with Existing Infrastructure:
   - Store GSC credentials in Docker secrets or .env file (not in version control)
   - Deploy as scheduled task in Docker container or serverless function
   - Use existing database (if available) to store backlink history for trend analysis
   - Set up alerts for significant changes: >20% traffic drop, negative keyword ranking trends
   - Create dashboard view for weekly metrics (optional: integrate with Task 7 analytics dashboard)

7. Multi-Site Configuration:
   - Create config file with site URLs and corresponding property IDs
   - Generate separate reports for each site
   - Optional: Create consolidated report across all 5 sites for portfolio overview
   - German sites (ai-projektmanager.de, varna-agenten.de) may have separate GA4 properties for German traffic

**Test Strategy:**

1. GSC Configuration Testing:
   - Successfully authenticate to GSC for all 5 sites using stored credentials
   - Verify property ownership shows as "Verified" status in GSC
   - Confirm sitemaps are indexed and showing in GSC Coverage report
   - Check backlinks report displays recent backlinks for each site

2. API Integration Testing:
   - Execute test query against GSC API using service account credentials
   - Verify API returns valid data: site impressions, clicks, average position
   - Test backlinks query: confirm new domains appear in results
   - Validate error handling for API rate limits and network failures

3. Weekly Report Generation Testing:
   - Run report generation script manually and verify execution succeeds
   - Check report output file is created with valid HTML/PDF format
   - Validate report contains all required sections: backlinks, traffic, keywords, directory approvals
   - Verify report email delivery (send test email to admin account)
   - Confirm report data accuracy: matches GSC dashboard figures within 5% tolerance

4. Backlink Monitoring Validation:
   - Cross-check new backlinks from report against actual GSC dashboard for accuracy
   - Verify domain authority calculations are reasonable (compare against known DA values)
   - Test directory approval rate tracking: confirm Task 28 directory submissions are tracked
   - Validate quality score assignments: spot-check a few backlinks for appropriate tier classification

5. Automated Scheduling Test:
   - Set up test schedule for 24 hours from current time
   - Confirm script executes at scheduled time
   - Verify report is generated without manual intervention
   - Check logs show successful execution

6. Multi-Site Report Testing:
   - Generate reports for all 5 sites and verify each has correct data
   - Confirm consolidated portfolio report (if implemented) aggregates correctly
   - Test that German sites (de domain) show appropriate German language tracking
   - Validate email distribution goes to all intended recipients

7. Historical Data Tracking:
   - Verify week-over-week metrics show as change percentages (%Δ)
   - Confirm keyword ranking improvements are accurately calculated
   - Test trend analysis: verify data from previous weeks is stored and retrieved correctly
   - Validate alert triggers: simulate conditions that should trigger alerts and verify notification
