import { Variable } from '@betarost/cemjs'
import list from "@src/lists/modalsList.js";

const modals = {}

for (let name in list) {
    modals[name] = function (data = {}, add = false) {
        Variable.SetModals({ name, data }, add);
    }
}

modals.close = function (ID) {
    Variable.DelModals(ID)
}

export { modals };