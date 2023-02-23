import {
    jsx,
    jsxFrag,
    init,
    load
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockShowCommunities } from '@component/blocks/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    init(
        async () => {
            fn.initData.community(Static)
            console.log('=e77626=', Static)
        },
        () => {
            return (
                <div class="c-community c-main__body">
                    <BlockShowCommunities Static={Static} />
                </div>
            )
        }, ID
    );
};
export default start;
  // OK