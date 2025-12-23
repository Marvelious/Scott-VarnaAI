# Automated Blog Post Publishing

Complete end-to-end automation for blog post creation and publishing to WordPress.

## Overview

This script automates the entire blog publishing workflow:

1. ✅ **AI Content Generation** - OpenAI or Claude generates 2000-word blog post
2. ✅ **WordPress Draft** - Creates draft post via REST API
3. ✅ **Featured Image** - Generates image via Sintra (placeholder for now)
4. ✅ **Categories & Tags** - Sets categories and adds tags automatically
5. ✅ **SEO Optimization** - Configures Rank Math with focus keyword
6. ✅ **Publishing** - Publishes the post automatically

## Setup

### 1. Install Dependencies

```bash
npm install playwright
npx playwright install chromium
```

### 2. Configure Environment Variables

Create `.env` file in the scripts directory:

```bash
# AI Provider (choose one)
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...

# Sintra (for image generation)
SINTRA_API_KEY=your_sintra_key_here
```

### 3. Configure Blog Settings

Edit the script's `BLOG_CONFIG` section:

```javascript
const BLOG_CONFIG = {
  topic: 'AI customer segmentation 2025',  // Your blog topic
  targetWords: 2000,                       // Word count target
  categories: ['AI Technology', 'Marketing Automation'],
  primaryCategory: 'AI Technology',
  tags: [
    'AI customer segmentation',
    'customer segmentation 2025',
    // ... add more tags
  ]
};
```

## Usage

### Basic Usage

```bash
node auto-publish-blog.js
```

### What Happens

1. **AI Generation** (~30 seconds)
   - Generates 2000-word blog post
   - WordPress block format
   - 7 internal links + 3 external DoFollow links
   - 18-22 focus keyword mentions

2. **Draft Creation** (~2 seconds)
   - Creates WordPress draft via REST API
   - Returns Post ID and Edit URL

3. **Browser Automation** (~60 seconds)
   - Logs into WordPress
   - Opens post editor
   - Sets categories (unchecks Uncategorized)
   - Adds all tags
   - Fills Rank Math focus keyword
   - Saves and publishes post

4. **Completion**
   - Returns published URL
   - Shows final SEO score
   - Post is live!

## WordPress Site Configuration

The script is pre-configured for `aimarketingbg.com`.

To use for other sites:

```javascript
const SITE = {
  domain: 'your-site.com',           // Change this
  username: 'YourUsername',           // REST API username
  appPassword: 'xxxx xxxx xxxx xxxx', // Application password
  wpAdminUser: 'YourUsername',        // WP admin username
  wpAdminPass: 'your_password'        // WP admin password
};
```

### Category IDs

Categories are referenced by checkbox ID in WordPress Gutenberg:

- `inspector-checkbox-control-0` - Uncategorized
- `inspector-checkbox-control-1` - AI Technology
- `inspector-checkbox-control-4` - Marketing Automation

**To find your category IDs:**

1. Open post editor in WordPress
2. Click Categories panel
3. Right-click checkbox → Inspect Element
4. Find the `id` attribute (e.g., `inspector-checkbox-control-N`)
5. Update the script with your IDs

## AI Provider Configuration

### OpenAI (Default)

```javascript
const AI_CONFIG = {
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o'
};
```

### Claude

```javascript
const AI_CONFIG = {
  provider: 'claude',
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-3-5-sonnet-20241022'
};
```

## Sintra Integration (TODO)

Featured image generation via Sintra is currently a placeholder. To implement:

1. Get Sintra API endpoint and credentials
2. Update `SINTRA_CONFIG` with actual endpoint
3. Implement `generateFeaturedImage()` function
4. Add Playwright code to upload image to WordPress

## Output Example

```
════════════════════════════════════════════════════════════════════════════════
🤖 AUTOMATED BLOG POST PUBLISHING
════════════════════════════════════════════════════════════════════════════════
Site: aimarketingbg.com
Topic: AI customer segmentation 2025
════════════════════════════════════════════════════════════════════════════════

🤖 Generating blog post content with AI...
   Topic: AI customer segmentation 2025
   Target: 2000 words

✅ AI content generated
   Words: 2043

📝 Generating metadata...
   SEO Title: AI customer segmentation 2025: Revolutionary Guide 2025
   Focus Keyword: ai customer segmentation 2025

📝 Creating draft post via REST API...
✅ Draft created: Post ID 317432
   Edit URL: https://aimarketingbg.com/wp-admin/post.php?post=317432&action=edit

✨ Generating featured image via Sintra...
   Topic: AI customer segmentation 2025
⏭️ Skipping featured image (implement Sintra integration)

🌐 Opening browser for WordPress automation...
🔐 Logging into WordPress...
✅ Logged in

📄 Opening post 317432...
✅ Post editor loaded

🏷️ Setting categories...
✅ Categories set

🔖 Adding tags...
✅ Added 8 tags

🎯 Optimizing Rank Math SEO...
✅ Focus keyword set
📊 SEO Score: 82/100

💾 Saving post...
✅ Post saved

🚀 Publishing post...
✅ Post published!

🔗 Published URL: https://aimarketingbg.com/ai-customer-segmentation-2025/

🛑 Closing browser...

════════════════════════════════════════════════════════════════════════════════
✅ BLOG POST PUBLISHED SUCCESSFULLY!
════════════════════════════════════════════════════════════════════════════════
Post ID: 317432
Topic: AI customer segmentation 2025
Focus Keyword: ai customer segmentation 2025
Categories: AI Technology, Marketing Automation
Tags: 8 tags
View Post: https://aimarketingbg.com/?p=317432
════════════════════════════════════════════════════════════════════════════════
```

## Troubleshooting

### AI API Errors

**Issue**: `OpenAI API error: 401`
**Fix**: Check `OPENAI_API_KEY` in `.env` file

**Issue**: `Claude API error: 400`
**Fix**: Verify `ANTHROPIC_API_KEY` is valid

### WordPress REST API Errors

**Issue**: `Failed to create post: 401`
**Fix**: Generate new Application Password in WordPress:
1. Users → Profile → Application Passwords
2. Create new password
3. Update `SITE.appPassword` in script

### Playwright Errors

**Issue**: `Ref not found` or element not clickable
**Fix**: The script uses JavaScript evaluation to bypass ref issues

**Issue**: Browser doesn't open
**Fix**: Run `npx playwright install chromium`

### Category/Tag Issues

**Issue**: Wrong categories selected
**Fix**: Update category IDs in script (see "Category IDs" section)

**Issue**: Tags not added
**Fix**: Ensure tags panel is visible before adding tags

## Next Steps

1. **Implement Sintra Integration** - Add real image generation
2. **Add Image Caption** - Write caption with focus keyword
3. **Batch Publishing** - Process multiple blog posts in queue
4. **Error Recovery** - Auto-retry on failures
5. **SEO Validation** - Check Rank Math score before publishing

## Manual Workflow for Comparison

**Before automation** (30-40 minutes per post):
1. Write 2000-word blog post
2. Format for WordPress
3. Create draft in WordPress
4. Generate featured image
5. Set categories and tags
6. Configure Rank Math SEO
7. Publish

**After automation** (2-3 minutes):
1. Configure topic in script
2. Run `node auto-publish-blog.js`
3. Done!

## License

MIT
