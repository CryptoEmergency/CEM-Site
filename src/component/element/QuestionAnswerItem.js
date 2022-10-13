import { jsx, jsxFrag, Variable, Helpers, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

import { If, Map } from "@component/helpers/All.js";

import {
  Avatar,
  Likes,
  QuestionAnswerItemComment,
} from "@component/element/index.js";

let showComments = false;

const QuestionAnswerItem = function ({ item, index }) {
  let mainId = item._id;
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
          <If
            data={Variable.auth}
            dataIf={
              <span class="answer_comment_button">
                {Variable.lang.button.giveAnswer}
              </span>
            }
          />

          <div class="comment_icons">
            <Likes item={item} typeGet="getAnswers" typeSet="setAnswer" />
            <div
              class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}"
              data-action="answerAdditionallyToggle"
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} />
            </div>
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
                      showComments = !showComments;
                      initReload();
                    }}
                  >
                    <If
                      data={showComments}
                      dataIf={
                        <span>
                          {Variable.lang.span.showComments} (
                          <span class="comment_count">
                            {item.statistic.comments}
                          </span>
                          )
                        </span>
                      }
                      dataElse={
                        <span>
                          {Variable.lang.span.hideComments} (
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
            data={showComments}
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
                      />
                    );
                  }}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export { QuestionAnswerItem };
