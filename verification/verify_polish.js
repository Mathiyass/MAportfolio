
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let filePath = path.resolve(process.cwd(), 'index.html');
  let fileUrl = `file://${filePath}`;

  await page.goto(fileUrl);

  // Verify Arcade Link
  const arcadeLink = await page.getByRole('link', { name: 'Arcade' }).first();
  if (await arcadeLink.isVisible()) {
      console.log("Arcade link is visible in navigation.");
  } else {
      console.error("Arcade link is NOT visible.");
      process.exit(1);
  }

  // Go to Games Page
  filePath = path.resolve(process.cwd(), 'games.html');
  fileUrl = `file://${filePath}`;
  await page.goto(fileUrl);

  // Verify Typing Game
  const typingGame = await page.$('#typing-input');
  if (typingGame) {
      console.log("Typing game input found.");
  } else {
      console.error("Typing game input NOT found.");
      process.exit(1);
  }

  await browser.close();
})();
