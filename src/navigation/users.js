import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    Helpers,
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
                        filters={Static.filters}
                        nameRecords="PageUsers"
                        type="all"
                        button={
                            () => {
                                if (Variable.PageUsers && Variable.PageUsers.list_records && Variable.PageUsers.totalFound) {
                                    if (Variable.PageUsers.list_records.length < Variable.PageUsers.totalFound) {
                                        return (
                                            <ButtonShowMore
                                                onclick={async () => {
                                                    let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(Static.filters, "all"), offset: Variable.PageUsers.list_records.length })
                                                    Variable.PageUsers.list_records.push(...tmp.list_records)
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