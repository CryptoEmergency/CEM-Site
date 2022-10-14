import { jsx, jsxFrag, Helpers, Variable } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";

const AnswerAdditionallyToggle = function ({ item, type }) {




    
  console.log(item, "=11b7e9=", Variable.myInfo.status.role);
  return (
    <div
      //    class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive {{/if}}" data-action="answerAdditionallyToggle"
      class={[
        "answer_additionally_toggle",
        "comment_icon_type-1",
        !Variable.auth
          ? //  || Variable.Static.answerAdditionally
            "comment_inactive"
          : null,
      ]}
    >
      <img class="answer_additionally_toggle_img" src={svg["points"]} />

      <div class="answer_additionally_container">
        <div class="answer_additionally">
          <If
            // data={item.author._id === Variable.myInfo._id}
            data = {true}
            dataIf = {
                <p></p>
            }
            />
          {/* {{#is author._id data.myInfo._id}}
            <div data-set="answer_comment" class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{parentElement._id}}" data-parentid="{{parentElement.parentElement._id}}" data-type="commentcomment">{{lang.button.edit}}</div>
            <div data-set="answer_comment" class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{parentElement._id}}" data-parentid="{{parentElement.parentElement._id}}" data-type="commentcomment">{{lang.select.delete}}</div>
        {{else}}
            <div data-set="answer_comment" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{_id}} data-answerID="{{parentElement._id}}" data-parentid="{{parentElement.parentElement._id}}" data-type="commentcomment">{{lang.select.complainComment}}</div>
            <div data-set="answer_comment" class="answer_additionally_item complain c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{parentElement._id}}" data-parentid="{{parentElement.parentElement._id}}" data-type="user">{{lang.select.complainUser}}</div>
            <div data-set="answer_comment" class="answer_additionally_item block c-text--error" data-action="answerAdditionallyItem" data-answer-id={{author._id}} data-answerID="{{parentElement._id}}" data-parentid="{{parentElement.parentElement._id}}" data-type="user">{{lang.select.blackList}}</div>
            
        {{/is}}  */}
          <If
            data={Variable.auth && Variable.myInfo.status.role}
            dataIf={
              <div
                style="color: #32DE80"
                class="answer_additionally_item delete"
              >
                {Variable.lang.select.delete}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export { AnswerAdditionallyToggle };
