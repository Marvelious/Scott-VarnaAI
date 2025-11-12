/**
 * SUBSCRIPTION API ENDPOINT
 * Backend handler for email capture form submissions
 *
 * Endpoint: POST /api/subscribe
 * Used by: email-capture-forms.html (all 5 form types)
 */

const mailchimpAPI = require('../integrations/mailchimp-api');

// ==============================================
// MAIN SUBSCRIPTION HANDLER
// ==============================================

async function handleSubscription(req, res) {
  try {
    // Extract form data
    const {
      email,
      firstName,
      lastName,
      company,
      source, // exit-intent, sidebar, content-upgrade, sticky-bar, two-step
      formType,
      pageUrl,
      timestamp,
      gdprConsent,
      language
    } = req.body;

    // Extract website from request
    const website = extractWebsite(req);

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required'
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format'
      });
    }

    // GDPR check (required for EU sites)
    if (website.endsWith('.de') && !gdprConsent) {
      return res.status(400).json({
        success: false,
        error: 'GDPR consent is required'
      });
    }

    // Determine language
    const lang = language || (website.endsWith('.de') ? 'de' : 'en');

    // Add to MailChimp
    const mailchimpResult = await mailchimpAPI.subscribeContact({
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      company: company || '',
      source: source || formType,
      website,
      language: lang,
      tags: [
        formType,
        source,
        `page:${extractPageName(pageUrl)}`,
        'new-subscriber'
      ]
    });

    // Send lead magnet if applicable
    await deliverLeadMagnet({
      email,
      firstName,
      source,
      website,
      language: lang
    });

    // Track conversion in analytics
    await trackConversion({
      email,
      source,
      website,
      formType,
      timestamp: timestamp || new Date().toISOString()
    });

    // Trigger webhook for Zapier automation
    await triggerWebhook({
      event: 'new_subscriber',
      data: {
        email,
        firstName,
        lastName,
        company,
        source,
        website,
        subscribedAt: timestamp || new Date().toISOString()
      }
    });

    console.log(`✅ Subscription successful: ${email} (${website}, ${source})`);

    // Success response
    res.status(200).json({
      success: true,
      message: getSuccessMessage(lang),
      redirectUrl: `/thank-you?source=${source}&email=${encodeURIComponent(email)}`
    });

  } catch (error) {
    console.error('❌ Subscription error:', error);

    // Check for duplicate subscriber error
    if (error.message?.includes('Member Exists')) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed!',
        alreadySubscribed: true
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: 'Subscription failed. Please try again later.'
    });
  }
}

// ==============================================
// LEAD MAGNET DELIVERY
// ==============================================

async function deliverLeadMagnet(data) {
  const { email, firstName, source, website, language } = data;

  // Map sources to lead magnets
  const leadMagnets = {
    'ai-projektmanager.de': {
      'default': {
        name: '10-Punkte DSGVO Checkliste',
        downloadUrl: 'https://ai-projektmanager.de/downloads/dsgvo-checkliste.pdf',
        template: 'lead-magnet-dsgvo'
      },
      'exit-intent': {
        name: 'Enterprise Projektmanagement Guide',
        downloadUrl: 'https://ai-projektmanager.de/downloads/enterprise-guide.pdf',
        template: 'lead-magnet-enterprise'
      }
    },
    'aimarketingbg.com': {
      'default': {
        name: '2025 AI Marketing Tools Guide',
        downloadUrl: 'https://aimarketingbg.com/downloads/ai-tools-2025.pdf',
        template: 'lead-magnet-tools'
      }
    },
    'classicsecurity.net': {
      'default': {
        name: 'Zero-Trust Implementation Checklist',
        downloadUrl: 'https://classicsecurity.net/downloads/zero-trust-checklist.pdf',
        template: 'lead-magnet-zerotrust'
      }
    },
    'varna-agenten.de': {
      'default': {
        name: 'KI-Agenten ROI Rechner',
        downloadUrl: 'https://varna-agenten.de/downloads/roi-rechner.xlsx',
        template: 'lead-magnet-roi'
      }
    },
    'varnaai.com': {
      'default': {
        name: 'Enterprise AI Readiness Assessment',
        downloadUrl: 'https://varnaai.com/downloads/ai-readiness.pdf',
        template: 'lead-magnet-readiness'
      }
    }
  };

  const siteMagnets = leadMagnets[website];
  if (!siteMagnets) return;

  const magnet = siteMagnets[source] || siteMagnets['default'];

  // Send delivery email via MailChimp Transactional
  await mailchimpAPI.sendTransactionalEmail({
    to: email,
    subject: language === 'de'
      ? `Ihr Download: ${magnet.name}`
      : `Your Download: ${magnet.name}`,
    template: magnet.template,
    mergeVars: {
      FNAME: firstName || 'there',
      DOWNLOAD_LINK: magnet.downloadUrl,
      MAGNET_NAME: magnet.name
    },
    website
  });

  console.log(`📥 Lead magnet delivered: ${magnet.name} → ${email}`);
}

// ==============================================
// CONVERSION TRACKING
// ==============================================

async function trackConversion(data) {
  const { email, source, website, formType, timestamp } = data;

  // Save to database for analytics
  // Implementation depends on database choice (PostgreSQL, MongoDB, etc.)

  console.log(`📊 Conversion tracked: ${email} via ${source} on ${website}`);

  // Track in Google Analytics (server-side)
  if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
    const axios = require('axios');

    await axios.post(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
      {
        client_id: generateClientId(email),
        events: [{
          name: 'generate_lead',
          params: {
            source: source,
            form_type: formType,
            website: website,
            email_hash: hashEmail(email)
          }
        }]
      }
    );
  }

  // Track in Facebook Conversions API (CAPI)
  if (process.env.FACEBOOK_PIXEL_ID && process.env.FACEBOOK_ACCESS_TOKEN) {
    await trackFacebookConversion({
      email,
      source,
      website,
      timestamp
    });
  }
}

// ==============================================
// FACEBOOK CONVERSIONS API (CAPI)
// ==============================================

async function trackFacebookConversion(data) {
  const { email, source, website, timestamp } = data;
  const axios = require('axios');

  const pixelId = process.env.FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  await axios.post(
    `https://graph.facebook.com/v18.0/${pixelId}/events`,
    {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(new Date(timestamp).getTime() / 1000),
        action_source: 'website',
        user_data: {
          em: hashEmail(email), // Hashed email
          client_ip_address: data.ipAddress,
          client_user_agent: data.userAgent
        },
        custom_data: {
          content_name: source,
          website: website,
          value: 0.00,
          currency: 'EUR'
        }
      }],
      access_token: accessToken
    }
  );

  console.log(`📘 Facebook CAPI tracked: ${email}`);
}

// ==============================================
// WEBHOOK TRIGGER (ZAPIER)
// ==============================================

async function triggerWebhook(payload) {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) return;

  const axios = require('axios');

  await axios.post(webhookUrl, payload);

  console.log(`🪝 Webhook triggered: ${payload.event}`);
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function extractWebsite(req) {
  // Extract from request origin/host
  const origin = req.get('origin') || req.get('host');

  // Map to known websites
  const websites = [
    'ai-projektmanager.de',
    'aimarketingbg.com',
    'classicsecurity.net',
    'varna-agenten.de',
    'varnaai.com'
  ];

  for (const site of websites) {
    if (origin?.includes(site)) {
      return site;
    }
  }

  return 'varnaai.com'; // Default fallback
}

function extractPageName(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.replace(/^\//, '').replace(/\/$/, '') || 'home';
  } catch {
    return 'unknown';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function hashEmail(email) {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}

function generateClientId(email) {
  // Generate consistent client ID from email for GA4
  const crypto = require('crypto');
  return crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex')
    .substring(0, 16);
}

function getSuccessMessage(language) {
  return language === 'de'
    ? 'Vielen Dank! Prüfen Sie Ihre E-Mail für den Download-Link.'
    : 'Success! Check your email for the download link.';
}

// ==============================================
// RATE LIMITING
// ==============================================

const rateLimit = require('express-rate-limit');

const subscriptionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many subscription attempts. Please try again later.'
  }
});

// ==============================================
// EXPORTS
// ==============================================

module.exports = {
  handleSubscription,
  subscriptionLimiter
};

// ==============================================
// EXPRESS ROUTER SETUP
// ==============================================

/*
// In your main server.js or app.js:

const express = require('express');
const cors = require('cors');
const { handleSubscription, subscriptionLimiter } = require('./api/subscribe');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://ai-projektmanager.de',
    'https://aimarketingbg.com',
    'https://classicsecurity.net',
    'https://varna-agenten.de',
    'https://varnaai.com'
  ],
  credentials: true
}));

// Subscription endpoint with rate limiting
app.post('/api/subscribe', subscriptionLimiter, handleSubscription);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});
*/
