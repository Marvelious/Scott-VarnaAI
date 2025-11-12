# WordPress Content & Snippets

This folder contains WordPress-specific content, code snippets, and workflow documentation for the 5-site portfolio.

## Structure

```
wordpress/
├── kadence-design-options.txt  # Kadence block configuration reference
├── pages/                      # Ready-to-paste page content
│   ├── contact-page/           # Contact page iterations
│   ├── faq-page/               # FAQ page content
│   └── PRICING_PAGE_REWRITE.md # Pricing page content
└── snippets/                   # Reusable code snippets
    ├── portfolio-footer-*.html # Portfolio cross-promo footers
    ├── security-headers.htaccess # Apache security headers
    ├── htaccess-security.txt   # Alternative .htaccess config
    └── h1-fix.css              # CSS fix for duplicate H1 tags
```

## WordPress Sites

| Site | URL | Username |
|------|-----|----------|
| AI Projektmanager | https://ai-projektmanager.de/wp-admin/ | claude |
| AI Marketing BG | https://aimarketingbg.com/wp-admin/ | claude |
| Classic Security | https://classicsecurity.net/wp-admin/ | claude |
| Varna Agenten | https://varna-agenten.de/wp-admin/ | claude |
| Varna AI | https://varnaai.com/wp-admin/ | claude |

**⚠️ Passwords**: See `CLAUDE.md` root document (not stored here for security)

## Workflow

### 🚨 CRITICAL WORKFLOW RULE 🚨

**WHEN CREATING NEW PAGES:**
1. Create blank page in WordPress (Seiten → Neu hinzufügen)
2. **STOP AND WAIT** - Do NOT proceed with content
3. Notify Big Dick that page is created and ready for design
4. **WAIT for Big Dick to add Kadence design blocks**
5. Big Dick will confirm when design blocks are added
6. **ONLY THEN** proceed with writing content to fill the text areas
7. Big Dick handles all images - never add or modify images

**Why This Matters:**
- Kadence blocks provide the structure and design framework
- Attempting to write content before design blocks causes workflow conflicts
- Big Dick needs to see the page structure to choose appropriate design templates
- Images are managed separately and should not be touched by Claude

### Page Creation Process

1. **Create Blank Page**: WordPress admin → Seiten → Neu hinzufügen
2. **Wait for Design**: Big Dick adds Kadence design blocks
3. **Write Content**: Fill text areas with SEO-optimized German content
4. **SEO Optimization**: Rank Math requirements
   - Minimum 600 words total
   - Focus keyword in first paragraph
   - Focus keyword density: 0.8-0.9%
   - External link (DoFollow) to authoritative source (BSI, official docs)
   - Internal links to other pages
   - H2/H3 headings with focus keyword
5. **Save & Publish**: Aktualisieren → Veröffentlichen

## Page Content

### `/pages/contact-page/`
Contact page content iterations:
- CONTACT_PAGE_FIX.md
- CONTACT_PAGE_BLOCKS_READY.txt
- CONTACT_PAGE_FIXED_FINAL.txt
- CONTACT_PAGE_KADENCE_FIXES.txt
- CONTACT_KADENCE_COMPLETE.txt

### `/pages/faq-page/`
FAQ page content:
- FAQ_PAGE_BLOCKS_READY.txt
- FAQ_PAGE_FIXED_FINAL.txt

### `/pages/PRICING_PAGE_REWRITE.md`
Pricing page content rewrite

## Code Snippets

### Portfolio Footer Widgets (`/snippets/`)
**Purpose**: Cross-promote all 5 VarnaAI portfolio sites

**Files**:
- `portfolio-footer-widget.html` - Basic version
- `portfolio-footer-improved.html` - Enhanced styling
- `portfolio-footer-color-matched.html` - Brand-matched colors
- `portfolio-footer-light.html` - Light theme variant

**Usage**: Add to WordPress footer widget area via Appearance → Widgets

### Security Headers (`/snippets/`)
**Purpose**: Improve security scores and HTTP header configuration

**Files**:
- `security-headers.htaccess` - Apache .htaccess configuration
- `htaccess-security.txt` - Alternative .htaccess setup

**Usage**: Add to `.htaccess` file in WordPress root directory

### CSS Fixes (`/snippets/`)
**Purpose**: Quick CSS fixes for common issues

**Files**:
- `h1-fix.css` - Fix duplicate H1 tags without template editing

**Usage**: Add to Appearance → Customize → Additional CSS

## Kadence Configuration

**File**: `kadence-design-options.txt`

Contains Kadence block design options and configuration notes for maintaining consistent design across sites.

## SEO Requirements

All WordPress pages must meet these SEO standards:

**Content**:
- ✅ Minimum 600 words
- ✅ Focus keyword at beginning of content (paragraph 2 or 3)
- ✅ Focus keyword density: 0.8-0.9%
- ✅ Focus keyword in at least one H2/H3 heading

**Links**:
- ✅ 1-2 DoFollow external links (BSI, BfDI, EU official sites)
- ✅ Internal links to other portfolio pages

**Meta** (Big Dick handles):
- Title: 50-60 characters with power word and number
- Description: 120-160 characters with focus keyword
- URL slug: Focus keyword in hyphenated format

**Rank Math Target**: 80+/100 score

## Related Documentation

- **Main Workflow**: `/CLAUDE.md` - Complete WordPress workflow guide
- **SEO Strategy**: `/seo/SEO_Portfolio_Strategy_2025.md`
- **Company Info**: `/COMPANY_INFO.md` - Details for all 5 sites
- **Schema Templates**: `/SCHEMA_ORG_TEMPLATES.md`

## Tools & Plugins

**Active Plugins**:
- Rank Math SEO - SEO scoring and optimization
- Kadence Blocks - Design framework and templates
- Gutenberg Editor - WordPress block-based editor

## Common Issues & Solutions

**Issue**: File Chooser Modal Blocks Editor
**Solution**: Use `browser_file_upload({ paths: [] })` to dismiss

**Issue**: Wrong Page Being Edited
**Solution**: Verify post ID in URL matches instructions

**Issue**: SEO Score Won't Improve
**Solutions**:
- Focus keyword not at beginning → Rewrite paragraph 2
- No external links → Add BSI or official source link
- Word count below 600 → Expand content
- Missing internal links → Link to other pages

**Issue**: Content Doesn't Fit Design Block
**Solution**: Adjust content length to match Kadence block size
- Hero descriptions: 2-3 sentences
- Feature descriptions: 2-4 sentences
- Info boxes: 3-5 sentences
- Text blocks: 4-8 sentences

## Contact

For WordPress workflow questions, see `/CLAUDE.md` or contact Big Dick.
