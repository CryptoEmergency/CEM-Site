import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  sendApi,
  Helpers,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { MediaButton, MediaPreview } from '@component/element/index.js';

// let formInputs;
let elem = Variable.setRef()



const sendPhoto = async function (Static, crooper) {
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
      "answers",
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
        };
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
  });
  return
}

const sendVideo = async function (files) {
  fn.uploadMedia(
    files[0],
    "answers",
    async function () {
      Static.mediaInputs.show = true;
      let tmp = JSON.parse(this.response);
      let type = tmp.mimetype.split("/")[0];
      let obj = { aspect: undefined, type, name: tmp.name };

      Static.mediaInputs.value.push(obj);
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
      // console.log(
      //   "=3c5fa7= ",
      //   "Загружено",
      //   e.loaded,
      //   "из",
      //   contentLength
      // );
    }
  );
  return
}


const ModalAnswer = function (data, ID) {
  let Static = fn.GetParams({ data, ID })
  let close = true

  const changeTextAnswer = (e) => {
    // let text = wrapTextWithATag(e.target.innerText.trim());
    let text = e.target.innerText.trim();
    Static.textAnswer.error = "";
  
  
    if (text.length === 0) {
      Static.textAnswer.error = Variable.lang.error_div.not_empty_input;
    } else if (text.length < 5) {
      Static.textAnswer.error = Variable.lang.error_div.minSymbol;
    } else if (text.length > 2000) {
      Static.textAnswer.error = Variable.lang.error_div.maxSymbol;
    }
    Static.textAnswer.value = Helpers.editText(text, { clear: true })
    // wrapTextWithATag(text);
    if (Static.textAnswer.error === "") {
      Static.isValid = true;
    } else {
      Static.isValid = false;
    }
    initReload("modals");
  };
  
  const sendAnswer = async function (e, res) {
    e.preventDefault();
    if (!Static.isValid) {
      return false;
    }
  
    let mediaArr = [];
    let data = {
      value: {
        media: Static.mediaInputs.value,
        questionId: res.item._id,
        text: Static.textAnswer.value,
      }
    }
    let tmpRes = await sendApi.create("setAnswer", data);
    if (tmpRes.status === "ok") {
      res.onClose()
      Variable.DelModals("ModalAnswer");
  
      //initReload();
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
  init(
    () => {
      Variable.OutHideWindows.push([elem, "ModalAnswer"])
      Static = {
        textAnswer: {
          value: "",
          error: "",
          show: true,
        },
        mediaInputs: {
          value: [],
          show: false,
          selectAspect: null,
        },
        isValid: false,
      };
    },
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalAnswer" onclick={function (e) {
          if (close) {

            fn.modals.close(ID)
          }
        }}>
          <section class="c-modal__dialog" onmouseover={function () {

            close = false

          }}
            onmouseleave={function () {

              close = true

            }}>
            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modal_answer}</h2>
              <button
                type="button"
                class="c-modal__close"
                onclick={() => {
                  Variable.DelModals("ModalAnswer");
                  initReload("modals");
                }}
              ></button>
            </header>
            <div class="c-modal__body">
              <form id="createPostForm" onsubmit={(e) => sendAnswer(e, data)} >
                <input style="display: none;" type="submit" />
                <div class="error-div">
                  <div class="error-div-variant">{Static.textAnswer.error}</div>
                </div>
                <div data-type="answers" class="create_post_container">
                  <div
                    class="c-chapter create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={changeTextAnswer}
                  ></div>
                  {() => {
                    if (Static.mediaInputs.show && Static.mediaInputs.value.length) {
                      return (
                        <div class="create_post_chapter createPostImage">
                          {
                            Static.mediaInputs.value.map((item, index) => {
                              if (item.type != "audio") {
                                return (
                                  <MediaPreview
                                    item={item}
                                    index={index}
                                    type="answers"
                                    // formInputs={formInputs}
                                    Static={Static}
                                  />
                                );
                              }
                            })
                          }
                        </div>
                      )
                    }
                  }}

                  {() => {
                    if (Static.mediaInputs.show && Static.mediaInputs.value.length && Static.mediaInputs.value.filter((item) => item.type == "audio").length) {
                      return (
                        <div class="create_post_chapter createPostAudio">
                          {/* <Map
                          data={formInputs.mediaInputs.value}
                          dataIf={(item, index) => {
                            if (item.type == "audio") {
                              return (
                                <MediaPreview
                                  item={item}
                                  index={index}
                                  type="answers"
                                  formInputs={formInputs}
                                />
                              );
                            }
                          }}
                        /> */}
                          {
                            Static.mediaInputs.value.map((item, index) => {
                              if (item.type == "audio") {
                                return (
                                  <MediaPreview
                                    item={item}
                                    index={index}
                                    type="answers"
                                    // formInputs={formInputs}
                                    Static={Static}
                                  />
                                );
                              }
                            })
                          }
                        </div>
                      )
                    }
                  }}
                </div>

                <MediaButton

                  // onclickText={function () {
                  //   if (formInputs.textAnswer.show === true) {
                  //     return;
                  //   } else {
                  //     formInputs.textAnswer.show = true;
                  //     initReload("modals");
                  //   }
                  // }}

                  onclickPhoto={function () {
                    if (this.files.length == 0) {
                      return;
                    }

                    Variable.SetModals({
                      name: "ModalCropImage",
                      data: {
                        file: this.files[0],
                        typeUpload: 'answers',
                        arrMedia: Static.mediaInputs.value,
                        aspectSelect: Static.mediaInputs.selectAspect,
                        uploadCropImage: async function (cropper) {
                          await sendPhoto(Static, cropper)
                          return;
                        }
                      },
                    }, true);
                    // formInputs.isValid = true;
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
                />

              </form>
            </div>
            <div class="c-modal__footer">
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                // ref={elemButton}
                onClick={(e) => sendAnswer(e, data)}
              >
                <span class="c-button__text">{Variable.lang.button.send}</span>
              </button>
            </div>
          </section>
        </div>
      );
    }, ID
  )

};

export default ModalAnswer;
