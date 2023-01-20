const req = import.meta.webpackContext('.', {
    recursive: false,
    regExp: /\.json$/
});

const languages = req.keys().reduce((acc, next) => {
    acc[next.replace("./", "").split(".json")[0]] = req(next)
    return acc
}, {});

const forExport = { ru: languages.ru, en: languages.en }
Object.assign(forExport, languages)

export default forExport
//20.01.2023