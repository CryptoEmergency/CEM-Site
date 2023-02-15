const socketList = function () {
    const req = import.meta.webpackContext('../modules/socket', {
        recursive: true,
        regExp: /\.js$/,
        exclude: /(header|footer|modal)/
    });

    const forExport = req.keys().reduce((acc, next) => {
        acc[next.replace("./", "").replace("/", "").split(".js")[0]] = req(next).default
        return acc
    }, {});

    return forExport
}

export { socketList }
//15.02.2023