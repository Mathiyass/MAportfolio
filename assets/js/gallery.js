// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('border-cyber-cyan', 'text-cyber-cyan');
                    btn.classList.add('border-gray-600', 'text-gray-300');
                });

                this.classList.add('active');
                this.classList.remove('border-gray-600', 'text-gray-300');
                this.classList.add('border-cyber-cyan', 'text-cyber-cyan');

                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        // Add fade animation class
                        item.classList.remove('aos-animate');
                        setTimeout(() => item.classList.add('aos-animate'), 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        let currentImageIndex = 0;
        let visibleImages = [];

        function updateVisibleImages() {
            // Only cycle through currently visible images (respecting filters)
            visibleImages = Array.from(galleryItems)
                .filter(item => item.style.display !== 'none')
                .map(item => ({
                    src: item.querySelector('img').src,
                    alt: item.querySelector('img').alt
                }));
        }

        function openLightbox(index) {
            updateVisibleImages();

            // Find the correct index in the visible array
            const targetSrc = galleryItems[index].querySelector('img').src;
            currentImageIndex = visibleImages.findIndex(img => img.src === targetSrc);

            if (currentImageIndex === -1) currentImageIndex = 0;

            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function updateLightboxImage() {
            if (visibleImages.length === 0) return;
            lightboxImg.src = visibleImages[currentImageIndex].src;
            lightboxImg.alt = visibleImages[currentImageIndex].alt;
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showPrevImage(e) {
            if (e) e.stopPropagation();
            if (visibleImages.length === 0) return;
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            updateLightboxImage();
        }

        function showNextImage(e) {
            if (e) e.stopPropagation();
            if (visibleImages.length === 0) return;
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            updateLightboxImage();
        }

        // Add click events to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Lightbox controls
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        showPrevImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            }
        });
    }

    // Interactive gallery items hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 222, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});
