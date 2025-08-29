function initializeSlideshow() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
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
    }
}

document.addEventListener('DOMContentLoaded', initializeSlideshow);
document.addEventListener('page:load', initializeSlideshow);
