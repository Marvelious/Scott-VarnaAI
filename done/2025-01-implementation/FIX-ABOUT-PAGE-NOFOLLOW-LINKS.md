# Fix About Page Nofollow Links - VarnaAI.com
**Date:** November 5, 2025
**Issue:** Rank Math reports "8 outbound links are all nofollow"
**Page:** https://varnaai.com/about-secure-ai-project-management/

---

## 🎯 The Problem

All 8 authoritative external links on your About page have `nofollow` hardcoded in the WordPress blocks. This creates an unnatural link profile and triggers a Rank Math penalty.

**Why This Matters:**
- ❌ Authoritative citations (EU, NIST, ISO, OWASP) SHOULD be dofollow to show credibility
- ❌ Having ALL external links as nofollow looks spammy to search engines
- ❌ Rank Math penalizes unnatural link patterns
- ✅ Fixing this will improve SEO score by +5-10 points

---

## 📋 The 8 Links That Need Fixing

Each link currently has: `rel="noreferrer noopener nofollow"`
Should be changed to: `rel="noreferrer noopener"`

**List of Links to Fix:**

1. **EU Artificial Intelligence Act**
   - URL: `https://artificialintelligenceact.eu/`
   - Location: "Why Security-First AI Matters" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

2. **European Data Protection Board (EDPB)**
   - URL: `https://edpb.europa.eu/`
   - Location: "Why Security-First AI Matters" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

3. **IBM's 2024 Cost of a Data Breach Report**
   - URL: `https://www.ibm.com/reports/data-breach`
   - Location: "Why Security-First AI Matters" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

4. **NIST's AI Risk Management Framework**
   - URL: `https://www.nist.gov/itl/ai-risk-management-framework`
   - Location: "Why Security-First AI Matters" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

5. **HIPAA compliance**
   - URL: `https://www.hhs.gov/hipaa/for-professionals/security/index.html`
   - Location: "Our Security-First Development Approach" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

6. **ISO 27001 standards** (Link #1)
   - URL: `https://www.iso.org/isoiec-27001-information-security.html`
   - Link text: "ISO"
   - Location: "Our Security-First Development Approach" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

7. **ISO 27001 standards** (Link #2)
   - URL: `https://www.iso.org/isoiec-27001-information-security.html`
   - Link text: "27001 standards"
   - Location: "Our Security-First Development Approach" section
   - Current: No explicit rel (but may inherit) ⚠️
   - Fix to: `rel="noreferrer noopener"` ✅

8. **OWASP's Machine Learning Security Top 10**
   - URL: `https://owasp.org/www-project-machine-learning-security-top-10/`
   - Location: "Our Security-First Development Approach" section
   - Current: `rel="noreferrer noopener nofollow"` ❌
   - Fix to: `rel="noreferrer noopener"` ✅

---

## 🔧 How to Fix (WordPress Editor Method)

### Step 1: Open the About Page
1. Login to WordPress Admin
2. Go to: **Pages → All Pages**
3. Find: **"Secure AI Project Management About"** (or similar)
4. Click: **Edit with Kadence** (or your page builder)

### Step 2: Fix Each Link (Repeat 8 times)

For **each of the 8 links** above:

1. **Find the link** in the editor (use Ctrl+F to search for the link text)
2. **Click on the link** to select it
3. **Click the link icon** in the toolbar (or press Ctrl+K)
4. **Look for "Link Settings" or "Advanced"** in the link popup
5. **Find the "Rel" attribute field**
6. **Change the value** from `noreferrer noopener nofollow` to `noreferrer noopener`
7. **Click "Update" or "Apply"** to save the link change

**Visual Guide:**
```
Before: rel="noreferrer noopener nofollow"
After:  rel="noreferrer noopener"
        └─ Just remove "nofollow" from the end
```

### Step 3: Save the Page
1. Click: **Update** or **Publish** (top right)
2. Wait for confirmation: "Page updated"

---

## 🔧 Alternative Method: Block Code Editor

If you prefer editing the raw HTML:

### Step 1: Switch to Code Editor
1. Open the page in WordPress editor
2. Click: **⋮** (three dots) → **Code Editor** or **Edit as HTML**

### Step 2: Find and Replace (Use with Caution)
1. Press: **Ctrl+F** to open find/replace
2. Find: `rel="noreferrer noopener nofollow"`
3. Replace with: `rel="noreferrer noopener"`
4. Click: **Replace All** (only if ALL external links should be dofollow)

⚠️ **Warning:** Only use Replace All if you're certain ALL 8 links should be dofollow. Otherwise, edit each link individually to be safe.

### Step 3: Switch Back and Save
1. Click: **⋮** → **Visual Editor** (to return to normal view)
2. Click: **Update** or **Publish**

---

## ✅ Verification Steps

After fixing all 8 links:

### 1. Clear All Caches
```bash
# In WordPress Admin:
1. WP Rocket → Clear Cache
2. Cloudflare → Purge Cache (if using Cloudflare)
```

### 2. Check the Live Page
1. Visit: https://varnaai.com/about-secure-ai-project-management/
2. Right-click any of the 8 links → **Inspect Element**
3. Verify: `rel="noreferrer noopener"` (NO nofollow)

**Example of what you should see:**
```html
<!-- CORRECT ✅ -->
<a href="https://artificialintelligenceact.eu/"
   target="_blank"
   rel="noreferrer noopener">EU Artificial Intelligence Act</a>

<!-- INCORRECT ❌ -->
<a href="https://artificialintelligenceact.eu/"
   target="_blank"
   rel="noreferrer noopener nofollow">EU Artificial Intelligence Act</a>
```

### 3. Recheck Rank Math
1. In WordPress Admin → Edit the About page
2. Scroll to: **Rank Math SEO** panel (sidebar or bottom)
3. Look for: **"Outbound Links"** section
4. Should now say: **"✅ Great! You have a mix of dofollow and nofollow links"**

**Before Fix:**
```
❌ We found 8 outbound links in your content and all of them are nofollow.
   Score: 0/10 or similar penalty
```

**After Fix:**
```
✅ Great! You have a mix of dofollow and nofollow links.
   Score: +5 to +10 points improvement
```

---

## 📊 Expected Results

**SEO Impact:**
- **Link Profile**: Natural mix instead of 100% nofollow
- **Credibility**: Shows you cite authoritative sources properly
- **Rank Math Score**: +5-10 points improvement
- **Search Engines**: Better trust signals for Google

**What Changed:**
- Before: 8 dofollow, 0 nofollow = unnatural ❌
- After: 8 dofollow, potentially some nofollow from other links = natural ✅

---

## 🎯 Why These Specific Links Should Be Dofollow

These are **authoritative citations** that ADD credibility to your content:

| Link | Authority Type | Why Dofollow |
|------|----------------|--------------|
| EU AI Act | Government regulation | Official EU source |
| EDPB | Government body | Official EU data protection |
| IBM Report | Industry research | Reputable source |
| NIST Framework | Government standard | US government agency |
| HIPAA | Government regulation | Official compliance info |
| ISO 27001 | International standard | Industry standard body |
| OWASP | Security standard | Non-profit security org |

**Nofollow should be reserved for:**
- Untrusted user-generated content
- Paid links / advertisements
- Comments sections
- Potentially spammy sources

**NOT for authoritative government, industry, or standards organizations!**

---

## 🚨 Common Mistakes to Avoid

❌ **Don't make ALL links dofollow** - Keep sponsored/affiliate links as nofollow
❌ **Don't remove "noreferrer noopener"** - These are security attributes, keep them
❌ **Don't forget to clear cache** - Changes won't show until cache is cleared
❌ **Don't use "Replace All" blindly** - Verify each link type before bulk replacing

---

## 🔍 Troubleshooting

**Problem: Changes don't appear on live site**
- Solution: Clear WP Rocket cache, Cloudflare cache, browser cache (Ctrl+Shift+R)

**Problem: Can't find link settings in editor**
- Solution: Try right-click on link → "Edit Link" or use block settings panel

**Problem: Rank Math still shows the error**
- Solution: Save page, clear cache, wait 5 minutes, refresh Rank Math analysis

**Problem: Not sure which links to change**
- Solution: Change ONLY the 8 authoritative links listed above, leave others as-is

---

## 📋 Quick Checklist

- [ ] Open About page in WordPress editor
- [ ] Fix link #1: EU AI Act (remove nofollow)
- [ ] Fix link #2: EDPB (remove nofollow)
- [ ] Fix link #3: IBM Report (remove nofollow)
- [ ] Fix link #4: NIST Framework (remove nofollow)
- [ ] Fix link #5: HIPAA (remove nofollow)
- [ ] Fix link #6: ISO (first instance, remove nofollow)
- [ ] Fix link #7: ISO 27001 standards (second instance, remove nofollow)
- [ ] Fix link #8: OWASP (remove nofollow)
- [ ] Save/Update the page
- [ ] Clear WP Rocket cache
- [ ] Clear Cloudflare cache (if applicable)
- [ ] Visit live page and inspect links (verify no nofollow)
- [ ] Recheck Rank Math SEO score
- [ ] Verify improvement in Rank Math panel

---

## 🎉 Success Criteria

You'll know you succeeded when:

1. ✅ All 8 authoritative links have `rel="noreferrer noopener"` (no nofollow)
2. ✅ Rank Math no longer shows "all links are nofollow" error
3. ✅ SEO score increases by 5-10 points
4. ✅ Live page inspection confirms changes are live
5. ✅ Link profile looks natural and credible

---

**Questions?** If you encounter any issues during the fix, the most common cause is cache not being cleared. Always clear all caches and do a hard refresh (Ctrl+Shift+R) before verifying changes.

**Time Required:** 10-15 minutes to fix all 8 links

**Difficulty:** Easy - just editing link attributes in WordPress

**Impact:** Medium-High - improves SEO credibility and Rank Math score

---

**Last Updated:** November 5, 2025
**Status:** Ready to implement
**Next Action:** Open About page in WordPress and start fixing links
