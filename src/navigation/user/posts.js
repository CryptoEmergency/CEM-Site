import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  sendApi,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { NotifyItem } from "@component/element/NotifyItem.js";

import { uploadMedia, wrapTextWithATag } from "@src/functions.js";
import { MediaButton } from "@component/element/index.js";

import { If, Map } from "@component/helpers/All.js";

let formInputs;

const changeTextPost = (e) => {
  // let text = wrapTextWithATag(e.target.innerText.trim());
  let text = e.target.innerText.trim();
  formInputs.textInputs.value = wrapTextWithATag(text);
  if (text || formInputs.mediaInputs.lenght > 0) {
    formInputs.isValid = true;
  } else {
    formInputs.isValid = false;
  }
  initReload();
};

const sendPost = async (e) => {
  e.preventDefault();
  if (!formInputs.isValid) {
    return false;
  }
  // console.log('=formInputs=',formInputs.mediaInputs.value)

  let data = {
    value: {
      forFriends: formInputs.forFriends,
      languages: Variable.myInfo.mainLanguage.code,
      media: formInputs.mediaInputs.value,
      text: formInputs.textInputs.value,
    },
  };
  console.log("=data=", data);

  let tmpRes = await sendApi.create("setPosts", data);
  console.log("=66d247=", tmpRes);

  if (tmpRes.status === "ok") {
    initReload();
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

const start = function () {
  Variable.HeaderShow = false;
  Variable.FooterShow = false;
  Variable.showUserMenu = true;

  const sendAuthorization = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
      return false;
    }
  };

  init(
    async () => {
      formInputs = {
        textInputs: {
          value: "",
          show: false,
        },
        mediaInputs: {
          value: [],
          show: false,
        },
        forFriends: false,
        isValid: false,
      };
    },

    () => {
      console.log("=83a186=", Variable.myInfo);
      return (
        <div class="create_post">
          <h3>{Variable.lang.h.createPost}</h3>
          <form id="userPostCreate" onsubmit={sendAuthorization}>
            <input style="display: none;" type="submit" />
            <div style="display: flex; justify-content: flex-start;grid-gap: 15px">
              <label for="">{Variable.lang.label.lang}:</label>
              <div class="blog_filter_language">{Variable.lang.lang}</div>
            </div>
            <div data-type="posts" class="create_post_container">
              <If
                data={formInputs.textInputs.show}
                dataIf={
                  <div
                    class="create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={changeTextPost}
                  ></div>
                }
              />
              <If
                data={formInputs.mediaInputs.show}
                dataIf={
                  <div class="create_post_chapter createPostImage">
                    <Map
                      data={formInputs.mediaInputs.value}
                      dataIf={(item, index) => {
                        return (
                          <div class="create_post_photo_preview">
                            <img
                              class="fullsize media"
                              src={`/assets/upload/posts/${item.name}`}
                            />
                            {/* <div class="delete_post_media" style="display: block;">
                                                                <img src={svg["delete_icon"]} />
                                                            </div> */}
                          </div>
                        );
                      }}
                    />
                  </div>
                }
              />
            </div>
            <MediaButton
              onclickText={() => {
                formInputs.textInputs.show = true;
                initReload();
              }}
              onclickPhoto={function () {
                if (this.files.lenght == 0) {
                  return;
                }

                Variable.SetModals({
                  name: "ModalCropImage",
                  data: { file: this.files[0] },
                });

                uploadMedia(
                  this.files[0],
                  "posts",
                  async function () {
                    formInputs.mediaInputs.show = true;
                    let tmp = JSON.parse(this.response);
                    let type = tmp.mimetype.split("/")[0];
                    let obj = { aspect: "1", type, name: tmp.name };
                    formInputs.mediaInputs.value.push(obj);
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
                    console.log(
                      "=3c5fa7= ",
                      "Загружено",
                      e.loaded,
                      "из",
                      contentLength
                    );
                  }
                );
                formInputs.isValid = true;
              }}
              onclickVideo={function () {
                if (this.files.lenght == 0) {
                  return;
                }
                uploadMedia(
                  this.files[0],
                  "posts",
                  async function () {
                    formInputs.mediaInputs.show = true;
                    let tmp = JSON.parse(this.response);
                    let type = tmp.mimetype.split("/")[0];
                    let obj = { aspect: undefined, type, name: tmp.name };

                    formInputs.mediaInputs.value.push(obj);
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
                    console.log(
                      "=3c5fa7= ",
                      "Загружено",
                      e.loaded,
                      "из",
                      contentLength
                    );
                  }
                );
                formInputs.isValid = true;
              }}
              // onclickAudio={
              //     () => {
              //         console.log('=937776=', "onclickAudio")
              //     }
              // }
              // onclickMic={
              //     () => {
              //         console.log('=937776=', "onclickMic")
              //     }
              // }
            />
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="abusive"
                  class="checkbox__input complain_checkbox"
                  onchange={(e) => {
                    formInputs.forFriends = e.target.checked;
                  }}
                  type="checkbox"
                />
                <label class="checkbox__label">
                  {Variable.lang.span.forFriends}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div style={"display:flex; width: 500px; margin: 20px auto"}>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !formInputs.isValid ? "c-button--inactive" : "",
                ]}
                style="margin-right: 30px"
                type="button"
                //   onClick={sendQuestion}
              >
                <span class="c-button__text">
                  {Variable.lang.button.pre_view}
                </span>
              </button>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !formInputs.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                onClick={sendPost}
              >
                <span class="c-button__text">
                  {Variable.lang.button.create}
                </span>
              </button>
            </div>
          </form>
        </div>
      );
    }
  );
};

export default start;
