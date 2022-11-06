import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable,
    getValue,
    initReload,
    sendApi,
    initGo,
    initOne,
    stringToHtml,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getPostItemInShow } from "@src/apiFunctions.js";
import { BlockLentaUsers } from "@component/blocks/BlockLentaUsers.js";

const ModalFullPost = function ({ post }, reload) {
    // console.log('=abe2f1=', post)

    initOne(async () => {
        //   Variable.Static.ShowVoterInteval = { timer: 0 };
        //   Variable.Static.resultShowVoter = undefined;
        //   Variable.Static.activeCommentsInput = "";
        //   Variable.Static.answerAdditionallyShow = "";
        //   Variable.Static.showMainInput = true;
        //   Variable.Static.activeEditInputs = [];
        //   Variable.Static.answerAdditionally = false;
        //   Variable.Static.showNewsId = news._id;
    });

    return (
        <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalFullPost">
            <section class="c-modal__dialog">
                <div class="c-modal__body">
                    <div class="c-fullpost user_post_container">
                        <div class="c-fullpost__block user_news_block">
                            <div class="c-fullpost__header user_post_header">
                                <a
                                    class="c-goback"
                                    onclick={() => { Variable.Modals = [] }}
                                >
                                    <img class="c-goback__arrow" src={svg["go_back_icon"]} />
                                    <span class="c-goback__text">{Variable.lang.span.back}</span>
                                </a>
                                {/* {{#arrayWhile list_records}} */}
                                <div class="comment_icon_type-1 answer_additionally_toggle {{#if data.auth}}{{else}}comment_inactive{{/if}}" data-needauth="true" data-action="answerAdditionallyToggle">
                                    <img class="answer_additionally_toggle_img" src={svg.points} />
                                    <div class="answer_additionally_container">
                                        <div class="answer_additionally">
                                            {/* {{#is author._id data.userInfo._id}}
                                                    <div class="answer_additionally_item share" data-answer-id={ _id } data-type="post">{lang.select.share}</div>
                                                    <div class="answer_additionally_item edit" data-answer-id={_id} data-type="post">{lang.button.edit}</div>
                                                    <div class="answer_additionally_item delete" data-answer-id={_id} data-type="post">{lang.select.delete}</div>
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
                                                {{#if data.userInfo.status.role}}
                                                    <div style="color: #32DE80" data-needauth="true" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{_id}}" data-type="post">{{lang.select.delete}}</div>
                                                {{/if}} */}
                                        </div>
                                    </div>
                                </div>
                                {/* {{/arrayWhile}} */}
                            </div>
                            <BlockLentaUsers item={post} />
                            {/* {{#if noComment}}
                            {{else}}
                                {{#arrayWhile list_records}}
                                    <div class="user_news_top">
                                        <h2>{{lang.h.modal_comment}}</h2>
                                        <div class="comment_filters">
                                            <div data-id="{{_id}}" data-action="commentsSort" data-sorttype="date" data-type="post" data-sortdir="-1"><img src="/assets/icon/comment_date.svg"><img src="/assets/icon/comment_arrow_top.svg"></div>
                                            <div data-id="{{_id}}" data-action="commentsSort" data-sorttype="rating" data-type="post" data-sortdir="1"><img src="/assets/icon/comment_rating.svg"></div>
                                        </div>
                                    </div>
                                    <div data-type="post_comment" class="create_post_coments">
                                        <div data-type="post_comment" class="create_post_container">
                                            <div data-onpaste="editorPaste" data-keyup="blogPostKeyUp" data-type="post_comment" contenteditable="true" class="create_post_chapter create_post_main_text"></div>
                                        </div>
                                        <div style="" data-quote="" data-type="post_comment" id="postCommentSend" data-action="postCommentSend" data-post_id="{{_id}}" class="button-container-preview comments_send">
                                            <img src="/assets/icon/send_message.svg">
                                        </div> 
                                    </div>
                                    <div data-type="post_comment" class="post_comments">
                                        <div {{#if comments}}{{else}}style="display: none;"{{/if}}  class="user_news_item">
                                            {{>userComment list_records=comments}} 
                                        </div> 
                                    </div>
                                {{/arrayWhile}}
                            {{/if}} */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ModalFullPost;
