#!/usr/bin/env node

/**
 * AI-Powered Blog Writing Automation Tool
 *
 * Generates complete, SEO-optimized blog posts using AI (OpenAI GPT-4 or Claude)
 *
 * Features:
 * - Real AI-generated content (OpenAI GPT-4 or Claude)
 * - WordPress Gutenberg block format
 * - SEO metadata (title, description, focus keyword)
 * - Internal/external links (7 internal + 3 external)
 * - Proper formatting (H2/H3, paragraphs, spacers)
 * - 2000-word target with keyword optimization
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  // AI Provider Configuration
  ai: {
    provider: process.env.AI_PROVIDER || 'openai', // 'openai' or 'claude'
    apiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4-turbo-preview', // or 'claude-3-opus-20240229'
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
      { url: 'https://gdpr.eu/', name: 'GDPR Official Portal' }
    ],
    english: [
      { url: 'https://www.gartner.com/', name: 'Gartner Research' },
      { url: 'https://www.forrester.com/', name: 'Forrester' },
      { url: 'https://www.mckinsey.com/', name: 'McKinsey & Company' }
    ]
  },

  wordCount: {
    target: 2000,
    min: 1800,
    max: 2200
  }
};

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.ai.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer specializing in creating high-quality, engaging blog posts that rank well in search engines while providing genuine value to readers.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: CONFIG.ai.maxTokens,
      temperature: CONFIG.ai.temperature
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.ai.apiKey}`,
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

/**
 * Call Anthropic Claude API
 */
async function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.ai.model,
      max_tokens: CONFIG.ai.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: CONFIG.ai.temperature
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONFIG.ai.apiKey,
        'anthropic-version': '2023-06-01',
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

/**
 * Generate content using AI
 */
async function generateAIContent(prompt) {
  console.log(`   Using ${CONFIG.ai.provider.toUpperCase()} (${CONFIG.ai.model})...`);

  if (CONFIG.ai.provider === 'openai') {
    return await callOpenAI(prompt);
  } else if (CONFIG.ai.provider === 'claude') {
    return await callClaude(prompt);
  } else {
    throw new Error(`Unknown AI provider: ${CONFIG.ai.provider}`);
  }
}

/**
 * Generate blog post with AI
 */
async function generateBlogPost(brand, topic, focusKeyword) {
  const brandConfig = CONFIG.brands[brand];
  const language = brandConfig.language;
  const authorities = language === 'German' ? CONFIG.externalAuthorities.german : CONFIG.externalAuthorities.english;

  // Select internal links (7 links)
  const internalLinks = brandConfig.internalPages.slice(0, 7);

  // Select external links (3 links)
  const externalLinks = authorities.slice(0, 3);

  console.log('\n🤖 Generating blog post content with AI...');

  // Build comprehensive prompt
  const prompt = `Write a complete, SEO-optimized blog post in ${language} about "${topic}" for ${brandConfig.domain}.

**CRITICAL REQUIREMENTS:**

1. **Focus Keyword:** Use "${focusKeyword}" exactly 18-22 times throughout the post (1% density for 2000 words)
2. **Word Count:** Write exactly 2000 words (±100 words)
3. **Language:** Write entirely in ${language}
4. **Tone:** ${brandConfig.tone}
5. **Industry Focus:** ${brandConfig.focus}

**STRUCTURE (Must follow exactly):**

# Title: [Engaging H1 title with focus keyword]

## Introduction (3 paragraphs)
- Paragraph 1: START with "${focusKeyword}" and explain what it is
- Paragraph 2: Why it matters now (include industry data/trends)
- Paragraph 3: What readers will learn

## Section 1: [H2 heading related to topic]
### Subsection 1.1 [H3 heading]
[2-3 paragraphs]

### Subsection 1.2 [H3 heading]
[2-3 paragraphs]

## Section 2: [H2 heading related to topic]
### Subsection 2.1 [H3 heading]
[2-3 paragraphs]

### Subsection 2.2 [H3 heading]
[2-3 paragraphs]

## Section 3: [H2 heading - Implementation/Use Cases]
[3-4 paragraphs with practical examples]

## Conclusion
- Paragraph 1: Summarize key points (mention "${focusKeyword}" again)
- Paragraph 2: Call-to-action

**LINK PLACEMENT (Critical - embed naturally in content):**

Internal links to include (use naturally in context):
${internalLinks.map((link, i) => `${i + 1}. ${link}`).join('\n')}

External authority links to include (use with "research shows", "according to", etc.):
${externalLinks.map((link, i) => `${i + 1}. ${link.url} (${link.name})`).join('\n')}

**FORMATTING RULES:**
- Use short paragraphs (maximum 3 sentences each)
- Include specific data points and statistics where relevant
- Write in active voice
- Avoid generic fluff - provide actionable insights
- Use transition words between paragraphs
- Make content scannable with clear headings

**SEO OPTIMIZATION:**
- Use "${focusKeyword}" in: H1, first paragraph, one H2 heading, conclusion
- Distribute focus keyword naturally (18-22 total mentions)
- Use semantic variations and related keywords
- Include numbers and specifics in headings where appropriate

Write the complete blog post now in plain text format (no markdown symbols, just plain text with clear section breaks).`;

  // Generate content
  const content = await generateAIContent(prompt);

  console.log(`✅ AI generated ${content.split(/\s+/).length} words`);

  return {
    content,
    metadata: {
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

/**
 * Convert AI text to WordPress Gutenberg blocks
 */
function convertToWordPressBlocks(aiContent, metadata, links) {
  let html = '';

  // Split content into sections
  const lines = aiContent.split('\n').filter(line => line.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // H1 heading
    if (line.startsWith('# ')) {
      const title = line.replace(/^#\s+/, '');
      html += '<!-- wp:heading {"level":1} -->\n';
      html += `<h1 class="wp-block-heading">${title}</h1>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    // H2 heading
    else if (line.startsWith('## ')) {
      const title = line.replace(/^##\s+/, '');

      // Add spacer before H2 (except first one)
      if (html.includes('<h2')) {
        html += '<!-- wp:spacer {"height":"40px"} -->\n';
        html += '<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>\n';
        html += '<!-- /wp:spacer -->\n\n';
      }

      html += '<!-- wp:heading -->\n';
      html += `<h2 class="wp-block-heading">${title}</h2>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    // H3 heading
    else if (line.startsWith('### ')) {
      const title = line.replace(/^###\s+/, '');
      html += '<!-- wp:heading {"level":3} -->\n';
      html += `<h3 class="wp-block-heading">${title}</h3>\n`;
      html += '<!-- /wp:heading -->\n\n';
    }
    // Paragraph
    else if (line.length > 20) {
      html += '<!-- wp:paragraph -->\n';
      html += `<p>${line}</p>\n`;
      html += '<!-- /wp:paragraph -->\n\n';
    }
  }

  // Embed links into content (replace URLs with proper HTML links)
  links.internal.forEach(link => {
    const linkText = extractLinkText(link);
    const regex = new RegExp(link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, `<a href="${link}" target="_blank">${linkText}</a>`);
  });

  links.external.forEach(link => {
    const regex = new RegExp(link.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, `<a href="${link.url}" target="_blank" rel="noopener">${link.name}</a>`);
  });

  return html;
}

function extractLinkText(url) {
  const path = url.split('/').filter(p => p && p !== 'https:' && p !== 'http:').slice(1).join(' ');
  return path || url.split('/')[2];
}

/**
 * Generate SEO metadata
 */
function generateMetadata(content, focusKeyword, brand) {
  const brandConfig = CONFIG.brands[brand];

  // Extract H1 title
  const h1Match = content.match(/# (.+)/);
  const title = h1Match ? h1Match[1] : `${focusKeyword}: Complete Guide 2025`;

  // Generate meta description (first 155 chars of first paragraph)
  const firstPara = content.split('\n').find(line => line.length > 100 && !line.startsWith('#'));
  const metaDescription = firstPara ? firstPara.substring(0, 155).trim() + '...' : `${focusKeyword} comprehensive guide for ${brandConfig.domain}`;

  return {
    seoTitle: title.substring(0, 60),
    metaDescription: metaDescription.substring(0, 155),
    focusKeyword
  };
}

/**
 * Save blog post to file
 */
function saveBlogPost(content, metadata, htmlContent, outputPath) {
  const markdown = `# BLOG POST: ${metadata.brand.toUpperCase()} - ${metadata.focusKeyword}

---

## METADATA

**SEO Title:** ${metadata.seoTitle}

**Meta Description:** ${metadata.metaDescription}

**Focus Keyword:** ${metadata.focusKeyword}

---

## BLOG CONTENT

${htmlContent}

---

_AI Generated: ${new Date().toISOString()}_
_Model: ${CONFIG.ai.provider} (${CONFIG.ai.model})_
_Word Count: ${content.split(/\s+/).length} words_
`;

  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log(`✅ Blog post saved: ${outputPath}`);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: node generate-blog-ai.js <brand> <topic> <focus-keyword>');
    console.log('');
    console.log('Brands: ai-projektmanager, aimarketingbg, varna-agenten, varnaai');
    console.log('');
    console.log('Environment Variables Required:');
    console.log('  OPENAI_API_KEY=sk-...        (for OpenAI GPT-4)');
    console.log('  or');
    console.log('  ANTHROPIC_API_KEY=sk-ant-... (for Claude)');
    console.log('  AI_PROVIDER=openai|claude    (optional, default: openai)');
    console.log('');
    console.log('Example:');
    console.log('  OPENAI_API_KEY=sk-xxx node generate-blog-ai.js aimarketingbg "AI Email Marketing" "AI email marketing automation 2025"');
    process.exit(1);
  }

  const [brand, topic, focusKeyword] = args;

  if (!CONFIG.brands[brand]) {
    console.error(`❌ Invalid brand: ${brand}`);
    console.error('Available brands:', Object.keys(CONFIG.brands).join(', '));
    process.exit(1);
  }

  if (!CONFIG.ai.apiKey) {
    console.error('❌ API key not found!');
    console.error('Set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable');
    process.exit(1);
  }

  console.log('═'.repeat(80));
  console.log('🤖 AI-POWERED BLOG WRITING AUTOMATION');
  console.log('═'.repeat(80));
  console.log(`Brand: ${brand}`);
  console.log(`Topic: ${topic}`);
  console.log(`Focus Keyword: ${focusKeyword}`);
  console.log(`AI Provider: ${CONFIG.ai.provider} (${CONFIG.ai.model})`);
  console.log('═'.repeat(80));

  try {
    // Generate blog post with AI
    const result = await generateBlogPost(brand, topic, focusKeyword);

    // Generate metadata
    const metadata = {
      ...generateMetadata(result.content, focusKeyword, brand),
      ...result.metadata
    };

    // Convert to WordPress blocks
    console.log('\n🔄 Converting to WordPress Gutenberg format...');
    const htmlContent = convertToWordPressBlocks(result.content, metadata, result.links);

    // Save to file
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${brand}_${focusKeyword.replace(/\s+/g, '_')}_${timestamp}_AI.md`;
    const outputPath = path.join(__dirname, '..', '..', 'blogs', 'generated', filename);

    // Create directory if needed
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    saveBlogPost(result.content, metadata, htmlContent, outputPath);

    console.log('\n' + '═'.repeat(80));
    console.log('✅ AI-GENERATED BLOG POST COMPLETE!');
    console.log('═'.repeat(80));
    console.log(`Output: ${outputPath}`);
    console.log(`Word Count: ${result.content.split(/\s+/).length} words`);
    console.log(`Focus Keyword: "${focusKeyword}"`);
    console.log(`Internal Links: ${result.links.internal.length}`);
    console.log(`External Links: ${result.links.external.length}`);
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run
main();
