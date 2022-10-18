import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import { sendInBlackList,renderModalFullNews } from "@src/apiFunctionsE.js";

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
            onclick={async() => {

              await sendInBlackList(data);
              Variable.Static.answerAdditionally = "";
              if (Variable.dataUrl.params === undefined) {
                Variable.Modals.pop();
                await renderModalFullNews();
              } else {
                Variable.Modals = [];
                initReload()
              }




              // sendInBlackList(data);
              // Variable.Static.answerAdditionally = false
              // Variable.Modals = [];
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
