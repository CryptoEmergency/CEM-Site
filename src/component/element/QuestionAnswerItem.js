import { jsx, jsxFrag, Variable, Helpers, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

import { If, Map } from "@component/helpers/All.js";

import {
  Avatar,
  Likes,
  QuestionAnswerItemComment,
  CommentInput,
  AnswerAdditionallyToggleNew,
  LentaMedia
} from "@component/element/index.js";

Variable.Static.activeInputId = "";
Variable.Static.answerAdditionally ="";
Variable.Static.EditInput = "";
let elem = [];
const QuestionAnswerItem = function ({ item, index }) {
  console.log('=item=',item)
  let mainId = item._id;
  elem = [];
  elem[0] = [];
  return (
    <div
      style={[item.best ? "order: -1; border-color: #00E741" : null]}
      class="user_news_item"
    >
      <div class="main_comment">
        <Avatar
          author={item.author}
          nickName={item.author.nickname}
          dateShow={item.showDate}
        />
        <div class="comment_body">
          <span class="comment_text">{Helpers.clearText(item.text)}</span>
          {/* Media element */}
          <LentaMedia
        items={item.media}
        numIndex={0}
        elem={elem}
        path={"/assets/upload/answers/"}
      />
          <If
            data={Variable.auth && Variable.Static.activeInputId !== item._id}
            dataIf={
              <span
                class="answer_comment_button"
                style = {item.media.length >0 && "margin: 40px 0 0 0;"}
                onclick={() => {
                  Variable.Static.activeInputId = item._id;
                  Variable.Static.answerAdditionally ="";
                  initReload();
                }}
              >
                {Variable.lang.button.giveAnswer}
              </span>
            }
          />

          <div class="comment_icons">
            <Likes item={item} typeGet="getAnswers" typeSet="setAnswer" />
            {/* <div
              class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}"
              data-action="answerAdditionallyToggle"
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} />
            </div> */}
            <AnswerAdditionallyToggleNew item = {item} typeApi = {"setAnswer"} type = {
              {delete: true,
                complainAnswer: true,
                complainUser: true,
                blackList:true,
              }} mainId = {mainId} />

          </div>

          <If
            data={item.comments.length > 0}
            dataIf={
              <div class="user_news_top">
                <div
                  class="button-container-comm"
                  data-action="showAnswerComments"
                >
                  <a
                    class="btn-comm "
                    onclick={() => {
                      if (Variable.Static.openComent[index]) {
                        Variable.Static.openComent[index] =
                          !Variable.Static.openComent[index];
                      } else {
                        Variable.Static.openComent[index] = true;
                      }
                      initReload();
                    }}
                  >
                    <If
                      data={
                        Variable.Static.openComent[index] !== undefined &&
                        Variable.Static.openComent[index]
                      }
                      dataIf={
                        <span>
                          {Variable.lang.span.hideComments} (
                          <span class="comment_count">
                            {item.statistic.comments}
                          </span>
                          )
                        </span>
                      }
                      dataElse={
                        <span>
                          {Variable.lang.span.showComments} (
                          <span class="comment_count">
                            {item.statistic.comments}
                          </span>
                          )
                        </span>
                      }
                    />
                  </a>
                </div>
              </div>
            }
          />
          <If
            data={Variable.Static.activeInputId === item._id}
            dataIf={
              <CommentInput
                nickname={item.author.nickname}
                item={item} 
                typeSet="setAnswer"
                mainId = {mainId}
                // commentId={item._id}
              />
            }
          />
          <If
            data={
              Variable.Static.openComent[index] !== undefined &&
              Variable.Static.openComent[index]
            }
            dataIf={
              <div class="comment_answer">
                {
                  item.comments.map((item, index) => {
                    return (
                      <QuestionAnswerItemComment
                        item={item}
                        index={index}
                        mainId={mainId}
                      />
                    );
                  })
                }
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export { QuestionAnswerItem };