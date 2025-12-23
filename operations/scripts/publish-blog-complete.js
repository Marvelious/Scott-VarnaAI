#!/usr/bin/env node

/**
 * Complete Blog Publishing Automation with Playwright
 *
 * Workflow:
 * 1. Create draft post via REST API (title + content only)
 * 2. Open browser and login to WordPress admin
 * 3. Navigate to post edit page
 * 4. Open Rank Math SEO panel
 * 5. Fill focus keyword
 * 6. Wait for Rank Math to analyze
 * 7. Publish the post
 * 8. Verify post is live
 */

const https = require('https');
const fs = require('fs');
const { chromium } = require('playwright');

// Configuration
const SITE = {
  domain: 'aimarketingbg.com',
  username: 'BigDick',
  appPassword: 'JcVk zSSU 3sgF K1wR TcXC s2Au',
  wpAdminUser: 'BigDick',
  wpAdminPass: 'QJ50uT$ZFdY%vldvV@)!dV6c'
};

const BLOG_POST_FILE = 'D:/VarnaAI/Websites/blogs/archive/2025-12-02/aimarketingbg/AIMarketingBG_Marketing_Mix_Modeling_2025.md';

/**
 * Extract metadata and content from blog post file
 */
function parseBlogPost(content) {
  const metadata = {};

  // Extract SEO Title
  const seoTitleMatch = content.match(/\*\*SEO Title:\*\*\s*(.+)/);
  metadata.seoTitle = seoTitleMatch ? seoTitleMatch[1].trim() : '';

  // Extract Meta Description
  const metaDescMatch = content.match(/\*\*Meta Description:\*\*\s*(.+)/);
  metadata.metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Extract Focus Keyword
  const focusKeywordMatch = content.match(/\*\*Focus Keyword:\*\*\s*(.+)/);
  metadata.focusKeyword = focusKeywordMatch ? focusKeywordMatch[1].trim() : '';

  // Extract blog content (everything after "## BLOG CONTENT" until "---" or "## SCHEMAS")
  const contentMatch = content.match(/## BLOG CONTENT\n\n([\s\S]*?)(?=\n---\n|\n## SCHEMAS|$)/);
  metadata.htmlContent = contentMatch ? contentMatch[1].trim() : '';

  // Extract H1 title from content
  const h1Match = metadata.htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
  metadata.title = h1Match ? h1Match[1] : metadata.seoTitle;

  return metadata;
}

/**
 * Create draft post via WordPress REST API
 */
async function createDraftPost(postData) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${SITE.username}:${SITE.appPassword}`).toString('base64');

    const postBody = JSON.stringify({
      title: postData.title,
      content: postData.htmlContent,
      status: 'draft'
    });

    const options = {
      hostname: SITE.domain,
      path: '/wp-json/wp/v2/posts',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    console.log('📝 Creating draft post via REST API...');

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const response = JSON.parse(data);
          console.log(`✅ Draft created: Post ID ${response.id}`);
          console.log(`   Edit URL: https://${SITE.domain}/wp-admin/post.php?post=${response.id}&action=edit`);
          resolve({
            id: response.id,
            editUrl: `https://${SITE.domain}/wp-admin/post.php?post=${response.id}&action=edit`,
            link: response.link
          });
        } else {
          reject(new Error(`Failed to create post: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

/**
 * Set SEO metadata and publish via Playwright browser automation
 */
async function publishViaBrowser(postId, editUrl, focusKeyword) {
  console.log('\n🌐 Opening browser...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Login to WordPress
    console.log('🔐 Logging into WordPress admin...');
    await page.goto(`https://${SITE.domain}/wp-login.php`);
    await page.fill('#user_login', SITE.wpAdminUser);
    await page.fill('#user_pass', SITE.wpAdminPass);
    await page.click('#wp-submit');
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in successfully');

    // Step 2: Navigate to post edit page
    console.log(`\n📄 Opening post ${postId} for editing...`);
    await page.goto(editUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for editor to load
    console.log('✅ Post editor loaded');

    // Step 3: Open Rank Math panel (using correct selector from snapshot)
    console.log('\n🎯 Opening Rank Math SEO panel...');
    await page.waitForSelector('button:has-text("Rank Math")', { timeout: 10000 });
    await page.click('button:has-text("Rank Math")');
    await page.waitForTimeout(1000);
    console.log('✅ Rank Math panel opened');

    // Step 4: Fill focus keyword
    console.log(`\n🔑 Filling focus keyword: "${focusKeyword}"`);
    const keywordInput = page.locator('input[placeholder*="Focus Keyword"], input[placeholder*="Set Focus Keyword"]').first();
    await keywordInput.waitFor({ state: 'visible', timeout: 5000 });
    await keywordInput.fill(focusKeyword);
    await keywordInput.press('Enter');
    console.log('✅ Focus keyword entered');

    // Step 5: Wait for Rank Math to analyze
    console.log('\n⏳ Waiting for Rank Math to analyze (5 seconds)...');
    await page.waitForTimeout(5000);

    // Try to read the SEO score
    try {
      const scoreText = await page.locator('text=/\\d+\\s*\\/\\s*100/').first().textContent({ timeout: 3000 });
      console.log(`📊 SEO Score: ${scoreText.trim()}`);
    } catch (e) {
      console.log('⚠️  Could not read SEO score (continuing anyway)');
    }

    // Step 6: Publish the post
    console.log('\n🚀 Publishing post...');

    // Click the main Publish button in sidebar
    const publishButton = page.locator('button.editor-post-publish-button__button').first();
    await publishButton.waitFor({ state: 'visible', timeout: 5000 });
    await publishButton.click();

    // Wait for publish panel to appear
    await page.waitForTimeout(1000);

    // Click the confirm Publish button
    const confirmButton = page.locator('button.editor-post-publish-button__button:has-text("Publish")').first();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    // Wait for success message
    await page.waitForSelector('text=/Post published/', { timeout: 10000 });
    console.log('✅ Post published successfully!');

    // Wait a bit to see the result
    await page.waitForTimeout(2000);

    // Try to get the post link
    try {
      const viewPostLink = await page.locator('a:has-text("View Post")').first().getAttribute('href', { timeout: 3000 });
      console.log(`\n🔗 Published URL: ${viewPostLink}`);
    } catch (e) {
      console.log(`\n🔗 Published URL: https://${SITE.domain}/?p=${postId}`);
    }

  } catch (error) {
    console.error('\n❌ Error during browser automation:', error.message);
    throw error;
  } finally {
    console.log('\n🛑 Closing browser...');
    await browser.close();
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('═'.repeat(80));
    console.log('📰 COMPLETE BLOG PUBLISHING AUTOMATION');
    console.log('═'.repeat(80));
    console.log(`Site: ${SITE.domain}`);
    console.log(`File: ${BLOG_POST_FILE}`);
    console.log('═'.repeat(80));

    // Step 1: Read and parse blog post
    console.log('\n📖 Reading blog post file...');
    const fileContent = fs.readFileSync(BLOG_POST_FILE, 'utf8');
    const postData = parseBlogPost(fileContent);

    console.log(`   Title: ${postData.title}`);
    console.log(`   Focus Keyword: ${postData.focusKeyword}`);
    console.log(`   Content Length: ${postData.htmlContent.length} characters`);

    // Step 2: Create draft via REST API
    const draft = await createDraftPost(postData);

    // Step 3: Set SEO and publish via browser
    await publishViaBrowser(draft.id, draft.editUrl, postData.focusKeyword);

    console.log('\n' + '═'.repeat(80));
    console.log('✅ BLOG POST PUBLISHED SUCCESSFULLY!');
    console.log('═'.repeat(80));
    console.log(`Post ID: ${draft.id}`);
    console.log(`Focus Keyword: ${postData.focusKeyword}`);
    console.log(`View Post: https://${SITE.domain}/?p=${draft.id}`);
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run
main();
