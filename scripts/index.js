import Swiper from "../lib/swiper-bundle.esm.browser.min.js";

new Swiper(".goods__block", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: ".goods__arrow_next",
    prevEl: ".goods__arrow_prev",
  },
});
