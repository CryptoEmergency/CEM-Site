import {
    getVariable,
    setVariable,
    setValue,
    setAction,
    timersStart,
    parsingUrl,
} from '@betarost/cemjs'
import { init as mainHeader } from "@navigation/header/index.js";
import { init as mainFooter } from '@navigation/footer/index.js';
import { init as mainModal } from '@navigation/modal/index.js';
import { timerTik, start } from '@src/functions.js'


setValue("mainHeader", "show", true);
setValue("mainFooter", "show", true);
setAction("mainFooter", "start", mainFooter)
setAction("mainHeader", "start", mainHeader)
setAction("modals", "start", mainModal)
setAction("mainBlock", "start", start)

const init = async function () {
    parsingUrl()
    timersStart("TikTok", timerTik, 1500)
    mainHeader()
    await start()
    mainFooter()
    mainModal()
    if (!getVariable("load")) {
        setVariable({ load: true });
        setTimeout(() => {
            document.getElementById("page_loader").remove();
        }, 1000);
    }

}

export { init }