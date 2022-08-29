const req = import.meta.webpackContext('.', {
    recursive: false,
    regExp: /\.(png|jpg|jpeg|gif)$/
});

const forExport = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = req(next)
    return acc
}, {});

export default forExport