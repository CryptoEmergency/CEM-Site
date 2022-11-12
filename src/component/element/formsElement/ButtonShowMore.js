import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';

const ButtonShowMore = function ({ Static, action, onclick, limit = 6 }) {
    if ((!Static || !Static.nameRecords) || Variable[Static.nameRecords] && Variable[Static.nameRecords].list_records.length < Variable[Static.nameRecords].totalFound) {
        return (
            <div class="c-questions__footer" >
                <a
                    class="c-button c-button--gray"
                    onclick={async () => {
                        let tmpResponse = await fn.restApi[action]({ short: true, limit, filter: Static.apiFilter, offset: Variable[Static.nameRecords].list_records.length })
                        if (tmpResponse && tmpResponse.list_records) {
                            Variable[Static.nameRecords].list_records.push(...tmpResponse.list_records)
                        }
                        initReload()
                        if (onclick) { onclick() }
                    }}>
                    <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
                </a>
            </div>
        )
    } else {
        return null
    }
}
export { ButtonShowMore }
// OK