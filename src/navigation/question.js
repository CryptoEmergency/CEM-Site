import {
    jsx,
    jsxFrag,
    init,
    sendApi,
    Variable,
    initReload,
} from "@betarost/cemjs";

import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { If } from '@component/helpers/All.js';

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true

    init(
        async () => {
            Variable.PageQuestions = await sendApi.send({ action: "getQuestions", short: true, cache: true, name: "PageQuestions" });
        },
        () => {
            // console.log("Second Init ", questions)
            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockQuestions
                        items={Variable.PageQuestions}
                        button={
                            <If
                                data={Variable.PageQuestions.list_records.length < Variable.PageQuestions.totalFound}
                                dataIf={
                                    <div class="c-questions__footer">
                                        <a class="c-button c-button--gray"
                                            onclick={async () => {
                                                let tmp = await sendApi.send({ action: "getQuestions", short: true, limit: 20, offset: Variable.PageQuestions.list_records.length })
                                                Variable.PageQuestions.list_records.push(...tmp.list_records)
                                                initReload()
                                            }
                                            }
                                        >
                                            <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
                                        </a>
                                    </div>
                                }
                            />
                        }
                    />
                </div>
            )
        }
    )


}

export default start;