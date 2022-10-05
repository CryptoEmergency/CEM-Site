import {
    Variable,
    init,
    timersStart,
    timersClear
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
            let page = Variable.dataUrl.adress;
            if (!page || page == "") {
                await list.index();
                return;
            }
            if (Variable.dataUrl.category) {
                page += "/" + Variable.dataUrl.category;
            } else if (Variable.dataUrl.adress == "user") {
                page = "user/index";
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

export { mainBlock }