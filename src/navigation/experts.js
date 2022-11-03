import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
// poydet
import { BlockUsers } from '@component/blocks/index.js';

let filters

const start = function (data, ID = "mainBlock") {
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
                        type="experts"
                    />
                </div>
            )
        }, ID
    )
}
export default start;