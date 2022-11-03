import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload
} from "@betarost/cemjs";
// poydet data-action

import { api } from '@src/apiFunctions.js'

import svg from "@assets/svg/index.js";

const start = function (data, ID = "mainBlock") {

    Variable.Static.tpm = 5
    init(
        async () => {

        },
        () => {
            return (
                <div class="c-main__body">
                    {/* <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}> */}
                    Version page {Variable.Static.tpm}
                    <img src={svg['load']} />
                </div>
            )
        }, ID)
};
//init (function,function,ID)
export default start;