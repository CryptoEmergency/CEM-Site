import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  getStorage,
  initReload
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import { If } from "@component/helpers/All.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { BlockUserCommentComment } from "@src/component/blocks/user/BlockUserCommentComment.js";
import {
  changeActiveCommentsInput,
  showVotersAndchangeStatistic,
  isEmpty
} from "@src/functions.js";

const BlockUserComment = function ({ comments }) {
  let myInfo = getStorage("myInfo");
  let auth = getStorage("auth");
let answerAdditionallyContainer = Variable.setRef();
  const showAnswerAdditionallyContainer = () => {
    answerAdditionallyContainer().style.display = "block"
initReload()
     console.log('=9cdanswerAdditionallyContainer031=',answerAdditionallyContainer().style)
  }

 


  return comments.map((item, i) => {
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
                src={svg["dislike"]}
                data-name="minus"
                onTouchStart={(e) => showVotersAndchangeStatistic(e, item._id)}
                onTouchEnd={(e) => showVotersAndchangeStatistic(e, item._id)}
                onmousedown={(e) => showVotersAndchangeStatistic(e, item._id)}
                onmouseup={(e) => showVotersAndchangeStatistic(e, item._id)}
                class={`comment_icon_type-2-1 minus  ${
                  !auth && "comment_inactive"
                } `}
              />
            </div>
            <div class="comment_likes">{item.statistic.rating}</div>
            <div class="comment_icon_type-2">
              <img
                src={svg["like"]}
                data-name="plus"
                onTouchStart={(e) => showVotersAndchangeStatistic(e, item._id)}
                onTouchEnd={(e) => showVotersAndchangeStatistic(e, item._id)}
                onmousedown={(e) => showVotersAndchangeStatistic(e, item._id)}
                onmouseup={(e) => showVotersAndchangeStatistic(e, item._id)}

                class={`comment_icon_type-2-1 plus  ${
                  !auth && "comment_inactive"
                } `}
              />
            </div>
            <span
              class="comment_comment"
              onclick={() => {
                changeActiveCommentsInput(item._id);
              }}
            >
              {Variable.lang.button.giveAnswer}
            </span>
            <div
              class={`comment_icon_type-1 answer_additionally_toggle  ${
                !auth && "comment_inactive"
              } `}
              data-action="answerAdditionallyToggle"
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} 
              onclick = {showAnswerAdditionallyContainer}
              />
              <div class="answer_additionally_container"
              ref={answerAdditionallyContainer}
              >
                <div class="answer_additionally">
                  <If
                    data={item.author._id === myInfo._id}
                    dataIf={
                      <div>
                        <div class="answer_additionally_item delete">
                          {Variable.lang.select.delete}
                        </div>
                        <div class="answer_additionally_item edit">
                          {Variable.lang.button.edit}
                        </div>
                      </div>
                    }
                    dataElse={
                      <div>
                        <div class="answer_additionally_item complain c-text--error">
                          {Variable.lang.select.complainComment}
                        </div>
                        <div class="answer_additionally_item complain c-text--error">
                          {Variable.lang.select.complainUser}
                        </div>
                        <div class="answer_additionally_item block c-text--error">
                          {Variable.lang.select.blackList}
                        </div>
                      </div>
                    }
                  />
                  {!isEmpty(myInfo)  && (
                    <If
                      data={myInfo.status.role}
                      dataIf={
                        <div
                          style="color: #32DE80"
                          class="answer_additionally_item delete"
                        >
                          {Variable.lang.select.delete}
                        </div>
                      }
                    />
                  )}
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
          <BlockUserCommentComment
            comments={item.comments}
            commentId={item._id}
          />
        </div>
        <If
          data={Variable.Static.activeCommentsInput === item._id}
          dataIf={
            <CommentInput
              nickname={item.author.nickname}
              item={item}
              commentId={item._id}
            />
          }
        />
      </div>
    );
  });
};

export { BlockUserComment };
