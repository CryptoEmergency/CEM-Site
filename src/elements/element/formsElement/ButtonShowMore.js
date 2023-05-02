import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

const ButtonShowMore = function ({ Static, action, onclick, limit = 6, sort = false }) {
    if ((!Static || !Static.nameRecords) || Variable[Static.nameRecords] && Variable[Static.nameRecords].list_records.length < Variable[Static.nameRecords].totalFound) {
        return (
            <div class="c-questions__footer" >
                <a
                    class="c-button c-button--gray"
                    onclick={async () => {
                        let name = Static.name
                        let tmpResponse = await fn.restApi[action]({ name, limit, filter: Static.apiFilter, sort: sort ? sort : null, offset: Variable[Static.nameRecords].list_records.length })
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