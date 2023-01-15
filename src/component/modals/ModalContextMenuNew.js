import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  timersStop,
  init
} from "@betarost/cemserver/cem.js";



const ModalContextMenuNew = function (data, ID) {

  const clickShare = async () => {
    let shareData;
    Variable.DelModals("ModalContextMenuNew")
    if (data.typeApi === "setPost") {
      shareData = {
        url: window.location.origin + "/lenta-users/show/" + data.item._id,
      };
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (err) {
      // alarm(err, 'error')
    }
  };

  const clickEdit = (e) => {
    e.stopPropagation();
    Variable.Static.EditInput = data.item._id;
    // Variable.Static.answerAdditionally = "";
    Variable.Static.activeInputId = "";
    Variable.DelModals("ModalContextMenuNew")
    initReload("modals");
  };

  const clickDelete = () => {
    Variable.DelModals("ModalContextMenuNew")
    Variable.SetModals(
      {
        name: "ModalDelComment",
        data: {
          id: data.item._id,
          typeSet: data.typeApi,
          mainId: data.mainId,
          mainCom: !data.commentId ? true : false,
          callBack: data.callBack,
        },
      }, true
    );
  };

  const clickSubscription = async () => {
    // Variable.Static.answerAdditionally = "";
    Variable.DelModals("ModalContextMenuNew")
    // changeSubscription(data.item.author._id, "setUsers", data.callBack);
  };

  const clickComplain = () => {
    Variable.DelModals("ModalContextMenuNew")
    Variable.SetModals(
      {
        name: "ModalComplainComment",
        data: {
          id: data.item._id,
          typeSet: data.typeApi,
          mainId: data.mainId,
          mainCom: !data.commentId ? true : false,
        },
      }, true
    );
  };

  const clickBlackList = () => {
    Variable.DelModals("ModalContextMenuNew")
    Variable.SetModals(
      {
        name: "ModalBlackList",
        data: { id: data.item.author._id, type: data.typeApi },
      }, true
    );
  };

  const clickDeleteWithRole = () => {
    // Variable.Static.answerAdditionally = "";
    Variable.DelModals("ModalContextMenuNew")
    Variable.SetModals(
      {
        name: "ModalDelComment",
        data: {
          id: data.item._id,
          typeSet: "doRole",
          mainId: data.mainId,
          mainCom: !data.commentId ? true : false,
          roleAction: data.typeApi,
          callBack: data.callBack,
        },
      }, true
    );
  };

  let type = {
    share: true,
    edit: true,
    delete: true,
    subscription: true,
    complainAnswer: true,
    complainPost: true,
    complainComment: true,
    complainUser: true,
    blackList: true,
  };
  let item = {
    subscribe: true,
  };
  let typeText = {
    author: {
      share: {
        text: Variable.lang.select.share,
        onclick: clickShare,
      },
      edit: {
        text: Variable.lang.button.edit,
        onclick: (e) => {
          clickEdit(e);
        },
      },
      delete: {
        text: Variable.lang.select.delete,
        onclick: clickDelete,
      },
    },
    notAuthor: {
      share: {
        text: Variable.lang.select.share,
        onclick: clickShare,
      },
      subscription: {
        text: data.item.subscribe
          ? Variable.lang.button.unsubscribe
          : Variable.lang.button.subscribe,
        onclick: clickSubscription,
      },
      complainAnswer: {
        text: Variable.lang.select.complainAnswer,
        onclick: clickComplain,
      },
      complainPost: {
        text: Variable.lang.select.complainPost,
        onclick: clickComplain,
      },
      complainComment: {
        text: Variable.lang.select.complainComment,
        onclick: clickComplain,
      },
      complainUser: {
        text: Variable.lang.select.complainUser,
        onclick: () => { Variable.DelModals("ModalContextMenuNew") },
      },
      blackList: {
        text: Variable.lang.select.blackList,
        onclick: clickBlackList,
      },
    },
    role: {
      text: Variable.lang.select.delete,
      onclick: clickDeleteWithRole,
    },
  };
  // console.log('=99a31e=',Object.keys(data.type))

  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalContextMenu">
          <section class="c-modal__dialog">
            {/* <header class="c-modal__header">
              <h4></h4>
            </header> */}
            <div class="c-modal__body">
              <ul class="c-actions">
                {() => {
                  if (
                    data.item.author._id === Variable.myInfo._id
                    // false
                  ) {
                    return Object.keys(data.type).map((key) => {
                      if (data.type[key] && typeText.author[key] !== undefined) {
                        return (
                          <li
                            class={"c-actions__item"}
                            onclick={typeText.author[key].onclick}
                          >
                            <span>{typeText.author[key].text}</span>
                          </li>
                        );
                      }
                    });
                    // return tmp
                    // return <p style ={"color:black"}>sadsadasd</p>
                  } else {
                    return Object.keys(data.type).map((key) => {
                      if (data.type[key] && typeText.notAuthor[key] !== undefined) {
                        return (
                          <li
                            class=
                            "c-actions__item"
                            onclick={typeText.notAuthor[key].onclick}
                          >
                            <span
                              class={[key.includes("complain") || key === "blackList" ? "c-text--error" : null]}
                            >{typeText.notAuthor[key].text}</span>

                          </li>
                        );
                      }
                    });
                  }
                }}
                {() => {
                  if (Variable.auth && Variable.myInfo.status.role) {
                    return (
                      <li
                        class="c-actions__item"
                        onclick={typeText.role.onclick}
                      >
                        <span class="c-text--green">{typeText.role.text}</span>
                      </li>
                    );
                  }
                }}
              </ul>
            </div>
            <div class="c-modal__footer">
              <button
                class="c-button c-button--inverse"
                onclick={() => {
                  Variable.DelModals("ModalContextMenuNew");
                }}
              >
                <span class="c-button__wrapper">{Variable.lang.button.reset}</span>
              </button>
            </div>
          </section>
        </div>
      );
    }, ID
  )
};

export default ModalContextMenuNew;
