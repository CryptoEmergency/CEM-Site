import {
  jsx,
  jsxFrag
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { AudioPlayer, Swiper, VideoPlayer, LazyImage } from "@component/element/index.js";

const swiperOptions = {
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
  spaceBetween: 20,
};

const LentaMedia = function ({ Static, items, numIndex = 0, elem, path, changeToogle }) {
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
      options={swiperOptions}
      replace={changeToogle}
      slide={
        items.map(
          (item) => {
            if (Array.isArray(item)) {
              return (
                <div class="swiper-slide user_post_text_background">
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
                <div class="swiper-slide">
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