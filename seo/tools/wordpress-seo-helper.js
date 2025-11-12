#!/usr/bin/env node
/**
 * WordPress SEO Helper
 * Automates SEO analysis and optimization for WordPress pages
 */

const { analyzeSEO, researchKeywords, getContentIdeas } = require('./automate-seo-analysis');
const fs = require('fs');

/**
 * Analyze WordPress page and generate optimization report
 */
async function analyzeWordPressPage(url, focusKeyword) {
  console.log('\n🎯 WORDPRESS SEO ANALYSIS\n');
  console.log(`📄 Page: ${url}`);
  console.log(`🎯 Focus Keyword: ${focusKeyword}\n`);

  // Step 1: Analyze current SEO
  console.log('━'.repeat(70));
  console.log('STEP 1: Analyzing current SEO...');
  console.log('━'.repeat(70));
  const seoAnalysis = await analyzeSEO(url);

  if (!seoAnalysis) {
    console.error('❌ Could not analyze page. Is SEO Agent running?');
    return;
  }

  // Step 2: Research keywords
  console.log('\n' + '━'.repeat(70));
  console.log('STEP 2: Researching related keywords...');
  console.log('━'.repeat(70));
  const keywords = await researchKeywords(focusKeyword, 'de');

  // Step 3: Get content ideas
  console.log('\n' + '━'.repeat(70));
  console.log('STEP 3: Getting content improvement ideas...');
  console.log('━'.repeat(70));
  const ideas = await getContentIdeas(focusKeyword, 'enterprise', 'de');

  // Generate comprehensive report
  const report = {
    url,
    focusKeyword,
    analyzedAt: new Date().toISOString(),
    currentSEO: {
      score: seoAnalysis.score,
      status: seoAnalysis.score >= 80 ? 'GOOD' : seoAnalysis.score >= 60 ? 'NEEDS_WORK' : 'POOR',
      issues: seoAnalysis.issues,
      recommendations: seoAnalysis.recommendations
    },
    relatedKeywords: keywords ? keywords.slice(0, 10) : [],
    contentIdeas: ideas ? ideas.slice(0, 5) : [],
    actionItems: generateActionItems(seoAnalysis, keywords, ideas, focusKeyword)
  };

  // Save comprehensive report
  const reportFile = `wordpress-seo-report-${Date.now()}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

  // Print action items
  console.log('\n' + '━'.repeat(70));
  console.log('📋 ACTION ITEMS FOR WORDPRESS PAGE');
  console.log('━'.repeat(70));
  report.actionItems.forEach((item, i) => {
    console.log(`\n${i + 1}. ${item.title}`);
    console.log(`   Priority: ${item.priority}`);
    console.log(`   Action: ${item.action}`);
    if (item.example) {
      console.log(`   Example: ${item.example}`);
    }
  });

  console.log('\n' + '━'.repeat(70));
  console.log(`✅ Complete report saved to: ${reportFile}`);
  console.log('━'.repeat(70));

  return report;
}

/**
 * Generate actionable items from analysis
 */
function generateActionItems(seoAnalysis, keywords, ideas, focusKeyword) {
  const items = [];

  // Priority 1: Critical SEO issues
  if (seoAnalysis.score < 60) {
    items.push({
      priority: '🔴 CRITICAL',
      title: 'Fix Critical SEO Issues',
      action: `Current SEO score is ${seoAnalysis.score}/100. Address all critical issues first.`,
      issues: seoAnalysis.issues.filter(i => i.severity === 'critical')
    });
  }

  // Priority 2: Focus keyword optimization
  items.push({
    priority: '🟡 HIGH',
    title: 'Optimize Focus Keyword Placement',
    action: `Ensure "${focusKeyword}" appears in:`,
    checklist: [
      'URL slug (example: /enterprise-projektmanagement)',
      'First paragraph (start paragraph 2-3 with exact keyword)',
      'At least one H2 or H3 heading',
      '3-5 times throughout content (0.8-0.9% density)',
      'Meta title and description'
    ]
  });

  // Priority 3: Word count
  if (seoAnalysis.wordCount && seoAnalysis.wordCount < 600) {
    items.push({
      priority: '🟡 HIGH',
      title: 'Increase Word Count',
      action: `Current: ${seoAnalysis.wordCount} words. Target: 600+ words.`,
      suggestion: 'Add more detail to feature descriptions, use cases, and benefits.'
    });
  }

  // Priority 4: External links
  if (!seoAnalysis.hasExternalLinks) {
    items.push({
      priority: '🟡 HIGH',
      title: 'Add External Authoritative Links',
      action: 'Add 1-2 DoFollow links to authoritative German sources',
      example: 'Link to BSI (https://www.bsi.bund.de) when discussing security/compliance'
    });
  }

  // Priority 5: Related keywords to include
  if (keywords && keywords.length > 0) {
    items.push({
      priority: '🟢 MEDIUM',
      title: 'Include Related Keywords',
      action: 'Naturally incorporate these high-value keywords:',
      keywords: keywords.slice(0, 5).map(k => `"${k.keyword}" (${k.search_volume} searches/month)`)
    });
  }

  // Priority 6: Content expansion ideas
  if (ideas && ideas.length > 0) {
    items.push({
      priority: '🟢 MEDIUM',
      title: 'Content Expansion Opportunities',
      action: 'Consider adding sections about:',
      ideas: ideas.slice(0, 3).map(idea => idea.title)
    });
  }

  return items;
}

/**
 * Batch analyze all WordPress pages
 */
async function batchAnalyzePages(pages) {
  console.log(`\n🚀 Batch analyzing ${pages.length} WordPress pages...\n`);

  const results = [];

  for (const page of pages) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Analyzing: ${page.title}`);
    console.log('='.repeat(70));

    const result = await analyzeWordPressPage(page.url, page.focusKeyword);
    results.push(result);

    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Generate summary report
  const summaryFile = `batch-seo-summary-${Date.now()}.json`;
  fs.writeFileSync(summaryFile, JSON.stringify(results, null, 2));

  console.log(`\n\n✅ Batch analysis complete! Summary saved to: ${summaryFile}`);

  // Print summary
  console.log('\n📊 BATCH ANALYSIS SUMMARY:\n');
  results.forEach(result => {
    const status = result.currentSEO.status === 'GOOD' ? '✅' :
                   result.currentSEO.status === 'NEEDS_WORK' ? '⚠️' : '❌';
    console.log(`${status} ${result.url.split('/').pop()}: ${result.currentSEO.score}/100`);
  });

  return results;
}

// Export functions
module.exports = {
  analyzeWordPressPage,
  batchAnalyzePages
};

// CLI Interface
if (require.main === module) {
  const command = process.argv[2];

  if (command === 'analyze') {
    const url = process.argv[3];
    const keyword = process.argv[4];

    if (!url || !keyword) {
      console.error('❌ Usage: node wordpress-seo-helper.js analyze <url> <focusKeyword>');
      console.error('\nExample:');
      console.error('  node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/it-sicherheit "IT-Sicherheit Projektmanagement"');
      process.exit(1);
    }

    analyzeWordPressPage(url, keyword);

  } else if (command === 'batch') {
    // Example batch configuration
    const pages = [
      {
        title: 'IT-Sicherheit',
        url: 'https://ai-projektmanager.de/anwendungsfaelle/it-sicherheit',
        focusKeyword: 'IT-Sicherheit Projektmanagement'
      },
      {
        title: 'Compliance',
        url: 'https://ai-projektmanager.de/anwendungsfaelle/compliance',
        focusKeyword: 'Compliance Management'
      },
      {
        title: 'Enterprise',
        url: 'https://ai-projektmanager.de/anwendungsfaelle/enterprise',
        focusKeyword: 'Enterprise Projektmanagement'
      }
    ];

    batchAnalyzePages(pages);

  } else {
    console.log('\n🤖 WordPress SEO Helper\n');
    console.log('📖 AVAILABLE COMMANDS:\n');
    console.log('   analyze <url> <focusKeyword>     - Analyze single WordPress page');
    console.log('   batch                            - Analyze all WordPress pages\n');
    console.log('📝 EXAMPLES:\n');
    console.log('   Single page:');
    console.log('   node wordpress-seo-helper.js analyze https://ai-projektmanager.de/anwendungsfaelle/enterprise "Enterprise Projektmanagement"\n');
    console.log('   Batch analysis:');
    console.log('   node wordpress-seo-helper.js batch\n');
  }
}
