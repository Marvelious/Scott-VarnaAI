#!/usr/bin/env node
/**
 * ABOUTME: Check word count for all blog posts
 * ABOUTME: Identify posts that exceed 2000-word target
 */

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_DIR = path.join(__dirname, '../../blogs/blog_posts/2025-12-02');
const TARGET_WORDS = 2000;
const MAX_ACCEPTABLE = 2500; // 25% over target

function extractBlogContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Try primary format: ## COPY BLOCK 3: BLOG CONTENT
  let contentMatch = content.match(/## COPY BLOCK 3: BLOG CONTENT\r?\n## ═+\r?\n\r?\n([\s\S]*?)(?=\r?\n---\r?\n\r?\n## ═)/);

  // Try second format: ## BLOG CONTENT
  if (!contentMatch) {
    contentMatch = content.match(/## BLOG CONTENT\r?\n\r?\n<!-- Focus keyword.*?-->\r?\n\r?\n([\s\S]*?)(?=\r?\n---\r?\n\r?\n##)/);
  }

  return contentMatch ? contentMatch[1].trim() : '';
}

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

// Scan all blog posts
const sites = ['ai-projektmanager', 'aimarketingbg', 'varna-agenten', 'varnaai'];
const results = [];

console.log('📊 Blog Post Word Count Analysis\n');
console.log(`Target: ${TARGET_WORDS} words | Max acceptable: ${MAX_ACCEPTABLE} words\n`);

for (const site of sites) {
  const siteDir = path.join(BLOG_POSTS_DIR, site);

  if (!fs.existsSync(siteDir)) {
    console.log(`⚠️  Skipping ${site} - directory not found`);
    continue;
  }

  const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.md'));

  console.log(`\n📁 ${site.toUpperCase()} (${files.length} posts)`);
  console.log('─'.repeat(80));

  for (const file of files) {
    const filePath = path.join(siteDir, file);
    const blogContent = extractBlogContent(filePath);
    const wordCount = countWords(blogContent);

    const status = wordCount > MAX_ACCEPTABLE ? '❌ TOO LONG' :
                   wordCount > TARGET_WORDS ? '⚠️  OVER' :
                   '✅ OK';

    const percentOver = ((wordCount - TARGET_WORDS) / TARGET_WORDS * 100).toFixed(0);

    console.log(`${status} ${file.substring(0, 50).padEnd(50)} ${wordCount} words (+${percentOver}%)`);

    results.push({
      site,
      file,
      wordCount,
      percentOver: parseInt(percentOver)
    });
  }
}

// Summary
const tooLong = results.filter(r => r.wordCount > MAX_ACCEPTABLE);
const over = results.filter(r => r.wordCount > TARGET_WORDS && r.wordCount <= MAX_ACCEPTABLE);
const ok = results.filter(r => r.wordCount <= TARGET_WORDS);

console.log('\n\n📊 SUMMARY');
console.log('═'.repeat(80));
console.log(`Total posts: ${results.length}`);
console.log(`✅ Within target (≤${TARGET_WORDS}): ${ok.length}`);
console.log(`⚠️  Over target but acceptable (${TARGET_WORDS}-${MAX_ACCEPTABLE}): ${over.length}`);
console.log(`❌ Too long (>${MAX_ACCEPTABLE}): ${tooLong.length}`);

if (tooLong.length > 0) {
  console.log('\n\n🚨 CRITICAL: Posts requiring regeneration or editing:');
  tooLong.forEach(r => {
    console.log(`   ${r.site}/${r.file}: ${r.wordCount} words (+${r.percentOver}%)`);
  });
}

console.log('\n');
