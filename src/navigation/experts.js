import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
} from "@betarost/cemjs";
// poydet
import { BlockUsers } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';
import { api } from '@src/apiFunctions.js'
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
                        button={
                            ()=>{
                              if(Variable.PageExperts.list_records.length < Variable.PageExperts.totalFound){
                                return(
                                  <ButtonShowMore
                                    onclick={async () => {
                                        let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 12, filter: Helpers.getFilterUsers(filters, type), offset: Variable.PageExperts.list_records.length})
                                        Variable.PageExperts.list_records.push(...tmp.list_records)
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