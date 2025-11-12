# 🔑 API Keys Setup Guide

**Priority Order**: Get these API keys in this exact order for fastest implementation.

---

## 🚨 **TIER 1: Critical (Required to Start)**

### 1. MailChimp API Key ⭐⭐⭐
**Get it from**: https://mailchimp.com/account/api/
**Time**: 5 minutes
**Cost**: FREE (up to 500 contacts)

**Steps**:
1. Log in to MailChimp
2. Go to Account → Extras → API keys
3. Click "Create A Key"
4. Copy the API key (format: `abc123def456-us19`)
5. Server prefix is the part after the dash (e.g., `us19`)

**Add to .env**:
```env
MAILCHIMP_API_KEY=abc123def456-us19
MAILCHIMP_SERVER_PREFIX=us19
```

**Next**: Create 5 audience lists (one per website) and get their IDs:
- Go to Audience → All contacts → Settings → Audience name and defaults
- Copy "Audience ID" for each list

```env
MAILCHIMP_LIST_AI_PROJEKT=abc123
MAILCHIMP_LIST_AI_MARKETING=def456
MAILCHIMP_LIST_SECURITY=ghi789
MAILCHIMP_LIST_AGENTEN=jkl012
MAILCHIMP_LIST_VARNAAI=mno345
```

---

### 2. Facebook Pixel IDs ⭐⭐⭐
**Get it from**: https://business.facebook.com/events_manager
**Time**: 10 minutes
**Cost**: FREE

**Steps**:
1. Go to Events Manager
2. Click "Connect Data Sources" → "Web" → "Facebook Pixel"
3. Create 5 pixels (one per website):
   - ai-projektmanager-pixel
   - aimarketingbg-pixel
   - classicsecurity-pixel
   - varna-agenten-pixel
   - varnaai-pixel
4. Copy each Pixel ID (15-digit number)

**Add to .env**:
```env
FACEBOOK_PIXEL_AI_PROJEKT=123456789012345
FACEBOOK_PIXEL_AI_MARKETING=234567890123456
FACEBOOK_PIXEL_SECURITY=345678901234567
FACEBOOK_PIXEL_AGENTEN=456789012345678
FACEBOOK_PIXEL_VARNAAI=567890123456789
```

---

### 3. Google Analytics 4 IDs ⭐⭐⭐
**Get it from**: https://analytics.google.com/
**Time**: 15 minutes
**Cost**: FREE

**Steps**:
1. Go to Admin → Create Property
2. Create 5 properties (one per website)
3. Create Web Data Stream for each
4. Copy Measurement ID (format: `G-XXXXXXXXXX`)

**Add to .env**:
```env
GA4_AI_PROJEKT=G-ABC1234567
GA4_AI_MARKETING=G-DEF2345678
GA4_SECURITY=G-GHI3456789
GA4_AGENTEN=G-JKL4567890
GA4_VARNAAI=G-MNO5678901
```

---

## 🟡 **TIER 2: Important (Add Within Week 1)**

### 4. Buffer Access Token ⭐⭐
**Get it from**: https://buffer.com/developers/api
**Time**: 10 minutes
**Cost**: FREE (3 profiles) or $15/month (Pro)

**Steps**:
1. Sign up at buffer.com
2. Go to Account → Developers → Access Token
3. Click "Create Access Token"
4. Connect 3 social profiles per brand (LinkedIn, Facebook, Twitter)
5. Get profile IDs from Buffer dashboard URL

**Add to .env**:
```env
BUFFER_ACCESS_TOKEN=1/abc123def456

# Profile IDs (from URL: buffer.com/app/profile/[ID])
BUFFER_PROFILE_AI_PROJEKT_LINKEDIN=5f8a9b1c2d3e4f
BUFFER_PROFILE_AI_PROJEKT_FACEBOOK=6g9b0c2d3e4f5g
BUFFER_PROFILE_AI_PROJEKT_TWITTER=7h0c1d3e4f5g6h
# ... (repeat for all 5 brands × 3 platforms = 15 profile IDs)
```

---

### 5. Microsoft Clarity ⭐⭐
**Get it from**: https://clarity.microsoft.com/
**Time**: 5 minutes per site
**Cost**: FREE

**Steps**:
1. Sign up with Microsoft account
2. Click "Add new project"
3. Create 5 projects (one per website)
4. Copy Project ID (alphanumeric string)

**Add to .env**:
```env
CLARITY_AI_PROJEKT=abc123def
CLARITY_AI_MARKETING=ghi456jkl
CLARITY_SECURITY=mno789pqr
CLARITY_AGENTEN=stu012vwx
CLARITY_VARNAAI=yza345bcd
```

---

## 🟢 **TIER 3: Optional (Add When Scaling)**

### 6. Facebook Conversions API (CAPI) ⭐
**Get it from**: https://business.facebook.com/settings/system-users
**Time**: 15 minutes
**Cost**: FREE
**When**: After Week 1, when forms are working

**Steps**:
1. Go to Business Settings → System Users
2. Create system user: "Marketing Automation"
3. Add to pixel: Business Settings → Data Sources → Pixels → Add People
4. Generate access token with `ads_management` permission
5. Token is long-lived (60 days)

**Add to .env**:
```env
FACEBOOK_ACCESS_TOKEN=EAAG...very_long_token...xyz
```

---

### 7. GA4 Measurement Protocol ⭐
**Get it from**: https://analytics.google.com/
**Time**: 5 minutes
**Cost**: FREE
**When**: After Week 1, for server-side tracking

**Steps**:
1. Go to Admin → Data Streams → Web stream
2. Expand "Measurement Protocol API secrets"
3. Click "Create"
4. Name it "Marketing Server"
5. Copy API secret

**Add to .env**:
```env
GA4_MEASUREMENT_ID=G-ABC1234567  # (your main property)
GA4_API_SECRET=abc123DEF456xyz
```

---

### 8. LinkedIn Insight Tag (B2B only) ⭐
**Get it from**: https://www.linkedin.com/campaignmanager
**Time**: 5 minutes per site
**Cost**: FREE
**When**: Week 2, for B2B sites only

**Applicable sites**:
- ai-projektmanager.de (German B2B)
- classicsecurity.net (English B2B)
- varnaai.com (English B2B)

**Steps**:
1. Go to Campaign Manager → Account Assets → Insight Tag
2. Create 3 tags (one per B2B site)
3. Copy Partner ID (7-digit number)

**Add to .env**:
```env
LINKEDIN_AI_PROJEKT=1234567
LINKEDIN_SECURITY=2345678
LINKEDIN_VARNAAI=3456789
```

---

### 9. HubSpot CRM ⭐
**Get it from**: https://app.hubspot.com/
**Time**: 10 minutes
**Cost**: FREE (Starter CRM)
**When**: Month 2, when you have 100+ leads

**Steps**:
1. Sign up for HubSpot CRM
2. Go to Settings → Integrations → Private Apps
3. Create app: "Marketing Automation"
4. Enable scopes: `crm.objects.contacts.write`, `crm.objects.contacts.read`
5. Generate access token

**Add to .env**:
```env
HUBSPOT_ACCESS_TOKEN=pat-na1-abc123...
HUBSPOT_PORTAL_ID=12345678
```

---

### 10. Zapier Webhooks ⭐
**Get it from**: https://zapier.com/
**Time**: 5 minutes per workflow
**Cost**: FREE (up to 5 Zaps)
**When**: Week 1, after forms are working

**Steps**:
1. Create Zap with "Webhooks by Zapier" trigger
2. Choose "Catch Hook"
3. Copy webhook URL (format: `https://hooks.zapier.com/hooks/catch/12345/abcde/`)
4. Use in workflows (blog → social, form → CRM)

**Add to .env**:
```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/12345/abcde/
```

---

## ⚡ **Quick Setup Order**

### Day 1 (30 minutes)
1. ✅ MailChimp API key + 5 audience lists
2. ✅ Facebook Pixel IDs (5 pixels)
3. ✅ Google Analytics 4 IDs (5 properties)

**Result**: Tracking works, forms capture emails

### Day 2 (20 minutes)
4. ✅ Buffer access token + 15 profile IDs
5. ✅ Microsoft Clarity (5 projects)

**Result**: Social automation works, heatmaps recording

### Week 1 (30 minutes)
6. ✅ Facebook CAPI token
7. ✅ GA4 Measurement Protocol
8. ✅ LinkedIn Insight Tags (B2B only)
9. ✅ Zapier webhooks

**Result**: Server-side tracking, automation workflows active

### Month 2 (Optional)
10. ✅ HubSpot CRM
11. ✅ Slack notifications
12. ✅ Calendly booking

**Result**: Full CRM integration, sales notifications

---

## 📋 **Checklist**

Print this and check off as you go:

**Day 1 (Critical):**
- [ ] MailChimp API key
- [ ] 5 MailChimp audience lists created
- [ ] 5 Facebook Pixel IDs
- [ ] 5 Google Analytics 4 Measurement IDs

**Day 2 (Important):**
- [ ] Buffer access token
- [ ] 15 Buffer profile IDs (5 sites × 3 platforms)
- [ ] 5 Microsoft Clarity project IDs

**Week 1 (Server-Side):**
- [ ] Facebook CAPI access token
- [ ] GA4 Measurement Protocol API secret
- [ ] 3 LinkedIn Insight Tag Partner IDs (B2B sites)
- [ ] Zapier webhook URLs

**Month 2 (Scaling):**
- [ ] HubSpot access token
- [ ] Slack webhook URL
- [ ] Calendly API key

---

## 🚀 **Once All Keys Are Added**

1. **Save config/.env** with all API keys
2. **Start server**: `npm start`
3. **Test forms**: Submit test email on one website
4. **Verify**:
   - Email received in MailChimp
   - Lead magnet delivery email sent
   - Conversion tracked in GA4
   - Facebook Pixel fired

---

## 🆘 **Troubleshooting**

**MailChimp API Error**:
- Verify API key is correct (check for typos)
- Ensure server prefix matches key suffix
- Check audience IDs are correct

**Facebook Pixel Not Firing**:
- Install "Facebook Pixel Helper" Chrome extension
- Verify pixel ID in JavaScript code
- Clear browser cache

**GA4 Not Tracking**:
- Install "GA Debugger" Chrome extension
- Verify Measurement ID format (must start with "G-")
- Check events in GA4 Realtime report (wait 5 minutes)

**Buffer API Error**:
- Verify access token hasn't expired
- Check profile IDs match actual Buffer profiles
- Ensure social accounts are still connected

---

**Questions?** Check README.md for detailed setup instructions or QUICKSTART.md for 2-hour implementation guide.
