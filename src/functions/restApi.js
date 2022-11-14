import { Variable, sendApi } from "@betarost/cemjs";

const checkAnswer = function (response, name) {
    let objResponse = { totalFound: 0, list_records: [] }
    if (response) {
        if (typeof response.totalFound == "undefined") {
            response.totalFound = 0
        }
        if (!response.list_records) {
            response.list_records = []
        }
        objResponse = response
    }
    if (name) {
        Variable[name] = objResponse
    }
    return objResponse
}

const checkSetAnswer = function (response, noAlert) {
    let objResponse = { totalFound: 0, list_records: [], status: "no" }
    if (response) {
        objResponse.status = response.status

        if (response.result && response.result.totalFound) {
            objResponse.totalFound = response.result.totalFound
        }
        if (response.result && response.result.list_records) {
            objResponse.list_records = response.result.list_records
        }
        if (!noAlert) {
            if (response.status != "ok" && response.error) {
                Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true)
            }
        }
    }

    return objResponse
}

const restApi = {}

restApi.getCategories = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {

    let defaultFilter = {}
    defaultFilter["count." + (Variable.lang.code != "ru" ? "en" : "ru")] = { $gt: 0 }

    let data = {
        action: "getCategories",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select,
        sort
    }

    let response = await sendApi.send(data);
    let responseCheck = checkAnswer(response, name)
    if (firstRecord) {
        if (responseCheck.list_records.length) {
            return responseCheck.list_records[0]
        } else {
            return {}
        }
    } else {
        return responseCheck
    }
}

restApi.getNews = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord, defaultReset }) {

    let defaultFilter = {
        type: "news",
        "languages.code": Variable.lang.code != "ru" ? "en" : "ru"
    }

    let defaultSelect = {
        title: 1,
        preview: 1,
        image: 1,
        showDate: 1,
        source: 1,
        "statistic.view": 1,
        "statistic.comments": 1,
        text: 1
    }


    let data = {
        action: "getNews",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select: Object.assign(defaultSelect, select),
        sort
    }

    if (defaultReset) {
        if (filter) { data.filter = filter }
        if (select) { data.select = select }
    }

    let response = await sendApi.send(data);
    let responseCheck = checkAnswer(response, name)
    if (firstRecord) {
        if (responseCheck.list_records.length) {
            return responseCheck.list_records[0]
        } else {
            return {}
        }
    } else {
        return responseCheck
    }
}

restApi.getUsers = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: 1 }, firstRecord }) {

    let defaultFilter = {
        "confirm.registrasion": true
    }

    let defaultSelect = {
        rank: 1,
        social: 1,
        subscribe: 1,
        nickname: 1,
        fullname: 1,
        information: 1,
        "avatar.name": 1,
        "frame.name": 1,
        statistic: 1,
        online: 1,
        awards: 1,
        status: 1,
        showDate: 1,
    }


    let data = {
        action: "getUsers",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select: Object.assign(defaultSelect, select),
        sort
    }

    let response = await sendApi.send(data);
    let responseCheck = checkAnswer(response, name)
    if (firstRecord) {
        if (responseCheck.list_records.length) {
            return responseCheck.list_records[0]
        } else {
            return {}
        }
    } else {
        return responseCheck
    }
}


restApi.getPost = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {

    let defaultFilter = {
        "languages.code": Variable.lang.code
    }

    let defaultSelect = {
        author: 1,
        forFriends: 1,
        languages: 1,
        media: 1,
        showDate: 1,
        statistic: 1,
        text: 1,
        title: 1,
        updateTime: 1,
    }


    let data = {
        action: "getPost",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select: Object.assign(defaultSelect, select),
        sort
    }

    let response = await sendApi.send(data);
    let responseCheck = checkAnswer(response, name)
    if (firstRecord) {
        if (responseCheck.list_records.length) {
            return responseCheck.list_records[0]
        } else {
            return {}
        }
    } else {
        return responseCheck
    }
}
//
// SET
restApi.supportMessage = async function ({ name, email, text, noAlert = false }) {
    let data = {
        value: { name, email, text }
    }
    const response = await sendApi.create("supportMessage", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setPost = {}
restApi.setNews = {}

restApi.setPost.view = async function ({ _id, noAlert = true }) {
    let data = {
        value: { "statistic.view": true },
        _id
    }
    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setNews.view = async function ({ _id, noAlert = true }) {
    let data = {
        value: { "statistic.view": true },
        _id
    }
    const response = await sendApi.create("setNews", data);
    return checkSetAnswer(response, noAlert)
}

export { restApi };