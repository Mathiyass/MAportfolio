import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_dynamic_content(page: Page):
    """
    This script verifies that the dynamic content loading and admin panel are working.
    """
    # 1. Navigate to the homepage and check for dynamic content.
    page.goto("http://localhost:3000")

    # Check for the hero name from database.json
    hero_name_locator = page.locator("#hero-name")
    expect(hero_name_locator).to_have_text("MATHIYA")
    print("Homepage dynamic content verified.")

    # 2. Navigate to the admin panel and log in.
    page.goto("http://localhost:3000/admin.html")

    password_input = page.locator("#admin-password")
    expect(password_input).to_be_visible()

    # Password from README.md
    password_input.fill("Aspirinmss@Mathiya@20021225")
    page.get_by_role("button", name="Access Admin Panel").click()
    print("Logged into admin panel.")

    # 3. Verify the admin dashboard.
    dashboard_locator = page.locator("#admin-dashboard")
    expect(dashboard_locator).to_be_visible(timeout=5000)

    # Check that the project count is correct (should be 6 from database.json)
    project_count_locator = page.locator("#overview-section p.text-cyber-cyan")
    expect(project_count_locator).to_have_text("6")
    print("Admin dashboard data verified.")

    # 4. Take a screenshot.
    page.screenshot(path="jules-scratch/verification/admin_panel.png")
    print("Screenshot taken.")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_dynamic_content(page)
        browser.close()

if __name__ == "__main__":
    main()
