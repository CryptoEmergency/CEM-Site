import { jsx, jsxFrag, Variable, initReload, initGo } from "@betarost/cemjs";
import { delCom, renderModalFullNews } from "@src/apiFunctionsE.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
const ModalDelComment = function (data, reload) {
  console.log("=e896fe=", data);

  console.log("=1663e5=", Variable.dataUrl.params);

  return (
    <div class="c-modal c-modal--open" id="ModalDelComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* не нашел  такую фразу */}
          <h2 class="c-modal__title">{Variable.lang.text.deletePageComment}</h2>
        </header>
        <div class="c-modal__body">
          <div
            onclick={
              async () => {
                await delCom(data);
                Variable.Static.answerAdditionally = false;
                if (Variable.dataUrl.params === undefined) {
                  Variable.Modals.pop();
                  await renderModalFullNews();
                } else {
                  Variable.Modals = [];
                  initGo();
                }
              }
            }
          >
            {Variable.lang.select.delete}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalDelComment;
