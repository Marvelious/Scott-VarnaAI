#!/usr/bin/env node
/**
 * ABOUTME: Test publish ONE blog post to WordPress
 * ABOUTME: Verify content, SEO metadata, and categories before batch operation
 * ABOUTME: Converts markdown to HTML before publishing
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { marked } = require('marked');

// Test configuration - aimarketingbg.com
const TEST_SITE = {
  domain: 'aimarketingbg.com',
  username: 'claude',
  password: 'Pn2myLXyzkoPMDPeFiik9n7A', // Application Password
  blogDir: 'aimarketingbg'
};

const TEST_FILE = 'AIMarketingBG_AI_Marketing_Automation_Tools_Nov2025.md';
const BLOG_POSTS_DIR = path.join(__dirname, '../../blogs/blog_posts/2025-12-02');
const UPDATE_EXISTING_POST = null; // Set to null to create new post, or post ID to update existing

// Parse markdown blog post (FIXED regex with Windows line ending support)
function parseBlogPost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract SEO Title first (most reliable) and strip backticks
  const seoTitleMatch = content.match(/\*\*SEO Title:\*\* (.*)/);
  let title = seoTitleMatch ? seoTitleMatch[1].replace(/[`'"]/g, '').trim() : '';

  // Fallback to H1 if no SEO title
  if (!title) {
    const titleMatch = content.match(/<h1 class="wp-block-heading">(.*?)<\/h1>/);
    title = titleMatch ? titleMatch[1].replace(/[`'"]/g, '').trim() : 'Untitled';
  }

  // Extract full WordPress blocks content (FIXED)
  // Handle both Windows (\r\n) and Unix (\n) line endings
  // Try two formats: "COPY BLOCK 3" format or simple "BLOG CONTENT" format
  let contentMatch = content.match(/## COPY BLOCK 3: BLOG CONTENT\r?\n## ═+\r?\n\r?\n([\s\S]*?)(?=\r?\n---\r?\n\r?\n## ═)/);

  // If first pattern fails, try second format (## BLOG CONTENT)
  if (!contentMatch) {
    contentMatch = content.match(/## BLOG CONTENT\r?\n\r?\n<!-- Focus keyword.*?-->\r?\n\r?\n([\s\S]*?)(?=\r?\n---\r?\n\r?\n##)/);
  }

  const wpContent = contentMatch ? contentMatch[1].trim() : '';

  // Extract SEO metadata from METADATA section (not from top summary)
  // Match the METADATA section specifically to avoid extracting from summary lines
  const metadataSection = content.match(/## METADATA[\s\S]*?(?=\n##|$)/);
  const metadata = metadataSection ? metadataSection[0] : content;

  const keywordMatch = metadata.match(/\*\*Focus Keyword:\*\* (.*)/);
  const focusKeyword = keywordMatch ? keywordMatch[1].replace(/[`'"]/g, '').replace(/\s*\(.*?\)\s*/g, '').trim() : '';

  const metaDescMatch = metadata.match(/\*\*Meta Description:\*\* (.*)/);
  const metaDescription = metaDescMatch ? metaDescMatch[1].replace(/[`'"]/g, '').trim() : '';

  // Extract categories and strip backticks
  const categoriesMatch = metadata.match(/\*\*Categories:\*\* (.*)/);
  const categories = categoriesMatch ? categoriesMatch[1].replace(/[`'"]/g, '').split(',').map(c => c.trim()) : [];

  // Convert markdown to HTML
  const htmlContent = marked(wpContent);

  return {
    title,
    content: htmlContent,
    focusKeyword,
    metaDescription,
    seoTitle: title,
    categories,
    wordCount: wpContent.split(/\s+/).length
  };
}

// Publish or update post to WordPress via REST API
function publishPost(site, postData, postId = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${site.username}:${site.password}`).toString('base64');

    const postBody = JSON.stringify({
      title: postData.title,
      content: postData.content,
      status: 'publish',
      format: 'standard',
      meta: {
        rank_math_focus_keyword: postData.focusKeyword,
        rank_math_description: postData.metaDescription,
        rank_math_title: postData.seoTitle,
        rank_math_seo_score: 0
      }
    });

    const isUpdate = postId !== null;
    const options = {
      hostname: site.domain,
      path: isUpdate ? `/wp-json/wp/v2/posts/${postId}` : '/wp-json/wp/v2/posts',
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          const response = JSON.parse(data);
          resolve({
            success: true,
            url: response.link,
            id: response.id,
            title: response.title.rendered,
            action: res.statusCode === 201 ? 'created' : 'updated'
          });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postBody);
    req.end();
  });
}

// Main execution
async function main() {
  console.log('🧪 TEST PUBLISH - ONE BLOG POST\n');

  const blogDir = path.join(BLOG_POSTS_DIR, TEST_SITE.blogDir);
  const filePath = path.join(blogDir, TEST_FILE);

  try {
    // 1. Parse the blog post
    console.log(`📄 Parsing: ${TEST_FILE}...`);
    const postData = parseBlogPost(filePath);

    console.log(`\n📊 PARSED DATA:`);
    console.log(`   Title: ${postData.title}`);
    console.log(`   Word Count: ${postData.wordCount} words`);
    console.log(`   Content Length: ${postData.content.length} characters`);
    console.log(`   Focus Keyword: ${postData.focusKeyword}`);
    console.log(`   Meta Description: ${postData.metaDescription.substring(0, 100)}...`);
    console.log(`   Categories: ${postData.categories.join(', ')}`);

    // 2. Verify content was extracted
    if (!postData.content || postData.content.length < 1000) {
      console.error(`\n❌ CONTENT EXTRACTION FAILED!`);
      console.error(`   Expected: 30,000+ characters`);
      console.error(`   Got: ${postData.content.length} characters`);
      process.exit(1);
    }

    // 3. Ask for confirmation
    const action = UPDATE_EXISTING_POST ? 'UPDATE' : 'CREATE';
    console.log(`\n⚠️  READY TO ${action} POST ON: https://${TEST_SITE.domain}`);
    if (UPDATE_EXISTING_POST) {
      console.log(`   This will UPDATE existing post ID: ${UPDATE_EXISTING_POST}`);
    } else {
      console.log(`   This will create a NEW blog post.`);
    }
    console.log(`   Press Ctrl+C to cancel, or wait 5 seconds to proceed...`);

    await new Promise(resolve => setTimeout(resolve, 5000));

    // 4. Publish to WordPress
    console.log(`\n🚀 ${action === 'UPDATE' ? 'Updating' : 'Publishing'} to WordPress...`);
    const result = await publishPost(TEST_SITE, postData, UPDATE_EXISTING_POST);

    console.log(`\n✅ ✅ ✅ SUCCESS! ✅ ✅ ✅`);
    console.log(`\n📝 ${result.action === 'created' ? 'Published' : 'Updated'} Post:`);
    console.log(`   Title: ${result.title}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   ID: ${result.id}`);
    console.log(`\n🔍 NEXT STEPS:`);
    console.log(`   1. Visit the URL above to verify content is present`);
    console.log(`   2. Check Rank Math SEO score in WordPress admin`);
    console.log(`   3. Verify all SEO metadata is populated`);
    console.log(`   4. If everything looks good, run batch publish script\n`);

  } catch (error) {
    console.error(`\n❌ PUBLISH FAILED:`, error.message);
    process.exit(1);
  }
}

main().catch(console.error);
