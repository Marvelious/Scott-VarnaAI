#!/usr/bin/env node
/**
 * SEO Analysis Automation
 * Analyzes WordPress pages and generates SEO reports
 */

const axios = require('axios');
const fs = require('fs');

const SEO_AGENT_API = 'http://localhost:4000';

/**
 * 1. ANALYZE WEBSITE FOR SEO
 * Checks any URL and returns SEO score + problems
 */
async function analyzeSEO(url) {
  console.log(`\n🔍 Analyzing SEO for: ${url}`);

  try {
    const response = await axios.post(`${SEO_AGENT_API}/api/seo/analyze`, {
      url: url,
      includeContent: true,
      checkBacklinks: true,
      checkPerformance: true
    });

    const analysis = response.data;

    console.log('\n📊 SEO ANALYSIS RESULTS:');
    console.log(`   SEO Score: ${analysis.score}/100`);
    console.log(`   Status: ${analysis.score >= 80 ? '✅ GOOD' : analysis.score >= 60 ? '⚠️ NEEDS WORK' : '❌ POOR'}`);

    console.log('\n❌ PROBLEMS FOUND:');
    if (analysis.issues && analysis.issues.length > 0) {
      analysis.issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue.severity} - ${issue.message}`);
      });
    } else {
      console.log('   None - page looks good!');
    }

    console.log('\n✅ RECOMMENDATIONS:');
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      analysis.recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
    }

    // Save report to file
    const reportFile = `seo-report-${Date.now()}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(analysis, null, 2));
    console.log(`\n💾 Full report saved to: ${reportFile}`);

    return analysis;
  } catch (error) {
    console.error('❌ Error analyzing SEO:', error.message);
    if (error.response) {
      console.error('   Server responded:', error.response.status, error.response.data);
    }
    return null;
  }
}

/**
 * 2. RESEARCH KEYWORDS
 * Find good keywords to target for rankings
 */
async function researchKeywords(topic, language = 'de') {
  console.log(`\n🔍 Researching keywords for: ${topic} (${language})`);

  try {
    const response = await axios.post(`${SEO_AGENT_API}/api/keywords/research`, {
      seed_keyword: topic,
      language: language,
      country: language === 'de' ? 'DE' : 'US',
      limit: 20
    });

    const keywords = response.data.keywords;

    console.log('\n📈 TOP KEYWORDS:');
    console.log('   Keyword                          | Volume | Difficulty | CPC');
    console.log('   ' + '-'.repeat(70));

    keywords.slice(0, 10).forEach(kw => {
      const keyword = kw.keyword.padEnd(32);
      const volume = String(kw.search_volume || 'N/A').padEnd(6);
      const difficulty = String(kw.difficulty || 'N/A').padEnd(10);
      const cpc = String(kw.cpc || 'N/A').padEnd(5);
      console.log(`   ${keyword} | ${volume} | ${difficulty} | €${cpc}`);
    });

    // Save keywords to file
    const keywordFile = `keywords-${topic.replace(/\s+/g, '-')}-${Date.now()}.json`;
    fs.writeFileSync(keywordFile, JSON.stringify(keywords, null, 2));
    console.log(`\n💾 Full keyword list saved to: ${keywordFile}`);

    return keywords;
  } catch (error) {
    console.error('❌ Error researching keywords:', error.message);
    return null;
  }
}

/**
 * 6. MONITOR RANKINGS
 * Watch website positions in Google
 */
async function checkRankings(url, keywords) {
  console.log(`\n📊 Checking rankings for: ${url}`);

  try {
    const response = await axios.post(`${SEO_AGENT_API}/api/rankings/check`, {
      url: url,
      keywords: keywords,
      search_engine: 'google.de',
      location: 'Germany'
    });

    const rankings = response.data.rankings;

    console.log('\n🎯 CURRENT RANKINGS:');
    console.log('   Keyword                    | Position | Change');
    console.log('   ' + '-'.repeat(55));

    rankings.forEach(rank => {
      const keyword = rank.keyword.padEnd(26);
      const position = rank.position ? `#${rank.position}`.padEnd(8) : 'Not ranked'.padEnd(8);
      const change = rank.change ? (rank.change > 0 ? `📈 +${rank.change}` : `📉 ${rank.change}`) : '—';
      console.log(`   ${keyword} | ${position} | ${change}`);
    });

    // Save rankings to file
    const rankingFile = `rankings-${Date.now()}.json`;
    fs.writeFileSync(rankingFile, JSON.stringify(rankings, null, 2));
    console.log(`\n💾 Rankings saved to: ${rankingFile}`);

    return rankings;
  } catch (error) {
    console.error('❌ Error checking rankings:', error.message);
    return null;
  }
}

/**
 * 8. FIND BACKLINKS
 * Discover who links to your site
 */
async function findBacklinks(url) {
  console.log(`\n🔗 Finding backlinks for: ${url}`);

  try {
    const response = await axios.get(`${SEO_AGENT_API}/api/backlinks/analyze`, {
      params: { url: url }
    });

    const backlinks = response.data.backlinks;

    console.log('\n🔗 BACKLINK PROFILE:');
    console.log(`   Total Backlinks: ${backlinks.total_backlinks}`);
    console.log(`   Referring Domains: ${backlinks.referring_domains}`);
    console.log(`   Domain Authority: ${backlinks.domain_authority}/100`);

    console.log('\n📊 TOP BACKLINKS:');
    console.log('   Source Domain              | Authority | Link Type');
    console.log('   ' + '-'.repeat(60));

    backlinks.links.slice(0, 10).forEach(link => {
      const domain = link.source_domain.padEnd(26);
      const authority = String(link.authority).padEnd(9);
      const type = link.dofollow ? '✅ DoFollow' : '⚠️ NoFollow';
      console.log(`   ${domain} | ${authority} | ${type}`);
    });

    // Save backlinks to file
    const backlinkFile = `backlinks-${Date.now()}.json`;
    fs.writeFileSync(backlinkFile, JSON.stringify(backlinks, null, 2));
    console.log(`\n💾 Backlinks saved to: ${backlinkFile}`);

    return backlinks;
  } catch (error) {
    console.error('❌ Error finding backlinks:', error.message);
    return null;
  }
}

/**
 * 9. GET ANALYTICS
 * See traffic, visitors, page views
 */
async function getAnalytics(websiteId, timeRange = '30d') {
  console.log(`\n📈 Getting analytics for website ID: ${websiteId}`);

  try {
    const response = await axios.get(`${SEO_AGENT_API}/api/analytics/website/${websiteId}`, {
      params: { timeRange: timeRange }
    });

    const analytics = response.data;

    console.log('\n📊 ANALYTICS SUMMARY:');
    console.log(`   Time Period: ${timeRange}`);
    console.log(`   Total Visits: ${analytics.total_visits}`);
    console.log(`   Unique Visitors: ${analytics.unique_visitors}`);
    console.log(`   Page Views: ${analytics.page_views}`);
    console.log(`   Avg Session Duration: ${analytics.avg_session_duration}s`);
    console.log(`   Bounce Rate: ${analytics.bounce_rate}%`);

    console.log('\n📈 TOP PAGES:');
    console.log('   Page                              | Views  | Avg Time');
    console.log('   ' + '-'.repeat(65));

    analytics.top_pages.slice(0, 5).forEach(page => {
      const path = page.path.padEnd(33);
      const views = String(page.views).padEnd(6);
      const time = `${page.avg_time}s`;
      console.log(`   ${path} | ${views} | ${time}`);
    });

    // Save analytics to file
    const analyticsFile = `analytics-${websiteId}-${Date.now()}.json`;
    fs.writeFileSync(analyticsFile, JSON.stringify(analytics, null, 2));
    console.log(`\n💾 Analytics saved to: ${analyticsFile}`);

    return analytics;
  } catch (error) {
    console.error('❌ Error getting analytics:', error.message);
    return null;
  }
}

/**
 * 14. GET CONTENT IDEAS
 * Suggestions for what to write about
 */
async function getContentIdeas(topic, niche, language = 'de') {
  console.log(`\n💡 Getting content ideas for: ${topic} in ${niche}`);

  try {
    const response = await axios.post(`${SEO_AGENT_API}/api/content/ideas`, {
      topic: topic,
      niche: niche,
      language: language,
      count: 10
    });

    const ideas = response.data.ideas;

    console.log('\n💡 CONTENT IDEAS:');
    ideas.forEach((idea, i) => {
      console.log(`\n   ${i + 1}. ${idea.title}`);
      console.log(`      Type: ${idea.content_type}`);
      console.log(`      Target Keywords: ${idea.keywords.join(', ')}`);
      console.log(`      Estimated Traffic: ${idea.estimated_traffic} visits/month`);
      console.log(`      Difficulty: ${idea.difficulty}/10`);
    });

    // Save ideas to file
    const ideasFile = `content-ideas-${topic.replace(/\s+/g, '-')}-${Date.now()}.json`;
    fs.writeFileSync(ideasFile, JSON.stringify(ideas, null, 2));
    console.log(`\n💾 Content ideas saved to: ${ideasFile}`);

    return ideas;
  } catch (error) {
    console.error('❌ Error getting content ideas:', error.message);
    return null;
  }
}

// Export functions for use in other scripts
module.exports = {
  analyzeSEO,
  researchKeywords,
  checkRankings,
  findBacklinks,
  getAnalytics,
  getContentIdeas
};

// CLI Interface
if (require.main === module) {
  const command = process.argv[2];
  const arg1 = process.argv[3];
  const arg2 = process.argv[4];

  console.log('🤖 VarnaAI SEO Agent - Automation Tools\n');

  switch (command) {
    case 'analyze':
      if (!arg1) {
        console.error('❌ Usage: node automate-seo-analysis.js analyze <url>');
        process.exit(1);
      }
      analyzeSEO(arg1);
      break;

    case 'keywords':
      if (!arg1) {
        console.error('❌ Usage: node automate-seo-analysis.js keywords <topic> [language]');
        process.exit(1);
      }
      researchKeywords(arg1, arg2 || 'de');
      break;

    case 'rankings':
      if (!arg1) {
        console.error('❌ Usage: node automate-seo-analysis.js rankings <url> <keywords>');
        console.error('   Example: node automate-seo-analysis.js rankings https://example.com "seo,marketing"');
        process.exit(1);
      }
      const keywords = arg2 ? arg2.split(',') : [];
      checkRankings(arg1, keywords);
      break;

    case 'backlinks':
      if (!arg1) {
        console.error('❌ Usage: node automate-seo-analysis.js backlinks <url>');
        process.exit(1);
      }
      findBacklinks(arg1);
      break;

    case 'analytics':
      if (!arg1) {
        console.error('❌ Usage: node automate-seo-analysis.js analytics <websiteId> [timeRange]');
        process.exit(1);
      }
      getAnalytics(arg1, arg2 || '30d');
      break;

    case 'ideas':
      if (!arg1 || !arg2) {
        console.error('❌ Usage: node automate-seo-analysis.js ideas <topic> <niche> [language]');
        console.error('   Example: node automate-seo-analysis.js ideas "KI Projektmanagement" "enterprise" de');
        process.exit(1);
      }
      getContentIdeas(arg1, arg2, process.argv[5] || 'de');
      break;

    default:
      console.log('📖 AVAILABLE COMMANDS:\n');
      console.log('   analyze <url>                           - Analyze website SEO');
      console.log('   keywords <topic> [language]             - Research keywords');
      console.log('   rankings <url> <keywords>               - Check Google rankings');
      console.log('   backlinks <url>                         - Find backlinks');
      console.log('   analytics <websiteId> [timeRange]       - Get analytics data');
      console.log('   ideas <topic> <niche> [language]        - Get content ideas');
      console.log('\n📝 EXAMPLES:\n');
      console.log('   node automate-seo-analysis.js analyze https://ai-projektmanager.de');
      console.log('   node automate-seo-analysis.js keywords "Enterprise Projektmanagement" de');
      console.log('   node automate-seo-analysis.js rankings https://ai-projektmanager.de "projektmanagement,enterprise"');
      console.log('   node automate-seo-analysis.js backlinks https://ai-projektmanager.de');
      console.log('   node automate-seo-analysis.js analytics website-123 30d');
      console.log('   node automate-seo-analysis.js ideas "IT Sicherheit" "enterprise" de');
  }
}
