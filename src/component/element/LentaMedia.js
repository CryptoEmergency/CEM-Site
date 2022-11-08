import {
  jsx,
  jsxFrag,
  Variable,
} from "@betarost/cemjs";
//
import {
  AudioPlayerCopy,
  Swiper,
  VideoPlayer
} from "@component/element/index.js";

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

const LentaMedia = function ({ Static, items, numIndex = 0, elem, path, replace }) {
  if (items.length == 0) {
    return <></>;
  }

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
  console.log('=654405=', items)
  return (
    <Swiper
      className=""
      options={swiperOptions}
      slide={
        items.map(
          (item, index) => {
            if (item.type == "video" && !Array.isArray(item)) {
              return (
                <div class="swiper-slide">
                  <VideoPlayer
                    Static={Static}
                    item={item}
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
                    <img src={`/assets/upload/${path}/` + item.name} />
                  </div>
                </div>
              );
            }

            if (Array.isArray(item)) {
              let i = index;
              return (
                // <div class="user_post_text_background">
                <div class="swiper-slide user_post_text_background">
                  {
                    item.map((item, index) => {
                      elem[numIndex][index + i * 3] = Variable.setRef();
                      return (
                        <AudioPlayerCopy
                          item={item}
                          index={index + i * 3}
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
