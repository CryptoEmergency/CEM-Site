import {
    jsx,
    jsxFrag,
    getValue,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    sendApi
} from '@betarost/cemjs';
import { allValidation } from '@src/functions.js';
import { ModalAuth } from '@component/modals/ModalAuth.js';
import { ModalComingSoon } from '@component/modals/ModalComingSoon.js';
import { ModalReset } from '@component/modals/ModalReset.js';
import { ModalReg } from '@component/modals/ModalReg.js';
import { ModalConfirmation } from '@component/modals/ModalConfirmation.js';
let formInputsReg, formInputsRegEmail, formInputsRegPhone = {};

const ID = "modals";
let regFormSent = false;

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
    // setValue(ID, "isValidReg", false);
    if (e.target.id == "regByEmail" && way == "phone") {
        setValue(ID, 'toggleWayReg', "email");
    } else if (e.target.id == "regByMobile" && way == "email") {
        setValue(ID, 'toggleWayReg', "phone");
    }
};

const changeStepReset = (e) => {
    e.stopPropagation();
    let step = getValue(ID, "toggleStepReset");
    step == "1" ? setValue(ID, 'toggleStepReset', "2") : setValue(ID, 'toggleStepReset', "1");
};

const toggleViewPassword = (e) => {
    e.stopPropagation();
    setValue(ID, "viewPassword", !getValue(ID, "viewPassword"));
};

const sendRegistration = async function () {
    let formInputs = formInputsReg
    let value = {};
    if (formInputs.email) {
        const email = formInputs.email.value;
        value = {
            email
        }
    } else if (formInputs.phone) {
        const phone = formInputs.phone.value;
        value = {
            phone
        }
    }
    const password = formInputs.pass.value;
    const agree = formInputs.agreement.value;
    value.password = password;
    value.agree = agree;
    console.log('=5493bc=', value)
    const data = await sendApi.create("registration", { value: value });
    console.log(data)
    if (data.status === 'ok') {
        regFormSent = true;
        // setValue("modals", "registrationModalShow", !getValue("modals", "registrationModalShow"))
        setValue("modals", "confirmationModalShow", !getValue("modals", "confirmationModalShow"));
    }
    init(true);

};

const changeInputReg = (e) => {
    setValue(ID, "isValidReg", true);
    let inputValue;
    let inputType = e.currentTarget.dataset.type;
    inputValue = e.currentTarget.dataset.type == "agreement" ? !formInputsReg[inputType].value : e.target.value.trim();
    formInputsReg[inputType].value = inputValue;

    formInputsReg[inputType].valid = allValidation(inputValue, inputType);
    if (!formInputsReg[inputType].valid) {

        formInputsReg[inputType].error = "Заполните поле " + inputType;
        setValue(ID, "isValidReg", false);
        init(true);
        return
    } else {
        formInputsReg[inputType].error = "";
    }
    let isCheckAll = Object.keys(formInputsReg).filter((key) => {
        if (!formInputsReg[key].valid) {
            return true
        }
    });
    if (isCheckAll.length === 0) {
        setValue(ID, "isValidReg", true);
        return
    } else {
        setValue(ID, "isValidReg", false);
        init(true);
        return
    }

}

const start = function () {
    const showAuth = getValue("modals", "authModalShow");
    const commingSoonModalShow = getValue("modals", "commingSoonModalShow");
    const showReset = getValue("modals", "resetModalShow");
    const showRegistration = getValue("modals", "registrationModalShow");
    const showConfirmation = getValue("modals", "confirmationModalShow");
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")];
    const defAbbr = getValue(ID, "defaultAbbrPhone");
    const defTitle = getValue(ID, "defaultTitlePhone");
    const wayAuth = getValue(ID, "toggleWayAuth");
    const wayReset = getValue(ID, "toggleWayReset");
    const wayReg = getValue(ID, "toggleWayReg");
    formInputsReg = wayReg == "email" ? formInputsRegEmail : formInputsRegPhone;

    return (
        <div>
            <div class={`c-backdrop ${(showAuth || commingSoonModalShow || showReset || showRegistration) && "c-backdrop--show"}`}></div>
            {showAuth &&
                <ModalAuth
                    lang={lang}
                    changeCode={changeCode}
                    abbr={defAbbr}
                    codeTitle={defTitle}
                    ID={ID}
                    wayAuth={wayAuth}
                    changeWayAuth={changeWayAuth}
                    toggleViewPassword={toggleViewPassword}
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
                    toggleViewPassword={toggleViewPassword}
                    changeInput={changeInputReg}
                    formInputs={formInputsReg}
                    regFormSent={regFormSent}
                    sendRegistration={sendRegistration}
                />
            }
            {showConfirmation &&
                <ModalConfirmation
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
        setValue(ID, "resetModalShow", false);
        setValue(ID, "registrationModalShow", false);
        setValue(ID, "confirmationModalShow", false);
        setValue(ID, "defaultAbbrPhone", "ru");
        setValue(ID, "defaultTitlePhone", "7");
        setValue(ID, "toggleWayAuth", "email");
        setValue(ID, "toggleWayReset", "email");
        setValue(ID, "toggleStepReset", "1");
        setValue(ID, "toggleWayReg", "email");
        setValue(ID, "viewPassword", false);

        setValue(ID, "isValidReg", false);
        formInputsRegEmail = {
            email: {
                value: "",
                valid: false,
                error: ""
            },
            pass: {
                value: "",
                valid: false,
                error: ""
            },
            agreement: {
                value: false,
                valid: false,
                error: ""
            }
        };
        formInputsRegPhone = {
            phone: {
                value: "",
                valid: false,
                error: ""
            },
            pass: {
                value: "",
                valid: false,
                error: ""
            },
            agreement: {
                value: false,
                valid: false,
                error: ""
            }
        };
        regFormSent = false
    }

    makeDOM(start(), ID)
    return;
}
export { init }