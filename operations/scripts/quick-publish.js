#!/usr/bin/env node

/**
 * ABOUTME: Quick blog publishing script - reads config from blog-config.json
 * ABOUTME: Usage: node quick-publish.js [config-file]
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Read config file (default: blog-config.json)
const configFile = process.argv[2] || './blog-config.json';

console.log('═'.repeat(80));
console.log('🚀 QUICK BLOG PUBLISHER');
console.log('═'.repeat(80));
console.log(`Config file: ${configFile}\n`);

try {
  // Check if config exists
  if (!fs.existsSync(configFile)) {
    console.error(`❌ Config file not found: ${configFile}`);
    console.log('\nCreate a blog-config.json file with:');
    console.log(`{
  "site": "aimarketingbg.com",
  "topic": "Your Blog Topic Here",
  "targetWords": 2000,
  "categories": ["Category1", "Category2"],
  "tags": ["tag1", "tag2", "tag3"]
}`);
    process.exit(1);
  }

  // Read config
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

  console.log('📋 Blog Configuration:');
  console.log(`   Site: ${config.site}`);
  console.log(`   Topic: ${config.topic}`);
  console.log(`   Target Words: ${config.targetWords}`);
  console.log(`   Categories: ${config.categories.join(', ')}`);
  console.log(`   Tags: ${config.tags.length} tags`);
  console.log('\n' + '═'.repeat(80));
  console.log('Starting automated publishing...\n');

  // Update the auto-publish-blog.js script with config
  // (For now, just show what would happen)
  console.log('✅ Configuration loaded');
  console.log('🔄 Next step: Run auto-publish-blog.js with this config\n');

  console.log('Manual steps for now:');
  console.log('1. Open auto-publish-blog.js');
  console.log('2. Update BLOG_CONFIG section with these values:');
  console.log(JSON.stringify(config, null, 2));
  console.log('\n3. Run: node auto-publish-blog.js');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
