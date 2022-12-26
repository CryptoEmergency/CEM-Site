import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
  Helpers,
  init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { MediaButton, MediaPreview, Input } from '@component/element/index.js';
import svg from '@assets/svg/index.js';
let inputImg, inputVideo, inputAudio, selectAspect;

const changeInput = function (Static,e) {
 
  if (e.length == 0) {
    Static.question.error = Variable.lang.error_div.not_empty_input;
  } else if (e.length < 5) {
    Static.question.error = Variable.lang.error_div.minSymbol;
  } else if (e.length > 500) {
    Static.question.error = Variable.lang.error_div.maxSymbol;
  }else if(e.length>=5 && e.length<=500 && e.length!== 0)
  { 
   
    if(e.trim().length > 4 && e.trim()!=="")
    {
      Static.question.error = ""
    }
    else{
      Static.question.error = Variable.lang.error_div.not_empty_input; 
    }
  
  }
  if (Static.question.error == "") {
    Static.isValid = true;
  } else {
    Static.isValid = false;
  }
  initReload();
};

const sendQuestion = async function (Static) {

  if (!Static.isValid) {
    return false;
  }


  let data = {
    value: {
      languages: Static.language.code,
      media: Static.mediaInputs.value,
      text: Static.textQuestion.value,
      title: Static.question.value,
    },
  };

  let tmpRes = await sendApi.create("setQuestions", data);

  if (tmpRes.status == "ok") {
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


const sendPhoto = async function (Static,crooper) {
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
      "question",
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
  fn.uploadMedia(
    files[0],
    "question",
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

const ModalAskQuestion = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })


/*
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
*/
  
  init(
    () => {
      fn.initData.ModalAskQuestion(Static)


      Static = {
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
          show: true,
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
      
  
    },
    () => {
      let close = true

      return (
        <div class="c-modal c-modal--open" id="ModalAskQuestion" onclick={function(e){ if(close){ 
  
          fn.modals.close(ID)
        }}}>
          <section class="c-modal__dialog" onmouseover={function(){
           
            close = false

          }}
            onmouseout={function(){
              
              close = true
     
            }}
            >
            <header class="c-modal__header">
              <h4 class="c-modal__title">{Variable.lang.h.modal_question}</h4>
              <button
                type="button"
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
            </header>
            <div class="c-modal__body" >
              <div class="c-askquestion">
                {/* <form id="askQuestion" onsubmit={sendQuestion}> */}
           
                  {/* <input style="display: none;" type="submit" /> */}
                  <div
                    class="alt_language_change"
                    onclick={() => {

                      fn.modals.ModalChangeLanguage({
                        
                        onclick: (code, name, orig) => {
                       
                          Static.language.value = name + ` (${orig})`;
                          Static.language.code = code;
                        }
                      }, true)
                    }}>
                    {Static.language.value}
                  </div>

                  <div class="c-askquestion__textblock c-form__block">
                    <label class="c-form__label" for="questionText">
                      {Variable.lang.label.question}
                    </label>
                    <div class="c-form__errormsg error-div">
                      {Static.question.error}
                    </div>
                    <div class="c-form__wrapfield create_post_container" data-type="question">
                      <input
                        type="text"
                        data-type="question"
                        oninput={function(e){
                          Static.question.value = this.value
                          changeInput(Static,this.value)}}
                        class="c-form__field create_post_chapter create_post_title"
                        placeholder={Variable.lang.placeholder.titleAsk}
                        value={Static.question.value}
                      />
                      {/* Вставлять блок по условию выбора текстового вопроса (<If />), иначе едет верстка */}
                      {() => {
                        if (Static.textQuestion.show) {
                          return (
                            <div
                              contenteditable="true"
                              oninput={function(){

                  
                                Static.textQuestion.value = this.textContent;
                          
                               }}
                        
                              class="c-form__field create_post_chapter create_post_main_text"
                            ></div>
                          )
                        }
                      }}

                      {
                      
                      () => {
                        if (Static.mediaInputs.show && Static.mediaInputs.value.length) {
                          return (
                            <div class="create_post_chapter createPostImage">
                              {
                                Static.mediaInputs.value.map(
                                  (item, index) => {
                                    if (item.type != "audio") {
                                      return (
                                        <MediaPreview
                                          item={item}
                                          index={index}
                                          type="question"
                                          Static={Static}
                                        />
                                      );
                                    }
                                  }
                                )
                              }
                            </div>
                          )
                        }
                        else
                        {
                          null
                        }
                      }
                      
                      }

                      {() => {
                        if (Static.mediaInputs.show && Static.mediaInputs.value.length && Static.mediaInputs.value.filter((item) => item.type == "audio").length) {
                          return (
                            <div class="create_post_chapter createPostAudio">
                              {
                                Static.mediaInputs.value.map(
                                  (item, index) => {
                                    if (item.type == "audio") {
                                      return (
                                        <MediaPreview
                                          item={item}
                                          index={index}
                                          type="question"
                                          Static={Static}
                                        />
                                      );
                                    }
                                  }
                                )
                              }
                            </div>
                          )
                        }
                      }}

                    </div>
                  </div>
                  {/* <div class="c-askquestion__controls create_post_control_block"> */}
                  <MediaButton

                    // onclickText={function () {
                    //   if (Static.textQuestion.show === true) {
                    //     return;
                    //   } else {
                    //     Static.textQuestion.show = true;
                    //     initReload("modals");
                    //   }
                    // }}

                    onclickPhoto={function () {
                   
                      if (this.files.length == 0) {
                        return;
                      }
                      fn.modals.ModalCropImage({
                        file: this.files[0],
                        typeUpload: 'question',
                        arrMedia: Static.mediaInputs.value,
                        aspectSelect: Static.mediaInputs.selectAspect,
                        uploadCropImage: async function (cropper) {
                          await sendPhoto(Static,cropper)
                          return;
                        }
                      },ID)
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
                  />
             
              </div>
            </div>
            <div class="c-modal__footer">
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                // ref={elemButton}
                onClick={function(){sendQuestion(Static)}}
              >
                <span class="c-button__text">
                  {Variable.lang.button.send}
                </span>
              </button>
            </div>
          </section>
        </div>
      );
    }, ID
  )



};

export default ModalAskQuestion;
