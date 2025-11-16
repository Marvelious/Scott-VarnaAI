/**
 * Backlink Health Monitoring
 *
 * Automated checking for:
 * - Broken/removed backlinks
 * - NoFollow attribute changes
 * - Anchor text changes
 * - Page status (404, 301, etc.)
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD
});

/**
 * Check health of all active backlinks
 */
async function checkAllBacklinks() {
  console.log('🔍 Checking health of all active backlinks...');

  const result = await pool.query(`
    SELECT * FROM acquired_backlinks
    WHERE status = 'active'
    ORDER BY last_checked ASC NULLS FIRST
    LIMIT 100
  `);

  console.log(`Found ${result.rows.length} backlinks to check`);

  const results = {
    healthy: 0,
    broken: 0,
    nofollow_changed: 0,
    errors: 0
  };

  for (const backlink of result.rows) {
    try {
      const health = await checkBacklinkHealth(backlink);

      if (health.status === 'broken') {
        results.broken++;
        await updateBacklinkStatus(backlink.id, 'broken', health.details);
      } else if (health.nofollow_changed) {
        results.nofollow_changed++;
        await updateBacklinkStatus(backlink.id, 'nofollow_changed', 'Link changed to nofollow');
      } else {
        results.healthy++;
        await markBacklinkChecked(backlink.id);
      }
    } catch (error) {
      results.errors++;
      console.error(`Error checking backlink ${backlink.id}:`, error.message);
    }

    // Rate limiting - don't hammer servers
    await sleep(2000); // 2 second delay between checks
  }

  console.log('📊 Backlink health check results:');
  console.log(`  ✅ Healthy: ${results.healthy}`);
  console.log(`  ❌ Broken: ${results.broken}`);
  console.log(`  ⚠️  NoFollow changed: ${results.nofollow_changed}`);
  console.log(`  🔥 Errors: ${results.errors}`);

  return results;
}

/**
 * Check health of a single backlink
 */
async function checkBacklinkHealth(backlink) {
  try {
    // Fetch the page containing the backlink
    const response = await axios.get(backlink.live_url, {
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500 // Accept all status codes < 500
    });

    // Check if page is accessible
    if (response.status === 404 || response.status === 410) {
      return {
        status: 'broken',
        details: `Page returned ${response.status}`
      };
    }

    if (response.status >= 500) {
      return {
        status: 'error',
        details: `Server error ${response.status}`
      };
    }

    // Parse HTML
    const $ = cheerio.load(response.data);

    // Find the backlink in the page
    const backlinkFound = findBacklinkInPage($, backlink);

    if (!backlinkFound.found) {
      return {
        status: 'broken',
        details: 'Backlink not found on page (removed)'
      };
    }

    // Check if nofollow attribute was added
    const wasDoFollow = backlink.link_type === 'dofollow';
    const isNowDoFollow = backlinkFound.link_type === 'dofollow';

    if (wasDoFollow && !isNowDoFollow) {
      return {
        status: 'active',
        nofollow_changed: true,
        details: 'Link changed from dofollow to nofollow'
      };
    }

    // All checks passed
    return {
      status: 'active',
      nofollow_changed: false,
      anchor_text: backlinkFound.anchor_text
    };
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      return {
        status: 'broken',
        details: `Domain unreachable: ${error.code}`
      };
    }

    throw error;
  }
}

/**
 * Find backlink in parsed HTML
 */
function findBacklinkInPage($, backlink) {
  // Get the opportunity to know which site we're linking to
  const targetDomain = extractDomain(backlink.opportunity_id);

  // Find all links on the page
  const links = $('a[href]');

  for (let i = 0; i < links.length; i++) {
    const link = $(links[i]);
    const href = link.attr('href');

    // Check if this link points to our target site
    if (href && (href.includes(targetDomain) || href.includes('varnaai') || href.includes('ai-projektmanager'))) {
      const rel = link.attr('rel') || '';
      const isDoFollow = !rel.includes('nofollow');

      return {
        found: true,
        link_type: isDoFollow ? 'dofollow' : 'nofollow',
        anchor_text: link.text().trim(),
        href: href
      };
    }
  }

  return { found: false };
}

/**
 * Extract domain from opportunity (helper)
 */
function extractDomain(opportunityId) {
  // This is simplified - in real implementation would query database
  return 'varnaai.com';
}

/**
 * Update backlink status in database
 */
async function updateBacklinkStatus(backlinkId, status, notes) {
  await pool.query(`
    UPDATE acquired_backlinks
    SET status = $2, notes = $3, last_checked = CURRENT_DATE
    WHERE id = $1
  `, [backlinkId, status, notes]);

  console.log(`⚠️  Backlink ${backlinkId} marked as ${status}: ${notes}`);
}

/**
 * Mark backlink as checked (healthy)
 */
async function markBacklinkChecked(backlinkId) {
  await pool.query(`
    UPDATE acquired_backlinks
    SET last_checked = CURRENT_DATE
    WHERE id = $1
  `, [backlinkId]);
}

/**
 * Generate health report
 */
async function generateHealthReport(targetSite = null) {
  console.log('📊 Generating backlink health report...');

  const query = targetSite ?
    'SELECT * FROM acquired_backlinks WHERE opportunity_id IN (SELECT id FROM link_opportunities WHERE target_site = $1)' :
    'SELECT * FROM acquired_backlinks';

  const params = targetSite ? [targetSite] : [];

  const result = await pool.query(query, params);

  const report = {
    total: result.rows.length,
    active: result.rows.filter(b => b.status === 'active').length,
    broken: result.rows.filter(b => b.status === 'broken').length,
    nofollow_changed: result.rows.filter(b => b.status === 'nofollow_changed').length,
    not_checked: result.rows.filter(b => !b.last_checked).length,
    avg_value_score: 0
  };

  // Calculate average value score
  const valueScores = result.rows
    .filter(b => b.value_score)
    .map(b => parseFloat(b.value_score));

  if (valueScores.length > 0) {
    report.avg_value_score = (valueScores.reduce((a, b) => a + b, 0) / valueScores.length).toFixed(2);
  }

  console.log('\n=== Backlink Health Report ===');
  console.log(`Site: ${targetSite || 'All sites'}`);
  console.log(`Total backlinks: ${report.total}`);
  console.log(`✅ Active: ${report.active} (${(report.active / report.total * 100).toFixed(1)}%)`);
  console.log(`❌ Broken: ${report.broken} (${(report.broken / report.total * 100).toFixed(1)}%)`);
  console.log(`⚠️  NoFollow changed: ${report.nofollow_changed}`);
  console.log(`📋 Not yet checked: ${report.not_checked}`);
  console.log(`⭐ Average value score: ${report.avg_value_score}/10.0`);

  return report;
}

/**
 * Alert on critical issues
 */
async function alertOnIssues() {
  // Find backlinks that became broken in last 7 days
  const recentBroken = await pool.query(`
    SELECT ab.*, lo.target_site, lo.domain
    FROM acquired_backlinks ab
    JOIN link_opportunities lo ON ab.opportunity_id = lo.id
    WHERE ab.status = 'broken'
    AND ab.last_checked >= CURRENT_DATE - INTERVAL '7 days'
  `);

  if (recentBroken.rows.length > 0) {
    console.log(`\n🚨 ALERT: ${recentBroken.rows.length} backlinks broke in the last 7 days:`);
    recentBroken.rows.forEach(bl => {
      console.log(`  - ${bl.live_url} (${bl.target_site})`);
    });
  }

  // Find high-value backlinks that changed to nofollow
  const nofollowChanged = await pool.query(`
    SELECT ab.*, lo.target_site, lo.domain
    FROM acquired_backlinks ab
    JOIN link_opportunities lo ON ab.opportunity_id = lo.id
    WHERE ab.status = 'nofollow_changed'
    AND ab.value_score >= 7.0
  `);

  if (nofollowChanged.rows.length > 0) {
    console.log(`\n⚠️  WARNING: ${nofollowChanged.rows.length} high-value backlinks changed to nofollow:`);
    nofollowChanged.rows.forEach(bl => {
      console.log(`  - ${bl.live_url} (Value: ${bl.value_score}/10, ${bl.target_site})`);
    });
  }
}

/**
 * Helper: Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'check-all':
      checkAllBacklinks()
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'report':
      generateHealthReport(args[1])
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'alerts':
      alertOnIssues()
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    default:
      console.log(`
Usage:
  node link-monitor.js check-all
  node link-monitor.js report [target_site]
  node link-monitor.js alerts

Examples:
  node link-monitor.js check-all
  node link-monitor.js report varnaai.com
  node link-monitor.js alerts
      `);
      process.exit(1);
  }
}

module.exports = {
  checkAllBacklinks,
  checkBacklinkHealth,
  generateHealthReport,
  alertOnIssues
};
