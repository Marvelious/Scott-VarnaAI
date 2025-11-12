# WordPress MCP Server Configuration Guide

**Installation Date**: January 11, 2025
**Location**: `C:\Users\nfals\wordpress-mcp-server`
**Status**: ✅ Installed and built successfully

---

## Installation Summary

```bash
# Cloned from GitHub
git clone https://github.com/stefans71/wordpress-mcp-server.git
cd wordpress-mcp-server

# Installed dependencies
npm install  # 12 packages added

# Built TypeScript
npm run build  # Successful compilation
```

**Build Output**:
- Compiled successfully with TypeScript
- Output directory: `build/`
- Main file: `build/index.js`

---

## Configuration for Claude Code

### 1. Single Site Configuration (Testing)

Add this to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "wordpress-varnaai": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://varnaai.com",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "f87lajs70)fiLXZl5j@1ycZA"
      }
    }
  }
}
```

### 2. Multi-Site Configuration (All 5 Portfolio Sites)

```json
{
  "mcpServers": {
    "wordpress-varnaai": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://varnaai.com",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "f87lajs70)fiLXZl5j@1ycZA"
      }
    },
    "wordpress-classicsecurity": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://classicsecurity.net",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "7E0Gd@NWLG*rAPjue9SghN2r"
      }
    },
    "wordpress-aiprojektmanager": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://ai-projektmanager.de",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "KHBFm8LL6tRqFwhZS8O(RtNx"
      }
    },
    "wordpress-varnaagenten": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://varna-agenten.de",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "6S&15%(V8zCWL2W@1AiEsTzi"
      }
    },
    "wordpress-aimarketingbg": {
      "command": "node",
      "args": ["C:\\Users\\nfals\\wordpress-mcp-server\\build\\index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://aimarketingbg.com",
        "WORDPRESS_USERNAME": "claude",
        "WORDPRESS_APP_PASSWORD": "QJ50uT$ZFdY%vldvV@)!dV6c"
      }
    }
  }
}
```

---

## Available Methods

The WordPress MCP server provides these REST API methods:

### 1. `create_post`
**Purpose**: Create new WordPress posts/pages
**Parameters**:
- `title` (required): Post title
- `content` (required): Post content (HTML)
- `status`: `publish`, `draft`, `pending` (default: `draft`)
- `type`: `post`, `page` (default: `post`)

**Example Usage**:
```javascript
// Create a draft blog post
mcp.wordpress.create_post({
  title: "5 AI-Powered Marketing Strategies for 2025",
  content: "<p>Content here...</p>",
  status: "draft",
  type: "post"
});

// Create a published page
mcp.wordpress.create_post({
  title: "About Us",
  content: "<p>Company information...</p>",
  status: "publish",
  type: "page"
});
```

### 2. `get_posts`
**Purpose**: Retrieve WordPress posts/pages
**Parameters**:
- `per_page`: Number of posts to retrieve (default: 10)
- `status`: Filter by status (`publish`, `draft`, etc.)
- `type`: Filter by type (`post`, `page`)

**Example Usage**:
```javascript
// Get latest 5 published posts
mcp.wordpress.get_posts({
  per_page: 5,
  status: "publish",
  type: "post"
});

// Get all draft pages
mcp.wordpress.get_posts({
  per_page: 100,
  status: "draft",
  type: "page"
});
```

### 3. `update_post`
**Purpose**: Update existing WordPress posts/pages
**Parameters**:
- `id` (required): Post ID to update
- `title`: New title
- `content`: New content
- `status`: New status

**Example Usage**:
```javascript
// Publish a draft post
mcp.wordpress.update_post({
  id: 317163,
  status: "publish"
});

// Update post content
mcp.wordpress.update_post({
  id: 317163,
  title: "Updated Title",
  content: "<p>Updated content...</p>"
});
```

---

## Use Cases for Backlink Strategy

### 1. Guest Post Creation
**Workflow**: Research → Draft → Publish
```javascript
// 1. Research topic with Tavily
tavily.search("German AI compliance best practices 2025");

// 2. Create draft guest post
wordpress.create_post({
  title: "DSGVO-Konforme KI-Implementierung: 5 Best Practices für 2025",
  content: "<article>...</article>",
  status: "draft",
  type: "post"
});

// 3. Review and publish
wordpress.update_post({
  id: post_id,
  status: "publish"
});
```

### 2. Directory Submission Support Pages
**Purpose**: Create landing pages for directory submissions
```javascript
// Create "About Us" page for directory profiles
wordpress.create_post({
  title: "About VarnaAI - GDPR-Compliant AI Solutions",
  content: "<p>VarnaAI provides...</p>",
  status: "publish",
  type: "page"
});

// Create "Services" page
wordpress.create_post({
  title: "AI Services - Enterprise Solutions",
  content: "<ul><li>AI Strategy...</li></ul>",
  status: "publish",
  type: "page"
});
```

### 3. Case Study Automation
**Purpose**: Bulk-create anonymized case studies
```javascript
// Loop through CV projects and create case studies
const projects = [
  { industry: "Automotive", project: "Firewall Migration", result: "45% faster" },
  { industry: "Banking", project: "Infrastructure Modernization", result: "99.9% uptime" },
  // ... more projects
];

projects.forEach(project => {
  wordpress.create_post({
    title: `Case Study: ${project.industry} ${project.project}`,
    content: generateCaseStudyHTML(project),
    status: "draft",
    type: "post"
  });
});
```

### 4. Blog Content Calendar
**Purpose**: Schedule SEO-optimized blog posts
```javascript
// Batch-create blog posts for content calendar
const topics = [
  "NIS2 Compliance Deadlines 2025",
  "EU AI Act Implementation Guide",
  "DSGVO Updates for SMEs"
];

topics.forEach(topic => {
  wordpress.create_post({
    title: topic,
    content: generateSEOContent(topic),
    status: "draft",
    type: "post"
  });
});
```

---

## Integration with Other MCP Servers

### Workflow 1: Research → Create → Track
```
1. Tavily: Research German compliance requirements
2. WordPress MCP: Create blog post about findings
3. Google Search Console MCP: Track organic traffic
4. SEO Inspector MCP: Audit post for SEO compliance
```

### Workflow 2: Directory Submission → Content Creation
```
1. Playwright MCP: Submit to business directory
2. WordPress MCP: Create "Portfolio" page showcasing submission
3. SEO Inspector MCP: Verify page optimization
4. Google Search Console MCP: Monitor backlink acquisition
```

### Workflow 3: Case Study Pipeline
```
1. Read CV experience from markdown files
2. Anonymize company/client names (use generic terms)
3. WordPress MCP: Create case study draft
4. SEO Inspector MCP: Optimize for keywords
5. WordPress MCP: Publish after review
```

---

## Security Considerations

### Application Passwords (Recommended)
WordPress MCP uses **Application Passwords** (available in WordPress 5.6+):
- More secure than regular passwords
- Can be revoked without changing main password
- Scoped to REST API access only

### Generate Application Password:
1. Login to WordPress admin
2. Navigate to: Users → Profile
3. Scroll to "Application Passwords" section
4. Enter name: "Claude Code MCP"
5. Click "Add New Application Password"
6. Copy generated password (format: `xxxx xxxx xxxx xxxx xxxx xxxx`)
7. Remove spaces and use in MCP configuration

### Current Credentials:
The provided passwords in CLAUDE.md appear to be regular passwords, not application passwords. Recommend generating proper application passwords for each site.

---

## Testing Results (January 11, 2025)

### ✅ Test 1: Authentication (PASSED)
```bash
curl -u "claude:f87lajs70)fiLXZl5j@1ycZA" \
  https://varnaai.com/wp-json/wp/v2/posts?per_page=1
```
**Result**: Authentication successful, retrieved latest post (ID: 317158)

### ✅ Test 2: Get Posts (PASSED)
**Result**: Successfully retrieved post data including title, content, categories, tags

### ❌ Test 3: Create Page (FAILED - PERMISSIONS)
```bash
curl -X POST -u "claude:f87lajs70)fiLXZl5j@1ycZA" \
  -d '{"title":"Test","content":"Test","status":"draft","type":"page"}' \
  https://varnaai.com/wp-json/wp/v2/pages
```
**Error**: `rest_cannot_create` - "Sorry, you are not allowed to create posts as this user."
**Cause**: `claude` user lacks permission to create pages via REST API

### Required Permission Fix

**Option 1: Upgrade User Role (Recommended)**
1. Login to WordPress admin: https://varnaai.com/wp-admin/
2. Navigate to: Users → All Users
3. Find user: `claude`
4. Change role from **"Subscriber"** to **"Editor"** or **"Administrator"**
5. Save changes

**Option 2: Add Custom Capability (Advanced)**
Add this to `functions.php` or via plugin:
```php
// Allow claude user to create pages via REST API
$user = get_user_by('login', 'claude');
$user->add_cap('edit_pages');
$user->add_cap('publish_pages');
$user->add_cap('edit_posts');
$user->add_cap('publish_posts');
```

### Current User Capabilities (Detected)
- ✅ Can authenticate via REST API
- ✅ Can read posts/pages
- ❌ Cannot create posts/pages (likely Subscriber role)
- ❌ Cannot edit posts/pages (likely Subscriber role)

### Testing Checklist (Updated)

- [x] Test `get_posts` to retrieve recent posts - **PASSED**
- [x] Verify REST API authentication works - **PASSED**
- [ ] **Fix permissions** - Upgrade `claude` user role to Editor/Administrator
- [ ] Test `create_post` on VarnaAI (create draft page) - **BLOCKED BY PERMISSIONS**
- [ ] Test `update_post` to publish draft - **BLOCKED BY PERMISSIONS**
- [ ] Test error handling (invalid post ID, etc.)
- [ ] Verify multi-site configuration (all 5 sites)

---

## Troubleshooting

### Common Issues

**1. Authentication Failed**
```
Error: 401 Unauthorized
```
**Fix**:
- Verify username is correct (`claude`)
- Check password is exact match from CLAUDE.md
- Consider generating Application Password

**2. REST API Disabled**
```
Error: REST API not accessible
```
**Fix**:
- Check if REST API is enabled (should be by default)
- Verify no security plugins blocking REST API

**3. Insufficient Permissions**
```
Error: 403 Forbidden
```
**Fix**:
- Verify `claude` user has Editor or Administrator role
- Check user can create/edit posts in WordPress admin

**4. Invalid Post Type**
```
Error: Invalid post type
```
**Fix**:
- Use `post` or `page` only
- Custom post types may require additional configuration

---

## Next Steps

1. **Configuration**: Add WordPress MCP to Claude Code settings
2. **Testing**: Run test operations on VarnaAI site
3. **Validation**: Verify all 5 sites can be accessed
4. **Integration**: Combine with Tavily for content research
5. **Automation**: Create directory submission support pages
6. **Backlinks**: Generate guest post content for link building

---

## Cost Analysis

| Feature | WordPress MCP | Manual Process | Savings |
|---------|--------------|----------------|---------|
| Installation | FREE | N/A | €0 |
| API Access | FREE (WordPress REST API) | N/A | €0 |
| Automation | FREE | Manual posting (10 min/post) | 80% time savings |
| Multi-Site | FREE | Repeat process 5x | 500% efficiency gain |
| **Total** | **€0** | Manual labor | **Massive time savings** |

**Comparison to Paid Alternatives**:
- WordPress Automation Plugin: €20-50/month ❌
- Content Management Platform: €100-300/month ❌
- Manual Content Creation: 10 minutes per post × 50 posts = 500 minutes ❌

**WordPress MCP Value**: Automate content creation across 5 sites with zero cost

---

**Created**: January 11, 2025
**Last Updated**: January 11, 2025
**Status**: Ready for configuration and testing
