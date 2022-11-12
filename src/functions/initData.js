import { Variable, } from "@betarost/cemjs";

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

initData.generate = function (arrData) {
    console.log('=f1839b=', arrData)
    let objReturn = {}
    arrData.map(key => objReturn[key] = filters[key])
    return objReturn
}


export { initData };