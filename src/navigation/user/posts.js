import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  Helpers,
  initGo,
  sendApi,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';

import {
  MediaButton,
  Avatar,
  MediaPreview
} from "@component/element/index.js";

import { BlockLentaUsers } from '@component/blocks/index.js';

let Static, selectAspect;

const changeTextPost = (e, Static) => {
  // let text = wrapTextWithATag(e.target.innerText.trim());
  console.log(Static)
  let text = e.target.innerText.trim();
  Static.textInputs.value = text;
  if (text || Static.mediaInputs.value.length > 0) {
    Static.isValid = true;
  } else {
    Static.isValid = false;
  }
  initReload();
};

const sendPost = async (e, Static) => {
  e.preventDefault();
  if (!Static.isValid) {
    return false;
  }

  let tmpRes = await fn.restApi.setPost.create({ text: Static.textInputs.value, forFriends: Static.forFriends, languages: Static.lang.code, media: [...Static.mediaInputs.value, ...Static.audioInputs.value] });

  if (tmpRes.status === "ok") {
    initGo();
  } else {
    Variable.SetModals(
      {
        name: "ModalAlarm",
        data: {
          icon: "alarm_icon",
          text: Variable.lang.error_div[tmpRes.error],
        },
      },
      true
    );
  }
  return;
};

const deleteMediaFile = function (index) {
  Static.mediaInputs.value.splice(index, 1);
  if (Static.mediaInputs.value.length == 0) {
    selectAspect = null;
  }
};

const start = function (data, ID) {
  Variable.HeaderShow = true
  Variable.FooterShow = true
  Variable.showUserMenu = false

  let authorPosts;

  const sendPhoto = async function (crooper) {
    if (!crooper) {
      return
    }
    let canvas;
    Static.mediaInputs.selectAspect = crooper.options.aspectRatio;
    canvas = crooper.getCroppedCanvas({
      // width: 166,
      // height: 166,
    });
    let previewObj = {
      src: canvas.toDataURL(),
      type: "image",
      upload: 0,
      size: 0
    };
    Static.mediaInputs.show = true;
    Static.mediaInputs.value.push(previewObj);
    let numItem = Static.mediaInputs.value.length - 1
    initReload();
    await canvas.toBlob(function (blob) {
      fn.uploadMedia(
        blob,
        "posts",
        async function () {
          Static.mediaInputs.show = true;
          if (!this.response) {
            return
          }
          let response = JSON.parse(this.response);
          Static.mediaInputs.value[numItem] = {
            aspect: Static.mediaInputs.selectAspect,
            type: response.mimetype.split("/")[0],
            name: response.name
          }
          Static.isValid = true;
          initReload();
        },
        async function (e) {
          let contentLength;
          if (e.lengthComputable) {
            contentLength = e.total;
          } else {
            contentLength = parseInt(
              e.target.getResponseHeader(
                "x-decompressed-content-length"
              ),
              10
            );
          }

          if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
            Static.mediaInputs.value.splice(numItem, 1);
            initReload()
            return
          }
          Static.mediaInputs.value[numItem].upload = e.loaded
          Static.mediaInputs.value[numItem].size = contentLength;
          initReload();
        }
      );
      initReload();
      Variable.DelModals("ModalCropImage");
    });
    return
  }


  const sendVideo = async function (files) {
    let blob = new Blob([files], { type: 'video/mp4' });
    let previewObj = {
      src: URL.createObjectURL(blob),
      type: "video",
      upload: 0,
      size: 0
    }
    Static.mediaInputs.show = true;
    Static.mediaInputs.value.push(previewObj);
    let numItem = Static.mediaInputs.value.length - 1
    initReload();

    fn.uploadMedia(
      files[0],
      "posts",
      async function () {
        Static.mediaInputs.show = true;


        // Static.mediaInputs.value.push(obj);
        let response = JSON.parse(this.response);
        Static.mediaInputs.value[numItem] = {
          aspect: undefined,
          type: response.mimetype.split("/")[0],
          name: response.name
        }

        Static.isValid = true;
        initReload();
      },
      async function (e) {
        let contentLength;
        if (e.lengthComputable) {
          contentLength = e.total;
        } else {
          contentLength = parseInt(
            e.target.getResponseHeader(
              "x-decompressed-content-length"
            ),
            10
          );
        }
        Static.mediaInputs.value[numItem].upload = e.loaded
        Static.mediaInputs.value[numItem].size = contentLength;
        initReload()
      }
    );
    return
  }
  //Добавил SendAudio
  const sendAudio = async function (files) {
    let blob = new Blob([files], { type: 'audio/ogg' });
    let previewObj = {
      src: URL.createObjectURL(blob),
      type: "audio",
      upload: 0,
      size: 0
    }
    Static.audioInputs.show = true;
    Static.audioInputs.value.push(previewObj);
    let numItem = Static.audioInputs.value.length - 1

    initReload();

    fn.uploadMedia(
      files[0],
      "posts",
      async function () {
        Static.mediaInputs.show = true;


        // Static.mediaInputs.value.push(obj);
        let response = JSON.parse(this.response);
        Static.audioInputs.value[numItem] = {
          aspect: undefined,
          type: response.mimetype.split("/")[0],
          name: response.name
        }
        Static.isValid = true;
        initReload();
      },
      async function (e) {
        let contentLength;
        if (e.lengthComputable) {
          contentLength = e.total;
        } else {
          contentLength = parseInt(
            e.target.getResponseHeader(
              "x-decompressed-content-length"
            ),
            10
          );
        }
        Static.audioInputs.value[numItem].upload = e.loaded
        Static.audioInputs.value[numItem].size = contentLength;
        // console.log(
        //   "=3c5fa7= ",
        //   "Загружено",
        //   e.loaded,
        //   "из",
        //   contentLength
        // );
        initReload()
      }
    );
    return
  }

  const toggleAdditionalyMenu = function (e) {
    if (e.currentTarget.children[1].style.display == "none") {
      e.currentTarget.children[1].style = "display: block";
      showAdditionalyMenu = true;
    } else {
      e.currentTarget.children[1].style = "display: none";
      showAdditionalyMenu = false;
    }
  };

  const sendAuthorization = async function (e) {
    e.preventDefault();
    if (!Static.isValid) {
      return false;
    }
  };

  const arrayLengthOne = function (arr) {
    let count = 0;
    arr.forEach((element) => {
      if (element.type != "audio") {
        count++;
      }
    });
    if (count > 1) {
      return true;
    } else {
      return false;
    }
  };

  const audioCountCheck = function (array) {
    let audioCount = 0;
    let otherMediaCount = 0;
    array.forEach((element) => {
      if (element.type == "audio") {
        audioCount++;
      } else {
        otherMediaCount++;
      }
    });
    if (audioCount <= 2 && audioCount != 0 && otherMediaCount == 0) {
      return true;
    } else {
      return false;
    }
  };

  const textLengthCheck = function (str) {
    let pCount = (str.match(new RegExp("<p>", "g")) || []).length;
    if (str.length < 150 + pCount * 8 && pCount <= 5) {
      return true;
    } else {
      return false;
    }
  };

  let el = [];

  let [Static] = fn.GetParams({ data, ID })
  Static.posts = []
  Static.userInfo = Variable.myInfo;
  Static.elShowTextShort = {}
  Static.elShowTextFull = {}

  init(
    async () => {
      fn.initData.posts(Static)

      // console.log('=cb696d=', Static)
      // console.log('=0bb638=', Variable)

      if (Static.userInfo._id == Variable.myInfo._id) {
        Static.posts = await sendApi.send({
          action: "getPost", short: true, cache: true, name: "PageUserProfileMyLenta",
          filter: {
            author: Static.userInfo._id,
          },
          select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 },
          limit: 12
        })
      }

      // console.log('=50f15c=', Static.posts)

      selectAspect = null;

      authorPosts = await fn.restApi.getPost({ cache: true, name: "MainPosts", filter: { author: Variable.myInfo._id }, sort: { showDate: -1, } })

    },

    () => {

      return (
        <div class={[
          "c-userpostcreate",
          Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
        ]}>
          <h3 class="c-userpostcreate__title">{Variable.lang.h.createPost}</h3>
          <form id="userPostCreate" class="c-userpostcreate__form" onsubmit={sendAuthorization}>
            <input class="c-userpostcreate__submit" hidden type="submit" />
            <div class="c-userpostcreate__lang">
              <label for="">{Variable.lang.label.lang}:</label>
              <div
                class="blog_filter_language"
                onclick={() => {
                  Variable.SetModals({
                    name: "ModalChangeLanguage",
                    data: {
                      onclick: async (langCode, langName, langOrig) => {
                        Static.lang.name = langOrig;
                        Static.lang.code = langCode;
                        initReload()
                      },
                    },
                  });
                }}
              >{Static.lang.name}</div>
            </div>
            <div data-type="posts" class="c-userpostcreate__container create_post_container">
              {
                Static.textInputs.show
                  ?
                  <div
                    class="create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={(e) => changeTextPost(e, Static)}
                  ></div>
                  :
                  null
              }
              {
                Static.mediaInputs.show && Static.mediaInputs.value.length
                  ?
                  <div class="create_post_chapter createPostImage">
                    {
                      Static.mediaInputs.value.map((item, index) => {
                        if (item.type != "audio") {
                          return (
                            <MediaPreview
                              item={item}
                              index={index}
                              type="posts"
                              Static={Static}

                            />
                          );
                        }
                      })
                    }
                  </div>
                  :
                  null
              }
              {/* Добавил еще один иф для айдио */}
              {
                Static.audioInputs.show && Static.audioInputs.value.length
                  ?
                  <div class="create_post_chapter createPostAudio">
                    {
                      Static.audioInputs.value.map((item, index) => {

                        return (
                          <MediaPreview
                            item={item}
                            index={index}
                            type="posts"
                            Static={Static}
                            el={el}
                          />
                        );
                      })
                    }
                  </div>
                  :
                  null
              }
            </div>

            <MediaButton

              onclickText={function () {
                if (Static.textInputs.show === true) {
                  return;
                } else {
                  Static.textInputs.show = true;
                  initReload();
                }
              }}

              onclickPhoto={function () {
                if (this.files.length == 0) {
                  return;
                }

                fn.modals.ModalCropImage({
                  file: this.files[0],
                  typeUpload: 'posts',
                  arrMedia: Static.mediaInputs.value,
                  aspectSelect: Static.mediaInputs.selectAspect,
                  uploadCropImage: async function (cropper) {
                    await sendPhoto(cropper)
                    return;
                  }
                })
                // Variable.SetModals({
                //   name: "ModalCropImage",
                //   data: {
                //     file: this.files[0],
                //     typeUpload: 'posts',
                //     arrMedia: Static.mediaInputs.value,
                //     aspectSelect: Static.mediaInputs.selectAspect,
                //     uploadCropImage: async function (cropper) {
                //       await sendPhoto(cropper)
                //       return;
                //     }
                //   },
                // }, true);
                // Static.isValid = true;
                this.value = '';
              }}

              onclickVideo={function () {
                if (this.files.length == 0) {
                  return;
                }
                sendVideo(this.files)
                this.value = '';
                return;
              }}
              // Добавил функ для Аудио
              onclickAudio={function () {
                if (this.files.length == 0) {
                  return;
                }
                sendAudio(this.files)
                this.value = '';
                return;
              }}
            />



            <div class="c-userpostcreate__forfriends">
              <div class="checkbox">
                <input
                  id="forfrends"
                  data-complain="abusive"
                  class="checkbox__input complain_checkbox"
                  onchange={(e) => {
                    Static.forFriends = e.target.checked;
                  }}
                  type="checkbox"
                />
                <label class="checkbox__label" for="forfrends">
                  {Variable.lang.span.forFriends}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div style={"display:flex; width: 100%; max-width: 500px; margin: 20px auto"}>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                style="margin-right: 30px"
                type="button"
                //   onClick={sendQuestion}
                data-href={"/lenta-users/show/123456789"}
                onclick={(e) => {
                  console.log('=cf4a37=', Static)
                  let previewPost = {}
                  previewPost.author = {
                    avatar: Variable.myInfo.avatar,
                    frame: Variable.myInfo.frame,
                    nickname: Variable.myInfo.nickname,
                    online: Variable.myInfo.online,
                    statistic: {
                      level: Variable.myInfo.level
                    },
                    status: Variable.myInfo.status,
                    subscribed: Variable.myInfo.subscribed,
                    _id: Variable.myInfo._id
                  }
                  previewPost.statistic = {
                    view: 0,
                    rating: 0,
                    comments: 0
                  }
                  previewPost.text = Static.textInputs.value
                  previewPost.media = []
                  Static.mediaInputs.value.forEach(function (item) {
                    previewPost.media.push({ name: item.name, type: item.type })
                  })
                  Static.audioInputs.value.forEach(function (audio) {
                    previewPost.media.push({ name: audio.name, type: audio.type })
                  })
                  previewPost.showDate = new Date().toISOString()
                  previewPost.forFriends = Static.forFriends
                  console.log('=0d0932=', previewPost)
                  // fn.siteLinkModal(e, { title: "Просмотр создаваемого поста", previewPost, items: fn.itemsMenu.lenta_users(Static, previewPost) })
                  fn.modals.ModalPostPreview(previewPost)
                }}
              >
                <span class="c-button__text">
                  {Variable.lang.button.pre_view}
                </span>
              </button>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                onClick={(e) => sendPost(e, Static)}
              >
                <span class="c-button__text">
                  {Variable.lang.button.create}
                </span>
              </button>
            </div>

            <div class="c-userpostcreate__myposts my_posts">
              {Variable.lang.h.posts_my}
              {/* {{> userPost}} */}
              {/* {
                !Static.posts || !Static.posts.list_records.length
                  ?
                  <div class="user_news_block">
                    <NotFound />
                  </div>
                  :
                  <div class="user_news_block">
                    {
                      Static.posts.list_records.map((item) => {
                        return (
                          <BlockLentaUsers
                            Static={Static}
                            item={item}
                            ElemVisible={() => {
                              fn.recordsView(item._id, "setPost")
                            }}
                          />
                        )
                      })
                    }
                  </div>
              } */}
            </div>
          </form>
        </div>
      );
    }, ID
  );
};

export default start;
