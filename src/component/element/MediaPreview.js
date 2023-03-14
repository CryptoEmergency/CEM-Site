import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { AudioPlayerCopy } from "@component/element/index.js";
import { fn } from '@src/functions/index.js';

const MediaPreview = function ({ item, index, type, Static, el, sendPhotoChat = false, toggleActive = false }) {
  // console.log('=2f8e9a=', item, type)item.size
  // console.log("============on load",Static,"=======item",item)
  // console.log('=MediaPreview=', Static)

  // console.log('=2bf636=',item, index, type)
  if (item.type == "audio") {
    el[index] = Variable.setRef();
  }

  return (
    <div>
      {
        item.type == "image"
          ?
          <div
            class={[
              "create_post_photo_preview",
              item.activePreview ? "activePreview" : null
            ]}
          >

            <img
              class={"fullsize media"}
              src={
                // type == "chat" ?
                //   item.src !== undefined
                //     ? "/assets/image/loader_line.gif"
                //     : `/assets/upload/${type}/${item.name}`
                // : item.src !== undefined
                item.src !== undefined
                  ? item.src
                  : `/assets/upload/${type}/${item.name}`
              }
              onclick={(e) => toggleActive ? toggleActive(e) : null}
            />
            {
              item.size !== undefined
                ?
                <div class="circle-wrap" style={type == "chat" ? "width: 100%; height: 100%" : null}>
                  {/* {
                    type == "chat" ?
                      <img src={svg["loader_line"]} width="30" height="30" />
                      : null
                  } */}

                  <div
                    class="circle"
                    style={type == "chat" ? "display: none" : null}
                  >
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
              (type == "posts")
                ?
                <div
                  class="messages_settings"
                  title={Variable.lang.text.settings}
                  onclick={(e) => {
                    let author = Variable.myInfo
                    let items
                    if (!item.originalImage) {
                      items = [
                        {
                          text: Variable.lang.select.delete,
                          type: "delete",
                          color: "red",
                          onclick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            Static.mediaInputs.value.splice(index, 1);
                            Static.originalImage.splice(index, 1);
                            if (Static.mediaInputs.value.length == 0) {
                              Static.mediaInputs.selectAspect = null;
                              Static.mediaInputs.show = false
                              if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                                Static.isValid = false;
                              }
                            } else {
                              Static.mediaInputs.value[0].activePreview = true
                            }
                            console.log('=34795d= Static.mediaInputs.value = ', Static.mediaInputs.value)
                            initReload();
                          }
                        },
                      ]
                    } else {
                      items = [
                        {
                          text: Variable.lang.button.edit,
                          type: "edit",
                          onclick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();

                            fn.modals.ModalCropImage({
                              editable: true,
                              originalImage: item.originalImage,
                              file: {},
                              typeUpload: 'posts',
                              arrMedia: Static.mediaInputs.value,
                              aspectSelect: Static.mediaInputs.selectAspect,
                              // aspectSelect: Static.mediaInputs.value[index].aspect,  //null,
                              uploadCropImage: async function (cropper, aspectActive) {
                                Static.mediaInputs.selectAspect = aspectActive
                                await sendPhotoChat(cropper, index)
                                return;
                              }
                            })
                          }
                        },
                        {
                          text: Variable.lang.select.delete,
                          type: "delete",
                          color: "red",
                          onclick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            Static.mediaInputs.value.splice(index, 1);
                            Static.originalImage.splice(index, 1);
                            if (Static.mediaInputs.value.length == 0) {
                              Static.mediaInputs.selectAspect = null;
                              Static.mediaInputs.show = false
                              if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                                Static.isValid = false;
                              }
                            }
                            initReload();
                          }
                        },
                      ]
                    }

                    e.stopPropagation();
                    e.preventDefault();
                    Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
                  }
                  }
                >
                  <img class="" src={svg.settings_icon} width="32" height="32" />
                </div>
                : null
            }
            {
              item.size === undefined
                ?
                type != "posts"
                  ? <div
                    class="delete_post_media"
                    style="display: block;"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      Static.mediaInputs.value.splice(index, 1);
                      if (Static.mediaInputs.value.length == 0) {
                        Static.mediaInputs.selectAspect = null;
                        Static.mediaInputs.show = false
                        if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                          Static.isValid = false;
                        }
                      } else if (!Static.mediaInputs.value.filter((item) => { return item.activePreview })[0]) {
                        Static.mediaInputs.value[0].activePreview = true;
                      }
                      initReload();
                    }}
                  >
                    <img src={svg["delete_icon"]} />
                  </div>
                  : null
                :
                <div
                  class="stop_loading"
                  style={type == "chat" ? "display: none" : null}
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
          <div class={[
            "create_post_photo_preview 77",
            item.activePreview ? "activePreview" : null
          ]}
            onclick={(e) => toggleActive ? toggleActive(e) : null}>
            {
              item.src !== undefined
                ?
                <img class="fullsize media" src={images["video_background"]} />
                :
                <video
                  class="fullsize media"
                  poster={item.previewName ? `/assets/upload/${type}/${item.previewName}` : images["video_background"]}
                  preload="metadata"
                  src={item.previewName ? `/assets/upload/${type}/${item.name}` : `/assets/upload/${type}/${item.name}#t=0.001`}
                />
            }
            {
              item.size !== undefined
                ?
                <div class="circle-wrap">
                  <div
                    class="circle"
                    style={type == "chat" ? "display: none" : null}
                  >
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
                  class="messages_settings"
                  title={Variable.lang.text.settings}
                  style="width: auto; display: flex; gap: 10px; align-items: center;"
                  onclick={(e) => {
                    let author = Variable.myInfo
                    let items = [
                      {
                        text: Variable.lang.button.preview,
                        type: "edit",
                        onclick: function (e) {
                          e.stopPropagation();
                          e.preventDefault();

                          Static.mediaInputs.value.filter((item) => { return item.previewName }).length ?
                            fn.modals.ModalPreviewVideo({
                              preview: {
                                name: item.previewName
                              },
                              uploadPreviewImage: function (preview) {
                                Static.mediaInputs.value[index].previewName = preview.name
                              }
                            }, true)
                            :
                            fn.modals.ModalPreviewVideo({
                              uploadPreviewImage: function (preview) {
                                Static.mediaInputs.value[index].previewName = preview.name
                              }
                            }, true)
                          // console.log('=eb4081 Static=', Static)
                        }
                      },
                      {
                        text: Variable.lang.select.delete,
                        type: "delete",
                        color: "red",
                        onclick: function (e) {
                          e.stopPropagation();
                          e.preventDefault();
                          Static.mediaInputs.value.splice(index, 1);
                          if (Static.originalImage) {
                            Static.originalImage.splice(index, 1);
                          }
                          if (Static.mediaInputs.value.length == 0) {
                            Static.mediaInputs.selectAspect = null;
                            Static.mediaInputs.show = false
                            if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                              Static.isValid = false;
                            }
                          } else if (!Static.mediaInputs.value.filter((item) => { return item.activePreview })[0]) {
                            Static.mediaInputs.value[0].activePreview = true;
                          }
                          debugger
                          initReload();
                        }
                      },
                    ]
                    e.stopPropagation();
                    e.preventDefault();
                    Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
                  }
                  }
                >
                  <span class="messages_hint">
                    <span>Превью</span>
                    <div class="messages_arrow_right">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </span>
                  <img class="" src={svg.settings_icon} width="32" height="32" title="!!!" />
                </div>
                // <div
                //   class="delete_post_media"
                //   style="display: block;"
                //   onClick={() => {
                //     //  console.log(3)
                //     Static.mediaInputs.value.splice(index, 1);
                //     if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                //       Static.isValid = false;
                //     }
                //     initReload();
                //   }}
                // >
                //   <img src={svg["delete_icon"]} />
                // </div>
                :
                <div
                  class="stop_loading"
                  style={type == "chat" ? "display: none" : null}
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
          <div
            class={[
              "create_post_photo_preview",
              item.activePreview ? "activePreview" : null
            ]}
          >
            {
              type == "chat" ?
                item.src == undefined ?
                  <div
                    class=""
                    onclick={(e) => toggleActive ? toggleActive(e) : null}
                  >
                    <img class="fullsize media" src={svg["icon/music"]} />
                  </div>
                  : null
                :
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
                  <div
                    class="circle"
                    style={type == "chat" ? "display: none" : null}
                  >
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    Static.mediaInputs.value.splice(index, 1);
                    if (Static.mediaInputs.value.length == 0) {
                      Static.mediaInputs.selectAspect = null;
                      Static.mediaInputs.show = false
                      // if (Static.textInputs && Static.textInputs.value.length == 0 && Static.audioInputs && Static.audioInputs.value.length == 0) {
                      if (Static.mediaInputs.value.length == 0 && Static.textInputs.value.length == 0 && Static.audioInputs.value.length == 0) {
                        Static.isValid = false;
                      }
                    } else if (!Static.mediaInputs.value.filter((item) => { return item.activePreview })[0]) {
                      Static.mediaInputs.value[0].activePreview = true;
                    }
                    initReload();
                  }}
                >
                  <img src={svg["delete_icon"]} />
                </div>
                :
                <div
                  class="stop_loading"
                  style={type == "chat" ? "display: none" : null}
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
