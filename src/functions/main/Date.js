import { Variable } from "@betarost/cemserver/cem.js";
import { fn } from "../export.js";
const forExport = {}

forExport.onlyDate = function (date) {
    if (!date) {
        return null
    }
    fn.moment.locale(Variable.lang.code);
    date = date.replace(' ', 'T')
    return fn.moment(date).format("DD MMMM YYYY");
}
export default forExport