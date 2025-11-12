# WordPress Application Password Setup Guide

**Issue**: Regular WordPress password doesn't work with REST API authentication
**Solution**: Generate Application Passwords for REST API access

---

## Why Application Passwords?

WordPress 5.6+ introduced **Application Passwords** for REST API authentication. Even if the `claude` user is an Administrator, regular passwords may not work for REST API write operations (POST, PUT, DELETE).

**Current Behavior**:
- ✅ GET requests work (read posts)
- ❌ POST requests fail with "not allowed to create posts"
- ❌ User info endpoint says "not logged in"

This indicates authentication is partial - reading works but writing doesn't.

---

## How to Generate Application Password (5 Minutes Per Site)

### Step 1: Login to WordPress Admin
- URL: https://varnaai.com/wp-admin/
- Use your main admin account (not claude account)

### Step 2: Navigate to User Profile
1. Hover over your username in top-right corner
2. Click "Edit Profile" OR
3. Go to: Users → All Users → Click "claude" user

### Step 3: Scroll to "Application Passwords" Section
- Should be near bottom of profile page
- If you don't see it, Application Passwords might be disabled

### Step 4: Generate New Application Password
1. In "New Application Password Name" field, enter: **Claude Code MCP**
2. Click "Add New Application Password" button
3. WordPress generates a password like: `xxxx xxxx xxxx xxxx xxxx xxxx`
4. **COPY THIS PASSWORD IMMEDIATELY** (you can't see it again)

### Step 5: Format the Password
- Remove all spaces from the generated password
- Example: `abcd 1234 efgh 5678` → `abcd1234efgh5678`

### Step 6: Update CLAUDE.md Credentials
Replace the current password with the new application password:

**Before**:
```
| Varna AI | https://varnaai.com/wp-admin/ | claude | f87lajs70)fiLXZl5j@1ycZA |
```

**After** (with application password):
```
| Varna AI | https://varnaai.com/wp-admin/ | claude | abcd1234efgh5678 |
```

### Step 7: Repeat for All 5 Sites
- varnaai.com ← START HERE
- classicsecurity.net
- ai-projektmanager.de
- varna-agenten.de
- aimarketingbg.com

---

## What If I Don't See "Application Passwords"?

### Option 1: Check WordPress Version
Application Passwords require WordPress 5.6+. Check version:
1. Dashboard → Updates
2. Look for "WordPress X.X.X" at top

### Option 2: Check if HTTPS is Enabled
Application Passwords require HTTPS:
- Your sites use HTTPS ✅ (https://varnaai.com)

### Option 3: Check if REST API is Enabled
Some security plugins disable Application Passwords:
1. Check if you have security plugins (Wordfence, iThemes Security, etc.)
2. Look for "Application Passwords" or "REST API" settings
3. Ensure REST API write operations are enabled

---

## Testing After Setup

Once you've generated application passwords for varnaai.com, I'll test again:

```bash
curl -X POST -u "claude:NEW_APP_PASSWORD_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"TEST","content":"Test","status":"draft"}' \
  https://varnaai.com/wp-json/wp/v2/posts
```

**Expected Result**: Draft post created successfully!

---

## Security Benefits

**Why Application Passwords Are Better**:
1. **Revocable**: Can delete without changing main password
2. **Scoped**: Only works for REST API, not admin login
3. **Auditable**: Can see which applications are connected
4. **Multiple**: Can create separate passwords for different tools

---

## Alternative: Use Playwright for Now

**If Application Passwords don't work**, we can use Playwright MCP to automate WordPress admin interface instead of REST API:

```javascript
// Login to WordPress admin
await page.goto('https://varnaai.com/wp-admin/');
await page.fill('#user_login', 'claude');
await page.fill('#user_pass', 'f87lajs70)fiLXZl5j@1ycZA');
await page.click('#wp-submit');

// Create new post
await page.goto('https://varnaai.com/wp-admin/post-new.php');
await page.fill('#title', 'New Post Title');
// ... etc
```

But REST API is **much faster** and cleaner than browser automation.

---

## Next Steps

1. **Big Dick**: Generate Application Password for `claude` user on varnaai.com
2. **Big Dick**: Send me the new application password (or update CLAUDE.md)
3. **Claude**: Test REST API with new password
4. **Claude**: If successful, repeat for other 4 sites
5. **Claude**: Update all MCP configuration with new passwords

---

**Created**: January 11, 2025
**Status**: Waiting for Application Password generation
