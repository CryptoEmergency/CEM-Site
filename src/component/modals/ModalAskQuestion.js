import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
  Helpers,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { wrapTextWithATag } from "@src/functions.js";
import { If } from "@component/helpers/All.js";

let formInputs, inputImg, inputVideo, inputAudio;

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

  let mediaArr = [];
  let data = {
    value: {
      languages: formInputs.language.code,
      media: mediaArr,
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
  console.log("=69011b=", text);
  formInputs.textQuestion.value = text;
};

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
      isValid: false,
    };

    inputImg = Variable.setRef();
    inputVideo = Variable.setRef();
    inputAudio = Variable.setRef();
  }

  const downloadFile = (e) => {
    let type;
    if (e.target.localName === "div") {
      type = e.target.dataset.type;
    } else {
      type = e.target.parentElement.dataset.type;
    }
    if (type === "image") {
      console.log("=6c4af5=", inputImg());
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
                  {/* <div
                    style={`display: ${formInputs.textQuestion.show ? "block" : "none"
                      }`}
                    contenteditable="true"
                    oninput={changeTextQuestion}
                    class="create_post_chapter create_post_main_text"
                  ></div> */}
                </div>
              </div>
              <div class="c-askquestion__controls create_post_control_block">
                <div
                  data-page_type="question"
                  data-type="text"
                  data-action="createPostAddMediaBlock"
                  class="c-askquestion__attachment"
                  onclick={() => {
                    if (formInputs.textQuestion.show === true) {
                      return;
                    } else {
                      formInputs.textQuestion.show = true;
                      initReload("modals");
                    }
                  }}
                >
                  <img src={svg["post_text"]} />
                </div>
                <div
                  data-page_type="question"
                  data-type="image"
                  data-action="createPostAddMediaBlock"
                  class="c-askquestion__attachment createPostImageCreator"
                  onclick={downloadFile}
                >
                  <img src={svg["post_photo"]} />
                </div>
                <div
                  data-page_type="question"
                  data-type="video"
                  data-action="createPostAddMediaBlock"
                  class="c-askquestion__attachment createPostVideoCreator"
                  onclick={downloadFile}
                >
                  <img src={svg["post_video"]} />
                </div>
                <div
                  data-page_type="question"
                  data-type="audio"
                  data-action="createPostAddMediaBlock"
                  class="c-askquestion__attachment createPostAudioCreator"
                  onclick={downloadFile}
                >
                  <img src={svg["post_audio"]} />
                </div>
              </div>
              <div>
                <input
                  data-type="question"
                  style="display: none;"
                  class="createPostImageInput"
                  onchange={test}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={inputImg}
                />
              </div>
              <div>
                <input
                  data-type="question"
                  style="display: none;"
                  class="createPostVideoInput"
                  // onchange="createPostUploadVideo(this)"
                  type="file"
                  accept=".mp4,.avi,.mov,.mkv,.avi,.flv"
                  ref={inputVideo}
                />
              </div>
              <div>
                <input
                  data-type="question"
                  style="display: none;"
                  class="createPostAudioInput"
                  // onchange="createPostUploadAudio(this)"
                  type="file"
                  accept=".mp3,.wav,.aiff,.aac,.ogg,.wma"
                  ref={inputAudio}
                />
              </div>

              {/* <div
                    class="button-container-preview inactive_form_button"
                    data-active="0"
                    data-action="askQuestionSend"
                    data-type="question"
                    type="button"
                  >
                    <a id="askQuestionSend" class="btn-ask">
                      <span>{Variable.lang.button.send}</span>
                    </a>
                  </div> */}
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
