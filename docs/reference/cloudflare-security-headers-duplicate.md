# ABOUTME: Cloudflare Transform Rules configuration for VarnaAI.com security headers
# ABOUTME: Alternative to Apache .htaccess - implement via Cloudflare dashboard

## How to Implement via Cloudflare Dashboard

1. **Login to Cloudflare Dashboard**
2. **Select your domain:** varnaai.com
3. **Navigate to:** Rules → Transform Rules → HTTP Response Header Modification
4. **Click:** "Create rule"
5. **Rule name:** "Security Headers"
6. **When incoming requests match:** Custom filter expression
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `varnaai.com`

7. **Then... Modify response header → Set static:**

Add these 6 headers:

### Header 1: Strict-Transport-Security
```
Header name: Strict-Transport-Security
Value: max-age=63072000; includeSubDomains; preload
```

### Header 2: Content-Security-Policy
```
Header name: Content-Security-Policy
Value: default-src 'self' https: data:; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests
```

### Header 3: X-Content-Type-Options
```
Header name: X-Content-Type-Options
Value: nosniff
```

### Header 4: X-Frame-Options
```
Header name: X-Frame-Options
Value: SAMEORIGIN
```

### Header 5: Referrer-Policy
```
Header name: Referrer-Policy
Value: strict-origin-when-cross-origin
```

### Header 6: Permissions-Policy
```
Header name: Permissions-Policy
Value: camera=(), microphone=(), geolocation=()
```

8. **Click:** "Deploy"

---

## Verification

After implementation, verify headers are working:

**Option A: Browser DevTools**
1. Open varnaai.com in Chrome/Firefox
2. Open DevTools (F12)
3. Go to Network tab
4. Refresh page
5. Click on the main document request
6. Check "Response Headers" section
7. Verify all 6 headers are present

**Option B: Online Tool**
Visit: https://securityheaders.com/?q=https://varnaai.com
- Should show grade A or A+ after implementation

**Option C: curl command**
```bash
curl -I https://varnaai.com | grep -E "(Strict-Transport|Content-Security|X-Content-Type|X-Frame|Referrer-Policy|Permissions-Policy)"
```

---

## Expected Results

Before implementation:
```
❌ No security headers present
Grade: F
```

After implementation:
```
✅ Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
✅ Content-Security-Policy: (full policy)
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: SAMEORIGIN
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Permissions-Policy: camera=(), microphone=(), geolocation=()
Grade: A or A+
```

---

## Troubleshooting

### If CSP breaks functionality:

The `'unsafe-inline'` and `'unsafe-eval'` in the CSP are included to support WordPress plugins. If you still encounter issues:

1. Check browser console for CSP errors
2. Identify which resource is blocked
3. Add specific domains to CSP whitelist

Example: If Google Fonts breaks, modify CSP:
```
font-src 'self' https: data: https://fonts.gstatic.com;
```

### If headers don't appear:

1. **Clear Cloudflare cache:** Purge Everything
2. **Check rule order:** Security headers rule should be first
3. **Verify rule is enabled:** Green toggle in Transform Rules
4. **Check DNS:** Ensure orange cloud (proxy) is enabled

---

## Additional Cloudflare Optimizations

While in Cloudflare dashboard, also enable:

### Speed → Optimization
- ✅ Auto Minify: JavaScript, CSS, HTML
- ✅ Brotli compression
- ✅ Early Hints
- ✅ Rocket Loader (test - may break some plugins)

### Caching → Configuration
- ✅ Caching Level: Standard
- ✅ Browser Cache TTL: 4 hours (or higher for production)
- ✅ Always Online: On

### SSL/TLS
- ✅ SSL/TLS encryption mode: Full (strict)
- ✅ Always Use HTTPS: On
- ✅ Minimum TLS Version: 1.2
- ✅ Automatic HTTPS Rewrites: On

---

## HSTS Preload (Optional - Advanced)

Once HSTS header is stable for 30+ days, submit to browser preload list:

1. Visit: https://hstspreload.org/
2. Enter domain: varnaai.com
3. Check eligibility
4. Submit for preload

**Warning:** Only do this if you're 100% committed to HTTPS forever (irreversible for ~18 months).
