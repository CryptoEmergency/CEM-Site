import { Variable } from '@betarost/cemserver/cem.js'
// import list from "@src/lists/modalsList.js";
import { modalsList } from "@src/lists/modalsList.js";
const modals = {}

for (let name in modalsList()) {
    modals[name] = function (data = {}, add = false) {
        Variable.SetModals({ name, data }, add);
    }
}

modals.close = function (ID) {
    Variable.DelModals(ID)
}

export { modals };