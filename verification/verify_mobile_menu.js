
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to a mobile size
  await page.setViewportSize({ width: 375, height: 812 });

  // 1. Verify Index
  let filePath = path.resolve(process.cwd(), 'index.html');
  let fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);

  // Check if mobile menu button exists
  const mobileMenuBtn = await page.$('#mobile-menu-btn');
  if (!mobileMenuBtn) {
      console.error("Mobile menu button not found!");
      process.exit(1);
  }

  // Click it
  console.log("Clicking mobile menu button...");
  await mobileMenuBtn.click();

  // Wait for menu to open (class 'active')
  await page.waitForTimeout(500);

  const mobileMenu = await page.$('#mobile-menu');
  const classNames = await mobileMenu.getAttribute('class');

  if (classNames.includes('active')) {
      console.log("Mobile menu is active!");
  } else {
      console.error("Mobile menu did not activate!");
      console.log("Classes:", classNames);
      process.exit(1);
  }

  await browser.close();
  console.log("Mobile menu verification passed.");
})();
