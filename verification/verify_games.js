
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Construct the file URL for games.html
  const filePath = path.resolve(__dirname, '../games.html');
  const fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);

  try {
    await page.goto(fileUrl);

    // Check title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    if (!title.includes('Arcade')) {
      throw new Error('Title does not contain "Arcade"');
    }

    // Check for canvas
    const canvas = await page.$('#snakeCanvas');
    if (!canvas) throw new Error('Snake canvas not found');
    console.log('Snake canvas found');

    // Check for start button
    const startBtn = await page.$('#start-snake-btn');
    if (!startBtn) throw new Error('Start button not found');
    console.log('Start button found');

    // Check Tic Tac Toe
    const board = await page.$('#tictactoe-board');
    if (!board) throw new Error('Tic Tac Toe board not found');
    console.log('Tic Tac Toe board found');

    // Take a screenshot
    await page.screenshot({ path: 'verification/games_screenshot.png' });
    console.log('Screenshot saved to verification/games_screenshot.png');

    console.log('Verification successful!');

  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
