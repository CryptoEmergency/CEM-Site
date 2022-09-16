import {
    getVariable,
    setVariable,
    setValue,
    setAction,
    timersStart,
    parsingUrl,
    Variable,
    init
} from '@betarost/cemjs'

//import { init as mainModal } from '@navigation/modal/index.js';
import { timerTik, start } from '@src/functions.js'
import list from "@src/routerList.js";

const mainBlock = async function () {

    //mainModal()
    init(
        () => {

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