

const makeList = function () {
    const req = import.meta.webpackContext('./', {
        recursive: true,
        regExp: /\.js$/,
        exclude: /(export.js)/
    });

    const forExport = req.keys().reduce((acc, next) => {
        acc[next.replace("./", "").split(".js")[0]] = req(next).default
        return acc
    }, {});

    console.log('=beb2ff=', forExport)
    return forExport
}

export default makeList()