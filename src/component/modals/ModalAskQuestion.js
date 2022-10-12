import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

let formInputs;

const changeInput = function (e) {
  let type = e.target.dataset.type;
  let value = e.target.value.trim();
  formInputs[type].error = "";
  formInputs[type].value = value;

  if (formInputs[type].value.length === 0) {
    formInputs[type].error = Variable.lang.error_div.not_empty_input;
  } else if (formInputs[type].value.length < 5) {
    formInputs[type].error = Variable.lang.error_div.minSymbol;
  } else if (formInputs[type].value.length > 200) {
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
      text: "", //Ispravitb
      title: formInputs.question.value,
    },
  };
  if(formInputs.textQuestion.value !== ""){
    console.log('=f95e32=',Переменная)
  }
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
  formInputs.textQuestion.value = e.target.innerText.trim();
  console.log('=formInputs.textQuestion.value=',formInputs.textQuestion.value)
};







const ModalAskQuestion = function (data, reload) {
  if (!reload) {
    formInputs = {
      language: {
        value:
          Variable.myInfo.country.eng_name +
          ` (${Variable.myInfo.country.orig_name})`,
        code: "",
      },
      question: {
        value: "",
        error: "",
      },
      textQuestion: {
        value: "",
        show:false
      },
      isValid: false,
    };
  }

  return (
    <div class="c-modal c-modal--open" id="ModalAskQuestion">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* <h2 class="c-modal__title">{Variable.lang.h.modal_question}</h2> */}
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
          <div class="modal fade" id="Ask">
            <div class="modal-content">
              <div class="ask_question">
                <h4>{Variable.lang.h.modal_question}</h4>
                <form id="askQuestion" onsubmit={sendQuestion}>
                  <input style="display: none;" type="submit" />
                  <div class="ask_question_tags">
                    <label for="addTagInput">{Variable.lang.label.lang}</label>
                    <div style="display: none;" class="error-div">
                      {Variable.lang.error_div.selectFromList}
                    </div>
                    <div class="language_select_wrapper">
                      <input
                        readonly
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
                  <div>
                    <label for="questionText">
                      {Variable.lang.label.question}
                    </label>
                    <div class="error-div">
                      <div class="error-div-variant">
                        {formInputs.question.error}
                      </div>
                    </div>
                    <div class="create_post_container" data-type="question">
                      <input
                        type="text"
                        data-type="question"
                        oninput={changeInput}
                        class="create_post_chapter create_post_title"
                        placeholder={Variable.lang.placeholder.titleAsk}
                        value={formInputs.question.value}
                      />
                      <div
                        style = {`display: ${formInputs.textQuestion.show ? "block" : "none"}`}
                        contenteditable="true"
                        oninput={changeTextQuestion}
                        class="create_post_chapter create_post_main_text"
                      ></div>
                    </div>

                    <div class="create_post_control_block">
                      <div
                        data-page_type="question"
                        data-type="text"
                        data-action="createPostAddMediaBlock"
                        class="create_post_control_item"
                        onclick = {() => {
                            if(formInputs.textQuestion.show === true){return}else{
                                formInputs.textQuestion.show = true;
                                initReload("modals")
                            }
                        }}
                      >
                        <img src={svg["post_text"]} />
                      </div>
                      <div
                        data-page_type="question"
                        data-type="image"
                        data-action="createPostAddMediaBlock"
                        class="createPostImageCreator create_post_control_item"
                      >
                        <img src={svg["post_photo"]} />
                      </div>
                      <div
                        data-page_type="question"
                        data-type="video"
                        data-action="createPostAddMediaBlock"
                        class="createPostVideoCreator create_post_control_item"
                      >
                        <img src={svg["post_video"]} />
                      </div>
                      <div
                        data-page_type="question"
                        data-type="audio"
                        data-action="createPostAddMediaBlock"
                        class="createPostAudioCreator create_post_control_item"
                      >
                        <img src={svg["post_audio"]} />
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <input
                      data-type="question"
                      style="display: none;"
                      class="createPostImageInput"
                      onchange="createPostUploadImage(this)"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                  <div>
                    <input
                      data-type="question"
                      style="display: none;"
                      class="createPostVideoInput"
                      onchange="createPostUploadVideo(this)"
                      type="file"
                      accept=".mp4,.avi,.mov,.mkv,.avi,.flv"
                    />
                  </div>
                  <div>
                    <input
                      data-type="question"
                      style="display: none;"
                      class="createPostAudioInput"
                      onchange="createPostUploadAudio(this)"
                      type="file"
                      accept=".mp3,.wav,.aiff,.aac,.ogg,.wma"
                    />
                  </div> */}

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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalAskQuestion;