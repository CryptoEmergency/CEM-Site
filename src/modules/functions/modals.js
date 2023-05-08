import { Variable } from "@betarost/cemserver/cem.js";

const forExport = {}

for (let name in Variable.listModals) {
    forExport[name] = function (data = {}, add = false) {
        // console.log('=a6f282 Variable.SetModals =', data, add)
        Variable.SetModals({ name, data }, add);
    }
}

forExport.close = function (ID) {
    Variable.DelModals(ID)
}

export default forExport