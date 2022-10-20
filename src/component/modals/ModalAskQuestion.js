import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
  Helpers,
} from "@betarost/cemjs";

import { wrapTextWithATag, uploadMedia } from "@src/functions.js";
import { If, Map } from "@component/helpers/All.js";
import { MediaButton, MediaPreview } from '@component/element/index.js';
import svg from '@assets/svg/index.js';
let formInputs, inputImg, inputVideo, inputAudio, selectAspect;

const changeInput = function (e) {
  let type = e.target.dataset.type;
  let value = e.target.value.trim();
  formInputs[type].error = "";
  formInputs[type].value = value;

  if (formInputs[type].value.length === 0) {
    formInputs[type].error = Variable.lang.error_div.not_empty_input;
  } else if (formInputs[type].value.length < 5) {
    formInputs[type].error = Variable.lang.error_div.minSymbol;
  } else if (formInputs[type].value.length > 500) {
    formInputs[type].error = Variable.lang.error_div.maxSymbol;
  }

  if (formInputs[type].error === "") {
    formInputs.isValid = true;
  } else {
    formInputs.isValid = false;
  }
  initReload("modals");
};

const sendQuestion = async function (e) {
  e.preventDefault();
  if (!formInputs.isValid) {
    return false;
  }


  let data = {
    value: {
      languages: formInputs.language.code,
      media: formInputs.mediaInputs.value,
      text: formInputs.textQuestion.value,
      title: formInputs.question.value,
    },
  };
  let tmpRes = await sendApi.create("setQuestion", data);

  if (tmpRes.status === "ok") {
    Variable.DelModals("ModalAskQuestion");
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

const changeTextQuestion = (e) => {
  let text = wrapTextWithATag(e.target.innerText.trim());
  formInputs.textQuestion.value = text;
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
    uploadMedia(
      blob,
      "question",
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
        console.log("=3c5fa7= ", "Загружено", e.loaded, "из", contentLength);
      }
    );
    initReload("modals");
    Variable.DelModals("ModalCropImage");
  });
  return
}

const sendVideo = async function (files) {
  uploadMedia(
    files[0],
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
  return
}

const ModalAskQuestion = function (data, reload) {
  if (!reload) {
    formInputs = {
      language: {
        value:
          Variable.myInfo.mainLanguage.eng_name +
          ` (${Variable.myInfo.country.orig_name})`,
        code: Variable.myInfo.mainLanguage.code,
      },
      question: {
        value: "",
        error: "",
      },
      textQuestion: {
        value: "",
        show: false,
      },
      mediaInputs: {
        value: [],
        show: false,
        selectAspect: null,
      },
      isValid: false,
    };

    inputImg = Variable.setRef();
    inputVideo = Variable.setRef();
    inputAudio = Variable.setRef();

    selectAspect = null;

  }

  const downloadFile = (e) => {
    let type;
    if (e.target.localName === "div") {
      type = e.target.dataset.type;
    } else {
      type = e.target.parentElement.dataset.type;
    }
    if (type === "image") {
      inputImg().click();
    } else if (type === "video") {
      inputVideo().click();
    } else {
      inputAudio().click();
    }
  };

  const test = (e) => {
    console.log('=5ce284=', e)
  }

  return (
    <div class="c-modal c-modal--open" id="ModalAskQuestion">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* <h2 class="c-modal__title">{Variable.lang.h.modal_question}</h2> */}
          <h4 class="c-modal__title">{Variable.lang.h.modal_question}</h4>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.DelModals("ModalAskQuestion");
              initReload("modals");
            }}
          ></button>
        </header>
        <div class="c-modal__body">
          <div class="c-askquestion ask_question">
            <form id="askQuestion" onsubmit={sendQuestion}>
              <input style="display: none;" type="submit" />
              <div class="c-askquestion__lang c-form__block ask_question_tags">
                <label class="c-form__label" for="addTagInput">{Variable.lang.label.lang}</label>
                <div style="display: none;" class="c-form__errormsg error-div">
                  {Variable.lang.error_div.selectFromList}
                </div>
                <div class="c-form__wrapfield language_select_wrapper">
                  <input
                    readonly
                    class="c-form__field"
                    id="language_search"
                    type="text"
                    autocomplete="off"
                    value={formInputs.language.value}
                    placeholder={Variable.lang.error_div.selectFromList}
                    onclick={() => {
                      Variable.SetModals(
                        {
                          name: "ModalChangeLanguage",
                          data: {
                            onclick: (code, name, orig) => {
                              formInputs.language.value =
                                name + ` (${orig})`;
                              formInputs.language.code = code;
                            },
                          },
                        },
                        true
                      );
                    }}
                  />
                </div>
              </div>
              <div class="c-askquestion__textblock c-form__block">
                <label class="c-form__label" for="questionText">
                  {Variable.lang.label.question}
                </label>
                <div class="c-form__errormsg error-div">
                  {formInputs.question.error}
                </div>
                <div class="c-form__wrapfield create_post_container" data-type="question">
                  <input
                    type="text"
                    data-type="question"
                    oninput={changeInput}
                    class="c-form__field create_post_chapter create_post_title"
                    placeholder={Variable.lang.placeholder.titleAsk}
                    value={formInputs.question.value}
                  />
                  {/* Вставлять блок по условию выбора текстового вопроса (<If />), иначе едет верстка */}
                  <If
                    data={formInputs.textQuestion.show}
                    dataIf={<div
                      contenteditable="true"
                      oninput={changeTextQuestion}
                      class="c-form__field create_post_chapter create_post_main_text"
                    ></div>}
                    dataElse={<></>}
                  />
                  <If
                    data={formInputs.mediaInputs.show && formInputs.mediaInputs.value.length}
                    dataIf={
                      <div class="create_post_chapter createPostImage">
                        <Map
                          data={formInputs.mediaInputs.value}
                          dataIf={(item, index) => {
                            if (item.type != "audio") {
                              return (
                                <MediaPreview
                                  item={item}
                                  index={index}
                                  type="question"
                                  formInputs={formInputs}
                                />
                              );
                            }
                          }}
                        />
                      </div>
                    }
                  />
                  <If
                    data={formInputs.mediaInputs.show && formInputs.mediaInputs.value.length && formInputs.mediaInputs.value.filter((item) => item.type == "audio").length}
                    dataIf={
                      <div class="create_post_chapter createPostAudio">
                        <Map
                          data={formInputs.mediaInputs.value}
                          dataIf={(item, index) => {
                            if (item.type == "audio") {
                              return (
                                <MediaPreview
                                  item={item}
                                  index={index}
                                  type="question"
                                  formInputs={formInputs}
                                />
                              );
                            }
                          }}
                        />
                      </div>
                    }
                  />
                </div>
              </div>
              {/* <div class="c-askquestion__controls create_post_control_block"> */}
              <MediaButton

                onclickText={function () {
                  if (formInputs.textQuestion.show === true) {
                    return;
                  } else {
                    formInputs.textQuestion.show = true;
                    initReload("modals");
                  }
                }}

                onclickPhoto={function () {
                  if (this.files.length == 0) {
                    return;
                  }

                  Variable.SetModals({
                    name: "ModalCropImage",
                    data: {
                      file: this.files[0],
                      typeUpload: 'question',
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
        </div>
        <div class="c-modal__footer">
          <button
            class={[
              "c-button c-button--gradient2",
              !formInputs.isValid ? "c-button--inactive" : "",
            ]}
            type="button"
            // ref={elemButton}
            onClick={sendQuestion}
          >
            <span class="c-button__text">
              {Variable.lang.button.send}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalAskQuestion;
