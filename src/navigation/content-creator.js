import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
} from "@betarost/cemjs";

import { BlockUsers } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';
import { api } from '@src/apiFunctions.js'
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
                        button={
                            ()=>{
                              if(Variable.PageCreators.list_records.length < Variable.PageCreators.totalFound){
                                return(
                                  <ButtonShowMore
                                    onclick={async () => {
                                        let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(filters, type), offset: Variable.PageCreators.list_records.length})
                                        Variable.PageCreators.list_records.push(...tmp.list_records)
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