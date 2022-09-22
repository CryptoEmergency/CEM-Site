import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml
} from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { Avatar } from '@component/element/Avatar.js';
import {getDateFormat} from "@src/functions.js";

const BlockUserComment = function ({comments}) {
    console.log('=comments=',comments)

    return (
        comments.map((item) => {
            return <div data-comment_comment={item._id} class="main_comment userComment">
                {/* {{>avatar author showDate=(getTimeFormat showDate)}}                     */}
                <Avatar author={item.author} />
                    {/* <a
                        style="display: block; left: 5px;bottom:5px"
                        href={`/user/${item.author.nickname}`}
                        class="c-question__nickname"
                    >  */}
                    {/* load */}
                        {/* {item.author.nickname}
                    </a> */}

<div class="">
        <span>{item.author.nickname}</span><br/>
        <span>{getDateFormat(item.author.showDate,"userComment")}</span>
    </div>
            <div class="comment_body" >
                <span class="comment_text">{stringToHtml (item.text) }  </span>
            </div>
            <div class="comment_icons">
                <div style="justify-content: flex-end;" class="user_post_statistic_item">
                    <div class="comment_icon_type-2">
                    <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd"
                     data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" 
                     data-set="{{data.type}}"
                     src = {svg["dislike"]}
                      class="comment_icon_type-2-1 minus {{#if data.auth}}{{else}} comment_inactive {{/if}}"
                       data-answer-id={ item._id } data-answerID="{{data.post_id}}" data-needauth="true" 
                       data-type="comment" data-action="answerEvaluation"/>
                    </div>
                    <div class="comment_likes" id="likes_{{_id}}">
                        {item.statistic.rating}
                    </div>
                    <div class="comment_icon_type-2">
                    <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd"
                     data-touchstart="evaTouchStart" data-touchend="evaTouchEnd"
                      data-set="{{data.type}}" 
                      src = {svg["like"]}
                      class="comment_icon_type-2-1 plus {{#if data.auth}}{{else}} comment_inactive {{/if}}"
                       data-answer-id={ item._id } data-answerID="{{data.post_id}}" 
                       data-needauth="true" data-type="comment" data-action="answerEvaluation"/>
                    </div>
                    <span data-type="{{data.type}}" data-main="{{ _id }}" data-id="{{ _id }}" data-answer_id="{{data.post_id}}" data-action="commentComment" class="comment_comment">{Variable.lang.button.giveAnswer}</span>
                    <div class="comment_icon_type-1 answer_additionally_toggle {{#if data.auth}}{{else}} comment_inactive {{/if}}" data-action="answerAdditionallyToggle">
                        <img class="answer_additionally_toggle_img" 
                        src = {svg["points"]}/>
                        <div class="answer_additionally_container">
                            <div class="answer_additionally">
                                {/* {{#is author._id data.userInfo._id}}
                                    <div data-set="{{data.type}}" class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{Variable.lang.select.delete}</div>
                                    <div data-set="{{data.type}}" class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{Variable.lang.button.edit}</div>
                                {{else}}
                                    <div data-set="{{data.type}}" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{Variable.lang.select.complainComment}</div>
                                    <div data-set="{{data.type}}" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{data.post_id}}" data-type="user">{Variable.lang.select.complainUser}</div>
                                    <div data-set="{{data.type}}" class="answer_additionally_item block c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{data.post_id}}" data-type="user">{Variable.lang.select.blackList}</div>
                                {{/is}}
                                {{#if data.userInfo.status.role}}
                                    <div style="color: #32DE80" data-set="{{data.type}}" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{Variable.lang.select.delete}</div>
                                {{/if}} */}
                            </div>
                        </div>
                    </div>
                </div> 
                {/* {{#is myInfo.role 1}}    
                    {{#is myInfo.role_settings.del_answer 1}} 
                            <div class="acp_block">
                                <img data-action="acpSiteShow" class="acp_image" src="/assets/icon/points_green.svg">
                                <div style="display: none;" class="acp_inner">
                                    <div class="acp_inner_item" data-type="dlt_answer_comment" data-id="{{_id}}" data-action="acpAction">
                                        Удалить Комментарий
                                    </div>                                   
                                </div>
                            </div>
                    {{/is}}
                {{/is}} */}
            </div>
            <div class="user_comment_comment">
                {/* {{>userCommentComment list_records=comments}} */}
            </div>
        </div>

            
        })






//         {{#arrayWhile list_records "parentElement1"}}
        // <div data-comment_comment="{{_id}}" class="main_comment userComment">
        //     {{>avatar author showDate=(getTimeFormat showDate)}}                    
        //     <div class="comment_body" >
        //         <span class="comment_text">{{{ text }}}  </span>
        //     </div>
        //     <div class="comment_icons">
        //         <div style="justify-content: flex-end;" class="user_post_statistic_item">
        //             <div class="comment_icon_type-2">
        //             <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" data-set="{{data.type}}" src="/assets/icon/dislike.svg" class="comment_icon_type-2-1 minus {{#if data.auth}}{{else}}comment_inactive{{/if}}" data-answer-id={{ _id }} data-answerID="{{data.post_id}}" data-needauth="true" data-type="comment" data-action="answerEvaluation">
        //             </div>
        //             <div class="comment_likes" id="likes_{{_id}}">
        //                 {{statistic.rating}}
        //             </div>
        //             <div class="comment_icon_type-2">
        //             <img data-mousedown="evaTouchStart" data-mouseup="evaTouchEnd" data-touchstart="evaTouchStart" data-touchend="evaTouchEnd" data-set="{{data.type}}" src="/assets/icon/like.svg" class="comment_icon_type-2-1 plus {{#if data.auth}}{{else}}comment_inactive{{/if}}" data-answer-id={{ _id }} data-answerID="{{data.post_id}}" data-needauth="true" data-type="comment" data-action="answerEvaluation">
        //             </div>
        //             <span data-type="{{data.type}}" data-main="{{ _id }}" data-id="{{ _id }}" data-answer_id="{{data.post_id}}" data-action="commentComment" class="comment_comment">{{lang.button.giveAnswer}}</span>
        //             <div class="comment_icon_type-1 answer_additionally_toggle {{#if data.auth}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
        //                 <img class="answer_additionally_toggle_img" src="/assets/icon/points.svg">
        //                 <div class="answer_additionally_container">
        //                     <div class="answer_additionally">
        //                         {{#is author._id data.userInfo._id}}
        //                             <div data-set="{{data.type}}" class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{{lang.select.delete}}</div>
        //                             <div data-set="{{data.type}}" class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{{lang.button.edit}}</div>
        //                         {{else}}
        //                             <div data-set="{{data.type}}" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{{lang.select.complainComment}}</div>
        //                             <div data-set="{{data.type}}" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{data.post_id}}" data-type="user">{{lang.select.complainUser}}</div>
        //                             <div data-set="{{data.type}}" class="answer_additionally_item block c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{data.post_id}}" data-type="user">{{lang.select.blackList}}</div>
        //                         {{/is}}
        //                         {{#if data.userInfo.status.role}}
        //                             <div style="color: #32DE80" data-set="{{data.type}}" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id={{_id}} data-answerID="{{data.post_id}}" data-type="comment">{{lang.select.delete}}</div>
        //                         {{/if}}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div> 
        //         {{#is myInfo.role 1}}    
        //             {{#is myInfo.role_settings.del_answer 1}} 
        //                     <div class="acp_block">
        //                         <img data-action="acpSiteShow" class="acp_image" src="/assets/icon/points_green.svg">
        //                         <div style="display: none;" class="acp_inner">
        //                             <div class="acp_inner_item" data-type="dlt_answer_comment" data-id="{{_id}}" data-action="acpAction">
        //                                 Удалить Комментарий
        //                             </div>                                   
        //                         </div>
        //                     </div>
        //             {{/is}}
        //         {{/is}}
        //     </div>
        //     <div class="user_comment_comment">
        //         {{>userCommentComment list_records=comments}}
        //     </div>
        // </div>
//         <!-- 
//         <div data-action="userNewsShowFullPost" class="show_all_post_container" style="display: none;"> 
//             <div class="show_all_post_block">  </div> 1
//             <span class="show_all_post_text">{{lang.button.see_all}}</span>
//         </div> -->
        
// {{else}}
// {{/arrayWhile}}
    )
}

export { BlockUserComment };