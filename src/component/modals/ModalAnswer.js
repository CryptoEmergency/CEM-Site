import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  sendApi,
  Helpers,
  init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { MediaButton, MediaPreview } from '@component/element/index.js';

let formInputs;
let elem = Variable.setRef()

const changeTextAnswer = (e) => {
  // let text = wrapTextWithATag(e.target.innerText.trim());
  let text = e.target.innerText.trim();
  formInputs.textAnswer.error = "";


  if (text.length === 0) {
    formInputs.textAnswer.error = Variable.lang.error_div.not_empty_input;
  } else if (text.length < 5) {
    formInputs.textAnswer.error = Variable.lang.error_div.minSymbol;
  } else if (text.length > 2000) {
    formInputs.textAnswer.error = Variable.lang.error_div.maxSymbol;
  }
  formInputs.textAnswer.value = Helpers.editText(text, { clear: true })
  // wrapTextWithATag(text);
  if (formInputs.textAnswer.error === "") {
    formInputs.isValid = true;
  } else {
    formInputs.isValid = false;
  }
  initReload("modals");
};

const sendAnswer = async function (e, res) {
  e.preventDefault();
  if (!formInputs.isValid) {
    return false;
  }

  let mediaArr = [];
  let data = {
    value: {
      media: formInputs.mediaInputs.value,
      questionId: res.item._id,
      text: formInputs.textAnswer.value,
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

const sendPhoto = async function (crooper) {
  if (!crooper) {
    return
  }
  let canvas;
  formInputs.mediaInputs.selectAspect = crooper.options.aspectRatio;
  canvas = crooper.getCroppedCanvas({
    // width: 166,
    // height: 166,
  });

  await canvas.toBlob(function (blob) {
    fn.uploadMedia(
      blob,
      "answers",
      async function () {
        formInputs.mediaInputs.show = true;
        if (!this.response) {
          return
        }
        let response = JSON.parse(this.response);
        formInputs.mediaInputs.value.push({
          aspect: formInputs.mediaInputs.selectAspect,
          type: response.mimetype.split("/")[0],
          name: response.name
        });
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
        // console.log("=3c5fa7= ", "Загружено", e.loaded, "из", contentLength);
      }
    );
    initReload("modals");
    Variable.DelModals("ModalCropImage");
  });
  return
}

const sendVideo = async function (files) {
  fn.uploadMedia(
    files[0],
    "answers",
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
  init(
    () => {
      Variable.OutHideWindows.push([elem, "ModalAnswer"])
      formInputs = {
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
        <div class="c-modal c-modal--open" id="ModalAnswer" onclick={function(e){ if(close){ 
  
					fn.modals.close(ID)
				  }}}>
          <section class="c-modal__dialog"  onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
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
                  <div class="error-div-variant">{formInputs.textAnswer.error}</div>
                </div>
                <div data-type="answers" class="create_post_container">
                  <div
                    class="c-chapter create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={changeTextAnswer}
                  ></div>
                  {() => {
                    if (formInputs.mediaInputs.show && formInputs.mediaInputs.value.length) {
                      return (
                        <div class="create_post_chapter createPostImage">
                          {
                            formInputs.mediaInputs.value.map((item, index) => {
                              if (item.type != "audio") {
                                return (
                                  <MediaPreview
                                    item={item}
                                    index={index}
                                    type="answers"
                                    formInputs={formInputs}
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
                    if (formInputs.mediaInputs.show && formInputs.mediaInputs.value.length && formInputs.mediaInputs.value.filter((item) => item.type == "audio").length) {
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
                            formInputs.mediaInputs.value.map((item, index) => {
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
                        arrMedia: formInputs.mediaInputs.value,
                        aspectSelect: formInputs.mediaInputs.selectAspect,
                        uploadCropImage: async function (cropper) {
                          await sendPhoto(cropper)
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
                  !formInputs.isValid ? "c-button--inactive" : "",
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
