function swiperSlider() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: {
      enabled: false,
    },
    pagination: {
      enabled: false,
    },

    paginationDisabledClass: "swiper-pagination-disabled",
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 40,
        pagination: {
          enabled: false,
        },

        freeMode: {
          enabled: true,
        },
      },
    },
  });
}

export default swiperSlider;
