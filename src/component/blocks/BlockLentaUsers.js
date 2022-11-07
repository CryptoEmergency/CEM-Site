import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  Helpers,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { LentaMedia } from "@component/element/index.js";
import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import {
  Avatar,
  ItemsMenu
} from "@component/element/index.js";
import { If } from "@component/helpers/All.js";

const BlockLentaUsers = function ({ Static, changeToogle, ElemVisible, item, show, numIndex, elem, total, totalFound, type }) {
  return (
    <div
      class="c-fullnews__item user_news_item"
      data-href={"/lenta-users/show/" + item._id}
      ElemVisible={ElemVisible}
      onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.posts_user, item }) }}
    >
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
                    // console.log('=b959ac=', response)
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
          {/* <LentaMedia
            Static={Static}
            items={item.media}
            path="posts"
          /> */}
          <div class={!item.media.length && item.text.length < 450 ? "user_post_text_background" : null}>
            <span class="comment_text">
              {() => {
                if (show) {
                  return Helpers.editText(item.text, { clear: true, paragraph: true, html: true })
                }
                if (!item.media.length && item.text.length < 450) {
                  return Helpers.editText(item.text, { slice: 450, clear: true, paragraph: true, html: true })
                } else if (item.media.length && item.text.length) {
                  return (
                    <div>
                      <span Element={($el) => {
                        Static.elShowTextMore = $el
                      }}>{Helpers.editText(item.text, { slice: 50, clear: true, html: true })}</span>
                      <span
                        class="show_full_post"
                        onclick={function (e) {
                          e.stopPropagation();
                          Static.elShowTextMore.innerHTML = Helpers.editText(item.text, { paragraph: true, clear: true, html: true })
                          console.log('=4b1b82=', Static.elShowTextMore, item.text)
                          this.innerHTML = ""
                        }}>
                        {Variable.lang.button.show_all}</span>
                    </div>
                  )
                } else if (item.text.length) {
                  return (
                    <div>
                      <span Element={($el) => {
                        Static.elShowTextMore = $el
                      }}>{Helpers.editText(item.text, { slice: 750, paragraph: true, clear: true, html: true })} </span>
                      <span
                        class="show_full_post"
                        onclick={function (e) {
                          e.stopPropagation();
                          Static.elShowTextMore.innerHTML = Helpers.editText(item.text, { paragraph: true, clear: true, html: true })
                          console.log('=4b1b82=', Static.elShowTextMore, item.text)
                          this.innerHTML = ""
                        }}
                      >{Variable.lang.button.show_all}</span>
                    </div>
                  )
                }
              }}
            </span>
          </div>
        </div>
        <div class="user_post_statistic">
          <span class="c-date" data-id={item._id}>
            {item.updateTime ? Variable.lang.text.update + " " + Helpers.getDateFormat(item.updateTime, "now") : Helpers.getDateFormat(item.showDate, "now")}
          </span>
          <div class="user_post_statistic_item">
            <div class="user_post_statistic_image">
              <img src={svg["question_answers"]} />
              <span>{item.statistic.comments} </span>
            </div>
            <div class="user_post_statistic_image">
              <img src={svg["question_views"]} /> {item.statistic.view}
            </div>
          </div>
          <div class="user_post_statistic_item">
            {/* <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export { BlockLentaUsers };
