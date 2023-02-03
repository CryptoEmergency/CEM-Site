import { Variable, initReload, sendApi } from '@betarost/cemserver/cem.js'
import { modals } from './modals.js';
import { fn } from '@src/functions/index.js';
import { TextArea } from "@component/element/index.js";
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

itemsMenu.news = function ({ url, downloadurl }) {
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
        },
        {
            text: Variable.lang.h.modal_comment,
            type: "copyurl",
            onlyAuth: true,
            onclick: async () => {
                const [tmp] = fn.GetParams({ ID: Variable.ModalsPage.length - 1, actual: true })
                tmp.mainComment.el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                tmp.mainComment.el.focus()
            }
        }
    ]
    return items
}

itemsMenu.userProfile = function (item) {
    //console.log(item)
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
    // console.log(item)
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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        //        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setUsers.blackList({ _id: item.author._id })
                            Variable.DelModals("ModalConfirmAction")

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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        //  console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setQuestions.delete({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            response = await fn.restApi.getQuestions({ short: true, cache: false, name: "PageUserProfileQuestions", filter: { author: Variable.myInfo._id, }, select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 }, limit: 10 })
                            Static.activeItems = response
                            initReload()
                        },
                        text: Variable.lang.p.deleteQuestionConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        //  console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.doRole.deleteQuestion({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
        ]

    if (!item.close) {
        items.push({
            text: Variable.lang.select.closeQuestion,
            type: "delete",
            onclick: async () => {
                if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                    console.log('Post in modal, close this')
                }
                modals.ModalConfirmAction({
                    action: async () => {
                        let response = await fn.restApi.setQuestions.close({ _id: item._id })
                        Variable.DelModals("ModalConfirmAction")
                    },
                    text: Variable.lang.p.closeQuestionConfirm,
                    button: Variable.lang.button.yes
                })
            }
        })
    }
    return items
}

itemsMenu.answer = function (Static, item, active) {

    const items =
        [
            {
                text: Variable.lang.select.share,
                type: "share",
                onclick: async () => {
                    try {
                        if (navigator.share) {
                            await navigator.share({
                                url: window.location.origin + "/question/show/" + item.questionId._id,
                            });
                        }
                    } catch (err) {
                        // Вывести ошибку
                        console.error("Share", err)
                    }
                }
            },
            {
                text: Variable.lang.select.complainAnswer,
                type: "complainItem",
                // onlyAuth: true,

                color: "red",
                onclick: async () => {
                    modals.ModalComplainComment({
                        id: item._id,
                        action: "setAnswers"
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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setUsers.blackList({ _id: item.author._id })
                            Variable.DelModals("ModalConfirmAction")
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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        console.log('Post in modal, close this')
                    }

                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setAnswers.delete({ _id: item._id })

                            Variable.DelModals("ModalConfirmAction")
                            response = await sendApi.send({
                                action: "getAnswers", short: true, filter: {
                                    author: Variable.myInfo._id,
                                },
                                select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                                limit: 10
                            });
                            Static.activeItems = response

                            initReload()
                        },

                        text: Variable.lang.p.deleteQuestionConfirm,
                        button: Variable.lang.button.yes
                    })

                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.doRole.deleteAnswer({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")

                        },
                        text: Variable.lang.p.deletePostConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
        ]

    if (!item.questionId.close && item.questionId.author._id == Variable.myInfo._id) {
        items.push({
            text: Variable.lang.select.selectBest,
            type: "share",
            onlyAuth: true,
            onclick: async () => {
                let response = await fn.restApi.setQuestions.best({ _id: item.questionId._id, answerID: item._id })
            }
        },)
    }

    if (typeof index != "undefined") {
        items.push(
            {
                text: Variable.lang.button.giveAnswer,
                type: "share",
                onlyAuth: true,
                onclick: async () => {
                    Object.keys(Static.mainComment.elShowInput).map((key) => {
                        if (index != key && Static.mainComment.elShowInput[key].dataset.show) {
                            Static.mainComment.elShowInput[key].removeAttribute("data-show")
                            Static.mainComment.elShowInput[key].style = "display:none;"
                        }
                    });
                    Static.mainComment.elShowInput[index].dataset.show = true
                    Static.mainComment.elShowInput[index].style = "display:flex;"
                    Static.mainComment.el[index].focus();

                    return
                }
            }
        )
    }

    return items
}


itemsMenu.comment = function (Static, item, action, index, mainId) {

    let type
    if (action == "News") {
        type = 'blog'
    }
    else {
        type = Variable.dataUrl.adress
    }
    const items =
        [
            {
                text: Variable.lang.select.share,
                type: "share",
                onclick: async () => {
                    try {
                        if (navigator.share) {
                            await navigator.share({
                                url: window.location.origin + "/" + Variable.dataUrl.adress + "/show/" + mainId,
                            });
                        }
                    } catch (err) {
                        // Вывести ошибку
                        console.error("Share", err)
                    }
                }
            },
            {
                text: Variable.lang.button.giveAnswer,
                type: "share",
                onlyAuth: true,
                onclick: async () => {
                    Object.keys(Static.secondComment.elShowInput).map((key) => {
                        if (index != key && Static.secondComment.elShowInput[key].dataset.show) {
                            Static.secondComment.elShowInput[key].removeAttribute("data-show")
                            Static.secondComment.elShowInput[key].style = "display:none;"
                        }
                    });
                    Static.secondComment.elShowInput[index].dataset.show = true
                    Static.secondComment.elShowInput[index].style = "display:flex;"
                    Static.secondComment.el[index].focus();

                    return
                }
            },
            {
                text: Variable.lang.button.whoLike,
                type: "share",
                onclick: async () => {
                    let response
                    response = await fn.restApi.getComments({ filter: { _id: item._id }, select: { evaluation: 1, }, firstRecord: true })
                    let whoLike = []
                    if (response && response.evaluation && response.evaluation.length) {
                        whoLike = response.evaluation.filter(
                            (item) => item.type === "plus"
                        );
                    }
                    fn.modals.ModalWhoLike({ whoLike }, true)
                }
            },
            {
                text: Variable.lang.select.complainComment,
                type: "complainItem",
                onlyAuth: true,

                color: "red",
                onclick: async () => {
                    modals.ModalComplainComment({
                        id: item._id,
                        action: "setComments"
                    })
                }

            },
            {
                text: Variable.lang.select.complainUser,
                type: "complainUser",
                onlyAuth: true,
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
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setUsers.blackList({ _id: item.author._id })
                            Variable.DelModals("ModalConfirmAction")
                        },
                        text: Variable.lang.p.toBlackListConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.button.edit,
                type: "edit",
                onclick: async () => {
                    Object.keys(Static.editComment.elShowInput).map((key) => {
                        if (index != key && Static.editComment.elShowInput[key].dataset.show) {
                            Static.editComment.elShowInput[key].removeAttribute("data-show")
                            Static.editComment.elShowInput[key].style = "display:none;"
                            Static.commentText[key].dataset.show = true
                            Static.commentText[key].style = "display:flex;"
                        }
                    });
                    Static.commentText[index].removeAttribute("data-show")
                    Static.commentText[index].style = "display:none;"
                    Static.editComment.elShowInput[index].dataset.show = true
                    Static.editComment.elShowInput[index].style = "display:flex;"
                    Static.editComment.el[index].value = item.text
                    Static.editComment.el[index].focus();

                    initReload()

                    return
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "delete",
                color: "red",
                onclick: async () => {
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setComments.delete({ _id: item._id, action, mainId })
                            Variable.DelModals("ModalConfirmAction")
                            console.log("fffff", action, mainId)
                            response = await fn.restApi['get' + action]({ filter: { _id: mainId, type: type }, firstRecord: true })
                            Static.item = response
                            // item = response
                            initReload()
                        },
                        text: Variable.lang.p.deleteCommentConfirm,
                        button: Variable.lang.button.yes
                    })
                }
            },
            {
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.doRole.deleteComment({ _id: item._id })
                            Variable.DelModals("ModalConfirmAction")
                            //  console.log('get' + action)
                            await fn.restApi['get' + action]({ filter: { _id: mainId }, firstRecord: true })

                            initReload()
                        },
                        text: Variable.lang.p.deleteCommentConfirm,
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
                    //   console.log(response)
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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
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
                text: Variable.lang.button.edit,
                type: "edit",
                onclick: async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fn.siteLink("/user/posts/" + item._id);

                    // return false
                    let response = await sendApi.send({
                        action: "getPost", short: true, cache: true, name: "PageUserProfileMyLenta",
                        filter: {
                            author: item.author._id,
                        },
                        // select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 },
                        // limit: 12
                    })

                    console.log('=055882= EditPost = response =', response)
                    let data = response.list_records.filter((post) => {
                        return post._id == item._id
                    })
                    let audio = data[0].media.filter(item => item.type == 'audio');
                    console.log('=00b984= EditPost = data =', data)
                    // fn.siteLink("/user/posts/");
                    if (data[0].text.length > 0) {
                        Static.textInputs.show = true
                        Static.textInputs.value = data[0].text;
                    }
                    if (data[0].media.length > 0) {
                        Static.mediaInputs.show = true;
                        data[0].media.forEach((item) => {
                            Static.mediaInputs.value.push(item)
                        })
                    }
                    if (audio.length > 0) {
                        Static.audioInputs.show = true
                        audio.forEach((track) => {
                            Static.audioInputs.value.push(track)
                        })
                    }
                    if (data[0].text.length > 0 || Static.mediaInputs.value.length > 0) {
                        Static.isValid = true;
                    } else {
                        Static.isValid = false;
                    }
                    initReload()
                    console.log('=ba91a4= EditPost = Static =', Static)
                    //    initReload()
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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
                        console.log('Post in modal, close this')
                    }
                    modals.ModalConfirmAction({
                        action: async () => {
                            let response = await fn.restApi.setPost.delete({ _id: item._id })
                            if (response.status == 'ok') {
                                Variable.DelModals("ModalConfirmAction")
                                await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                                initReload()
                            } else {
                                Variable.SetModals(
                                    {
                                        name: "ModalAlarm",
                                        data: {
                                            icon: "alarm_icon",
                                            text: Variable.lang.error_div[response.error],
                                        },
                                    },
                                    true
                                );
                            }

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
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
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

itemsMenu.community = function (Static, item) {
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
                    //   console.log(response)
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
                text: Variable.lang.select.delete,
                type: "deleteRole",
                color: "red",
                onclick: async () => {
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
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

itemsMenu.subscribers = function (Static, item) {
    const items =
        [
            {
                text: item.subscribe
                    ? Variable.lang.button.unsubscribe
                    : Variable.lang.button.subscribe,
                type: "subscription",
                onlyAuth: true,
                onclick: async () => {
                    debugger
                    const response = await fn.restApi.setUsers.subscribe({ _id: item.author._id })
                      console.log(response)
                    console.log('=b959ac=', response)
                    if (response.status === "ok") {
                        item.subscribe = !item.subscribe
                        initReload();
                    } else {
                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                    }
                }
            },
            {
                text: Variable.lang.select.blackList,
                type: "blackList",
                onlyAuth: true,
                color: "red",
                onclick: async () => {
                    if (Variable.ModalsPage.length != 0 && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item && Variable.ModalsPage[Variable.ModalsPage.length - 1].data.item._id == item._id) {
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
        ]


    return items
}

export { itemsMenu };