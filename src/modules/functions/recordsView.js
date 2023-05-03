import { getStorage, setStorage, CEM } from "@betarost/cemserver/cem.js";

const forExport = function (_id, action) {
    // console.log('=e0fd8f= recordsView', _id, action)
    let timeNow = Math.floor(Date.now() / 1000)
    let objView = getStorage("recordsView")
    if (!objView) (objView = {})
    if (!objView[_id]) {
        objView[_id] = timeNow
        CEM.fn.restApi[action].view({ _id })
        setStorage("recordsView", objView)
    } else {
        if (timeNow - objView[_id] >= 86400) {
            objView[_id] = timeNow
            CEM.fn.restApi[action].view({ _id })
            setStorage("recordsView", objView)
        }
    }
}

export default forExport