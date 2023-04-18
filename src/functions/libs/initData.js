import { Variable } from "@betarost/cemserver/cem.js";

const initData = {}
initData.any = function (Static) {
    return
}

initData.ModalAfterRegisterForm = function (Static) {
    Static.forms = {}
    Static.forms.isValid = false
    Static.forms.nickName = {
        valid: false
    }
    Static.forms.language = {
        valid: false
    }
    Static.forms.country = {
        valid: false
    }
    return
}

initData.ModalAskQuestion = function (Static) {
    Static.forms = {}
    Static.forms.isValid = false
    Static.forms.language = {
        code: Variable.myInfo.mainLanguage.code,
        orig: Variable.myInfo.mainLanguage.orig_name,
        name: Variable.myInfo.mainLanguage.eng_name
    }
    Static.forms.media = []
    Static.forms.textQuestion = {
        valid: false
    }
    return
}

export default initData