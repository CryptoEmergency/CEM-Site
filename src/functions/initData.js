import { Variable, Helpers } from "@betarost/cemjs";
import { modals } from "./modals.js"
import { fn } from '@src/functions/index.js';
const initData = {}

const form = {
    language: {
        value: "",
        type: "text",
        valid: true,
        code: "",
        name: "all",
        autocomplete: "off",
        readonly: true
    },
}


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
        value: "",
        type: "text",
        valid: false,
        code: "",
        name: "all",
        autocomplete: "off",
        readonly: true
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
    media: {
        value: [],
        show: false,
        selectAspect: null,
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

const createData = function (type, data = {}) {
    let objReturn = Object.assign({}, typeCollections[type], data)
    if (data.errorText) {
        objReturn.error = false
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
    Static.nameRecords = "PageCreators"
    Static.type = "creator"

    Static.filters = {
        language: Object.create(filters.language),
        country: Object.create(filters.country),
        group: false,
        online: false
    }

    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.language.value = Variable.lang.text.language

    Static.filters.country.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.country.value = Variable.lang.text.country

    Static.search = generate("input")
    Static.search.placeholder = Variable.lang.placeholder.findFriends

    return
}


initData.ModalAskQuestion = function (Static) {
    Static.form = {
        language: createData("language", {
            value: Variable.myInfo.mainLanguage.eng_name + ` (${Variable.myInfo.country.orig_name})`,
            code: Variable.myInfo.mainLanguage.code
        }),
        title: createData("input", {
            errorText: Variable.lang.error_div.minSymbol,
            placeholder: Variable.lang.placeholder.titleAsk,
            label: Variable.lang.label.question,
            condition: function (value) {
                if (!value || !value.length) {
                    this.errorText = Variable.lang.error_div.not_empty_input
                    return false
                } else if (value.length < 5) {
                    this.errorText = Variable.lang.error_div.minSymbol
                    return false
                } else if (value.length > 500) {
                    this.errorText = Variable.lang.error_div.maxSymbol
                    return false
                }
                return true
            },
            afterValid: function () {
                fn.checkValid(Static.form, ["title"])
            }
        }),
        description: createData("input", {
            placeholder: Variable.lang.label.description
        }),
        media: createData("media"),
        isValid: false,
        submitClick: false,
        messageSent: false
    }

    return
}


initData.experts = function (Static) {
    Static.nameRecords = "PageExperts"
    Static.type = "experts"

    Static.filters = {
        language: Object.create(filters.language),
        country: Object.create(filters.country),
        group: false,
        online: false
    }

    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.language.value = Variable.lang.text.language

    Static.filters.country.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.country.value = Variable.lang.text.country

    Static.search = generate("input")
    Static.search.placeholder = Variable.lang.placeholder.findFriends

    return
}

initData.users = function (Static) {
    Static.nameRecords = "PageUsers"
    Static.type = "all"

    Static.filters = {
        language: Object.create(filters.language),
        country: Object.create(filters.country),
        group: {
            common: true,
            content: true,
            expert: true
        },
        online: false
    }

    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.language.value = Variable.lang.text.language

    Static.filters.country.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.country.value = Variable.lang.text.country

    Static.search = generate("input")
    Static.search.placeholder = Variable.lang.placeholder.findFriends

    return
}

initData.question = function (Static) {
    Static.nameRecords = "PageQuestions"
    Static.filters = {
        language: Object.create(filters.language),
        questions: {
            value: "all"
        },
        date: {
            value: "date"
        },
        desc: -1
    }
    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.language.value = Variable.lang.text.language
    Static.filters.language.code = Variable.lang.code
    Static.filters.language.name = `${Variable.lang.lang} (${Variable.lang.lang_orig})`

    Static.elShowFilter

    // Static.type = "all"



    // Static.filtersQuestions = {
    //     lang: {
    //         code: Variable.lang.code,
    //         name: `${Variable.lang.lang} (${Variable.lang.lang_orig})`
    //     },
    //     questions: {
    //         value: "all"
    //     },
    //     date: {
    //         value: "date"
    //     },
    //     desc: -1
    // }

    Static.optionsSelect = {
        questions: {
            nameOptions: "questions",
            title: Variable.lang.span.sort,
            items: [
                { text: Variable.lang.select.showAllQuestions, value: "all" },
                { text: Variable.lang.select.openQuestions, value: "open" },
                { text: Variable.lang.select.closeQuestions, value: "closed" },
                { text: Variable.lang.select.bestQuestions, value: "best" },
            ],
            open: false,
            active: "all",
        },
        date: {
            nameOptions: "date",
            title: Variable.lang.span.sort,
            asort: -1,
            items: [
                { text: Variable.lang.select.byDate, value: "date" },
                { text: Variable.lang.select.byViews, value: "views" },
                { text: Variable.lang.select.byAnswers, value: "answers" },
            ],
            open: false,
            active: "date",
        },
    };



    // Static.filters.country.placeholder = Variable.lang.error_div.selectFromList
    // Static.filters.country.value = Variable.lang.text.country

    // Static.search = generate("input")
    // Static.search.placeholder = Variable.lang.placeholder.findFriends

    return
}


initData.lenta_users_show = function (Static) {
    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.showPage = true
    Static.path = "posts"

    Static.elMedia = {}
    Static.elToogle = {}
    Static.elShowTextFull = {}
    Static.elShowTextShort = {}
    Static.elMedia = {}
    Static.elNumberSwiper = {}
    Static.mainComment = {
        rows: 1,
        adaptive: 4
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}

initData.lenta_users = function (Static) {
    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.path = "posts"

    Static.elMedia = {}
    Static.elToogle = {}
    Static.elShowTextFull = {}
    Static.elShowTextShort = {}
    Static.elMedia = {}

    Static.elNumberSwiper = {}

    Static.nameRecords = "PageLentaall";
    Static.lentaPage = "all";
    Static.lentaFilters = {
        lang: Variable.lang.code,
        langName: Variable.lang.lang_orig,
        author: null,
    };

    Static.optionsSelect = {
        posts: {
            nameOptions: "posts",
            items: [
                { text: Variable.lang.span.userNews, value: "all" },
                { text: Variable.lang.h.posts_friends, value: "friends" },
            ],
            open: false,
            active: "all",
        },
    };

    Static.mainComment = {
        rows: 1,
        adaptive: 4
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}

initData.question_show = function (Static) {
    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.showPage = true
    Static.path = "question"

    Static.elMedia = {}
    Static.elToogle = {}
    Static.elShowTextFull = {}
    Static.elShowTextShort = {}
    Static.elMedia = {}
    Static.elShowComment = {}
    Static.elShowAnswersComment = {}

    Static.elButtonSubmit = {}
    // Static.itemAnswer={}

    Static.mainComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}


initData.blog = function (Static) {

    Static.activeCategory = "All"
    Static.type = "blog"
    Static.nameRecords = "PageBlog"

    return
}

initData.news = function (Static) {

    Static.activeCategory = "All"
    Static.type = "news"
    Static.nameRecords = "PageNews"

    return
}

initData.posts = function (Static) {

    Static.textInputs = {
        value: "",
        show: false,
    }
    Static.mediaInputs = {
        value: [],
        show: false,
    }
    Static.audioInputs = {
        value: [],
        show: false,
    }
    Static.lang = {
        code: Variable.myInfo.mainLanguage.code,
        name: Variable.myInfo.mainLanguage.orig_name
    }
    Static.forFriends = false
    Static.isValid = false

    return
}

initData.media = function (Static) {

    Static.activeCategory = Variable.lang.code
    Static.type = "media"
    Static.nameRecords = "PageMedia"

    return
}


initData.blog_show = function (Static) {

    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.showPage = true


    Static.mainComment = {
        rows: 1,
        adaptive: 4
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}


initData.news_show = function (Static) {

    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.showPage = true


    Static.mainComment = {
        rows: 1,
        adaptive: 4
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}

initData.media_show = function (Static) {

    Static.isValid = true
    Static.submitClick = false
    Static.messageSent = false
    Static.showPage = true


    Static.mainComment = {
        rows: 1,
        adaptive: 4
    }

    Static.secondComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

    return
}














initData.generate = function (arrData) {
    let objReturn = {}
    arrData.map(key => objReturn[key] = filters[key])
    return objReturn
}


initData.rooms = function (Static) {
    Static.Rooms = {}
    Static.MessageValue = {}
}

export { initData };