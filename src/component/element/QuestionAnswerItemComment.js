import {
  jsx,
  jsxFrag,
  Variable,
  Helpers,
  initReload,
  stringToHtml,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

import { If, Map } from "@component/helpers/All.js";

import {
  Avatar,
  Likes,
  CommentInput,
  AnswerAdditionallyToggleNew,
} from "@component/element/index.js";
import { wrapTextWithATag, wrapTagToText } from "@src/functions.js";
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
        <Avatar
          author={item.author}
          nickName={item.author.nickname}
          dateShow={item.showDate}
        />
        <div class="comment_body">
          <If
            data={Variable.Static.EditInput !== item._id}
            dataIf={
              <span class="comment_text">
                {Helpers.clearText(item.text)}
                {/* {wrapTagToText(item.text)} */}
                {/* {stringToHtml(Helpers.sanitizeHtml(item.text))} */}
                {/* {item.text} */}
              </span>
            }
          />

          <If
            data={
              Variable.auth &&
              Variable.Static.activeInputId !== item._id &&
              Variable.Static.EditInput !== item._id
              // && Variable.Static.activeEditInputId !== item.id
            }
            dataIf={
              <span
                class="answer_comment_button"
                onclick={() => {
                  Variable.Static.activeInputId = item._id;
                  // Variable.Static.activeEditInputId = "";
                  Variable.Static.answerAdditionally = "";
                  Variable.Static.EditInput = "";
                  initReload();
                }}
              >
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
                commentId={commentId}
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
          {/* <div
            class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}"
            data-action="answerAdditionallyToggle"
          >
            <img class="answer_additionally_toggle_img" src={svg["points"]} />
          </div> */}
          <AnswerAdditionallyToggleNew
            item={item}
            typeApi={"setAnswer"}
            type={{
              edit: true,
              delete: true,
              complainAnswer: true,
              complainUser: true,
              blackList: true,
            }}
            commentId={commentId}
            mainId={mainId}
          />
        </div>
        <If
          data={
            Variable.Static.activeInputId === item._id ||
            Variable.Static.EditInput === item._id
          }
          dataIf={
            <CommentInput
              nickname={item.author.nickname}
              item={item}
              typeSet="setAnswer"
              mainId={mainId}
              commentId={commentId}
            />
          }
        />
        {/* <If
          data={Variable.Static.activeEditInputId === item._id}
          dataIf={
            <CommentInput
              nickname={item.author.nickname}
              item={item}
              typeSet="setAnswer"
              mainId={mainId}
              commentId={commentId}

            />
          }
        /> */}
      </div>

      <If
        data={!commentId}
        dataIf={
          <div class="comment_answer">
            {
             ( item.comments || []).map((item, index) => {
                return (
                  <QuestionAnswerItemComment
                    item={item}
                    index={index}
                    mainId={mainId}
                    commentId={comId}
                  />
                );
              })
            }
          </div>
        }
      />
    </div>
  );
};

export { QuestionAnswerItemComment };
