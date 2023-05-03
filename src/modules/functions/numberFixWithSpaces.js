const forExport = function (num, fix) {
    let x = parseFloat(num).toFixed(fix)
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

export default forExport
