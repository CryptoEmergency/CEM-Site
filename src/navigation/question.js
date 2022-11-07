import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
// check
import { BlockQuestions } from '@component/blocks/index.js';

const start = function (data, ID) {
    let Static = {}
    init(
        async () => {
            Static.filtersQuestions = {
                lang: {
                    code: Variable.lang.code,
                    name: `${Variable.lang.lang} (${Variable.lang.lang_orig})`
                },
                questions: {
                    value: "all"
                },
                date: {
                    value: "date"
                },
                desc: -1
            }
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockQuestions
                        Static={Static}
                        nameRecords="PageQuestions"
                        limit={12}
                    />
                </div>
            )
        }, ID
    )
}
export default start;