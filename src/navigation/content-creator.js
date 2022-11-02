import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";

import { BlockUsers } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
    let filters
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
                        title={Variable.lang.a.contentCreater}
                        filters={filters}
                        nameRecords="PageCreators"
                        type="creator"
                    />
                </div>
            )
        }, ID
    )
}

export default start;