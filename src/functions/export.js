import { Helpers, CEM } from "@betarost/cemserver/cem.js";

const fn = CEM.fn
// const functionsLibs = function () {
//     const req = import.meta.webpackContext('./libs', {
//         recursive: true,
//         regExp: /\.js$/,
//         // exclude: /(index.js|index_old.js)/
//     });
//     const forExport = req.keys().reduce((acc, next) => {
//         acc[next.replace("./", "").split(".js")[0]] = req(next).default
//         return acc
//     }, {});
//     return forExport
// }

// const fn = {}
// fn.Static = {}
// fn.validator = Helpers.validator
// fn.sanitizeHtml = Helpers.sanitizeHtml
// fn.moment = Helpers.moment
// Object.assign(fn, functionsLibs())

export { fn }