import { jsx, jsxFrag, Variable, Helpers, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

import { If, Map } from "@component/helpers/All.js";

import { Avatar, Likes } from "@component/element/index.js";

const QuestionAnswerItemComment = function ({
  item,
  index,
  mainId,
  commentId,
}) {
  let comId = item._id;
  return (
    <div class="user_comment_branch">
      <div class="user_comment_branch_item comment_border">
        <Avatar author={item.author} nickName={item.author.nickname}  dateShow={item.showDate}/>
        <div class="comment_body">
          <span class="comment_text">{Helpers.clearText(item.text)}</span>
          <If
            data={Variable.auth}
            dataIf={
              <span class="answer_comment_button">
                {Variable.lang.button.giveAnswer}
              </span>
            }
          />
        </div>
        <div class="comment_icons">
          <If
            data={commentId}
            dataIf={
              <Likes
                item={item}
                typeGet="getComments"
                typeSet="setAnswer"
                mainId={mainId}
                commentId = {commentId}
              />
            }
            dataElse={
              <Likes
                item={item}
                typeGet="getComments"
                typeSet="setAnswer"
                mainId={mainId}
              />
            }
          />
           <div
              class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}"
              data-action="answerAdditionallyToggle"
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} />
            </div>
        </div>
      </div>
      <If
        data={!commentId}
        dataIf={
          <div class="comment_answer">
            <Map
              data={item.comments}
              dataIf={(item, index) => {
                return (
                  <QuestionAnswerItemComment
                    item={item}
                    index={index}
                    mainId={mainId}
                    commentId={comId}
                  />
                );
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export { QuestionAnswerItemComment };
