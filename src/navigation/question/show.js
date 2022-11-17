import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonSubmit, TextArea, NotFound, Comment } from "@component/element/index.js";

const start = function (data, ID) {
  let [Static, item] = fn.GetParams({ data, ID })

  init(
    async () => {
      fn.initData.question_show(Static)
      if (!Static.openModals) {
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
    },
    async () => {
      return (
        <div class="answer_container c-main__body">
          <div class="answer_block" style="flex-direction: column;">
            <div class="answer_content">
              <div class="question_author_block">
                <Avatar author={item.author} nickName={item.author.nickname} />
                {!Static.openModals ? <div class="comment_icons"> <ItemsMenu author={item.author} items={fn.itemsMenu.lenta_users(Static, item)} /> </div> : null}
              </div>
              {
                !Static.editQuestion
                  ?
                  <div>
                    <p class="question_title">{fn.clearText(item.title)}</p>
                    <div class="question_text"> {fn.clearText(item.text)}</div>
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
                      onclick={() => { fn.modals.ModalAnswer({ item, onClose: async () => { console.log('=118993=', "test close") } }) }}>
                      <a class="btn-gr-answer">
                        <span>{Variable.lang.button.giveAnswer}</span>
                      </a>
                    </div>
                    :
                    null
                }
              </div>
            </div>
            <div class="user_news_block">
              {
                !Static.itemAnswer
                  ?
                  () => {
                    setTimeout(async function () {
                      Static.itemAnswer = await fn.restApi.getAnswers({ filter: { questionId: item._id } })
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
                        <div style={[item.best ? "order: -1; border-color: #00E741" : null]} class="user_news_item">
                          <div class="main_comment">
                            <Avatar
                              author={item.author}
                              nickName={item.author.nickname}
                              dateShow={item.showDate}
                            />
                            <div class="comment_body">
                              <span class="comment_text">{fn.clearText(item.text)}</span>
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
                                {/* <ItemsMenu author={item.author} items={bottomMenuitems} /> */}
                              </div>
                              <div class="c-comments__form"
                                style="display:none;"
                                Element={($el) => { Static.mainComment.elShowInput[index] = $el; }}
                              >
                                <div class="c-comments__field create_post_container1">
                                  <TextArea
                                    Static={Static.mainComment}
                                    index={index}
                                    className="text1 create_post_chapter"
                                  />
                                </div>
                                <ButtonSubmit
                                  Static={Static}
                                  text={<img class="c-comments__icon" src={svg["send_message"]} />}
                                  className="c-comments__send button-container-preview"
                                  onclick={async () => {
                                    if (!Variable.auth) {
                                      fn.modals.ModalNeedAuth()
                                      return
                                    }
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
                                        Static.elShowAnswersComment[index].hidden = false
                                        initReload();
                                      }
                                    }
                                  }}
                                />
                              </div>
                              {
                                item.comments && item.comments.length
                                  ?
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
                                    <div class="button-container-comm">
                                      <ButtonSubmit
                                        className="c-button--comm"
                                        data-show={false}
                                        text={
                                          <span Element={($el) => { Static.elButtonSubmit[index] = $el; }}>
                                            {Variable.lang.span.showComments} (<span class="comment_count">{item.statistic.comments}</span>)
                                          </span>
                                        }
                                      />
                                    </div>
                                  </div>
                                  :
                                  null
                              }
                              {
                                item.comments && item.comments.length
                                  ?
                                  <div style="padding-left: 0; padding-right: 0" hidden={true} Element={($el) => { Static.elShowAnswersComment[index] = $el; }}>
                                    <div class="comment_answer">
                                      {item.comments.map(function (itemComments, i) {
                                        return (
                                          <Comment
                                            Static={Static}
                                            item={itemComments}
                                            index={"A-" + String(index) + String(i)}
                                            mainId={item._id}
                                            action="Answers"
                                          />
                                        )
                                      })}
                                    </div>
                                    <div
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
                                    </div>
                                  </div>
                                  :
                                  null
                              }
                            </div>
                          </div>
                        </div>
                      )
                    })
              }
            </div>
          </div>
        </div>
      )
    }, ID
  );
};
export default start;
// OK