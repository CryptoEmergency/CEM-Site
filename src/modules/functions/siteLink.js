import { Variable, initGo, parsingUrl } from "@betarost/cemserver/cem.js";

const forExport = async function (e) {
    let link

    if (typeof e == "string") {
        link = e

    } else {
        // console.log(e)
        e.preventDefault();
        if (!e.currentTarget || !e.currentTarget.href) {
            console.error("Not have href")
            return
        }
        link = e.currentTarget.href;
    }
    // console.log('=fc61e3=', link, window.location.href, Variable.dataUrl)
    if (link == window.location.href || link == Variable.dataUrl.href) {
        history.pushState(null, null, link);
        initGo("newPage")
        // window.scrollTo({
        //   top: 0,
        //   behavior: "instant",
        // });
    } else {

        history.pushState(null, null, link);
        await parsingUrl()
    }
    return
}

export default forExport