const req = import.meta.webpackContext('.', {
    recursive: false,
    regExp: /\.json$/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "").split(".json")[0]] = req(next)
    return acc
}, {});

export default forExport