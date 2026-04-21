/**
 * Navigation Module
 */
export function initializeAdvancedNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    let lastScrollTop = 0;
    let isScrollingDown = false;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('backdrop-blur-lg', 'bg-black/20');
            } else {
                navbar.classList.remove('backdrop-blur-lg', 'bg-black/20');
            }

            if (scrollTop > lastScrollTop && scrollTop > 200) {
                if (!isScrollingDown) {
                    navbar.style.transform = 'translateY(-100%)';
                    isScrollingDown = true;
                }
            } else {
                if (isScrollingDown) {
                    navbar.style.transform = 'translateY(0)';
                    isScrollingDown = false;
                }
            }
        }
        lastScrollTop = scrollTop;
    });

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isActive);
                icon.classList.toggle('fa-times', isActive);
            }
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

export function initializeEnhancedScrollEffects() {
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) progressBar.style.width = scrollPercent + '%';
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
                backToTopBtn.style.transform = 'scale(1)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
                backToTopBtn.style.transform = 'scale(0.5)';
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

