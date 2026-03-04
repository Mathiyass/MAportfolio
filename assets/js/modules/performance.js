/**
 * Performance Module
 */
export function initializePerformanceOptimization() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));

    if (window.PerformanceObserver) {
        const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'navigation') {
                    console.log(`🚀 Portfolio loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
                }
            });
        });
        perfObserver.observe({ entryTypes: ['navigation'] });
    }
}
