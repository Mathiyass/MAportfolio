from playwright.sync_api import sync_playwright, expect

def verify_overlay():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:3000")

        print("Waiting for loader to finish...")
        # The loader takes some time, we wait for the overlay to appear
        # The overlay has id 'start-overlay' and contains text '> AWAITING USER INPUT...'

        # Wait for the overlay to be attached and visible.
        # Note: The loader animation takes a while (progress 0 to 100).
        # We can increase timeout.
        try:
            expect(page.locator("#start-overlay")).to_be_visible(timeout=60000)
            print("Overlay appeared!")
        except Exception as e:
            print(f"Overlay did not appear in time: {e}")
            # Take screenshot for debug
            page.screenshot(path="verification/debug_loader.png")
            browser.close()
            return

        # Verify text and button
        expect(page.get_by_text("> AWAITING USER INPUT...")).to_be_visible()
        expect(page.locator("#init-system-btn")).to_be_visible()
        expect(page.locator("#init-system-btn")).to_have_text("INITIALIZE SYSTEM")

        # Take screenshot of the overlay
        page.screenshot(path="verification/overlay_visible.png")
        print("Screenshot taken: overlay_visible.png")

        # Click the button
        print("Clicking Initialize System button...")
        page.locator("#init-system-btn").click()

        # Wait for overlay to disappear
        expect(page.locator("#start-overlay")).not_to_be_visible(timeout=5000)
        print("Overlay disappeared!")

        # Verify main content is visible (e.g., "Hello, I'm MATHIYA")
        expect(page.get_by_text("Hello, I'm")).to_be_visible()

        # Take screenshot of main content
        page.screenshot(path="verification/main_content.png")
        print("Screenshot taken: main_content.png")

        browser.close()

if __name__ == "__main__":
    verify_overlay()
