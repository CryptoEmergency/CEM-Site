import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml,
    getStorage,
  } from "@betarost/cemjs";
  import svg from "@assets/svg/index.js";
  import { Avatar } from "@component/element/Avatar.js";
  import { If } from "@component/helpers/All.js";

  const BlockUserCommentComment = function ({ comments, newsId, }) {
    let myInfo = getStorage("myInfo");
    let auth = getStorage("auth");
   const replyToComment = () => {
  
   }
  
  
  
    return comments.map((item, i) => {
  // console.log('=184511=',item)
      return (
        <div data-comment_comment={item._id} class="main_comment userComment">
          <Avatar author={item.author} nickNameAndDate={true} />
          <div class="comment_body">
            <span class="comment_text">{stringToHtml(item.text)} </span>
          </div>
          <div class="comment_icons">
            <div
              style="justify-content: flex-end;"
              class="user_post_statistic_item"
            >
              <div class="comment_icon_type-2">
                <img
                  data-mousedown="evaTouchStart"
                  data-mouseup="evaTouchEnd"
                  data-touchstart="evaTouchStart"
                  data-touchend="evaTouchEnd"
                  data-set="{{data.type}}"
                  src={svg["dislike"]}
                  class={`comment_icon_type-2-1 minus  ${
                    !auth && "comment_inactive"
                  } `}
                  data-answer-id={item._id}
                  data-answerID="{{data.post_id}}"
                  data-needauth="true"
                  data-type="comment"
                  data-action="answerEvaluation"
                />
              </div>
              <div class="comment_likes" id="likes_{{_id}}">
                {item.statistic.rating}
              </div>
              <div class="comment_icon_type-2">
                <img
                  data-mousedown="evaTouchStart"
                  data-mouseup="evaTouchEnd"
                  data-touchstart="evaTouchStart"
                  data-touchend="evaTouchEnd"
                  data-set="{{data.type}}"
                  src={svg["like"]}
                  class={`comment_icon_type-2-1 plus  ${
                    !auth && "comment_inactive"
                  } `}
                  data-answer-id={item._id}
                  data-answerID="{{data.post_id}}"
                  data-needauth="true"
                  data-type="comment"
                  data-action="answerEvaluation"
                />
              </div>
              <span
                data-type="{{data.type}}"
                data-main="{{ _id }}"
                data-id="{{ _id }}"
                data-answer_id="{{data.post_id}}"
                data-action="commentComment"
                class="comment_comment"
                onclick = {replyToComment}
              >
                {Variable.lang.button.giveAnswer}
              </span>
              <div
                class={`comment_icon_type-1 answer_additionally_toggle  ${
                  !auth && "comment_inactive"
                } `}
                data-action="answerAdditionallyToggle"
              >
                <img class="answer_additionally_toggle_img" src={svg["points"]} />
                <div class="answer_additionally_container">
                  <div class="answer_additionally">
                    <If
                      data={item.author._id === myInfo._id}
                      dataIf={
                        <div>
                          <div
                            data-set="{{data.type}}"
                            class="answer_additionally_item delete"
                            data-action="answerAdditionallyItem"
                            data-answer-id={item.author._id}
                            data-answerID="{{data.post_id}}"
                            data-type="comment"
                          >
                            {Variable.lang.select.delete}
                          </div>
                          <div
                            data-set="{{data.type}}"
                            class="answer_additionally_item edit"
                            data-action="answerAdditionallyItem"
                            data-answer-id={item.author._id}
                            data-answerID="{{data.post_id}}"
                            data-type="comment"
                          >
                            {Variable.lang.button.edit}
                          </div>
                        </div>
                      }
                      dataElse={
                        <div>
                          <div
                            data-set="{{data.type}}"
                            class="answer_additionally_item complain c-text--error"
                            data-action="answerAdditionallyItem"
                            data-answer-id={item._id}
                            data-answerID="{{data.post_id}}"
                            data-type="comment"
                          >
                            {Variable.lang.select.complainComment}
                          </div>
                          <div
                            data-set="{{data.type}}"
                            class="answer_additionally_item complain c-text--error"
                            data-action="answerAdditionallyItem"
                            data-answer-id={item.author._id}
                            data-answerID="{{data.post_id}}"
                            data-type="user"
                          >
                            {Variable.lang.select.complainUser}
                          </div>
                          <div
                            data-set="{{data.type}}"
                            class="answer_additionally_item block c-text--error"
                            data-action="answerAdditionallyItem"
                            data-answer-id={item.author._id}
                            data-answerID="{{data.post_id}}"
                            data-type="user"
                          >
                            {Variable.lang.select.blackList}
                          </div>
                        </div>
                      }
                    />
                    <If
                      data={myInfo.status.role}
                      dataIf={
                        <div
                          style="color: #32DE80"
                          data-set="{{data.type}}"
                          class="answer_additionally_item delete"
                          data-action="doRoleModal"
                          // data-answer-id={ _id }
                          data-answerID="{{data.post_id}}"
                          data-type="comment"
                        >
                          {Variable.lang.select.delete}
                        </div>
                      }
                    />
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
        </div>
      );
    });
  };
  
  export { BlockUserCommentComment };