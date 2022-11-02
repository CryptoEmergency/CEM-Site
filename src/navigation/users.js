import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    Helpers,
    sendApi
} from "@betarost/cemjs";
// poydet
import { BlockUsers } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';

import { api } from '@src/apiFunctions.js'

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
                        button={
                            ()=>{
                              if(Variable.PageUsers.list_records.length < Variable.PageUsers.totalFound){
                                return(
                                  <ButtonShowMore
                                    onclick={async () => {
                                        let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(filters, type), offset: Variable.PageUsers.list_records.length})
                                        Variable.PageUsers.list_records.push(...tmp.list_records)
                                        initReload()
                                    }}
                                  />
                                )
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