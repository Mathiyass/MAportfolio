document.addEventListener('DOMContentLoaded', () => {

    function initializePageScripts() {
        // This function re-initializes scripts for the new page content
        console.log('Initializing scripts for new page...');

        // IMPORTANT: Re-run the renderer for the new content
        if (typeof loadContent === 'function') {
            loadContent();
        } else {
            console.error("loadContent function not found. Make sure renderer.js is loaded before router.js");
        }

        if (typeof initializeEnhancedCursor === 'function') initializeEnhancedCursor();
        if (typeof initializeAdvancedNavigation === 'function') initializeAdvancedNavigation();
        if (typeof initializeEnhancedAnimations === 'function') initializeEnhancedAnimations();
        if (typeof initializeAdvancedTheme === 'function') initializeAdvancedTheme();
        if (typeof initializeEnhancedScrollEffects === 'function') initializeEnhancedScrollEffects();
        if (typeof initializeAdvancedTypingEffect === 'function') initializeAdvancedTypingEffect();
        if (typeof initializeEnhancedForms === 'function') initializeEnhancedForms();
        if (typeof initializeAdvancedInteractiveElements === 'function') initializeAdvancedInteractiveElements();
        if (typeof initializePerformanceOptimization === 'function') initializePerformanceOptimization();
        if (typeof initializeAccessibilityFeatures === 'function') initializeAccessibilityFeatures();
        if (typeof initializeEasterEgg === 'function') initializeEasterEgg();
        if (typeof initializeMusicToggle === 'function') initializeMusicToggle();
        if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true, offset: 100 });

        // Page-specific scripts
        if (document.body.getAttribute('data-page') === 'projects' && typeof initializeProjectFilters === 'function') {
            initializeProjectFilters();
        }
        if (document.body.getAttribute('data-page') === 'skills' && typeof initializeSkillBars === 'function') {
            initializeSkillBars();
        }
    }

    function handleNavigation(destination) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error("#main-content element not found. Aborting transition.");
            window.location.href = destination;
            return;
        }

        mainContent.classList.add('page-exit-active');

        fetch(destination)
            .then(response => response.ok ? response.text() : Promise.reject('Network response was not ok.'))
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newMainContent = doc.querySelector('#main-content');

                if (!newMainContent) {
                    window.location.href = destination;
                    return;
                }

                setTimeout(() => {
                    document.title = doc.title;

                    // Replace only the main content
                    mainContent.innerHTML = newMainContent.innerHTML;

                    // Update body data-page attribute for the renderer
                    document.body.setAttribute('data-page', doc.body.getAttribute('data-page'));

                    // Re-initialize scripts for the new content
                    initializePageScripts();

                    // Update browser history
                    history.pushState({ path: destination }, '', destination);

                    // Trigger enter animation
                    mainContent.classList.remove('page-exit-active');

                }, 500);
            })
            .catch(err => {
                console.error('Failed to load page:', err);
                window.location.href = destination;
            });
    }

    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');

        if (link && link.href && link.target !== '_blank' && new URL(link.href).origin === window.location.origin && !link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            if (link.href !== window.location.href) {
                handleNavigation(link.href);
            }
        }
    });

    window.addEventListener('popstate', (e) => {
        // On back/forward, just reload. A more complex implementation would handle this smoothly.
        // For now, this prevents a broken state.
        window.location.reload();
    });

});
