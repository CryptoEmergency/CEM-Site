import { jsx, jsxFrag, Variable, initReload, initGo, sendApi, Helpers, parsingUrl } from "@betarost/cemjs";
import { delCom } from "@src/apiFunctionsE.js";

const ModalDelComment = function (data, reload) {
  return (
    <div class="c-modal c-modal--open" id="ModalDelComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* не нашел  такую фразу */}
          <h2 class="c-modal__title">{Variable.lang.text.deletePageComment}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.DelModals("ModalDelComment");
              // initReload("modals");
            }}
          ></button>
        </header>
        <div class="c-modal__body"></div>
        <footer class="c-modal__footer">
          <button
            type="button"
            class="c-button c-button--primary2"
            onclick={async () => {
              await delCom(data);
              Variable.Static.answerAdditionally = "";
              if (Variable.dataUrl.params === undefined) {
                Variable.DelModals("ModalDelComment");
              } else {
                Variable.Modals = [];
              }

              if (data.typeSet === "setPost" || data.roleAction === "setPost") {

                Variable[`PageLenta${Variable.Static.lentaPage}`] =
                  await sendApi.send({
                    action: "getPost",
                    short: true,
                    cache: true,
                    name: `PageLenta${Variable.Static.lentaPage}`,
                    limit: 15,
                    filter: Helpers.getFilterLenta(
                      {},
                      Variable.Static.lentaPage
                    ),
                  });
                if (data.id === data.mainId) {
                  Variable.Modals = []
                }
                else if (typeof data.callBack == "function") {
                  data.callBack();
                }
              } else if (typeof data.callBack == "function") {

                data.callBack();
              }
              else {
                initReload();
              }
            }}
          >
            <span class="c-button__wrapper">{Variable.lang.select.delete}</span>
          </button>
        </footer>
      </section>
    </div>
  );
};

export default ModalDelComment;
