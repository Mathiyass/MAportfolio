
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Verify Blog Page
  let filePath = path.resolve(__dirname, '../blog.html');
  let fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);

  try {
    await page.goto(fileUrl);

    // Check title
    let title = await page.title();
    console.log(`Blog title: ${title}`);
    if (!title.includes('Blog')) {
      throw new Error('Blog title does not contain "Blog"');
    }

    // Check articles
    const articles = await page.$$('article');
    console.log(`Found ${articles.length} articles`);
    if (articles.length === 0) throw new Error('No articles found');

  } catch (error) {
    console.error('Blog verification failed:', error);
    process.exit(1);
  }

  // 2. Verify Projects Page
  filePath = path.resolve(__dirname, '../projects.html');
  fileUrl = `file://${filePath}`;

  console.log(`Navigating to: ${fileUrl}`);

  try {
    await page.goto(fileUrl);

    // Check title
    const title = await page.title();
    console.log(`Projects title: ${title}`);
    if (!title.includes('Projects')) {
      throw new Error('Projects title does not contain "Projects"');
    }

    // Check project cards
    const projects = await page.$$('.project-card');
    console.log(`Found ${projects.length} project cards`);
    if (projects.length === 0) throw new Error('No project cards found');

    // Check filtering
    const webFilter = await page.$('button[data-filter="web"]');
    if (webFilter) {
        await webFilter.click();
        console.log('Clicked Web Dev filter');
        // Wait a bit for animation/filtering
        await page.waitForTimeout(500);

        // Verify only web projects are visible (simplified check)
        const visibleProjects = await page.$$eval('.project-card', cards => {
            return cards.filter(card => card.style.display !== 'none').length;
        });
        console.log(`Visible projects after filter: ${visibleProjects}`);
        // This number depends on how many web projects are in the mock HTML.
    }

  } catch (error) {
    console.error('Projects verification failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }

  console.log('Content verification successful!');
})();
