function swiperload (){


  // console.log('!!! swiperload !!!');
const swiper = new Swiper('#swiper-one', {
  // Optional parameters
  direction: 'horizontal',

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',//-
  // },

  // Navigation arrows
  navigation: {
    nextEl: '#next-icons',
    prevEl: '#prev-icons',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
  breakpoints: {
    20: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    320: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    425: {
      slidesPerView: 3,
      spaceBetween: 25
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 65
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 88
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 158
    },
    1240: {
      slidesPerView: 9,
      spaceBetween: 66,
    },
  },
});
const swiperDesktop = new Swiper('#swiper-desktop', {
// Optional parameters
direction: 'horizontal',

// If we need pagination
// pagination: {
//   el: '.swiper-pagination',//-
// },

// Navigation arrows
navigation: {
  nextEl: '#next-desktop-icons',
  prevEl: '#prev-desktop-icons',
},

// And if we need scrollbar
// scrollbar: {
//   el: '.swiper-scrollbar',
// },
breakpoints: {
  320: {
    slidesPerView: 2,
    spaceBetween: 85
  },
  375: {
    slidesPerView: 2,
    spaceBetween: 125
  },
  425: {
    slidesPerView: 3,
    spaceBetween: 35
  },
  480: {
    slidesPerView: 3,
    spaceBetween: 65
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 88
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 40
  },
  1240: {
    slidesPerView: 9,
    spaceBetween: 30,
  },
},
});
const swiperStartup = new Swiper('#swiper-startups', {
// Optional parameters
// calculateHeight: true,
direction: 'horizontal',
loop: true,
autoplay: {
  delay: 2000,
},
// If we need pagination
pagination: {
  el: '#swiper-pagination-startup',
},

// And if we need scrollbar
scrollbar: {
  el: '.swiper-scrollbar-startup',
},
breakpoints: {
  100: {
    slidesPerView: 1,
    spaceBetween: 20
  },
  620: {  //600
    slidesPerView: 2,
    spaceBetween: 10
  },
  // 768: {
  //   slidesPerView: 2,
  //   spaceBetween: 50
  // },
  910: {  //800
    slidesPerView: 3,
    spaceBetween: 46,
  },
  1240: {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: '#next-startup',
      prevEl: '#prev-startup',
    },
  },
},
});

var swiperCurrencies = new Swiper(".items-currencies", {
direction: 'horizontal',
scrollbar: {
  el: '.swiper-scrollbar-currencies',
},
breakpoints: {
  320: {
    slidesPerView: 2,
    spaceBetween: 24,
    pagination: {
      el: '#swiper-pagination-currencies',
    },
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 55,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 55,
  },
  1240: {
    slidesPerView: 4,
    spaceBetween: 55,
  },
},
});

var questSwiper = new Swiper(".questsSwiper", {
loop: true,
navigation: {
  nextEl: ".quests_swiper-button-next",
  prevEl: ".quests_swiper-button-prev"
},
breakpoints: {
  0: {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1240: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  1400: {
    slidesPerView: 5,
    spaceBetween: 16
  }
},
});

var postMediaSwiper = new Swiper(".swiper-post_media", {
  loop: false,
  autoHeight: true, 
  pagination: {
    el: '.swiper-pagination-post_media',
  },
  scrollbar: {
    el: '.swiper-scrollbar-post_media',
  },
  slidesPerView: 1,
  spaceBetween: 20
});

var gallerySwiper = new Swiper(".swiper-gallery", {
  loop: false,
  navigation: {
    nextEl: ".swiper-gallery-next",
    prevEl: ".swiper-gallery-prev"
  },
  scrollbar: {
    el: '.swiper-scrollbar-gallery',
  },
  slidesPerView: 1,
  spaceBetween: 20
});

var awardsSwiper = new Swiper(".awardsSwiper", {
  effect: "cards",
  grabCursor: true,
  hashNavigation: true, //активный слайд задается через data-атрибут data-hash
})

return true


}

export default swiperload
