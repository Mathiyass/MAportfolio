/**
 * ========================================================
 * MTHISHA PORTFOLIO - V2 ADMIN UI BINDING
 * admin-ui.js
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Only run if AppDB exists
    if (!window.AppDB) return;

    const db = window.AppDB;
    const stats = db.getStats();

    // Bind basic stats if on dashboard
    bindStat('[data-stat="uptime"]', stats.uptime);
    bindStat('[data-stat="views"]', stats.views.toLocaleString());
    bindStat('[data-stat="status"]', stats.systemStatus);

    // Initial setup listener for db updates
    window.addEventListener('mthishaDBUpdated', () => {
        console.log('Mthisha OS System Data updated.');
        // Re-bind or refresh graphs
    });
});

function bindStat(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerText = value;
}
