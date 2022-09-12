import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';

import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const If = function ({ data, dataIf, dataElse }) {

    console.log("data=", data, typeof data, dataIf, dataElse);
    if (!data || typeof data == "undefined") {
        if (dataElse) { return dataElse }
        return <></>
    }
    return dataIf
}

export { If }