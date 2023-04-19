const forExport = function (arr, size) {
    let arrReturn = [];
    for (let i = 0; i < arr.length; i += size) {
        arrReturn.push(arr.slice(i, i + size));
    }
    return arrReturn
}

export default forExport