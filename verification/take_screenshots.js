
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to a desktop size
  await page.setViewportSize({ width: 1280, height: 720 });

  // 1. Verify Index
  // Adjust path relative to where the script is run. Assuming run from repo root.
  let filePath = path.resolve(process.cwd(), 'index.html');
  let fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);
  // Wait longer for Three.js and animations
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/jules/verification/index.png' });
  console.log('Index screenshot taken');

  // 2. Verify Games
  filePath = path.resolve(process.cwd(), 'games.html');
  fileUrl = `file://${filePath}`;
  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/jules/verification/games.png' });
  console.log('Games screenshot taken');

  // 3. Verify Projects
  filePath = path.resolve(process.cwd(), 'projects.html');
  fileUrl = `file://${filePath}`;
  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/jules/verification/projects.png' });
  console.log('Projects screenshot taken');

  // 4. Verify Blog
  filePath = path.resolve(process.cwd(), 'blog.html');
  fileUrl = `file://${filePath}`;
  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/jules/verification/blog.png' });
  console.log('Blog screenshot taken');

  await browser.close();
})();
