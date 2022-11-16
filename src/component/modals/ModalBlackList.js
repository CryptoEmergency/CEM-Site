import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initGo,
  sendApi,
  Helpers, 
  init
} from "@betarost/cemjs";

const sendInBlackList = async (info) => {
  let data = {
    value: {
      blackList: info.id,
    },
  };

  let response = await sendApi.create("setUsers", data);
};
const ModalBlackList = function (data, reload) {
  return (
    <div class="c-modal c-modal--open" id="ModalBlackList">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.text.confirmBlockUser}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.DelModals("ModalBlackList");
              initReload("modals");
            }}
          ></button>
        </header>
        <div class="c-modal__footer">
          <button
            class="c-button c-button--primary"
            onclick={async () => {
              await sendInBlackList(data);
              Variable.Static.answerAdditionally = "";

              if (Variable.dataUrl.params === undefined) {
                Variable.DelModals("ModalBlackList");
              } else {
                Variable.Modals = [];
              }
              if (data.type) {
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
              } else {
                initReload();
              }

              // sendInBlackList(data);
              // Variable.Static.answerAdditionally = false
              // Variable.Modals = [];
            }}
          >
            <span class="c-button__wrapper">{Variable.lang.select.blackList}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalBlackList;
