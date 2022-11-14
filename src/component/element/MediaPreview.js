import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { AudioPlayerCopy } from "@component/element/index.js";


const MediaPreview = function ({ item, index, type, formInputs, el }) {
  // console.log('=2f8e9a=', item)
  if (item.type === "audio") {
    el[index] = Variable.setRef();
  }
  return (
    <div>
      {
        item.type == "image"
          ?
          <div class="create_post_photo_preview">
            <img
              class="fullsize media"
              src={
                item.src !== undefined
                  ? item.src
                  : `/assets/upload/${type}/${item.name}`
              }
            />
            {
              item.size !== undefined
                ?
                <div class="circle-wrap">
                  <div class="circle">
                    <div
                      class="mask full"
                      style={`transform: rotate( ${(360 / 200) *
                        Math.round((item.upload / item.size) * 100)
                        }deg`}
                    >
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                    <div class="mask half">
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                  </div>
                </div>
                :
                null
            }
            {
              item.size === undefined
                ?
                <div
                  class="delete_post_media"
                  style="display: block;"
                  onClick={() => {
                    formInputs.mediaInputs.value.splice(index, 1);
                    if (formInputs.mediaInputs.value.length == 0) {
                      formInputs.mediaInputs.selectAspect = null;
                    }
                    initReload();
                  }}
                >
                  <img src={svg["delete_icon"]} />
                </div>
                :
                <div
                  class="stop_loading"
                  onclick={() => {
                    formInputs.mediaInputs.value[index].upload =
                      formInputs.mediaInputs.value[index].size;
                    formInputs.mediaInputs.value.splice(index, 1);
                    if (formInputs.mediaInputs.value.length == 0) {
                      formInputs.mediaInputs.selectAspect = null;
                    }
                    initReload();
                  }}
                ></div>
            }
          </div>
          :
          null
      }

      {
        item.type == "video"
          ?
          <div class="create_post_photo_preview">
            {
              item.src !== undefined
                ?
                <img class="fullsize media" src={images["video_background"]} />
                :
                <video
                  class="fullsize media"
                  src={`/assets/upload/${type}/${item.name}`}
                />
            }
            {
              item.size !== undefined
                ?
                <div class="circle-wrap">
                  <div class="circle">
                    <div
                      class="mask full"
                      style={`transform: rotate( ${(360 / 200) *
                        Math.round((item.upload / item.size) * 100)
                        }deg`}
                    >
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                    <div class="mask half">
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                  </div>
                </div>
                :
                null
            }
            {
              item.size === undefined
                ?
                <div
                  class="delete_post_media"
                  style="display: block;"
                  onClick={() => {
                    formInputs.mediaInputs.value.splice(index, 1);

                    initReload();
                  }}
                >
                  <img src={svg["delete_icon"]} />
                </div>
                :
                <div
                  class="stop_loading"
                  onclick={() => {
                    formInputs.mediaInputs.value[index].upload =
                      formInputs.mediaInputs.value[index].size;
                    formInputs.mediaInputs.value.splice(index, 1);

                    initReload();
                  }}
                ></div>
            }
          </div>
          :
          null
      }
      {
        item.type == "audio"
          ?
          <div class="create_post_photo_preview">
            {
              item.src !== undefined
                ?
                <audio src={item.src}></audio>
                :
                <AudioPlayerCopy
                  item={item}
                  index={index}
                  path={`/assets/upload/${type}/`}
                  el={el}
                />
            }
            {
              item.size !== undefined
                ?
                <div class="circle-wrap">
                  <div class="circle">
                    <div
                      class="mask full"
                      style={`transform: rotate( ${(360 / 200) *
                        Math.round((item.upload / item.size) * 100)
                        }deg`}
                    >
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                    <div class="mask half">
                      <div
                        class="fill"
                        style={`transform: rotate( ${(360 / 200) *
                          Math.round((item.upload / item.size) * 100)
                          }deg`}
                      ></div>
                    </div>
                  </div>
                </div>
                :
                null
            }
            {
              item.size === undefined
                ?
                <div
                  class="delete_post_media"
                  style="display: block;"
                  onClick={() => {
                    formInputs.mediaInputs.value.splice(index, 1);

                    initReload();
                  }}
                >
                  <img src={svg["delete_icon"]} />
                </div>
                :
                <div
                  class="stop_loading"
                  onclick={() => {
                    formInputs.mediaInputs.value[index].upload =
                      formInputs.mediaInputs.value[index].size;
                    formInputs.mediaInputs.value.splice(index, 1);

                    initReload();
                  }}
                ></div>
            }
          </div>
          :
          null
      }
    </div>
  );
};
export { MediaPreview };
