import { jsx, jsxFrag, Variable, initReload, initGo, sendApi, Helpers, parsingUrl } from "@betarost/cemjs";

const delCom = async (info) => {

  let data = {
    value: {},
    _id: info.mainId,
  };

  if (info.typeSet === "doRole") {
    if (info.id === info.mainId) {
      data.value = { active: false };
      data.roleAction = info.roleAction;
    } else if (info.mainCom === true) {
      data.value.comments = {
        active: false,
        _id: info.id,
      };
      data.roleAction = info.roleAction;
    } else if (info.mainCom === false) {
      data.value.comments = {
        comments: {
          active: false,
          _id: info.id,
        },
      };
      data.roleAction = info.roleAction;
    }
  } else {
    if (info.id === info.mainId) {
      data.value = { active: false };
    } else if (info.mainCom === true) {
      data.value.comments = {
        active: false,
        _id: info.id,
      };
    } else if (info.mainCom === false) {
      data.value.comments = {
        comments: {
          active: false,
          _id: info.id,
        },
      };
    }
  }
  // let data = {
  //   value: {
  //     comments: {},
  //   },
  //   _id: Variable.Static.showNewsId,
  // };

  // info.mainCom
  //   ? (data.value.comments = {
  //     active: false,
  //     _id: info.id,
  //   })
  //   : (data.value.comments = {
  //     comments: {
  //       active: false,
  //       _id: info.id,
  //     },
  //   });
  let response = await sendApi.create(info.typeSet, data);
};

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
