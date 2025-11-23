
from playwright.sync_api import sync_playwright, expect
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # 1. Verify Games Page (Memory Game)
        print("Verifying Games Page...")
        page.goto("http://localhost:3000/games.html")

        # Wait for Memory Game Card
        memory_card = page.locator("h2:text('System Hack')")
        expect(memory_card).to_be_visible()

        # Wait for Memory Board
        memory_board = page.locator("#memory-board")
        expect(memory_board).to_be_visible()

        # Take Screenshot of Games Page
        page.screenshot(path="verification/games_page.png", full_page=True)
        print("Games Page Verified.")

        # 2. Verify Blog Page (Dynamic Content)
        print("Verifying Blog Page...")
        page.goto("http://localhost:3000/blog.html")

        # Wait for Search Bar
        search_bar = page.locator("#blog-search")
        expect(search_bar).to_be_visible()

        # Wait for dynamic posts to load
        # Assuming we have a post title "The Future of AI in Web Development"
        first_post = page.locator("text=The Future of AI in Web Development")
        expect(first_post).to_be_visible()

        # Take Screenshot of Blog Page
        page.screenshot(path="verification/blog_page.png", full_page=True)
        print("Blog Page Verified.")

        browser.close()

if __name__ == "__main__":
    try:
        verify_frontend()
        print("Frontend Verification Successful.")
    except Exception as e:
        print(f"Frontend Verification Failed: {e}")
        exit(1)
