import { initGo } from '@betarost/cemserver/cem.js'
import {
    loadLists,
    loadStorage,
    loadData,
    loadListen,
    initInexedDB,
    initSocket,
    mainBlock,
    mainHeader,
    mainFooter,
    mainModal,
    mainModalPage
} from "@modules/index.js"

import "@assets/css/index.js"

const start = async function () {
    await loadLists();
    await loadStorage();
    await loadData();
    await loadListen();
    await initInexedDB();
    initSocket();
    await mainBlock();
    await mainHeader();
    await mainFooter();
    await mainModal();
    await mainModalPage();
    setTimeout(async () => {
        await initGo("newPage")
    }, 250);

}

start();