import { Helpers } from "@betarost/cemserver/cem.js";

const forExport = function (str, filter = {}) {
    if (!str) { str = "" }

    if (filter.notp && str == "") {
        return str
    }

    let out = str.trim()

    if (filter.clear) {
        out = out.replace(new RegExp("</p><p>", 'gi'), "</p><p>\n")
        out = Helpers.sanitizeHtml(out, { allowedTags: [], allowedAttributes: {} })
    }

    if (filter.slice) {
        out = this.sliceString(out, filter.slice)
    }



    if (filter.paragraph) {
        out = this.paragraph(out).trim()
    }

    if (filter.html) {
        if (!filter.noLink) {
            out = this.findLink(out)
        }
        out = Helpers.stringToHtml(out)
    }
    // console.log(out)
    return out
}
export default forExport


