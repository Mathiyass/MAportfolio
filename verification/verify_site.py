from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Use localhost instead of file://
        base_url = "http://localhost:8000"

        print(f"Navigating to {base_url}/index.html")
        page.goto(f"{base_url}/index.html")

        # Wait for the main content to load
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/home_page.png")
        print("Home page screenshot taken.")

        # Navigate to Games page
        print(f"Navigating to {base_url}/games.html")
        page.goto(f"{base_url}/games.html")
        page.wait_for_timeout(2000) # Wait slightly longer for modules
        page.screenshot(path="verification/games_page.png")
        print("Games page screenshot taken.")

        # Click on "Snake" play button to open modal
        try:
            print("Attempting to click Snake Play button...")
            # Using the specific onclick selector or text
            button = page.locator("button:has-text('PLAY NOW')").first
            if button.is_visible():
                button.click()
                print("Clicked Play button.")
                page.wait_for_timeout(2000) # Wait for modal animation
                page.screenshot(path="verification/snake_modal.png")
                print("Snake modal screenshot taken.")
            else:
                print("Play button not visible.")
        except Exception as e:
            print(f"Failed to capture snake modal: {e}")

        # Navigate to Blog page
        print(f"Navigating to {base_url}/blog.html")
        page.goto(f"{base_url}/blog.html")
        page.wait_for_timeout(3000) # Wait for "fetch" simulation (500ms) + render
        page.screenshot(path="verification/blog_page.png")
        print("Blog page screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
