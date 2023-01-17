import { Variable, sendApi } from "@betarost/cemserver/cem.js";

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

restApi.getCourse = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {


    let data = {
        action: "getCourse",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

restApi.getTransactions = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {


    let data = {
        action: "getTransactions",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

restApi.getExchange = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { score: -1 }, firstRecord }) {


    let data = {
        action: "getExchange",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

restApi.getTrade = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { score: -1 }, firstRecord }) {


    let data = {
        action: "getTrade",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

restApi.getLottery = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { score: -1 }, firstRecord }) {


    let data = {
        action: "getLottery",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

    if(filter._id){
        defaultFilter = {}
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

restApi.getAnswers = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: 1 }, firstRecord }) {

    let defaultFilter = {
    }

    let defaultSelect = {
        author: 1,
        best: 1,
        comments: 1,
        media: 1,
        showDate: 1,
        statistic: 1,
        text: 1,
    }


    let data = {
        action: "getAnswers",
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


restApi.getComments = async function ({ cache, name, limit = 6, offset = 0, filter = {}, select = {}, sort = { showDate: -1 }, firstRecord }) {


    let data = {
        action: "getComments",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
        select: select,
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

restApi.getQuestions = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {

    let defaultFilter = {
    }

    let defaultSelect = {
        title: 1,
        showDate: 1,
        statistic: 1,
        languages: 1,
        close: 1,
        bestId: 1,
        media: 1,
        author: 1,
        text: 1
    }


    let data = {
        action: "getQuestions",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: Object.assign(defaultFilter, filter),
        select: Object.assign(defaultSelect, select),
        sort
    }
   //console.log('QUESTIONS!', data)
    let response = await sendApi.send(data);
    //console.log('QUESTIONS!', response)
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

    if(filter._id){
        defaultFilter = {}
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

restApi.getUserRoom = async function ({ cache, name, limit = 6, offset = 0, filter = {}, select = {}, sort = { showDate: -1 }, firstRecord }) {
    let data = {
        action: "getUserRoom",
        short: true,
        cache: cache,
        name,
        limit,
        offset,
        filter: filter,
        select: select,
        sort,

    }
//console.log('=89815b=',data)
    let response = await sendApi.send(data);
  //  console.log('=7755d1=',response)
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

restApi.getFrames = async function ({ cache, name, limit = 6, offset = 0, filter, select, sort = { showDate: -1 }, firstRecord }) {


    let data = {
        action: "getFrames",
        short: true,
        cache,
        name,
        limit,
        offset,
        filter: filter,
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

//
// SET
restApi.supportMessage = async function ({ name, email, text, noAlert = false }) {
    let data = {
        value: { name, email, text }
    }
    const response = await sendApi.create("supportMessage", data);
    return checkSetAnswer(response, noAlert)
}



restApi.setAnswers = {}
restApi.setAnswers.evaluation = async function ({ _id, evaluation, comment, mainId, noAlert }) {
    let data = {}
    if (comment) {
        data = { _id: mainId, value: { comments: { evaluation, _id } } }
    } else {
        data = {
            _id: _id,
            value: { evaluation }
        }

    }

    const response = await sendApi.create("setAnswers", data);
    return checkSetAnswer(response, noAlert)
}
// Комментарий на пост главный
restApi.setAnswers.comment = async function ({ _id, text, mainId, quoteId, noAlert }) {
    let data = {}
    if (quoteId) {
        data = {
            _id: mainId,
            value: {
                comments: { _id: quoteId, comments: { text, quote: quoteId } }
            }
        }
    } else {
        if (mainId) {
            data = {
                _id: mainId,
                value: {
                    comments: { _id, comments: { text } }
                }
            }
        } else {
            data = {
                _id: _id,
                value: {
                    comments: { text }
                }
            }
        }
    }


    //{ _id: mainId, value: { comments: { evaluation: type, _id: item._id } } }
    const response = await sendApi.create("setAnswers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setAnswers.delete = async function ({ _id }) {
    let data = {
        _id: _id,
        value: {
            active: false
        }
    }
   // console.log(data)
    const response = await sendApi.create("setAnswers", data);
  //  console.log(response)
    return checkSetAnswer(response)
}

restApi.setAnswers.complain = async function ({ _id, complain }) {
    let data = {
        _id,
        value: {
            complain
        }
    }
    //console.log(data)
    const response = await sendApi.create("setAnswers", data);
   // console.log(response)
    return checkSetAnswer(response)
}
// Запросы на посты
restApi.setPost = {}


restApi.setPost.create = async function ({ text, forFriends, languages, media, noAlert }) {
    let data = {
        value: {
            text: text,
            forFriends: forFriends,
            languages: languages,
            media: media
        },
    };

    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}
restApi.setPost.update = async function ({ id, text, forFriends, languages, media, noAlert }) {
    let data = {
        _id: id,
        value: {
            text: text,
            forFriends: forFriends,
            languages: languages,
            media: media
        },
    };

    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}

// Увеличить просмотры
restApi.setPost.view = async function ({ _id, noAlert = true }) {
    let data = {
        value: { "statistic.view": true },
        _id
    }
    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}
// Лайк-Дизлайк
restApi.setPost.evaluation = async function ({ _id, evaluation, comment, mainId, noAlert }) {
    let data = {}
    if (comment) {
        data = { _id: mainId, value: { comments: { evaluation, _id } } }
    } else {
        data = {
            _id: _id,
            value: { evaluation }
        }

    }

    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}
// Комментарий на пост главный
restApi.setPost.comment = async function ({ _id, text, mainId, quoteId, noAlert }) {
    let data = {}
    if (quoteId) {
        data = {
            _id: mainId,
            value: {
                comments: { _id: quoteId, comments: { text, quote: quoteId } }
            }
        }
    } else {
        if (mainId) {
            data = {
                _id: mainId,
                value: {
                    comments: { _id, comments: { text } }
                }
            }
        } else {
            data = {
                _id: _id,
                value: {
                    comments: { text }
                }
            }
        }
    }


    //{ _id: mainId, value: { comments: { evaluation: type, _id: item._id } } }
    const response = await sendApi.create("setPost", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setPost.complain = async function ({ _id, complain }) {
    let data = {
        _id,
        value: {
            complain
        }
    }
  
    const response = await sendApi.create("setPost", data);
  
    return checkSetAnswer(response)
}


restApi.setPost.delete = async function ({ _id }) {
    let data = {
        _id: _id,
        value: {
            active: false
        }
    }
   // console.log(data)
    const response = await sendApi.create("setPost", data);
  //  console.log(response)
    return checkSetAnswer(response)
}
// Запросы  на новости
restApi.setNews = {}

restApi.setNews.evaluation = async function ({ _id, evaluation, comment, mainId, noAlert }) {
    let data = {}
    if (comment) {
        data = { _id: mainId, value: { comments: { evaluation, _id } } }
    } else {
        data = {
            _id: _id,
            value: { evaluation }
        }

    }

    const response = await sendApi.create("setNews", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setNews.comment = async function ({ _id, text, mainId, quoteId, noAlert }) {
    let data = {}
    if (quoteId) {
        data = {
            _id: mainId,
            value: {
                comments: { _id: quoteId, comments: { text, quote: quoteId } }
            }
        }
    } else {
        if (mainId) {
            data = {
                _id: mainId,
                value: {
                    comments: { _id, comments: { text } }
                }
            }
        } else {
            data = {
                _id: _id,
                value: {
                    comments: { text }
                }
            }
        }
    }


    //{ _id: mainId, value: { comments: { evaluation: type, _id: item._id } } }
    const response = await sendApi.create("setNews", data);
    return checkSetAnswer(response, noAlert)
}


restApi.setLottery = {}
restApi.setLottery.join = async function ({ nickname, telegram, twitter, instagram, email, noAlert }) {
    let data = {
        value: {
            nickname,
            telegram,
            twitter,
            instagram,
            email
        }
    }
    const response = await sendApi.create("setLottery", data);
   // console.log(data)
   // console.log('response', response)
    return checkSetAnswer(response, noAlert)
}

restApi.setUserChats = {}

restApi.setUserChats.sendMessage = async function ({ users, text, media, noAlert = true }) {
    let data = {
        value: { users, message: { text, media } }
    }
   // console.log('=805a2d=', data)
    const response = await sendApi.create("setUserChats", data);
  //  console.log('=4e499a=', response)
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers = {}

restApi.setUsers.any = async function ({ data, noAlert = true }) {
    const response = await sendApi.create("setUsers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers.update = async function ({ data, noAlert = true }) {
    const response = await sendApi.create("setUsers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers.view = async function ({ _id, noAlert = true }) {
    let data = {
        value: { "statistic.view": true },
        _id
    }
    const response = await sendApi.create("setUsers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers.delete = async function ({ del, noAlert = true }) {
    let data = {}
    if (del) {
        data = {
            value: {
                'status.delete': true,
                startDelete: new Date().toISOString()
            }
        }

    } else {
        data = {
            value: {
                'status.delete': false,
                startDelete: ''
            }
        }
    }
    const response = await sendApi.create("setUsers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers.subscribe = async function ({ _id, noAlert = true }) {
    let data = {
        value: { subscribed: _id },
    }
    const response = await sendApi.create("setUsers", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUsers.complain = async function ({ _id, complain }) {
    let data = {
        _id,
        value: {
            complain
        }
    }
 
    const response = await sendApi.create("setUsers", data);

    return checkSetAnswer(response)
}

restApi.setUsers.blackList = async function ({ _id, noAlert = true }) {
    let data = {
        value: {
            blackList: _id
        }
    }
    const response = await sendApi.create("setUsers", data);
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




restApi.setQuestions = {}

restApi.setQuestions.best = async function ({ _id, answerID }) {
    let data = {
        _id,
        value: {
            bestId: answerID
        }
    }
    const response = await sendApi.create("setQuestion", data);
    return checkSetAnswer(response)
}

restApi.setQuestions.complain = async function ({ _id, complain }) {
    let data = {
        _id,
        value: {
            complain
        }
    }
    
    const response = await sendApi.create("setQuestion", data);
   // console.log(response)
    return checkSetAnswer(response)
}

restApi.setQuestions.view = async function ({ _id, noAlert = true }) {
    let data = {
        value: { "statistic.view": true },
        _id
    }
    const response = await sendApi.create("setQuestions", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setQuestions.delete = async function ({ _id, noAlert = true }) {
    let data = {
        _id: _id,
        value: {
            active: false
        }
    }
    const response = await sendApi.create("setQuestions", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setQuestions.close = async function ({ _id, noAlert = true }) {
    let data = {
        _id: _id,
        value: {
            close: true
        }
    }
    const response = await sendApi.create("setQuestions", data);
    return checkSetAnswer(response, noAlert)
}

restApi.setUserRoom = {}


restApi.setUserRoom.create = async function ({ status, visible, confirmuser, title, description, images, languages, country, system = false, category }) {
    let data = {
        value: {
            settingsroom: {
                status: status,
                visible: visible,
                confirmuser: confirmuser,
                title: title,
                description: description,
                category:category,
                images: images,
                category: category
            },
            languages: languages,
            country: country,
            system: system
        }
    }

    const response = await sendApi.create("setUserRoom", data);
    return checkSetAnswer(response)
}

restApi.setUserRoom.edit = async function ({ _id, status, visible, confirmuser, title, description, images, languages, category, country, system = false }) {
    let data = {
        _id: _id,
        value: {
            settingsroom: {
                status: status,
                visible: visible,
                confirmuser: confirmuser,
                title: title,
                description: description,
                category:category,
                images: images,
            },
            languages: languages,
            country: country,
            system: system

        },
        edit: true
    }

    const response = await sendApi.create("setUserRoom", data);
    return checkSetAnswer(response)
}



restApi.setUserRoom.quit = async function ({ _id }) {
    let data = {
        _id: _id,
        quit: true
    }

    const response = await sendApi.create("setUserRoom", data);
   
    return checkSetAnswer(response)
}

restApi.setUserRoom.add = async function ({ _id }) {
    let data = {
        _id: _id,
        add: true
    }

    const response = await sendApi.create("setUserRoom", data);
   
    return checkSetAnswer(response)
}



restApi.setUserRoomMessage = {}

restApi.setUserRoomMessage.sendMessage = async function ({ text, _id }) {
    let data = {
        value: {
            message: {
                text: text,
                /*  media:[{
                      type: {type: String},
                      name: {type: String},
                      active:{type: Boolean, default: true}
                  }]*/
            }
        },
        _id
    }


    const response = await sendApi.create("setUserRoom", data);
   
    return checkSetAnswer(response)
}


restApi.setComments = {}

restApi.setComments.complain = async function ({ _id, complain }) {
    let data = {
        _id,
        value: {
            complain
        }
    }
    const response = await sendApi.create("setComments", data);
    return checkSetAnswer(response)
}

restApi.setComments.edit = async function ({ _id, text }) {
    let data = {
        _id,
        value: {
            text: text
        }
    }
    const response = await sendApi.create("setComments", data);
    return checkSetAnswer(response)
}

restApi.setComments.delete = async function ({ _id }) {
    let data = {
        _id,
        value: {
            active: false
        }
    }
    const response = await sendApi.create("setComments", data);
    return checkSetAnswer(response)
}




restApi.userRoomCode = async function ({ id, value }) {
    let data = {
        value: { confirmuser: value },
        _id: id
    }


    const response = await sendApi.create("userRoomCode", data);
    return checkSetAnswer(response)
}

restApi.userRoomCode = async function ({ id, value }) {
    let data = {
        value: { confirmuser: value },
        _id: id
    }


    const response = await sendApi.create("userRoomCode", data);
    return checkSetAnswer(response)
}

restApi.resetPassword = async function(value)
{

    let data = {
        value: { email: value }
    }
 
    const response = await sendApi.create("resetPassword", data);
 
    return checkSetAnswer(response)
}


restApi.setNewPassword = async function(linkOne,linkTwo,password)
{

    let data = {
        value: { linkOne: linkOne ,
                linkTwo:linkTwo,
            password:password}
    }

    const response = await sendApi.create("resetPassword", data);
 
    return checkSetAnswer(response)
}

restApi.logOut = async function()
{

 
    const response = await sendApi.create("logout");

    return checkSetAnswer(response)
}


restApi.doRole = {}

restApi.doRole.deletePost = async function ({ _id }) {
    let data = {
        roleAction: "setPost",
        _id: _id,
        value: {
            active: false
        }
    }

    const response = await sendApi.create("doRole", data);
    return checkSetAnswer(response)
}

restApi.doRole.deleteAnswer = async function ({ _id }) {
    let data = {
        roleAction: "setAnswer",
        _id: _id,
        value: {
            active: false
        }
    }

    const response = await sendApi.create("doRole", data);
    return checkSetAnswer(response)
}

restApi.doRole.deleteQuestion = async function ({ _id }) {
    let data = {
        roleAction: "setQuestion",
        _id: _id,
        value: {
            active: false
        }
    }

    const response = await sendApi.create("doRole", data);
    return checkSetAnswer(response)
}

restApi.doRole.deleteComment = async function ({ _id }) {
    let data = {
        roleAction: "setComments",
        _id: _id,
        value: {
            active: false
        }
    }

    const response = await sendApi.create("doRole", data);
    return checkSetAnswer(response)
}

export { restApi };