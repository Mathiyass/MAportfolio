document.addEventListener('DOMContentLoaded', () => {
    const GAMIFICATION_STORAGE_KEY = 'portfolioAchievements';
    let achievements = JSON.parse(localStorage.getItem(GAMIFICATION_STORAGE_KEY)) || {};

    function saveAchievements() {
        localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(achievements));
    }

    function unlockAchievement(id, message) {
        if (!achievements[id]) {
            achievements[id] = true;
            saveAchievements();

            // Use the main.js notification function if it exists
            if (typeof showNotification === 'function') {
                showNotification(message, 'success');
            } else {
                alert(message);
            }
            applyUnlocks();
        }
    }

    function applyUnlocks() {
        if (achievements.unlockedRedTheme) {
            document.body.classList.add('theme-red');
        }
        // Future unlocks can be applied here
    }

    // --- Easter Egg 1: Footer Logo Click ---
    let logoClickCount = 0;
    const footerLogo = document.querySelector('footer .gradient-text');
    if (footerLogo) {
        footerLogo.style.cursor = 'pointer'; // Make it obvious it's clickable
        footerLogo.addEventListener('click', () => {
            logoClickCount++;
            if (logoClickCount === 5) {
                 if (typeof showNotification === 'function') {
                    showNotification('...something is happening...', 'info');
                }
            }
            if (logoClickCount >= 10) {
                unlockAchievement('unlockedRedTheme', 'Achievement Unlocked: Red Theme!');
            }
        });
    }

    // Apply any previously unlocked achievements on page load
    applyUnlocks();
});
