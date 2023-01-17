import { Variable, Helpers } from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';

const initData = {}

// 2023
initData.any = function (Static) {
    Static.elMedia = {}
    Static.elToogle = {}
    Static.elShowTextFull = {}
    Static.elShowTextShort = {}
    Static.elMedia = {}
    Static.elShowComment = {}
    Static.elShowAnswersComment = {}
    Static.elShowButtonComment = []

    Static.elButtonSubmit = {}
    Static.commentText = []

    return
}

// 2022
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
    cities: {
        value: "",
        type: "text",
        valid: false,
        code: "",
        name: "all",
        autocomplete: "off",
        readonly: true
    },
    interests: {
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

initData.ModalUserInterests = function (Static, userInfo, action) {
    Static.isValid = false

    if (userInfo) {
        Static.name = input
        Static.name.value = userInfo.title
        Static.name.placeholder = Variable.lang.label.label

        Static.description = input
        Static.description.value = userInfo.description
        Static.description.placeholder = Variable.lang.label.labelDetails
    } else {

        Static.name = {
            value: "",
            type: "text",
            valid: false,
            autocomplete: "off",
            placeholder: Variable.lang.label.label,
        }

        Static.description = {
            value: "",
            type: "text",
            valid: false,
            autocomplete: "off",
            placeholder: Variable.lang.label.labelDetails,
        }
    }

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
        mediaInputs: {
            value: [],
            show: false,
        },
        audioInputs: {
            value: [],
            show: false,
        },
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
    Static.commentText = []

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

    Static.editComment = {
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
    Static.elShowButtonComment = []

    Static.elButtonSubmit = {}
    Static.commentText = []
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
    Static.editComment = {
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
    Static.commentText = []

    Static.editComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

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
    Static.commentText = []
    Static.editComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }


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
    Static.commentText = []
    Static.editComment = {
        rows: 1,
        adaptive: 4,
        elShowInput: {},
        el: {}
    }

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

    Static.sytemInfo = {}
    if (Variable.auth) {
        Static.sytemInfo.code = Variable.myInfo.mainLanguage.code
        Static.sytemInfo.name = Variable.myInfo.mainLanguage.eng_name
    }
    else {
        Static.sytemInfo.code = Variable.lang.code
        Static.sytemInfo.name = Variable.lang.lang_orig
    }


    Static.optionsSelect = {
        Category: {
            active: "all",
            items: [
                { text: "Все категории", value: "all" },
                { text: "NFT", value: "NFT" },
                { text: "Crypto вселененная", value: "Crypto" },
                { text: "Altcoin", value: "Altcoin" },
                { text: "Bitcoin", value: "Bitcoin" },
                { text: "Finances", value: "Finances" },
                { text: "Trading", value: "Trading" }
            ],
            nameOptions: "Category",
            open: false,
            title: "Показать"
        },
        Date: {
            active: "date",
            items: [
                { text: "По дате создания", value: "date" },
                { text: "По количеству участников", value: "users" },
                { text: "По количеству сообщений", value: "message" }

            ],
            nameOptions: "Date",
            open: false,
            title: "Сортировать"
        }
    };
    Static.Category = { value: "all" }

    Static.language = { name: "all", code: Variable.lang.code }

    //Зарегистрирован или нет
    Static.Auth = Variable.auth
    //настройки языка
    Static.UserLang = Variable.myInfo.mainLanguage
    Static.Rooms = {}
    Static.MessageValue = {}
    Static.searchInput = {}
    Static.ActiveListRooms = {}
    Static.privateRoom = {}
    Static.label = {}
    Static.lang = {
        code: Static.sytemInfo.code,
        name: Static.sytemInfo.name
    }


    Static.apiFilter = { system: false }

    //кодовое слово
    Static.confirmPasword = {
        label: "Введите пароль от комнаты",
        value: "",
        valid: false,
        error: false,
        type: "text",
        errorText: "Не верный пароль",
        condition: async (value) => {

            let id = Static.Rooms._id

            let confirm = await fn.restApi.userRoomCode({ id, value })
            if (confirm.status == "ok") {
                return true
            }
            else {
                return false
            }


        },
        afterValid: () => {
            Helpers.checkValid(Static, ["confirmPasword"])

        }
    }
    return
}

initData.community = function (Static) {

    Static.sytemInfo = {}
    if (Variable.auth) {
        Static.sytemInfo.code = Variable.myInfo.mainLanguage.code
        Static.sytemInfo.name = Variable.myInfo.mainLanguage.orig_name
    }
    else {
        Static.sytemInfo.code = Variable.lang.code
        Static.sytemInfo.name = Variable.lang.lang_orig
    }

    Static.lang = {
        code: Static.sytemInfo.code,
        name: Static.sytemInfo.name
    }

    Static.nameRecords = "PageCommunity"
    Static.type = "all"

    Static.filters = {
        language: Object.create(filters.language),
        country: Object.create(filters.country),
        cities: Object.create(filters.cities),
        interests: Object.create(filters.interests),
        group: {
            offline: true,
        },
    }

    Static.filters.language.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.language.value = Variable.lang.text.language

    Static.filters.country.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.country.value = Variable.lang.text.country

    Static.filters.cities.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.cities.value = Variable.lang.text.city

    Static.filters.interests.placeholder = Variable.lang.error_div.selectFromList
    Static.filters.interests.value = Variable.lang.text.interests

    Static.search = generate("input")
    Static.search.placeholder = Variable.lang.placeholder.findCommunity

    Static.optionsSelect = {
        sortCommunity: {
            nameOptions: "sortCommunity",
            title: Variable.lang.span.sort,
            asort: -1,
            items: [
                { text: Variable.lang.select.byDate, value: "date" },
                { text: Variable.lang.select.byRating, value: "rating" },
                { text: Variable.lang.select.byNew, value: "new" },
            ],
            open: false,
            active: "date",
        },
    };

    Static.activeCategory = "All"
    Static.type = "community"
    Static.nameRecords = "PageCommunity"
}

export { initData };