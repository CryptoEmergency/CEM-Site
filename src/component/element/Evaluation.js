import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

const Evaluation = function ({ rating, callBackBefore, callBackAfter }) {
  return (
    <div style={"display: flex"}>
      <div class="c-actioncomment__btn c-actioncomment__btn--dislike">
        <img
          class={[!Variable.auth ? "comment_inactive" : null]}
          src={svg["dislike"]}
          PressWait={{
            timeout: 2000,
            callBackBefore: () => {
              callBackBefore("minus")
            },
            callBackAfter: () => {
              callBackAfter("minus")
            },

          }}
        />
      </div>
      <div class="c-actioncomment__counter">{rating}</div>
      <div class="c-actioncomment__btn c-actioncomment__btn--like">
        <img
          class={[!Variable.auth ? "comment_inactive" : null]}
          src={svg["like"]}
          PressWait={{
            timeout: 2000,
            callBackBefore: () => {
              callBackBefore("plus")
            },
            callBackAfter: () => {
              callBackAfter("plus")
            },

          }}
        />
      </div>
    </div>
  );
};
export { Evaluation };
