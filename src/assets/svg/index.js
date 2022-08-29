const req = import.meta.webpackContext('.', {
    recursive: true,
    regExp: /\.svg$/
});

console.log(req.keys());
const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = req(next)
    return acc
}, {});

export default forExport