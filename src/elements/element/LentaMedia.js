import {
  jsx,
  jsxFrag,
  CEM
} from "@betarost/cemserver/cem.js";

import { AudioPlayer, Swiper, VideoPlayer, LazyImage, Panzoom } from "@elements/element/index.js";

const { images, svg, fn } = CEM

const makeSwiperOptions = function (Static, index) {

  let swiperOptions = {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop: false,
    // autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    slidesPerView: 1,
    spaceBetween: 20
  };

  // if (typeof index != "undefined") {
  swiperOptions.on = {
    slideChange: function () {
      // console.log('swiper slide change ***');
      // console.log('=8d7c32=', index, Static.elNumberSwiper[index])
      Static.elNumberSwiper[index].innerText = this.activeIndex + 1
    }
  }
  // }

  return swiperOptions
}


const LentaMedia = function ({ Static, items, path, changeToogle, index }) {
  if (items.length == 0) { return null }
  let ArrWithAudio = items.filter((item) => item.type === "audio");
  let ArrWithVideo = items.filter((item) => item.type === "video");
  let ArrWithImage = items.filter((item) => item.type === "image");

  if (!ArrWithVideo.length && !ArrWithAudio.length && ArrWithImage.length == 1) {
    return (
      // <div class="swiper-post_media_image_container">
      //   <img src={`/assets/upload/${path}/` + ArrWithImage[0].name} />
      // </div>
      <LazyImage className="swiper-post_media_image_container" path={`/assets/upload/${path}/` + ArrWithImage[0].name} />
      // <Panzoom path={`/assets/upload/${path}/` + ArrWithImage[0].name} panzoomElem={{}} index={index} />
    )
  }

  if (!ArrWithImage.length && !ArrWithAudio.length && ArrWithVideo.length == 1) {
    return (
      <VideoPlayer Static={Static} item={ArrWithVideo[0]} path={`/assets/upload/${path}/`} />
    )
  }

  if (!ArrWithImage.length && !ArrWithVideo.length && ArrWithAudio.length == 1) {
    return (
      <div class="user_post_text_background">
        <AudioPlayer Static={Static} item={ArrWithAudio[0]} path={`/assets/upload/${path}/`} />
      </div>
    )
  }
  if (ArrWithAudio.length) {
    let audioSplit = fn.splitArray(ArrWithAudio, 3)
    items.push(...audioSplit)
  }

  return (
    <Swiper
      options={makeSwiperOptions(Static, index)}
      replace={changeToogle}
      slide={
        items.map(
          (item, index) => {
            if (Array.isArray(item)) {
              return (
                <div class="swiper-slide user_post_text_background"
                  style="display: flex"
                >
                  {
                    item.map((itemAudio) => {
                      return (
                        <AudioPlayer Static={Static} item={itemAudio} path={`/assets/upload/${path}/`} />
                      );
                    })
                  }
                </div>
              );
            }

            if (item.type == "image") {
              return (
                <div class="swiper-slide" data-i={`${index + 1} / ${items.length}`}>
                  <div class="swiper-post_media_image_container">
                    {/* <img src={`/assets/upload/${path}/` + ArrWithImage[0].name} /> */}
                    <LazyImage path={`/assets/upload/${path}/` + item.name} />
                  </div>
                </div>
              );
            }

            if (item.type == "video" && !Array.isArray(item)) {
              return (
                <div class="swiper-slide">
                  <VideoPlayer Static={Static} item={item} path={`/assets/upload/${path}/`} />
                </div>
              );
            }
          }
        )
      }
    />
  );
};
export { LentaMedia };
// OK