import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  getStorage,
  initReload,
  initGo,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import { If } from "@component/helpers/All.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { BlockUserCommentComment } from "@src/component/blocks/user/BlockUserCommentComment.js";
import {
  changeActiveCommentsInput,
  showVotersAndchangeStatistic,
  isEmpty,
} from "@src/functions.js";
import {
  showAnswerAdditionallyContainer,
  closeAnswerAdditionally,
} from "@src/functionsE.js";

const BlockUserComment = function ({ comments }) {
  let myInfo = getStorage("myInfo");
  let auth = getStorage("auth");
  console.log('=d0Variable.Static.answerAdditionallyeece1=',Variable.Static.answerAdditionally)
  return comments.map((item, i) => {
    return (
      <div data-comment_comment={item._id} class="main_comment userComment">
        <Avatar author={item.author} nickNameAndDate={true} />
        {Variable.Static.activeEditInputs.findIndex((it) => it === item._id) <
        0 ? (
          <div class="comment_body">
            <span class="comment_text">{stringToHtml(item.text)} </span>
          </div>
        ) : (
          <CommentInput
            item={item}
            commentId={item._id}
            edit={{ mainCom: true }}
          />
        )}

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
                Variable.Static.answerAdditionally = true;
                Variable.Static.answerAdditionallyShow = "";
                changeActiveCommentsInput(item._id);
              }}
            >
              {Variable.lang.button.giveAnswer}
            </span>
            <div
              class={`comment_icon_type-1 answer_additionally_toggle  ${
                (!auth || Variable.Static.answerAdditionally) && "comment_inactive"
              } `}
              data-action="answerAdditionallyToggle"
              onclick={() => (auth &&  !Variable.Static.answerAdditionally ) && showAnswerAdditionallyContainer(item._id)}
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} />
              <div
                class="answer_additionally_container"
                style={
                  (Variable.Static.answerAdditionallyShow === item._id && !Variable.Static.answerAdditionally )
                    ? "display : block"
                    : "display : none"
                }
              >
                <div class="answer_additionally">
                  <If
                    data={item.author._id === myInfo._id}
                    dataIf={
                      <div>
                        <div
                          class="answer_additionally_item delete"
                          onclick={(e) => {
                            closeAnswerAdditionally(e); 
                           
                            e.target.parentElement.parentElement.parentElement.style="display : none"
                            Variable.SetModals({
                              name: "ModalDelComment",
                              data: { id: item._id, mainCom: true },
                            },true);
                          
                          }}
                        >
                          {Variable.lang.select.delete}
                        </div>
                        <div
                          class="answer_additionally_item edit"
                          onclick={(e) => {
                            closeAnswerAdditionally(e);
                            if(Variable.Static.activeEditInputs.findIndex(
                                (it) => it === item._id
                              ) < 0){
                                Variable.Static.activeEditInputs.push(item._id);
                            
                              }initReload();
                          }}
                        >
                          {Variable.lang.button.edit}
                        </div>
                      </div>
                    }
                    dataElse={
                      <div>
                        <div
                          class="answer_additionally_item complain c-text--error"
                          onclick={(e) => {
                            closeAnswerAdditionally(e);
                            e.target.parentElement.parentElement.parentElement.style="display : none"
                            Variable.SetModals({
                              name: "ModalComplainComment",
                              data: { id: item._id, mainCom: true },
                            },true);
                          }}
                        >
                          {Variable.lang.select.complainComment}
                        </div>
                        <div class="answer_additionally_item complain c-text--error">
                          {Variable.lang.select.complainUser}
                        </div>
                        <div
                          class="answer_additionally_item block c-text--error"
                          onclick={(e) => {
            
                            closeAnswerAdditionally(e);
                            e.target.parentElement.parentElement.parentElement.style="display : none"
                           
                           
                            Variable.SetModals({
                              name: "ModalBlackList",
                              data: { id: item.author._id },
                            },true);
                          }}
                        >
                          {Variable.lang.select.blackList}
                        </div>
                      </div>
                    }
                  />
                  {!isEmpty(myInfo) && (
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
