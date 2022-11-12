import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";

import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    if (data) { Static.openModals = true }
    init(
        async () => {
            // Static.filters = fn.initData.generate(["lang", "country", "group", "online"])
            Static.filters.type = "all"
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockUsers
                        Static={Static}
                        title={Variable.lang.h.top_users}
                        filters={Static.filters}
                        nameRecords="PageUsers"
                        type="all"
                    />
                </div>
            )
        }, ID
    )
}
export default start;
// OK