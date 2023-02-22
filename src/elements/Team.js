import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiperGo = function (index) {
  let swiperItem = new Swiper(".mySwiper", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      620: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      910: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    spaceBetween: 20,
  });
};

const forExport = function ({ records }) {
  return (
    <div class="swiper mySwiper" After={() => swiperGo()}>
      <div class="swiper-wrapper">
        {records.map((item) => {
          return (
            <div class="team-item swiper-slide">
              <div class="team-img">
                <img src={images[item.foto]}></img>
              </div>
              <h5>{item.name}</h5>
              <span>{item.position}</span>
            </div>
          );
        })}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  );
};

export default forExport;
