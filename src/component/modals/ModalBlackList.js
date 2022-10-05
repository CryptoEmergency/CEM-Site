import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import { sendInBlackList } from "@src/apifunctionsE.js";

const ModalBlackList = function (data, reload) {
  console.log("=e896fe=", data);
  return (
    <div class="c-modal c-modal--open" id="ModalBlackList">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.text.confirmBlockUser}</h2>
        </header>
        <div class="c-modal__body">
          <div
            onclick={() => {
              sendInBlackList(data);
              Variable.Static.answerAdditionally =false
              Variable.Modals = [];
            }}
          >
            {Variable.lang.select.blackList}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalBlackList;
