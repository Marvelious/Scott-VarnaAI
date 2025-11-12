#!/usr/bin/env node

/**
 * ABOUTME: Market Research Automation - Integrates Webscrap Market Analyst Agent with WordPress workflow
 * ABOUTME: Automates German/Bulgarian SME market analysis for content creation and strategy
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Webscrap API configuration
const WEBSCRAP_API_URL = process.env.WEBSCRAP_API_URL || 'http://localhost:8000';
const WEBSCRAP_API_KEY = process.env.WEBSCRAP_API_KEY || '';

// Market Analyst Agent API endpoints
const ENDPOINTS = {
    marketAnalyst: '/api/agents/market-analyst',
    marketIntelligence: '/api/market-intelligence',
    opportunities: '/api/opportunities',
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
 * Analyze German market for specific industry and region
 */
async function analyzeGermanMarket(industry, region) {
    console.log('📊 GERMAN MARKET ANALYSIS\n');
    console.log(`Industry: ${industry}`);
    console.log(`Region: ${region}\n`);
    console.log('━'.repeat(70));

    try {
        const response = await axios.post(`${WEBSCRAP_API_URL}${ENDPOINTS.marketAnalyst}/analyze`, {
            country: 'germany',
            industry: industry,
            region: region,
            include_economic_indicators: true,
            include_competitor_analysis: true,
            include_trends: true,
            data_sources: [
                'Deutsche Bundesbank',
                'Destatis',
                'Germany Trade & Invest',
                'IHK',
                'Mittelstand Monitor'
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const analysis = response.data;
        console.log('\n📈 MARKET OVERVIEW:\n');
        console.log(`Market Size: €${analysis.market_size || 'N/A'} billion`);
        console.log(`Growth Rate: ${analysis.growth_rate || 'N/A'}% YoY`);
        console.log(`Number of Companies: ${analysis.company_count || 'N/A'}`);
        console.log(`Employment: ${analysis.employment_count || 'N/A'} employees`);
        console.log('');

        console.log('🎯 KEY TRENDS:\n');
        if (analysis.trends && analysis.trends.length > 0) {
            analysis.trends.forEach((trend, index) => {
                console.log(`${index + 1}. ${trend.title}`);
                console.log(`   Impact: ${trend.impact_level}`);
                console.log(`   Timeline: ${trend.timeline}`);
                console.log(`   Description: ${trend.description}`);
                console.log('');
            });
        }

        console.log('⚔️ COMPETITIVE LANDSCAPE:\n');
        if (analysis.competitors && analysis.competitors.length > 0) {
            analysis.competitors.slice(0, 5).forEach((competitor, index) => {
                console.log(`${index + 1}. ${competitor.company_name}`);
                console.log(`   Market Share: ${competitor.market_share}%`);
                console.log(`   Revenue: €${competitor.revenue || 'N/A'} million`);
                console.log(`   Strengths: ${competitor.strengths || 'N/A'}`);
                console.log('');
            });
        }

        console.log('💰 ECONOMIC INDICATORS:\n');
        if (analysis.economic_indicators) {
            console.log(`GDP Growth: ${analysis.economic_indicators.gdp_growth || 'N/A'}%`);
            console.log(`Inflation Rate: ${analysis.economic_indicators.inflation_rate || 'N/A'}%`);
            console.log(`Unemployment: ${analysis.economic_indicators.unemployment || 'N/A'}%`);
            console.log(`Business Confidence: ${analysis.economic_indicators.business_confidence || 'N/A'}/100`);
            console.log('');
        }

        console.log('🎯 OPPORTUNITIES:\n');
        if (analysis.opportunities && analysis.opportunities.length > 0) {
            analysis.opportunities.forEach((opp, index) => {
                console.log(`${index + 1}. ${opp.title}`);
                console.log(`   Value: €${opp.estimated_value || 'N/A'}`);
                console.log(`   Priority: ${opp.priority_level}`);
                console.log(`   Description: ${opp.description}`);
                console.log('');
            });
        }

        // Save to file
        const timestamp = Date.now();
        const filename = `german-market-${industry.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}-${timestamp}.json`;
        const filepath = path.join(__dirname, filename);
        fs.writeFileSync(filepath, JSON.stringify({
            search_params: { industry, region },
            timestamp: new Date().toISOString(),
            analysis: analysis
        }, null, 2));

        console.log(`✅ Market analysis saved to: ${filename}\n`);
        console.log('━'.repeat(70));
        console.log('\n📋 CONTENT IDEAS FOR WORDPRESS:\n');
        console.log('1. "Top 5 Trends in German ' + industry + '" blog post');
        console.log('2. "Market Report: ' + region + ' ' + industry + ' Analysis" whitepaper');
        console.log('3. Case study: "Success Stories in ' + industry + '"');
        console.log('4. Industry comparison: "Germany vs. European Market"\n');

        return analysis;
    } catch (error) {
        console.error('❌ ERROR analyzing German market:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        }
        return null;
    }
}

/**
 * Analyze Bulgarian market for specific industry and region
 */
async function analyzeBulgarianMarket(industry, region = 'Varna') {
    console.log('📊 BULGARIAN MARKET ANALYSIS\n');
    console.log(`Industry: ${industry}`);
    console.log(`Region: ${region}\n`);
    console.log('━'.repeat(70));

    try {
        const response = await axios.post(`${WEBSCRAP_API_URL}${ENDPOINTS.marketAnalyst}/analyze`, {
            country: 'bulgaria',
            industry: industry,
            region: region,
            include_economic_indicators: true,
            include_competitor_analysis: true,
            include_trends: true,
            data_sources: [
                'Bulgarian National Bank',
                'Bulgarian NSI',
                'Invest Bulgaria Agency'
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const analysis = response.data;
        console.log('\n📈 MARKET OVERVIEW:\n');
        console.log(`Market Size: €${analysis.market_size || 'N/A'} million`);
        console.log(`Growth Rate: ${analysis.growth_rate || 'N/A'}% YoY`);
        console.log(`Number of Companies: ${analysis.company_count || 'N/A'}`);
        console.log('');

        console.log('🎯 KEY TRENDS:\n');
        if (analysis.trends && analysis.trends.length > 0) {
            analysis.trends.forEach((trend, index) => {
                console.log(`${index + 1}. ${trend.title}`);
                console.log(`   Impact: ${trend.impact_level}`);
                console.log(`   Description: ${trend.description}`);
                console.log('');
            });
        }

        // Save to file
        const timestamp = Date.now();
        const filename = `bulgarian-market-${industry.toLowerCase().replace(/\s+/g, '-')}-${region.toLowerCase()}-${timestamp}.json`;
        const filepath = path.join(__dirname, filename);
        fs.writeFileSync(filepath, JSON.stringify({
            search_params: { industry, region },
            timestamp: new Date().toISOString(),
            analysis: analysis
        }, null, 2));

        console.log(`✅ Market analysis saved to: ${filename}\n`);
        return analysis;
    } catch (error) {
        console.error('❌ ERROR analyzing Bulgarian market:', error.message);
        return null;
    }
}

/**
 * Compare German and Bulgarian markets for same industry
 */
async function compareMarkets(industry) {
    console.log('⚖️ MARKET COMPARISON: GERMANY VS. BULGARIA\n');
    console.log(`Industry: ${industry}\n`);
    console.log('━'.repeat(70));

    try {
        const [germanMarket, bulgarianMarket] = await Promise.all([
            analyzeGermanMarket(industry, 'Bayern'),
            analyzeBulgarianMarket(industry, 'Varna')
        ]);

        console.log('\n📊 COMPARATIVE ANALYSIS:\n');
        console.log('GERMANY:');
        console.log(`  Market Size: €${germanMarket?.market_size || 'N/A'}B`);
        console.log(`  Growth Rate: ${germanMarket?.growth_rate || 'N/A'}%`);
        console.log('');
        console.log('BULGARIA:');
        console.log(`  Market Size: €${bulgarianMarket?.market_size || 'N/A'}M`);
        console.log(`  Growth Rate: ${bulgarianMarket?.growth_rate || 'N/A'}%`);
        console.log('');

        console.log('💡 STRATEGIC INSIGHTS:\n');
        console.log('1. German market is more mature with established players');
        console.log('2. Bulgarian market offers faster growth opportunities');
        console.log('3. Consider dual-market strategy for maximum reach\n');

        return { germanMarket, bulgarianMarket };
    } catch (error) {
        console.error('❌ ERROR comparing markets:', error.message);
        return null;
    }
}

/**
 * Get trending topics for content creation
 */
async function getTrendingTopics(country, industry) {
    console.log('🔥 TRENDING TOPICS\n');
    console.log(`Country: ${country.toUpperCase()}`);
    console.log(`Industry: ${industry}\n`);
    console.log('━'.repeat(70));

    try {
        const response = await axios.get(`${WEBSCRAP_API_URL}${ENDPOINTS.marketAnalyst}/trending`, {
            params: {
                country: country,
                industry: industry,
                timeframe: '30d'
            },
            headers: {
                'Authorization': `Bearer ${WEBSCRAP_API_KEY}`
            }
        });

        const topics = response.data.topics || [];
        console.log('\n🔥 TOP TRENDING TOPICS:\n');

        topics.forEach((topic, index) => {
            console.log(`${index + 1}. ${topic.title}`);
            console.log(`   Trend Score: ${topic.trend_score}/100`);
            console.log(`   Search Volume: ${topic.search_volume || 'N/A'}`);
            console.log(`   Growth: ${topic.growth_rate || 'N/A'}%`);
            console.log(`   Keywords: ${topic.related_keywords?.slice(0, 5).join(', ') || 'N/A'}`);
            console.log('');
        });

        console.log('📋 CONTENT OPPORTUNITIES:\n');
        topics.slice(0, 3).forEach((topic, index) => {
            console.log(`${index + 1}. Write blog post: "Understanding ${topic.title}"`);
            console.log(`   Target Keywords: ${topic.related_keywords?.slice(0, 3).join(', ')}`);
            console.log(`   Expected Traffic: ${Math.floor(topic.search_volume * 0.05)} visits/month`);
            console.log('');
        });

        return topics;
    } catch (error) {
        console.error('❌ ERROR getting trending topics:', error.message);
        return [];
    }
}

/**
 * Generate market insights report for WordPress content
 */
async function generateMarketReport(country, industry, region) {
    console.log('📝 GENERATING MARKET INSIGHTS REPORT\n');
    console.log('━'.repeat(70));

    const analysis = country === 'germany'
        ? await analyzeGermanMarket(industry, region)
        : await analyzeBulgarianMarket(industry, region);

    if (!analysis) {
        console.log('❌ Could not generate report\n');
        return null;
    }

    const report = {
        title: `${country.toUpperCase()} ${industry} Market Analysis - ${region}`,
        executive_summary: `Analysis of the ${industry} sector in ${region}, ${country.toUpperCase()}.`,
        market_size: analysis.market_size,
        growth_rate: analysis.growth_rate,
        key_trends: analysis.trends?.map(t => t.title) || [],
        opportunities: analysis.opportunities?.map(o => o.title) || [],
        wordpress_seo: {
            focus_keyword: `${industry} ${country}`,
            related_keywords: [
                `${industry} market ${country}`,
                `${region} ${industry}`,
                `${industry} trends ${country}`
            ],
            suggested_headings: [
                `## ${industry} Market Overview in ${region}`,
                `## Current Trends in ${country.toUpperCase()} ${industry}`,
                `## Key Players and Competition`,
                `## Growth Opportunities for 2025`
            ]
        }
    };

    // Save report
    const timestamp = Date.now();
    const filename = `market-report-${country}-${industry.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
    const filepath = path.join(__dirname, filename);
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));

    console.log('\n✅ Market Report Generated:\n');
    console.log('TITLE:', report.title);
    console.log('');
    console.log('KEY TRENDS:');
    report.key_trends.slice(0, 5).forEach(trend => console.log(`  - ${trend}`));
    console.log('');
    console.log('WORDPRESS SEO:');
    console.log(`  Focus Keyword: ${report.wordpress_seo.focus_keyword}`);
    console.log(`  Related Keywords: ${report.wordpress_seo.related_keywords.join(', ')}`);
    console.log('');
    console.log('SUGGESTED HEADINGS:');
    report.wordpress_seo.suggested_headings.forEach(heading => console.log(`  ${heading}`));
    console.log('');
    console.log(`📄 Full report saved to: ${filename}\n`);

    return report;
}

// CLI Command Handler
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('\n🚀 MARKET RESEARCH AUTOMATION\n');

    // Check if Webscrap backend is running
    const isHealthy = await checkWebscrapHealth();
    if (!isHealthy) {
        process.exit(1);
    }

    switch (command) {
        case 'german':
            // Analyze German market
            const germanIndustry = args[1] || 'IT Services';
            const germanRegion = args[2] || 'Bayern';
            await analyzeGermanMarket(germanIndustry, germanRegion);
            break;

        case 'bulgarian':
            // Analyze Bulgarian market
            const bulgarianIndustry = args[1] || 'IT Services';
            const bulgarianRegion = args[2] || 'Varna';
            await analyzeBulgarianMarket(bulgarianIndustry, bulgarianRegion);
            break;

        case 'compare':
            // Compare markets
            const compareIndustry = args[1] || 'IT Services';
            await compareMarkets(compareIndustry);
            break;

        case 'trending':
            // Get trending topics
            const trendCountry = args[1] || 'germany';
            const trendIndustry = args[2] || 'IT Services';
            await getTrendingTopics(trendCountry, trendIndustry);
            break;

        case 'report':
            // Generate market report for WordPress
            const reportCountry = args[1] || 'germany';
            const reportIndustry = args[2] || 'IT Services';
            const reportRegion = args[3] || (reportCountry === 'germany' ? 'Bayern' : 'Varna');
            await generateMarketReport(reportCountry, reportIndustry, reportRegion);
            break;

        case 'help':
        default:
            console.log('USAGE:\n');
            console.log('  node market-research-automation.js german <industry> [region]');
            console.log('     Analyze German market for specific industry and region\n');
            console.log('  node market-research-automation.js bulgarian <industry> [region]');
            console.log('     Analyze Bulgarian market for specific industry and region\n');
            console.log('  node market-research-automation.js compare <industry>');
            console.log('     Compare German and Bulgarian markets for same industry\n');
            console.log('  node market-research-automation.js trending <country> <industry>');
            console.log('     Get trending topics for content creation\n');
            console.log('  node market-research-automation.js report <country> <industry> [region]');
            console.log('     Generate comprehensive market report for WordPress content\n');
            console.log('EXAMPLES:\n');
            console.log('  node market-research-automation.js german "IT Services" "Bayern"');
            console.log('  node market-research-automation.js bulgarian "Manufacturing" "Varna"');
            console.log('  node market-research-automation.js compare "IT Services"');
            console.log('  node market-research-automation.js trending germany "IT Services"');
            console.log('  node market-research-automation.js report germany "Enterprise Software" "Bayern"\n');
            console.log('GERMAN INDUSTRIES:\n');
            console.log('  - IT Services, Software Development, Manufacturing');
            console.log('  - Automotive, Mechanical Engineering, Medical Technology\n');
            console.log('GERMAN REGIONS:\n');
            console.log('  - Bayern, Baden-Württemberg, Nordrhein-Westfalen, Hessen\n');
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
    analyzeGermanMarket,
    analyzeBulgarianMarket,
    compareMarkets,
    getTrendingTopics,
    generateMarketReport
};
