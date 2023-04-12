
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

export default initData