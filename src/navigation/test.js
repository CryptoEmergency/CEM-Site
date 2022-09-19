import {
    jsx,
    jsxFrag,
    init,
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

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"} c-aboutus about_us_container`}>
                    test page
                </div>
            )
        })
};