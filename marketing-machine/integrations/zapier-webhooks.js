/**
 * ZAPIER WEBHOOK HANDLERS
 * Backend endpoints for Zapier automation workflows
 *
 * Setup: Express.js server with webhook endpoints
 * Zapier Webhook URLs: https://your-domain.com/webhooks/[endpoint]
 */

const express = require('express');
const crypto = require('crypto');
const mailchimpAPI = require('./mailchimp-api');
const bufferAPI = require('./buffer-api');

// ==============================================
// WEBHOOK SIGNATURE VERIFICATION
// ==============================================

function verifyZapierSignature(req, secret) {
  const signature = req.headers['x-zapier-signature'];
  const timestamp = req.headers['x-zapier-timestamp'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(timestamp + body)
    .digest('hex');

  return signature === expectedSignature;
}

// ==============================================
// WEBHOOK ROUTER SETUP
// ==============================================

const router = express.Router();

// Middleware: Parse JSON bodies
router.use(express.json());

// Middleware: Log all webhook requests
router.use((req, res, next) => {
  console.log(`📥 Webhook received: ${req.method} ${req.path}`);
  console.log(`   Headers:`, req.headers);
  console.log(`   Body:`, JSON.stringify(req.body, null, 2));
  next();
});

// ==============================================
// WEBHOOK 1: NEW BLOG POST → SOCIAL MEDIA
// ==============================================

router.post('/blog-published', async (req, res) => {
  /*
  Trigger: RSS Feed (yoursite.com/feed)
  Action: Post to Buffer on all social platforms

  Zapier sends:
  {
    "title": "Blog Post Title",
    "url": "https://...",
    "excerpt": "Post excerpt...",
    "image": "https://...",
    "category": "ai",
    "website": "ai-projektmanager.de"
  }
  */

  try {
    const { title, url, excerpt, image, category, website } = req.body;

    // Validate required fields
    if (!title || !url || !website) {
      return res.status(400).json({
        error: 'Missing required fields: title, url, website'
      });
    }

    // Post to social media via Buffer
    const results = await bufferAPI.postBlogArticle({
      website,
      title,
      excerpt: excerpt || '',
      url,
      imageUrl: image,
      category: category || 'general'
    });

    console.log(`✅ Blog post distributed to social media`);

    res.status(200).json({
      success: true,
      message: 'Blog post scheduled on social media',
      results
    });

  } catch (error) {
    console.error('❌ Blog distribution error:', error);
    res.status(500).json({
      error: 'Failed to distribute blog post',
      details: error.message
    });
  }
});

// ==============================================
// WEBHOOK 2: NEW SUBSCRIBER → CRM + EMAIL
// ==============================================

router.post('/new-subscriber', async (req, res) => {
  /*
  Trigger: MailChimp (New subscriber)
  Actions:
  1. Add to Google Sheets (CRM tracking)
  2. Send internal notification
  3. Trigger welcome email sequence

  Zapier sends:
  {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp",
    "source": "exit-intent",
    "website": "ai-projektmanager.de",
    "subscribedAt": "2025-01-15T10:30:00Z"
  }
  */

  try {
    const {
      email,
      firstName,
      lastName,
      company,
      source,
      website,
      subscribedAt
    } = req.body;

    // Validate email
    if (!email || !website) {
      return res.status(400).json({
        error: 'Missing required fields: email, website'
      });
    }

    // 1. Add to Google Sheets (Zapier handles this automatically)

    // 2. Send Slack notification
    await sendSlackNotification({
      channel: '#leads',
      text: `🎉 New subscriber on ${website}`,
      fields: [
        { title: 'Email', value: email, short: true },
        { title: 'Name', value: `${firstName} ${lastName}`, short: true },
        { title: 'Company', value: company || 'N/A', short: true },
        { title: 'Source', value: source, short: true }
      ]
    });

    // 3. Trigger welcome email sequence (MailChimp automation handles this)

    // 4. Update lead scoring
    await updateLeadScore(email, website, {
      action: 'subscribed',
      points: 10
    });

    console.log(`✅ New subscriber processed: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Subscriber processed successfully'
    });

  } catch (error) {
    console.error('❌ Subscriber processing error:', error);
    res.status(500).json({
      error: 'Failed to process subscriber',
      details: error.message
    });
  }
});

// ==============================================
// WEBHOOK 3: FORM SUBMISSION → MULTI-ACTION
// ==============================================

router.post('/form-submission', async (req, res) => {
  /*
  Trigger: Website form submission
  Actions:
  1. Add to MailChimp
  2. Send to CRM (HubSpot/Pipedrive)
  3. Fire tracking pixels
  4. Send lead notification

  Zapier sends:
  {
    "email": "user@example.com",
    "firstName": "John",
    "formType": "contact-form",
    "message": "User message...",
    "website": "classicsecurity.net",
    "pageUrl": "https://...",
    "timestamp": "2025-01-15T10:30:00Z"
  }
  */

  try {
    const {
      email,
      firstName,
      lastName,
      company,
      formType,
      message,
      website,
      pageUrl,
      timestamp
    } = req.body;

    // Validate required fields
    if (!email || !website) {
      return res.status(400).json({
        error: 'Missing required fields: email, website'
      });
    }

    // 1. Add to MailChimp
    await mailchimpAPI.subscribeContact({
      email,
      firstName,
      lastName,
      company,
      source: formType,
      website,
      tags: ['contact-form', 'high-intent']
    });

    // 2. Send to CRM (HubSpot)
    await createHubSpotContact({
      email,
      firstName,
      lastName,
      company,
      source: formType,
      message,
      website
    });

    // 3. Send notification email to sales team
    await sendSalesNotification({
      email,
      firstName,
      company,
      formType,
      message,
      website,
      pageUrl
    });

    // 4. Update lead score (high intent = contact form)
    await updateLeadScore(email, website, {
      action: 'contact-form-submitted',
      points: 50
    });

    console.log(`✅ Form submission processed: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Form submission processed successfully',
      nextSteps: 'Sales team notified'
    });

  } catch (error) {
    console.error('❌ Form submission error:', error);
    res.status(500).json({
      error: 'Failed to process form submission',
      details: error.message
    });
  }
});

// ==============================================
// WEBHOOK 4: LEAD SCORED → SALES NOTIFICATION
// ==============================================

router.post('/lead-qualified', async (req, res) => {
  /*
  Trigger: Lead score threshold reached
  Action: Notify sales team + create CRM task

  Zapier sends:
  {
    "email": "user@example.com",
    "leadScore": 75,
    "activities": [
      "Downloaded whitepaper",
      "Visited pricing 3x",
      "Submitted contact form"
    ],
    "website": "varnaai.com"
  }
  */

  try {
    const { email, leadScore, activities, website } = req.body;

    // Create sales task in CRM
    await createSalesTask({
      email,
      leadScore,
      activities,
      website,
      priority: leadScore >= 80 ? 'high' : 'medium'
    });

    // Send detailed notification
    await sendSlackNotification({
      channel: '#sales',
      text: `🔥 Qualified lead: ${email} (Score: ${leadScore})`,
      fields: [
        { title: 'Website', value: website, short: true },
        { title: 'Score', value: leadScore, short: true },
        { title: 'Recent Activity', value: activities.join('\n'), short: false }
      ],
      color: '#ff6b6b'
    });

    res.status(200).json({
      success: true,
      message: 'Sales team notified'
    });

  } catch (error) {
    console.error('❌ Lead qualification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==============================================
// WEBHOOK 5: DEMO REQUEST → CALENDAR BOOKING
// ==============================================

router.post('/demo-request', async (req, res) => {
  /*
  Trigger: Demo request form
  Actions:
  1. Create Calendly booking
  2. Send confirmation email
  3. Add to CRM
  4. Update lead score

  Zapier sends:
  {
    "email": "user@example.com",
    "firstName": "John",
    "company": "Acme Corp",
    "preferredTime": "afternoon",
    "website": "varnaai.com"
  }
  */

  try {
    const {
      email,
      firstName,
      lastName,
      company,
      preferredTime,
      website
    } = req.body;

    // 1. Send Calendly link via email
    await mailchimpAPI.sendTransactionalEmail({
      to: email,
      subject: 'Book Your Demo - Choose Your Time',
      template: 'demo-booking',
      mergeVars: {
        FNAME: firstName,
        CALENDLY_LINK: getCalendlyLink(website),
        COMPANY: company
      },
      website
    });

    // 2. Add to CRM with "Demo Requested" status
    await createHubSpotContact({
      email,
      firstName,
      lastName,
      company,
      source: 'demo-request',
      lifecycle_stage: 'opportunity',
      website
    });

    // 3. High-value lead score
    await updateLeadScore(email, website, {
      action: 'demo-requested',
      points: 100
    });

    // 4. Notify sales
    await sendSlackNotification({
      channel: '#sales',
      text: `🎯 Demo requested by ${firstName} from ${company}`,
      fields: [
        { title: 'Email', value: email, short: true },
        { title: 'Company', value: company, short: true },
        { title: 'Preferred Time', value: preferredTime, short: true }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Demo booking email sent'
    });

  } catch (error) {
    console.error('❌ Demo request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==============================================
// HELPER FUNCTIONS
// ==============================================

async function sendSlackNotification(data) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const axios = require('axios');

  await axios.post(webhookUrl, {
    text: data.text,
    attachments: [{
      color: data.color || '#36a64f',
      fields: data.fields
    }]
  });
}

async function createHubSpotContact(data) {
  // HubSpot API integration
  // Requires: npm install @hubspot/api-client
  const hubspot = require('@hubspot/api-client');
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  });

  await hubspotClient.crm.contacts.basicApi.create({
    properties: {
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.company,
      hs_lead_status: 'NEW',
      website: data.website
    }
  });
}

async function createSalesTask(data) {
  // Create task in CRM
  console.log(`📋 Creating sales task for ${data.email} (Score: ${data.leadScore})`);
  // Implementation depends on CRM choice
}

async function updateLeadScore(email, website, scoreData) {
  // Update lead scoring in database
  console.log(`📊 Lead score update: ${email} +${scoreData.points} (${scoreData.action})`);
  // Implementation depends on database choice
}

function getCalendlyLink(website) {
  const links = {
    'ai-projektmanager.de': 'https://calendly.com/ai-projektmanager/demo',
    'aimarketingbg.com': 'https://calendly.com/aimarketingbg/consultation',
    'classicsecurity.net': 'https://calendly.com/classicsecurity/security-audit',
    'varna-agenten.de': 'https://calendly.com/varna-agenten/demo',
    'varnaai.com': 'https://calendly.com/varnaai/demo'
  };
  return links[website] || 'https://calendly.com/varnaai/demo';
}

async function sendSalesNotification(data) {
  await sendSlackNotification({
    channel: '#sales',
    text: `📧 New contact form from ${data.website}`,
    fields: [
      { title: 'Name', value: `${data.firstName}`, short: true },
      { title: 'Email', value: data.email, short: true },
      { title: 'Company', value: data.company || 'N/A', short: true },
      { title: 'Form', value: data.formType, short: true },
      { title: 'Message', value: data.message, short: false },
      { title: 'Page', value: data.pageUrl, short: false }
    ],
    color: '#0066cc'
  });
}

// ==============================================
// EXPORTS
// ==============================================

module.exports = router;

// ==============================================
// SERVER SETUP EXAMPLE
// ==============================================

/*
// server.js
const express = require('express');
const webhookRouter = require('./integrations/zapier-webhooks');

const app = express();

// Mount webhook routes
app.use('/webhooks', webhookRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
  console.log(`📥 Webhooks available at http://localhost:${PORT}/webhooks/`);
});
*/
