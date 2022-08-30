import { setVariable, setValue, getVariable, initStorage, addListen } from '@betarost/cemjs'
import { init } from '@src/init.js'
import "@assets/css/index.js"
import "@assets/js/index.js"
import svg from "@assets/svg/index.js"
import images from "@assets/images/index.js"
import { default as languages } from '@src/languages/index.js'

const clickHide = function (e, target) {
    setValue("mainHeader", "langListShow", false)
}

setVariable({ clickHide: clickHide })

if (!getVariable("languages")) {
    setVariable({ languages: languages });
}

initStorage();
addListen()
init()