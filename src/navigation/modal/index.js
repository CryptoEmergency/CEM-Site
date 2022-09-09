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
import { ModalReset } from '@component/modals/ModalReset.js';
import { ModalReg } from '@component/modals/ModalReg.js';


const ID = "modals";

const changeCode = (e, country) => {
    e.stopPropagation()
    let show = getValue(ID, "showPhoneSelect")
    if (e.target.localName === "li") {
        setValue(ID, 'defaultAbbrPhone', country.abbr);
        setValue(ID, 'defaultTitlePhone', country.code);
    }
    setValue(ID, "showPhoneSelect", !show);
};

const changeWayAuth = (e) => {
    e.stopPropagation()
    let way = getValue(ID, "toggleWayAuth");
    if (e.target.id == "loginByMobile" && way == "email") {
        setValue(ID, 'toggleWayAuth', "phone");
    } else if (e.target.id == "loginByEmail" && way == "phone") {
        setValue(ID, 'toggleWayAuth', "email");
    }
};

const changeWayReset = (e) => {
    e.stopPropagation()
    let way = getValue(ID, "toggleWayReset");
    if (e.target.id == "resetByMobile" && way == "email") {
        setValue(ID, 'toggleWayReset', "phone");
    } else if (e.target.id == "resetByEmail" && way == "phone") {
        setValue(ID, 'toggleWayReset', "email");
    }
};

const changeWayReg = (e) => {
    e.stopPropagation()
    let way = getValue(ID, "toggleWayReg");
    if (e.target.id == "regByEmail" && way == "email") {
        setValue(ID, 'toggleWayReg', "phone");
    } else if (e.target.id == "regByMobile" && way == "phone") {
        setValue(ID, 'toggleWayReg', "email");
    }
};

const changeStepReset = (e) => {
    e.stopPropagation();
    let step = getValue(ID, "toggleStepReset");
    step == "1" ? setValue(ID, 'toggleStepReset', "2") : setValue(ID, 'toggleStepReset', "1");
};

const start = function () {
    const showAuth = getValue("modals", "authModalShow");
    const commingSoonModalShow = getValue("modals", "commingSoonModalShow");
    const showReset = getValue("modals", "resetModalShow");
    const showRegistration = getValue("modals", "registrationModalShow");
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")];
    const defAbbr = getValue(ID, "defaultAbbrPhone");
    const defTitle = getValue(ID, "defaultTitlePhone");
    const wayAuth = getValue(ID, "toggleWayAuth");
    const wayReset = getValue(ID, "toggleWayReset");
    const wayReg = getValue(ID, "toggleWayReg");

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
                    wayAuth={wayAuth}
                    changeWayAuth={changeWayAuth}
                />
            }
            {commingSoonModalShow &&
                <ModalComingSoon
                    lang={lang}
                />
            }
            {showReset &&
                <ModalReset
                    lang={lang}
                    changeCode={changeCode}
                    abbr={defAbbr}
                    codeTitle={defTitle}
                    ID={ID}
                    wayReset={wayReset}
                    changeWayReset={changeWayReset}
                    changeStepReset={changeStepReset}
                />
            }
            {showRegistration &&
                <ModalReg
                    lang={lang}
                    changeCode={changeCode}
                    abbr={defAbbr}
                    codeTitle={defTitle}
                    ID={ID}
                    wayReg={wayReg}
                    changeWayReg={changeWayReg}
                />
            }
        </div>
    )


}

const init = function (reload) {
    // console.log("modals init", reload);
    if (!reload) {
        setValue(ID, "showPhoneSelect", false);
        setValue(ID, "resetModalShow", false);
        setValue(ID, "registrationModalShow", false);
        setValue(ID, "defaultAbbrPhone", "ru");
        setValue(ID, "defaultTitlePhone", "7");
        setValue(ID, "toggleWayAuth", "email");
        setValue(ID, "toggleWayReset", "email");
        setValue(ID, "toggleStepReset", "1");
        setValue(ID, "toggleWayReg", "email");
    }

    makeDOM(start(), ID)
    return;
}
export { init }