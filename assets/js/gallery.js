
// Enhanced Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeLightbox();
    initializeFilters();
});

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add enhanced hover effects
    galleryItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 222, 0.3)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = '1';
        });
        
        // Add click handler for lightbox
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt, index);
            }
        });
    });
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    let galleryImages = [];
    
    function updateGalleryImages() {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        galleryImages = Array.from(visibleItems).map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                alt: img.alt,
                title: item.querySelector('.gallery-overlay h3')?.textContent || '',
                description: item.querySelector('.gallery-overlay p')?.textContent || ''
            };
        });
    }
    
    window.openLightbox = function(src, alt, index) {
        updateGalleryImages();
        currentIndex = index;
        
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 100);
    };
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevious() {
        if (galleryImages.length > 0) {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            const img = galleryImages[currentIndex];
            
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
    
    function showNext() {
        if (galleryImages.length > 0) {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            const img = galleryImages[currentIndex];
            
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevious);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        }
    });
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('bg-cyber-cyan', 'text-black');
                b.classList.add('border-gray-600', 'text-gray-300');
            });
            
            this.classList.add('active');
            this.classList.add('bg-cyber-cyan', 'text-black');
            this.classList.remove('border-gray-600', 'text-gray-300');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 100);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Enhanced image loading with error handling
function handleImageError(img) {
    const fallbackSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUExQTJFIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMwMEZGREUiLz4KPHR0ZXh0IHg9IjE1MCIgeT0iMjIwIiBmaWxsPSIjMDBGRkRFIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiPkltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    
    img.src = fallbackSvg;
    img.classList.add('fallback-image');
}

// Initialize image error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});

// Masonry layout simulation
function initializeMasonryLayout() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (galleryGrid) {
        // Apply CSS Grid with auto-fit and auto-row sizing
        galleryGrid.style.display = 'grid';
        galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        galleryGrid.style.gridAutoRows = 'minmax(250px, auto)';
        galleryGrid.style.gap = '1.5rem';
    }
}

// Initialize masonry layout
document.addEventListener('DOMContentLoaded', initializeMasonryLayout);

// Intersection Observer for lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if data-src attributes are present
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add CSS for enhanced gallery effects
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem 0;
    }

    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        aspect-ratio: 1;
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover img {
        transform: scale(1.1);
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: end;
        padding: 1.5rem;
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }

    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    }

    .lightbox.active {
        display: flex;
    }

    .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        position: relative;
    }

    .lightbox img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 1rem;
        transition: opacity 0.3s ease;
    }

    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
        transition: transform 0.3s ease;
    }

    .lightbox-close:hover {
        transform: scale(1.2);
        color: #00FFDE;
    }

    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .lightbox-nav:hover {
        background: rgba(0, 255, 222, 0.3);
        transform: translateY(-50%) scale(1.1);
    }

    .lightbox-prev {
        left: -80px;
    }

    .lightbox-next {
        right: -80px;
    }

    .filter-btn.active {
        background: linear-gradient(135deg, #00FFDE, #FF3366) !important;
        color: #0a0a0a !important;
        box-shadow: 0 0 20px rgba(0, 255, 222, 0.4);
        border-color: #00FFDE !important;
    }

    .hidden {
        display: none !important;
    }

    .fallback-image {
        opacity: 0.7;
        filter: brightness(0.8);
    }

    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .lightbox-nav {
            font-size: 1.5rem;
            padding: 0.5rem;
        }

        .lightbox-prev {
            left: -60px;
        }

        .lightbox-next {
            right: -60px;
        }
    }
`;

document.head.appendChild(galleryStyles);
