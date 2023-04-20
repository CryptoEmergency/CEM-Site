import {
    jsx,
    jsxFrag,
    load,
    CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn, elements } = CEM

import { BlockUsers } from '@elements/blocks/index.js';

const start = function (data, ID) {
    let [Static] = CEM.fn.GetParams({ data, ID, initData: "users" })
    load({
        ID,
        fnLoad: async () => {
            CEM.fn.initData.users(Static)
        },
        fn: () => {
            return (
                <div class="c-main__body page-inner">

                    <BlockUsers Static={Static} />

                </div>

                // <Elements.page.MainContainer>

                // </Elements.page.MainContainer>
            )
        }
    })
    return
}

export default start;