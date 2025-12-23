#!/usr/bin/env node

/**
 * Manual Blog Publishing via Playwright
 *
 * Simple workflow:
 * 1. Open WordPress admin
 * 2. Create new post
 * 3. Fill title and content manually
 * 4. Set focus keyword in Rank Math
 * 5. Publish
 */

const { chromium } = require('playwright');
const fs = require('fs');

const SITE = {
  domain: 'aimarketingbg.com',
  wpAdminUser: 'BigDick',
  wpAdminPass: 'QJ50uT$ZFdY%vldvV@)!dV6c'
};

const BLOG_POST = {
  file: 'D:/VarnaAI/Websites/blogs/archive/2025-12-02/aimarketingbg/AIMarketingBG_Marketing_Mix_Modeling_2025.md',
  title: 'Marketing Mix Modeling 2025: Game-Changing AI Integration with MTA',
  focusKeyword: 'marketing mix modeling 2025'
};

async function main() {
  console.log('🌐 Opening browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login
    console.log('🔐 Logging into WordPress...');
    await page.goto(`https://${SITE.domain}/wp-login.php`);
    await page.fill('#user_login', SITE.wpAdminUser);
    await page.fill('#user_pass', SITE.wpAdminPass);
    await page.click('#wp-submit');
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in');

    // Create new post
    console.log('\n📝 Creating new post...');
    await page.goto(`https://${SITE.domain}/wp-admin/post-new.php`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Fill title
    console.log('📄 Filling title...');
    const titleInput = page.getByRole('textbox', { name: 'Add title' });
    await titleInput.fill(BLOG_POST.title);
    console.log(`✅ Title: ${BLOG_POST.title}`);

    // Read blog post content
    console.log('\n📖 Reading blog post file...');
    const fileContent = fs.readFileSync(BLOG_POST.file, 'utf8');

    // Extract WordPress content (everything between ## BLOG CONTENT and _Generated:)
    const contentMatch = fileContent.match(/## BLOG CONTENT\s+([\s\S]*?)(?=\n---\n|_Generated:)/);
    const content = contentMatch ? contentMatch[1].trim() : '';

    console.log(`   Content length: ${content.length} characters`);

    if (!content || content.length < 100) {
      console.error('❌ Could not extract content from file');
      return;
    }

    // Fill content (click in editor and paste)
    console.log('📝 Filling content...');

    // Click in the editor
    const editorArea = page.locator('.block-editor-writing-flow').first();
    await editorArea.click();
    await page.waitForTimeout(1000);

    // Press Ctrl+V won't work - need to use Code Editor mode
    console.log('🔄 Switching to Code Editor mode...');

    // Click options menu (three dots)
    await page.click('button[aria-label="Options"]');
    await page.waitForTimeout(500);

    // Click "Code editor"
    await page.click('button:has-text("Code editor")');
    await page.waitForTimeout(2000);

    // Find the code editor textarea
    const codeEditor = page.locator('textarea.editor-post-text-editor').first();
    await codeEditor.fill(content);
    console.log('✅ Content filled');

    // Switch back to Visual editor
    console.log('🔄 Switching back to Visual Editor...');
    await page.click('button[aria-label="Options"]');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Visual editor")');
    await page.waitForTimeout(3000);

    // Open Rank Math panel
    console.log('\n🎯 Opening Rank Math SEO panel...');
    await page.click('button:has-text("Rank Math")');
    await page.waitForTimeout(1000);

    // Fill focus keyword
    console.log(`🔑 Filling focus keyword: "${BLOG_POST.focusKeyword}"`);
    const keywordInput = page.locator('input[placeholder*="Focus Keyword"]').first();
    await keywordInput.fill(BLOG_POST.focusKeyword);
    await keywordInput.press('Enter');
    await page.waitForTimeout(5000);
    console.log('✅ Focus keyword set');

    // Try to read SEO score
    try {
      const scoreText = await page.locator('text=/\\d+\\s*\\/\\s*100/').first().textContent({ timeout: 3000 });
      console.log(`📊 SEO Score: ${scoreText.trim()}`);
    } catch (e) {
      console.log('⚠️  Could not read SEO score');
    }

    // Publish
    console.log('\n🚀 Publishing post...');
    const publishButton = page.locator('button.editor-post-publish-button__button').first();
    await publishButton.click();
    await page.waitForTimeout(1000);

    const confirmButton = page.locator('button.editor-post-publish-button__button:has-text("Publish")').first();
    await confirmButton.click();
    await page.waitForTimeout(5000);

    console.log('✅ Post published!');

    // Get URL
    try {
      const viewLink = await page.locator('a:has-text("View Post")').first().getAttribute('href', { timeout: 3000 });
      console.log(`\n🔗 Published URL: ${viewLink}`);
    } catch (e) {
      console.log('\n🔗 Check WordPress admin for published post');
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    throw error;
  } finally {
    console.log('\n🛑 Closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

main().catch(console.error);
