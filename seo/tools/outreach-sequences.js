/**
 * Email Sequence Automation
 *
 * 4-Touch Email Sequence:
 * 1. Initial personalized pitch (Day 0)
 * 2. Gentle reminder (Day 3)
 * 3. Value addition (Day 7)
 * 4. Breakup email (Day 14)
 */

const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { generatePersonalizedEmail } = require('./outreach-personalization');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD
});

// SendGrid SMTP configuration
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// 4-Touch sequence configuration
const SEQUENCE_TEMPLATES = {
  initial: {
    delay: 0, // Send immediately
    template: 'personalized_pitch'
  },
  followup1: {
    delay: 3, // 3 days after initial
    template: 'gentle_reminder'
  },
  followup2: {
    delay: 7, // 7 days after initial
    template: 'value_addition'
  },
  followup3: {
    delay: 14, // 14 days after initial (breakup)
    template: 'breakup_email'
  }
};

/**
 * Start outreach sequence for an opportunity
 */
async function startOutreachSequence(opportunityId) {
  console.log(`🚀 Starting outreach sequence for opportunity ${opportunityId}`);

  // Get opportunity details
  const oppResult = await pool.query(
    'SELECT * FROM link_opportunities WHERE id = $1',
    [opportunityId]
  );

  if (oppResult.rows.length === 0) {
    throw new Error(`Opportunity ${opportunityId} not found`);
  }

  const opportunity = oppResult.rows[0];

  // Check if opportunity has email
  if (!opportunity.contact_email) {
    throw new Error(`No contact email for opportunity ${opportunityId}`);
  }

  // Verify email isn't bounced or opted out
  const contactCheck = await pool.query(
    'SELECT * FROM outreach_contacts WHERE email = $1',
    [opportunity.contact_email]
  );

  if (contactCheck.rows.length > 0) {
    const contact = contactCheck.rows[0];
    if (contact.bounced || contact.opted_out) {
      console.log(`⚠️  Email ${opportunity.contact_email} is bounced/opted-out, skipping`);
      return null;
    }
  }

  // Generate initial personalized email
  const email = await generatePersonalizedEmail(opportunityId);

  if (!email) {
    throw new Error('Failed to generate personalized email');
  }

  // Create or update contact record
  await pool.query(`
    INSERT INTO outreach_contacts (email, name, domain)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      domain = EXCLUDED.domain
  `, [opportunity.contact_email, opportunity.contact_name, opportunity.domain]);

  const contactResult = await pool.query(
    'SELECT id FROM outreach_contacts WHERE email = $1',
    [opportunity.contact_email]
  );
  const contactId = contactResult.rows[0].id;

  // Send initial email
  const sent = await sendEmail(
    opportunity.contact_email,
    email.subject,
    email.body,
    opportunity.target_site
  );

  if (!sent) {
    throw new Error('Failed to send initial email');
  }

  // Create campaign record
  const campaignResult = await pool.query(`
    INSERT INTO outreach_campaigns
    (opportunity_id, contact_id, template_name, subject_line, email_body, sequence_step, sent_date)
    VALUES ($1, $2, $3, $4, $5, 1, NOW())
    RETURNING id
  `, [opportunityId, contactId, 'personalized_pitch', email.subject, email.body]);

  const campaignId = campaignResult.rows[0].id;

  // Update opportunity status
  await pool.query(
    'UPDATE link_opportunities SET status = $1, updated_at = NOW() WHERE id = $2',
    ['contacted', opportunityId]
  );

  // Update contact stats
  await pool.query(`
    UPDATE outreach_contacts
    SET last_contacted = CURRENT_DATE, total_emails_sent = total_emails_sent + 1
    WHERE id = $1
  `, [contactId]);

  console.log(`✅ Initial email sent to ${opportunity.contact_email}`);

  // Schedule follow-ups
  await scheduleFollowUp(campaignId, opportunityId, 1, 3); // Day 3
  await scheduleFollowUp(campaignId, opportunityId, 2, 7); // Day 7
  await scheduleFollowUp(campaignId, opportunityId, 3, 14); // Day 14

  return campaignId;
}

/**
 * Schedule a follow-up email
 */
async function scheduleFollowUp(parentCampaignId, opportunityId, sequenceStep, daysDelay) {
  // This would integrate with a job queue (BullMQ, etc.)
  // For now, store scheduled follow-ups in database

  const sendDate = new Date();
  sendDate.setDate(sendDate.getDate() + daysDelay);

  console.log(`📅 Scheduled follow-up ${sequenceStep} for ${sendDate.toISOString().split('T')[0]}`);

  // Store in a follow_up_schedule table (would need to create this)
  // For simplicity, we'll handle this in processScheduledFollowups()
}

/**
 * Process scheduled follow-ups (run daily via cron)
 */
async function processScheduledFollowups() {
  console.log('📬 Processing scheduled follow-ups...');

  // Find campaigns that need follow-ups
  const result = await pool.query(`
    SELECT
      oc.id as campaign_id,
      oc.opportunity_id,
      oc.sequence_step,
      oc.sent_date,
      lo.contact_email,
      lo.target_site,
      lo.domain
    FROM outreach_campaigns oc
    JOIN link_opportunities lo ON oc.opportunity_id = lo.id
    WHERE
      oc.response_received = FALSE
      AND oc.outcome IS NULL
      AND oc.sequence_step < 4
      AND (
        (oc.sequence_step = 1 AND oc.sent_date < NOW() - INTERVAL '3 days')
        OR (oc.sequence_step = 2 AND oc.sent_date < NOW() - INTERVAL '4 days')
        OR (oc.sequence_step = 3 AND oc.sent_date < NOW() - INTERVAL '7 days')
      )
  `);

  console.log(`Found ${result.rows.length} follow-ups to send`);

  for (const campaign of result.rows) {
    try {
      await sendFollowUp(campaign);
    } catch (error) {
      console.error(`Error sending follow-up for campaign ${campaign.campaign_id}:`, error.message);
    }
  }
}

/**
 * Send follow-up email
 */
async function sendFollowUp(campaign) {
  const nextStep = campaign.sequence_step + 1;
  const email = generateFollowUpEmail(campaign, nextStep);

  const sent = await sendEmail(
    campaign.contact_email,
    email.subject,
    email.body,
    campaign.target_site
  );

  if (!sent) {
    console.error(`Failed to send follow-up to ${campaign.contact_email}`);
    return;
  }

  // Create new campaign record for follow-up
  const contactResult = await pool.query(
    'SELECT id FROM outreach_contacts WHERE email = $1',
    [campaign.contact_email]
  );

  await pool.query(`
    INSERT INTO outreach_campaigns
    (opportunity_id, contact_id, template_name, subject_line, email_body, sequence_step, sent_date)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
  `, [
    campaign.opportunity_id,
    contactResult.rows[0].id,
    `followup${nextStep - 1}`,
    email.subject,
    email.body,
    nextStep
  ]);

  // Update contact stats
  await pool.query(
    'UPDATE outreach_contacts SET total_emails_sent = total_emails_sent + 1 WHERE id = $1',
    [contactResult.rows[0].id]
  );

  console.log(`✅ Follow-up ${nextStep - 1} sent to ${campaign.contact_email}`);
}

/**
 * Generate follow-up email content
 */
function generateFollowUpEmail(campaign, sequenceStep) {
  const domain = campaign.domain;

  switch (sequenceStep) {
    case 2: // Day 3 - Gentle reminder
      return {
        subject: `Re: ${campaign.subject_line || 'Guest Post Opportunity'}`,
        body: `Hi,

I wanted to follow up on my previous email about contributing to ${domain}.

I understand you're busy, so I'll keep this brief. I'd love to write a guest post that adds value to your readers.

Would you be open to a quick chat about this?

Best regards`
      };

    case 3: // Day 7 - Value addition
      return {
        subject: `Re: ${campaign.subject_line || 'Guest Post Opportunity'}`,
        body: `Hi,

I hope this email finds you well.

I wanted to add that I've recently published similar content that performed really well - over 10,000 views in the first month.

I'd be happy to share my writing samples if you'd like to see my style.

Let me know if you're interested in collaborating.

Best regards`
      };

    case 4: // Day 14 - Breakup email
      return {
        subject: `Re: ${campaign.subject_line || 'Guest Post Opportunity'}`,
        body: `Hi,

I understand you might not be interested or available at the moment - no worries at all!

If you change your mind in the future, feel free to reach out.

Best of luck with ${domain}!

Best regards`
      };

    default:
      throw new Error(`Invalid sequence step: ${sequenceStep}`);
  }
}

/**
 * Send email via SendGrid
 */
async function sendEmail(to, subject, body, fromSite) {
  const fromAddresses = {
    'ai-projektmanager.de': 'hello@ai-projektmanager.de',
    'varnaai.com': 'hello@varnaai.com',
    'aimarketingbg.com': 'hello@aimarketingbg.com',
    'varna-agenten.de': 'hello@varna-agenten.de',
    'classicsecurity.net': 'info@classicsecurity.net'
  };

  const fromEmail = fromAddresses[fromSite] || 'hello@varnaai.com';

  try {
    await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      text: body,
      headers: {
        'X-Campaign': 'backlink-outreach',
        'X-Site': fromSite
      }
    });

    console.log(`📧 Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    return false;
  }
}

/**
 * Mark email as responded
 */
async function markAsResponded(campaignId, responseText = null) {
  await pool.query(`
    UPDATE outreach_campaigns
    SET response_received = TRUE, response_date = NOW(), response_text = $2
    WHERE id = $1
  `, [campaignId, responseText]);

  // Update contact stats
  await pool.query(`
    UPDATE outreach_contacts
    SET total_responses = total_responses + 1
    WHERE id = (SELECT contact_id FROM outreach_campaigns WHERE id = $1)
  `, [campaignId]);

  console.log(`✅ Campaign ${campaignId} marked as responded`);
}

/**
 * Mark campaign outcome
 */
async function setCampaignOutcome(campaignId, outcome) {
  // outcome: accepted, rejected, no_response

  await pool.query(`
    UPDATE outreach_campaigns
    SET outcome = $2
    WHERE id = $1
  `, [campaignId, outcome]);

  if (outcome === 'accepted') {
    // Update opportunity status
    await pool.query(`
      UPDATE link_opportunities
      SET status = 'acquired'
      WHERE id = (SELECT opportunity_id FROM outreach_campaigns WHERE id = $1)
    `, [campaignId]);
  }

  console.log(`✅ Campaign ${campaignId} outcome set to: ${outcome}`);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'start':
      startOutreachSequence(parseInt(args[1]))
        .then(campaignId => {
          console.log(`Campaign started: ${campaignId}`);
          process.exit(0);
        })
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'process-followups':
      processScheduledFollowups()
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'mark-responded':
      markAsResponded(parseInt(args[1]), args[2])
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'set-outcome':
      setCampaignOutcome(parseInt(args[1]), args[2])
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    default:
      console.log(`
Usage:
  node outreach-sequences.js start <opportunity_id>
  node outreach-sequences.js process-followups
  node outreach-sequences.js mark-responded <campaign_id> [response_text]
  node outreach-sequences.js set-outcome <campaign_id> <accepted|rejected|no_response>

Examples:
  node outreach-sequences.js start 123
  node outreach-sequences.js process-followups
  node outreach-sequences.js mark-responded 456 "Yes, we'd love a guest post!"
  node outreach-sequences.js set-outcome 456 accepted
      `);
      process.exit(1);
  }
}

module.exports = {
  startOutreachSequence,
  processScheduledFollowups,
  markAsResponded,
  setCampaignOutcome
};
