import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";
// check 
const ButtonShowMore = function ({ onclick, nameRecords }) {

    if (!nameRecords || Variable[nameRecords] && Variable[nameRecords].list_records.length < Variable[nameRecords].totalFound) {
        return (
            <div class="c-questions__footer" >
                <a class="c-button c-button--gray" onclick={() => {
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