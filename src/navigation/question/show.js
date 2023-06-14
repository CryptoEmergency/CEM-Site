import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload,
  load,
  Data,
  sendApi,
  Helpers,
  CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// import svg from '@assets/svg/index.js';
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment, MediaButton, MediaPreview } from "@elements/element/index.js";
import { BlockError404 } from '@elements/blocks/index.js';

const { svg, fn } = CEM

let elAnswerForm, elAnswerToggle, elText

const start = function (data, ID) {
  let [Static, item] = fn.GetParams({ data, ID, initData: "question_show" })

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

  const sendVideo = async function (Static, files) {
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
    // initReload("modals");
    initReload(ID);
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
      // Variable.DelModals("ModalAnswer");
      // Спрятать и очистить форму ответа

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

  load({
    ID,
    fnLoad: async () => {
      // fn.initData.question_show(Static)
      if (!Static.openModals || !item.author) {
        item = await fn.restApi.getQuestions({ filter: { _id: item._id }, firstRecord: true })
      }

      if (item.text) {
        Static.edit_question_text = {
          value: fn.editText(item.text, { clear: true }),
          rows: 7
        }
      }
      if (item.title) {
        Static.edit_question_title = {
          value: fn.editText(item.title, { clear: true }),
          rows: 7
        }
      }
      Static.textAnswer = {
        value: "",
        error: "",
        show: true,
      }
      Static.mediaInputs = {
        value: [],
        show: false,
        selectAspect: null,
      }
      // Static.isValid = false

    },

    fn: async () => {

      Static.submitClick = false
      Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
      }
      Static.mainComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {},
        condition: (value) => {
          if (value && value.length > 0) {
            return true
          }
        },
      }

      Static.elNumberSwiper = {}


      if (!item._id) { return (<div><BlockError404 /></div>) }
      console.log('=1b441a=', Static)
      return (
        <div class="answer_container c-main__body">
          <div class="answer_block" style="flex-direction: column;">
            <div class="answer_content">
              <div class="question_author_block">
                <Avatar author={item.author} nickName={item.author.nickname} />
                {!Static.openModals ? <div class="comment_icons"> <ItemsMenu author={item.author} items={fn.itemsMenu.question(Static, item)} /> </div> : null}
              </div>
              {
                !Static.editQuestion
                  ?
                  <div ElemVisible={() => {
                    fn.recordsView(item._id, "setQuestions")
                  }}>
                    <p class="question_title">{fn.editText(item.title, { paragraph: true, clear: true, html: true })}</p>
                    <div class="question_text">{fn.editText(item.text, { paragraph: true, clear: true, html: true })}</div>
                  </div>
                  :
                  <div>
                    <TextArea Static={Static.edit_question_title} />
                    <br />
                    <TextArea Static={Static.edit_question_text} />
                    <br />
                    <ButtonSubmit text={"submit"} onclick={async () => {
                      // let response = await api({ type: "set", action: "setQuestion", data: { _id: itemID, value: { title: Static.edit_question_title.value, text: Static.edit_question_text.value } } })
                      // if (response.status === 'ok') {
                      //   item.title = Static.edit_question_title.value
                      //   item.text = Static.edit_question_text.value
                      //   Static.editQuestion = false
                      //   initReload()
                      // } else {
                      //   Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true)

                      // }
                      return
                    }} />
                  </div>
              }
              <LentaMedia Static={Static} items={item.media} path="question" />
              <div class="post_audio_container"></div>
              <div class="answers_block">
                <p>
                  <img src={svg["question_answers"]} /> <b>{item.statistic.answer}</b>
                </p>
                <p>
                  <img src={svg["question_views"]} /> <b>{item.statistic.view}</b>
                </p>
                <p>
                  <img src={svg["question_time"]} />
                  <b>{fn.getDateFormat(item.showDate, "time")}</b>
                </p>
                {
                  Variable.auth && Variable.myInfo && Variable.myInfo._id && !item.close && item.author._id !== Variable.myInfo._id
                    ?
                    <div
                      class="btn-answer"
                      onclick={() => {
                        if (elAnswerForm.hidden) {
                          elAnswerForm.hidden = false;
                          elAnswerToggle.innerHTML = '<span>' + Variable.lang.button.resetCrop + '</span>'
                        } else {
                          elAnswerForm.hidden = true;
                          elAnswerToggle.innerHTML = '<span>' + Variable.lang.button.giveAnswer + '</span>'
                        }
                        // fn.modals.ModalAnswer({
                        //   item, onClose: async () => {

                        //     setTimeout(async function () {

                        //       Static.itemAnswer = await fn.restApi.getAnswers({ filter: { questionId: item._id }, limit: 6, sort: { showDate: -1 } })

                        //       initReload()
                        //     }, 700)
                        //     return (
                        //       <img src={svg['load']} />
                        //     )
                        //   }
                        // })
                      }}>
                      <a
                        class="btn-gr-answer"
                        Element={($el) => {
                          elAnswerToggle = $el
                        }}
                      >
                        <span>{Variable.lang.button.giveAnswer}</span>
                      </a>
                    </div>
                    :
                    null
                }
              </div>
            </div>
            <div
              class="c-answers__answer"
              hidden={true}
              Element={($el) => {
                elAnswerForm = $el
              }}
            >
              <form id="createPostForm" onsubmit={(e) => sendAnswer(e, { item: item })} >
                <input style="display: none;" type="submit" />
                <div class="error-div">
                  <div class="error-div-variant">{Static.textAnswer.error}</div>
                </div>
                <div data-type="answers" class="create_post_container">
                  <div
                    class="c-chapter create_post_chapter create_post_main_text"
                    contenteditable="true"
                    oninput={changeTextAnswer}
                    onPaste={(e) => {
                      e.preventDefault();
                      fn.insertCleaning(e)
                    }}
                    Element={($el) => {
                      elText = $el
                    }}
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
                    sendVideo(Static, this.files)
                    this.value = '';
                    return;
                  }}
                />
                <button
                  class={[
                    "c-button c-button--gradient2",
                    !Static.isValid ? "c-button--inactive" : "",
                  ]}
                  type="button"
                  // ref={elemButton}
                  onClick={(e) => {
                    console.log('=719e4a=', item); sendAnswer(e, {
                      item, onClose: async () => {
                        Static.textAnswer = {
                          value: "",
                          error: "",
                          show: true,
                        }
                        Static.mediaInputs = {
                          value: [],
                          show: false,
                          selectAspect: null,
                        }
                        Static.isValid = false

                        elText.innerText = '';

                        setTimeout(async function () {

                          Static.itemAnswer = await fn.restApi.getAnswers({ filter: { questionId: item._id }, limit: 6, sort: { showDate: -1 } })
                          elAnswerForm.hidden = true;
                          elAnswerToggle.innerHTML = '<span>' + Variable.lang.button.giveAnswer + '</span>'


                          initReload()
                        }, 700)
                        return (
                          <img src={svg['load']} />
                        )
                      }
                    })
                  }}
                >
                  <span class="c-button__text">{Variable.lang.button.send}</span>
                </button>
              </form>
            </div>
            <div class="user_news_block">
              {
                !Static.itemAnswer
                  ?
                  () => {
                    setTimeout(async function () {
                      Static.itemAnswer = {}
                      Static.itemAnswer = await fn.restApi.getAnswers({ filter: { questionId: item._id }, limit: 6, sort: { showDate: -1 } })

                      initReload()
                    }, 700)
                    return (
                      <img src={svg['load']} />
                    )

                  }
                  :
                  !Static.itemAnswer.list_records.length
                    ?
                    <NotFound />
                    :

                    Static.itemAnswer.list_records.map(function (item, index) {

                      return (
                        <div
                          class={[
                            "user_news_item",
                            item.best ? "user_news_item--best" : null
                          ]}
                        >
                          <div class="main_comment">
                            <Avatar
                              author={item.author}
                              nickName={item.author.nickname}
                              dateShow={item.showDate}
                            />
                            <div class="comment_body">
                              <span class="comment_text">{fn.editText(item.text, { paragraph: true, clear: true, html: true })}</span>
                              <LentaMedia Static={Static} items={item.media} path="answers" />
                              {
                                Variable.auth
                                  ?
                                  <span
                                    class="answer_comment_button"
                                    style={item.media.length > 0 && "margin: 40px 0 0 0;"}
                                    onclick={function () {
                                      this.dataset.show = true
                                      Object.keys(Static.mainComment.elShowInput).map((key) => {
                                        if (index != key && Static.mainComment.elShowInput[key].dataset.show) {
                                          Static.mainComment.elShowInput[key].removeAttribute("data-show")
                                          Static.mainComment.elShowInput[key].style = "display:none;"
                                        }
                                      });

                                      Static.mainComment.elShowInput[index].dataset.show = true
                                      Static.mainComment.elShowInput[index].style = "display:flex;"
                                      Static.mainComment.el[index].focus();
                                    }}
                                  >
                                    {Variable.lang.button.giveAnswer}
                                  </span>
                                  :
                                  null
                              }
                              <div class="comment_icons">
                                <Evaluation Static={Static} item={item} index={index} action="Answers" />
                                <ItemsMenu author={item.author} items={fn.itemsMenu.answer(Static, item, index)} />
                              </div>
                              <div class="c-comments__form 66"
                                style="display:none;"
                                Element={($el) => { Static.mainComment.elShowInput[index] = $el; }}
                              >
                                <div class="c-comments__field create_post_container1">
                                  <TextArea
                                    Static={Static.mainComment}
                                    index={index}
                                    className="text1 create_post_chapter"
                                    noBacklight={true}
                                  />
                                </div>
                                <ButtonSubmit
                                  Static={Static}
                                  text={<img class="c-comments__icon" src={svg["send_message"]} />}
                                  className="c-comments__send button-container-preview"
                                  onclick={async function (e) {
                                    if (!Variable.auth) {
                                      fn.modals.ModalNeedAuth()
                                      return
                                    }
                                    console.log('=686d16= item =', item)
                                    if (!Static.mainComment.el[index].value.trim().length) { return }
                                    let text = Static.mainComment.el[index].value.trim()
                                    let response = await fn.restApi.setAnswers.comment({ _id: item._id, text })
                                    if (response.status === "ok") {
                                      Static.mainComment.el[index].value = ""
                                      if (Static.mainComment.adaptive) {
                                        Static.mainComment.el[index].style.height = (Static.mainComment.el[index].dataset.maxHeight / Static.mainComment.adaptive) + 'px';
                                      }
                                      if (response.list_records[0]) {
                                        let newRes = response.list_records[0]
                                        item.statistic.comments++
                                        item.comments.unshift(newRes)
                                        Static.mainComment.elShowInput[index].removeAttribute("data-show")
                                        Static.mainComment.elShowInput[index].dataset.show = true
                                        Static.mainComment.elShowInput[index].style = "display:none;"

                                        if (Static.elButtonSubmit[index]) {
                                          Static.elButtonSubmit[index].dataset.show = true
                                          Static.elButtonSubmit[index].innerHTML = `${Variable.lang.span.hideComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                        }
                                        if (typeof Static.elShowAnswersComment[index] !== "undefined") {
                                          Static.elShowAnswersComment[index].hidden = false
                                          Static.elShowButtonComment[index].style.display = ""

                                        }


                                        initReload();
                                      }
                                    }

                                  }}
                                />
                              </div>

                              {

                                <div
                                  class="user_news_top"
                                  onclick={function () {
                                    if (Static.elButtonSubmit[index].dataset.show) {

                                      Static.elButtonSubmit[index].removeAttribute("data-show")
                                      Static.elButtonSubmit[index].innerHTML = `${Variable.lang.span.showComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                      Static.elShowAnswersComment[index].hidden = true

                                    } else {

                                      Static.elButtonSubmit[index].dataset.show = true
                                      Static.elButtonSubmit[index].innerHTML = `${Variable.lang.span.hideComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                      Static.elShowAnswersComment[index].hidden = false
                                    }
                                  }}

                                >


                                  {() => {
                                    let st
                                    if (item.comments.length > 0) {
                                      st = "display:block"

                                    }
                                    else {
                                      st = "display:none"
                                    }
                                    return (<div Element={($el) => { Static.elShowButtonComment[index] = $el; }} style={st} class="button-container-comm">
                                      <ButtonSubmit
                                        className="c-button--comm"

                                        data-show={false}
                                        text={
                                          <span Element={($el) => { Static.elButtonSubmit[index] = $el; }}>
                                            {Variable.lang.span.showComments} (<span class="comment_count">{item.statistic.comments}</span>)
                                          </span>
                                        }
                                      />
                                    </div>)
                                  }}

                                </div>

                              }

                              {

                                <div style="padding-left: 0; padding-right: 0" hidden={true} Element={($el) => { Static.elShowAnswersComment[index] = $el; }}>
                                  <div class="comment_answer">
                                    {item.comments.map(function (itemComments, i) {
                                      return (
                                        <Comment
                                          Static={Static}
                                          item={itemComments}
                                          index={"A-" + String(index) + String(i)}
                                          mainId={item._id}
                                          mainItem={item}
                                          action="Answers"
                                        />
                                      )
                                    })}
                                  </div>
                                  {/* <div
                                    class="c-comments__toggler"
                                    onClick={function () {
                                      if (Static.elButtonSubmit[index].dataset.show) {
                                        Static.elButtonSubmit[index].removeAttribute("data-show")
                                        Static.elButtonSubmit[index].innerHTML = `${Variable.lang.span.showComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                        Static.elShowAnswersComment[index].hidden = true
                                      } else {
                                        Static.elButtonSubmit[index].dataset.show = true
                                        Static.elButtonSubmit[index].innerHTML = `${Variable.lang.span.hideComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                        Static.elShowAnswersComment[index].hidden = false
                                      }
                                    }}
                                  >
                                    <img src={svg.scroll_top} />
                                  </div> */}
                                </div>

                              }

                            </div>

                          </div>
                        </div>

                      )

                      i++
                    })

              }

            </div>
            { /* <ButtonShowMore Static={Static} action="getAnswers" limit={10} />*/}
          </div>

        </div>
      )
    },
  })
  return
};

export default start;