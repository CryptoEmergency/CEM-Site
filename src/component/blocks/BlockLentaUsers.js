import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { LentaMedia, Evaluation, Avatar, ItemsMenu, VideoPlayer, AudioPlayer } from "@component/element/index.js";

const BlockLentaUsers = function ({ Static, changeToogle, ElemVisible, item, index }) {
  let mediaFiles

  if (item.media) {
    mediaFiles = item.media.filter((item) => {
      return typeof item == 'object'
    });
  }
  let text
  if (typeof item.text !== "undefined") {
    text = item.text
  }
  else {
    text = ""
  }

  // if (item.media.length) {
  // console.log('=a3c1e1= item, index =', item, index)
  // }

  return (
    Static.activeView == "tile" ?
      <a
        class="c-tiles__item"
        data-href={"/lenta-users/show/" + item._id}
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item, items: fn.itemsMenu.lenta_users(Static, item) })
        }
        }
      >
        <figure class="c-tiles__card">
          {
            item.media.length > 0 ?
              item.media[0].type == "image" ?
                <img
                  class="c-tiles__image"
                  src={`/assets/upload/posts/${item.media[0].name}`}
                  width="100"
                  height="100"
                />
                : item.media[0].type == "video" ?
                  <VideoPlayer Static={Static} item={item.media[0]} path={`/assets/upload/posts/`} customClick={(e) => console.log('customClick')} />
                  : <AudioPlayer Static={Static} item={item.media[0]} path={`/assets/upload/posts/`} />
              :
              <img
                class="c-tiles__image c-tiles__image--base"
                src={images["user_background_image"]}
                width="100"
                height="100"
              />
          }
          {
            item.media.length == 0 ?
              <figcaption class="c-tiles__blind">
                {fn.editText(item.text, { clear: true, paragraph: true, html: true, notp: true })}
              </figcaption>
              : null
          }
        </figure>
      </a>
      :
      <div
        class="c-fullnews__item user_news_item"
        replace={changeToogle}
        ElemVisible={ElemVisible}>
        <div class="main_comment">
          <div class="c-lentaitem__header">
            <Avatar author={item.author} parent={"lenta"} nickName={item.author.nickname} />
            {
              mediaFiles.length > 1
                ?
                <div class="c-lentaitem__counter">
                  <span Element={($el) => { Static.elNumberSwiper[index] = $el }}>1</span>
                  &ensp;/&ensp;
                  <span>{mediaFiles.length ? mediaFiles.length : null}</span>
                </div>
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
                  onclick={(e) => { fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item, items: fn.itemsMenu.lenta_users(Static, item) }) }}
                ></div>
                :
                null
            }
          </div>
          <div class="comment_body">
            <LentaMedia
              Static={Static}
              items={mediaFiles}
              path="posts"
              index={index}
            // changeToogle={changeToogle}
            />
            <div class={!mediaFiles.length && text.length < 250 ? "user_post_text_background" : null}>
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
                    return fn.editText(text, { clear: true, paragraph: true, html: true })
                  }
                  if (!mediaFiles.length && text.length < 250) {
                    return fn.editText(text, { clear: true, paragraph: true, html: true })
                  } else if (text.length) {
                    return (
                      <div>
                        <span Element={($el) => {
                          Static.elShowTextShort[item._id] = $el
                        }}>
                          {
                            mediaFiles.length
                              ?
                              fn.editText(text, { slice: 50, clear: true, html: true })
                              :
                              fn.editText(text, { slice: 550, paragraph: true, clear: true, html: true })
                          }
                        </span>
                        {
                          mediaFiles.length
                            ?
                            text.length > 50
                              ?
                              <div>
                                <span hidden={true} Element={($el) => {
                                  Static.elShowTextFull[item._id] = $el
                                }}>{fn.editText(text, { paragraph: true, clear: true, html: true })}</span>
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
                            text.length > 550
                              ?
                              <div>
                                <span hidden={true} Element={($el) => {
                                  Static.elShowTextFull[item._id] = $el
                                }}>{fn.editText(text, { paragraph: true, clear: true, html: true })}</span>
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
                fn.siteLinkModal(e, { title: Variable.lang.h.posts_user, item, items: fn.itemsMenu.lenta_users(Static, item) })
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