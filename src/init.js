import { initGo } from '@betarost/cemjs'
import { mainBlock } from '@src/router.js'
import { mainHeader } from "@navigation/header/index.js";
import { mainFooter } from '@navigation/footer/index.js';
import { mainModal } from '@navigation/modal/index.js';

const initApp = async function () {
    await mainBlock();
    await mainHeader();
    await mainFooter();
    await mainModal();
    await initGo("newPage")
}
//I check
export { initApp }