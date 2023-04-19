const forExport = function (num) {
    if (num === null || num === undefined) {
        return 0;
    }
    return num.toLocaleString('en-US')
};

export default forExport