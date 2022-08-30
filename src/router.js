import { getVariable, setVariable, parsingUrl, delDOM,timersClear,timersStart } from '@betarost/cemjs'
import list from '@src/routerList.js'
import swiperload from "@assets/js/swiper.js"
import {timerTik} from '@src/functions.js'

const siteLink = function (e) {
    e.preventDefault()
    let link = this.href
    history.pushState(null, null, link) 
    timersClear();   
    delDOM("mainBlock");  
    //delDOM("mainHeader");   
    document.getElementById("mainBlock").innerHTML = '';
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    init()
}

const changeLang = function (e) {
    e.preventDefault()
    let link = this.href
    history.pushState(null, null, link)
    timersClear();
    init()
}

const befor = function (dataUrl) {
    timersStart("TikTok",timerTik,1500)
}

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

const after = function (dataUrl) {
    if (!getVariable("load")) {
        setVariable({ load: true });
        setTimeout(() => {
            document.getElementById("page_loader").remove();
        }, 200);

    }
    swiperload();
}

const init = function () {
    const dataUrl = parsingUrl()
    befor(dataUrl);
    start(dataUrl)
    after(dataUrl)
}

export { init, siteLink,changeLang }