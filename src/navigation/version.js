import {
    jsx,
    jsxFrag,
    init,
    Variable
} from "@betarost/cemjs";

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true
    init(
        null,
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    Version page
                </div>
            )
        })
};
//I check
export default start;