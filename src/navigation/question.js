import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockQuestions } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    init(
        async () => {
            fn.initData.question(Static)
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockQuestions Static={Static} />
                </div>
            )
        }, ID
    )
}
export default start;
// OK