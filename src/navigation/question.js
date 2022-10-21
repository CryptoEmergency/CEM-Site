import {
    jsx,
    jsxFrag,
    init,
    sendApi,
    Variable,
    initReload,
    Helpers
} from "@betarost/cemjs";


import { If } from '@component/helpers/All.js';
import { BlockQuestions } from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true
    let filtersQuestions

    init(
        async () => {
            filtersQuestions = {
                lang: {
                    code: Variable.lang.code,
                    name: `${ Variable.lang.lang} (${Variable.lang.lang_orig})`
                },
                questions: {
                    value: "all"
                },
                date: {
                    value: "date"
                },
                desc: -1
            }
            Variable.PageQuestions = await sendApi.send({ action: "getQuestions", short: true, cache: true, name: "PageQuestions", filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions)});
        },
        () => {
            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockQuestions
                        version={Variable.dataUrl}
                        filters={filtersQuestions}
                        items={Variable.PageQuestions}
                        name={"PageQuestions"}
                        button={
                            <If
                                data={Variable.PageQuestions.list_records.length < Variable.PageQuestions.totalFound}
                                dataIf={
                                    <ButtonShowMore
                                        onclick={async () => {
                                            let tmp = await sendApi.send({ action: "getQuestions", short: true, limit: 20, offset: Variable.PageQuestions.list_records.length })
                                            Variable.PageQuestions.list_records.push(...tmp.list_records)
                                            initReload()
                                        }}
                                    />
                                }
                            />
                        }
                        callBack={
                            async function (active, nameOptions) {
                                filtersQuestions[nameOptions].value = active
                                Variable.PageQuestions = await sendApi.send({ action: "getQuestions", short: true, filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions) });
                                initReload();
                            }
                        }
                    />
                </div>
            )
        }
    )
}

export default start;