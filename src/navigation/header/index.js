import {
    jsx,
    jsxFrag,
    getValue,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
} from '@betarost/cemjs'
import HeaderEmpty from './HeaderEmpty.js'
import HeaderNotAuth from './HeaderNotAuth.js'
import HeaderAuth from './HeaderAuth.js'

const ID = "mainHeader";

const init = function (reload) {
    if (!reload) {
        setValue(ID, "langListShow", false)
        setValue("modals", "authModalShow", false)
    }

    if (!getValue(ID, "show")) {
        makeDOM(<HeaderEmpty />, ID)
        return;
    }
    if (!getStorage("auth")) {
        makeDOM(<HeaderNotAuth />, ID)
        return;
    }
    makeDOM(<HeaderAuth />, ID)
    return;
}
export { init }