const { test, expect } = require('@playwright/test');

const pages = [
  '/',
  '/about.html',
  '/projects.html',
  '/skills.html',
  '/blog.html',
  '/gallery.html',
  '/games.html',
  '/ar.html',
  '/marketplace.html',
  '/resume.html',
  '/contact.html',
  '/404.html',
  '/admin.html',
  '/offline.html',
  '/experiments.html',
  '/now.html'
];

test.describe('MA_Dev Portfolio Tests', () => {
  for (const pageUrl of pages) {
    test(`Page ${pageUrl} loads without errors`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', err => errors.push(err.message)); // capture just the message string

      const response = await page.goto(`http://localhost:3000${pageUrl}`);
      expect(response.status()).toBe(200);

      expect(errors).toEqual([]);
    });
  }

  test('Konami code triggers MatrixRain', async ({ page }) => {
     await page.goto('http://localhost:3000/');
     await page.keyboard.press('ArrowUp');
     await page.keyboard.press('ArrowUp');
     await page.keyboard.press('ArrowDown');
     await page.keyboard.press('ArrowDown');
     await page.keyboard.press('ArrowLeft');
     await page.keyboard.press('ArrowRight');
     await page.keyboard.press('ArrowLeft');
     await page.keyboard.press('ArrowRight');
     await page.keyboard.press('b');
     await page.keyboard.press('a');

     // Wait for the dual signal toast
     const toast = page.locator('.toast.toast--error');
     await expect(toast).toBeVisible();
     await expect(toast).toHaveText('⚠ DUAL SIGNAL PROTOCOL ACTIVATED');
  });
});
