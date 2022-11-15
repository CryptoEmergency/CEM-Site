import {
  jsx,
  jsxFrag,
  Variable,
  initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { LentaMedia, Evaluation, Avatar, ItemsMenu } from "@component/element/index.js";

const BlockLentaUsers = function ({ Static, changeToogle, ElemVisible, item, index }) {
  return (
    <div
      class="c-fullnews__item user_news_item"
      replace={changeToogle}
      ElemVisible={ElemVisible}>
      <div class="main_comment">
        <div class="c-lentaitem__header">
          <Avatar author={item.author} parent={"lenta"} nickName={item.author.nickname} />
          {
            item.media.length
              ?
              <div class="c-lentaitem__counter"><span>{item.media.length ? item.media.length : null}</span></div>
              :
              null
          }
          {!Static.openModals ? <div class="comment_icons"> <ItemsMenu author={item.author} items={fn.itemsMenu.lenta_users(Static, item)} /> </div> : null}
          {
            !Static.openModals && !Static.showPage
              ?
              <div
                class="c-lentaitem__link"
                data-href={"/lenta-users/show/" + item._id}
                onclick={(e) => { fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item }) }}
              ></div>
              :
              null
          }
        </div>
        <div class="comment_body">
          <LentaMedia
            Static={Static}
            items={item.media}
            path="posts"
          // changeToogle={changeToogle}
          />
          <div class={!item.media.length && item.text.length < 250 ? "user_post_text_background" : null}>
            <span class="comment_text"
              data-href={"/lenta-users/show/" + item._id}
              onclick={(e) => {
                e.stopPropagation();
                if (!Static.openModals && !Static.showPage) {
                  fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item })
                }
              }}>
              {() => {
                if (Static.showPage) {
                  return fn.editText(item.text, { clear: true, paragraph: true, html: true })
                }
                if (!item.media.length && item.text.length < 250) {
                  return fn.editText(item.text, { clear: true, paragraph: true, html: true })
                } else if (item.text.length) {
                  return (
                    <div>
                      <span Element={($el) => {
                        Static.elShowTextShort[item._id] = $el
                      }}>
                        {
                          item.media.length
                            ?
                            fn.editText(item.text, { slice: 50, clear: true, html: true })
                            :
                            fn.editText(item.text, { slice: 550, paragraph: true, clear: true, html: true })
                        }
                      </span>
                      {
                        item.media.length
                          ?
                          item.text.length > 50
                            ?
                            <div>
                              <span hidden={true} Element={($el) => {
                                Static.elShowTextFull[item._id] = $el
                              }}>{fn.editText(item.text, { paragraph: true, clear: true, html: true })}</span>
                              <span
                                class="show_full_post"
                                onclick={function (e) {
                                  e.stopPropagation();
                                  Static.elShowTextShort[item._id].hidden = true
                                  Static.elShowTextFull[item._id].hidden = false
                                  this.innerHTML = ""
                                }}>
                                {Variable.lang.button.show_all}</span>
                            </div>
                            :
                            null
                          :
                          item.text.length > 550
                            ?
                            <div>
                              <span hidden={true} Element={($el) => {
                                Static.elShowTextFull[item._id] = $el
                              }}>{fn.editText(item.text, { paragraph: true, clear: true, html: true })}</span>
                              <span
                                class="show_full_post"
                                onclick={function (e) {
                                  e.stopPropagation();
                                  Static.elShowTextShort[item._id].hidden = true
                                  Static.elShowTextFull[item._id].hidden = false
                                  this.innerHTML = ""
                                }}
                              >{Variable.lang.button.show_all}</span>
                            </div>
                            :
                            null
                      }
                    </div>
                  )
                }
              }}
            </span>
          </div>
        </div>
        <div class="user_post_statistic"
          data-href={"/lenta-users/show/" + item._id}
          onclick={(e) => {
            e.stopPropagation();
            if (!Static.openModals && !Static.showPage) {
              fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item })
            }
          }}>
          <span class="c-date" data-id={item._id}>
            {item.updateTime ? Variable.lang.text.update + " " + fn.getDateFormat(item.updateTime, "now") : fn.getDateFormat(item.showDate, "now")}
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
            <Evaluation Static={Static} item={item} index={index} action="Post" />
          </div>
        </div>
      </div>
    </div>
  );
};
export { BlockLentaUsers };
// OK