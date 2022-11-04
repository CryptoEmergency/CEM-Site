import { jsx, jsxFrag, Helpers, Variable } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { showVotersAndchangeStatistic } from "@src/functions.js";

const Likes = function ({ rating, item, typeGet, typeSet, mainId, commentId, callBack }) {

  return (
    <div style={"display: flex"}>
      <div class="c-actioncomment__btn c-actioncomment__btn--dislike">
        <img
          src={svg["dislike"]}
          data-name="minus"
          PressWait={{
            timeout: 2000,
            callBackBefore: () => {
              console.log('=6e2c6b= Function', "PressWait callBackBefore", rating)
            },
            callBackAfter: () => {
              console.log('=6e2c6b= Function', "PressWait callBackAfter", rating)
            },

          }}
          // onTouchStart={(e) =>
          //   console.log('=f13295=', e, "testttttt")

          // }
          // onTouchEnd={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          // onmousedown={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          // onmouseup={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          class={[!Variable.auth ? "comment_inactive" : null]}
        />
      </div>
      <div class="c-actioncomment__counter">{rating}</div>
      <div class="c-actioncomment__btn c-actioncomment__btn--like">
        <img
          src={svg["like"]}
          data-name="plus"
          // onTouchStart={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          // onTouchEnd={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          // onmousedown={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          // onmouseup={(e) =>
          //   showVotersAndchangeStatistic(
          //     e,
          //     item._id,
          //     typeGet,
          //     typeSet,
          //     mainId,
          //     commentId,
          //     callBack
          //   )
          // }
          class={[!Variable.auth ? "comment_inactive" : null]}
        />
      </div>
    </div>
  );
};

export { Likes };
