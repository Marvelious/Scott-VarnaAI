#!/usr/bin/env node

/**
 * ABOUTME: Lead Generation Automation - Integrates Webscrap Lead Hunter Agent with WordPress workflow
 * ABOUTME: Automates finding German/Bulgarian SME leads for portfolio sites
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Webscrap API configuration
const WEBSCRAP_API_URL = process.env.WEBSCRAP_API_URL || 'http://localhost:8000';
const WEBSCRAP_API_KEY = process.env.WEBSCRAP_API_KEY || '';

// Lead Hunter Agent API endpoints
const ENDPOINTS = {
    leadHunter: '/api/agents/lead-hunter',
    contacts: '/api/contacts',
    pipeline: '/api/pipeline',
    health: '/health'
};

/**
 * Check if Webscrap backend is running
 */
async function checkWebscrapHealth() {
    try {
        const response = await axios.get(`${WEBSCRAP_API_URL}${ENDPOINTS.health}`);
        console.log('✅ Webscrap backend is running\n');
        return true;
    } catch (error) {
        console.error('❌ ERROR: Webscrap backend is NOT running');
        console.error('   Start it with: cd D:\\VarnaAI\\Webscrap && python main.py\n');
        return false;
    }
}

/**
 * Find German SME leads for specified industry and region
 */
async function findGermanLeads(industry, region, limit = 10) {
    console.log('🎯 GERMAN LEAD GENERATION\n');
    console.log(`Industry: ${industry}`);
    console.log(`Region: ${region}`);
    console.log(`Target: ${limit} leads\n`);
    console.log('━'.repeat(70));

    try {
        const response = await axios.post(`${WEBSCRAP_API_URL}${ENDPOINTS.leadHunter}/search`, {
            country: 'germany',
            industry: industry,
            region: region,
            limit: limit,
            include_contact_info: true,
            include_firmenwissen: true,
            include_wlw: true
        }, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const leads = response.data.leads || [];
        console.log(`\n📊 FOUND ${leads.length} GERMAN SME LEADS:\n`);

        leads.forEach((lead, index) => {
            console.log(`${index + 1}. ${lead.company_name}`);
            console.log(`   Industry: ${lead.industry}`);
            console.log(`   Location: ${lead.city}, ${lead.region}`);
            console.log(`   Size: ${lead.employee_count || 'N/A'} employees`);
            console.log(`   Revenue: €${lead.revenue || 'N/A'}`);
            if (lead.contact_person) {
                console.log(`   Contact: ${lead.contact_person} - ${lead.email || 'N/A'}`);
            }
            if (lead.website) {
                console.log(`   Website: ${lead.website}`);
            }
            console.log(`   Priority: ${lead.priority_score}/100`);
            console.log('');
        });

        // Save to file
        const timestamp = Date.now();
        const filename = `german-leads-${industry.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
        const filepath = path.join(__dirname, filename);
        fs.writeFileSync(filepath, JSON.stringify({
            search_params: { industry, region, limit },
            timestamp: new Date().toISOString(),
            leads: leads
        }, null, 2));

        console.log(`✅ Lead data saved to: ${filename}\n`);
        console.log('━'.repeat(70));
        console.log('\n📋 NEXT STEPS:\n');
        console.log('1. Review lead quality and priority scores');
        console.log('2. Add high-priority leads to CRM');
        console.log('3. Use for case studies and testimonials on WordPress sites');
        console.log('4. Target for outreach campaigns\n');

        return leads;
    } catch (error) {
        console.error('❌ ERROR finding German leads:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        }
        return [];
    }
}

/**
 * Find Bulgarian SME leads for specified industry and region
 */
async function findBulgarianLeads(industry, region = 'Varna', limit = 10) {
    console.log('🎯 BULGARIAN LEAD GENERATION\n');
    console.log(`Industry: ${industry}`);
    console.log(`Region: ${region}`);
    console.log(`Target: ${limit} leads\n`);
    console.log('━'.repeat(70));

    try {
        const response = await axios.post(`${WEBSCRAP_API_URL}${ENDPOINTS.leadHunter}/search`, {
            country: 'bulgaria',
            industry: industry,
            region: region,
            limit: limit,
            include_contact_info: true
        }, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const leads = response.data.leads || [];
        console.log(`\n📊 FOUND ${leads.length} BULGARIAN SME LEADS:\n`);

        leads.forEach((lead, index) => {
            console.log(`${index + 1}. ${lead.company_name}`);
            console.log(`   Industry: ${lead.industry}`);
            console.log(`   Location: ${lead.city}, ${lead.region}`);
            console.log(`   Size: ${lead.employee_count || 'N/A'} employees`);
            if (lead.contact_person) {
                console.log(`   Contact: ${lead.contact_person} - ${lead.email || 'N/A'}`);
            }
            if (lead.website) {
                console.log(`   Website: ${lead.website}`);
            }
            console.log(`   Priority: ${lead.priority_score}/100`);
            console.log('');
        });

        // Save to file
        const timestamp = Date.now();
        const filename = `bulgarian-leads-${industry.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
        const filepath = path.join(__dirname, filename);
        fs.writeFileSync(filepath, JSON.stringify({
            search_params: { industry, region, limit },
            timestamp: new Date().toISOString(),
            leads: leads
        }, null, 2));

        console.log(`✅ Lead data saved to: ${filename}\n`);
        return leads;
    } catch (error) {
        console.error('❌ ERROR finding Bulgarian leads:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        }
        return [];
    }
}

/**
 * Get current pipeline summary
 */
async function getPipelineSummary() {
    console.log('📊 PIPELINE SUMMARY\n');
    console.log('━'.repeat(70));

    try {
        const response = await axios.get(`${WEBSCRAP_API_URL}${ENDPOINTS.pipeline}`, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`
            }
        });

        const pipeline = response.data;
        console.log(`\nTotal Pipeline Value: €${pipeline.total_value || 0}\n`);
        console.log('PRIORITY CONTACTS:\n');

        if (pipeline.priority_contacts && pipeline.priority_contacts.length > 0) {
            pipeline.priority_contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.name} - ${contact.company}`);
                console.log(`   Value: €${contact.value}`);
                console.log(`   Status: ${contact.status}`);
                console.log(`   Industry: ${contact.industry}`);
                console.log('');
            });
        } else {
            console.log('   No priority contacts found\n');
        }

        return pipeline;
    } catch (error) {
        console.error('❌ ERROR getting pipeline:', error.message);
        return null;
    }
}

/**
 * Enrich leads with additional data (website, social profiles, etc.)
 */
async function enrichLeads(leadIds) {
    console.log('🔍 ENRICHING LEAD DATA\n');
    console.log(`Processing ${leadIds.length} leads...\n`);

    try {
        const response = await axios.post(`${WEBSCRAP_API_URL}${ENDPOINTS.leadHunter}/enrich`, {
            lead_ids: leadIds,
            include_social: true,
            include_financials: true,
            include_technologies: true
        }, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const enrichedLeads = response.data.leads || [];
        console.log(`✅ Enriched ${enrichedLeads.length} leads with additional data\n`);

        enrichedLeads.forEach((lead, index) => {
            console.log(`${index + 1}. ${lead.company_name}`);
            if (lead.technologies) {
                console.log(`   Tech Stack: ${lead.technologies.join(', ')}`);
            }
            if (lead.social_profiles) {
                console.log(`   Social: ${Object.keys(lead.social_profiles).join(', ')}`);
            }
            if (lead.financial_data) {
                console.log(`   Revenue: €${lead.financial_data.revenue || 'N/A'}`);
                console.log(`   Growth: ${lead.financial_data.growth_rate || 'N/A'}%`);
            }
            console.log('');
        });

        return enrichedLeads;
    } catch (error) {
        console.error('❌ ERROR enriching leads:', error.message);
        return [];
    }
}

// CLI Command Handler
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('\n🚀 LEAD GENERATION AUTOMATION\n');

    // Check if Webscrap backend is running
    const isHealthy = await checkWebscrapHealth();
    if (!isHealthy) {
        process.exit(1);
    }

    switch (command) {
        case 'german':
            // Find German SME leads
            const germanIndustry = args[1] || 'IT Services';
            const germanRegion = args[2] || 'Bayern';
            const germanLimit = parseInt(args[3]) || 10;
            await findGermanLeads(germanIndustry, germanRegion, germanLimit);
            break;

        case 'bulgarian':
            // Find Bulgarian SME leads
            const bulgarianIndustry = args[1] || 'IT Services';
            const bulgarianRegion = args[2] || 'Varna';
            const bulgarianLimit = parseInt(args[3]) || 10;
            await findBulgarianLeads(bulgarianIndustry, bulgarianRegion, bulgarianLimit);
            break;

        case 'pipeline':
            // Get pipeline summary
            await getPipelineSummary();
            break;

        case 'enrich':
            // Enrich leads with additional data
            const leadIds = args.slice(1);
            if (leadIds.length === 0) {
                console.log('❌ ERROR: No lead IDs provided');
                console.log('   Usage: node lead-generation-automation.js enrich <lead_id1> <lead_id2> ...\n');
                process.exit(1);
            }
            await enrichLeads(leadIds);
            break;

        case 'help':
        default:
            console.log('USAGE:\n');
            console.log('  node lead-generation-automation.js german <industry> [region] [limit]');
            console.log('     Find German SME leads by industry and region\n');
            console.log('  node lead-generation-automation.js bulgarian <industry> [region] [limit]');
            console.log('     Find Bulgarian SME leads by industry and region\n');
            console.log('  node lead-generation-automation.js pipeline');
            console.log('     Get current sales pipeline summary\n');
            console.log('  node lead-generation-automation.js enrich <lead_id1> <lead_id2> ...');
            console.log('     Enrich leads with additional data\n');
            console.log('EXAMPLES:\n');
            console.log('  node lead-generation-automation.js german "IT Services" "Bayern" 20');
            console.log('  node lead-generation-automation.js bulgarian "Manufacturing" "Varna" 15');
            console.log('  node lead-generation-automation.js pipeline');
            console.log('  node lead-generation-automation.js enrich lead_123 lead_456\n');
            console.log('GERMAN INDUSTRIES:\n');
            console.log('  - IT Services, Software Development, Manufacturing');
            console.log('  - Automotive, Chemical Industry, Medical Technology');
            console.log('  - Mechanical Engineering, Electrical Engineering\n');
            console.log('GERMAN REGIONS:\n');
            console.log('  - Bayern, Baden-Württemberg, Nordrhein-Westfalen');
            console.log('  - Hessen, Berlin, Hamburg, Niedersachsen\n');
            break;
    }

    console.log('');
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = {
    findGermanLeads,
    findBulgarianLeads,
    getPipelineSummary,
    enrichLeads
};
