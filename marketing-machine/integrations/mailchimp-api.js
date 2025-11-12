/**
 * MAILCHIMP API INTEGRATION
 * Email list management and automation
 *
 * Setup: npm install @mailchimp/mailchimp_marketing
 * API Key: Get from mailchimp.com/account/api/
 * Server Prefix: First part of API key (us19, us20, etc.)
 */

const mailchimp = require('@mailchimp/mailchimp_marketing');

// ==============================================
// CONFIGURATION
// ==============================================

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us19"
});

// List IDs for each website
const AUDIENCE_IDS = {
  'ai-projektmanager.de': process.env.MAILCHIMP_LIST_AI_PROJEKT,
  'aimarketingbg.com': process.env.MAILCHIMP_LIST_AI_MARKETING,
  'classicsecurity.net': process.env.MAILCHIMP_LIST_SECURITY,
  'varna-agenten.de': process.env.MAILCHIMP_LIST_AGENTEN,
  'varnaai.com': process.env.MAILCHIMP_LIST_VARNAAI
};

// ==============================================
// SUBSCRIBE NEW CONTACT
// ==============================================

async function subscribeContact(data) {
  const {
    email,
    firstName,
    lastName,
    company,
    source, // Which form/page they came from
    website, // Which of the 5 websites
    language = 'en',
    tags = []
  } = data;

  const audienceId = AUDIENCE_IDS[website];
  if (!audienceId) {
    throw new Error(`Unknown website: ${website}`);
  }

  try {
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        LNAME: lastName || '',
        COMPANY: company || '',
        SOURCE: source || 'website',
        LANGUAGE: language
      },
      tags: [
        ...tags,
        source, // Tag with form source
        website, // Tag with website
        `lang-${language}` // Tag with language
      ]
    });

    console.log(`✅ Added ${email} to ${website} list (ID: ${response.id})`);

    return {
      success: true,
      contactId: response.id,
      message: 'Successfully subscribed'
    };

  } catch (error) {
    // Handle already subscribed
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      console.log(`⚠️  ${email} already subscribed to ${website}`);

      // Update existing contact with new tags
      await updateContactTags(email, website, [source, ...tags]);

      return {
        success: true,
        message: 'Email already subscribed, tags updated'
      };
    }

    console.error('❌ MailChimp subscription error:', error);
    throw error;
  }
}

// ==============================================
// UPDATE CONTACT TAGS
// ==============================================

async function updateContactTags(email, website, tags) {
  const audienceId = AUDIENCE_IDS[website];

  // Get subscriber hash (MD5 of lowercase email)
  const crypto = require('crypto');
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  try {
    await mailchimp.lists.updateListMemberTags(audienceId, subscriberHash, {
      tags: tags.map(tag => ({ name: tag, status: 'active' }))
    });

    console.log(`✅ Updated tags for ${email}: ${tags.join(', ')}`);
  } catch (error) {
    console.error('❌ Tag update error:', error);
  }
}

// ==============================================
// CREATE AUTOMATION CAMPAIGN
// ==============================================

async function createWelcomeAutomation(website, campaignData) {
  const audienceId = AUDIENCE_IDS[website];

  const {
    name,
    subject,
    fromName,
    replyTo,
    template
  } = campaignData;

  try {
    // Create automation
    const automation = await mailchimp.automations.create({
      recipients: {
        list_id: audienceId
      },
      trigger_settings: {
        workflow_type: 'welcomeSeries',
        runtime: {
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        }
      },
      settings: {
        title: name,
        from_name: fromName,
        reply_to: replyTo,
        auto_footer: false,
        inline_css: true,
        authenticate: true,
        auto_tweet: false
      }
    });

    console.log(`✅ Created automation: ${automation.id}`);
    return automation;

  } catch (error) {
    console.error('❌ Automation creation error:', error);
    throw error;
  }
}

// ==============================================
// SEND TRANSACTIONAL EMAIL
// ==============================================

async function sendTransactionalEmail(data) {
  const {
    to,
    subject,
    template,
    mergeVars = {},
    website
  } = data;

  // Use MailChimp Transactional API (Mandrill)
  // Requires separate setup at mailchimp.com/transactional

  const transactionalApiKey = process.env.MAILCHIMP_TRANSACTIONAL_KEY;

  const mailchimpTx = require('@mailchimp/mailchimp_transactional')(transactionalApiKey);

  try {
    const response = await mailchimpTx.messages.sendTemplate({
      template_name: template,
      template_content: [],
      message: {
        to: [{ email: to }],
        subject: subject,
        from_email: `noreply@${website}`,
        from_name: getWebsiteName(website),
        merge_vars: [{
          rcpt: to,
          vars: Object.keys(mergeVars).map(key => ({
            name: key,
            content: mergeVars[key]
          }))
        }]
      }
    });

    console.log(`✅ Sent ${template} to ${to}`);
    return response[0];

  } catch (error) {
    console.error('❌ Transactional email error:', error);
    throw error;
  }
}

// ==============================================
// GET CONTACT INFO
// ==============================================

async function getContact(email, website) {
  const audienceId = AUDIENCE_IDS[website];

  const crypto = require('crypto');
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  try {
    const member = await mailchimp.lists.getListMember(
      audienceId,
      subscriberHash
    );

    return {
      email: member.email_address,
      status: member.status,
      firstName: member.merge_fields.FNAME,
      lastName: member.merge_fields.LNAME,
      company: member.merge_fields.COMPANY,
      source: member.merge_fields.SOURCE,
      tags: member.tags.map(t => t.name),
      subscribedAt: member.timestamp_opt,
      lastChanged: member.last_changed
    };

  } catch (error) {
    if (error.status === 404) {
      return null; // Contact not found
    }
    throw error;
  }
}

// ==============================================
// UNSUBSCRIBE CONTACT
// ==============================================

async function unsubscribeContact(email, website) {
  const audienceId = AUDIENCE_IDS[website];

  const crypto = require('crypto');
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  try {
    await mailchimp.lists.updateListMember(audienceId, subscriberHash, {
      status: 'unsubscribed'
    });

    console.log(`✅ Unsubscribed ${email} from ${website}`);
    return { success: true };

  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    throw error;
  }
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function getWebsiteName(domain) {
  const names = {
    'ai-projektmanager.de': 'AI Projektmanager',
    'aimarketingbg.com': 'AI Marketing BG',
    'classicsecurity.net': 'Classic Security',
    'varna-agenten.de': 'Varna Agenten',
    'varnaai.com': 'Varna AI'
  };
  return names[domain] || 'VarnaAI';
}

// ==============================================
// EXPORTS
// ==============================================

module.exports = {
  subscribeContact,
  updateContactTags,
  createWelcomeAutomation,
  sendTransactionalEmail,
  getContact,
  unsubscribeContact
};

// ==============================================
// USAGE EXAMPLES
// ==============================================

/*
// Subscribe new contact
await subscribeContact({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Acme Corp',
  source: 'exit-intent-popup',
  website: 'ai-projektmanager.de',
  language: 'de',
  tags: ['lead-magnet-downloaded']
});

// Get contact information
const contact = await getContact('user@example.com', 'ai-projektmanager.de');

// Send transactional email
await sendTransactionalEmail({
  to: 'user@example.com',
  subject: 'Your Download is Ready',
  template: 'lead-magnet-delivery',
  mergeVars: {
    FNAME: 'John',
    DOWNLOAD_LINK: 'https://...'
  },
  website: 'ai-projektmanager.de'
});

// Unsubscribe
await unsubscribeContact('user@example.com', 'ai-projektmanager.de');
*/
