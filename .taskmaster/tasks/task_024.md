# Task ID: 24

**Title:** Phase 1: NAP Data Standardization - Create master business data files

**Status:** done

**Dependencies:** None

**Priority:** high

**Description:** Create standardized Name, Address, Phone (NAP) master data files (data.json) for all 5 sites with consistent formatting, prepare multiple business descriptions per site (50, 100, 250 words), and prepare logos in PNG, JPG, and SVG formats for directory submissions.

**Details:**

Create comprehensive NAP standardization package for VarnaAI portfolio (ai-projektmanager.de, aimarketingbg.com, classicsecurity.net, varna-agenten.de, varnaai.com).

1. Create data.json files:
   - Location: Create /seo/nap-data/ directory with individual data.json per site
   - Structure: {
       "business": {
         "legalName": "exact legal name",
         "displayName": "marketing name",
         "phone": "+49 format for German sites, international format for others",
         "address": {
           "street": "street address",
           "city": "city",
           "state": "state/region",
           "postalCode": "postal code",
           "country": "country code (DE for German sites)"
         },
         "website": "https://domain.com",
         "email": "contact@domain.com"
       }
     }
   - Validate: All sites use consistent formatting (phone with country code, postal code format matches country)
   - Reference existing data from CLAUDE.md credentials section and COMPANY_INFO.md

2. Prepare business descriptions:
   - Create descriptions/[site-name]/ folders with three versions per site:
     * short-description.txt (50 words): Elevator pitch for directory listings
     * medium-description.txt (100 words): SEO-optimized for Google Business Profile
     * long-description.txt (250 words): Comprehensive service overview for business directories
   - Content should match existing site messaging from wordpress/ and COMPANY_INFO.md
   - German sites (.de): Write in German with proper grammar and technical terminology
   - English sites: Write in English with US/UK conventions based on target market
   - Include key services, compliance focus (DSGVO, ISO 27001), and target audience
   - Incorporate focus keywords from SEO_Portfolio_Strategy_2025.md

3. Prepare logo assets:
   - Directory: /assets/logos/[site-name]/
   - Formats per site:
     * PNG: 500x500px, 1000x1000px (transparent background preferred)
     * JPG: 500x500px, 1000x1000px (white background)
     * SVG: Scalable vector format (if available from design)
   - Use Morphllm MCP to normalize existing logos if available in /assets/images/
   - Verify logo readability at small sizes (favicon, directory listings)
   - Document source/version in logos/README.md

4. Quality checks:
   - Validate data.json syntax (parseable by JSON.parse)
   - Verify phone numbers are in consistent international format
   - Check postal codes match country conventions (5 digits for Germany, variable for others)
   - Ensure descriptions have consistent tone/voice within each site
   - Verify logo formats are web-optimized (file size <500KB for PNG/JPG, <100KB for SVG)

5. Integration:
   - Reference files in dashboard for Google Business Profile sync automation
   - Create CSV export of NAP data for bulk directory submissions
   - Document standardization in /seo/nap-data/README.md with submission workflow

**Test Strategy:**

1. Verify data.json files:
   - Parse each data.json with JSON validator (no syntax errors)
   - Confirm all 5 sites have data files with required fields (legalName, phone, address, website, email)
   - Validate phone numbers match international format (+49 for Germany, etc.)
   - Check postal codes match country conventions (DE: 5 digits, US: 5-digit or ZIP+4)
   - Verify website URLs are HTTPS and match site domains

2. Validate business descriptions:
   - Count word count for each description (50 ±5 words, 100 ±10 words, 250 ±20 words)
   - Verify German sites are in German with proper umlauts (ä, ö, ü)
   - Check English sites for consistent tone and professional language
   - Confirm descriptions include target keywords from SEO strategy
   - Ensure no duplicate sentences between versions
   - Verify no promotional language ('best', 'leading', 'revolutionary') without evidence

3. Validate logo assets:
   - Verify PNG files are 500x500px and 1000x1000px (check dimensions with image tool)
   - Verify JPG files are 500x500px and 1000x1000px with white background
   - Confirm SVG files render correctly and are valid XML
   - Check file sizes are optimized (<500KB PNG/JPG, <100KB SVG)
   - Test logo readability at 32x32px (favicon size)
   - Verify transparent backgrounds for PNG (use alpha channel check)

4. Integration testing:
   - Create CSV export from data.json files
   - Verify CSV has columns: Business Name, Phone, Address, City, State, Postal Code, Country, Website, Email
   - Test CSV opens correctly in Excel/Google Sheets
   - Confirm data.json files are readable by Node.js JSON.parse()
   - Create sample integration script that loads all data.json files and exports CSV

5. Documentation verification:
   - Confirm /seo/nap-data/README.md exists with standardization rules
   - Document any exceptions or variations between sites
   - Create submission checklist for each directory type (Google Business, Yelp, local directories)
   - Verify all files are organized in consistent directory structure
