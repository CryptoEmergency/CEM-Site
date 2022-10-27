import {
    Variable,
    init,
    timersStart,
    timersClear,
    sendApi
} from '@betarost/cemjs'
import { timerTik } from '@src/functions.js'
import list from "@src/routerList.js";

const mainBlock = async function () {


    init(
        () => {
            timersClear();
            timersStart("TikTok", timerTik, 1500)
        },
        async (reload, ID) => {
            if (!ID && ID != 0) {
                Variable.Static.HeaderShow = true;
                Variable.Static.FooterShow = true;
                Variable.Static.FooterMenuShow = true;

                let page = Variable.dataUrl.adress;
                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                if (!page || page == "") {
                    await list.index();
                    return;
                }
                if (Variable.dataUrl.category) {
                    page += "/" + Variable.dataUrl.category;
                } else if (Variable.dataUrl.adress == "user") {
                    if (!Variable.dataUrl.params && !Variable.auth) {
                        await list.error404();
                        return;
                    }

                    page = "user/index";
                    if (!Variable.dataUrl.params || Variable.dataUrl.params == Variable.myInfo.nickname) {
                        await list[page](Variable.myInfo);
                        return;
                    }

                    let userInfo = await sendApi.send({
                        action: "getUsers", short: true,
                        filter: {
                            nickname: decodeURI(Variable.dataUrl.params)
                        },
                        select: {
                            information: 1,
                            work: 1,
                            interest: 1,
                            country: 1,
                            fullname: 1
                        },
                        limit: 1
                    });

                    if (!userInfo || userInfo.totalFound == 0) {
                        await list.error404();
                        return;
                    }

                    await list[page](userInfo.list_records[0]);
                    return;
                }
                if (!list[page]) {
                    await list.error404();
                    return;
                }

                await list[page]();
                return;
            } else {

                let page = Variable.Static.DataUrl.adress;

                console.log('=5031d222=', page)

                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                if (!page || page == "") {
                    await list.index(null, ID);
                    return;
                }
                if (Variable.Static.DataUrl.category) {
                    page += "/" + Variable.Static.DataUrl.category;
                } else if (Variable.Static.DataUrl.adress == "user") {
                    if (!Variable.Static.DataUrl.params && !Variable.auth) {
                        await list.error404(null, ID);
                        return;
                    }

                    page = "user/index";
                    if (!Variable.Static.DataUrl.params || Variable.Static.DataUrl.params == Variable.myInfo.nickname) {
                        await list[page](Variable.myInfo, ID);
                        return;
                    }

                    let userInfo = await sendApi.send({
                        action: "getUsers", short: true,
                        filter: {
                            nickname: decodeURI(Variable.Static.DataUrl.params)
                        },
                        select: {
                            information: 1,
                            work: 1,
                            interest: 1,
                            country: 1,
                            fullname: 1
                        },
                        limit: 1
                    });

                    if (!userInfo || userInfo.totalFound == 0) {
                        await list.error404(null, ID);
                        return;
                    }

                    await list[page](userInfo.list_records[0], ID);
                    return;
                }
                if (!list[page]) {
                    await list.error404(null, ID);
                    return;
                }
                console.log('=5031d2=', page)
                await list[page](null, ID);
                return;


            }



        }, "newPage")
    return
    // 







}
export { mainBlock }