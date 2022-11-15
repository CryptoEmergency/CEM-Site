import {
  jsx,
  jsxFrag,
  Variable,
  initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";

const Evaluation = function ({ Static, item, index, rating, action, callBackBefore, callBackAfter }) {
  return (
    <div style={"display: flex"}>
      <div class="c-actioncomment__btn c-actioncomment__btn--dislike">
        <img
          class={[!Variable.auth ? "comment_inactive" : null]}
          src={svg["dislike"]}
          onclick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          PressWait={{
            timeout: 1000,
            callBackBefore: async () => {
              let response = await fn.restApi["set" + action].evaluation({ _id: item._id, evaluation: "minus" })
              if (response.status === 'ok') {
                if (Static.nameRecords && typeof index != "undefined") {
                  Variable[Static.nameRecords].list_records[index].statistic.rating--
                } else {
                  item.statistic.rating--
                }
                initReload()
              }
              //callBackBefore("minus")
            },
            callBackAfter: async () => {
              let response = await fn.restApi["get" + action]({ filter: { _id: item._id }, select: { evaluation: 1, }, firstRecord: true })
              let whoLike = []
              if (response && response.evaluation && response.evaluation.length) {
                whoLike = response.evaluation.filter(
                  (item) => item.type === "minus"
                );
              }
              fn.modals.ModalWhoLike({ whoLike }, true)
              // callBackAfter("minus")
            },
          }}
        />
      </div>
      <div class="c-actioncomment__counter">{item && item.statistic.rating ? item.statistic.rating : rating}</div>
      <div class="c-actioncomment__btn c-actioncomment__btn--like">
        <img
          class={[!Variable.auth ? "comment_inactive" : null]}
          src={svg["like"]}
          onclick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          PressWait={{
            timeout: 1000,
            callBackBefore: async () => {

              let response = await fn.restApi["set" + action].evaluation({ _id: item._id, evaluation: "plus" })
              if (response.status === 'ok') {
                if (Static.nameRecords && typeof index != "undefined") {
                  Variable[Static.nameRecords].list_records[index].statistic.rating++
                } else {
                  item.statistic.rating++
                }
                initReload()
              }
              //callBackBefore("plus")
            },
            callBackAfter: async () => {
              let response = await fn.restApi["get" + action]({ filter: { _id: item._id }, select: { evaluation: 1, }, firstRecord: true })
              let whoLike = []
              if (response && response.evaluation && response.evaluation.length) {
                whoLike = response.evaluation.filter(
                  (item) => item.type === "plus"
                );
              }
              fn.modals.ModalWhoLike({ whoLike }, true)
              // callBackAfter("plus")
            },

          }}
        />
      </div>
    </div>
  );
};
export { Evaluation };