import { Variable, Data } from "@betarost/cemserver/cem.js";

const forExport = function ({ data, reload, ID = "mainBlock", actual = false, initData }) {
    let item = { _id: Variable.dataUrl.params }

    if (actual) { return [this.Static[ID]] }

    if (!reload || !this.Static[ID]) {
        this.Static[ID] = {};
        if (data) {
            this.Static[ID] = Object.assign(this.Static[ID], data)
        }
    }

    if (data) {
        this.Static[ID].openModals = true
        if (data.item) {
            item = data.item
            this.Static[ID].item = item
        } else {
            item._id = Variable.DataUrl.params

        }
    }

    this.initData.any(this.Static[ID])
    if (initData && this.initData[initData]) {
        this.initData[initData](this.Static[ID])
    }
    Data.Static = this.Static[ID]
    Data.Item = item
    return [this.Static[ID], item]
}

export default forExport