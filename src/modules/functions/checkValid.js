import {
    initReload,
} from "@betarost/cemserver/cem.js";

const forExport = function (Static, Array) {
    Static.isValid = true
    Array.forEach(function (elem) {
        if (!Static[elem] || !Static[elem].valid) {
            Static.isValid = false
        }
    })
    initReload()
    return;
}

export default forExport