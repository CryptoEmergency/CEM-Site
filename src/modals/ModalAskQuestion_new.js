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

const checForm = async function (Static) {
  // console.log('=c35305= checForm', Data.MStatic)
  if (!Static.forms.textQuestion.valid) {
    Static.forms.isValid = false
    return
  }
  Static.forms.isValid = true
  // initReload()
}

const sendQuestion = async function (Static, ID) {
  if (!Static.forms.isValid) {
    return false
  }

  let response = await fn.socket.set({
    method: "Questions", action: "insert", params: {
      insert: {
        title: Static.forms.textQuestion.val,
        languages: {
          code: Static.forms.language.code,
          eng_name: Static.forms.language.name,
          orig_name: Static.forms.language.orig,
        },
        media: Static.forms.media,
        author: Variable.myInfo._id
      }
    }
  })
  // console.log('=b0bcbb=', response)

  if (!response || !response._id) {
    alert("error")
    return
  }

  fn.modals.close(ID)
  initReload()
}

const changeFontSize = function (fontSize, Static) {
  Static.listSize = false

  Static.elEditor.execCommand('bold');
  initReload()

  // console.log('=accb6f=', window.getSelection().toString())
  // if (window.getSelection() == '') {
  //   return false;
  // }
  // console.log('=869f42=',"Переменная")
  // var range = window.getSelection().getRangeAt(0);
  // var selectionContents = range.extractContents();
  // let spanElement;
  // if (selectionContents.childNodes.length == 1 && selectionContents.childNodes[0].nodeName == "#text") {
  //   spanElement = document.createElement("span");
  //   spanElement.setAttribute("style", `font-size: ${fontSize}px`);
  //   spanElement.appendChild(selectionContents);
  //   range.insertNode(spanElement);
  // } else {
  //   spanElement = selectionContents.firstElementChild.style.fontSize = `${fontSize}px`
  //   range.insertNode(selectionContents);
  // }
  // clearEmptyTag(Static)
};

const clearEmptyTag = function (Static) {
  let inds = []
  console.log('=d7158c=', Static.elEditor.children)
  let emptyEl = Array.from(Static.elEditor.children).filter((item, index) => {
    if (item.innerHTML == "" && item.tagName != "IMG") {
      inds.push(index)
      return item;
    }
  })
  if (emptyEl.length) {
    emptyEl.forEach((item, i) => {
      item.parentElement.removeChild(item.parentElement.children[inds[i]])
    })
  }
  console.log('=1bfa1f= emptyElements =',emptyEl)
};

const ModalAskQuestion = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "ModalAskQuestion" })

  Static.listSize = false

  load({
    ID,
    fnLoad: async () => {
      Static.activeFiletype = null

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
                  class="c-mediabtn__action c-mediabtn__action--small c-mediabtn__action--lang"
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
                <div class="c-mediabtn__action c-mediabtn__action--small"
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
                        fn.uploadMedia(
                          item,
                          "question",
                          async function () {
                            if (!this.response) {
                              alert("Произошла ошибка Попробуйте еще раз")
                              return
                            }
                            let response = JSON.parse(this.response);
                            Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"
                            let data = {
                              type: Static.activeFiletype,
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
                <div class="c-mediabtn__action c-mediabtn__action--small"
                  onclick={() => {
                    Static.elInputVideo.click()
                  }}
                >
                  <img class="c-mediabtn__icon" src={svg["post_video"]} />
                  <input
                    type="file"
                    hidden
                    multiple
                    Element={($el) => {
                      Static.elInputVideo = $el
                    }}
                    onchange={async function (e) {
                      e.stopPropagation();
                      Array.from(this.files).forEach((item) => {
                        fn.uploadMedia(
                          item,
                          "question",
                          async function () {
                            if (!this.response) {
                              alert("Произошла ошибка Попробуйте еще раз")
                              return
                            }
                            let response = JSON.parse(this.response);
                            Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"
                            let data = {
                              type: Static.activeFiletype,
                              name: response.name
                            }
                            Static.forms.media.push(data)
                            initReload()
                          },
                        )
                      })
                      initReload()
                    }}
                  />
                </div>
                <div class="modal-question__size">
                  <div class="c-mediabtn__action c-mediabtn__action--small"
                    onclick={() => {
                      Static.listSize ? Static.listSize = false : Static.listSize = true
                      initReload()
                    }}
                  >
                    <img src={svg["text-size"]} />
                  </div>
                  {() => {
                    if (Static.listSize) {
                      return (
                        <ul
                          class="modal-question__size-list"
                          // Element={($el) => { Static.listFontSize = $el }}
                        >
                          <li
                            onclick={function () {
                              console.log('=da343e=', Static.elEditor)
                              Static.elEditor.execCommand('bold');
                              initReload()
                              // changeFontSize(14, Static)
                            }}
                          >
                            <span>{Variable.lang.span.smallFont}</span>
                          </li>
                          <li
                            onclick={function () {
                              changeFontSize(16, Static)
                            }}
                          >
                            <span>{Variable.lang.span.mediumFont}</span>
                          </li>
                          <li
                            onclick={function () {
                              changeFontSize(18, Static)
                            }}
                          >
                            <span>{Variable.lang.span.largeFont}</span>
                          </li>
                        </ul>
                      )
                    }
                  }}
                  
                </div>
              </div>
              <InputDiv
                class={["input-div input-div__question",
                  Static.forms.textQuestion.error ? "input-div--error" : null,
                  Static.forms.textQuestion.valid ? "input-div--correctly" : null
              ]}
                contenteditable="plaintext-only"
                Element={($el) => {
                  Static.elEditor = $el
                }}
                error={Static.forms.textQuestion.error}
                placeholder="Ваш вопрос"
                oninput={async function () {
                  Static.forms.textQuestion.val = this.innerText.trim();
                  [Static.forms.textQuestion.error, Static.forms.textQuestion.valid] = await fn.ValidateForms.textQuestion(Static.forms.textQuestion.val)
                  checForm(Static)
                  initReload("modals")
                }}
              />

                {() => {
                  if (Static.forms?.media?.length > 0) {
                    return (
                      <div class="modal-question__preview modal-question__field">
                        {Static.forms.media.map((item, index) => {
                          return (
                            <div class="modal-question__preview-item">
                              {item?.type == "image" ? 
                                <img src={`/assets/upload/question/${item.name}`}/> 
                                : 
                                <video src={`/assets/upload/question/${item.name}`}></video>
                              }
                              
                              <div
                                class="modal-question__preview-delete"
                                onClick={() => {
                                  Static.forms.media.splice(index, 1);
                                  initReload()
                                }}
                              >
                                <img src={svg["close_question"]} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
                }}
            </div>
            <div class="c-modal__footer">
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.forms.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                // onClick={function () { sendQuestion(Static) }}
                onclick={async () => {
                  sendQuestion(Static, ID)
                  // console.log('=93dfe3=', Static)
                }}
              >
                <span class="c-button__text">
                  {Variable.lang.button.send}
                </span>
              </button>
            </div>
          </section>
        </div>
      )
    }
  })
}

export default ModalAskQuestion;