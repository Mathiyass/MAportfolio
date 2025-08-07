from playwright.sync_api import sync_playwright, Page, expect

def debug_loader(page: Page):
    """
    A minimal script to debug the loading screen.
    It only navigates to the homepage and waits for the loader to disappear.
    """
    print("Navigating to homepage...")
    page.goto("http://localhost:3000", timeout=10000)

    print("Waiting for loading screen to be visible...")
    loading_screen = page.locator("#loading-screen")
    expect(loading_screen).to_be_visible(timeout=5000)
    print("Loading screen is visible.")

    print("Waiting for loading screen to be hidden...")
    # The animation is ~6.5s, plus fadeout. Let's give it a generous timeout.
    expect(loading_screen).to_be_hidden(timeout=10000)
    print("Loading screen successfully hidden.")

    page.screenshot(path="jules-scratch/verification/loader_disappeared.png")
    print("Verification successful.")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        debug_loader(page)
        browser.close()

if __name__ == "__main__":
    main()
