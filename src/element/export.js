

const makeList = function () {
    const req = import.meta.webpackContext('./', {
        recursive: true,
        regExp: /\.js$/,
        exclude: /(export.js)/
    });

    const forExport = req.keys().reduce((acc, next) => {
        let name = next.replace("./", "").split(".js")[0]
        let dir = name.split("/")
        if (dir.length > 1) {
            if (!acc[dir[0]]) {
                acc[dir[0]] = {}
            }
            acc[dir[0]][dir[1]] = req(next).default
        } else {
            acc[name] = req(next).default
        }
        return acc
    }, {});
    return forExport
}

export default makeList()