
const forExport = function (mediaArr, type) {
    if (!mediaArr || !mediaArr.length || !Array.isArray(mediaArr)) {
        return false
    }
    var media = mediaArr.filter((tmp) => tmp.type == type);
    if (media.length == 0) {
        return false
    }
    return true;
};

export default forExport


