#!/usr/bin/env node
/**
 * ABOUTME: Batch publish all blog posts to WordPress sites
 * ABOUTME: Reads markdown files and publishes via WordPress REST API
 * ABOUTME: Converts markdown to HTML before publishing
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { marked } = require('marked');

// WordPress credentials - Application Passwords for REST API
const SITES = {
  'ai-projektmanager': {
    domain: 'ai-projektmanager.de',
    username: 'claude',
    password: 'ueCZKmTQaFzyns2O3NzBaOdt', // ueCZ KmTQ aFzy ns2O 3NzB aOdt
    blogDir: 'ai-projektmanager'
  },
  'aimarketingbg': {
    domain: 'aimarketingbg.com',
    username: 'claude',
    password: 'Pn2myLXyzkoPMDPeFiik9n7A', // Pn2m yLXy zkoP MDPe Fiik 9n7A
    blogDir: 'aimarketingbg'
  },
  'varnaai': {
    domain: 'varnaai.com',
    username: 'claude',
    password: 'AQ86FxxWCECeBDlii7tjDjMs', // AQ86 FxxW CECe BDli i7tj DjMs
    blogDir: 'varnaai'
  },
  'varna-agenten': {
    domain: 'varna-agenten.de',
    username: 'claude',
    password: 'xsJOiDcpH1Ne3V27yxTzQhAx', // xsJO iDcp H1Ne 3V27 yxTz QhAx
    blogDir: 'varna-agenten'
  }
};

const BLOG_POSTS_DIR = path.join(__dirname, '../../blogs/blog_posts/2025-12-02');

// Parse markdown blog post
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

  return { title, content: htmlContent, focusKeyword, metaDescription, seoTitle: title, categories };
}

// Publish post to WordPress via REST API
function publishPost(site, postData) {
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

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          const response = JSON.parse(data);
          resolve({
            success: true,
            url: response.link,
            id: response.id
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
  console.log('🚀 Starting batch blog post publication...\n');

  let totalPublished = 0;
  let totalFailed = 0;

  for (const [siteKey, siteConfig] of Object.entries(SITES)) {
    const blogDir = path.join(BLOG_POSTS_DIR, siteConfig.blogDir);

    if (!fs.existsSync(blogDir)) {
      console.log(`⚠️  Skipping ${siteKey} - directory not found`);
      continue;
    }

    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    console.log(`\n📝 Publishing ${files.length} posts to ${siteConfig.domain}...`);

    for (const file of files) {
      const filePath = path.join(blogDir, file);

      try {
        const postData = parseBlogPost(filePath);
        console.log(`  → Publishing: ${postData.title.substring(0, 50)}...`);

        const result = await publishPost(siteConfig, postData);
        console.log(`    ✅ Published: ${result.url}`);
        totalPublished++;

        // Rate limiting - wait 1 second between posts
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`    ❌ Failed: ${error.message}`);
        totalFailed++;
      }
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`  ✅ Successfully published: ${totalPublished} posts`);
  console.log(`  ❌ Failed: ${totalFailed} posts`);
  console.log(`\n🎉 Batch publication complete!\n`);
}

main().catch(console.error);
