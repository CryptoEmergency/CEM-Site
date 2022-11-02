import { jsx, jsxFrag, Helpers, Variable, initReload, initOne } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";





const AnswerAdditionallyToggleNew = function ({
  item,
  typeApi,
  type,
  commentId,
  mainId,
  callBack
}) {

  initOne(
   
  )

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
      onclick={(e) => {
        e.stopPropagation();
              e.preventDefault();
        if (
          !Variable.auth
        ) {
          return;
        } else {
          
          Variable.SetModals({
            name: "ModalContextMenuNew",
            data: {   item,
              typeApi,
              type,
              commentId,
              mainId,
              callBack },
          },true);
        }
      }}
    >
      <img class="answer_additionally_toggle_img" src={svg["points"]} />
    </div>
  );
};

export { AnswerAdditionallyToggleNew };
