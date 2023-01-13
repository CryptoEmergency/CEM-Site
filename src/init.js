import { initGo } from '@betarost/cemserver/cem.js'
import { mainBlock } from '@src/router.js'
import { mainHeader } from "@navigation/header/index.js";
import { mainFooter } from '@navigation/footer/index.js';
import { mainModal } from '@navigation/modal/index.js';
import { mainModalPage } from '@navigation/modal/page.js';

const initApp = async function () {
    try {
        await mainBlock();
    } catch (error) {
        console.error(error, "mainBlock")
    }

    try {
        await mainHeader();
    } catch (error) {
        console.error(error, "mainHeader")
    }

    try {
        await mainFooter();
    } catch (error) {
        console.error(error, "mainFooter")
    }

    try {
        await mainModal();
    } catch (error) {
        console.error(error, "mainModal")
    }

    try {
        await mainModalPage();
    } catch (error) {
        console.error(error, "mainModalPage")
    }

    await initGo("newPage")
}
export { initApp }