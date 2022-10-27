import {
  jsx,
  jsxFrag,
  Helpers,
  initOne,
  initAfter,
  Variable,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";
import {
  VideoPlayerCopy,
  AudioPlayerCopy,
  Swiper,
} from "@component/element/index.js";

// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';

let swiperitem = [];
const swiperOptions = {
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
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

const swiperGo = function (numIndex) {
  // if (!swiperitem) {
  swiperitem[numIndex] = new Swiper(".swiper-post_media", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
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
  });
  // }
};
const LentaMedia = function ({ items, numIndex, elem, path }) {
  if (items.length == 0) {
    return <></>;
  }
  // swiperitem = null
  // items.push(...items)
  // items.push(...items)
  // initOne(
  //     () => {
  //         swiperitem = null
  //     }
  // )

  // initAfter(
  //     () => {

  //         if (typeof swiperitem[numIndex] != "undefined") {
  //             swiperitem[numIndex].destroy()
  //             swiperitem[numIndex].init()
  //             // swiperitem[numIndex].update()
  //             // swiperitem[numIndex].update()
  //         }
  //         if (!swiperitem) {
  //             // swiperitem = new Swiper(".swiper-post_media", {
  //             //     effect: "cube",
  //             //     grabCursor: true,
  //             //     cubeEffect: {
  //             //         shadow: true,
  //             //         slideShadows: true,
  //             //         shadowOffset: 20,
  //             //         shadowScale: 0.94,
  //             //     },
  //             //     loop: false,
  //             //     autoHeight: true,
  //             //     pagination: {
  //             //         el: '.swiper-pagination-post_media',
  //             //     },
  //             //     scrollbar: {
  //             //         el: '.swiper-scrollbar-post_media',
  //             //     },
  //             //     slidesPerView: 1,
  //             //     spaceBetween: 20
  //             // });

  //             // swiperitem = new Swiper(".swiper-post_media", {
  //             //     loop: false,
  //             //     autoHeight: true,
  //             //     pagination: {
  //             //         el: '.swiper-pagination-post_media',
  //             //     },
  //             //     scrollbar: {
  //             //         el: '.swiper-scrollbar-post_media',
  //             //     },
  //             //     slidesPerView: 1,
  //             //     spaceBetween: 20
  //             // });
  //         }
  //     }
  // )

  if (items.find((item) => item.type === "audio")) {
    let ArrWithAudio = items.filter((item) => item.type === "audio");

    items = items.filter((item) => item.type !== "audio");

    const array_size = 3;

    const audioArr = [];

    for (let i = 0; i < ArrWithAudio.length; i += array_size) {
      audioArr.push(ArrWithAudio.slice(i, i + array_size));
    }
    items = items.concat(audioArr);
  }

  return (
    <Swiper
      slide={


        items.map(
          (item, index) => {
            if (item.type == "video" && !Array.isArray(item)) {
              elem[numIndex][index] = Variable.setRef();
              return (
                <div class="swiper-slide">
                  <VideoPlayerCopy
                    item={item}
                    index={index}
                    numIndex={numIndex}
                    elem={elem}
                    path={path}
                    //  path={"/assets/upload/posts/"}
                  />
                </div>
              );
            }

            if (item.type == "image" && !Array.isArray(item)) {
              return (
                <div class="swiper-slide">
                  <div class="swiper-post_media_image_container">
                    <img src={path + item.name} />
                  </div>
                </div>
              );
            }

            if (Array.isArray(item)) {
              return (
                // <div class="user_post_text_background">
                <div class="swiper-slide user_post_text_background">
                  {
                    item.map((item, index) => {
                      elem[numIndex][index] = Variable.setRef();
                      return (
                        <AudioPlayerCopy
                          item={item}
                          index={index}
                          numIndex={numIndex}
                          elem={elem}
                          path={path}
                          type="posts"
                          //  path={"/assets/upload/posts/"}
                        />
                      );
                    })
                  }
                  {/* <AudioPlayer
                    item={item}
                    index={index}
                    numIndex={numIndex}
                    elem={elem}
                    path={path}
                    type="posts"
                    //  path={"/assets/upload/posts/"}
                  /> */}
                </div>
              
              );
            }
          }
        )
      }
      options={swiperOptions}
      className=""
    />
  );
};
//I check
export { LentaMedia };

// if (Array.isArray(item)) {
//     console.log('=f2bef3=',item)
//     return (
//         <div class="user_post_text_background">
//         <div class="swiper-slide">
//             <Map
//             data = {
//                 item
//             }
//             dataIf = {
//                 (item,index) => {
//                     return(
//                         <AudioPlayer
//                 item={item}
//                 index={index}
//                 numIndex={numIndex}
//                 elem={elem}
//                 path={path}
//                 type="posts"
//             //  path={"/assets/upload/posts/"}
//             />
//                     )
//                 }
//             }
//             />

//         </div>
//         </div>

//     )
// }

// }
