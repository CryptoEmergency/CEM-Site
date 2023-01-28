
const functionsMain = function () {
    const req = import.meta.webpackContext('../../functions/main', {
        recursive: true,
        regExp: /\.js$/,
        // exclude: /(index.js|index_old.js)/
    });

    const forExport = req.keys().reduce((acc, next) => {
        acc[next.replace("./", "").split(".js")[0]] = req(next).default
        return acc
    }, {});

    console.log('=beb2ff=', forExport)
    return forExport
}

export { functionsMain }
//28.01.2023