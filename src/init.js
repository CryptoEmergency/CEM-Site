import { initGo } from '@betarost/cemjs'
import { mainBlock } from '@src/router.js'
import { mainHeader } from "@navigation/header/index.js";
import { mainFooter } from '@navigation/footer/index.js';
import { mainModal } from '@navigation/modal/index.js';

const initApp = async function () {
    await mainBlock();
    await mainHeader();
    await mainFooter();
    //await mainModal(); //"modals"
    initGo("newPage")
    setTimeout(() => {
        document.getElementById("page_loader").remove();
    }, 500);
}

export { initApp }