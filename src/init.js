import {
    initGo,
    Variable,
    timersStart
} from '@betarost/cemjs'
import { mainBlock } from '@src/router.js'
import { mainHeader } from "@navigation/header/index.js";
import { mainFooter } from '@navigation/footer/index.js';
import { mainModal } from '@navigation/modal/index.js';
import { timerTik } from '@src/functions.js'

Variable.HeaderShow = true
Variable.FooterShow = true

const initApp = async function () {
    await mainHeader();
    await mainBlock();
    await mainFooter();
    //await mainModal();


    // init(() => {

    // },
    //     () => {
    //         return (
    //             <div>test4</div>
    //         )
    //     },
    //     "modals"
    // )

    // init(() => {

    // },
    //     () => {
    //         return (
    //             <div>test4</div>
    //         )
    //     }
    // )

    initGo("newPage")
    timersStart("TikTok", timerTik, 1500)
    setTimeout(() => {
        document.getElementById("page_loader").remove();
    }, 500);
}
export { initApp }
