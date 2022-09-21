import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function () {

    Variable.HeaderShow = true
    Variable.FooterShow = true

    init(
        null,
        () => {
            console.log(Variable.dataUrl.params)
            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    test page show
                </div>
            )
        })
};

export default start;