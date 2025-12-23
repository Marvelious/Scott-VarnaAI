#!/usr/bin/env node

/**
 * ABOUTME: Complete blog post automation - AI generation → WordPress publishing
 * ABOUTME: Handles content generation, draft creation, SEO, categories, tags, and publishing
 */

const { chromium } = require('playwright');
const https = require('https');
const fs = require('fs');

// ============================================================================
// CONFIGURATION
// ============================================================================

const SITE = {
  domain: 'aimarketingbg.com',
  username: 'BigDick',
  appPassword: 'JcVk zSSU 3sgF K1wR TcXC s2Au',
  wpAdminUser: 'BigDick',
  wpAdminPass: 'QJ50uT$ZFdY%vldvV@)!dV6c'
};

// AI API Configuration (OpenAI or Claude)
const AI_CONFIG = {
  provider: 'openai', // 'openai' or 'claude'
  apiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY,
  model: 'gpt-4o' // or 'claude-3-5-sonnet-20241022'
};

// Sintra API Configuration
const SINTRA_CONFIG = {
  apiKey: process.env.SINTRA_API_KEY,
  endpoint: 'https://api.sintra.ai/v1/generate' // Replace with actual Sintra endpoint
};

// Blog Post Configuration
const BLOG_CONFIG = {
  topic: 'AI customer segmentation 2025',
  targetWords: 2000,
  categories: ['AI Technology', 'Marketing Automation'],
  primaryCategory: 'AI Technology',
  tags: [
    'AI customer segmentation',
    'customer segmentation 2025',
    'AI marketing',
    'customer insights',
    'predictive analytics',
    'personalization',
    'machine learning',
    'Bulgarian B2B'
  ]
};

// ============================================================================
// AI CONTENT GENERATION
// ============================================================================

/**
 * Generate blog post content using AI
 */
async function generateBlogContent(topic, targetWords) {
  console.log('\n🤖 Generating blog post content with AI...');
  console.log(`   Topic: ${topic}`);
  console.log(`   Target: ${targetWords} words\n`);

  const prompt = `Write a comprehensive blog post about "${topic}" for aimarketingbg.com.

Requirements:
- ${targetWords} words
- WordPress block format (use <!-- wp:paragraph -->, <!-- wp:heading -->, etc.)
- Include H1 title, H2 sections, H3 subsections
- Add 3 external DoFollow links to authorities (Gartner, Forrester, etc.) with rel="noopener"
- Add 7 internal links to aimarketingbg.com pages (use: /services, /case-studies, /about, /blog, /contact)
- Focus keyword "${topic}" used 18-22 times (1% density)
- Maximum 3 sentences per paragraph
- Professional, authoritative tone
- Include practical examples and use cases
- Add spacers before each H2: <!-- wp:spacer {"height":"40px"} -->

Structure:
1. H1 title with focus keyword
2. Introduction (2-3 paragraphs)
3. Main sections (3-4 H2 sections with H3 subsections)
4. Conclusion with CTA
5. Use WordPress Gutenberg block comments

Return ONLY the WordPress-formatted HTML content, nothing else.`;

  try {
    if (AI_CONFIG.provider === 'openai') {
      return await callOpenAI(prompt);
    } else {
      return await callClaude(prompt);
    }
  } catch (error) {
    console.error('❌ AI generation failed:', error.message);
    throw error;
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: 'You are an expert content writer for AI marketing blog posts.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          const content = response.choices[0].message.content;
          console.log('✅ AI content generated');
          console.log(`   Words: ${content.split(/\s+/).length}`);
          resolve(content);
        } else {
          reject(new Error(`OpenAI API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Call Claude API
 */
async function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: AI_CONFIG.model,
      max_tokens: 4000,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AI_CONFIG.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          const content = response.content[0].text;
          console.log('✅ AI content generated');
          console.log(`   Words: ${content.split(/\s+/).length}`);
          resolve(content);
        } else {
          reject(new Error(`Claude API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Generate metadata (SEO title, description, focus keyword)
 */
function generateMetadata(content, topic) {
  console.log('\n📝 Generating metadata...');

  // Extract H1 title from content
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '') : topic;

  // Generate SEO title (add power word)
  const powerWords = ['Revolutionary', 'Ultimate', 'Complete', 'Essential', 'Proven', 'Game-Changing'];
  const powerWord = powerWords[Math.floor(Math.random() * powerWords.length)];
  const seoTitle = `${topic}: ${powerWord} Guide 2025`;

  // Generate meta description
  const metaDescription = `${topic} delivers AI marketing automation, lead generation, Bulgarian B2B with proven solutions for modern businesses. Privacy-compliant and production-ready implementation.`;

  // Focus keyword
  const focusKeyword = topic.toLowerCase();

  console.log(`   SEO Title: ${seoTitle}`);
  console.log(`   Focus Keyword: ${focusKeyword}`);

  return { seoTitle, metaDescription, focusKeyword, title };
}

// ============================================================================
// WORDPRESS REST API
// ============================================================================

/**
 * Create draft post via WordPress REST API
 */
async function createDraftPost(title, content) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${SITE.username}:${SITE.appPassword}`).toString('base64');

    const postBody = JSON.stringify({
      title: title,
      content: content,
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

    console.log('\n📝 Creating draft post via REST API...');

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

// ============================================================================
// SINTRA IMAGE GENERATION
// ============================================================================

/**
 * Generate featured image via Sintra
 */
async function generateFeaturedImage(topic, focusKeyword) {
  console.log('\n✨ Generating featured image via Sintra...');
  console.log(`   Topic: ${topic}`);

  // TODO: Implement actual Sintra API call
  // For now, return a placeholder
  return {
    url: 'https://example.com/placeholder.jpg',
    caption: `${focusKeyword} - AI-powered marketing automation platform`,
    altText: focusKeyword
  };
}

// ============================================================================
// PLAYWRIGHT AUTOMATION
// ============================================================================

/**
 * Complete WordPress setup via Playwright
 */
async function completeWordPressSetup(postId, editUrl, metadata, imageData, config) {
  console.log('\n🌐 Opening browser for WordPress automation...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Login
    console.log('🔐 Logging into WordPress...');
    await page.goto(`https://${SITE.domain}/wp-login.php`);
    await page.fill('#user_login', SITE.wpAdminUser);
    await page.fill('#user_pass', SITE.wpAdminPass);
    await page.click('#wp-submit');
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in');

    // Step 2: Navigate to post editor
    console.log(`\n📄 Opening post ${postId}...`);
    await page.goto(editUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Post editor loaded');

    // Step 3: Add featured image
    console.log('\n🖼️ Adding featured image...');
    // TODO: Implement featured image upload via Playwright
    // For now, skip this step
    console.log('⏭️ Skipping featured image (implement Sintra integration)');

    // Step 4: Set Categories
    console.log('\n🏷️ Setting categories...');
    await page.click('button:has-text("Categories")');
    await page.waitForTimeout(1000);

    // Uncheck "Uncategorized"
    await page.evaluate(() => {
      const uncategorized = document.getElementById('inspector-checkbox-control-0');
      if (uncategorized && uncategorized.checked) {
        uncategorized.click();
      }
    });

    // Check target categories (AI Technology, Marketing Automation)
    // Note: These IDs may vary - adjust based on your WordPress setup
    await page.evaluate(() => {
      const aiTech = document.getElementById('inspector-checkbox-control-1');
      if (aiTech && !aiTech.checked) {
        aiTech.click();
      }
      const marketing = document.getElementById('inspector-checkbox-control-4');
      if (marketing && !marketing.checked) {
        marketing.click();
      }
    });

    console.log('✅ Categories set');

    // Step 5: Add Tags
    console.log('\n🔖 Adding tags...');
    await page.click('button:has-text("Tags")');
    await page.waitForTimeout(1000);

    await page.evaluate((tags) => {
      const tagsInput = document.querySelector('.components-form-token-field__input');
      if (tagsInput) {
        tags.forEach(tag => {
          tagsInput.value = tag;
          tagsInput.dispatchEvent(new Event('input', { bubbles: true }));
          tagsInput.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13,
            bubbles: true
          }));
        });
      }
    }, config.tags);

    console.log(`✅ Added ${config.tags.length} tags`);

    // Step 6: Rank Math SEO
    console.log('\n🎯 Optimizing Rank Math SEO...');
    await page.click('button:has-text("Rank Math")');
    await page.waitForTimeout(1000);

    // Fill focus keyword
    const keywordInput = page.locator('input[placeholder*="Focus Keyword"]').first();
    await keywordInput.fill(metadata.focusKeyword);
    await keywordInput.press('Enter');
    await page.waitForTimeout(5000);

    console.log('✅ Focus keyword set');

    // Try to read SEO score
    try {
      const scoreText = await page.locator('text=/\\d+\\s*\\/\\s*100/').first().textContent({ timeout: 3000 });
      console.log(`📊 SEO Score: ${scoreText.trim()}`);
    } catch (e) {
      console.log('⚠️ Could not read SEO score');
    }

    // Step 7: Save Draft
    console.log('\n💾 Saving post...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const saveButton = buttons.find(btn => btn.textContent.trim() === 'Save draft' || btn.textContent.trim() === 'Save');
      if (saveButton) {
        saveButton.click();
      }
    });
    await page.waitForTimeout(2000);
    console.log('✅ Post saved');

    // Step 8: Publish
    console.log('\n🚀 Publishing post...');
    const publishButton = page.locator('button.editor-post-publish-button__button').first();
    await publishButton.click();
    await page.waitForTimeout(1000);

    const confirmButton = page.locator('button.editor-post-publish-button__button:has-text("Publish")').first();
    await confirmButton.click();
    await page.waitForTimeout(5000);

    console.log('✅ Post published!');

    // Get published URL
    try {
      const viewLink = await page.locator('a:has-text("View Post")').first().getAttribute('href', { timeout: 3000 });
      console.log(`\n🔗 Published URL: ${viewLink}`);
    } catch (e) {
      console.log(`\n🔗 Published URL: https://${SITE.domain}/?p=${postId}`);
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ Browser automation error:', error.message);
    throw error;
  } finally {
    console.log('\n🛑 Closing browser...');
    await browser.close();
  }
}

// ============================================================================
// MAIN WORKFLOW
// ============================================================================

async function main() {
  try {
    console.log('═'.repeat(80));
    console.log('🤖 AUTOMATED BLOG POST PUBLISHING');
    console.log('═'.repeat(80));
    console.log(`Site: ${SITE.domain}`);
    console.log(`Topic: ${BLOG_CONFIG.topic}`);
    console.log('═'.repeat(80));

    // Step 1: Generate blog content with AI
    const content = await generateBlogContent(BLOG_CONFIG.topic, BLOG_CONFIG.targetWords);

    // Step 2: Generate metadata
    const metadata = generateMetadata(content, BLOG_CONFIG.topic);

    // Step 3: Create draft post
    const draft = await createDraftPost(metadata.title, content);

    // Step 4: Generate featured image
    const imageData = await generateFeaturedImage(BLOG_CONFIG.topic, metadata.focusKeyword);

    // Step 5: Complete WordPress setup (categories, tags, SEO, publish)
    await completeWordPressSetup(draft.id, draft.editUrl, metadata, imageData, BLOG_CONFIG);

    console.log('\n' + '═'.repeat(80));
    console.log('✅ BLOG POST PUBLISHED SUCCESSFULLY!');
    console.log('═'.repeat(80));
    console.log(`Post ID: ${draft.id}`);
    console.log(`Topic: ${BLOG_CONFIG.topic}`);
    console.log(`Focus Keyword: ${metadata.focusKeyword}`);
    console.log(`Categories: ${BLOG_CONFIG.categories.join(', ')}`);
    console.log(`Tags: ${BLOG_CONFIG.tags.length} tags`);
    console.log(`View Post: https://${SITE.domain}/?p=${draft.id}`);
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the automation
main();
