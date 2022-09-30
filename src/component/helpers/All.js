import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';

import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const If = function ({ data, dataIf, dataElse }) {


    if (!data || typeof data == "undefined") {

        if (dataElse) { return dataElse }
        return <></>
    }
    return dataIf
}

const percent = function (num1, num2) {
    return ((Number(num1) / Number(num2)) * 100)
};

export { If, percent }