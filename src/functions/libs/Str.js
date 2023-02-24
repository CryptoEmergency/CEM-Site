


const Str = {}

Str.domain = function (text) {
    if (!text) { return null }
    let tmp = text.split("://")
    if (tmp.length > 1) {
        tmp = tmp[1]
    } else {
        tmp = tmp[0]
    }
    return tmp.split("/")[0]
}

export default Str