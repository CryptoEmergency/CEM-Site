import { jsx, jsxFrag, Variable, initReload, initGo, sendApi,Helpers,parsingUrl } from "@betarost/cemjs";
import { delCom, renderModalFullNews } from "@src/apiFunctionsE.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
const ModalDelComment = function (data, reload) {
  return (
    <div class="c-modal c-modal--open" id="ModalDelComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          {/* не нашел  такую фразу */}
          <h2 class="c-modal__title">{Variable.lang.text.deletePageComment}</h2>
        </header>
        <div class="c-modal__body">
          <div
            onclick={async () => {
              await delCom(data);
              Variable.Static.answerAdditionally = "";
              if (Variable.dataUrl.params === undefined) {
                Variable.DelModals("ModalDelComment");
              } else {
                Variable.Modals = [];
              }

              if (data.typeSet ===  "setPost" ||  data.roleAction === "setPost") {
               
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
              if ( data.id === data.mainId ){
                  Variable.Modals =[]
              }
               else if(typeof data.callBack == "function"){
                  data.callBack();
              }}
              else{
                initReload();
              }
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
