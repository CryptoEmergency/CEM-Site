import { Variable, initPage, parsingUrl } from "@betarost/cemserver/cem.js";

const forExport = async function (e, data) {
    let link

    if (typeof e == "string") {
        link = e
    } else {
        e.preventDefault();
        e.stopPropagation();

        if (!e.currentTarget || (!e.currentTarget.href && !e.currentTarget.dataset.href)) {
            console.error("Not have href")
            return
        }
        link = e.currentTarget.href ? e.currentTarget.href : e.currentTarget.dataset.href
    }
    history.pushState(null, null, link);
    Variable.Modals = []
    // let dataUrl = parsingUrl(link)
    let dataUrl = await parsingUrl(link)
    // console.log('=cab10c=', link, dataUrl)
    await initPage(dataUrl, data);
    return
}

export default forExport