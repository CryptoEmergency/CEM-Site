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
                        title={Variable.lang.a.experts}
                        filters={Static.filters}
                        nameRecords="PageExperts"
                        type="experts"
                        button={
                            () => {
                                if (Variable.PageExperts && Variable.PageExperts.list_records && Variable.PageExperts.totalFound) {
                                    if (Variable.PageExperts.list_records.length < Variable.PageExperts.totalFound) {
                                        return (
                                            <ButtonShowMore
                                                onclick={async () => {
                                                    let tmp = await api({
                                                        type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(Static.filters, type), offset: Variable.PageExperts.list_records.length
                                                    })
                                                    Variable.PageExperts.list_records.push(...tmp.list_records)
                                                    initReload()
                                                }}
                                            />
                                        )
                                    }
                                }
                            }
                        }
                    />
                </div>
            )
        }, ID
    )
}
export default start;