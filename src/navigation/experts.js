import {
    jsx,
    jsxFrag,
    load,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@component/blocks/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            fn.initData.experts(Static)
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