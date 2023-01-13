import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    init(
        async () => {
            fn.initData.content_creator(Static)
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockUsers Static={Static} />
                </div>
            )
        }, ID
    )
}
export default start;
// OK