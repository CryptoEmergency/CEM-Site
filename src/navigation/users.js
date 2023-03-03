import {
    jsx,
    jsxFrag,
    load
} from "@betarost/cemserver/cem.js";

import Elements from '@src/elements/export.js';
import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    load({
        ID,
        fnLoad: async () => {
            fn.initData.users(Static)
        },
        fn: () => {
            return (
                <Elements.page.MainContainer>
                    <BlockUsers Static={Static} />
                </Elements.page.MainContainer>
            )
        }
    })
    return
}

export default start;