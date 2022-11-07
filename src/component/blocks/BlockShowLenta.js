import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  Helpers,
  initOne,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { Avatar, LentaMedia, ItemsMenu, Evaluation, TextArea, ButtonSubmit, Comment } from "@component/element/index.js";
import { api } from '@src/apiFunctions.js'
import { getDateFormat } from "@src/functions.js";



let Static = {}

const BlockShowLenta = function ({ item }) {
  // Variable.Static.FooterShow = false
  initOne(() => {
    Static.mainComment = {
      rows: 1,
      adaptive: 4
    }
  })
  return (
    <div class="user_post_container">
      <div class="user_news_block">
        <div class="userNewsBlock">
          <div class="user_news_block">
            <div class="c-fullnews__item user_news_item">
              <div class="main_comment">
                <Avatar author={item.author} nickName={item.author.nickname} />
                <div class="comment_icons">
                  <ItemsMenu
                    author={item.author}
                    items={
                      [
                        {
                          text: Variable.lang.select.share,
                          type: "share",
                          onclick: async () => {
                            try {
                              if (navigator.share) {
                                await navigator.share({
                                  url: window.location.origin + "/lenta-users/show/" + item._id,
                                });
                              }
                            } catch (err) {
                              // Вывести ошибку
                              console.error("Share", err)
                            }
                          }
                        },
                        {
                          text: item.subscribe
                            ? Variable.lang.button.unsubscribe
                            : Variable.lang.button.subscribe,
                          type: "subscription",
                          onlyAuth: true,
                          onclick: async () => {
                            const response = await api({ type: "set", action: "setUsers", data: { value: { subscribed: item.author._id } } })
                            console.log('=b959ac=', response)
                            if (response.status === "ok") {
                              if (response.result) {
                                item.subscribe = response.result.subscribe
                                initReload();
                              }
                            } else {
                              Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                            }
                          }
                        },
                        {
                          text: Variable.lang.select.complainPost,
                          type: "complainItem",
                          onlyAuth: true,
                          color: "red",
                          onclick: async () => {
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
                        },
                        {
                          text: Variable.lang.select.complainUser,
                          type: "complainUser",
                          onlyAuth: true,
                          color: "red",
                          onclick: async () => {
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
                        },
                        {
                          text: Variable.lang.select.blackList,
                          type: "blackList",
                          onlyAuth: true,
                          color: "red",
                          onclick: async () => {
                            // Переработать модалку
                            Variable.SetModals(
                              {
                                name: "ModalBlackList",
                                data: { id: item.author._id, type: "перебрать" },
                              }, true
                            );
                          }
                        },
                        {
                          text: Variable.lang.button.edit,
                          type: "edit",
                          onclick: async () => {
                            // Переработать модалку
                            // Variable.SetModals(
                            //   {
                            //     name: "ModalBlackList",
                            //     data: { id: item.author._id, type: "перебрать" },
                            //   }, true
                            // );
                          }
                        },
                        {
                          text: Variable.lang.select.delete,
                          type: "delete",
                          color: "red",
                          onclick: async () => {
                            // Переработать модалку
                            // Variable.SetModals(
                            //   {
                            //     name: "ModalDelComment",
                            //     data: {
                            //       id: data.item._id,
                            //       typeSet: data.typeApi,
                            //       mainId: data.mainId,
                            //       mainCom: !data.commentId ? true : false,
                            //       callBack: data.callBack,
                            //     },
                            //   }, true
                            // );
                          }
                        },
                        {
                          text: Variable.lang.select.delete,
                          type: "deleteRole",
                          color: "red",
                          onclick: async () => {
                            // Переработать модалку
                            // Variable.SetModals(
                            //   {
                            //     name: "ModalDelComment",
                            //     data: {
                            //       id: data.item._id,
                            //       typeSet: data.typeApi,
                            //       mainId: data.mainId,
                            //       mainCom: !data.commentId ? true : false,
                            //       callBack: data.callBack,
                            //     },
                            //   }, true
                            // );
                          }
                        },
                      ]
                    }
                  />
                </div>
                <div class="comment_body">
                  <LentaMedia
                    items={item.media}
                    numIndex={0}
                    // elem={elem}
                    path={"/assets/upload/posts/"}
                  />
                  <div class={(!item.media || item.media.length == 0) && item.text.length < 200 ? "user_post_text_background" : null}>
                    <span class="comment_text">
                      {stringToHtml(Helpers.sanitizeHtml(item.text))}
                    </span>
                  </div>
                </div>

                <div class="user_post_statistic">
                  <span class="c-date" data-id={item._id}>
                    {item.updateTime
                      ? `${Variable.lang.text.update} ${getDateFormat(
                        item.updateTime,
                        "lenta"
                      )}`
                      : getDateFormat(item.showDate, "lenta")}
                  </span>
                  <div class="user_post_statistic_item">
                    <div class="user_post_statistic_image">
                      <img src={svg["question_answers"]} />{" "}
                      <span>{item.statistic.comments ? item.statistic.comments : "0"} </span>
                    </div>
                    <div class="user_post_statistic_image">
                      <img src={svg["question_views"]} /> {item.statistic.view ? item.statistic.view : "0"}
                    </div>
                  </div>
                  <div class="user_post_statistic_item">
                    <Evaluation
                      rating={item.statistic.rating}
                      callBackBefore={async (type) => {
                        let response = await api({ type: "set", action: "setPost", data: { _id: item._id, value: { evaluation: type } } })
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
                        let response = await api({ type: "get", action: "getPost", filter: { _id: item._id }, select: { evaluation: 1, } })
                        let whoLike = []
                        if (response && response.result.list_records && response.result.list_records[0].evaluation && response.result.list_records[0].evaluation.length) {
                          whoLike = response.result.list_records[0].evaluation.filter(
                            (item) => item.type === type
                          );
                        }
                        Variable.SetModals({ name: "ModalWhoLike", data: { whoLike } }, true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="news_page_comments">
              <h2>{Variable.lang.h.modal_comment}</h2>
              <div class="c-comments__form create_post_coments">
                <div class="c-comments__field create_post_container1">
                  <TextArea
                    Static={Static.mainComment}
                    className="text1 create_post_chapter"
                  />
                </div>
                <ButtonSubmit
                  text={<img class="c-comments__icon" src={svg["send_message"]} />}
                  className="c-comments__send button-container-preview comments_send"
                  onclick={async (tmp, el) => {
                    if (!Static.mainComment.el.value.trim().length) {
                      return
                    }
                    let text = Static.mainComment.el.value.trim()
                    let response = await api({ type: "set", action: "setPost", data: { _id: item._id, value: { comments: { text: text } } } })
                    if (response.status === "ok") {
                      Static.mainComment.el.value = ""
                      if (Static.adaptive) {
                        Static.mainComment.el.style.height = (Static.mainComment.el.dataset.maxHeight / Static.adaptive) + 'px';
                      }
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
                        action="setPost"
                      />
                    )
                  })
                  return (
                    <div class="post_comments">
                      <div class="user_news_item">
                        {arrReturn}
                      </div>
                    </div>
                  )
                } else {
                  // return (<NotFound
                  // />
                  // )
                }
              }}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export { BlockShowLenta };