import {
  jsx,
  jsxFrag,
  Variable,
  getVariable,
  getStorage,
  getValue,
  stringToHtml,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { getDateFormat, parseTextforJsx } from "@src/functions.js";
import { AudioPlayer } from "@component/element/AudioPlayer.js";
import { Slider } from "@component/element/Slider.js";
import { Avatar } from '@component/element/Avatar.js';

const returnImgOrVideo = (item) => {
  if (
    item.media.length > 1 &&
    item.media.find((i) => i.type === "audio") == undefined
  ) {
    return (

      // <div class="swiper-container">
      //   <div class="swiper swiper-post_media">
      //     <div class="swiper-wrapper">
      //       {item.media.map((mediaItem) => {
      //         return (
      //           <a class="swiper-slide">
      //             {item.media.find((i) => i.type === "image") !== undefined && (
      //               <div class="swiper-post_media_image_container">
      //                 <img
      //                   data-action=""
      //                   src={`/assets/upload/posts/${mediaItem.name}`}
      //                 />
      //                 {/* {{!-- <img {{#if data.fullsize}}data-action="fullSize"{{/if}} src="/assets/upload/posts/{{ name }}"> --}} */}
      //               </div>
      //             )}
      //             {item.media.find((i) => i.type === "video") !== undefined && (
      //               //  {{>videoPlayer src=name path="/assets/upload/posts/"}}
      //               <p>video more</p>
      //             )}
      //           </a>
      //         );
      //       })}
      //     </div>
      //     <div class="swiper-pagination swiper-pagination-post_media"></div>
      //     <div class="swiper-scrollbar-post_media"></div>
      //   </div>
      // </div>
      <Slider item={item} />
    );
  } else if (item.media.find((i) => i.type === "audio") == undefined) {
    return (
      item.media.find((i) => i.type === "image") !== undefined
        ?
        <div class="swiper-post_media_image_container">
          <img
            data-action=""
            src={`/assets/upload/posts/${item.media[0].name}`}
          />
          {/* {{!-- <img {{#if data.fullsize}}data-action="fullSize"{{/if}} src="/assets/upload/posts/{{ name }}">   --}} */}
        </div>
        :
        //  {{>videoPlayer src=name path="/assets/upload/posts/"}}
        <p>video </p>
    );
  }
};

const BlockLentaUsers = function ({ item }) {
  // console.log('=4d0c8d=', item)
  const isAuth = Variable.auth;
  //   const parser = new DOMParser();
  //   let jsx1 = parser.parseFromString(item.text, "text/html");
  //   //   let tmp = [...jsx1.body.childNodes];

  return (
    <div class="user_news_item" data-author={item.author._id}>
      <div class="main_comment" data-link={item._id} data-action="getPost">
        {/* {{>avatar author}}                     */}
        <Avatar author={item.author} />
        <div class="comment_body">
          {item.media.length > 0 && returnImgOrVideo(item)}

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
            <span data-text={item.text} class="comment_text">
              {/* {parseTextforJsx(item.text).map((item)=>{
                return item
              })} */}
              {item.text}
              {/* {stringToHtml(item.text)} */}
            </span>
          ) : item.text.length < 100 ? (
            <div class="user_post_text_background">
              <span class="comment_text">
                {item.text}
                {/* {stringToHtml(item.text)} */}
                {/* {parseTextforJsx(item.text).map((item)=>{
                return item
              })} */}
              </span>
            </div>
          ) : (
            <span data-text={item.text} class="comment_text">
              {item.text}
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
            <div class="comment_icon_type-2">
              {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/dislike.svg" class="comment_icon_type-2-1 minus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
              <button type="button" data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src={svg["dislike"]} class="comment_icon_type-2-1 minus comment_inactive" data-answer-id={item._id} data-needauth="true" data-type="post" data-action="answerEvaluation"></button>
            </div>
            <div class="comment_likes" id={`likes_${item._id}`}>
              {item.statistic.rating}
            </div>
            <div class="comment_icon_type-2">
              {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/like.svg" class="comment_icon_type-2-1 plus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
              <button data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd"
                src={svg["like"]} class="comment_icon_type-2-1 plus comment_inactive" data-answer-id={item._id} data-needauth="true" data-type="post"
                data-action="answerEvaluation"></button>
            </div>
          </div>
        </div>

        <div class="comment_icons">
          <div
            class={`comment_icon_type-1 answer_additionally_toggle ${!isAuth && "comment_inactive"}`}
            data-needauth="true" data-action="answerAdditionallyToggle">
            <img class="answer_additionally_toggle_img" src={svg["points"]} />
            <div class="answer_additionally_container">
              <div class="answer_additionally">
                {/* {{#is author._id data.myInfo._id}}
                                <div data-needauth="true" class="answer_additionally_item share" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{lang.select.share}</div>
                                <div data-needauth="true" class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id="{{_id}}" data-type="post">{lang.button.edit}</div>
                                <div data-needauth="true" class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id="{{_id}}" data-type="post">{lang.select.delete}</div>
                            {{else}}    
                                <div data-needauth="true" class="answer_additionally_item subscribe" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="post">
                                    <span {{#if subscribe}}style="display: none;"{{/if}}>
                                        {{lang.button.subscribe}}
                                    </span>
                                    <span {{#notif subscribe}}style="display: none;"{{/notif}}>
                                        {{lang.button.unsubscribe}}
                                    </span>
                                </div>
                                <div data-needauth="true" class="answer_additionally_item share" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{lang.select.share}</div>
                                <div data-needauth="true" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{lang.select.complainPost}</div>
                                <div data-needauth="true" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="user">{lang.select.complainUser}</div>
                                <div data-needauth="true" class="answer_additionally_item block c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="user">{lang.select.blackList}</div>
                            {{/is}}
                            {{#if data.myInfo.status.role}}
                                <div style="color: #32DE80" data-needauth="true" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{_id}}" data-type="post">{{lang.select.delete}}</div>
                            {{/if}} */}
              </div>
            </div>
          </div>
          {/* {{#is myInfo.role 1}}    
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
                {{/is}} */}
        </div>
      </div>

      <div
        data-action="userNewsShowFullPost"
        class="show_all_post_container"
        style="display: none;"
      >
        <div class="show_all_post_block"> </div>
        <span class="show_all_post_text">{Variable.lang.button.see_all}</span>
      </div>
    </div>
  );
};

export { BlockLentaUsers };
