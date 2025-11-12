#!/usr/bin/env node

/**
 * ABOUTME: Interactive startup menu for SeoAgent automation hub
 * ABOUTME: Single entry point for all SEO, Lead Gen, and Market Research automations
 */

const { spawn } = require('child_process');
const readline = require('readline');
const path = require('path');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Helper function to colorize text
function color(text, colorCode) {
    return `${colorCode}${text}${colors.reset}`;
}

// Create readline interface
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// Display main menu
function displayMainMenu() {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('🚀 SEOAGENT AUTOMATION HUB', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');
    console.log(color('Complete automation for SEO, Lead Generation, and Market Research', colors.dim));
    console.log('');

    console.log(color('1. SEO Automation', colors.bright + colors.green));
    console.log('   ├─ Analyze WordPress Page');
    console.log('   ├─ Research Keywords');
    console.log('   ├─ Check Rankings');
    console.log('   ├─ Find Backlinks');
    console.log('   └─ Get Content Ideas');
    console.log('');

    console.log(color('2. Lead Generation', colors.bright + colors.yellow) + color(' (Requires Webscrap)', colors.dim));
    console.log('   ├─ Find German SME Leads');
    console.log('   ├─ Find Bulgarian SME Leads');
    console.log('   ├─ Get Pipeline Summary');
    console.log('   └─ Enrich Lead Data');
    console.log('');

    console.log(color('3. Market Research', colors.bright + colors.magenta) + color(' (Requires Webscrap)', colors.dim));
    console.log('   ├─ Analyze German Market');
    console.log('   ├─ Analyze Bulgarian Market');
    console.log('   ├─ Compare Markets');
    console.log('   ├─ Get Trending Topics');
    console.log('   └─ Generate Market Report');
    console.log('');

    console.log(color('4. WordPress Tools', colors.bright + colors.blue));
    console.log('   ├─ Analyze WordPress Page SEO');
    console.log('   └─ Batch Analyze All WordPress Sites');
    console.log('');

    console.log(color('5. Documentation', colors.bright + colors.cyan));
    console.log('   ├─ Read All Documentation');
    console.log('   ├─ Search Documentation');
    console.log('   ├─ Quick Reference Card');
    console.log('   └─ Getting Started Guide');
    console.log('');

    console.log(color('6. System Status', colors.bright + colors.blue));
    console.log('   ├─ Check SEO Agent Status');
    console.log('   ├─ Check Webscrap Status');
    console.log('   └─ View Prerequisites');
    console.log('');

    console.log(color('0. Exit', colors.dim));
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));
}

// SEO Automation submenu
async function seoAutomationMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.green));
    console.log(color('🔍 SEO AUTOMATION', colors.bright + colors.green));
    console.log(color('═'.repeat(70), colors.green));
    console.log('');

    console.log('1. Analyze Website SEO');
    console.log('2. Research Keywords');
    console.log('3. Check Rankings');
    console.log('4. Find Backlinks');
    console.log('5. Get Analytics');
    console.log('6. Get Content Ideas');
    console.log('0. Back to Main Menu');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));

    const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

    switch(choice) {
        case '1':
            const url = await askQuestion(rl, 'Enter website URL: ');
            if (url) runCommand('node', ['automate-seo-analysis.js', 'analyze', url]);
            break;
        case '2':
            const topic = await askQuestion(rl, 'Enter topic/keyword: ');
            const lang = await askQuestion(rl, 'Enter language (de/en/bg): ');
            if (topic) runCommand('node', ['automate-seo-analysis.js', 'keywords', topic, lang || 'de']);
            break;
        case '3':
            const rankUrl = await askQuestion(rl, 'Enter website URL: ');
            const keywords = await askQuestion(rl, 'Enter keywords (comma-separated): ');
            if (rankUrl && keywords) runCommand('node', ['automate-seo-analysis.js', 'rankings', rankUrl, keywords]);
            break;
        case '4':
            const backlinkUrl = await askQuestion(rl, 'Enter website URL: ');
            if (backlinkUrl) runCommand('node', ['automate-seo-analysis.js', 'backlinks', backlinkUrl]);
            break;
        case '5':
            const websiteId = await askQuestion(rl, 'Enter website ID: ');
            const timeRange = await askQuestion(rl, 'Enter time range (7d/30d/90d): ');
            if (websiteId) runCommand('node', ['automate-seo-analysis.js', 'analytics', websiteId, timeRange || '30d']);
            break;
        case '6':
            const ideaTopic = await askQuestion(rl, 'Enter topic: ');
            const niche = await askQuestion(rl, 'Enter niche: ');
            const ideaLang = await askQuestion(rl, 'Enter language (de/en/bg): ');
            if (ideaTopic && niche) runCommand('node', ['automate-seo-analysis.js', 'ideas', ideaTopic, niche, ideaLang || 'de']);
            break;
        case '0':
            return;
        default:
            console.log(color('\n❌ Invalid choice', colors.red));
            await askQuestion(rl, 'Press Enter to continue...');
    }

    if (choice !== '0') {
        await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
    }
}

// Lead Generation submenu
async function leadGenerationMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.yellow));
    console.log(color('👥 LEAD GENERATION', colors.bright + colors.yellow));
    console.log(color('═'.repeat(70), colors.yellow));
    console.log('');
    console.log(color('⚠️  Requires Webscrap backend running on http://localhost:8000', colors.dim));
    console.log('');

    console.log('1. Find German SME Leads');
    console.log('2. Find Bulgarian SME Leads');
    console.log('3. Get Pipeline Summary');
    console.log('4. Enrich Lead Data');
    console.log('0. Back to Main Menu');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));

    const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

    switch(choice) {
        case '1':
            const germanIndustry = await askQuestion(rl, 'Enter industry (IT Services, Manufacturing, etc.): ');
            const germanRegion = await askQuestion(rl, 'Enter region (Bayern, Baden-Württemberg, etc.): ');
            const germanLimit = await askQuestion(rl, 'Enter limit (default 10): ');
            if (germanIndustry) {
                runCommand('node', [
                    'lead-generation-automation.js',
                    'german',
                    germanIndustry,
                    germanRegion || 'Bayern',
                    germanLimit || '10'
                ]);
            }
            break;
        case '2':
            const bulgarianIndustry = await askQuestion(rl, 'Enter industry: ');
            const bulgarianRegion = await askQuestion(rl, 'Enter region (Varna, Sofia, etc.): ');
            const bulgarianLimit = await askQuestion(rl, 'Enter limit (default 10): ');
            if (bulgarianIndustry) {
                runCommand('node', [
                    'lead-generation-automation.js',
                    'bulgarian',
                    bulgarianIndustry,
                    bulgarianRegion || 'Varna',
                    bulgarianLimit || '10'
                ]);
            }
            break;
        case '3':
            runCommand('node', ['lead-generation-automation.js', 'pipeline']);
            break;
        case '4':
            const leadIds = await askQuestion(rl, 'Enter lead IDs (space-separated): ');
            if (leadIds) {
                const ids = leadIds.split(' ');
                runCommand('node', ['lead-generation-automation.js', 'enrich', ...ids]);
            }
            break;
        case '0':
            return;
        default:
            console.log(color('\n❌ Invalid choice', colors.red));
            await askQuestion(rl, 'Press Enter to continue...');
    }

    if (choice !== '0') {
        await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
    }
}

// Market Research submenu
async function marketResearchMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.magenta));
    console.log(color('📊 MARKET RESEARCH', colors.bright + colors.magenta));
    console.log(color('═'.repeat(70), colors.magenta));
    console.log('');
    console.log(color('⚠️  Requires Webscrap backend running on http://localhost:8000', colors.dim));
    console.log('');

    console.log('1. Analyze German Market');
    console.log('2. Analyze Bulgarian Market');
    console.log('3. Compare Germany vs Bulgaria Markets');
    console.log('4. Get Trending Topics');
    console.log('5. Generate Market Report for WordPress');
    console.log('0. Back to Main Menu');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));

    const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

    switch(choice) {
        case '1':
            const germanIndustry = await askQuestion(rl, 'Enter industry: ');
            const germanRegion = await askQuestion(rl, 'Enter region (Bayern, etc.): ');
            if (germanIndustry) {
                runCommand('node', [
                    'market-research-automation.js',
                    'german',
                    germanIndustry,
                    germanRegion || 'Bayern'
                ]);
            }
            break;
        case '2':
            const bulgarianIndustry = await askQuestion(rl, 'Enter industry: ');
            const bulgarianRegion = await askQuestion(rl, 'Enter region (Varna, etc.): ');
            if (bulgarianIndustry) {
                runCommand('node', [
                    'market-research-automation.js',
                    'bulgarian',
                    bulgarianIndustry,
                    bulgarianRegion || 'Varna'
                ]);
            }
            break;
        case '3':
            const compareIndustry = await askQuestion(rl, 'Enter industry to compare: ');
            if (compareIndustry) {
                runCommand('node', ['market-research-automation.js', 'compare', compareIndustry]);
            }
            break;
        case '4':
            const trendCountry = await askQuestion(rl, 'Enter country (germany/bulgaria): ');
            const trendIndustry = await askQuestion(rl, 'Enter industry: ');
            if (trendCountry && trendIndustry) {
                runCommand('node', ['market-research-automation.js', 'trending', trendCountry, trendIndustry]);
            }
            break;
        case '5':
            const reportCountry = await askQuestion(rl, 'Enter country (germany/bulgaria): ');
            const reportIndustry = await askQuestion(rl, 'Enter industry: ');
            const reportRegion = await askQuestion(rl, 'Enter region: ');
            if (reportCountry && reportIndustry) {
                runCommand('node', [
                    'market-research-automation.js',
                    'report',
                    reportCountry,
                    reportIndustry,
                    reportRegion || (reportCountry === 'germany' ? 'Bayern' : 'Varna')
                ]);
            }
            break;
        case '0':
            return;
        default:
            console.log(color('\n❌ Invalid choice', colors.red));
            await askQuestion(rl, 'Press Enter to continue...');
    }

    if (choice !== '0') {
        await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
    }
}

// WordPress Tools submenu
async function wordpressToolsMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.blue));
    console.log(color('🌐 WORDPRESS TOOLS', colors.bright + colors.blue));
    console.log(color('═'.repeat(70), colors.blue));
    console.log('');

    console.log('1. Analyze WordPress Page SEO');
    console.log('2. Batch Analyze All WordPress Sites');
    console.log('0. Back to Main Menu');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));

    const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

    switch(choice) {
        case '1':
            const url = await askQuestion(rl, 'Enter WordPress page URL: ');
            const keyword = await askQuestion(rl, 'Enter focus keyword: ');
            if (url && keyword) {
                runCommand('node', ['wordpress-seo-helper.js', 'analyze', url, keyword]);
            }
            break;
        case '2':
            runCommand('node', ['wordpress-seo-helper.js', 'batch']);
            break;
        case '0':
            return;
        default:
            console.log(color('\n❌ Invalid choice', colors.red));
            await askQuestion(rl, 'Press Enter to continue...');
    }

    if (choice !== '0') {
        await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
    }
}

// Documentation submenu
async function documentationMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('📚 DOCUMENTATION', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    console.log('1. Read All Documentation (Interactive Browser)');
    console.log('2. Quick Reference Card');
    console.log('3. Getting Started Guide');
    console.log('0. Back to Main Menu');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));

    const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

    switch(choice) {
        case '1':
            runCommand('node', ['docs-reader.js']);
            break;
        case '2':
            displayQuickReference();
            await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
            break;
        case '3':
            displayGettingStarted();
            await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
            break;
        case '0':
            return;
        default:
            console.log(color('\n❌ Invalid choice', colors.red));
            await askQuestion(rl, 'Press Enter to continue...');
    }
}

// System Status submenu
async function systemStatusMenu(rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.blue));
    console.log(color('🔧 SYSTEM STATUS', colors.bright + colors.blue));
    console.log(color('═'.repeat(70), colors.blue));
    console.log('');

    // Check SEO Agent status (placeholder - would need actual implementation)
    console.log(color('SEO Agent Backend:', colors.bright));
    console.log('  Expected URL: http://localhost:4000');
    console.log('  Status: ' + color('Not checked (run manually)', colors.yellow));
    console.log('  Start: cd D:\\VarnaAI\\seoagent\\backend && npm run dev');
    console.log('');

    // Check Webscrap status
    console.log(color('Webscrap Backend:', colors.bright));
    console.log('  Expected URL: http://localhost:8000');
    console.log('  Status: ' + color('Not checked (run manually)', colors.yellow));
    console.log('  Start: cd D:\\VarnaAI\\Webscrap && python main.py');
    console.log('');

    console.log(color('Prerequisites:', colors.bright));
    console.log('  ✅ Node.js installed');
    console.log('  ✅ Scripts available');
    console.log('  ⚠️  SEO Agent backend (start manually if needed)');
    console.log('  ⚠️  Webscrap backend (start manually if needed)');
    console.log('');

    console.log(color('─'.repeat(70), colors.dim));
    await askQuestion(rl, color('\nPress Enter to return to menu...', colors.yellow));
}

// Display quick reference
function displayQuickReference() {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('📋 QUICK REFERENCE CARD', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    console.log(color('🚀 GETTING STARTED', colors.bright));
    console.log('');
    console.log('  cd D:\\VarnaAI\\Websites\\SeoAgent');
    console.log('  node seoagent-menu.js');
    console.log('');

    console.log(color('🔍 DIRECT COMMANDS', colors.bright));
    console.log('');
    console.log('  # SEO Automation');
    console.log('  node automate-seo-analysis.js analyze <url>');
    console.log('  node wordpress-seo-helper.js analyze <url> <keyword>');
    console.log('');
    console.log('  # Lead Generation');
    console.log('  node lead-generation-automation.js german "IT Services" "Bayern" 20');
    console.log('');
    console.log('  # Market Research');
    console.log('  node market-research-automation.js german "IT Services" "Bayern"');
    console.log('');

    console.log(color('─'.repeat(70), colors.dim));
}

// Display getting started guide
function displayGettingStarted() {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('🎓 GETTING STARTED GUIDE', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    console.log(color('Step 1: Navigate to SeoAgent Folder', colors.bright));
    console.log('  cd D:\\VarnaAI\\Websites\\SeoAgent');
    console.log('');

    console.log(color('Step 2: Choose Your Automation', colors.bright));
    console.log('  • SEO Automation - No prerequisites');
    console.log('  • Lead Generation - Requires Webscrap running');
    console.log('  • Market Research - Requires Webscrap running');
    console.log('');

    console.log(color('Step 3: Start Backend Services (if needed)', colors.bright));
    console.log('  SEO Agent:  cd D:\\VarnaAI\\seoagent\\backend && npm run dev');
    console.log('  Webscrap:   cd D:\\VarnaAI\\Webscrap && python main.py');
    console.log('');

    console.log(color('Step 4: Run Automation', colors.bright));
    console.log('  Use this menu (node seoagent-menu.js) or run scripts directly');
    console.log('');

    console.log(color('Step 5: View Results', colors.bright));
    console.log('  Reports saved as JSON files in SeoAgent folder');
    console.log('');

    console.log(color('─'.repeat(70), colors.dim));
}

// Helper function to ask questions
function askQuestion(rl, question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.trim());
        });
    });
}

// Run external command
function runCommand(command, args) {
    console.log('');
    console.log(color(`Running: ${command} ${args.join(' ')}`, colors.dim));
    console.log(color('─'.repeat(70), colors.dim));
    console.log('');

    const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        cwd: __dirname
    });

    return new Promise((resolve, reject) => {
        child.on('close', code => {
            if (code === 0) {
                resolve();
            } else {
                console.log('');
                console.log(color(`Process exited with code ${code}`, colors.yellow));
                resolve();
            }
        });

        child.on('error', error => {
            console.error(color(`Error: ${error.message}`, colors.red));
            reject(error);
        });
    });
}

// Main application loop
async function main() {
    const rl = createInterface();
    let running = true;

    while (running) {
        displayMainMenu();

        const choice = await askQuestion(rl, color('Enter your choice: ', colors.bright));

        switch(choice) {
            case '1':
                await seoAutomationMenu(rl);
                break;
            case '2':
                await leadGenerationMenu(rl);
                break;
            case '3':
                await marketResearchMenu(rl);
                break;
            case '4':
                await wordpressToolsMenu(rl);
                break;
            case '5':
                await documentationMenu(rl);
                break;
            case '6':
                await systemStatusMenu(rl);
                break;
            case '0':
            case 'exit':
            case 'quit':
                running = false;
                console.log('');
                console.log(color('👋 Goodbye!', colors.cyan));
                console.log('');
                break;
            default:
                console.log(color('\n❌ Invalid choice', colors.red));
                await askQuestion(rl, 'Press Enter to continue...');
        }
    }

    rl.close();
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { main };
