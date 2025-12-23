# Free SEO Audit Template - 30-Minute Manual Audit

**Created**: 2025-12-21
**Purpose**: Lead magnet for aimarketingbg.com ("Free SEO Audit" offer)
**Time Investment**: 30 minutes per audit
**Deliverable**: 5-page PDF report with actionable recommendations
**Weekly Limit**: 5 free audits maximum (qualify prospects first)
**Target**: Bulgarian businesses with existing websites wanting to improve visibility

---

## Qualification Criteria (BEFORE Offering Free Audit)

**Qualify ✅**:
- Company size: 10-500 employees
- Existing website (not just social media)
- Budget indicator: "We're considering SEO services" (not "We can't afford...")
- Decision maker: Owner, Marketing Director, or has budget authority
- Industry: E-commerce, professional services, B2B

**Disqualify ❌**:
- "Can you do this for free forever?" (tire kicker)
- Solo entrepreneur or 1-5 employees (too small)
- "We'll get back to you in 6 months" (no urgency)
- No website yet (not ready for SEO)

---

## Audit Process Overview (30 Minutes)

| Phase | Time | Focus |
|-------|------|-------|
| Technical SEO | 10 min | Speed, mobile, security, structure |
| On-Page SEO | 10 min | Titles, headings, content optimization |
| Content Quality | 5 min | Keyword targeting, depth, duplicates |
| Off-Page SEO | 5 min | Backlinks, authority, social signals |

**Tools Needed (All Free)**:
- Google PageSpeed Insights (page speed)
- Google Mobile-Friendly Test (mobile responsiveness)
- Screaming Frog SEO Spider (free version, 500 URLs)
- Ahrefs Backlink Checker (free, limited data)
- Google Search Console (if client provides access)

---

## SECTION 1: Technical SEO Analysis (10 Minutes)

### 1.1 Page Speed Test (3 minutes)

**Tool**: Google PageSpeed Insights (https://pagespeed.web.dev/)

**Steps**:
1. Test homepage on desktop and mobile
2. Record scores (0-100 scale)
3. Note Core Web Vitals: LCP, FID, CLS

**Evaluation Criteria**:
- **90-100**: Excellent ✅
- **50-89**: Needs Improvement ⚠️
- **0-49**: Poor 🚨

**Common Issues**:
- Unoptimized images (> 100KB)
- Too many JavaScript files
- No browser caching
- Render-blocking CSS

**Quick Wins**:
- Compress images (TinyPNG, WebP format)
- Enable caching (WordPress plugin: WP Rocket)
- Minify CSS/JS
- Use CDN (Cloudflare free tier)

**Report Template**:
```
### Page Speed Analysis
- Desktop Score: [X]/100 - [Status]
- Mobile Score: [X]/100 - [Status]
- Largest Contentful Paint: [X]s (Target: <2.5s)
- First Input Delay: [X]ms (Target: <100ms)
- Cumulative Layout Shift: [X] (Target: <0.1)

**Critical Issue**: [Largest problem affecting speed]
**Quick Win**: [Easiest fix with biggest impact]
```

---

### 1.2 Mobile-Friendliness Test (2 minutes)

**Tool**: Google Mobile-Friendly Test (https://search.google.com/test/mobile-friendly)

**Steps**:
1. Test 3 key pages: homepage, product/service page, contact page
2. Check viewport configuration, font sizes, tap targets

**Evaluation Criteria**:
- **Mobile-Friendly**: ✅ Pass
- **Not Mobile-Friendly**: 🚨 Fail (critical for Google ranking)

**Common Issues**:
- No viewport meta tag
- Text too small to read
- Buttons too close together
- Content wider than screen

**Quick Wins**:
- Add viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Use responsive WordPress theme
- Increase font size to 16px minimum
- Test on real mobile device

**Report Template**:
```
### Mobile-Friendliness
- Homepage: [Pass/Fail] - [Issue if fail]
- Service Page: [Pass/Fail]
- Contact Page: [Pass/Fail]

**Critical Issue**: [Mobile usability problem]
**Impact**: 60% of traffic is mobile - failing this costs half your potential customers
```

---

### 1.3 Security & Structure Check (5 minutes)

**HTTPS (SSL Certificate)**:
- Visit site, check for padlock icon in browser
- **HTTPS**: ✅ Secure (Google ranking factor)
- **HTTP**: 🚨 Not secure (Google penalizes, browsers warn users)

**Robots.txt**:
- Visit: `https://yoursite.com/robots.txt`
- Check for accidental blocks: `Disallow: /` (blocks all crawlers)
- Verify sitemap reference: `Sitemap: https://yoursite.com/sitemap.xml`

**XML Sitemap**:
- Visit: `https://yoursite.com/sitemap.xml`
- Verify exists and lists all important pages
- Check for errors (broken links, 404s)

**URL Structure**:
- **Good**: `yoursite.com/services/seo-optimization`
- **Bad**: `yoursite.com/?p=123` or `yoursite.com/page/subfolder/another/too-deep`

**Broken Links**:
- Use Screaming Frog (free, 500 URLs): crawl site, find 404 errors
- Priority: Internal broken links (fix immediately)

**Report Template**:
```
### Technical Infrastructure
- HTTPS: [Yes ✅ / No 🚨]
- Robots.txt: [Configured ✅ / Missing ⚠️ / Blocking crawlers 🚨]
- XML Sitemap: [Present ✅ / Missing 🚨]
- Broken Links: [X] found ([list top 3 if any])

**Critical Issue**: [SSL missing or major structural problem]
**Quick Win**: [Install free SSL via Let's Encrypt or Cloudflare]
```

---

## SECTION 2: On-Page SEO Analysis (10 Minutes)

### 2.1 Title Tags & Meta Descriptions (4 minutes)

**Tool**: View page source (right-click → View Page Source) or Screaming Frog

**Check 5 Key Pages**: Homepage, top 3 service/product pages, contact page

**Title Tag Evaluation**:
- **Length**: 50-60 characters (optimal for Google display)
- **Keyword**: Primary keyword at the beginning
- **Uniqueness**: Each page has unique title
- **Format**: `Primary Keyword | Secondary Keyword | Brand Name`

**Good Example**: `SEO Services Bulgaria | Organic Traffic Growth | AIMarketingBG`
**Bad Example**: `Home | Welcome to Our Website`

**Meta Description Evaluation**:
- **Length**: 150-160 characters
- **Call-to-Action**: "Learn more", "Get started", "Contact us"
- **Keyword**: Primary keyword included naturally
- **Uniqueness**: Each page has unique description

**Common Issues**:
- Duplicate titles across multiple pages
- Missing meta descriptions (Google generates random snippet)
- Keyword stuffing ("SEO SEO SEO Services SEO")
- Too long (truncated in search results)

**Report Template**:
```
### Title Tags
- Homepage: [Length] chars - [Optimized ✅ / Too Long ⚠️ / Missing Keyword 🚨]
- [Page 2]: [Status]
- [Page 3]: [Status]

**Issue**: [X] pages have duplicate titles, [Y] missing keywords

### Meta Descriptions
- [X]/5 pages have unique descriptions
- [Y]/5 pages include call-to-action
- [Z]/5 pages are optimal length

**Quick Win**: Rewrite homepage title and description first (highest traffic)
```

---

### 2.2 Heading Structure (H1/H2/H3) (3 minutes)

**Tool**: View page source or browser inspector (F12)

**H1 Analysis**:
- **One H1 per page** (not multiple, not zero)
- **Includes primary keyword**
- **Descriptive and compelling**

**Good Example**: `DSGVO-Konforme AI-Projektmanagement Software`
**Bad Example**: `Welcome` or `About Us`

**H2/H3 Hierarchy**:
- Logical structure: H1 → H2 → H3 (not skipping levels)
- Keywords distributed across headings
- Breaks up content for readability

**Common Issues**:
- Multiple H1s per page (confuses Google)
- No headings (wall of text)
- Headings out of order (H1 → H3, skipping H2)
- Generic headings ("Introduction", "More Information")

**Report Template**:
```
### Heading Structure
- H1 Tags: [1 per page ✅ / Multiple 🚨 / Missing 🚨]
- Keyword in H1: [Yes ✅ / No ⚠️]
- H2/H3 Hierarchy: [Logical ✅ / Chaotic ⚠️]

**Issue**: [Specific structural problem]
**Quick Win**: Add descriptive H2 headings to break up long paragraphs
```

---

### 2.3 Image Optimization (3 minutes)

**Check 10 Images**: Homepage hero, product images, blog post images

**Alt Text Evaluation**:
- **Present**: Every image has alt attribute
- **Descriptive**: Describes image content (not "image123.jpg")
- **Keywords**: Naturally includes relevant keywords (not stuffed)

**Good Example**: `GDPR-compliant project management dashboard screenshot`
**Bad Example**: `img001` or missing alt text

**Image File Size**:
- **Optimal**: < 100KB for web images
- **Warning**: 100-300KB (compress)
- **Critical**: > 300KB (slows page significantly)

**Image Format**:
- **Best**: WebP (smaller file size, same quality)
- **Good**: JPEG (photos), PNG (graphics/logos)
- **Avoid**: BMP, TIFF (huge file sizes)

**Common Issues**:
- Missing alt text (accessibility and SEO problem)
- Images not compressed (5MB photo from camera)
- Wrong format (PNG for photos instead of JPEG)
- Generic alt text ("image", "photo", "picture")

**Report Template**:
```
### Image Optimization
- Alt Text: [X]/10 images have descriptive alt text
- Average Image Size: [X] KB ([Optimal ✅ / Too Large 🚨])
- Format: [WebP ✅ / JPEG/PNG ⚠️ / Unoptimized 🚨]

**Issue**: [X] images missing alt text, [Y] images over 300KB
**Quick Win**: Compress all images with TinyPNG or convert to WebP
```

---

## SECTION 3: Content Quality Analysis (5 Minutes)

### 3.1 Keyword Targeting (2 minutes)

**Check Homepage & Top 3 Pages**:

**Keyword Presence**:
- In title tag (most important)
- In H1 heading
- In first 100 words of content
- In meta description
- 3-5 times in body content (1-2% density)

**Keyword Intent Match**:
- **Informational**: "what is SEO", "how to optimize website"
- **Commercial**: "best SEO services", "SEO agency Bulgaria"
- **Transactional**: "hire SEO consultant", "buy SEO package"

**Common Issues**:
- No clear target keyword (general content)
- Keyword cannibalization (multiple pages target same keyword)
- Wrong intent (informational content on service page)
- Keyword stuffing (10+ mentions in 300 words)

**Report Template**:
```
### Keyword Strategy
- Primary Keywords Identified: [Yes ✅ / No 🚨]
- Keyword-Page Match: [Good ✅ / Mismatch ⚠️]
- Keyword Density: [1-2% ✅ / Too High 🚨 / Too Low ⚠️]

**Issue**: [Keyword problem, e.g., "No clear SEO focus on homepage"]
**Quick Win**: Add primary keyword to H1 and first paragraph
```

---

### 3.2 Content Depth & Quality (2 minutes)

**Word Count Check** (use word counter tool or select all + count):
- **Homepage**: 300-500 words minimum
- **Service Pages**: 500-1000 words
- **Blog Posts**: 1000-2000 words
- **Product Pages**: 300-500 words

**Evaluation Criteria**:
- **Excellent**: > 1000 words, comprehensive, answers questions
- **Good**: 500-1000 words, informative
- **Weak**: < 300 words, thin content (Google penalty risk)

**Content Quality Signals**:
- Unique content (not copied from competitors)
- Answers user questions
- Includes examples, data, specifics
- Readable (short paragraphs, bullet points, headings)

**Common Issues**:
- Thin content (< 300 words)
- Duplicate content (copied from other sites)
- Generic content (no specific value)
- Outdated content (last updated 2018)

**Report Template**:
```
### Content Quality
- Average Word Count: [X] words ([Sufficient ✅ / Thin 🚨])
- Content Depth: [Comprehensive ✅ / Surface Level ⚠️]
- Uniqueness: [Original ✅ / Duplicate 🚨]
- Last Updated: [Date] ([Recent ✅ / Outdated ⚠️])

**Issue**: [Content problem, e.g., "Service pages under 300 words"]
**Quick Win**: Expand homepage to 500+ words with service details
```

---

### 3.3 Duplicate Content Check (1 minute)

**Tool**: Google search with `site:` operator

**Test**: Copy 1-2 sentences from homepage, paste into Google with quotes
- Example: `"We are the leading SEO agency in Bulgaria with 10 years experience"`

**Evaluation**:
- **Good**: Only your site appears in results
- **Warning**: Your content appears on 1-2 other sites (minor duplicate)
- **Critical**: Your content appears on 5+ other sites (Google penalty)

**Internal Duplicate Check**:
- Use `site:yoursite.com "exact phrase from page"`
- If same content on multiple pages → consolidate or differentiate

**Report Template**:
```
### Duplicate Content
- External Duplicates: [None ✅ / Minor ⚠️ / Severe 🚨]
- Internal Duplicates: [None ✅ / Found on [X] pages ⚠️]

**Issue**: [Duplicate content problem]
**Quick Win**: Rewrite duplicate sections or consolidate pages
```

---

## SECTION 4: Off-Page SEO Analysis (5 Minutes)

### 4.1 Backlink Profile (3 minutes)

**Tool**: Ahrefs Backlink Checker (free: https://ahrefs.com/backlink-checker)

**Metrics to Check**:
- **Domain Rating (DR)**: 0-100 scale (higher = more authority)
- **Total Backlinks**: Number of links pointing to site
- **Referring Domains**: Number of unique sites linking
- **Backlink Quality**: Mix of high-authority vs low-quality links

**Evaluation**:
- **Excellent**: DR 50+, 100+ referring domains, diverse link sources
- **Good**: DR 20-50, 20-100 referring domains
- **Weak**: DR < 20, < 20 referring domains
- **Red Flag**: Spammy backlinks (gambling, adult sites, link farms)

**Common Issues**:
- No backlinks (brand new site or no link building)
- Low-quality backlinks (hurt rankings)
- Competitor has 10x more backlinks
- No local backlinks (Bulgarian business directories)

**Report Template**:
```
### Backlink Profile
- Domain Rating: [X]/100 ([Strong ✅ / Weak ⚠️])
- Total Backlinks: [X] from [Y] domains
- Quality Assessment: [High-quality ✅ / Mixed ⚠️ / Spammy 🚨]

**Comparison**: Top competitor has DR [X], [Y] backlinks
**Quick Win**: Submit site to Bulgarian business directories
```

---

### 4.2 Local SEO & Social Signals (2 minutes)

**Google Business Profile**:
- Search for business name + city (e.g., "SEO Agency Varna")
- **Present**: Business shows in Google Maps
- **Missing**: No local listing (huge missed opportunity)

**Social Media Presence**:
- Facebook, LinkedIn, Instagram business pages
- **Active**: Regular posts (1+ per week)
- **Inactive**: No posts in 6+ months (looks abandoned)

**Online Reviews**:
- Google Reviews, Facebook Reviews, industry directories
- **Good**: 10+ reviews, 4+ star average
- **Warning**: < 5 reviews or < 3.5 stars
- **Critical**: Negative reviews without responses

**Report Template**:
```
### Local & Social SEO
- Google Business Profile: [Claimed ✅ / Missing 🚨]
- Social Media: [Active ✅ / Inactive ⚠️ / Missing 🚨]
- Online Reviews: [X] reviews, [Y] stars ([Good ✅ / Needs Work ⚠️])

**Quick Win**: Claim Google Business Profile, add photos, request 5 reviews
```

---

## SEO Audit Report Template (5-Page PDF)

### PAGE 1: Executive Summary

```
# SEO Audit Report
**Client**: [Company Name]
**Website**: [URL]
**Date**: [Audit Date]
**Prepared By**: Gennadius - AIMarketingBG.com

---

## Overall SEO Score: [X]/100

[Visual Score Graphic: 0-100 scale with color coding]
- 80-100: Excellent ✅
- 60-79: Good ⚠️
- 40-59: Needs Improvement ⚠️
- 0-39: Critical 🚨

---

## Category Scores

| Category | Score | Status |
|----------|-------|--------|
| Technical SEO | [X]/25 | [Icon] |
| On-Page SEO | [X]/25 | [Icon] |
| Content Quality | [X]/25 | [Icon] |
| Off-Page SEO | [X]/25 | [Icon] |

---

## Executive Summary

[2-3 sentence overview of site's SEO health]

**Biggest Opportunity**: [Single most impactful improvement]
**Critical Issue**: [Most urgent problem to fix]
**Competitive Position**: [How site compares to top competitors]
```

---

### PAGE 2: Top 5 Critical Issues

```
## 🚨 Top 5 Critical Issues

### 1. [Issue Name]
**Impact**: [How this hurts rankings and traffic]
**Evidence**: [Specific data from audit]
**Priority**: High / Medium / Low
**Effort**: High / Medium / Low

### 2. [Issue Name]
[Same format]

### 3. [Issue Name]
[Same format]

### 4. [Issue Name]
[Same format]

### 5. [Issue Name]
[Same format]
```

---

### PAGE 3: Quick Wins (3 Easy Improvements)

```
## ✅ 3 Quick Wins (Implement This Week)

### Quick Win #1: [Action]
**What to Do**: [Step-by-step instructions]
**Time Required**: [X] hours
**Expected Impact**: [Improvement in rankings/traffic]
**How to Implement**: [Specific tools or steps]

### Quick Win #2: [Action]
[Same format]

### Quick Win #3: [Action]
[Same format]

---

**Total Implementation Time**: [X] hours
**Estimated ROI**: [Expected traffic/ranking improvement]
```

---

### PAGE 4: Detailed Findings

```
## Detailed Audit Findings

### Technical SEO
[Paste Technical SEO section findings]

### On-Page SEO
[Paste On-Page SEO section findings]

### Content Quality
[Paste Content Quality section findings]

### Off-Page SEO
[Paste Off-Page SEO section findings]
```

---

### PAGE 5: Recommendations & Next Steps

```
## Recommended SEO Strategy

### Immediate Actions (This Month)
1. [Priority 1 task]
2. [Priority 2 task]
3. [Priority 3 task]

### Short-Term Goals (3 Months)
1. [Goal 1 with specific metrics]
2. [Goal 2 with specific metrics]
3. [Goal 3 with specific metrics]

### Long-Term Vision (6-12 Months)
1. [Strategic goal 1]
2. [Strategic goal 2]
3. [Strategic goal 3]

---

## Investment Options

### DIY Implementation
- **Cost**: Your time + tool subscriptions (~€50/month)
- **Timeline**: 3-6 months
- **Recommended For**: Small budgets, technical skills in-house

### Professional SEO Services
- **Entry Package**: €980/month (3-month minimum)
  - Includes: Technical fixes, on-page optimization, monthly reporting
- **Growth Package**: €1,980/month
  - Includes: Everything in Entry + content creation, link building
- **Enterprise Package**: €4,900/month
  - Includes: Everything in Growth + strategy, competitor analysis, conversion optimization

---

## Next Steps

**Ready to Improve Your SEO?**

1. **Free Consultation**: 30-minute strategy call (no obligation)
   - Book: [Calendly link]
   - Email: contact@aimarketingbg.com
   - Phone: +359 88 252 1755

2. **DIY Resources**: Free SEO checklist and guides
   - Download: aimarketingbg.com/resources

3. **Social Media**: Weekly SEO tips and updates
   - Follow: [LinkedIn/Facebook/Instagram links]

---

**About AIMarketingBG**

We help Bulgarian businesses grow organic traffic with AI-powered SEO strategies. Unlike traditional agencies charging €5,000-€10,000/month, we deliver enterprise-grade SEO at SME-friendly pricing.

**Our Expertise**:
- 100+ Bulgarian websites optimized
- Average traffic increase: 240% in 6 months
- Specialization: E-commerce, B2B services, local businesses

**Contact**: contact@aimarketingbg.com | +359 88 252 1755 | aimarketingbg.com
```

---

## Audit Workflow Summary

**1. Initial Contact** (Prospect requests free audit)
- Verify qualification criteria
- Schedule 15-min intake call
- Get website URL, Google Analytics access (optional), GSC access (optional)

**2. Conduct 30-Min Audit** (Use this template)
- Technical SEO: 10 min
- On-Page SEO: 10 min
- Content Quality: 5 min
- Off-Page SEO: 5 min

**3. Generate PDF Report** (15-30 min after audit)
- Fill in template with findings
- Calculate scores
- Add screenshots/visuals
- Export to PDF

**4. Delivery & Follow-Up** (Within 48 hours)
- Email PDF report
- Schedule 30-min review call
- Present findings via screen share
- Discuss service options (Entry/Growth/Enterprise packages)
- Follow up 1 week later if no response

**5. CRM Tracking**
- Log audit completion date
- Track: Did they book consultation? Sign up for services?
- Monthly follow-up: "How's SEO progress? Need help?"

---

## Tips for Conducting Effective Audits

**Before the Audit**:
- Research the business (industry, competitors, location)
- Check Google for site rank: `site:example.com`
- Test site on mobile device

**During the Audit**:
- Take screenshots of issues (visual proof)
- Focus on impact, not just compliance ("This costs you X visitors/month")
- Compare to 1-2 competitors

**After the Audit**:
- Be honest about severity (don't over-sell problems)
- Prioritize fixes (don't overwhelm with 50 issues)
- Emphasize ROI ("Fixing this = +100 visitors/month")

**Delivery Call Best Practices**:
- Start with positive findings
- Present critical issues with data
- Explain quick wins (build confidence)
- Offer 3 service tiers (anchor highest, sell middle)
- No pressure - "Think it over, I'll follow up next week"

---

## Common Questions & Objections

**Q: "Can I just fix this myself?"**
A: "Absolutely! I can send you guides for the technical fixes. Many businesses handle basics in-house and hire us for strategy and content creation."

**Q: "Your competitor quoted €500/month, you're €980"**
A: "We focus on results, not hours. Our clients average 240% traffic growth in 6 months. Ask your other quote what their average client results are."

**Q: "I don't have budget right now"**
A: "No problem. Implement the 3 quick wins I shared, see the impact. We're here when you're ready to scale further."

**Q: "How long until I see results?"**
A: "Technical fixes: 2-4 weeks. On-page optimization: 1-2 months. Backlink growth: 3-6 months. Most clients see measurable improvement by month 3."

**Q: "Do you guarantee first page rankings?"**
A: "No one can guarantee rankings (Google's algorithm changes constantly). We guarantee: monthly reporting, transparent work, and if you don't see improvement by month 6, we'll work for free until you do."

---

**© 2026 AIMarketingBG.com | Free SEO Audit Template**

*Use this template to deliver value, build trust, and convert prospects into clients.*
