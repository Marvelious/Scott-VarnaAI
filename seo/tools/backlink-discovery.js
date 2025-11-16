/**
 * Backlink Discovery Engine
 *
 * 5 Discovery Strategies:
 * 1. Guest Post Sites (write-for-us pages)
 * 2. Competitor Backlink Analysis
 * 3. Broken Link Building
 * 4. Resource Page Discovery
 * 5. HARO/PR Opportunities
 */

const axios = require('axios');
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD
});

// Hunter.io API for email discovery
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

// Webscrap integration (existing localhost:8000 Python backend)
const WEBSCRAP_URL = 'http://localhost:8000/api';

/**
 * Strategy 1: Find Guest Post Opportunities
 *
 * Search for "write for us" pages in niche
 */
async function findGuestPostSites(niche, language = 'en', targetSite = 'varnaai.com', limit = 50) {
  console.log(`🔍 Discovering guest post sites for niche: ${niche} (${language})`);

  const searchQueries = {
    en: [
      `"write for us" ${niche}`,
      `"submit guest post" ${niche}`,
      `"become a contributor" ${niche}`,
      `"guest author" ${niche}`,
      `"contribute to" ${niche}`
    ],
    de: [
      `"gastbeitrag" ${niche}`,
      `"artikel einreichen" ${niche}`,
      `"gastautor" ${niche}`,
      `"schreiben für uns" ${niche}`
    ],
    bg: [
      `"гост статии" ${niche}`,
      `"пишете за нас" ${niche}`
    ]
  };

  const opportunities = [];
  const queries = searchQueries[language] || searchQueries.en;

  for (const query of queries) {
    try {
      // Use Webscrap for Google search
      const response = await axios.post(`${WEBSCRAP_URL}/search`, {
        query,
        language,
        num_results: limit / queries.length
      });

      for (const result of response.data.results) {
        const domain = new URL(result.url).hostname;

        // Skip if already in database
        const existing = await pool.query(
          'SELECT id FROM link_opportunities WHERE domain = $1 AND target_site = $2',
          [domain, targetSite]
        );

        if (existing.rows.length > 0) continue;

        // Discover contact email with Hunter.io
        const contact = await findContactInfo(domain);

        // Get domain authority (could integrate Moz API)
        const da = await estimateDomainAuthority(domain);

        opportunities.push({
          domain,
          page_url: result.url,
          type: 'guest_post',
          domain_authority: da,
          contact_email: contact.email,
          contact_name: contact.name,
          target_site: targetSite,
          discovered_method: 'google_search'
        });
      }
    } catch (error) {
      console.error(`Error searching for "${query}":`, error.message);
    }
  }

  // Save to database
  await saveOpportunities(opportunities);

  console.log(`✅ Found ${opportunities.length} guest post opportunities`);
  return opportunities;
}

/**
 * Strategy 2: Competitor Backlink Analysis
 *
 * Analyze where competitors have backlinks
 */
async function analyzeCompetitorBacklinks(competitorDomain, targetSite = 'varnaai.com', limit = 30) {
  console.log(`🔍 Analyzing competitor backlinks: ${competitorDomain}`);

  try {
    // Use Webscrap to scrape competitor's backlinks
    const response = await axios.post(`${WEBSCRAP_URL}/backlink-analysis`, {
      domain: competitorDomain,
      limit
    });

    const opportunities = [];

    for (const backlink of response.data.backlinks) {
      const domain = new URL(backlink.source_url).hostname;

      // Skip if already targeting this site
      const existing = await pool.query(
        'SELECT id FROM link_opportunities WHERE domain = $1 AND target_site = $2',
        [domain, targetSite]
      );

      if (existing.rows.length > 0) continue;

      const contact = await findContactInfo(domain);
      const da = backlink.domain_authority || 0;

      opportunities.push({
        domain,
        page_url: backlink.source_url,
        type: 'competitor',
        domain_authority: da,
        contact_email: contact.email,
        contact_name: contact.name,
        target_site: targetSite,
        discovered_method: `competitor_analysis:${competitorDomain}`,
        notes: `Competitor "${competitorDomain}" has backlink here`
      });
    }

    await saveOpportunities(opportunities);

    console.log(`✅ Found ${opportunities.length} competitor backlink opportunities`);
    return opportunities;
  } catch (error) {
    console.error(`Error analyzing competitor ${competitorDomain}:`, error.message);
    return [];
  }
}

/**
 * Strategy 3: Broken Link Building
 *
 * Find broken links on high-DA pages in niche
 */
async function findBrokenLinkOpportunities(niche, language = 'en', targetSite = 'varnaai.com', limit = 20) {
  console.log(`🔍 Finding broken link opportunities for: ${niche}`);

  const queries = {
    en: [
      `${niche} resources`,
      `best ${niche} tools`,
      `${niche} guide`
    ],
    de: [
      `${niche} ressourcen`,
      `beste ${niche} tools`,
      `${niche} leitfaden`
    ]
  };

  const opportunities = [];
  const searchQueries = queries[language] || queries.en;

  for (const query of searchQueries) {
    try {
      // Search for resource pages
      const response = await axios.post(`${WEBSCRAP_URL}/search`, {
        query,
        language,
        num_results: 10
      });

      for (const result of response.data.results) {
        // Check page for broken links
        const brokenLinks = await axios.post(`${WEBSCRAP_URL}/check-broken-links`, {
          url: result.url
        });

        if (brokenLinks.data.broken_count > 0) {
          const domain = new URL(result.url).hostname;
          const contact = await findContactInfo(domain);
          const da = await estimateDomainAuthority(domain);

          opportunities.push({
            domain,
            page_url: result.url,
            type: 'broken_link',
            domain_authority: da,
            contact_email: contact.email,
            contact_name: contact.name,
            target_site: targetSite,
            discovered_method: 'broken_link_check',
            notes: `Found ${brokenLinks.data.broken_count} broken links on page`
          });
        }
      }
    } catch (error) {
      console.error(`Error finding broken links for "${query}":`, error.message);
    }
  }

  await saveOpportunities(opportunities);

  console.log(`✅ Found ${opportunities.length} broken link opportunities`);
  return opportunities;
}

/**
 * Strategy 4: Resource Page Discovery
 *
 * Find curated resource pages in niche
 */
async function findResourcePages(niche, language = 'en', targetSite = 'varnaai.com', limit = 30) {
  console.log(`🔍 Finding resource pages for: ${niche}`);

  const queries = {
    en: [
      `intitle:"resources" ${niche}`,
      `intitle:"useful links" ${niche}`,
      `intitle:"helpful resources" ${niche}`,
      `"useful tools" ${niche}`
    ],
    de: [
      `intitle:"ressourcen" ${niche}`,
      `intitle:"nützliche links" ${niche}`,
      `"hilfreiche tools" ${niche}`
    ]
  };

  const opportunities = [];
  const searchQueries = queries[language] || queries.en;

  for (const query of searchQueries) {
    try {
      const response = await axios.post(`${WEBSCRAP_URL}/search`, {
        query,
        language,
        num_results: limit / searchQueries.length
      });

      for (const result of response.data.results) {
        const domain = new URL(result.url).hostname;

        const existing = await pool.query(
          'SELECT id FROM link_opportunities WHERE domain = $1 AND target_site = $2',
          [domain, targetSite]
        );

        if (existing.rows.length > 0) continue;

        const contact = await findContactInfo(domain);
        const da = await estimateDomainAuthority(domain);

        opportunities.push({
          domain,
          page_url: result.url,
          type: 'resource_page',
          domain_authority: da,
          contact_email: contact.email,
          contact_name: contact.name,
          target_site: targetSite,
          discovered_method: 'google_search'
        });
      }
    } catch (error) {
      console.error(`Error finding resource pages for "${query}":`, error.message);
    }
  }

  await saveOpportunities(opportunities);

  console.log(`✅ Found ${opportunities.length} resource page opportunities`);
  return opportunities;
}

/**
 * Strategy 5: HARO/PR Opportunities
 *
 * Find journalist requests and PR opportunities
 */
async function findHAROOpportunities(niche, targetSite = 'varnaai.com', limit = 10) {
  console.log(`🔍 Finding HARO/PR opportunities for: ${niche}`);

  // This would integrate with:
  // - HARO (Help a Reporter Out) API
  // - Featured.com
  // - Terkel
  // - Other PR platforms

  const opportunities = [];

  try {
    // Example: Search for journalist requests
    const response = await axios.post(`${WEBSCRAP_URL}/search`, {
      query: `"journalist request" ${niche}`,
      num_results: limit
    });

    for (const result of response.data.results) {
      const domain = new URL(result.url).hostname;

      opportunities.push({
        domain,
        page_url: result.url,
        type: 'haro',
        domain_authority: await estimateDomainAuthority(domain),
        target_site: targetSite,
        discovered_method: 'haro_search',
        notes: 'Journalist request opportunity'
      });
    }

    await saveOpportunities(opportunities);

    console.log(`✅ Found ${opportunities.length} HARO opportunities`);
    return opportunities;
  } catch (error) {
    console.error('Error finding HARO opportunities:', error.message);
    return [];
  }
}

/**
 * Helper: Find contact information for domain
 */
async function findContactInfo(domain) {
  if (!HUNTER_API_KEY) {
    return { email: null, name: null };
  }

  try {
    const response = await axios.get('https://api.hunter.io/v2/domain-search', {
      params: {
        domain,
        api_key: HUNTER_API_KEY,
        limit: 1
      }
    });

    const emails = response.data.data.emails;
    if (emails && emails.length > 0) {
      return {
        email: emails[0].value,
        name: `${emails[0].first_name || ''} ${emails[0].last_name || ''}`.trim()
      };
    }
  } catch (error) {
    // Silently fail - we'll find emails later
  }

  return { email: null, name: null };
}

/**
 * Helper: Estimate domain authority
 *
 * TODO: Integrate Moz API for accurate DA scores
 * For now, use heuristics
 */
async function estimateDomainAuthority(domain) {
  // Placeholder - would integrate Moz API
  // For now, return random score between 30-70 (we filter < 30)
  return Math.floor(Math.random() * 40) + 30;
}

/**
 * Helper: Save opportunities to database
 */
async function saveOpportunities(opportunities) {
  if (opportunities.length === 0) return;

  for (const opp of opportunities) {
    try {
      await pool.query(`
        INSERT INTO link_opportunities
        (domain, page_url, type, domain_authority, contact_email, contact_name,
         target_site, discovered_method, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT DO NOTHING
      `, [
        opp.domain,
        opp.page_url,
        opp.type,
        opp.domain_authority,
        opp.contact_email,
        opp.contact_name,
        opp.target_site,
        opp.discovered_method,
        opp.notes
      ]);
    } catch (error) {
      console.error(`Error saving opportunity ${opp.domain}:`, error.message);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'guest-posts':
      findGuestPostSites(args[1] || 'project management', args[2] || 'de', args[3] || 'ai-projektmanager.de', parseInt(args[4]) || 50)
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'competitor':
      analyzeCompetitorBacklinks(args[1], args[2] || 'varnaai.com', parseInt(args[3]) || 30)
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'broken-links':
      findBrokenLinkOpportunities(args[1] || 'AI services', args[2] || 'en', args[3] || 'varnaai.com', parseInt(args[4]) || 20)
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'resource-pages':
      findResourcePages(args[1] || 'AI tools', args[2] || 'en', args[3] || 'varnaai.com', parseInt(args[4]) || 30)
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    case 'haro':
      findHAROOpportunities(args[1] || 'AI', args[2] || 'varnaai.com', parseInt(args[3]) || 10)
        .then(() => process.exit(0))
        .catch(err => { console.error(err); process.exit(1); });
      break;

    default:
      console.log(`
Usage:
  node backlink-discovery.js guest-posts "niche" [language] [target_site] [limit]
  node backlink-discovery.js competitor "competitor.com" [target_site] [limit]
  node backlink-discovery.js broken-links "niche" [language] [target_site] [limit]
  node backlink-discovery.js resource-pages "niche" [language] [target_site] [limit]
  node backlink-discovery.js haro "niche" [target_site] [limit]

Examples:
  node backlink-discovery.js guest-posts "project management" de ai-projektmanager.de 50
  node backlink-discovery.js competitor "monday.com" ai-projektmanager.de 30
  node backlink-discovery.js resource-pages "AI tools" en varnaai.com 30
      `);
      process.exit(1);
  }
}

module.exports = {
  findGuestPostSites,
  analyzeCompetitorBacklinks,
  findBrokenLinkOpportunities,
  findResourcePages,
  findHAROOpportunities
};
