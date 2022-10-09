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
import listsLang from '@src/lists/languages.json'
import phoneCodes from '@src/lists/phoneCodes.json'
import allCountries from '@src/lists/allCountries.json'
import { test } from '@src/test.js'
Variable.languages = languages
Variable.allCountries = allCountries
Variable.listsLang = listsLang
Variable.phoneCodes = phoneCodes
Variable.load = false
Variable.clickHide = clickHide
const start = async function () {
    await initCache();
    await initStorage();
    await addListen();
    await parsingUrl();
    await initApp();
    await test();
}
//I check
start();