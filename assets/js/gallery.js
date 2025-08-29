function initializeGalleryPage() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems)
            .filter(item => item.style.display !== 'none')
            .map(item => item.querySelector('img'));
    }

    function openLightbox(index) {
        const clickedImg = galleryItems[index].querySelector('img');
        if (!clickedImg) return;

        updateVisibleImages();
        const visibleIndex = visibleImages.findIndex(img => img.src === clickedImg.src);

        if (visibleIndex === -1) return;

        currentImageIndex = visibleIndex;
        lightboxImg.src = visibleImages[currentImageIndex].src;
        lightboxImg.alt = visibleImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function showPrevImage() {
        if (visibleImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        lightboxImg.src = visibleImages[currentImageIndex].src;
        lightboxImg.alt = visibleImages[currentImageIndex].alt;
    }

    function showNextImage() {
        if (visibleImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        lightboxImg.src = visibleImages[currentImageIndex].src;
        lightboxImg.alt = visibleImages[currentImageIndex].alt;
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-cyber-cyan', 'text-black');
                    btn.classList.add('border-gray-600', 'text-gray-300');
                });
                this.classList.add('active');
                this.classList.add('bg-cyber-cyan', 'text-black');
                this.classList.remove('border-gray-600', 'text-gray-300');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
                });
            });
        });
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeGalleryPage);
document.addEventListener('page:load', initializeGalleryPage);