# Task ID: 38

**Title:** RetirementAI - Implement German Pension Calculator (Deutsche Rentenversicherung) with Multi-Currency Support

**Status:** done

**Dependencies:** 1 ✓, 2 ✓

**Priority:** high

**Description:** Build German pension calculation engine with Deutsche Rentenversicherung integration, multi-currency support (EUR, GBP, CHF), and cross-border tax optimization for EU/UK/Swiss users.

**Details:**

1. Analyze RetirementAI codebase structure (D:\VarnaAI\pension) to understand existing portfolio calculation logic and API integration patterns.

2. Implement German Pension Calculator module:
   - Create Deutsche Rentenversicherung (DRV) API client for statutory pension contributions and projections
   - Implement Rentenbescheid (pension statement) XML/PDF parsing for existing pension data import
   - Build earnings history validation against DRV contribution records
   - Calculate Rentenpunkte (pension points) based on German social insurance rules
   - Implement pension adjustment factors for Eastern/Western Germany historical differences
   - Support Altersrente (old-age), Erwerbsminderungsrente (disability), and Hinterbliebenenrente (survivor) pension types

3. Multi-Currency Implementation:
   - Extend existing Trading212 API client to support GBP and CHF alongside EUR
   - Implement real-time FX conversion using ECB (European Central Bank) API for stable rates
   - Store conversion rates in PostgreSQL with daily refresh via BullMQ job queue
   - Create currency-aware portfolio calculations with monthly/quarterly rebalancing options
   - Support pension withdrawal in alternate currencies for cross-border retirees

4. Cross-Border Tax Optimization Engine:
   - Implement German-UK tax treaty rules (DBA) for split residence scenarios
   - Add Swiss tax calculation for EU residents with Swiss assets/income
   - Build progressive tax calculator accounting for Progressionsvorbehalt (progression reservation)
   - Integrate Kirchensteuer (church tax) optional deduction logic
   - Support Rentenbesteuerung transition rules (taxation of pension income 2005-2040)
   - Create tax-efficient withdrawal strategies comparing Germany/UK/Switzerland tax treatment

5. Integration Points:
   - Connect to existing Redis cache layer for FX rates and tax tables
   - Extend PostgreSQL schema with DRV integration tables (pension_history, contribution_records, tax_scenarios)
   - Add BullMQ job for weekly DRV data sync and nightly tax/FX updates
   - Implement Studio LM local AI for pension scenario explanations in German/English
   - Add Playwright MCP support for automated Rentenbescheid OCR/parsing if manual upload needed

6. Frontend Components (Next.js 14):
   - Add DRV pension import wizard with Rentenbescheid upload/parsing
   - Create multi-currency portfolio view with real-time FX conversion
   - Build tax scenario comparison tool (Germany vs UK vs Switzerland)
   - Add cross-border optimization recommendations with tax savings estimates
   - Implement pension adequacy ratios (DRV vs target income replacement)

7. Security & Compliance:
   - Encrypt sensitive DRV contribution records end-to-end
   - Implement BfDI (Federal Data Protection Officer) DSGVO compliance for pension data
   - Add audit logging for all tax optimization scenarios
   - Support data deletion/retention per German pension data protection rules

**Test Strategy:**

1. Unit Tests for Pension Calculation Logic:
   - Test Rentenpunkte calculation against DRV example cases (Musterfälle)
   - Verify pension age adjustments (Regelaltersgrenze increases by birth year)
   - Validate Rentenminderung (reduction) for early withdrawal scenarios
   - Test Erwerbsminderungsrente qualification logic
   - Verify Eastern/Western adjustment factors are applied correctly

2. Integration Tests for DRV API:
   - Test authenticated API connection to Deutsche Rentenversicherung sandbox/test environment
   - Verify Rentenbescheid XML parsing with sample documents from all DRV regional offices
   - Test contribution record import and reconciliation
   - Validate error handling for incomplete/missing contribution histories
   - Test data freshness (weekly sync completes successfully)

3. Multi-Currency Functionality:
   - Verify FX conversion accuracy against ECB official rates (daily reconciliation)
   - Test portfolio calculations in EUR, GBP, CHF with identical underlying assets
   - Validate cross-currency withdrawal scenarios (e.g., GBP account, CHF payout, EUR home currency)
   - Test currency rebalancing algorithms with 10+ asset allocation scenarios
   - Verify Redis cache hit rate > 95% for FX rates across high-volume test loads

4. Tax Optimization Engine:
   - Test Germany-UK tax treaty calculations against published BMF (Bundesfinanzministerium) examples
   - Validate Swiss tax calculation using official Canton-specific tax tables
   - Test Progressionsvorbehalt application for split-residence scenarios (e.g., Jan-Jun Germany, Jul-Dec UK)
   - Verify Kirchensteuer optional deduction logic (religious affiliation not stored, only calculated)
   - Test Rentenbesteuerung transition year calculations (2005-2040 phase-in)
   - Compare generated tax optimizations against real tax advisor recommendations for 5+ complex scenarios

5. Cross-Border Scenarios:
   - Test UK expat with German DRV pension + UK personal savings account + Swiss real estate income
   - Test German resident with UK company pension + Swiss employment income + German real estate
   - Verify correct withholding tax treatment for each scenario
   - Test pension benefit declarations (Rentenbescheinigung) for UK/Swiss tax authorities

6. Data Security & DSGVO:
   - Verify DRV contribution records encrypted in transit (TLS 1.3) and at rest (AES-256)
   - Test data deletion requests (DSGVO Article 17) remove all pension records within 30 days
   - Validate audit log captures all tax scenario calculations with user/timestamp
   - Confirm PII redaction in any error logs or support dumps

7. Performance Testing:
   - Verify pension calculation < 500ms for complex 40-year contribution history
   - Test FX conversion caching: cache miss → API call < 200ms, cache hit < 10ms
   - Load test: 100 concurrent users running tax optimization scenarios
   - Verify database query performance (indexes) for pension history lookups

8. Browser/E2E Testing (Playwright MCP):
   - Test DRV Rentenbescheid file upload parsing end-to-end
   - Verify multi-currency portfolio view renders correctly on mobile/tablet/desktop
   - Test tax scenario comparison tool with 3+ scenarios simultaneously
   - Validate form validation for pension contribution inputs (date ranges, amounts)
   - Test cross-border tax report PDF generation

9. Regression Testing:
   - Verify existing Trading212 portfolio calculations unaffected by multi-currency implementation
   - Confirm AI advisor recommendations (Studio LM) still function with new tax scenarios
   - Validate pension income projections still integrate with expense planning module

10. Documentation & Validation:
   - Cross-reference all calculations with published DRV Rentenversicherungsbericht (annual reports)
   - Validate Swiss tax treatment against official SRK (Schweizerische Rentenversicherung) guidelines
   - Confirm UK tax treaty calculations match HMRC (Her Majesty's Revenue & Customs) published guidance
   - Document all assumptions and edge cases in implementation notes

## Subtasks

### 38.1. Analyze RetirementAI codebase and DRV integration requirements

**Status:** done  
**Dependencies:** None  

Examine existing RetirementAI structure, portfolio calculation patterns, and API integration approaches. Research Deutsche Rentenversicherung API documentation and Rentenbescheid XML/PDF formats for integration planning.

**Details:**

Review D:\VarnaAI\pension directory structure, study existing Trading212 API client implementation patterns, document DRV API endpoints and authentication requirements, identify PostgreSQL schema extension points for pension_history and contribution_records tables, create integration architecture document.
<info added on 2025-11-24T05:33:42.328Z>
Codebase analysis complete. RetirementAI architecture confirmed: Next.js 14 App Router with TypeScript, PostgreSQL 15+, Redis 7+, BullMQ background jobs. Multi-currency support already implemented (EUR/GBP/CHF in src/lib/config/currencies.ts with ECB integration). Existing pension system architecture includes pensions table with 35+ fields and PensionService with CRUD operations at src/lib/services/pensionService.ts. Calculator pattern established in src/lib/calculators/ (healthcare.ts and socialSecurity.ts as 17KB reference implementations). Critical finding: EUROPEAN_FEATURE_ROADMAP.md confirms German DRV is Phase 2.1 with Q2-Q3 timeline and 3-4 week implementation estimate. DRV formula documented: Monthly Pension = Entgeltpunkte × Zugangsfaktor × Rentenartfaktor × Aktueller Rentenwert. Implementation approach confirmed: (1) Create src/lib/calculators/pensions/germany.ts following existing calculator pattern, (2) Add historical wage index data (Durchschnittsentgelt 2010-2024) and current pension values (Aktueller Rentenwert), (3) Create /api/pensions/calculate/germany endpoint, (4) Build GermanPensionCalculator.tsx React component, (5) Extend database schema with pension_type = 'drv_government' and germany-specific fields (entgeltpunkte, zugangsfaktor, rentenartfaktor), (6) Follow Trading212 API integration pattern (API → PostgreSQL → Redis cache → Frontend). Tax calculator infrastructure exists at src/lib/tax/ for German tax extensions (Kirchensteuer, Solidaritätszuschlag). No blockers identified: all infrastructure production-ready, DSGVO compliant, A+ security grade, WCAG 2.1 AA accessible. DRV integration ready to proceed with Phase 2.1 implementation.
</info added on 2025-11-24T05:33:42.328Z>

### 38.2. Implement German Pension Calculator module with DRV integration

**Status:** done  
**Dependencies:** 38.1  

Build Deutsche Rentenversicherung API client, implement Rentenbescheid parsing, create Rentenpunkte calculation engine, and support all three pension types (Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente) with regional adjustment factors.

**Details:**

Create DRV API client with OAuth2 authentication, implement XML/PDF parser for Rentenbescheid documents, build Rentenpunkte calculator following German social insurance rules, add regional adjustment factors for East/West Germany, implement pension type calculation logic, store parsed data in PostgreSQL pension_history tables, add comprehensive error handling for invalid contribution records.

### 38.3. Extend multi-currency support with FX conversion and currency-aware calculations

**Status:** done  
**Dependencies:** 38.1  

Extend Trading212 API client for GBP/CHF support, implement ECB API integration for real-time FX rates, create PostgreSQL tables for rate storage, and build currency-aware portfolio calculation engine with rebalancing options.

**Details:**

Modify Trading212 client to handle multiple currency pairs, implement ECB API consumption with daily BullMQ scheduled job, create fx_rates table in PostgreSQL with timestamp/currency pair/rate columns, build currency conversion utility with Redis caching layer, implement monthly/quarterly rebalancing logic, create currency-aware withdrawal calculation supporting EUR/GBP/CHF pension distributions.

### 38.4. Build cross-border tax optimization engine for Germany/UK/Switzerland

**Status:** done  
**Dependencies:** 38.1, 38.2  

Implement German-UK tax treaty rules, Swiss tax calculations, progressive tax calculator with Progressionsvorbehalt, Kirchensteuer logic, and Rentenbesteuerung transition rules to provide tax-efficient withdrawal strategies.

**Details:**

Create tax_scenarios table in PostgreSQL for storing calculation results, implement DBA (German-UK tax treaty) split residence rules, build Swiss income/asset tax calculator, create progressive tax calculator accounting for progression reservation, add optional Kirchensteuer deduction logic, implement Rentenbesteuerung transition rules (2005-2040 taxation schedule), build comparison engine for Germany vs UK vs Switzerland tax treatment, integrate with Studio LM for German/English scenario explanations.

### 38.5. Implement frontend components and complete system integration with security/compliance

**Status:** done  
**Dependencies:** 38.2, 38.3, 38.4  

Create Next.js 14 components for DRV import wizard, multi-currency portfolio view, tax scenario tool, and add DSGVO compliance, encryption for sensitive data, audit logging, and Playwright MCP support for automated document processing.

**Details:**

Build Rentenbescheid upload wizard component with drag-drop, implement multi-currency portfolio display with real-time FX conversion, create tax scenario comparison UI showing Germany/UK/Switzerland options, add pension adequacy ratio calculations and visualizations, implement end-to-end encryption for DRV contribution records, add BfDI DSGVO compliance audit logging, create data deletion/retention workflows per German pension law, integrate Playwright MCP for automated document OCR/parsing, add Studio LM integration for German/English pension explanations, implement Redis caching for tax tables and FX rates.
