
const forExport = function (str, number = 66) {
    let sliceStr = '';
    if (str.length >= number) {
        sliceStr = `${str.slice(0, number)} ...`;
    } else {
        sliceStr = str;
    }
    return sliceStr;
};

export default forExport