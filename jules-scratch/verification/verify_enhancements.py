import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_enhancements(page: Page):
    """
    This script verifies the major frontend enhancements made to the portfolio.
    1. Checks the enhanced loading animation.
    2. Verifies the profile picture hover effect.
    3. Verifies the social media cards.
    4. Verifies the contact form modal.
    """
    # 1. Navigate to the homepage and verify loader
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")

    # Wait for the loading screen to appear and then disappear
    print("Waiting for loading animation...")
    loading_screen = page.locator("#loading-screen")
    expect(loading_screen).to_be_visible(timeout=2000)
    # The animation is ~6.5s, so we wait for it to be hidden after that.
    # Increased timeout to be safe.
    expect(loading_screen).to_be_hidden(timeout=10000)
    print("Loading animation complete.")

    # 2. Verify Profile Picture hover effect
    print("Verifying profile picture hover effect...")
    profile_pic_container = page.locator("#profile-picture-container")
    profile_pic_container.hover()
    # Wait for particles to appear
    page.wait_for_timeout(500)
    page.screenshot(path="jules-scratch/verification/01_profile_hover.png")
    print("Screenshot of profile hover taken.")

    # 3. Verify Social Media Cards
    print("Verifying social media cards...")
    social_card = page.locator(".social-card").first
    social_card.hover()
    page.wait_for_timeout(300)
    # Take a screenshot of the hero section including the social cards
    hero_section = page.locator("#home .container")
    hero_section.screenshot(path="jules-scratch/verification/02_social_cards.png")
    print("Screenshot of social cards taken.")

    # 4. Verify Contact Form Modal
    print("Navigating to contact page...")
    page.goto("http://localhost:3000/contact.html")

    # Check that the custom cursor is present
    expect(page.locator("#custom-cursor")).to_be_visible()

    print("Filling out contact form...")
    page.get_by_label("First Name").fill("Jules")
    page.get_by_label("Last Name").fill("The Agent")
    page.get_by_label("Email Address").fill("jules@agent.ai")
    page.get_by_label("Subject").fill("Verification Test")
    page.get_by_label("Message").fill("This is a test to verify the modal functionality.")

    page.get_by_role("button", name="Send Message").click()

    print("Waiting for contact form modal...")
    modal = page.locator(".modal-overlay")
    expect(modal).to_be_visible(timeout=3000)
    expect(modal.get_by_text("Message Sent")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/03_contact_modal.png")
    print("Screenshot of contact modal taken.")

    modal.get_by_role("button", name="×").click()
    expect(modal).to_be_hidden()
    print("Verification script completed successfully.")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_enhancements(page)
        browser.close()

if __name__ == "__main__":
    main()
