import {
  jsx,
  jsxFrag,
  Variable,
  init,
  Helpers,
  initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { api } from '@src/apiFunctions.js'
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonSubmit, TextArea, NotFound, Comment, Input } from "@component/element/index.js";

const start = function (data, ID) {
  let [Static, item] = fn.GetParams({ data, ID })




  let itemAnswer, itemID, itemMenuCheck, showItemsMenu;
  // let Static = {}


  //нижнее меню
  let bottomMenuitems = fn.CreateMenuItems({
    text: [Variable.lang.select.complainAnswer,
    Variable.lang.select.complainUser,
    Variable.lang.select.blackList,
    Variable.lang.select.delete,
    Variable.lang.select.delete
    ],
    type: ["complainItem", "complainUser", "blackList", "delete", "deleteRole"],
    auth: [true, true, true, false, false],
    color: ["red", "red", "red", "red", "red"],
    onclick: ["",
      async () => {
        // Переработать модалку
        Variable.SetModals(
          {
            name: "ModalComplainComment",
            data: {
              id: data.item._id,
              typeSet: data.typeApi,
              mainId: data.mainId,
              mainCom: !data.commentId ? true : false,
            },
          }, true
        );
      }
      ,
      async () => {
        // Переработать модалку
        Variable.SetModals(
          {
            name: "ModalBlackList",
            data: { id: item.author._id, type: "перебрать" },
          }, true
        );
      },
      "",
      ""
    ]
  })


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





      itemMenuCheck = true





      if (!itemMenuCheck) {

        showItemsMenu = <ItemsMenu author={item.author}
          items={upperMenuitems} />
      }
      else {

        showItemsMenu = ""
        Variable["modalEditQuestion"] = data.editVisible

      }


    },



    async () => {
      if (!item._id) { return (<div><BlockError404 /></div>) }
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
              {/* {
                () => {
                  if (!itemAnswer) {
                    setTimeout(async function () {

                      itemAnswer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
                      initReload()
                    }, 1000)
                    return (
                      <img src={svg['load']} />
                    )
                  } else {
                    if (itemAnswer && itemAnswer.list_records && itemAnswer.list_records.length) {
                      const arrReturn = itemAnswer.list_records.map(function (item, index) {
                        Static[index] = Variable.State(item._id)
                        Static[index].secondComment = {
                          rows: 1,
                          adaptive: 4,
                        }
                        return (
                          <div
                            style={[item.best ? "order: -1; border-color: #00E741" : null]}
                            class="user_news_item"
                          >
                            <div class="main_comment">
                              <Avatar
                                author={item.author}
                                nickName={item.author.nickname}
                                dateShow={item.showDate}
                              />
                              <div class="comment_body">
                                <span class="comment_text">{Helpers.clearText(item.text)}</span>
                                <LentaMedia
                                  items={item.media}
                                  numIndex={0}
                                  path={"/assets/upload/answers/"}
                                />
                                {() => {
                                  if (Variable.auth) {
                                    return (
                                      <span
                                        class="answer_comment_button"
                                        style={item.media.length > 0 && "margin: 40px 0 0 0;"}
                                        onclick={function () {
                                          this.dataset.show = true
                                          Static[index].secondComment.elShowInput.dataset.show = true
                                          Static[index].secondComment.elShowInput.style = "display:flex;"
                                        }}
                                      >
                                        {Variable.lang.button.giveAnswer}
                                      </span>
                                    )
                                  }
                                }}
                                <div class="comment_icons">
                                  <Evaluation
                                    rating={item.statistic.rating}
                                    callBackBefore={async (type) => {
                                      let response = await api({ type: "set", action: "setAnswer", data: { _id: item._id, value: { evaluation: type } } })
                                      if (response.status === 'ok') {
                                        if (type == "plus") {
                                          item.statistic.rating++
                                        } else {
                                          item.statistic.rating--
                                        }
                                        initReload()
                                      } else {
                                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true)
                                      }
                                    }}
                                    callBackAfter={async (type) => {
                                      let response = await api({ type: "get", action: "getAnswers", filter: { _id: item._id }, select: { evaluation: 1, } })
                                      let whoLike = []
                                      if (response && response.result.list_records && response.result.list_records[0].evaluation && response.result.list_records[0].evaluation.length) {
                                        whoLike = response.result.list_records[0].evaluation.filter(
                                          (item) => item.type === type
                                        );
                                      }
                                      Variable.SetModals({ name: "ModalWhoLike", data: { whoLike } }, true);
                                    }}
                                  />
                                  <ItemsMenu author={item.author} items={bottomMenuitems} />
                                </div>
                                {() => {
                                  if (item.comments && item.comments.length) {
                                    return (
                                      <div class="user_news_top">
                                        <div class="button-container-comm">
                                          <ButtonSubmit
                                            className="c-button--comm"
                                            data-show={false}
                                            text={
                                              <span
                                                onclick={function () {
                                                  if (this.dataset.show) {
                                                    this.removeAttribute("data-show")
                                                    this.innerHTML = `${Variable.lang.span.showComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                                    Static[index].secondComment.elShowComment.hidden = true
                                                  } else {
                                                    this.dataset.show = true
                                                    this.innerHTML = `${Variable.lang.span.hideComments} (<span class="comment_count">${item.statistic.comments}</span>)`;
                                                    Static[index].secondComment.elShowComment.hidden = false
                                                  }
                                                }}
                                              >
                                                {Variable.lang.span.showComments} (<span class="comment_count">{item.statistic.comments}</span>)
                                              </span>
                                            }
                                          />
                                        </div>
                                      </div>
                                    )
                                  }
                                }}
                                <div class="c-comments__form create_post_coments"
                                  style="display:none;"
                                  Element={($el) => { Static[index].secondComment.elShowInput = $el; }}
                                >
                                  <div class="c-comments__field create_post_container1">
                                    <TextArea
                                      Static={Static[index].secondComment}
                                      className="text1 create_post_chapter"
                                    />
                                  </div>
                                  <ButtonSubmit
                                    text={<img class="c-comments__icon" src={svg["send_message"]} />}
                                    className="c-comments__send button-container-preview comments_send"
                                    onclick={async (tmp, el) => {
                                      if (!Static[index].secondComment.el.value.trim().length) {
                                        return
                                      }
                                      let text = Static[index].secondComment.el.value.trim()
                                      let data = { _id: item._id, value: { comments: { text } } }
                                      let response = await api({ type: "set", action: "setAnswer", data: data })
                                      if (response.status === "ok") {
                                        Static[index].secondComment.el.value = ""
                                        if (Static[index].adaptive) {
                                          Static[index].secondComment.el.style.height = (Static[index].secondComment.el.dataset.maxHeight / Static[index].adaptive) + 'px';
                                        }
                                        Static[index].secondComment.elShowInput.style = "display:none;"
                                        Static[index].secondComment.elShowInput.removeAttribute("data-show")
                                        if (response.result && response.result.list_records && response.result.list_records[0]) {
                                          let newRes = response.result.list_records[0]
                                          item.comments.unshift(newRes)
                                          initReload();
                                        }
                                      } else {
                                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                                      }
                                    }}
                                  />
                                </div>
                                {() => {
                                  if (item.comments && item.comments.length) {
                                    const arrReturn = item.comments.map(function (itemComments, i) {
                                      return (
                                        <Comment
                                          item={itemComments}
                                          mainId={item._id}
                                          action="setAnswer"
                                        />
                                      )
                                    })
                                    return (
                                      <div class="comment_answer" hidden={true} Element={($el) => { Static[index].secondComment.elShowComment = $el; }}>
                                        {arrReturn}
                                      </div>
                                    )
                                  }
                                }}
                              </div>
                            </div>
                          </div>
                        )
                      })
                      return arrReturn
                    } else {
                      return (
                        <NotFound
                        />
                      )
                    }
                  }
                }
              } */}
            </div>
          </div>
        </div>
      )
    }, ID
  );
};
export default start;
