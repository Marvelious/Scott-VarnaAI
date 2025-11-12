#!/usr/bin/env node

/**
 * ABOUTME: Interactive documentation browser for SeoAgent folder
 * ABOUTME: Read individual files, all files in sequence, search, and export documentation
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Documentation files in SeoAgent folder
const DOCS_FOLDER = __dirname;

// ANSI color codes for better output
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

// Get all markdown files in SeoAgent folder
function getDocumentationFiles() {
    const files = fs.readdirSync(DOCS_FOLDER);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    return mdFiles.map(filename => {
        const filepath = path.join(DOCS_FOLDER, filename);
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(1);

        return {
            filename,
            filepath,
            size: stats.size,
            sizeKB,
            description: getFileDescription(filename)
        };
    }).sort((a, b) => {
        // Sort by priority (START_HERE first, then alphabetically)
        if (a.filename === 'START_HERE.md') return -1;
        if (b.filename === 'START_HERE.md') return 1;
        return a.filename.localeCompare(b.filename);
    });
}

// Get description for each documentation file
function getFileDescription(filename) {
    const descriptions = {
        'START_HERE.md': 'Quick start guide and overview',
        'README.md': 'General README',
        'AUTOMATION_README.md': 'Complete SEO automation usage guide',
        'WEBSCRAP_INTEGRATION_README.md': 'Lead Generation + Market Research guide',
        'IMPROVEMENTS_REPORT.md': 'SeoAgent folder improvement recommendations',
        'PROJECT_ANALYSIS.md': 'SEO Agent app bug analysis',
        'QUICK_FIX_GUIDE.md': 'Troubleshooting and quick fixes'
    };

    return descriptions[filename] || 'Documentation file';
}

// Create readline interface for user input
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// Display main menu
function displayMenu(files) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('📚 SEOAGENT DOCUMENTATION READER', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    console.log(color('Available Documentation:', colors.bright));
    console.log('');

    files.forEach((file, index) => {
        const num = color(`${index + 1}.`, colors.yellow);
        const name = color(file.filename, colors.green);
        const size = color(`(${file.sizeKB} KB)`, colors.dim);
        const desc = color(`- ${file.description}`, colors.dim);
        console.log(`${num} ${name} ${size} ${desc}`);
    });

    console.log('');
    console.log(color('Actions:', colors.bright));
    console.log('');
    console.log(color('a.', colors.yellow) + ' Read ALL files in sequence');
    console.log(color('s.', colors.yellow) + ' Search across all documentation');
    console.log(color('e.', colors.yellow) + ' Export all documentation to single file');
    console.log(color('q.', colors.yellow) + ' Generate quick reference card');
    console.log(color('0.', colors.yellow) + ' Exit');
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));
}

// Read and display a single file
function displayFile(file) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color(`📄 ${file.filename}`, colors.bright + colors.cyan));
    console.log(color(`Size: ${file.sizeKB} KB`, colors.dim));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    const content = fs.readFileSync(file.filepath, 'utf-8');
    console.log(content);

    console.log('');
    console.log(color('─'.repeat(70), colors.dim));
    console.log('');
}

// Read all files in sequence
async function readAllFiles(files, rl) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('📚 READING ALL DOCUMENTATION IN SEQUENCE', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');
    console.log(color(`Total files: ${files.length}`, colors.dim));
    console.log('');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        console.log(color(`\n[${ i + 1}/${files.length}] Reading: ${file.filename}`, colors.bright + colors.yellow));
        console.log(color('─'.repeat(70), colors.dim));
        console.log('');

        const content = fs.readFileSync(file.filepath, 'utf-8');
        console.log(content);

        console.log('');
        console.log(color('─'.repeat(70), colors.dim));

        if (i < files.length - 1) {
            await new Promise(resolve => {
                rl.question(color('\nPress Enter to continue to next file...', colors.yellow), () => {
                    resolve();
                });
            });
            console.clear();
        }
    }

    console.log('');
    console.log(color('✅ All documentation read!', colors.green));
    console.log('');
}

// Search across all documentation
function searchDocumentation(files, searchTerm) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color(`🔍 SEARCH RESULTS FOR: "${searchTerm}"`, colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    let totalMatches = 0;

    files.forEach(file => {
        const content = fs.readFileSync(file.filepath, 'utf-8');
        const lines = content.split('\n');
        const matches = [];

        lines.forEach((line, lineNum) => {
            if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
                matches.push({ lineNum: lineNum + 1, line: line.trim() });
            }
        });

        if (matches.length > 0) {
            console.log(color(`📄 ${file.filename}`, colors.green) + color(` (${matches.length} matches)`, colors.dim));
            console.log('');

            matches.slice(0, 5).forEach(match => {
                console.log(color(`  Line ${match.lineNum}:`, colors.yellow) + ` ${match.line}`);
            });

            if (matches.length > 5) {
                console.log(color(`  ... and ${matches.length - 5} more matches`, colors.dim));
            }

            console.log('');
            totalMatches += matches.length;
        }
    });

    if (totalMatches === 0) {
        console.log(color('No matches found.', colors.red));
    } else {
        console.log(color(`\nTotal: ${totalMatches} matches across ${files.filter(f => {
            const content = fs.readFileSync(f.filepath, 'utf-8');
            return content.toLowerCase().includes(searchTerm.toLowerCase());
        }).length} files`, colors.bright));
    }

    console.log('');
    console.log(color('─'.repeat(70), colors.dim));
    console.log('');
}

// Export all documentation to single file
function exportAllDocumentation(files) {
    const timestamp = Date.now();
    const outputFile = path.join(DOCS_FOLDER, `all-documentation-${timestamp}.md`);

    let combinedContent = '# SeoAgent - Complete Documentation\n\n';
    combinedContent += `**Generated**: ${new Date().toISOString()}\n`;
    combinedContent += `**Files**: ${files.length}\n\n`;
    combinedContent += '---\n\n';

    files.forEach(file => {
        combinedContent += `# ${file.filename}\n\n`;
        combinedContent += `**Size**: ${file.sizeKB} KB\n`;
        combinedContent += `**Description**: ${file.description}\n\n`;
        combinedContent += '---\n\n';

        const content = fs.readFileSync(file.filepath, 'utf-8');
        combinedContent += content;
        combinedContent += '\n\n---\n\n';
    });

    fs.writeFileSync(outputFile, combinedContent);

    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('✅ ALL DOCUMENTATION EXPORTED', colors.bright + colors.green));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');
    console.log(`Output file: ${color(path.basename(outputFile), colors.yellow)}`);
    console.log(`Location: ${color(DOCS_FOLDER, colors.dim)}`);
    console.log(`Size: ${color((fs.statSync(outputFile).size / 1024).toFixed(1) + ' KB', colors.dim)}`);
    console.log('');
    console.log(color('─'.repeat(70), colors.dim));
    console.log('');
}

// Generate quick reference card
function generateQuickReference(files) {
    console.clear();
    console.log(color('═'.repeat(70), colors.cyan));
    console.log(color('📋 SEOAGENT QUICK REFERENCE CARD', colors.bright + colors.cyan));
    console.log(color('═'.repeat(70), colors.cyan));
    console.log('');

    console.log(color('🚀 GETTING STARTED', colors.bright + colors.green));
    console.log('');
    console.log('cd D:\\VarnaAI\\Websites\\SeoAgent');
    console.log('node seoagent-menu.js          ' + color('# Interactive menu', colors.dim));
    console.log('node docs-reader.js            ' + color('# This documentation reader', colors.dim));
    console.log('');

    console.log(color('🔍 SEO AUTOMATION', colors.bright + colors.green));
    console.log('');
    console.log('node automate-seo-analysis.js analyze <url>');
    console.log('node automate-seo-analysis.js keywords "topic" de');
    console.log('node wordpress-seo-helper.js analyze <url> <keyword>');
    console.log('');

    console.log(color('👥 LEAD GENERATION (Requires Webscrap)', colors.bright + colors.green));
    console.log('');
    console.log('node lead-generation-automation.js german "IT Services" "Bayern" 20');
    console.log('node lead-generation-automation.js bulgarian "IT Services" "Varna" 15');
    console.log('node lead-generation-automation.js pipeline');
    console.log('');

    console.log(color('📊 MARKET RESEARCH (Requires Webscrap)', colors.bright + colors.green));
    console.log('');
    console.log('node market-research-automation.js german "IT Services" "Bayern"');
    console.log('node market-research-automation.js trending germany "IT Services"');
    console.log('node market-research-automation.js report germany "Enterprise Software" "Bayern"');
    console.log('');

    console.log(color('📚 DOCUMENTATION FILES', colors.bright + colors.green));
    console.log('');
    files.slice(0, 5).forEach(file => {
        console.log(`${color(file.filename, colors.yellow).padEnd(45)} ${color(file.description, colors.dim)}`);
    });
    console.log('');

    console.log(color('⚠️ PREREQUISITES', colors.bright + colors.yellow));
    console.log('');
    console.log('SEO Agent:  cd D:\\VarnaAI\\seoagent\\backend && npm run dev');
    console.log('Webscrap:   cd D:\\VarnaAI\\Webscrap && python main.py');
    console.log('');

    console.log(color('─'.repeat(70), colors.dim));
    console.log('');
}

// Main application loop
async function main() {
    const files = getDocumentationFiles();
    const rl = createInterface();

    let running = true;

    while (running) {
        displayMenu(files);

        const choice = await new Promise(resolve => {
            rl.question(color('Enter your choice: ', colors.bright), answer => {
                resolve(answer.trim().toLowerCase());
            });
        });

        if (choice === '0' || choice === 'exit' || choice === 'quit') {
            running = false;
            console.log('');
            console.log(color('👋 Goodbye!', colors.cyan));
            console.log('');
        } else if (choice === 'a' || choice === 'all') {
            await readAllFiles(files, rl);
            await new Promise(resolve => {
                rl.question(color('\nPress Enter to return to menu...', colors.yellow), () => {
                    resolve();
                });
            });
        } else if (choice === 's' || choice === 'search') {
            const searchTerm = await new Promise(resolve => {
                rl.question(color('\nEnter search term: ', colors.bright), answer => {
                    resolve(answer.trim());
                });
            });

            if (searchTerm) {
                searchDocumentation(files, searchTerm);
                await new Promise(resolve => {
                    rl.question(color('\nPress Enter to return to menu...', colors.yellow), () => {
                        resolve();
                    });
                });
            }
        } else if (choice === 'e' || choice === 'export') {
            exportAllDocumentation(files);
            await new Promise(resolve => {
                rl.question(color('\nPress Enter to return to menu...', colors.yellow), () => {
                    resolve();
                });
            });
        } else if (choice === 'q' || choice === 'quick') {
            generateQuickReference(files);
            await new Promise(resolve => {
                rl.question(color('\nPress Enter to return to menu...', colors.yellow), () => {
                    resolve();
                });
            });
        } else {
            const fileIndex = parseInt(choice) - 1;
            if (fileIndex >= 0 && fileIndex < files.length) {
                displayFile(files[fileIndex]);
                await new Promise(resolve => {
                    rl.question(color('\nPress Enter to return to menu...', colors.yellow), () => {
                        resolve();
                    });
                });
            } else {
                console.log(color('\n❌ Invalid choice. Press Enter to try again...', colors.red));
                await new Promise(resolve => {
                    rl.question('', () => {
                        resolve();
                    });
                });
            }
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

module.exports = {
    getDocumentationFiles,
    searchDocumentation,
    exportAllDocumentation
};
