
import asyncio
from playwright.async_api import async_playwright

async def verify_cursor_z_index():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Load the page via localhost to ensure scripts run correctly
        await page.goto('http://localhost:3000/index.html')

        try:
            # Wait for the overlay to appear
            # The overlay is created dynamically.
            print("Waiting for overlay...")
            overlay = await page.wait_for_selector('#start-overlay', state='attached', timeout=15000)
            print("Overlay found.")

            # Check z-index of overlay
            overlay_z = await overlay.evaluate("el => getComputedStyle(el).zIndex")
            print(f"Overlay z-index: {overlay_z}")

            # Ensure custom cursor elements exist (inject them if missing for test, but they should be there)
            # Inspecting if they are present
            print("Waiting for custom cursor...")
            # Note: The custom cursor might be created by JS.
            # If not found, we might need to check if the JS creating them is running.

            # Wait a bit for JS to initialize
            await page.wait_for_timeout(2000)

            # Check if elements exist, if not, print body to see what's there
            if await page.locator('.custom-cursor').count() == 0:
                print("Custom cursor not found in DOM. Checking if we need to move mouse to trigger creation.")
                await page.mouse.move(100, 100)
                await page.wait_for_timeout(1000)

            custom_cursor = await page.wait_for_selector('.custom-cursor', state='attached', timeout=5000)
            cursor_dot = await page.wait_for_selector('.cursor-dot', state='attached', timeout=5000)

            if custom_cursor and cursor_dot:
                cc_z = await custom_cursor.evaluate("el => getComputedStyle(el).zIndex")
                cd_z = await cursor_dot.evaluate("el => getComputedStyle(el).zIndex")

                print(f"Custom Cursor z-index: {cc_z}")
                print(f"Cursor Dot z-index: {cd_z}")

                if int(cc_z) > int(overlay_z) and int(cd_z) > int(overlay_z):
                    print("SUCCESS: Cursor is above overlay.")
                else:
                    print("FAILURE: Cursor is NOT above overlay.")

        except Exception as e:
            print(f"Error during verification: {e}")
            await page.screenshot(path='verification/debug_cursor_fail.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_cursor_z_index())
