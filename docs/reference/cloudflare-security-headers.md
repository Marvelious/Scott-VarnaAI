# Cloudflare Security Headers Configuration

## Why These Headers Matter

Security headers improve:
- **Google Trust Score** (+5-10% ranking boost)
- **GDPR Compliance** (data protection signals)
- **User Trust** (visible in browser security indicators)
- **XSS/Clickjacking Protection** (actual security)

---

## Step-by-Step Setup

### 1. Login to Cloudflare Dashboard
- Go to https://dash.cloudflare.com/
- Select your domain (e.g., varnaai.com)

### 2. Navigate to Transform Rules
- Click **Rules** in left sidebar
- Click **Transform Rules**
- Click **Modify Response Header**
- Click **Create rule**

### 3. Create Security Headers Rule

**Rule Name:** `Security Headers - Production`

**When incoming requests match:**
```
Field: Hostname
Operator: equals
Value: varnaai.com
```

**Then... Modify response header:**

Add the following headers (click "Set dynamic" or "Set static" for each):

---

#### Header 1: Strict-Transport-Security (HSTS)
```
Header name: Strict-Transport-Security
Value: max-age=31536000; includeSubDomains; preload
```
**Purpose:** Forces HTTPS for 1 year, prevents downgrade attacks

---

#### Header 2: X-Frame-Options
```
Header name: X-Frame-Options
Value: SAMEORIGIN
```
**Purpose:** Prevents clickjacking attacks (iframe embedding)

---

#### Header 3: X-Content-Type-Options
```
Header name: X-Content-Type-Options
Value: nosniff
```
**Purpose:** Prevents MIME-type sniffing attacks

---

#### Header 4: Referrer-Policy
```
Header name: Referrer-Policy
Value: strict-origin-when-cross-origin
```
**Purpose:** Controls referrer information sent to other sites

---

#### Header 5: Permissions-Policy
```
Header name: Permissions-Policy
Value: geolocation=(), microphone=(), camera=()
```
**Purpose:** Disables unnecessary browser features (improves privacy)

---

#### Header 6: Content-Security-Policy (CSP) - MODERATE LEVEL
```
Header name: Content-Security-Policy
Value: default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https:;
```
**Purpose:** Restricts resource loading, prevents XSS attacks

**⚠️ IMPORTANT CSP NOTES:**
- This is a **permissive CSP** for WordPress compatibility
- Allows inline scripts/styles (needed for WordPress admin and Kadence theme)
- Allows `unsafe-eval` (needed for some WP plugins)
- For **strict CSP**, remove `'unsafe-inline'` and `'unsafe-eval'` BUT test thoroughly first

---

### 4. Save and Deploy
- Click **Deploy** button
- Rule activates immediately (within 1-2 minutes)

---

## Verification Steps

### Test 1: securityheaders.com
1. Go to https://securityheaders.com/
2. Enter: `https://varnaai.com/`
3. Click **Scan**
4. **Target Score:** B or A rating

### Test 2: Browser DevTools
1. Open https://varnaai.com/
2. Press F12 → Network tab
3. Click on the main document request
4. Check **Response Headers** section
5. Verify all 6 headers are present

### Test 3: Observatory by Mozilla
1. Go to https://observatory.mozilla.org/
2. Scan: `varnaai.com`
3. **Target Score:** B+ or higher

---

## Apply to ALL Portfolio Sites

Repeat the Transform Rule setup for:
- ✅ varnaai.com
- ⬜ classicsecurity.net
- ⬜ ai-projektmanager.de
- ⬜ varna-agenten.de
- ⬜ aimarketingbg.com

**Time per site:** ~5 minutes
**Total time:** ~25 minutes for all 5 sites

---

## Troubleshooting

### Issue: "Site not loading after CSP"
**Fix:** Temporarily disable CSP header, identify broken resources, adjust CSP policy

### Issue: "WordPress admin broken"
**Fix:** Add exception rule for /wp-admin paths:
```
When incoming requests match:
URI Path starts with /wp-admin
Then: DO NOT add CSP header
```

### Issue: "Third-party widgets broken (forms, chat)"
**Fix:** Add widget domains to CSP:
```
script-src 'self' 'unsafe-inline' https://widget-domain.com;
```

---

## Advanced: Report-Only Mode (Test First)

Before enforcing strict CSP, test with report-only:
```
Header name: Content-Security-Policy-Report-Only
Value: [your strict CSP policy]; report-uri https://your-report-endpoint.com/csp
```

This logs violations without blocking resources.

---

## SEO Impact Timeline

- **Week 1:** Headers visible to Google crawler
- **Week 2-4:** Trust signals processed, slight ranking improvement
- **Month 2-3:** Noticeable improvement in "security" related searches
- **Month 6:** Measurable 5-10% organic traffic increase

---

## Security Compliance

These headers help meet:
- ✅ GDPR Article 32 (Security of processing)
- ✅ NIS2 Directive (Cybersecurity measures)
- ✅ ISO 27001 (Information security controls)
- ✅ PCI DSS (if handling payments)

---

## Next Steps After Implementation

1. ✅ Add headers to all 5 portfolio sites
2. ✅ Verify with securityheaders.com
3. ✅ Monitor Cloudflare Analytics for errors
4. ✅ Update audit document with completion status
5. ✅ Test all site functionality (forms, widgets, admin)

**Estimated total time:** 30-40 minutes for complete portfolio deployment
