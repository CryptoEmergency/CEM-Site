import {
    initStorage,
    initCache,
    addListen,
    parsingUrl,
    Variable
} from '@betarost/cemjs'
import "@assets/css/index.js"
import "@assets/js/index.js"
import { initApp } from '@src/init.js'
import { default as languages } from '@src/languages/index.js'
import { clickHide } from '@src/functions.js'
import { test } from '@src/test.js'
Variable.languages = languages
Variable.load = false
Variable.clickHide = clickHide
//Variable.outHideWindows = []

const start = async function () {
    await initCache();
    await initStorage();
    await addListen();
    await parsingUrl();
    await initApp();
    await test();
}

start();