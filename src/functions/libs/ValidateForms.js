import { Variable } from "@betarost/cemserver/cem.js";
import { fn } from "../export.js";

const ValidateForms = {}


ValidateForms.nickName = async function (val) {
    let beginWithoutDigit = /^\D.*$/.test(val)
    let latinChars = /^[a-zA-Z0-9._]/.test(val)
    let withoutSpaces = /^\S*$/.test(val)
    let points = /^(?!.*\.\.)(?!\.)(?!.*\.$)/.test(val)
    let underscore = /^(?!.*\_\_)(?!\_)(?!.*\_$)/.test(val)
    let specialChars = /^(?!.*[!@#$%^&(),+=/\/\]\[{}?><":;!№*|])/.test(val)
    let dash = /^(?!.*\-\-)(?!\-)(?!.*\-$)/.test(val)

    if (!val) {
        return [Variable.lang.error_div.nicknameErr, false]
    }

    if (val.length < 5 || val.length > 30) {
        return [Variable.lang.error_div.nicknameErr3, false]
    }

    if (!beginWithoutDigit) {
        return [Variable.lang.error_div.nicknameErr2, false]
    }

    if (!latinChars) {
        return [Variable.lang.error_div.nicknameErr4, false]
    }

    if (!withoutSpaces) {
        return [Variable.lang.error_div.nicknameErr5, false]
    }

    if (!points) {
        return [Variable.lang.error_div.nicknameErr6, false]
    }

    if (!underscore) {
        return [Variable.lang.error_div.nicknameErr7, false]
    }

    if (!specialChars) {
        return [Variable.lang.error_div.nicknameErr9, false]
    }

    if (!dash) {
        return [Variable.lang.error_div.nicknameErr10, false]
    }

    let nickEvalible = await fn.socket.send({ method: "CheckName", params: { nickname: val } })
    if (!nickEvalible || !nickEvalible?.evalible) {
        return [Variable.lang.error_div.nicknameErr11, false]
    }

    return [null, true]
}

export default ValidateForms