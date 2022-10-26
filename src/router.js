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
        async () => {
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
        }, "newPage")
    return
}
//I check
export { mainBlock }