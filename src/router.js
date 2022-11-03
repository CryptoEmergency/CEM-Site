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
        async (reload, ID, url, data) => {
            let dataUrl = Variable.dataUrl
            if (url) {
                dataUrl = url
            }
            Variable.Static.HeaderShow = true;
            Variable.Static.FooterShow = true;
            Variable.Static.FooterMenuShow = true;

            let page = dataUrl.adress;
            // if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
            //     Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
            // }
            if (!page || page == "") {
                await list.index(data, ID, url);
                return;
            }
            if (dataUrl.category) {
                page += "/" + dataUrl.category;
            } else if (dataUrl.adress == "user") {
                if (!dataUrl.params && !Variable.auth) {
                    await list.error404(data, ID, url);
                    return;
                }

                page = "user/index";
                if (!dataUrl.params || dataUrl.params == Variable.myInfo.nickname) {
                    await list[page](Variable.myInfo, ID, url, data);
                    return;
                }

                let userInfo = await sendApi.send({
                    action: "getUsers", short: true,
                    filter: {
                        nickname: decodeURI(dataUrl.params)
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
                    await list.error404(data, ID, url);
                    return;
                }

                await list[page](userInfo.list_records[0], ID, url, data);
                return;
            }
            if (!list[page]) {
                await list.error404(data, ID, url);
                return;
            }

            await list[page](data, ID, url);
            return;
        }, "newPage")
    return
}
export { mainBlock }