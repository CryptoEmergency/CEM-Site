const req = import.meta.webpackContext('../component/modals', {
    recursive: true,
    regExp: /\.js$/,
    exclude: /(index.js|index_old.js)/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "").split(".js")[0]] = req(next).default
    return acc
}, {});

export default forExport