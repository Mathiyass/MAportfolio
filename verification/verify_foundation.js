
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Construct the file URL for index.html
  const filePath = path.resolve(__dirname, '../index.html');
  const fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);

  try {
    await page.goto(fileUrl);

    // Check title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    if (!title.includes('Mathiya')) {
      throw new Error('Title does not contain "Mathiya"');
    }

    // Check for main elements
    const heroSection = await page.$('#home');
    if (!heroSection) throw new Error('Hero section not found');
    console.log('Hero section found');

    const navbar = await page.$('#navbar');
    if (!navbar) throw new Error('Navbar not found');
    console.log('Navbar found');

    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`PAGE ERROR: ${msg.text()}`);
      }
    });

    // Check mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    console.log('Switched to mobile viewport');

    const mobileMenuBtn = await page.$('#mobile-menu-btn');
    if (!mobileMenuBtn) throw new Error('Mobile menu button not found');
    if (await mobileMenuBtn.isVisible()) {
        console.log('Mobile menu button is visible');
    } else {
        throw new Error('Mobile menu button is NOT visible in mobile view');
    }

    // Click mobile menu
    await mobileMenuBtn.click();
    const mobileMenu = await page.$('#mobile-menu');
    // Wait for animation class or style change if needed, but for now just check existence
    if (!mobileMenu) throw new Error('Mobile menu container not found');

    // Take a screenshot
    await page.screenshot({ path: 'verification/screenshot.png' });
    console.log('Screenshot saved to verification/screenshot.png');

    console.log('Verification successful!');

  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
