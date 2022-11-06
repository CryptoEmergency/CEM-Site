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
                        button={
                            () => {
                                if (Variable.PageCreators && Variable.PageCreators.list_records && Variable.PageCreators.totalFound) {
                                    if (Variable.PageCreators.list_records.length < Variable.PageCreators.totalFound) {
                                        return (
                                            <ButtonShowMore
                                                onclick={async () => {
                                                    let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(Static.filters, type), offset: Variable.PageCreators.list_records.length })
                                                    Variable.PageCreators.list_records.push(...tmp.list_records)
                                                    initReload()
                                                }}
                                            />
                                        )
                                    }
                                }
                            }
                        } />
                </div>
            )
        }, ID
    )
}
export default start;