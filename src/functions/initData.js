import { Variable, Helpers } from "@betarost/cemjs";

const initData = {}


const filters = {
    lang: {
        code: "",
        name: "all"
    },
    country: {
        code: "",
        name: "all"
    },
    group: {
        common: true,
        content: true,
        expert: true
    },
    online: false
}

const textArea = {
    value: "",
    type: "text",
    valid: false,
    autocomplete: "off",
    placeholder: "",
    // rules: {
    //     create(Static, key)  {
    //         console.log('=212211=', this)
    //     }
    // }
}
const input = {
    value: "",
    type: "text",
    valid: false,
    autocomplete: "off",
    placeholder: "",
}

const typeCollections = {
    input: {
        value: "",
        type: "text",
        valid: false,
        autocomplete: "off",
        placeholder: "",
    },
    textArea: {
        value: "",
        type: "text",
        valid: false,
        autocomplete: "off",
        placeholder: ""
    }
}

const generate = function (type, error) {
    let objReturn = typeCollections[type]
    if (error) {
        objReturn.error = false
        objReturn.errorText = ""
    }
    return objReturn
}

initData.ModalUserInfoEdit = function (Static, userInfo, action) {
    Static.isValid = false

    Static.about = textArea
    Static.about.value = userInfo.information.about
    Static.about.placeholder = Variable.lang.p.aboutMe

    Static.name = input
    Static.name.value = userInfo.fullname
    Static.name.placeholder = Variable.lang.label.name

    Static.name = input
    Static.name.value = userInfo.information.speciality
    Static.name.placeholder = Variable.lang.label.speciality

    Static.city = input
    Static.city.value = userInfo.information.city
    Static.city.placeholder = Variable.lang.label.city

    Static.birthday = input
    Static.birthday.value = userInfo.information.birthday
    Static.birthday.placeholder = Variable.lang.label.birthDate
    Static.birthday.type = "date"


    return
}

initData.contacts = function (Static) {
    Static.isValid = false
    Static.submitClick = false
    Static.messageSent = false

    Static.name = generate("input", true)
    Static.name.placeholder = Variable.lang.placeholder.name
    Static.name.errorText = Variable.lang.error_div.nicknameErr
    Static.name.label = Variable.lang.label.name
    Static.name.label = Variable.lang.label.name
    Static.name.condition = (value) => {
        return Helpers.validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
    }
    Static.name.afterValid = () => {
        Helpers.checkValid(Static, ["name", "email", "message"])
    }



    return
}

initData.generate = function (arrData) {
    console.log('=f1839b=', arrData)
    let objReturn = {}
    arrData.map(key => objReturn[key] = filters[key])
    return objReturn
}


export { initData };