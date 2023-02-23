import {
    jsx,
    jsxFrag,
    load,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockQuestions } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            fn.initData.question(Static)
        },
        fn: () => {
            return (
                <div class='c-main__body'>
                    <BlockQuestions Static={Static} />
                </div>
            )
        }
    })
    return
}

export default start