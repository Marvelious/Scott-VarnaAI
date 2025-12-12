# Task ID: 23

**Title:** Phase 1: Schema Markup Rollout - Implement JSON-LD Structured Data

**Status:** done

**Dependencies:** 22 ✓, 21 ✓, 20 ✓

**Priority:** high

**Description:** COMPLETED: All 5 sites already have comprehensive JSON-LD structured data. Verified 2025-12-01: varnaai.com (Place, ProfessionalService, Organization, WebSite, WebPage, ImageObject), ai-projektmanager.de (Place, ProfessionalService, Organization, WebSite, WebPage, ImageObject, SoftwareApplication), varna-agenten.de (Place, ProfessionalService, Organization, WebSite, WebPage, ImageObject, Person, Article), aimarketingbg.com (Place, ProfessionalService, Organization, WebSite, WebPage, ImageObject, Person, Article), classicsecurity.net (Place, ProfessionalService, Organization, WebSite, WebPage, LocalBusiness, BreadcrumbList with OfferCatalog).

**Details:**

1. Analyze current WordPress site structure across all 5 domains to identify schema implementation points (homepages, service pages, contact pages)

2. Create JSON-LD schema templates:
   - LocalBusiness schema for classicsecurity.net (includes physical address, phone, business hours, geo coordinates)
   - Organization schema for ai-projektmanager.de, varna-agenten.de, varnaai.com, aimarketingbg.com (includes name, description, logo, contact, social profiles)
   - Reference templates from .taskmaster docs and SCHEMA_ORG_TEMPLATES.md

3. Use Morphllm MCP for bulk schema implementation:
   - Create JSON-LD schema files as reusable templates
   - Apply LocalBusiness template to classicsecurity.net homepage footer/header
   - Apply Organization schema template to all 4 online-only sites
   - Ensure schema includes current company info from COMPANY_INFO.md

4. Schema field mappings:
   - LocalBusiness: name, address (street, city, postal code, country), telephone, email, url, logo, sameAs (social profiles)
   - Organization: name, description, logo, url, contactPoint (email, phone), sameAs (social profiles), foundingDate, areaServed

5. Implementation via WordPress:
   - Add schema via Rank Math SEO plugin settings OR
   - Insert directly in theme header via custom hook
   - Ensure no duplicate schema markup

6. Verify integration with existing Rank Math SEO configurations on all sites

7. Document schema implementation details for future maintenance

**Test Strategy:**

1. Use Google Rich Results Test (https://search.google.com/test/rich-results) on all 5 homepages:
   - Verify LocalBusiness schema validates on classicsecurity.net
   - Verify Organization schema validates on ai-projektmanager.de, varna-agenten.de, varnaai.com, aimarketingbg.com
   - Confirm no errors or warnings in validation results

2. Validate JSON-LD syntax:
   - Use https://jsonld.com/validator/ to verify each schema
   - Ensure all required fields are present
   - Check for proper formatting and nested structure

3. Test schema visibility:
   - Inspect page source on each homepage
   - Confirm schema markup is present in <head> or <body>
   - Verify schema contains accurate company information

4. Cross-browser verification:
   - Test schema validity in Chrome, Firefox, Safari
   - Confirm schema structured data is preserved across browsers

5. Search Console testing:
   - Monitor Google Search Console for rich results eligibility
   - Verify no structured data errors reported

6. Performance check:
   - Run Lighthouse audit to ensure schema doesn't impact page load
   - Confirm no JavaScript errors introduced
