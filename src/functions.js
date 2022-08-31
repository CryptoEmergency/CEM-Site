import { setValue,getAction, sendApi, delDOM, timersClear,parsingUrl } from '@betarost/cemjs'
import list from '@src/routerList.js'

const start = function (dataUrl) {
    if (!dataUrl) { dataUrl = parsingUrl() }
    if (!dataUrl.adress || dataUrl.adress == "") {
        list.index(dataUrl);
        return;
    }

    if (!list[dataUrl.adress]) {
        //404
        return;
    }

    list[dataUrl.adress](dataUrl);
    return;
}

const clickCancel = function (e) {
    e.stopPropagation()
}

const clickHide = function (e) {
    setValue("mainHeader", "langListShow", false)
}

const timerTik = function () {
    console.log("timerTik", "tt")
}

const timerCourse = async function () {
    var course = await sendApi.getCourse()
    setValue("mainBlock", "mainCourse", course.result.list_records[0]);
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
    if(!data || !data.result){
        console.error("Wrong answer from Api")
        return {list_records:[],totalFound:0}
    }
    return data.result
}

export { siteLink, changeLang, timerTik, timerCourse, clickHide, clickCancel,start,checkAnswerApi }