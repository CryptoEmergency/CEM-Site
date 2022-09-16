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
        () => {

            let page = Variable.dataUrl.adress;
            if (!page || page == "") {
                list.index();
                return;
            }

            if (Variable.dataUrl.category) {
                page += "/" + Variable.dataUrl.category;
            } else if (Variable.dataUrl.adress == "user") {
                page = "user/index";
            }

            if (!list[page]) {
                list.error404();
                return;
            }

            list[page]();
            return;

        }, "newPage")
}

export { mainBlock }