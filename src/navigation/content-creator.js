import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    Helpers
} from "@betarost/cemjs";
// check
import { api } from '@src/apiFunctions.js'
import { BlockUsers } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';

const start = function (data, ID) {
    let Static = {}
    init(
        async () => {
            Static.filters = {
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
                        filters={Static.filters}
                        nameRecords="PageCreators"
                        type="creator"
                    />
                </div>
            )
        }, ID
    )
}
export default start;