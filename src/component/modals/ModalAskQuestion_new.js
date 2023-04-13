import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  sendApi,
  Helpers,
  Data,
  load
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/export.js';
import { MediaButton, MediaPreview, InputDiv } from '@component/element/index.js';
import svg from '@assets/svg/index.js';

const sendFile = function (file, type, onload, onprogress, xhr) {
  let nameFile = "file.png"
  if (file.name) {
    nameFile = file.name
  }
  const formData = new FormData()
  formData.append('media', file, nameFile);

  xhr = new XMLHttpRequest()
  xhr.open('POST', `/upload/${type}/`)
  xhr.onload = onload
  xhr.upload.onprogress = onprogress

  xhr.send(formData)
}

const ModalAskQuestion = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "ModalAskQuestion" })

  load({
    ID,
    fnLoad: async () => {
      let close

    },
    fn: () => {
      console.log('=42e332=', Static)
      return (
        <div class="c-modal c-modal--open"
          id="ModalAskQuestion"
          onclick={() => {
            if (close) {
              fn.modals.close(ID)
            }
          }}
        >
          <section class="c-modal__dialog"
            onmouseover={function () {
              close = false
            }}
            onmouseleave={function () {
              close = true
            }}
          >
            <header class="c-modal__header">
              <h2 class="c-modal__title">
                {Variable.lang.h.modal_question}
              </h2>
              <button
                class="c-modal__close c-modal__close--new"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
            </header>
            <div class="c-modal__body">
              <div class="c-askquestion-new">
                <div
                  class="c-mediabtn__action c-mediabtn__action--lang"
                  onclick={() => {
                    fn.modals.ModalChangeLanguage({
                      onclick: (code, name, orig) => {
                        Static.forms.language.name = name
                        Static.forms.language.orig = orig
                        Static.forms.language.code = code;
                      }
                    }, true)
                  }}>
                  {Static.forms.language.code}
                </div>
                <div class="c-mediabtn__action"
                  onclick={() => {
                    Static.elInputImg.click()
                  }}
                >
                  <img class="c-mediabtn__icon" src={svg["post_photo"]} />
                  <input
                    type="file"
                    hidden
                    multiple
                    Element={($el) => {
                      Static.elInputImg = $el
                    }}
                    onchange={async function (e) {
                      e.stopPropagation();
                      Array.from(this.files).forEach((item) => {
                        sendFile(
                          item,
                          "worldPress",
                          async function () {
                            if (!this.response) {
                              alert("Произошла ошибка Попробуйте еще раз")
                              return
                            }
                            let response = JSON.parse(this.response);
                            let data = {
                              type: response.mimetype,
                              name: response.name
                            }
                            Static.forms.media.push(data)
                            // updateRecords({ media: Static.item.media })
                            initReload()
                          },
                        )
                      })
                      initReload()
                    }}
                  />
                </div>
                <div class="c-mediabtn__action">
                  <img class="c-mediabtn__icon" src={svg["post_video"]} />
                  <input
                    type="file"
                    hidden
                    multiple
                    Element={($el) => {
                      Static.elInputImg = $el
                    }}
                    onchange={async function (e) {
                      e.stopPropagation();
                      Array.from(this.files).forEach((item) => {

                      })
                      initReload()
                    }}
                  />
                </div>
                {/* <MediaButton
                  className="c-mediabutton"
                  onclickPhoto={function () {

                    if (this.files.length == 0) {
                      return;
                    }
                    fn.modals.ModalCropImage({
                      file: this.files[0],
                      typeUpload: 'question',
                      arrMedia: Static.forms.mediaInputs.value,
                      aspectSelect: Static.forms.mediaInputs.selectAspect,
                      uploadCropImage: async function (cropper) {
                        await sendPhoto(Static, cropper)
                        return;
                      }
                    }, ID)
                    this.value = '';
                  }}

                  onclickVideo={function () {
                    if (this.files.length == 0) {
                      return;
                    }
                    sendVideo(Static, this.files)
                    this.value = '';
                    return;
                  }}
                /> */}
              </div>
              <InputDiv
                class={["input-div input-div__question"]}
                title="Ваш вопрос"
                placeholder="Описание вопроса"
                oninput={async function () {
                  Static.forms.textQuestion = this.innerText.trim();
                  initReload("modals")
                }}
              />
              {/* {() => {
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
              }} */}
            </div>
          </section>
        </div>
      )
    }
  })
}

export default ModalAskQuestion;