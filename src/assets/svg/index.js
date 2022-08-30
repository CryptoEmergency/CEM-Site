const req = import.meta.webpackContext('.', {
    recursive: true,
    regExp: /\.(svg)$/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "").split(".")[0]] = req(next)
    return acc
}, {});

export default forExport