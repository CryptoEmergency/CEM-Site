import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload
} from "@betarost/cemjs";
// poydet

import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {

    Variable.Static.tpm = 5
    console.log(Variable)


    init(
        async () => {

            //await api({ type: "get", action: "getNews", short: true, cache: true, name: "PageNews", filter: { type: "news" } })
            await api({ type: "get", action: "getNews", short: true, name: "TEST", filter: { type: "news" } })
            console.log('=69a2cd=', Variable.TEST)
            setTimeout(() => {
                Variable.Static.tpm = 7

                // initReload()
            }, 2500);
        },
        () => {
            console.log('=2d7519=', "2 функция")
            return (
                <div class="c-main__body">
                    {/* <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}> */}
                    Version page {Variable.Static.tpm}
                </div>
            )
        }, ID)
};
//init (function,function,ID)
export default start;