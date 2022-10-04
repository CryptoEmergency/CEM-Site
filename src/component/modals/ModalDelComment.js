import { jsx, jsxFrag, Variable, initReload, initGo } from "@betarost/cemjs";
import { delCom } from "@src/apifunctionsE.js";
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
              Variable.dataUrl.params === undefined
                ? async () => {
                    console.log("Moadal");
                    await delCom(data);
                    Variable.Modals.pop();
                    Variable.Modals.pop();
                    let news = await getNewsItemInShow(
                      Variable.Static.showNewsId
                    );
                    news = news.list_records[0];
                    Variable.SetModals({
                      name: "ModalFullNews",
                      data: { item: news },
                    });
                    Variable.Static.answerAdditionally = false;
                  }
                : async () => {
                    console.log("notMoadal");
                    await delCom(data);
                    Variable.Modals = [];
                    Variable.Static.answerAdditionally = false;
                    initGo();
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
