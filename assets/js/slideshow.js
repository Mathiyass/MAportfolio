
// Profile Image Slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for profile images
    if (typeof Swiper !== 'undefined') {
        const profileSwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
        });
    } else {
        // Fallback slideshow without Swiper
        initFallbackSlideshow();
    }
    
    function initFallbackSlideshow() {
        const images = [
            'assets/images/Profile Picture.jpg',
            'assets/images/Profile Picture 2.jpg'
        ];
        
        let currentIndex = 0;
        const profileContainer = document.querySelector('.swiper-container');
        
        if (!profileContainer) return;
        
        // Create image element
        const img = document.createElement('img');
        img.src = images[0];
        img.alt = 'Mathiya Profile';
        img.className = 'w-full h-full object-cover transition-opacity duration-1000';
        
        // Clear swiper structure and add simple image
        profileContainer.innerHTML = '';
        profileContainer.appendChild(img);
        
        // Auto-switch images
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            
            // Fade out
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.src = images[currentIndex];
                // Fade in
                img.style.opacity = '1';
            }, 500);
            
        }, 4000);
    }
});

// Hero section animations
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('[data-aos]');
    
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add interactive hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.neon-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 0 30px rgba(0, 255, 222, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 222, 0.4)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .neon-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add CSS animation for ripple effect
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
