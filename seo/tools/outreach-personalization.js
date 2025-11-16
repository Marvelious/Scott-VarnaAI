/**
 * AI-Powered Outreach Personalization
 *
 * Uses Anthropic Claude to generate personalized email pitches
 * Based on target site analysis and recent content
 */

const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const { Pool } = require('pg');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD
});

const WEBSCRAP_URL = 'http://localhost:8000/api';

// Site-specific company info from COMPANY_INFO.md
const COMPANY_INFO = {
  'ai-projektmanager.de': {
    name: 'AI Projektmanager',
    expertise: 'DSGVO-konforme KI-gestützte Projektmanagement-Software',
    unique_value: 'Zertifiziert nach ISO 27001, BSI IT-Grundschutz, TISAX',
    language: 'de',
    topics: [
      'DSGVO-konforme Projektmanagement-Lösungen',
      'NIS2 Compliance und IT-Sicherheit',
      'EU AI Act konforme KI-Systeme'
    ]
  },
  'varnaai.com': {
    name: 'VarnaAI',
    expertise: 'Custom AI agents and automation solutions',
    unique_value: 'Enterprise-grade AI with multi-language support',
    language: 'en',
    topics: [
      'AI-powered business automation',
      'Custom agent development',
      'Enterprise AI integration'
    ]
  },
  'aimarketingbg.com': {
    name: 'AI Marketing BG',
    expertise: 'AI-driven marketing automation for Bulgarian market',
    unique_value: 'Bilingual AI marketing (Bulgarian/English)',
    language: 'bg',
    topics: [
      'AI marketing automation',
      'Social media management',
      'Content generation'
    ]
  },
  'varna-agenten.de': {
    name: 'Varna Agenten',
    expertise: 'Spezialisierte KI-Agenten für deutsche Unternehmen',
    unique_value: 'DSGVO-konforme Agenten-Lösungen',
    language: 'de',
    topics: [
      'Kundenservice-Automatisierung',
      'Intelligente Dokumentenverarbeitung',
      'DSGVO-konforme KI-Agenten'
    ]
  },
  'classicsecurity.net': {
    name: 'Classic Security',
    expertise: 'Physical and cybersecurity services',
    unique_value: 'Integrated security solutions',
    language: 'en',
    topics: [
      'Physical security consulting',
      'Cybersecurity assessment',
      'Security system integration'
    ]
  }
};

/**
 * Fetch recent articles from target domain
 */
async function fetchRecentArticles(domain, limit = 3) {
  try {
    const response = await axios.post(`${WEBSCRAP_URL}/extract-articles`, {
      domain,
      limit
    });

    return response.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      published_date: article.date
    }));
  } catch (error) {
    console.error(`Error fetching articles from ${domain}:`, error.message);
    return [];
  }
}

/**
 * Generate personalized guest post pitch email
 */
async function generateGuestPostPitch(opportunity, ourSite) {
  const siteInfo = COMPANY_INFO[ourSite];
  const language = siteInfo.language;

  // Fetch recent content from target site
  const recentArticles = await fetchRecentArticles(opportunity.domain);

  const prompt = language === 'de' ?
    generateGermanGuestPostPrompt(opportunity, siteInfo, recentArticles) :
    generateEnglishGuestPostPrompt(opportunity, siteInfo, recentArticles);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const emailText = message.content[0].text;

    return {
      subject: extractSubject(emailText),
      body: extractBody(emailText),
      template_name: 'guest_post_pitch',
      generated_at: new Date()
    };
  } catch (error) {
    console.error('Error generating email with Claude:', error.message);
    return null;
  }
}

/**
 * Generate German guest post pitch prompt
 */
function generateGermanGuestPostPrompt(opportunity, siteInfo, recentArticles) {
  const recentArticle = recentArticles[0];

  return `Sie sind ein professioneller Outreach-Spezialist für ${siteInfo.name}.

Schreiben Sie eine personalisierte Gastbeitrag-Pitch-E-Mail auf Deutsch:

ZIELSEITE: ${opportunity.domain}
KONTAKT: ${opportunity.contact_name || 'Redaktionsteam'}
AKTUELLER ARTIKEL: ${recentArticle ? `"${recentArticle.title}"` : 'Nicht verfügbar'}

ÜBER UNS:
- Unternehmen: ${siteInfo.name}
- Expertise: ${siteInfo.expertise}
- Einzigartiger Wert: ${siteInfo.unique_value}

MÖGLICHE GASTBEITRAG-THEMEN:
${siteInfo.topics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')}

ANFORDERUNGEN:
1. Erwähnen Sie den aktuellen Artikel spezifisch (falls verfügbar)
2. Erklären Sie, warum unsere Expertise wertvoll für ihre Leser ist
3. Schlagen Sie 3 konkrete Gastbeitrag-Themen vor
4. Halten Sie die E-Mail unter 150 Wörtern
5. Verwenden Sie professionellen, aber freundlichen Ton
6. Fügen Sie einen klaren Call-to-Action hinzu

FORMAT:
Betreff: [Betreffzeile]

[E-Mail-Text]

Ausgabe NUR die E-Mail, ohne zusätzliche Erklärungen.`;
}

/**
 * Generate English guest post pitch prompt
 */
function generateEnglishGuestPostPrompt(opportunity, siteInfo, recentArticles) {
  const recentArticle = recentArticles[0];

  return `You are a professional outreach specialist for ${siteInfo.name}.

Write a personalized guest post pitch email:

TARGET SITE: ${opportunity.domain}
CONTACT: ${opportunity.contact_name || 'Editorial Team'}
RECENT ARTICLE: ${recentArticle ? `"${recentArticle.title}"` : 'Not available'}

ABOUT US:
- Company: ${siteInfo.name}
- Expertise: ${siteInfo.expertise}
- Unique Value: ${siteInfo.unique_value}

POTENTIAL GUEST POST TOPICS:
${siteInfo.topics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')}

REQUIREMENTS:
1. Reference their recent article specifically (if available)
2. Explain why our expertise is valuable to their readers
3. Propose 3 specific guest post topics
4. Keep email under 150 words
5. Use professional but friendly tone
6. Include clear call-to-action

FORMAT:
Subject: [Subject line]

[Email body]

Output ONLY the email, no additional explanations.`;
}

/**
 * Generate resource page outreach email
 */
async function generateResourcePagePitch(opportunity, ourSite) {
  const siteInfo = COMPANY_INFO[ourSite];
  const language = siteInfo.language;

  const prompt = language === 'de' ?
    `Sie sind ein professioneller Outreach-Spezialist für ${siteInfo.name}.

Schreiben Sie eine kurze, personalisierte E-Mail, um auf ihre Ressourcen-Seite aufgenommen zu werden:

ZIELSEITE: ${opportunity.domain}
RESSOURCEN-SEITE: ${opportunity.page_url}

ÜBER UNS:
- Tool: ${siteInfo.name}
- Was wir bieten: ${siteInfo.expertise}
- Warum nützlich: ${siteInfo.unique_value}

ANFORDERUNGEN:
1. Erwähnen Sie ihre spezifische Ressourcen-Seite
2. Erklären Sie kurz, warum unser Tool wertvoll für ihre Besucher ist
3. Unter 100 Wörtern
4. Höflich und professionell

FORMAT:
Betreff: [Betreffzeile]

[E-Mail-Text]` :
    `You are a professional outreach specialist for ${siteInfo.name}.

Write a brief, personalized email to get included on their resource page:

TARGET SITE: ${opportunity.domain}
RESOURCE PAGE: ${opportunity.page_url}

ABOUT US:
- Tool: ${siteInfo.name}
- What we offer: ${siteInfo.expertise}
- Why valuable: ${siteInfo.unique_value}

REQUIREMENTS:
1. Mention their specific resource page
2. Briefly explain why our tool is valuable to their visitors
3. Under 100 words
4. Polite and professional

FORMAT:
Subject: [Subject line]

[Email body]`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 800,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    });

    const emailText = message.content[0].text;

    return {
      subject: extractSubject(emailText),
      body: extractBody(emailText),
      template_name: 'resource_page_pitch',
      generated_at: new Date()
    };
  } catch (error) {
    console.error('Error generating resource page pitch:', error.message);
    return null;
  }
}

/**
 * Generate broken link outreach email
 */
async function generateBrokenLinkPitch(opportunity, ourSite, brokenLinkUrl, ourReplacementUrl) {
  const siteInfo = COMPANY_INFO[ourSite];
  const language = siteInfo.language;

  const prompt = language === 'de' ?
    `Sie sind ein hilfreicher Outreach-Spezialist für ${siteInfo.name}.

Schreiben Sie eine E-Mail über einen defekten Link auf ihrer Website:

ZIELSEITE: ${opportunity.domain}
SEITE MIT DEFEKTEM LINK: ${opportunity.page_url}
DEFEKTER LINK: ${brokenLinkUrl}
UNSER ERSATZ-LINK: ${ourReplacementUrl}

ANFORDERUNGEN:
1. Informieren Sie höflich über den defekten Link
2. Bieten Sie unsere Ressource als wertvollen Ersatz an
3. Erklären Sie kurz, warum unser Inhalt relevant ist
4. Unter 120 Wörtern
5. Hilfreicher, nicht verkäuferischer Ton

FORMAT:
Betreff: [Betreffzeile]

[E-Mail-Text]` :
    `You are a helpful outreach specialist for ${siteInfo.name}.

Write an email about a broken link on their website:

TARGET SITE: ${opportunity.domain}
PAGE WITH BROKEN LINK: ${opportunity.page_url}
BROKEN LINK: ${brokenLinkUrl}
OUR REPLACEMENT LINK: ${ourReplacementUrl}

REQUIREMENTS:
1. Politely inform about the broken link
2. Offer our resource as a valuable replacement
3. Briefly explain why our content is relevant
4. Under 120 words
5. Helpful, not salesy tone

FORMAT:
Subject: [Subject line]

[Email body]`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 800,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    });

    const emailText = message.content[0].text;

    return {
      subject: extractSubject(emailText),
      body: extractBody(emailText),
      template_name: 'broken_link_pitch',
      generated_at: new Date()
    };
  } catch (error) {
    console.error('Error generating broken link pitch:', error.message);
    return null;
  }
}

/**
 * Extract subject line from email text
 */
function extractSubject(emailText) {
  const match = emailText.match(/Betreff:\s*(.+)/i) || emailText.match(/Subject:\s*(.+)/i);
  return match ? match[1].trim() : 'Guest Post Opportunity';
}

/**
 * Extract body from email text
 */
function extractBody(emailText) {
  // Remove subject line and return body
  return emailText
    .replace(/Betreff:\s*.+\n*/i, '')
    .replace(/Subject:\s*.+\n*/i, '')
    .trim();
}

/**
 * Generate personalized email for any opportunity type
 */
async function generatePersonalizedEmail(opportunityId) {
  // Fetch opportunity from database
  const result = await pool.query(`
    SELECT * FROM link_opportunities WHERE id = $1
  `, [opportunityId]);

  if (result.rows.length === 0) {
    throw new Error(`Opportunity ${opportunityId} not found`);
  }

  const opportunity = result.rows[0];

  switch (opportunity.type) {
    case 'guest_post':
      return await generateGuestPostPitch(opportunity, opportunity.target_site);

    case 'resource_page':
      return await generateResourcePagePitch(opportunity, opportunity.target_site);

    case 'broken_link':
      // Would need broken link URL and replacement URL passed in
      return await generateBrokenLinkPitch(
        opportunity,
        opportunity.target_site,
        'http://broken-example.com',
        'https://varnaai.com/relevant-page'
      );

    default:
      console.error(`Unknown opportunity type: ${opportunity.type}`);
      return null;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const opportunityId = parseInt(args[0]);

  if (!opportunityId) {
    console.log('Usage: node outreach-personalization.js <opportunity_id>');
    process.exit(1);
  }

  generatePersonalizedEmail(opportunityId)
    .then(email => {
      if (email) {
        console.log('\n=== Generated Email ===');
        console.log('Subject:', email.subject);
        console.log('\nBody:');
        console.log(email.body);
      }
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = {
  generatePersonalizedEmail,
  generateGuestPostPitch,
  generateResourcePagePitch,
  generateBrokenLinkPitch
};
