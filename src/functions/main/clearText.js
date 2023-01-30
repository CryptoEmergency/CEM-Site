import { Helpers } from "@betarost/cemserver/cem.js";

const forExport = function (data, abt = false) {
    if (abt && (!data || data.length == 0)) {
        return ""
    }
    return Helpers.stringToHtml(Helpers.sanitizeHtml(data))
}

export default forExport


