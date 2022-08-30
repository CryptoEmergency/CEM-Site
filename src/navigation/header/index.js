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
setValue(ID, "langListShow", false)

const init = function () {
    if (!getValue(ID, "show")) {
        makeDOM(<HeaderEmpty />, ID)
        return;
    }
    if (!getStorage("auth")) {
        makeDOM(<HeaderNotAuth />, ID)
        return;
    }
    if (!getStorage("auth")) {
        makeDOM(<HeaderNotAuth />, ID)
        return;
    }
}
export { init }