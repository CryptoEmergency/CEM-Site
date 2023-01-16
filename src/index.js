import { initApp } from '@src/init.js'
import { loadLists, loadStorage, loadData, loadListen } from "@modules/index.js"
import "@assets/css/index.js"

const start = async function () {
    await loadLists();
    await loadStorage();
    await loadData();
    await loadListen();
    await initApp();
}

start();