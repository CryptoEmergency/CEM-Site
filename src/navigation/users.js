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

const start = function (data, ID = "mainBlock") {
    let filters
    let type = "all"
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
                group: {
                    common: true,
                    content: true,
                    expert: true
                },
                online: false
            }
        },
        () => {

            return (
                <div class='c-main__body'>
                    <BlockUsers
                        title={Variable.lang.h.top_users}
                        filters={filters}
                        nameRecords="PageUsers"
                        type={type}
                    />
                </div>
            )
        }, ID
    )
}
export default start;