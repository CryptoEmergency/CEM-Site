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
  initReload
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { LentaMedia } from '@component/element/index.js';


import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import { getPostsItemInShow } from "@src/apiFunctions.js";
import { AudioPlayer } from "@component/element/AudioPlayer.js";
import { Slider } from "@component/element/Slider.js";
import {
  Avatar,
  Likes,
  AnswerAdditionallyToggle,
} from "@component/element/index.js";
import { If, Map } from '@component/helpers/All.js';



const BlockLentaUsers = function ({ item, numIndex, elem, total, totalFound }) {
  let mainId = item._id
  return (
    <div
      class="user_news_item"
      ElemVisible={total < totalFound && numIndex == (total - 2) ?
        async () => {
          console.log('=0c6881=', "Load more")
          let tmp = await sendApi.send({
            action: "getPost",
            short: true,
            limit: 15,
            offset: total,
            filter: Helpers.getFilterLenta(
              {},
              Variable.Static.lentaPage
            ),
          });

          Variable[`PageLenta${Variable.Static.lentaPage}`].list_records.push(...tmp.list_records)
          initReload()
        }
        :
        false
      }
      onClick={async () => {
        // let post;
        // post = await getPostsItemInShow(item._id);
        // post = post.list_records[0];
        // Variable.SetModals({
        //   name: "ModalFullPost",
        //   data: { post },
        // });
      }}
    >
      <div class="main_comment">
        <Avatar author={item.author} nickName={item.author.nickname} />
        <div class="comment_icons">
          <AnswerAdditionallyToggle
            item={item}
            typeApi={"setPost"}
            type={{
              delete: true,
              edit: true,
              complainPost: true,
              complainUser: true,
              blackList: true,
              subscription: true,
              share: true,
            }}
            mainId={mainId}
          /></div>
        <div class="comment_body">
          <LentaMedia
            items={item.media}
            numIndex={numIndex}
            elem={elem}
            path={"/assets/upload/posts/"}
          />
          {/* {item.media.length > 0 && returnImgOrVideo(item)} */}

          <div class="post_audio_container">
            {/* {item.media.find((i) => i.type === "audio") !== undefined &&
            item.media.length > 0 ? (
              item.text ? (
                <div>text</div>
              ) :
               {{>audioPlayer src=name path="/assets/upload/posts/"}}
              item.media.length == 1 ? (
                <div class="user_post_text_background">
                  <AudioPlayer item = {item} />
                  {item.media
                    .filter((item) => item.type === "audio")
                    .map((item) => {
                      return <AudioPlayer item={item} />;
                    })}
                </div>
              ) : (
                <h1>mul Audio</h1>
              )
            ) : (
              {{>audioPlayer src=name path="/assets/upload/posts/"}}

              ""
            )} */}
          </div>

          {item.media.length > 0 ? (
            <span class="comment_text">
              {/* {parseTextforJsx(item.text).map((item)=>{
                return item
              })} */}
              {stringToHtml(Helpers.sanitizeHtml(item.text))}
              {/* {stringToHtml(item.text)} */}
            </span>
          ) : item.text.length < 100 ? (
            <div class="user_post_text_background">
              <span class="comment_text">
                {stringToHtml(Helpers.sanitizeHtml(item.text))}
                {/* {stringToHtml(item.text)} */}
                {/* {parseTextforJsx(item.text).map((item)=>{
                return item
              })} */}
              </span>
            </div>
          ) : (
            <span class="comment_text">
              {stringToHtml(Helpers.sanitizeHtml(item.text))}
              {/* {parseTextforJsx(item.text).map((item)=>{
                return item
              })} */}
              {/* {stringToHtml(item.text)} */}
            </span>
          )}
        </div>

        <div class="user_post_statistic">
          <span class="c-date">{item.updateTime ? `${Variable.lang.text.update} ${getDateFormat(item.updateTime, "lenta")}` : getDateFormat(item.showDate, "lenta")}</span>
          <div class="user_post_statistic_item">
            <div class="user_post_statistic_image">
              <img src={svg["question_answers"]} /> <span>{item.statistic.comments} </span>
            </div>
            <div class="user_post_statistic_image">
              <img src={svg["question_views"]} /> {item.statistic.view}
            </div>
          </div>
          <div class="user_post_statistic_item">

            <Likes
              item={item}
              typeGet="getPost"
              typeSet="setPost"
            />

            {/* <div class="comment_icon_type-2"> */}
            {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/dislike.svg" class="comment_icon_type-2-1 minus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
            {/* <button type="button" data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src={svg["dislike"]} class="comment_icon_type-2-1 minus comment_inactive" data-answer-id={item._id} data-needauth="true" data-type="post" data-action="answerEvaluation"></button>
            </div>
            <div class="comment_likes" id={`likes_${item._id}`}>
              {item.statistic.rating}
            </div>
            <div class="comment_icon_type-2"> */}
            {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/like.svg" class="comment_icon_type-2-1 plus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
            {/* <button data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd"
                src={svg["like"]} class="comment_icon_type-2-1 plus comment_inactive" data-answer-id={item._id} data-needauth="true" data-type="post"
                data-action="answerEvaluation"></button>
            </div> */}
          </div>
        </div>

        {/* <div class="comment_icons">
          <div
            class={`comment_icon_type-1 answer_additionally_toggle ${!isAuth && "comment_inactive"}`}
            data-needauth="true" data-action="answerAdditionallyToggle">
            <img class="answer_additionally_toggle_img" src={svg["points"]} />
            <div class="answer_additionally_container">
              <div class="answer_additionally">
                <If
                  data={item.author._id == Variable.myInfo._id}
                  dataIf={<div>
                    <div class="answer_additionally_item share" data-answer-id={item._id} data-type="post">{Variable.lang.select.share}</div>
                    <div class="answer_additionally_item edit" data-answer-id={item._id} data-type="post">{Variable.lang.button.edit}</div>
                    <div class="answer_additionally_item delete" data-answer-id={item._id} data-type="post">{Variable.lang.select.delete}</div>
                  </div>}
                  dataElse={<div>
                    <div class="answer_additionally_item subscribe" data-answer-id={item.author._id} data-type="post">
                      <span style={[item.subscribe ? "display: none;" : null]}>
                        {Variable.lang.button.subscribe}
                      </span>
                      <span style={[!item.subscribe ? "display: none;" : null]}>
                        {Variable.lang.button.unsubscribe}
                      </span>
                    </div>
                    <div class="answer_additionally_item share" data-answer-id={item._id} data-type="post">{Variable.lang.select.share}</div>
                    <div class="answer_additionally_item complain c-text--error" data-answer-id={item._id} data-type="post">{Variable.lang.select.complainPost}</div>
                    <div class="answer_additionally_item complain c-text--error" data-answer-id={item.author._id} data-type="user">{Variable.lang.select.complainUser}</div>
                    <div class="answer_additionally_item block c-text--error" data-answer-id={item.author._id} data-type="user">{Variable.lang.select.blackList}</div>
                  </div>}
                />
                <If
                  data={Variable.myInfo.status.role}
                  dataIf={<div style="color: #32DE80" class="answer_additionally_item delete" data-answer-id={item._id} data-type="post">{Variable.lang.select.delete}</div>
                  }
                />
              </div>
            </div>
          </div>
           {{#is myInfo.role 1}}    
                    {{#is myInfo.role_settings.del_answer 1}} 
                        <div class="acp_block">
                            <img data-action="acpSiteShow" class="acp_image" src={svg["points_green"]}>
                            <div style="display: none;" class="acp_inner">
                                <div class="acp_inner_item" data-type="dlt_user_post" data-id="{{_id}}" data-action="acpAction">
                                    Удалить Пост
                                </div>
                                <div class="acp_inner_item" data-type="ban_user" data-id="{{author._id}}" data-action="acpAction">
                                    Заблокировать пользователя
                                </div>
                            </div>
                        </div>
                    {{/is}}
                {{/is}} 
        </div> */}
      </div >

      <div
        data-action="userNewsShowFullPost"
        class="show_all_post_container"
        style="display: none;"
      >
        <div class="show_all_post_block"> </div>
        <span class="show_all_post_text">{Variable.lang.button.see_all}</span>
      </div>
    </div >
  );
};

export { BlockLentaUsers };
