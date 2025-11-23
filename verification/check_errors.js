
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let filePath = path.resolve(process.cwd(), 'index.html');
  let fileUrl = `file://${filePath}`;

  await page.goto(fileUrl);

  // Check for console errors
  page.on('console', msg => {
      if (msg.type() === 'error') {
          console.error(`PAGE ERROR: ${msg.text()}`);
          if (msg.text().includes('ReferenceError')) {
              process.exit(1);
          }
      }
  });

  // Wait for a bit to see if any init errors pop up
  await page.waitForTimeout(2000);

  console.log("No ReferenceErrors detected during initialization.");
  await browser.close();
})();
