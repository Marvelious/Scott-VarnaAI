#!/usr/bin/env node

/**
 * Blog Post Audit Script
 * Analyzes all 28 blog posts for quality, consistency, and SEO metrics
 */

const fs = require('fs');
const path = require('path');

// Blog post directories
const BASE_DIR = 'D:\\VarnaAI\\Websites\\blogs\\blog_posts\\2025-12-02';
const BRANDS = ['ai-projektmanager', 'aimarketingbg', 'varna-agenten', 'varnaai'];

// Audit results
const auditResults = {
  timestamp: new Date().toISOString(),
  totalPosts: 0,
  byBrand: {},
  issues: [],
  summary: {
    avgWordCount: 0,
    totalWordCount: 0,
    overLength: [],
    underLength: [],
    missingMetadata: [],
    formatIssues: []
  }
};

/**
 * Extract metadata from blog post file
 */
function extractMetadata(content, filename) {
  const metadata = {
    filename: filename,
    seoTitle: null,
    metaDescription: null,
    urlSlug: null,
    focusKeyword: null,
    wordCount: 0,
    focusKeywordCount: 0,
    internalLinks: 0,
    externalLinks: 0,
    images: 0,
    faqCount: 0,
    h2Count: 0,
    categories: null,
    tags: null
  };

  // Extract SEO metadata
  const seoTitleMatch = content.match(/\*\*SEO Title:\*\*\s*(.+)/);
  if (seoTitleMatch) metadata.seoTitle = seoTitleMatch[1].trim();

  const metaDescMatch = content.match(/\*\*Meta Description:\*\*\s*(.+)/);
  if (metaDescMatch) metadata.metaDescription = metaDescMatch[1].trim();

  const urlSlugMatch = content.match(/\*\*URL Slug:\*\*\s*(.+)/);
  if (urlSlugMatch) metadata.urlSlug = urlSlugMatch[1].trim();

  const focusKeywordMatch = content.match(/\*\*Focus Keyword:\*\*\s*(.+)/);
  if (focusKeywordMatch) metadata.focusKeyword = focusKeywordMatch[1].trim();

  const categoriesMatch = content.match(/\*\*Categories:\*\*\s*(.+)/);
  if (categoriesMatch) metadata.categories = categoriesMatch[1].trim();

  const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/);
  if (tagsMatch) metadata.tags = tagsMatch[1].trim();

  // Extract word count from metrics section
  const wordCountMatch = content.match(/\*\*Word Count:\*\*\s*(\d+)\s*words/);
  if (wordCountMatch) {
    metadata.wordCount = parseInt(wordCountMatch[1], 10);
  } else {
    // Fallback: count words in content section
    const contentMatch = content.match(/## COPY BLOCK 3: BLOG CONTENT[\s\S]*?(?=## ═{20,}|$)/);
    if (contentMatch) {
      const wordMatches = contentMatch[0].match(/\b\w+\b/g);
      metadata.wordCount = wordMatches ? wordMatches.length : 0;
    }
  }

  // Extract focus keyword occurrences
  const keywordOccurrencesMatch = content.match(/\*\*Focus Keyword .* Occurrences:\*\*\s*(\d+)/);
  if (keywordOccurrencesMatch) {
    metadata.focusKeywordCount = parseInt(keywordOccurrencesMatch[1], 10);
  } else if (metadata.focusKeyword) {
    // Fallback: count manually
    const regex = new RegExp(metadata.focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    metadata.focusKeywordCount = matches ? matches.length : 0;
  }

  // Count internal links
  const internalLinkMatches = content.match(/<a href="https?:\/\/(ai-projektmanager\.de|aimarketingbg\.com|varna-agenten\.de|varnaai\.com)/g);
  metadata.internalLinks = internalLinkMatches ? internalLinkMatches.length : 0;

  // Count external links
  const externalLinkMatches = content.match(/<a href="https?:\/\/(?!(ai-projektmanager\.de|aimarketingbg\.com|varna-agenten\.de|varnaai\.com))/g);
  metadata.externalLinks = externalLinkMatches ? externalLinkMatches.length : 0;

  // Count images
  const imageMatches = content.match(/\*\*\[Image \d+ Placeholder\]\*\*/g);
  metadata.images = imageMatches ? imageMatches.length : 0;

  // Count FAQ questions
  const faqMatches = content.match(/### Q\d+:/g);
  metadata.faqCount = faqMatches ? faqMatches.length : 0;

  // Count H2 headings
  const h2Matches = content.match(/^## [^═]/gm);
  metadata.h2Count = h2Matches ? h2Matches.length : 0;

  return metadata;
}

/**
 * Validate metadata completeness
 */
function validateMetadata(metadata) {
  const issues = [];

  if (!metadata.seoTitle) issues.push('Missing SEO Title');
  if (!metadata.metaDescription) issues.push('Missing Meta Description');
  if (!metadata.urlSlug) issues.push('Missing URL Slug');
  if (!metadata.focusKeyword) issues.push('Missing Focus Keyword');
  if (!metadata.categories) issues.push('Missing Categories');
  if (!metadata.tags) issues.push('Missing Tags');

  if (metadata.wordCount === 0) issues.push('Word count is 0 (extraction failed)');
  if (metadata.wordCount < 2000) issues.push(`Under-length: ${metadata.wordCount} words (target: 2000)`);
  if (metadata.wordCount > 2600) issues.push(`Over-length: ${metadata.wordCount} words (target: 2000-2500)`);

  if (metadata.focusKeywordCount < 10) issues.push(`Low keyword density: ${metadata.focusKeywordCount} occurrences`);
  if (metadata.internalLinks < 7) issues.push(`Not enough internal links: ${metadata.internalLinks} (target: 7)`);
  if (metadata.externalLinks < 3) issues.push(`Not enough external links: ${metadata.externalLinks} (target: 3)`);
  if (metadata.images < 3) issues.push(`Not enough images: ${metadata.images} (target: 5-7)`);
  if (metadata.faqCount < 3) issues.push(`Not enough FAQ questions: ${metadata.faqCount} (target: 5-6)`);

  return issues;
}

/**
 * Audit all blog posts
 */
function auditAllPosts() {
  console.log('🔍 Starting blog post audit...\n');

  BRANDS.forEach(brand => {
    const brandDir = path.join(BASE_DIR, brand);
    if (!fs.existsSync(brandDir)) {
      console.log(`⚠️  Brand directory not found: ${brand}`);
      return;
    }

    const files = fs.readdirSync(brandDir).filter(f => f.endsWith('.md'));

    auditResults.byBrand[brand] = {
      totalPosts: files.length,
      posts: []
    };

    console.log(`\n📁 ${brand}: ${files.length} posts`);
    console.log('─'.repeat(80));

    files.forEach(file => {
      const filepath = path.join(brandDir, file);
      const content = fs.readFileSync(filepath, 'utf8');

      const metadata = extractMetadata(content, file);
      const issues = validateMetadata(metadata);

      auditResults.byBrand[brand].posts.push({
        ...metadata,
        issues: issues
      });

      auditResults.totalPosts++;
      auditResults.summary.totalWordCount += metadata.wordCount;

      // Track issues
      if (metadata.wordCount > 2600) {
        auditResults.summary.overLength.push({ brand, file, wordCount: metadata.wordCount });
      }
      if (metadata.wordCount < 2000 && metadata.wordCount > 0) {
        auditResults.summary.underLength.push({ brand, file, wordCount: metadata.wordCount });
      }
      if (metadata.wordCount === 0) {
        auditResults.summary.missingMetadata.push({ brand, file, reason: 'Word count extraction failed' });
      }
      if (issues.length > 0) {
        auditResults.summary.formatIssues.push({ brand, file, issues });
      }

      // Console output
      const status = issues.length === 0 ? '✅' : '⚠️ ';
      console.log(`${status} ${file}`);
      console.log(`   📊 ${metadata.wordCount} words | 🔑 ${metadata.focusKeywordCount}x "${metadata.focusKeyword}"`);
      console.log(`   🔗 ${metadata.internalLinks} internal + ${metadata.externalLinks} external links | 🖼️  ${metadata.images} images | ❓ ${metadata.faqCount} FAQs`);

      if (issues.length > 0) {
        issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
      }
      console.log('');
    });
  });

  // Calculate average word count
  if (auditResults.totalPosts > 0) {
    auditResults.summary.avgWordCount = Math.round(auditResults.summary.totalWordCount / auditResults.totalPosts);
  }

  // Print summary
  console.log('\n' + '═'.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total Posts: ${auditResults.totalPosts}`);
  console.log(`Average Word Count: ${auditResults.summary.avgWordCount} words`);
  console.log(`Total Word Count: ${auditResults.summary.totalWordCount.toLocaleString()} words`);
  console.log('');
  console.log(`✅ Posts within target (2000-2600 words): ${auditResults.totalPosts - auditResults.summary.overLength.length - auditResults.summary.underLength.length}`);
  console.log(`⚠️  Over-length posts (>2600 words): ${auditResults.summary.overLength.length}`);
  console.log(`⚠️  Under-length posts (<2000 words): ${auditResults.summary.underLength.length}`);
  console.log(`❌ Posts with extraction failures: ${auditResults.summary.missingMetadata.length}`);
  console.log(`⚠️  Posts with format issues: ${auditResults.summary.formatIssues.length}`);
  console.log('');

  if (auditResults.summary.overLength.length > 0) {
    console.log('\n📏 OVER-LENGTH POSTS (>2600 words):');
    auditResults.summary.overLength.forEach(post => {
      const percent = Math.round(((post.wordCount - 2000) / 2000) * 100);
      console.log(`   ${post.brand}/${post.file}: ${post.wordCount} words (+${percent}%)`);
    });
  }

  if (auditResults.summary.underLength.length > 0) {
    console.log('\n📏 UNDER-LENGTH POSTS (<2000 words):');
    auditResults.summary.underLength.forEach(post => {
      const percent = Math.round(((2000 - post.wordCount) / 2000) * 100);
      console.log(`   ${post.brand}/${post.file}: ${post.wordCount} words (-${percent}%)`);
    });
  }

  if (auditResults.summary.missingMetadata.length > 0) {
    console.log('\n❌ POSTS WITH EXTRACTION FAILURES:');
    auditResults.summary.missingMetadata.forEach(post => {
      console.log(`   ${post.brand}/${post.file}: ${post.reason}`);
    });
  }

  // Save audit report
  const reportPath = path.join(BASE_DIR, 'AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2), 'utf8');
  console.log(`\n💾 Detailed audit report saved: ${reportPath}`);

  return auditResults;
}

// Run audit
auditAllPosts();
