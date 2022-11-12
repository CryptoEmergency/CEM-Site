import { Variable } from '@betarost/cemjs'
import list from "@src/modalsList.js";

const modals = {}

for (let name in list) {
    modals[name] = function (data = {}, add = false) {
        Variable.SetModals({ name, data }, add);
    }
}


// const modals = function () {
//     console.log('=9e6811=', "ggg")
// }
export { modals };