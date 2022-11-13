import { Variable, Helpers } from "@betarost/cemjs";
import { modals } from "./modals.js"
const initData = {}


const filters = {
    lang: {
        code: "",
        name: "all"
    },
    language: {
        value: "",
        type: "text",
        valid: false,
        code: "",
        name: "all",
        autocomplete: "off",
        readonly: true
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

const lang = {
    code: "",
    name: "all"
}

const country = {
    code: "",
    name: "all"
}

const group = {
    common: true,
    content: true,
    expert: true
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
    let objReturn = Object.create(typeCollections[type])
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
    let tmpName
    Static.isValid = false
    Static.submitClick = false
    Static.messageSent = false

    tmpName = "name"
    Static[tmpName] = generate("input", true)
    Static[tmpName].placeholder = Variable.lang.placeholder.name
    Static[tmpName].errorText = Variable.lang.error_div.nicknameErr
    Static[tmpName].label = Variable.lang.label.name
    Static[tmpName].condition = (value) => {
        return Helpers.validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
    }
    Static[tmpName].afterValid = () => {
        Helpers.checkValid(Static, ["name", "email", "message"])
    }

    tmpName = "email"
    Static[tmpName] = generate("input", true)
    Static[tmpName].placeholder = Variable.lang.placeholder.email
    Static[tmpName].errorText = Variable.lang.error_div.wrong_email
    Static[tmpName].label = Variable.lang.label.email
    Static[tmpName].condition = (value) => {
        return Helpers.validator.isEmail(value);
    }
    Static[tmpName].afterValid = () => {
        Helpers.checkValid(Static, ["name", "email", "message"])
    }

    tmpName = "message"
    Static[tmpName] = generate("input", true)
    // Static[tmpName].value = "gdggd"
    Static[tmpName].placeholder = Variable.lang.placeholder.message
    Static[tmpName].errorText = Variable.lang.error_div.not_empty_input
    Static[tmpName].label = Variable.lang.label.message
    Static[tmpName].condition = (value) => {
        return Helpers.validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
    }
    Static[tmpName].afterValid = () => {
        Helpers.checkValid(Static, ["name", "email", "message"])
    }

    /**
       * проверка имени и мыла 
       */
    if (Variable.myInfo.nickname) {
        Static.name.value = Variable.myInfo.nickname
        Static.name.valid = true
        Static.name.readonly = true
    }

    if (Variable.myInfo.email) {
        Static.email.value = Variable.myInfo.email
        Static.email.valid = true
        Static.email.readonly = true
    }

    return
}

initData.content_creator = function (Static) {
    Static.filters = {
        language: Object.create(filters.language),
        country: Object.create(country),
        group: false,
        online: false
    }

    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    // Static.language.value = Variable.lang.error_div.selectFromList

    Static.search = generate("input")
    Static.search.placeholder = Variable.lang.placeholder.findFriends

    return
}

















initData.generate = function (arrData) {
    console.log('=f1839b=', arrData)
    let objReturn = {}
    arrData.map(key => objReturn[key] = filters[key])
    return objReturn
}


export { initData };