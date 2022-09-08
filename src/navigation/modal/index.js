import {
    jsx,
    jsxFrag,
    getValue,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
} from '@betarost/cemjs'
import { ModalAuth } from '@component/modals/ModalAuth.js';
import { ModalComingSoon } from '@component/modals/ModalComingSoon.js';


const ID = "modals";

const changeCode = (e, country) => {
    e.stopPropagation()
    let show = getValue(ID, "showPhoneSelect")
    if (e.target.localName === "li") {
        setValue(ID, 'defaultAbbrPhone', country.abbr);
        setValue(ID, 'defaultTitlePhone', country.code);
        console.log(country);
    }
    setValue(ID, "showPhoneSelect", !show);
    console.log('=660861=', getValue(ID, "showPhoneSelect"))
}

const start = function () {
    const showAuth = getValue("modals", "authModalShow")
    const commingSoonModalShow = getValue("modals", "commingSoonModalShow")
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")];
    const defAbbr = getValue(ID, "defaultAbbrPhone");
    const defTitle = getValue(ID, "defaultTitlePhone");

    return (
        <div>
            <div class={`c-backdrop ${(showAuth || commingSoonModalShow) && "c-backdrop--show"}`}></div>
            {showAuth &&
                <ModalAuth
                    lang={lang}
                    changeCode={changeCode}
                    abbr={defAbbr}
                    codeTitle={defTitle}
                    ID={ID}
                />
            }
            {commingSoonModalShow &&
                <ModalComingSoon
                    lang={lang}
                />
            }
        </div>
    )


}

const init = function (reload) {
    // console.log("modals init", reload);
    if (!reload) {
        setValue(ID, "showPhoneSelect", false);
        setValue(ID, "defaultAbbrPhone", 'ru');
        setValue(ID, "defaultTitlePhone", '7');
    }

    makeDOM(start(), ID)
    return;
}
export { init }