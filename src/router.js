import { getVariable, setVariable, parsingUrl, delDOM } from '@betarost/cemjs'
import list from '@src/routerList.js'
import swiperload from "@assets/js/swiper.js"

const siteLink = function (e,noClear) {
    e.preventDefault()
    let link = this.href
    history.pushState(null, null, link)
    if(noClear){
    delDOM("mainBlock");
    document.getElementById("mainBlock").innerHTML = '';
    }
    init()
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
    start(dataUrl)
    after(dataUrl)
}

export { init, siteLink }