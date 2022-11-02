import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemjs";
// poydet
const start = function (data, ID = "mainBlock") {
    init(
        null,
        () => {
            return (
                <div class="c-main__body">
                    {/* <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}> */}
                    Version page
                </div>
            )
        }, ID)
};

export default start;