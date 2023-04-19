
const forExport = function (str) {
    let textTag = str;
    // textTag = textTag.replace(new RegExp("\n\n", 'g'), "\n").split("\n");
    //textTag = textTag.replace(new RegExp("(\n){3,}", 'g'), "\n\n").split("\n");
    textTag = textTag.replace(new RegExp("[\r\n]{3,}", 'g'), "\n\n").split("\n");
    // console.log(textTag)
    let res = "";
    for (let item of textTag) {
        res += "<p>" + item + "</p>";
    }
    return res;
}
export default forExport


