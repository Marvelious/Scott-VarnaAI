#!/usr/bin/env node

/**
 * Complete Blog Automation Workflow
 *
 * End-to-end automation:
 * 1. Generate blog content using AI (OpenAI GPT-4 or Claude)
 * 2. Create draft post via WordPress REST API
 * 3. Set Rank Math SEO metadata via Playwright browser automation
 * 4. Publish post and verify live
 *
 * Usage:
 * OPENAI_API_KEY=sk-xxx node blog-automation-complete.js aimarketingbg "Topic" "focus keyword 2025"
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { chromium } = require('playwright');

// Site Configuration
const SITE_CONFIG = {
  'ai-projektmanager.de': {
    domain: 'ai-projektmanager.de',
    username: 'BigDick',
    appPassword: 'gST1 9UAe ZKAp dT7N uxXR bpau',
    wpAdminUser: 'BigDick',
    wpAdminPass: 'TtDXYFKTv*p3sK$r3W(UQkLv'
  },
  'aimarketingbg.com': {
    domain: 'aimarketingbg.com',
    username: 'BigDick',
    appPassword: 'JcVk zSSU 3sgF K1wR TcXC s2Au',
    wpAdminUser: 'BigDick',
    wpAdminPass: 'tPOFZiIWpK4FnPLw5@$8XJxR'
  },
  'varna-agenten.de': {
    domain: 'varna-agenten.de',
    username: 'BigDick',
    appPassword: 'uXHE Gzrm g9hP ZY34 Y6A7 nSgz',
    wpAdminUser: 'BigDick',
    wpAdminPass: 'TtDXYFKTv*p3sK$r3W(UQkLv'
  },
  'varnaai.com': {
    domain: 'varnaai.com',
    username: 'BigDick',
    appPassword: 'hnLC 8VXX fSEW sojp 4NTs rIrA',
    wpAdminUser: 'BigDick',
    wpAdminPass: 'TtDXYFKTv*p3sK$r3W(UQkLv'
  }
};

// AI and Brand Configuration (imported from generate-blog-ai.js)
const CONFIG = {
  ai: {
    provider: process.env.AI_PROVIDER || 'openai',
    apiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: 3000,
    temperature: 0.7
  },

  brands: {
    'ai-projektmanager': {
      domain: 'ai-projektmanager.de',
      language: 'German',
      focus: 'AI project management, DSGVO compliance, NIS2, BSI IT-Grundschutz',
      tone: 'Professional, authoritative, technical',
      internalPages: [
        'https://ai-projektmanager.de/funktionen',
        'https://ai-projektmanager.de/preise',
        'https://ai-projektmanager.de/kontakt',
        'https://ai-projektmanager.de/anwendungsfaelle',
        'https://ai-projektmanager.de/branchen',
        'https://ai-projektmanager.de/compliance',
        'https://ai-projektmanager.de/datenschutz'
      ]
    },
    'aimarketingbg': {
      domain: 'aimarketingbg.com',
      language: 'English',
      focus: 'AI marketing automation, lead generation, Bulgarian B2B',
      tone: 'Professional, data-driven, results-focused',
      internalPages: [
        'https://aimarketingbg.com/services',
        'https://aimarketingbg.com/about',
        'https://aimarketingbg.com/contact',
        'https://aimarketingbg.com/blog',
        'https://aimarketingbg.com/case-studies',
        'https://aimarketingbg.com/pricing',
        'https://aimarketingbg.com/demo'
      ]
    },
    'varna-agenten': {
      domain: 'varna-agenten.de',
      language: 'German',
      focus: 'Creative AI agents, design automation, generative AI',
      tone: 'Creative, innovative, cutting-edge',
      internalPages: [
        'https://varna-agenten.de/ki-agenten',
        'https://varna-agenten.de/preise',
        'https://varna-agenten.de/kontakt',
        'https://varna-agenten.de/portfolio',
        'https://varna-agenten.de/use-cases',
        'https://varna-agenten.de/blog',
        'https://varna-agenten.de/demo'
      ]
    },
    'varnaai': {
      domain: 'varnaai.com',
      language: 'English',
      focus: 'Enterprise AI security, model governance, compliance automation',
      tone: 'Enterprise-grade, security-focused, authoritative',
      internalPages: [
        'https://varnaai.com/services',
        'https://varnaai.com/about',
        'https://varnaai.com/contact',
        'https://varnaai.com/portfolio',
        'https://varnaai.com/blog',
        'https://varnaai.com/case-studies',
        'https://varnaai.com/security'
      ]
    }
  },

  externalAuthorities: {
    german: [
      { url: 'https://www.bsi.bund.de', name: 'BSI (Bundesamt für Sicherheit in der Informationstechnik)' },
      { url: 'https://www.bfdi.bund.de', name: 'BfDI (Bundesbeauftragter für Datenschutz)' },
      { url: 'https://gdpr.eu/', name: 'GDPR Official Portal' },
      { url: 'https://digital-strategy.ec.europa.eu/', name: 'EU Digital Strategy' }
    ],
    english: [
      { url: 'https://www.gartner.com/', name: 'Gartner Research' },
      { url: 'https://www.forrester.com/', name: 'Forrester' },
      { url: 'https://www.mckinsey.com/', name: 'McKinsey & Company' },
      { url: 'https://hbr.org/', name: 'Harvard Business Review' }
    ]
  },

  wordCount: { target: 2000, min: 1800, max: 2200 }
};

/**
 * STEP 1: Generate AI Content
 */
async function generateAIContent(prompt) {
  if (!CONFIG.ai.apiKey) {
    throw new Error('API key not configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable.');
  }

  console.log(`🤖 Calling ${CONFIG.ai.provider.toUpperCase()} API (${CONFIG.ai.model})...`);

  if (CONFIG.ai.provider === 'openai') {
    return await callOpenAI(prompt);
  } else if (CONFIG.ai.provider === 'claude') {
    return await callClaude(prompt);
  } else {
    throw new Error(`Unknown AI provider: ${CONFIG.ai.provider}`);
  }
}

async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.ai.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer specializing in creating high-quality, engaging blog posts that rank well in search engines while providing genuine value to readers. Write naturally and conversationally, avoiding robotic language.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: CONFIG.ai.maxTokens,
      temperature: CONFIG.ai.temperature
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.ai.apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          resolve(response.choices[0].message.content);
        } else {
          reject(new Error(`OpenAI API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.ai.model,
      max_tokens: CONFIG.ai.maxTokens,
      messages: [
        { role: 'user', content: prompt }
      ],
      system: 'You are an expert SEO content writer specializing in creating high-quality, engaging blog posts that rank well in search engines while providing genuine value to readers. Write naturally and conversationally, avoiding robotic language.'
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': CONFIG.ai.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          resolve(response.content[0].text);
        } else {
          reject(new Error(`Claude API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function generateBlogPost(brand, topic, focusKeyword) {
  const brandConfig = CONFIG.brands[brand];
  if (!brandConfig) {
    throw new Error(`Invalid brand: ${brand}. Available: ${Object.keys(CONFIG.brands).join(', ')}`);
  }

  const language = brandConfig.language;
  const authorities = language === 'German' ? CONFIG.externalAuthorities.german : CONFIG.externalAuthorities.english;
  const internalLinks = brandConfig.internalPages.slice(0, 7);
  const externalLinks = authorities.slice(0, 3);

  // Build comprehensive prompt
  const prompt = `Write a complete, SEO-optimized blog post in ${language} about "${topic}" for ${brandConfig.domain}.

**CRITICAL REQUIREMENTS:**
1. Focus Keyword: Use "${focusKeyword}" exactly 18-22 times throughout the post (1% density for 2000 words)
2. Word Count: ${CONFIG.wordCount.target} words (±${CONFIG.wordCount.target - CONFIG.wordCount.min})
3. Language: ${language}
4. Tone: ${brandConfig.tone}
5. Industry Focus: ${brandConfig.focus}

**STRUCTURE (Must follow exactly):**
# Title: [H1 with focus keyword - make it compelling]

## Introduction (3 paragraphs)
- Paragraph 1: START with "${focusKeyword}" and define what it is
- Paragraph 2: Why it matters (include industry data or statistics)
- Paragraph 3: What readers will learn from this post

## Section 1: [H2 heading related to topic]
### Subsection 1.1 [H3]
[2-3 paragraphs of detailed content]
### Subsection 1.2 [H3]
[2-3 paragraphs of detailed content]

## Section 2: [H2 heading related to topic]
### Subsection 2.1 [H3]
[2-3 paragraphs of detailed content]
### Subsection 2.2 [H3]
[2-3 paragraphs of detailed content]

## Section 3: Implementation/Use Cases
[3-4 paragraphs with practical examples]

## Conclusion
- Summary of key points
- Call-to-action (encourage readers to explore more)

**LINK PLACEMENT (Embed naturally in content):**
Internal links (use 7 of these naturally in your content):
${internalLinks.map(link => `- ${link}`).join('\n')}

External links (use 3 of these as citations/references):
${externalLinks.map(link => `- ${link.name}: ${link.url}`).join('\n')}

**SEO OPTIMIZATION RULES:**
- Short paragraphs (maximum 3 sentences each)
- Use active voice
- Include specific data points and statistics
- Make headings scannable and descriptive
- Use "${focusKeyword}" in: H1, first paragraph, one H2, and conclusion
- Distribute "${focusKeyword}" naturally across all sections (aim for ~1 per 100 words)
- Write for humans first, search engines second - natural, engaging content

**IMPORTANT:** Return ONLY the blog post content in plain text markdown format. Do not include any meta-commentary, explanations, or wrapper text.`;

  console.log('📝 Generating blog post with AI...');
  const content = await generateAIContent(prompt);

  // Extract metadata from AI-generated content
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines.find(line => line.startsWith('# '))?.replace(/^#\s+/, '') || topic;
  const firstParagraph = lines.find(line => line.length > 100 && !line.startsWith('#')) || '';
  const metaDescription = firstParagraph.substring(0, 155) + '...';

  return {
    content,
    metadata: {
      seoTitle: title,
      metaDescription,
      focusKeyword,
      brand,
      domain: brandConfig.domain,
      language
    },
    links: {
      internal: internalLinks,
      external: externalLinks
    }
  };
}

function convertToWordPressBlocks(aiContent, metadata, links) {
  const lines = aiContent.split('\n').filter(line => line.trim());

  let html = '';

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // H1
      html += '<!-- wp:heading {"level":1} -->\n';
      html += `<h1 class="wp-block-heading">${line.replace(/^#\s+/, '')}</h1>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    else if (line.startsWith('## ')) {
      // Add spacer before H2
      html += '<!-- wp:spacer {"height":"40px"} -->\n';
      html += '<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>\n';
      html += '<!-- /wp:spacer -->\n\n';

      // H2
      html += '<!-- wp:heading -->\n';
      html += `<h2 class="wp-block-heading">${line.replace(/^##\s+/, '')}</h2>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    else if (line.startsWith('### ')) {
      // H3
      html += '<!-- wp:heading {"level":3} -->\n';
      html += `<h3 class="wp-block-heading">${line.replace(/^###\s+/, '')}</h3>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    else if (line.length > 20 && !line.startsWith('-') && !line.startsWith('*')) {
      // Paragraph
      html += '<!-- wp:paragraph -->\n';
      html += `<p>${line}</p>\n`;
      html += '<!-- /wp:paragraph -->\n\n';
    }
  }

  return html;
}

/**
 * STEP 2: Create Draft Post via REST API
 */
async function createDraftPost(site, postData) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${site.username}:${site.appPassword}`).toString('base64');

    const postBody = JSON.stringify({
      title: postData.title,
      content: postData.htmlContent,
      status: 'draft'
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

    console.log('📝 Creating draft post via REST API...');

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const response = JSON.parse(data);
          console.log(`✅ Draft created: Post ID ${response.id}`);
          console.log(`   Edit URL: https://${site.domain}/wp-admin/post.php?post=${response.id}&action=edit`);
          resolve({
            id: response.id,
            editUrl: `https://${site.domain}/wp-admin/post.php?post=${response.id}&action=edit`,
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
 * STEP 3: Set SEO and Publish via Playwright
 */
async function publishViaBrowser(site, postId, editUrl, focusKeyword) {
  console.log('\n🌐 Opening browser...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login
    console.log('🔐 Logging into WordPress admin...');
    await page.goto(`https://${site.domain}/wp-login.php`);
    await page.fill('#user_login', site.wpAdminUser);
    await page.fill('#user_pass', site.wpAdminPass);
    await page.click('#wp-submit');
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in successfully');

    // Navigate to post
    console.log(`\n📄 Opening post ${postId} for editing...`);
    await page.goto(editUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Post editor loaded');

    // Open Rank Math panel
    console.log('\n🎯 Opening Rank Math SEO panel...');
    await page.waitForSelector('button:has-text("Rank Math")', { timeout: 10000 });
    await page.click('button:has-text("Rank Math")');
    await page.waitForTimeout(1000);
    console.log('✅ Rank Math panel opened');

    // Fill focus keyword
    console.log(`\n🔑 Filling focus keyword: "${focusKeyword}"`);
    const keywordInput = page.locator('input[placeholder*="Focus Keyword"], input[placeholder*="Set Focus Keyword"]').first();
    await keywordInput.waitFor({ state: 'visible', timeout: 5000 });
    await keywordInput.fill(focusKeyword);
    await keywordInput.press('Enter');
    console.log('✅ Focus keyword entered');

    // Wait for Rank Math analysis
    console.log('\n⏳ Waiting for Rank Math to analyze (5 seconds)...');
    await page.waitForTimeout(5000);

    // Try to read SEO score
    try {
      const scoreText = await page.locator('text=/\\d+\\s*\\/\\s*100/').first().textContent({ timeout: 3000 });
      console.log(`📊 SEO Score: ${scoreText.trim()}`);
    } catch (e) {
      console.log('⚠️  Could not read SEO score (continuing anyway)');
    }

    // Publish
    console.log('\n🚀 Publishing post...');
    const publishButton = page.locator('button.editor-post-publish-button__button').first();
    await publishButton.waitFor({ state: 'visible', timeout: 5000 });
    await publishButton.click();

    await page.waitForTimeout(1000);

    const confirmButton = page.locator('button.editor-post-publish-button__button:has-text("Publish")').first();
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await page.waitForSelector('text=/Post published/', { timeout: 10000 });
    console.log('✅ Post published successfully!');

    await page.waitForTimeout(2000);

    // Get post link
    try {
      const viewPostLink = await page.locator('a:has-text("View Post")').first().getAttribute('href', { timeout: 3000 });
      console.log(`\n🔗 Published URL: ${viewPostLink}`);
    } catch (e) {
      console.log(`\n🔗 Published URL: https://${site.domain}/?p=${postId}`);
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
 * Main Execution
 */
async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.length < 3) {
      console.log('Usage: node blog-automation-complete.js <brand> <topic> <focus-keyword>');
      console.log('');
      console.log('Brands: ai-projektmanager, aimarketingbg, varna-agenten, varnaai');
      console.log('');
      console.log('Example:');
      console.log('  OPENAI_API_KEY=sk-xxx node blog-automation-complete.js aimarketingbg "AI Email Marketing" "AI email marketing automation 2025"');
      process.exit(1);
    }

    const [brand, topic, focusKeyword] = args;

    console.log('═'.repeat(80));
    console.log('🤖 COMPLETE BLOG AUTOMATION WORKFLOW');
    console.log('═'.repeat(80));
    console.log(`Brand: ${brand}`);
    console.log(`Topic: ${topic}`);
    console.log(`Focus Keyword: ${focusKeyword}`);
    console.log('═'.repeat(80));

    // Get site configuration
    const brandConfig = CONFIG.brands[brand];
    const site = SITE_CONFIG[brandConfig.domain];

    if (!site) {
      throw new Error(`Site configuration not found for domain: ${brandConfig.domain}`);
    }

    // STEP 1: Generate AI content
    console.log('\n📝 STEP 1: Generating AI content...');
    const blogPost = await generateBlogPost(brand, topic, focusKeyword);

    // Convert to WordPress blocks
    console.log('🔄 Converting to WordPress Gutenberg format...');
    const htmlContent = convertToWordPressBlocks(blogPost.content, blogPost.metadata, blogPost.links);

    // Save generated post
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${brand}_${focusKeyword.replace(/\s+/g, '_')}_${timestamp}.md`;
    const outputPath = path.join(__dirname, '..', '..', 'blogs', 'generated', filename);

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const markdown = `# BLOG POST: ${brand.toUpperCase()} - ${focusKeyword}

---

## METADATA

**SEO Title:** ${blogPost.metadata.seoTitle}

**Meta Description:** ${blogPost.metadata.metaDescription}

**Focus Keyword:** ${focusKeyword}

---

## BLOG CONTENT

${htmlContent}

---

_Generated: ${new Date().toISOString()}_
`;

    fs.writeFileSync(outputPath, markdown, 'utf8');
    console.log(`✅ Generated post saved: ${outputPath}`);

    // STEP 2: Create draft via REST API
    console.log('\n📤 STEP 2: Creating draft post...');
    const draft = await createDraftPost(site, {
      title: blogPost.metadata.seoTitle,
      htmlContent
    });

    // STEP 3: Set SEO and publish via browser
    console.log('\n🌐 STEP 3: Setting SEO and publishing...');
    await publishViaBrowser(site, draft.id, draft.editUrl, focusKeyword);

    console.log('\n' + '═'.repeat(80));
    console.log('✅ BLOG POST PUBLISHED SUCCESSFULLY!');
    console.log('═'.repeat(80));
    console.log(`Post ID: ${draft.id}`);
    console.log(`Focus Keyword: ${focusKeyword}`);
    console.log(`View Post: https://${site.domain}/?p=${draft.id}`);
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run
main();
