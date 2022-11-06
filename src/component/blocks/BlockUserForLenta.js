import {
  jsx,
  jsxFrag,
  Variable,
  getVariable,
  getStorage,
  getValue,
  stringToHtml,
  Helpers,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { LentaMedia } from "@component/element/index.js";
import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import { getPostsItemInShow } from "@src/apiFunctions.js";
import {
  Avatar,
  Likes,
  AnswerAdditionallyToggleNew,
} from "@component/element/index.js";
import { If } from "@component/helpers/All.js";

const BlockUserForLenta = function ({ item }) {

  let id_user = item._id
  let getItem = ""
  return (

    <div class="main_comment">
      {/**
 вывод аватара
 */}
      <Avatar author={item.author} nickName={item.author.nickname} />

      {/**
 вывод медийки
*/}
      <div class="comment_body">
        <LentaMedia
          items={item.media}
          elem={[]}
          path={"/assets/upload/posts/"}
        />

        <div class={(!item.media || item.media.length == 0) && item.text.length < 200 ? "user_post_text_background" : null}>
          <span class="comment_text">
            {stringToHtml(Helpers.sanitizeHtml(item.text))}

          </span>
        </div>

        {/*item.media.length > 0 ? (
                  <span class="comment_text">
                  
                    {stringToHtml(Helpers.sanitizeHtml(item.text))}
                
                  </span>
                ) : item.text.length < 100 ? (
                  <div class="user_post_text_background">
                    <span class="comment_text">
                      {stringToHtml(Helpers.sanitizeHtml(item.text))}
                      
                    </span>
                  </div>
                ) : (
                  <span class="comment_text">
                    {stringToHtml(Helpers.sanitizeHtml(item.text))}
              
                  </span>
                )*/}
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
            <span>{item.statistic.comments} </span>
          </div>
          <div class="user_post_statistic_image">
            <img src={svg["question_views"]} /> {item.statistic.view}
          </div>
        </div>
        <div class="user_post_statistic_item">
          <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} />
        </div>
      </div>
      <div class="comment_icons">
        <AnswerAdditionallyToggleNew
          item={item}
          typeApi={"setPost"}
          type={{
            share: true,
            edit: true,
            delete: true,
            subscription: true,
            complainPost: true,
            complainUser: true,
            blackList: true,
          }}
          mainId={id_user}
          callBack={getItem}
        />
      </div>

    </div>

  )
}

export { BlockUserForLenta };