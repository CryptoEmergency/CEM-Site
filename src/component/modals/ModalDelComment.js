import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import { delCom } from "@src/apifunctionsE.js";

const ModalDelComment = function (data, reload) {
  console.log("=e896fe=", data);
  return (
    <div class="c-modal c-modal--open" id="ModalDelComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* не нашел  такую фразу */}
          <h2 class="c-modal__title">{Variable.lang.text.deletePageComment}</h2>
        </header>
        <div class="c-modal__body">
          <div
            onclick={() => {
              delCom(data);
              Variable.Modals = [];
            }}
          >
            {Variable.lang.select.delete}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalDelComment;
