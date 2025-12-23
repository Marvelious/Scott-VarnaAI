#!/usr/bin/env node
/**
 * ABOUTME: Improved blog post publisher with two-step Rank Math metadata fix
 * ABOUTME: Step 1: Create post with content, Step 2: Update with SEO metadata
 * ABOUTME: This triggers Rank Math hooks properly for UI synchronization
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

// Helper function for HTTPS requests
function makeRequest(options, postBody = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (postBody) {
      req.write(postBody);
    }
    req.end();
  });
}

// STEP 1: Create post with content only (no metadata yet)
async function createPost(site, postData) {
  console.log('\n📝 STEP 1: Creating post with content...');

  const auth = Buffer.from(`${site.username}:${site.password}`).toString('base64');

  const postBody = JSON.stringify({
    title: postData.title,
    content: postData.content,
    status: 'draft' // Create as draft first
  });

  const options = {
    hostname: site.domain,
    path: '/wp-json/wp/v2/posts',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postBody)
    }
  };

  const response = await makeRequest(options, postBody);
  console.log(`✅ Post created: ID ${response.id}`);
  return response.id;
}

// STEP 2: Update post with Rank Math SEO metadata
async function updateSEOMetadata(site, postId, postData) {
  console.log(`\n🔍 STEP 2: Updating SEO metadata for post ${postId}...`);

  const auth = Buffer.from(`${site.username}:${site.password}`).toString('base64');

  // Update with metadata and publish
  const postBody = JSON.stringify({
    status: 'publish', // Publish now
    meta: {
      rank_math_focus_keyword: postData.focusKeyword,
      rank_math_description: postData.metaDescription,
      rank_math_title: postData.seoTitle
    }
  });

  const options = {
    hostname: site.domain,
    path: `/wp-json/wp/v2/posts/${postId}`,
    method: 'PUT', // Update existing post
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postBody)
    }
  };

  const response = await makeRequest(options, postBody);
  console.log(`✅ SEO metadata updated and post published`);
  return response;
}

// STEP 3: Verify metadata was saved (read it back)
async function verifyMetadata(site, postId) {
  console.log(`\n🔍 STEP 3: Verifying metadata was saved...`);

  const auth = Buffer.from(`${site.username}:${site.password}`).toString('base64');

  const options = {
    hostname: site.domain,
    path: `/wp-json/wp/v2/posts/${postId}?context=edit`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  };

  const response = await makeRequest(options);

  console.log('\n📊 VERIFICATION RESULTS:');
  console.log(`   Focus Keyword: ${response.meta.rank_math_focus_keyword || '(EMPTY - NOT SAVED!)'}`);
  console.log(`   SEO Title: ${response.meta.rank_math_title || '(empty)'}`);
  console.log(`   Meta Description: ${response.meta.rank_math_description ? response.meta.rank_math_description.substring(0, 50) + '...' : '(empty)'}`);

  return response.meta;
}

// Main execution
async function main() {
  console.log('🧪 TEST PUBLISH - TWO-STEP APPROACH FOR RANK MATH\n');

  const blogDir = path.join(BLOG_POSTS_DIR, TEST_SITE.blogDir);
  const filePath = path.join(blogDir, TEST_FILE);

  try {
    // Parse the blog post
    console.log(`📄 Parsing: ${TEST_FILE}...`);
    const postData = parseBlogPost(filePath);

    console.log(`\n📊 PARSED DATA:`);
    console.log(`   Title: ${postData.title}`);
    console.log(`   Word Count: ${postData.wordCount} words`);
    console.log(`   Content Length: ${postData.content.length} characters`);
    console.log(`   Focus Keyword: ${postData.focusKeyword}`);
    console.log(`   Meta Description: ${postData.metaDescription.substring(0, 100)}...`);
    console.log(`   Categories: ${postData.categories.join(', ')}`);

    // Verify content was extracted
    if (!postData.content || postData.content.length < 1000) {
      console.error(`\n❌ CONTENT EXTRACTION FAILED!`);
      console.error(`   Expected: 30,000+ characters`);
      console.error(`   Got: ${postData.content.length} characters`);
      process.exit(1);
    }

    // Ask for confirmation
    console.log(`\n⚠️  READY TO TEST TWO-STEP PUBLISH ON: https://${TEST_SITE.domain}`);
    console.log(`   This will create a NEW blog post using two-step approach:`);
    console.log(`   1. Create draft with content`);
    console.log(`   2. Update with SEO metadata and publish`);
    console.log(`   3. Verify metadata was saved correctly`);
    console.log(`\n   Press Ctrl+C to cancel, or wait 5 seconds to proceed...`);

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Execute two-step publish
    const postId = await createPost(TEST_SITE, postData);
    const publishedPost = await updateSEOMetadata(TEST_SITE, postId, postData);
    const metadata = await verifyMetadata(TEST_SITE, postId);

    // Check if focus keyword was actually saved
    const focusKeywordSaved = metadata.rank_math_focus_keyword && metadata.rank_math_focus_keyword.length > 0;

    console.log(`\n${ focusKeywordSaved ? '✅ ✅ ✅ SUCCESS!' : '❌ ❌ ❌ METADATA NOT SAVED'} \n`);
    console.log(`📝 Published Post:`);
    console.log(`   Title: ${publishedPost.title.rendered}`);
    console.log(`   URL: ${publishedPost.link}`);
    console.log(`   ID: ${publishedPost.id}`);

    if (focusKeywordSaved) {
      console.log(`\n🎉 TWO-STEP APPROACH WORKED!`);
      console.log(`   ✅ Focus keyword was successfully saved: "${metadata.rank_math_focus_keyword}"`);
      console.log(`\n🔍 NEXT STEPS:`);
      console.log(`   1. Visit the URL above to verify Rank Math SEO score`);
      console.log(`   2. If score is 70-80+/100, we can batch publish all posts`);
      console.log(`   3. If score is still low, we need to try solution #2 or #3\n`);
    } else {
      console.log(`\n⚠️  TWO-STEP APPROACH FAILED - FOCUS KEYWORD NOT SAVED`);
      console.log(`\n🔧 ALTERNATIVE SOLUTIONS:`);
      console.log(`   Option A: Install Rank Math API Manager plugin (recommended)`);
      console.log(`            - Provides custom endpoint: /wp-json/rank-math-api/v1/update-meta`);
      console.log(`            - GitHub: https://github.com/Devora-AS/rank-math-api-manager`);
      console.log(`   Option B: Use Playwright browser automation (proven to work)`);
      console.log(`            - Slower but guaranteed to work\n`);
    }

  } catch (error) {
    console.error(`\n❌ PUBLISH FAILED:`, error.message);
    process.exit(1);
  }
}

main().catch(console.error);
