import {
    jsx,
    jsxFrag,
    init,
    load,
    CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@elements/blocks/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
    let [Static] = CEM.fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            CEM.fn.initData.content_creator(Static)
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