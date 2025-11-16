require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const { Pool } = require('pg');

// Check if API key is configured
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not found in .env file');
  console.log('\nPlease add your Claude API key to .env:');
  console.log('ANTHROPIC_API_KEY=sk-ant-...');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'changeme'
});

const COMPANY_INFO = {
  'ai-projektmanager.de': {
    name: 'AI Projektmanager',
    expertise: 'DSGVO-konforme KI-gestutzte Projektmanagement-Software',
    unique_value: 'Zertifiziert nach ISO 27001, BSI IT-Grundschutz, TISAX',
    language: 'de',
    topics: [
      'DSGVO-konforme Projektmanagement-Losungen',
      'NIS2 Compliance und IT-Sicherheit',
      'EU AI Act konforme KI-Systeme'
    ]
  }
};

async function testAIPersonalization() {
  console.log('🧪 Testing AI Personalization Engine\n');

  try {
    // Get a sample opportunity from database
    const result = await pool.query(`
      SELECT id, domain, type, target_site
      FROM link_opportunities
      WHERE status = 'new' AND type = 'directory'
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      console.log('⚠️  No opportunities found for testing');
      await pool.end();
      return;
    }

    const opportunity = result.rows[0];
    console.log(`📧 Generating email for: ${opportunity.domain}`);
    console.log(`   Type: ${opportunity.type}`);
    console.log(`   Target site: ${opportunity.target_site}\n`);

    // Generate email using Claude
    const siteInfo = COMPANY_INFO['ai-projektmanager.de'];

    const prompt = `Sie sind ein professioneller Outreach-Spezialist fur ${siteInfo.name}.

Schreiben Sie eine kurze, personalisierte E-Mail auf Deutsch (maximal 100 Worter):

ZIELSEITE: ${opportunity.domain}
TYP: Directory submission / Backlink-Anfrage

UBER UNS:
- Name: ${siteInfo.name}
- Expertise: ${siteInfo.expertise}
- Wert: ${siteInfo.unique_value}

ANFORDERUNGEN:
1. Professioneller, freundlicher Ton
2. Erklaren Sie kurz unsere Expertise
3. Bitten Sie hoflich um Aufnahme in ihr Verzeichnis
4. Maximal 100 Worter

Geben Sie NUR den E-Mail-Text zuruck, keine zusatzlichen Erklarungen.`;

    console.log('⏳ Calling Claude API...\n');

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const emailText = message.content[0].text;

    console.log('✅ AI Generation Successful!\n');
    console.log('=' .repeat(60));
    console.log('Generated Email:');
    console.log('=' .repeat(60));
    console.log(emailText);
    console.log('=' .repeat(60));
    console.log(`\n📊 Stats:`);
    console.log(`   Words: ${emailText.split(/\s+/).length}`);
    console.log(`   Characters: ${emailText.length}`);
    console.log(`   Model: ${message.model}`);
    console.log(`   Tokens used: ${message.usage.input_tokens} input + ${message.usage.output_tokens} output`);

    await pool.end();
    console.log('\n✅ AI Personalization test complete!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);

    if (error.message.includes('authentication')) {
      console.log('\n⚠️  API key authentication failed');
      console.log('   Check that ANTHROPIC_API_KEY is correct in .env');
    }

    await pool.end();
    process.exit(1);
  }
}

testAIPersonalization();
