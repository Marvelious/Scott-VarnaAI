# Task ID: 25

**Title:** Phase 2: Google Business Profile Setup - Create and optimize GBP for all 5 brands

**Status:** done

**Dependencies:** 24 ✓

**Priority:** high

**Description:** Create and optimize Google Business Profiles for VarnaAI, VarnaAI, AI Projektmanager, Varna Agenten, and AI Marketing BG with complete category configuration, keyword-optimized descriptions, and service areas.

**Details:**

Implement comprehensive Google Business Profile (GBP) setup for all 5 VarnaAI portfolio brands using Playwright MCP for browser automation.

1. Prerequisites from Task 24 (NAP Data Standardization):
   - Retrieve standardized Name, Address, Phone data from /seo/nap-data/data.json files
   - Use consistent business names, addresses, and phone numbers across all platforms
   - Reference logos in PNG/JPG/SVG formats prepared in Task 24

2. Google Business Profile Creation:
   - For each of the 5 sites (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com):
     a. Access Google Business Profile (https://business.google.com/)
     b. Create new business profile or claim existing listing
     c. Verify business ownership via postcard or phone verification

3. Profile Configuration for Each Brand:
   a. Primary Category Selection:
      - VarnaAI: "Security Systems Service"
      - VarnaAI: "Software Company"
      - AI Projektmanager: "Business Consultant"
      - Varna Agenten: "Advertising Agency"
      - AI Marketing BG: "Marketing Consultant"
   
   b. Additional 9 Categories (example for VarnaAI):
      - IT Support and Services
      - Computer Security Service
      - Cybersecurity Consultant
      - Business Information and Technology Services
      - Computer Network Design and Systems
      - Information Technology Training
      - Data Recovery Service
      - Disaster Recovery Planning
      - Computer Repair and Maintenance
   
   c. Business Description (1750 characters with keyword optimization):
      - Incorporate primary keywords naturally (e.g., "IT security", "DSGVO compliance", "firewall management")
      - Include service areas and capabilities
      - Add unique value propositions
      - Maintain professional tone while optimizing for search visibility
      - Example structure: "[Company Name] ist Ihr [primary service] Partner für [key benefit]. Mit [X Jahre] Erfahrung in [industry], bieten wir [services]. Unsere Spezialisten sind zertifiziert in [certifications]. Wir betreuen Unternehmen in [regions] mit Fokus auf [compliance standards]."
   
   d. Service Areas Configuration:
      - Define geographic coverage (regions/cities served)
      - VarnaAI/AI Projektmanager/Varna Agenten: Germany-focused (add Bundesländer)
      - AI Marketing BG: Bulgaria-focused (add major cities)
      - VarnaAI: Europe-wide coverage
      - varnaai.com: International/Global
   
   e. Attribute Configuration:
      - Add business attributes (e.g., "On-site services", "Online consultations", "Has parking")
      - Set business hours (recommend business days, 09:00-17:00 for B2B)
      - Upload business logo (PNG format, 400x400px minimum)
      - Add cover photos showing team/office/services

4. Weekly Content Posting Schedule:
   - Set up automated posting calendar in GBP
   - Post cadence: 1-2 posts per week per brand
   - Content types:
     * Tips/advice related to services (e.g., "5 DSGVO Compliance Tips for German SMEs")
     * New service announcements
     * Industry news and insights
     * Customer success stories (anonymized per CLAUDE.md privacy rules)
     * Certification/award updates
   - Use Playwright to automate posting workflow (click post button, select date/time, add content)

5. Playwright MCP Automation Script:
   - Create browser automation to:
     a. Log into Google Business Profile for each brand
     b. Navigate to profile settings
     c. Fill in business information from NAP data files
     d. Configure categories via dropdown selections
     e. Paste description text with keyword density verification
     f. Set service areas by searching and selecting regions
     g. Upload images (logos and cover photos)
     h. Schedule initial posts for the upcoming week
   - Handle form submission and verification steps
   - Capture screenshots of completed profiles for verification
   - Wait for page load states and element visibility before interactions

6. Verification and Optimization:
   - Verify all 1750 characters are visible in description field
   - Confirm all 10 categories (1 primary + 9 additional) are saved
   - Check that service areas match expected geographic coverage
   - Validate keyword density in descriptions (target 1-2% for primary keyword)
   - Verify business hours are set correctly
   - Confirm images uploaded successfully
   - Test that weekly posting schedule is configured

7. Integration with Dashboard:
   - Store GBP profile URLs for each brand
   - Log completion status in Task Master
   - Document any verification codes or pending confirmations needed
   - Prepare follow-up actions (e.g., review insights after 2 weeks of activity)

**Test Strategy:**

1. Google Business Profile Access Verification:
   - For each of the 5 brands, navigate to Google Business Profile dashboard
   - Confirm profile is accessible and shows "Verified" status
   - Check that business name, address, and phone match NAP data from Task 24

2. Category Configuration Testing:
   - Click on "Business Information" section for each profile
   - Verify primary category is correctly set (e.g., Security Systems Service for Classic Security)
   - Confirm all 9 additional categories are visible and saved
   - Total: 10 categories per profile × 5 brands = 50 category validations

3. Description and Keyword Content Testing:
   - Expand business description for each profile
   - Count characters (verify 1700-1750 character range)
   - Verify primary keywords appear naturally at least once in opening sentences
   - Confirm no keyword stuffing or unnatural phrasing
   - Check special characters and formatting (German umlauts, etc.) display correctly

4. Service Area Validation:
   - For each profile, navigate to "Service areas" section
   - Verify geographic regions are correctly configured:
     * Classic Security: German Bundesländer listed
     * VarnaAI: European countries listed
     * AI Marketing BG: Bulgarian cities listed
   - Test that map shows coverage area correctly
   - Confirm addresses and service radius are reasonable for business type

5. Image Upload Verification:
   - Confirm business logo displays correctly (400x400px minimum)
   - Verify cover photos are visible and properly sized
   - Check that images are in approved format (PNG, JPG)
   - Confirm no broken image links

6. Weekly Posting Schedule Testing:
   - Navigate to "Posts" section for each profile
   - Verify initial posts are scheduled for upcoming 7 days
   - Confirm post titles contain relevant keywords
   - Check that posting times are distributed (not all at same time)
   - Verify posts are in appropriate language (German for .de sites, English/Bulgarian for international)

7. Playwright Automation Validation:
   - Capture screenshots of each completed profile showing:
     * Business information panel with all fields populated
     * Categories section showing 10 categories
     * Service area map with correct regions
     * Posted content in timeline
   - Run automation script end-to-end for all 5 brands
   - Verify no errors or failed element clicks in automation logs
   - Confirm all form submissions completed without timeout errors

8. Search Visibility Testing:
   - Google search "[Brand Name] Google" for each of the 5 companies
   - Verify GBP profile appears in Knowledge Panel on right side
   - Check that business information matches GBP (name, address, phone, rating if available)
   - Test from different geographic locations using VPN/search settings

9. Cross-Site Consistency Check:
   - Compare NAP data across all 5 profiles
   - Verify no inconsistencies in business names or contact information
   - Confirm URL structure matches website URLs from CLAUDE.md
   - Validate phone numbers match stored credentials

10. Acceptance Criteria:
    - ✅ All 5 GBP profiles are live and publicly visible
    - ✅ Each profile has 10 categories (1 primary + 9 additional)
    - ✅ Description content is 1700-1750 characters with optimized keywords
    - ✅ Service areas configured for geographic coverage
    - ✅ Logo and cover photos uploaded for all 5 brands
    - ✅ Weekly posting schedule configured with 4 weeks of content queued
    - ✅ Business hours set correctly for each location
    - ✅ All profiles pass Google verification (if required)
    - ✅ Automation script completes without errors
    - ✅ Screenshots document completion of all 5 profiles
