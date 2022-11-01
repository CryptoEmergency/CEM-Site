import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    Helpers,
    sendApi
} from "@betarost/cemjs";

import { BlockUsers } from '@component/blocks/index.js';

const start = function () {
    let filters
    let type = "experts"
    Variable.visibleFilterUser = false

    init(
        async () => {
            filters = {
                lang: {
                    code: "",
                    name: "all"
                },
                country: {
                    code: "",
                    name: "all"
                },
                group: false,
                online: false
            }
        },
        () => {

            return (
                <div class='c-main__body'>
                    <BlockUsers
                        title={Variable.lang.a.experts}
                        filters={filters}
                        nameRecords="PageExperts"
                        type={type}
                    />
                </div>
            )
        }
    )
}
//I check
export default start;