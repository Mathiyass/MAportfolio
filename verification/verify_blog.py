from playwright.sync_api import sync_playwright

def verify_blog():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the blog page
        page.goto('http://localhost:8000/blog.html')

        # Wait for posts to load (simulate network delay)
        page.wait_for_selector('article', state='visible', timeout=5000)

        # Take a screenshot
        page.screenshot(path='verification/blog_page_v2.png', full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_blog()
