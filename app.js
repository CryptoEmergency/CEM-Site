import { CEM } from '@betarost/cemserver/cem.js'

import "@assets/css/index.js"
import allCountries from '@src/modules/lists/allCountries.json'
import phoneCodes from '@src/modules/lists/phoneCodes.json'
import listsLang from '@src/modules/lists/languages.json'
import { storage } from '@src/modules/storage.js'
import { listen } from '@src/modules/listen.js'
import { Header } from '@src/navigation/header.js'
import { Footer } from '@src/navigation/footer.js'
import { indexedDB } from '@src/modules/load/idb.js'

import {
    // loadLists,
    // loadStorage,
    // loadData,
    // loadListen,
    // initInexedDB,
    initSocket,
    // mainBlock,
    // mainHeader,
    // mainFooter,
    mainModal,
    mainModalPage
} from "@modules/index.js"


await mainModal();
await mainModalPage();
CEM.initOptions({
    storage,
    listen,
    Header,
    Footer,
    indexedDB,
    data: {
        load: false,
        multiLang: true,
        preLoad: true,
        spinner: 200,
        listsLang,
        allCountries,
        phoneCodes,
    },
    lists: {
        listRouter: import.meta.webpackContext('./src/navigation', {
            recursive: true,
            regExp: /\.js$/,
            exclude: /(header|footer)/
        }),
        listSocket: import.meta.webpackContext('./src/modules/socket', {
            recursive: true,
            regExp: /\.js$/
        }),
        listModals: import.meta.webpackContext('./src/modals', {
            recursive: true,
            regExp: /\.js$/
        }),
        languages: import.meta.webpackContext('./src/modules/languages', {
            recursive: false,
            regExp: /\.json$/
        })
    },
    functions: import.meta.webpackContext('./src/modules/functions', {
        recursive: true,
        regExp: /\.js$/
    })

})
setTimeout(() => {
    initSocket();
}, 1500);


// const start = async function () {
//     await loadLists();
//     await loadStorage();
//     await loadData();
//     await loadListen();
//     await initInexedDB();
//     await initSocket();
//     await mainBlock();
//     await mainHeader();
//     await mainFooter();
//     await mainModal();
//     await mainModalPage();
//     setTimeout(async () => {
//         await initGo("newPage")
//     }, 250);

// }

// start();