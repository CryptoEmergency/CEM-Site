import {
    setVariable,
    initStorage,
    addListen,
    parsingUrl,
    Variable,
    getStorage
} from '@betarost/cemjs'
import "@assets/css/index.js"
import "@assets/js/index.js"
import { initApp } from '@src/init.js'
import { default as languages } from '@src/languages/index.js'
import { clickHide } from '@src/functions.js'
import { test } from '@src/test.js'
Variable.languages = languages
Variable.clickHide = clickHide
setVariable({ languages: languages });
initStorage();
addListen();
parsingUrl();
Variable.lang = Variable.languages[getStorage("lang")]
initApp();
test();