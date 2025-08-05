document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
});
