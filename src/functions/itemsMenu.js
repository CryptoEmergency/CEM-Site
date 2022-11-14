import { Variable } from '@betarost/cemjs'
const itemsMenu = {}


itemsMenu.lenta_users = function (Static, item) {
    const items =
        [
            {
                text: Variable.lang.select.share,
                type: "share",
                onclick: async () => {
                    try {
                        if (navigator.share) {
                            await navigator.share({
                                url: window.location.origin + "/lenta-users/show/" + item._id,
                            });
                        }
                    } catch (err) {
                        // Вывести ошибку
                        console.error("Share", err)
                    }
                }
            },
            {
                text: item.subscribe
                    ? Variable.lang.button.unsubscribe
                    : Variable.lang.button.subscribe,
                type: "subscription",
                onlyAuth: true,
                onclick: async () => {
                    const response = await api({ type: "set", action: "setUsers", data: { value: { subscribed: item.author._id } } })
                    // console.log('=b959ac=', response)
                    if (response.status === "ok") {
                        if (response.result) {
                            item.subscribe = response.result.subscribe
                            initReload();
                        }
                    } else {
                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                    }
                }
            },
            {
                text: Variable.lang.select.complainPost,
                type: "complainItem",
                onlyAuth: true,

                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    console.log(data)
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
                }
            },
            {
                text: Variable.lang.select.complainUser,
                type: "complainUser",
                onlyAuth: true,
                color: "red",
                onclick: async () => {
                    // Переработать модалку
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
                }
            },
            {
                text: Variable.lang.select.blackList,
                type: "blackList",
                onlyAuth: true,
                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    Variable.SetModals(
                        {
                            name: "ModalBlackList",
                            data: { id: item.author._id, type: "перебрать" },
                        }, true
                    );
                }
            },
            {
                text: Variable.lang.button.edit,
                type: "edit",
                onclick: async () => {
                    // Переработать модалку
                    // Variable.SetModals(
                    //   {
                    //     name: "ModalBlackList",
                    //     data: { id: item.author._id, type: "перебрать" },
                    //   }, true
                    // );
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "delete",
                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    // Variable.SetModals(
                    //   {
                    //     name: "ModalDelComment",
                    //     data: {
                    //       id: data.item._id,
                    //       typeSet: data.typeApi,
                    //       mainId: data.mainId,
                    //       mainCom: !data.commentId ? true : false,
                    //       callBack: data.callBack,
                    //     },
                    //   }, true
                    // );
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    // Variable.SetModals(
                    //   {
                    //     name: "ModalDelComment",
                    //     data: {
                    //       id: data.item._id,
                    //       typeSet: data.typeApi,
                    //       mainId: data.mainId,
                    //       mainCom: !data.commentId ? true : false,
                    //       callBack: data.callBack,
                    //     },
                    //   }, true
                    // );
                }
            },
        ]


    return items
}

export { itemsMenu };