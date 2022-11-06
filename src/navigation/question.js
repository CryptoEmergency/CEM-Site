import {
    jsx,
    jsxFrag,
    init,
    sendApi,
    Variable,
    initReload,
    Helpers
} from "@betarost/cemjs";


import { BlockQuestions } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';

import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {
    let Static = {}
    let filtersQuestions

    init(
        async () => {
            Static.filtersQuestions = {
                lang: {
                    code: Variable.lang.code,
                    name: `${Variable.lang.lang} (${Variable.lang.lang_orig})`
                },
                questions: {
                    value: "all"
                },
                date: {
                    value: "date"
                },
                desc: -1
            }
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockQuestions
                        Static={Static}
                        nameRecords="PageQuestions"
                        version={Variable.dataUrl}
                        filters={Static.filtersQuestions}
                        name={"PageQuestions"}
                        button={
                            () => {
                                if (Variable.PageQuestions.list_records.length < Variable.PageQuestions.totalFound) {
                                    return (
                                        <ButtonShowMore
                                            onclick={async () => {
                                                let tmp = await api({ type: "get", action: "getQuestions", short: true, limit: 21, offset: Variable.PageQuestions.list_records.length, filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions) })
                                                Variable.PageQuestions.list_records.push(...tmp.list_records)
                                                initReload()
                                            }}
                                        />
                                    )
                                }
                            }
                        }
                        callBack={
                            async function (active, nameOptions) {
                                filtersQuestions[nameOptions].value = active
                                await api({ type: "get", action: "getQuestions", short: true, name: 'PageQuestions', limit: 6, filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions) })
                                initReload();
                            }
                        }
                    />
                </div>
            )
        }, ID
    )
}

export default start;