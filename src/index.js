import {
    setVariable,
    getVariable,
    initStorage,
    addListen
} from '@betarost/cemjs'
import "@assets/css/index.js"
import "@assets/js/index.js"
import { init } from '@src/init.js'
import { test } from '@src/test.js'
import { default as languages } from '@src/languages/index.js'
import { clickHide } from '@src/functions.js'
// import svg from "@assets/svg/index.js"
// import images from "@assets/images/index.js"
setVariable({ clickHide: clickHide })
if (!getVariable("languages")) {
    setVariable({ languages: languages });
}
initStorage();
addListen()
init()
test();
