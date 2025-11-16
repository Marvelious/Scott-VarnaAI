/**
 * Daily Outreach Email Sender
 *
 * Sends personalized outreach emails to new opportunities
 * Respects SendGrid free tier: max 100 emails/day
 * Target: 20 emails/day for quality focus
 */

const { Pool } = require('pg');
const { startOutreachSequence } = require('./outreach-sequences');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD
});

const DAILY_EMAIL_LIMIT = 20; // Conservative limit for quality focus

/**
 * Send daily batch of outreach emails
 */
async function sendDailyOutreach() {
  console.log('📧 Starting daily outreach email batch...');

  // Find opportunities ready for outreach
  const result = await pool.query(`
    SELECT lo.id, lo.domain, lo.type, lo.domain_authority, lo.target_site
    FROM link_opportunities lo
    LEFT JOIN outreach_campaigns oc ON lo.id = oc.opportunity_id
    WHERE
      lo.status = 'new'
      AND lo.contact_email IS NOT NULL
      AND lo.domain_authority >= 30
      AND oc.id IS NULL
    ORDER BY lo.domain_authority DESC
    LIMIT $1
  `, [DAILY_EMAIL_LIMIT]);

  console.log(`Found ${result.rows.length} opportunities ready for outreach`);

  if (result.rows.length === 0) {
    console.log('No opportunities to contact today');
    return;
  }

  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (const opportunity of result.rows) {
    try {
      console.log(`\n📨 Sending outreach to ${opportunity.domain} (DA: ${opportunity.domain_authority})...`);

      const campaignId = await startOutreachSequence(opportunity.id);

      if (campaignId) {
        results.success++;
        console.log(`✅ Campaign ${campaignId} started successfully`);
      } else {
        results.failed++;
        console.log(`❌ Failed to start campaign for opportunity ${opportunity.id}`);
      }

      // Rate limiting - 2 seconds between emails
      await sleep(2000);

    } catch (error) {
      results.failed++;
      results.errors.push({
        opportunity_id: opportunity.id,
        domain: opportunity.domain,
        error: error.message
      });
      console.error(`❌ Error sending to ${opportunity.domain}:`, error.message);
    }
  }

  // Summary
  console.log('\n=== Daily Outreach Summary ===');
  console.log(`✅ Successful: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(err => {
      console.log(`  - ${err.domain}: ${err.error}`);
    });
  }

  // Update campaign stats
  await updateCampaignStats(results);

  return results;
}

/**
 * Update campaign stats for dashboard
 */
async function updateCampaignStats(results) {
  const today = new Date().toISOString().split('T')[0];

  // Get today's stats for each site
  const siteStats = {};

  for (const site of ['ai-projektmanager.de', 'varnaai.com', 'aimarketingbg.com', 'varna-agenten.de', 'classicsecurity.net']) {
    const todayStats = await pool.query(`
      SELECT COALESCE(emails_sent, 0) as emails_sent
      FROM campaign_stats
      WHERE target_site = $1 AND stat_date = $2
    `, [site, today]);

    const currentSent = todayStats.rows[0]?.emails_sent || 0;

    await pool.query(`
      INSERT INTO campaign_stats (target_site, stat_date, emails_sent)
      VALUES ($1, $2, $3)
      ON CONFLICT (target_site, stat_date)
      DO UPDATE SET emails_sent = campaign_stats.emails_sent + EXCLUDED.emails_sent
    `, [site, today, results.success]);
  }
}

/**
 * Helper: Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run if called directly
if (require.main === module) {
  sendDailyOutreach()
    .then(() => {
      console.log('\n✅ Daily outreach complete');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Daily outreach failed:', err);
      process.exit(1);
    });
}

module.exports = {
  sendDailyOutreach
};
