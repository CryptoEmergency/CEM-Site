import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { AudioPlayerCopy } from "@component/element/index.js";
import { fn } from '@src/functions/index.js';

const MediaPreview = function ({ item, index, type, Static, el, sendPhotoChat = false }) {
  // console.log('=2f8e9a=', item, type)item.size
  //console.log("============on load",Static,"=======item",item)


  if (item.type == "audio") {
    el[index] = Variable.setRef();
  }

  return (
    <div>
      {
        item.type == "image"
          ?
          <div class="create_post_photo_preview">

            <img
              class={"fullsize media"}
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
             
           //   ((type == "chat" || type == "posts") && !Static.photo) && item.size === undefined
           (type == "chat" || type == "posts")
                ?
                <div
                  class="messages_settings"
                  title={Variable.lang.text.settings}
                  onclick={(e) => {
                    let author = Variable.myInfo
                    let items = [
                      {
                        text: Variable.lang.button.edit,
                        type: "edit",
                        onclick: function (e) {
                          e.stopPropagation();
                          e.preventDefault();
                          fn.modals.ModalCropImage({
                            file: `/assets/upload/${type}/${item.name}`,
                            typeUpload: 'chat',
                            arrMedia: Static.mediaInputs.value,
                            aspectSelect: Static.mediaInputs.selectAspect,
                            uploadCropImage: async function (cropper) {
                              await sendPhotoChat(cropper, index)
                              return;
                            }
                          })
                        }
                      },
                    ]
                    e.stopPropagation();
                    e.preventDefault();
                    Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
                  }
                  }
                >
                  <img class="" src={svg.settings_icon} width="20" height="20" />
                </div>
                : null
            }
            {
              item.size === undefined
                ?
                <div
                  class="delete_post_media"
                  style="display: block;"
                  onClick={() => {
          
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0) {
                      Static.mediaInputs.selectAspect = null;
              
                      if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                        Static.isValid = false;
                      }
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
                //    console.log(2)
                    Static.mediaInputs.value[index].upload =
                      Static.mediaInputs.value[index].size;
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0) {
                      Static.mediaInputs.selectAspect = null;
                      if (Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                        Static.isValid = false;
                      }
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
                  //  console.log(3)
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                      Static.isValid = false;
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
                    Static.mediaInputs.value[index].upload =
                      Static.mediaInputs.value[index].size;
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                      Static.isValid = false;
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
                  //  console.log(4)
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                      Static.isValid = false;
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
                    Static.mediaInputs.value[index].upload =
                      Static.mediaInputs.value[index].size;
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                      Static.isValid = false;
                    }
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
