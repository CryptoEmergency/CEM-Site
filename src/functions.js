import { getStorage,setValue,getAction,getVariable, sendApi, delDOM, timersClear,parsingUrl } from '@betarost/cemjs'
import list from '@src/routerList.js';
import validator from 'validator';
import moment from 'moment';

const start = function (reload) {
    const dataUrl = getVariable("dataUrl")
    if (!dataUrl.adress || dataUrl.adress == "") {
        list.index(reload);
        return;
    }

    if (!list[dataUrl.adress]) {
        list.error404(reload)
        return;
    }

    list[dataUrl.adress](reload);
    return;
}

const clickCancel = function (e) {
    e.stopPropagation()
}

const clickHide = function (e) {
    setValue("mainHeader", "langListShow", false)
}

const timerTik = function () {
    //console.log("timerTik", "tt")
}

const getNewsItem = async function (type) {
    let getLang = "en"
    if(getStorage("lang") == "ru"){
        getLang = "ru"
    }

    let data = {
        "filter": {
            "type": type,
            "languages.code": getLang
        },
        "select": {
            "title": 1,
            "preview": 1,
            "image": 1,
            "showDate": 1,
            "statistic.view": 1,
            "statistic.comments": 1
        },
        "sort": {
            "showDate": -1
        },
        "limit": 6
    }

 var response = checkAnswerApi(await sendApi.create("getNews", data))
    return response

}

const getDateFormat = function (data){
 return moment(data).format("YYYY-MM-DD");
}

const getNewsCategory = async function (type) {
    let getLang = "en"
    if(getStorage("lang") == "ru"){
        getLang = "ru"
    }
    let data = {
        filter: {
          type,
        }
    }
    data.filter["count."+getLang] = {$gt: 0}
    
    var response = checkAnswerApi(await sendApi.create("getCategories", data))
    return response
    setValue("mainBlock", "newsCategory", course.list_records[0])
}

const timerCourse = async function () {
    var course = checkAnswerApi(await sendApi.getCourse())
    setValue("mainBlock", "mainCourse", course.list_records[0]);
}

const siteLink = function (e) {
    e.preventDefault()
    let link = this.href
    history.pushState(null, null, link)
    timersClear();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    getAction("App", "start")()
}

const changeLang = function (e) {
    e.preventDefault()
    let link = this.href
    history.pushState(null, null, link)
    timersClear();
    getAction("App", "start")()
}

const checkAnswerApi = function (data) {
    // console.log(data);
    if(!data || !data.result){
        console.error("Wrong answer from Api")
        return {list_records:[{}],totalFound:0}
    }
    return data.result
}

const allValidation = (str, type, condition) => {
    console.log(validator)
    if(type == "email") {
        return validator.isEmail(str);
    }
    if(condition) {
        return validator.matches(str,condition)
    }




}



export { getDateFormat, getNewsItem, getNewsCategory,siteLink, changeLang, timerTik, timerCourse, clickHide, clickCancel, start, checkAnswerApi, allValidation }