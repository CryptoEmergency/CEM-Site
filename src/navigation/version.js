import {
    jsx,
    jsxFrag,
    init,
    Variable
} from "@betarost/cemjs";

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true
    let tmp = "<!--Логин в Метрике-->"
    init(
        null,
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    Version page
                    {"<!--Логин в Метрике-->"}
                </div>
            )
        })
};
//I check
export default start;