import { Variable, initReload } from '@betarost/cemjs'
import { modals } from './modals.js';
import { fn } from '@src/functions/index.js';
const itemsMenu = {}

//нижнее меню
//  let bottomMenuitems = fn.CreateMenuItems({
//     text: [Variable.lang.select.complainAnswer,
//     Variable.lang.select.complainUser,
//     Variable.lang.select.blackList,
//     Variable.lang.select.delete,
//     Variable.lang.select.delete
//     ],
//     type: ["complainItem", "complainUser", "blackList", "delete", "deleteRole"],
//     auth: [true, true, true, false, false],
//     color: ["red", "red", "red", "red", "red"],
//     onclick: ["",
//       async () => {
//         // Переработать модалку
//         Variable.SetModals(
//           {
//             name: "ModalComplainComment",
//             data: {
//               id: data.item._id,
//               typeSet: data.typeApi,
//               mainId: data.mainId,
//               mainCom: !data.commentId ? true : false,
//             },
//           }, true
//         );
//       }
//       ,
//       async () => {
//         // Переработать модалку
//         Variable.SetModals(
//           {
//             name: "ModalBlackList",
//             data: { id: item.author._id, type: "перебрать" },
//           }, true
//         );
//       },
//       "",
//       ""
//     ]
//   })

//верхнее меню   вопросы
// let upperMenuitems = fn.CreateMenuItems({
//     text: [Variable.lang.h.modal_answer,
//     Variable.lang.select.share,
//     Variable.lang.select.complainAnswer,
//     Variable.lang.select.complainUser,
//     Variable.lang.button.edit,
//     Variable.lang.select.closeQuestion,
//     Variable.lang.itemsMenu.SelectBestQuestion,
//     Variable.lang.select.delete],
//     type: ["addanswer", "share", "complainItem", "complainUser", "edit", "closequestion", "bestquestion", "delete"],
//     auth: [true, false, true, true, true, true, true, true],
//     color: ["", "", "red", "red", "", "red", "green", "red"],
//     onclick: [async () => {
//         //ответить
//         Variable.SetModals({
//             name: "ModalAnswer", data: {
//                 item,
//                 onClose: async () => {
//                     // let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
//                     // itemAnswer = answer.list_records
//                     // initReload()
//                 }
//             }
//         })
//     },
//     //поделиться
//     async () => {
//         try {
//             if (navigator.share) {
//                 await navigator.share({
//                     url: window.location.origin + "/question/show/" + itemID,
//                 });
//             }
//         } catch (err) {
//             console.error("Share", err)
//         }
//     },
//     //пожаловаьбся на вопрос
//     async () => {

//         Variable.SetModals(
//             {
//                 name: "ModalComplainComment",
//                 data: {
//                     item,
//                     onClose: async () => {
//                         // let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
//                         // itemAnswer = answer.list_records
//                         // initReload()
//                     }
//                 }
//             }, true
//         );
//     },
//     //пожаловаться на пользователя
//     async () => {
//         Variable.SetModals(
//             {
//                 name: "ModalComplainComment",
//                 data: {
//                     id: itemID,
//                     typeSet: data.typeApi,
//                     mainId: data.mainId,
//                     mainCom: !data.commentId ? true : false,
//                 },
//             }, true
//         );
//     },
//     //редактировать
//     async () => {

//         Static.editQuestion = true
//         initReload()
//     },
//         //закрыть вопрос
//         "",
//         //выбрать лучший ответ
//         "",
//         //удалить
//         ""]
// })

//менюшки для ссылок Вопросы
// let hrefMenuitems = fn.CreateMenuItems({
//     text: [Variable.lang.h.modal_answer,
//     Variable.lang.select.share,
//     Variable.lang.select.complainAnswer,
//     Variable.lang.select.complainUser,
//     Variable.lang.button.edit,
//     Variable.lang.select.closeQuestion,
//     Variable.lang.itemsMenu.SelectBestQuestion,
//     Variable.lang.select.delete],
//     type: ["addanswer", "share", "complainItem", "complainUser", "edit", "closequestion", "bestquestion", "delete"],
//     auth: [true, false, true, true, true, true, true, true],
//     color: ["", "", "red", "red", "", "red", "green", "red"],
//     onclick: [async () => {
//       //ответить
//       Variable.SetModals({
//         name: "ModalAnswer", data: {
//           item,
//           onClose: async () => {
//             // let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
//             // itemAnswer = answer.list_records
//             // initReload()
//           }
//         }
//       })
//     },
//     //поделиться
//     async () => {
//       try {
//         if (navigator.share) {
//           await navigator.share({
//             url: window.location.origin + "/question/show/" + Static.Question_id,
//           });
//         }
//       } catch (err) {
//         console.error("Share", err)
//       }
//     },
//     //пожаловаьбся на вопрос
//     async () => {
//       // Переработать модалку
//       Variable.SetModals(
//         {
//           name: "ModalComplainComment",
//           data: {
//             id: data.item._id,
//             typeSet: data.typeApi,
//             mainId: data.mainId,
//             mainCom: !data.commentId ? true : false,
//           },
//         }, true
//       );
//     },
//     //пожаловаться на пользователя
//     async () => {
//       Variable.SetModals(
//         {
//           name: "ModalComplainComment",
//           data: {
//             id: data.item._id,
//             typeSet: data.typeApi,
//             mainId: data.mainId,
//             mainCom: !data.commentId ? true : false,
//           },
//         }, true
//       );
//     },
//     //редактировать
//     async () => {

//       Variable.editMenu = true
//       console.log(Variable.editMenu)

//       initReload()
//     },
//       //закрыть вопрос
//       "",
//       //выбрать лучший ответ
//       "",
//       //удалить
//       ""]
//   })

itemsMenu.onlyPage = function ({ url, downloadurl }) {
    const items = [
        {
            text: Variable.lang.select.share,
            type: "share",
            onclick: async () => {
                try {
                    if (navigator.share) {
                        await navigator.share({
                            url: window.location.origin + url,
                        });
                    }
                } catch (err) {
                    // Вывести ошибку
                    console.error("Share", err)
                }
            }
        },
        {
            text: Variable.lang.p.copy + " URL",
            type: "copyurl",
            onclick: async () => {
                navigator.clipboard.writeText(window.location.origin + url);
                modals.ModalAlarm({ icon: "confirm_icon", text: Variable.lang.text.coppied })
            }
        }
    ]
    if (typeof downloadurl != "undefined") {
        items.push({
            text: Variable.lang.button.save,
            type: "share",
            onclick: async () => {
                const anchor = document.createElement("a");
                anchor.href = downloadurl;
                anchor.download = downloadurl;
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            }
        })
    }
    return items
}

itemsMenu.userProfile = function (item) {
    console.log(item)
    const items = [
        {
            text: Variable.lang.select.share,
            type: "share",
            onclick: async () => {
                try {
                    if (navigator.share) {
                        await navigator.share({
                            url: window.location.origin + "/user/" + item.nickname,
                        });
                    }
                } catch (err) {
                    // Вывести ошибку
                    console.error("Share", err)
                }
            }
        },
        {
            text: Variable.lang.button.write,
            type: "blackList",
            onlyAuth: true,
            onclick: async () => {
                Variable.Static.startChatsID = item
                fn.siteLink("/user/chats/");
            }
        },
        {
            text: Variable.lang.select.complainUser,
            type: "complainUser",
            // onlyAuth: true,
            color: "red",
            onclick: async () => {
                // Переработать модалку
                modals.ModalComplainComment({
                    id: item._id,
                    action: "setUsers"
                })
            }
        },
        {
            text: Variable.lang.select.blackList,
            type: "blackList",
            onlyAuth: true,
            color: "red",
            onclick: async () => {
                modals.ModalConfirmAction({
                    action: async () => {
                        let response = await fn.restApi.setUsers.blackList({ _id: item._id })
                        Variable.DelModals("ModalConfirmAction")
                        await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                    },
                    text: Variable.lang.p.toBlackListConfirm,
                    button: Variable.lang.button.yes
                })
            }
        },
    ]
    return items
}

itemsMenu.blog = function (Static, item) {
    const items = [
        {
            text: Variable.lang.select.share,
            type: "share",
            onclick: async () => {
                try {
                    if (navigator.share) {
                        await navigator.share({
                            url: window.location.origin + "/blog/",
                        });
                    }
                } catch (err) {
                    // Вывести ошибку
                    console.error("Share", err)
                }
            }
        },
        {
            text: Variable.lang.p.copy + " URL",
            type: "copyurl",
            onclick: async () => {
                navigator.clipboard.writeText(window.location.origin + "/blog/");
                modals.ModalAlarm({ icon: "confirm_icon", text: Variable.lang.text.coppied })
            }
        }
    ]
    return items
}

itemsMenu.question = function (Static, item) {
    const items =
        [
            {
                text: Variable.lang.select.share,
                type: "share",
                onclick: async () => {
                    try {
                        if (navigator.share) {
                            await navigator.share({
                                url: window.location.origin + "/question/show/" + item._id,
                            });
                        }
                    } catch (err) {
                        // Вывести ошибку
                        console.error("Share", err)
                    }
                }
            },
            {
                text: Variable.lang.select.complainQuestion,
                type: "complainItem",
                // onlyAuth: true,

                color: "red",
                onclick: async () => {
                    modals.ModalComplainComment({
                        id: item._id,
                        action: "setQuestions"
                    })
                }

            },
            {
                text: Variable.lang.select.complainUser,
                type: "complainUser",
                // onlyAuth: true,
                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    modals.ModalComplainComment({
                        id: item.author._id,
                        action: "setUsers"
                    })
                }
            },
            {
                text: Variable.lang.select.blackList,
                type: "blackList",
                onlyAuth: true,
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setUsers.blackList({ _id: item.author._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.toBlackListConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "delete",
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setQuestions.delete({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.doRole.deleteQuestion({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
        ]


    return items
}


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

                    const response = await fn.restApi.setUsers.subscribe({ _id: item.author._id })
                    console.log(response)
                    // console.log('=b959ac=', response)
                    if (response.status === "ok") {
                        item.subscribe = !item.subscribe
                        initReload();
                    } else {
                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                    }
                }
            },
            {
                text: Variable.lang.select.complainPost,
                type: "complainItem",
                // onlyAuth: true,

                color: "red",
                onclick: async () => {
                    modals.ModalComplainComment({
                        id: item._id,
                        action: "setPost"
                    })
                    /*
                        Variable.SetModals(
                            {
                                name: "ModalComplainComment",
                                data: {
                                    id: item._id,
                                    typeSet: item.typeApi,
                                    mainId: item.mainId,
                                    mainCom: !item.commentId ? true : false,
                                },
                            }, true
                        )
                    */
                }

            },
            {
                text: Variable.lang.select.complainUser,
                type: "complainUser",
                // onlyAuth: true,
                color: "red",
                onclick: async () => {
                    // Переработать модалку
                    modals.ModalComplainComment({
                        id: item.author._id,
                        action: "setUsers"
                    })
                }
            },
            {
                text: Variable.lang.select.blackList,
                type: "blackList",
                onlyAuth: true,
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setUsers.blackList({ _id: item.author._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.toBlackListConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            // {
            //     text: Variable.lang.button.edit,
            //     type: "edit",
            //     onclick: async () => {
            //         // Переработать модалку
            //         // Variable.SetModals(
            //         //   {
            //         //     name: "ModalBlackList",
            //         //     data: { id: item.author._id, type: "перебрать" },
            //         //   }, true
            //         // );
            //     }
            // },
            // {
            {
                text: Variable.lang.select.delete,
                type: "delete",
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setPost.delete({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    if(Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id){
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.doRole.deletePost({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
        ]


    return items
}

export { itemsMenu };