import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import {getDateFormat } from "@src/functions.js";







const BlockUserNewsItem = function () {

    return (

        <div class="user_news_item" data-author={item.author._id}>
        <div class="main_comment" data-link={item_id} data-action="getPost">
            {/* {{>avatar author}}                     */}
            <div class="comment_body">


                {item.media.length > 0 
                    <div class="swiper-container">  
                    <div class="swiper swiper-post_media">
                        <div class="swiper-wrapper">
                            {item.media.type !== "image" &&
                            <a class="swiper-slide">
                                        {
                                            item.media.type === "image" ? 
                                            <div class="swiper-post_media_image_container">
                                                <img data-action=""  src="/assets/upload/posts/{ item.media.name }"/>
                                                {/* {{!-- <img {{#if data.fullsize}}data-action="fullSize"{{/if}} src="/assets/upload/posts/{ item.media.name }"> --}} */}
                                            </div>
                                            :
                                            <div id="{{id}}" data-id={item.media._id} data-type={item.media.type} data-name={item.media.name} class="video_container">
                                            <video playsinline poster={images["video_background"]} preload="metadata"  onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)"  onclick="controlPlayerClick(event, this)" ondblclick="openFullscreenThis(event, this)" src="{{path}}{{src}}"></video>
                                        
                                            {/* {{!-- <video preload="metadata"  onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)"  onclick="controlPlayerClick(event, this)" ondblclick="openFullscreenThis(event, this)" src="{{path}}{{src}}"></video> --}} */}
                                            <div class="controls">
                                                <img  src={svg["player_play"]} class="playpause paused" onclick="controlPlaypause(event, this)" />
                                                <span class="progress_player">
                                                    <span class="total_player" onclick="controlTotalClick(event, this)">
                                                        <span class="current">​</span>
                                                    </span>
                                                </span>
                                                <span class="time">
                                                    <span class="currentTime">00:00:00</span> / 
                                                    <span class="duration">00:00:00</span>
                                                </span>
                                                <span class="volume">
                                                    <img src={svg["player_dynamic_on"]} class="dynamic" onclick="controlDynamicClick(event, this)"/>
                                                </span>
                                                <span class="player_fullsize" style="display: none;">
                                                    <img src={svg["player_fullsize_on"]} onclick="openFullscreen(event, this)"/>
                                                </span>
                                            </div>
                                        </div>
                                        }  
                                    </a>
                            }  
                        </div>
                        <div class="swiper-pagination swiper-pagination-post_media"></div>
                        <div class="swiper-scrollbar-post_media"></div>
                    </div> 
                </div>
                
            }















                {{#if media}}
                    {{#if (ArrayLengthOne media)}}
                        <div class="swiper-container">  
                            <div class="swiper swiper-post_media">
                                <div class="swiper-wrapper">
                                    {{#arrayWhile media}}  
                                        {{#is type "audio"}}
                                        {{else}}
                                            <a class="swiper-slide">
                                                {{#is type "image"}}
                                                    <div class="swiper-post_media_image_container">
                                                        <img data-action="" {{#if data.fullsize}}data-action=""{{/if}} src="/assets/upload/posts/{{ name }}">
                                                        {/* {{!-- <img {{#if data.fullsize}}data-action="fullSize"{{/if}} src="/assets/upload/posts/{{ name }}"> --}} */}
                                                    </div>
                                                {{/is}} 
                                                {{#is type "video"}}
                                                    {/* {{>videoPlayer src=name path="/assets/upload/posts/"}} */}
                                                {{/is}}
                                            </a>
                                        {{/is}}
                                    {{/arrayWhile}}
                                </div>
                                <div class="swiper-pagination swiper-pagination-post_media"></div>
                                <div class="swiper-scrollbar-post_media"></div>
                            </div> 
                        </div>
                    {{else}}
                        {{#arrayWhile media}}  
                            {{#is type "audio"}}
                            {{else}}
                                    {{#is type "image"}}
                                        <div class="swiper-post_media_image_container">
                                            <img data-action="" {{#if data.fullsize}}data-action=""{{/if}} src="/assets/upload/posts/{{ name }}">
                                            {/* {{!-- <img {{#if data.fullsize}}data-action="fullSize"{{/if}} src="/assets/upload/posts/{{ name }}">   --}} */}
                                        </div>
                                    {{/is}}
                                    {{#is type "video"}}
                                        {/* {{>videoPlayer src=name path="/assets/upload/posts/"}} */}
                                    {{/is}}
                            {{/is}}
                        {{/arrayWhile}} 
                    {{/if}}

                    <div class="post_audio_container">
                        {{#is (audioCountCheck media) true}}
                            {{#if text}}
                                {{#arrayWhile media}}
                                    {{#is type "audio"}}
                                        {{>audioPlayer src=name path="/assets/upload/posts/"}}
                                    {{/is}}
                                {{/arrayWhile}}
                            {{else}}
                                <div class="user_post_text_background">
                                    {{#arrayWhile media}}
                                        {{#is type "audio"}}
                                            {{>audioPlayer src=name path="/assets/upload/posts/"}}
                                        {{/is}}
                                    {{/arrayWhile}}
                                </div>
                            {{/if}}
                        {{else}}
                        {{#arrayWhile media}}
                            {{#is type "audio"}}
                                {{>audioPlayer src=name path="/assets/upload/posts/"}}
                            {{/is}}
                        {{/arrayWhile}}
                        {{/is}}
                    </div>
                {{/if}}
                {{#if media}}
                    <span data-text="{{text}}" class="comment_text">{{{ text }}}</span>
                {{else}}
                    {{#is (textLengthCheck text) true}}
                        <div class="user_post_text_background">
                            <span class="comment_text">{{{ text }}}</span>
                        </div>
                    {{else}}
                        <span data-text="{{text}}" class="comment_text">{{{ text }}}</span>
                    {{/is}}
                {{/if}}
            </div>
            <div class="user_post_statistic">
                <span class="c-date">{item.updateTime ? `${lang.text.update} ${getDateFormat(item.updateTime)}` : getDateFormat(item.showDate)}</span>
                    <div class="user_post_statistic_item">
                        <div class="user_post_statistic_image">
                            <img src={svg["question_answers"]}/> <span>{item.statistic.comments} </span>
                        </div>
                        <div class="user_post_statistic_image">
                            <img src={svg["question_views"]}/> {item.statistic.view}
                        </div>
                    </div>
                    <div class="user_post_statistic_item">
                        <div class="comment_icon_type-2">
                          {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/dislike.svg" class="comment_icon_type-2-1 minus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
                          <button type="button" data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src={svg["dislike"]}  class="comment_icon_type-2-1 minus comment_inactive" data-answer-id={ item._id } data-needauth="true" data-type="post" data-action="answerEvaluation"></button>
                          {/* LOGIKU AVTORIZOVAN ILI NET NE ZABIT */}
                        </div>
                        <div class="comment_likes" id="likes_{{_id}}">
                            {statistic.rating}
                        </div>
                        <div class="comment_icon_type-2">
                          {/* {{!-- <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src="/assets/icon/like.svg" class="comment_icon_type-2-1 plus {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}" data-answer-id={{ _id }} data-needauth="true" data-type="post" data-action="answerEvaluation"> --}} */}
                          <button data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" src={svg["like"]} class="comment_icon_type-2-1 plus comment_inactive" data-answer-id={ item._id } data-needauth="true" data-type="post" data-action="answerEvaluation"></button>
                        </div>
                    </div>  
            </div>
            {/* <div class="comment_icons">
                <div class="comment_icon_type-1 answer_additionally_toggle {{#is data.auth "true"}}{{else}}comment_inactive{{/is}}"  data-needauth="true" data-action="answerAdditionallyToggle">
                    <img class="answer_additionally_toggle_img" src="/assets/icon/points.svg">
                    <div class="answer_additionally_container">
                        <div class="answer_additionally">
                            {{#is author._id data.myInfo._id}}
                                <div data-needauth="true" class="answer_additionally_item share" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{{lang.select.share}}</div>
                                <div data-needauth="true" class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id="{{_id}}" data-type="post">{{lang.button.edit}}</div>
                                <div data-needauth="true" class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id="{{_id}}" data-type="post">{{lang.select.delete}}</div>
                            {{else}}    
                                <div data-needauth="true" class="answer_additionally_item subscribe" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="post">
                                    <span {{#if subscribe}}style="display: none;"{{/if}}>
                                        {{lang.button.subscribe}}
                                    </span>
                                    <span {{#notif subscribe}}style="display: none;"{{/notif}}>
                                        {{lang.button.unsubscribe}}
                                    </span>
                                </div>
                                <div data-needauth="true" class="answer_additionally_item share" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{{lang.select.share}}</div>
                                <div data-needauth="true" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ _id }} data-type="post">{{lang.select.complainPost}}</div>
                                <div data-needauth="true" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="user">{{lang.select.complainUser}}</div>
                                <div data-needauth="true" class="answer_additionally_item block c-text--error" data-action="answerAdditionallyItem" data-answer-id={{ author._id }} data-type="user">{{lang.select.blackList}}</div>
                            {{/is}}
                            {{#if data.myInfo.status.role}}
                                <div style="color: #32DE80" data-needauth="true" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{_id}}" data-type="post">{{lang.select.delete}}</div>
                            {{/if}}
                      </div>
                    </div>
                </div>
                 {{#is myInfo.role 1}}    
                    {{#is myInfo.role_settings.del_answer 1}} 
                        <div class="acp_block">
                            <img data-action="acpSiteShow" class="acp_image" src="/assets/icon/points_green.svg">
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
        </div> 
        
        {/* <div data-action="userNewsShowFullPost" class="show_all_post_container" style="display: none;"> 
            <div class="show_all_post_block">  </div>
            <span class="show_all_post_text">{{lang.button.see_all}}</span>
        </div>  */}
    </div>
    )
}

export { BlockUserNewsItem }