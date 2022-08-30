const req = import.meta.webpackContext('.', {
    recursive: true,
    regExp: /\.(svg)$/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = req(next)
    return acc
}, {});

console.log(req.keys());
export default forExport