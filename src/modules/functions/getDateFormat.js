import { Helpers, Variable } from "@betarost/cemserver/cem.js";

const forExport = function (data, type) {
    if (!data) {
        return null
    }
    Helpers.moment.locale(Variable.lang.code);
    data = data.replace(' ', 'T')
    switch (type) {
        case "now":
            let secondsBefor = Math.round(
                (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
            );
            if (secondsBefor < 86400) {
                return Helpers.moment(data).fromNow();
            } else {
                return Helpers.moment(data).format("DD MMMM YYYY");
            };
        case "time":
            return Helpers.moment(data).format('YYYY-MM-DD HH:mm')
        case "chatdate":
            return Helpers.moment(data).format("dd, D MMM");
        case "course":
            return Helpers.moment(data).format("D MMMM");
        case "chattime":
            let secondsBefore = Math.round(
                (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
            );
            // if (secondsBefore < 86400) {
            //   return Helpers.moment(data).fromNow();
            // } else {
            return Helpers.moment(data).format("HH:mm");
        // };
        case "chatlist":
            let secondBefore = Math.round(
                (Helpers.moment().format("x") - Helpers.moment(data).format("x")) / 1000
            );
            if (secondBefore < 86400) {
                return Helpers.moment(data).format("HH:mm");
            } else if (secondBefore < 604800) {
                return Helpers.moment(data).format("dddd");
            } else {
                return Helpers.moment(data).format("DD.MM.YY");
            };
        default:
            return Helpers.moment(data).format("YYYY-MM-DD");
    }
};

export default forExport