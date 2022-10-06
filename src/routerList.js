const req = import.meta.webpackContext('./navigation', {
    recursive: true,
    regExp: /\.js$/,
    exclude: /(header|footer|modal)/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "").split(".js")[0]] = req(next).default
    return acc
}, {});
//I check
export default forExport