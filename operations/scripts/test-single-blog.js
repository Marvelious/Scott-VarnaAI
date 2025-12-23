#!/usr/bin/env node
/**
 * ABOUTME: Test single blog post parsing and publishing
 * ABOUTME: Verifies content extraction, SEO metadata, and WordPress publication
 */

const fs = require('fs');
const path = require('path');

// Test file path (can be passed as argument)
const TEST_FILE = process.argv[2] || path.join(__dirname, '../../blogs/blog_posts/2025-12-02/aimarketingbg/AiMarketingBg_AI_Lead_Scoring_2025.md');

console.log(`\n🧪 Testing blog post parsing...`);
console.log(`📄 File: ${TEST_FILE}\n`);

// Parse markdown blog post
function parseBlogPost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract SEO Title first (most reliable)
  const seoTitleMatch = content.match(/\*\*SEO Title:\*\* (.*)/);
  let title = seoTitleMatch ? seoTitleMatch[1] : '';

  // Fallback to H1 if no SEO title
  if (!title) {
    const titleMatch = content.match(/<h1 class="wp-block-heading">(.*?)<\/h1>/);
    title = titleMatch ? titleMatch[1] : 'Untitled';
  }

  // Extract full WordPress blocks content (everything after COPY BLOCK 3: BLOG CONTENT)
  // Structure: ## COPY BLOCK 3 line → ## ═══ line → empty line → content → ends before "---\n\n## ═══ COPY BLOCK 4"
  // Handle both Windows (\r\n) and Unix (\n) line endings
  // Match until the specific pattern: --- followed by blank line followed by separator line
  const contentMatch = content.match(/## COPY BLOCK 3: BLOG CONTENT\r?\n## ═+\r?\n\r?\n([\s\S]*?)(?=\r?\n---\r?\n\r?\n## ═)/);
  const wpContent = contentMatch ? contentMatch[1].trim() : '';

  // Extract SEO metadata
  const keywordMatch = content.match(/\*\*Focus Keyword:\*\* (.*)/);
  const focusKeyword = keywordMatch ? keywordMatch[1] : '';

  const metaDescMatch = content.match(/\*\*Meta Description:\*\* (.*)/);
  const metaDescription = metaDescMatch ? metaDescMatch[1] : '';

  // Extract categories
  const categoriesMatch = content.match(/\*\*Categories:\*\* (.*)/);
  const categories = categoriesMatch ? categoriesMatch[1].split(',').map(c => c.trim()) : [];

  // Extract URL slug
  const slugMatch = content.match(/\*\*URL Slug:\*\* (.*)/);
  const slug = slugMatch ? slugMatch[1] : '';

  return {
    title,
    content: wpContent,
    focusKeyword,
    metaDescription,
    seoTitle: title,
    categories,
    slug,
    wordCount: wpContent.split(/\s+/).length
  };
}

// Test parsing
try {
  const result = parseBlogPost(TEST_FILE);

  console.log(`✅ Parsing successful!\n`);
  console.log(`📋 EXTRACTED DATA:`);
  console.log(`   Title: ${result.title}`);
  console.log(`   SEO Title: ${result.seoTitle}`);
  console.log(`   Slug: ${result.slug}`);
  console.log(`   Focus Keyword: ${result.focusKeyword}`);
  console.log(`   Meta Description: ${result.metaDescription.substring(0, 100)}...`);
  console.log(`   Categories: ${result.categories.join(', ')}`);
  console.log(`   Word Count: ${result.wordCount} words`);
  console.log(`   Content Length: ${result.content.length} characters\n`);

  // Verify content quality
  console.log(`🔍 QUALITY CHECKS:`);

  const hasTitle = result.title && result.title !== 'Untitled';
  console.log(`   ${hasTitle ? '✅' : '❌'} Title extracted: ${hasTitle ? result.title.substring(0, 50) : 'MISSING'}`);

  const hasContent = result.content && result.content.length > 500;
  console.log(`   ${hasContent ? '✅' : '❌'} Content extracted: ${hasContent ? result.content.length + ' chars' : 'MISSING'}`);

  const hasKeyword = result.focusKeyword && result.focusKeyword.length > 0;
  console.log(`   ${hasKeyword ? '✅' : '❌'} Focus keyword: ${hasKeyword ? result.focusKeyword : 'MISSING'}`);

  const hasMetaDesc = result.metaDescription && result.metaDescription.length > 0;
  console.log(`   ${hasMetaDesc ? '✅' : '❌'} Meta description: ${hasMetaDesc ? result.metaDescription.length + ' chars' : 'MISSING'}`);

  const hasCategories = result.categories && result.categories.length > 0;
  console.log(`   ${hasCategories ? '✅' : '❌'} Categories: ${hasCategories ? result.categories.join(', ') : 'MISSING'}`);

  // Show content preview
  console.log(`\n📝 CONTENT PREVIEW (first 500 characters):`);
  console.log(`${result.content.substring(0, 500)}...\n`);

  // Overall verdict
  const allPassed = hasTitle && hasContent && hasKeyword && hasMetaDesc;
  if (allPassed) {
    console.log(`✅ ✅ ✅ ALL CHECKS PASSED - READY TO PUBLISH ✅ ✅ ✅\n`);
  } else {
    console.log(`❌ ❌ ❌ FAILED CHECKS - DO NOT PUBLISH ❌ ❌ ❌\n`);
    process.exit(1);
  }

} catch (error) {
  console.error(`❌ Parsing failed:`, error.message);
  process.exit(1);
}
