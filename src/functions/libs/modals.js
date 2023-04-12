import { Variable } from "@betarost/cemserver/cem.js";

const modalsList = function () {
    const req = import.meta.webpackContext('../../component/modals', {
        recursive: true,
        regExp: /\.js$/,
        exclude: /(index.js|index_old.js)/
    });

    const forExport = req.keys().reduce((acc, next) => {
        acc[next.replace("./", "").split(".js")[0]] = req(next).default
        return acc
    }, {});

    return forExport
}

const forExport = {}

for (let name in modalsList()) {
    forExport[name] = function (data = {}, add = false) {
        Variable.SetModals({ name, data }, add);
    }
}

forExport.close = function (ID) {
    Variable.DelModals(ID)
}

export default forExport