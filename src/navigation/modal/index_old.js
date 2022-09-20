import {
    jsx,
    jsxFrag,
    getValue,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    sendApi,
    Variable,
} from '@betarost/cemjs';
import { allValidation } from '@src/functions.js';
import { ModalAuth } from '@component/modals/ModalAuth.js';
import { ModalComingSoon } from '@component/modals/ModalComingSoon.js';
import { ModalReset } from '@component/modals/ModalReset.js';
import { ModalReg } from '@component/modals/ModalReg.js';
import { ModalConfirmation } from '@component/modals/ModalConfirmation.js';
import { ModalAlarm } from '@component/modals/ModalAlarm.js';
let formInputsReg, formInputsRegEmail, formInputsRegPhone = {};
let formInputsAuth, formInputsAuthEmail, formInputsAuthPhone = {};

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
    console.log('=bd32d1=', getValue(ID, "defaultTitlePhone"))
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
        const prefix = getValue(ID, "defaultTitlePhone");
        const phone = `+${prefix}${formInputs.phone.value}`;
        value = {
            phone
        }
    }
    const password = formInputs.pass.value;
    const agree = formInputs.agreement.value;
    value.password = password;
    value.agree = agree;
    const data = await sendApi.create("registration", { value: value });
    console.log(data)
    if (data.status === 'ok') {
        regFormSent = true;
        if (getValue(ID, "toggleWayReg") == "email") {
            document.getElementById('registerByEmailInput').value = '';
        } else {
            document.getElementById('phone_prefix').value = '';
            document.getElementById('phone').value = '';
        }
        document.getElementById('fast_pass').value = '';

        setValue(ID, "isValidReg", false);
        setValue(ID, "registrationModalShow", !getValue("modals", "registrationModalShow"));
        setValue(ID, "confirmationModalShow", !getValue("modals", "confirmationModalShow"));
        codeTimerConfirm()
    } else if (data.status === 'no') {
        if (data.error === 'existing_phone' || data.error === 'existing_email') {
            setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
            setTimeout(() => {
                setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
            }, 3000)
        }
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
        e.currentTarget.style = "border-color: rgb(200, 23, 38);";
        setValue(ID, "isValidReg", false);
        init(true);
        return
    } else {
        formInputsReg[inputType].error = "";
        e.currentTarget.style = "border-color: rgb(37, 249, 48);"
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

};

const codeTimerConfirm = function () {
    const timer = document.querySelector('.confirmation_timer');
    const block = document.querySelector('.confirmation_timer_block');
    const success = document.querySelector('.confirmation_timer_success');
    timer.innerText = '0:20'
    const timerConfirm = setInterval(function () {
        if (timer.innerText.slice(2, 4).length == '2' && timer.innerText.slice(2, 4) != 10 && timer.innerText[2] != 0) {
            timer.innerText = '0:' + (timer.innerText.slice(2, 4) - 1)
        } else if ((timer.innerText.slice(2, 4).length == '1' || timer.innerText.slice(2, 4) == 10 || timer.innerText[2] == 0) && timer.innerText.slice(2, 4) != '00') {
            timer.innerText = '0:0' + (timer.innerText.slice(2, 4) - 1)
        } else if (timer.innerText.slice(2, 4) == '00') {
            block.style = 'display: none';
            success.style = 'display: flex';
            clearInterval(timerConfirm)
        }
    }, 1000)
};

const confirmationTimer = async function (target) {
    const block = document.querySelector('.confirmation_timer_block');
    const success = document.querySelector('.confirmation_timer_success');

    success.style = 'display: none';
    block.style = 'display: flex';
    codeTimerConfirm()
    let data = { newCode: true };
    if (getValue(ID, "toggleWayReg") == "phone") {
        data.phone = true
    } else {
        data.email = true
    }
    console.log('=4aa7e4=', data)
    let tmpRes = await sendApi.create("confirm", { value: data });
    console.log('=c4f3e6=', tmpRes)
    if (tmpRes.error != null) {
        setValue(ID, "errorText", tmpRes.error);
        setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        setTimeout(() => {
            setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        }, 3000)
        return
    }
}

const confirmAccount = async function (target) {
    let data = {
    };
    if (getValue(ID, "toggleWayReg") == "email") {
        data.code = document.getElementById("confirmationByEmailInput").value
        data.email = true
    }
    if (getValue(ID, "toggleWayReg") == "phone") {
        data.code = document.getElementById("confirmationByMobileInput").value
        data.phone = true
    }
    // console.log('=d89725=', data)
    let tmpRes = await sendApi.create("confirm", { value: data });
    // console.log('=206602=', tmpRes)
    if (tmpRes.error != null) {
        setValue(ID, "errorText", tmpRes.error);
        setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        setTimeout(() => {
            setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        }, 3000)
        return
    } else {
        setValue(ID, "confirmationModalShow", !getValue(ID, "confirmationModalShow"));
    }
}

const sendAuthorization = async function (e) {
    const lang = getVariable('languages')[getStorage('lang')];

    e.currentTarget.classList.add('c-button--animated');
    // e.currentTarget.dataset.active = "0";
    let pass = document.getElementById("auth_pass").value;
    let data = {
        pass: pass,
    };
    if (getValue(ID, "toggleWayAuth") == "email") {
        data.email = document.getElementById('loginByEmailInput').value;
    } else {
        data.phone = `+${document.getElementById('phone_prefix2').value}${document.getElementById('phone2').value}`;
        data.co = document.querySelector('.phoneNubmerInput2').getAttribute('data-co');
    }
    // console.log('=259705=', data)
    let tmpRes = await sendApi.create("userAuth", data);
    console.log('=77dcfd=', tmpRes);

    if (tmpRes.status === 'ok') {
        if (getValue(ID, "toggleWayAuth") == "email") {
            document.getElementById('loginByEmailInput').value = '';
        } else {
            document.getElementById('phone_prefix2').value = '';
            document.getElementById('phone2').value = '';
        }
        document.getElementById('auth_pass').value = '';

        setValue(ID, "isValidAuth", false);
        setValue(ID, "authModalShow", !getValue("modals", "authModalShow"));

    } else if (tmpRes.status === 'no') {
        if (tmpRes.error === 'existing_phone' || tmpRes.error === 'existing_email') {
            setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
            setTimeout(() => {
                setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
            }, 3000)
        } else if (tmpRes.error === 'noAuth') {
            setValue(ID, "errorText", lang.error_div.noAuth);
        }
        setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        setTimeout(() => {
            setValue(ID, "alarmModalShow", !getValue(ID, "alarmModalShow"));
        }, 3000)
    }
    // $(target).addClass('animated_button')
    // $(target).attr('data-active', '0')
    // let pass = $("#auth_pass").val()
    // let data = getSendData("userAuth", { pass: pass })
    // let typeReg = "email";
    // if (!($('#loginByEmailInput')[0].parentNode.parentNode.classList.length == 2 && $('#loginByEmailInput')[0].parentNode.parentNode.classList[1] == 'dn')) {
    //     data.data.email = $("#loginByEmailInput").val()
    // } else if ($('#loginByEmailInput')[0].parentNode.parentNode.classList.length == 2 && $('#loginByEmailInput')[0].parentNode.parentNode.classList[1] == 'dn') {
    //     typeReg = "phone"
    //     data.data.phone = '+' + $("#phone_prefix2").val() + $("#phone2").val()
    //     data.data.co = $('.phoneNubmerInput2').attr('data-co')
    // }

    // let tmpRes = await SendData(data)
    // let res = await makeData({ res: tmpRes, one: true })
    // if (Object.keys(res).length == 0) {
    //     // пустой результат значит ошибка и т.д.
    //     $(target).removeClass('animated_button')
    //     $(target).attr('data-active', '1')
    //     return;
    // }
    // if (typeReg == "email" && res.confirm.email === false) {
    //     $('#ModalLogin').modal('hide')
    //     await makeModal("modalConfirmation")
    //     if ($('#loginByEmailInput')[0].parentNode.parentNode.classList.length == 2 && $('#loginByEmailInput')[0].parentNode.parentNode.classList[1] == 'dn') {
    //         $('.reset_by_email_block').toggleClass('dn')
    //         $('.reset_by_mobile_block').toggleClass('dn')
    //     }
    //     // phonecode()
    //     $('#modalConfirmation').modal('show')
    //     codeTimerConfirm()
    // } else if (typeReg == "phone" && res.confirm.phone === false) {
    //     $('#ModalLogin').modal('hide')
    //     await makeModal("modalConfirmation")
    //     if ($('#loginByEmailInput')[0].parentNode.parentNode.classList.length == 2 && $('#loginByEmailInput')[0].parentNode.parentNode.classList[1] == 'dn') {
    //         $('.reset_by_email_block').toggleClass('dn')
    //         $('.reset_by_mobile_block').toggleClass('dn')
    //     }
    //     phonecode()
    //     $('#modalConfirmation').modal('show')
    //     codeTimerConfirm()
    // } else {
    //     //   makeHeader(true)
    //     //   makeModal("listLanguage")
    //     //   makeModal("modalSupport")
    //     //   makeModal("ModalLogin")
    //     //   makeModal("Ask")
    //     //   makeModal("ModalMobileMainSettings")
    //     //   makeModal("ModalMobileSettings")
    // }
    // return;
}

const changeInputAuth = (e) => {
    setValue(ID, "isValidAuth", true);
    let inputValue;
    let inputType = e.currentTarget.dataset.type;
    inputValue = e.currentTarget.dataset.type == "agreement" ? !formInputsAuth[inputType].value : e.target.value.trim();
    formInputsAuth[inputType].value = inputValue;

    formInputsAuth[inputType].valid = allValidation(inputValue, inputType);
    if (!formInputsAuth[inputType].valid) {
        console.log("!valid");
        formInputsAuth[inputType].error = "Заполните поле " + inputType;
        e.currentTarget.style = "border-color: rgb(200, 23, 38);";
        setValue(ID, "isValidAuth", false);
        init(true);
        return
    } else {
        formInputsAuth[inputType].error = "";
        e.currentTarget.style = "border-color: rgb(37, 249, 48);"
    }
    let isCheckAll = Object.keys(formInputsAuth).filter((key) => {
        if (!formInputsAuth[key].valid) {
            return true
        }
    });
    console.log('=d0dace=', formInputsAuth)
    if (isCheckAll.length === 0) {
        setValue(ID, "isValidAuth", true);
        return
    } else {
        setValue(ID, "isValidAuth", false);
        init(true);
        return
    }

};

const start = function () {
    const showAuth = Variable.authModalShow;//getValue("modals", "authModalShow");
    const commingSoonModalShow = getValue("modals", "commingSoonModalShow");
    const showReset = getValue("modals", "resetModalShow");
    const showRegistration = getValue("modals", "registrationModalShow");
    const showConfirmation = getValue("modals", "confirmationModalShow");
    const showAlarm = getValue("modals", "alarmModalShow");
    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")];
    const defAbbr = getValue(ID, "defaultAbbrPhone");
    const defTitle = getValue(ID, "defaultTitlePhone");
    const wayAuth = getValue(ID, "toggleWayAuth");
    const wayReset = getValue(ID, "toggleWayReset");
    const wayReg = getValue(ID, "toggleWayReg");
    formInputsReg = wayReg == "email" ? formInputsRegEmail : formInputsRegPhone;
    formInputsAuth = wayAuth == "email" ? formInputsAuthEmail : formInputsAuthPhone;
    const messageError = getValue(ID, "errorText");

    return (
        <div>
            <div class={`c-backdrop ${(showAuth || commingSoonModalShow || showReset || showRegistration || showConfirmation) && "c-backdrop--show"}`}></div>
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
                    sendAuthorization={sendAuthorization}
                    changeInput={changeInputAuth}
                    formInputs={formInputsAuth}
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
                    wayReg={wayReg}
                    confirmationTimer={confirmationTimer}
                    confirmAccount={confirmAccount}
                />
            }
            {showAlarm &&
                <ModalAlarm
                    lang={lang}
                    wayReg={wayReg}
                    errorText={messageError}
                />
            }
        </div>
    )


}

const mainModal = function (reload) {
    // init(
    //     () => {
    //         Variable.authModalShow = false;
    //     },
    //     () => {

    //         if (Variable.authModalShow) {
    //             return (
    //                 // <If
    //                 //     data={getStorage("auth")}
    //                 //     dataIf={<HeaderAuth />}
    //                 // />
    //                 <ModalAuth />
    //             )
    //         } else {
    //             return (
    //                 <></>
    //             )
    //         }
    //     }, "modals")
    // console.log("modals init", reload);
    if (!reload) {
        setValue(ID, "showPhoneSelect", false);
        setValue(ID, "resetModalShow", false);
        setValue(ID, "registrationModalShow", false);
        setValue(ID, "confirmationModalShow", false);
        setValue(ID, "alarmModalShow", false);
        setValue(ID, "defaultAbbrPhone", "ru");
        setValue(ID, "defaultTitlePhone", "7");
        setValue(ID, "toggleWayAuth", "email");
        setValue(ID, "toggleWayReset", "email");
        setValue(ID, "toggleStepReset", "1");
        setValue(ID, "toggleWayReg", "email");
        setValue(ID, "viewPassword", false);
        setValue(ID, "isValidReg", false);
        setValue(ID, "isValidAuth", false);
        setValue(ID, "errorText", "");
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
        regFormSent = false;
        formInputsAuthEmail = {
            email: {
                value: "",
                valid: false,
                error: ""
            },
            pass: {
                value: "",
                valid: false,
                error: ""
            }
        };
        formInputsAuthPhone = {
            phone: {
                value: "",
                valid: false,
                error: ""
            },
            pass: {
                value: "",
                valid: false,
                error: ""
            }
        };
    }

    makeDOM(start(), ID)
    return;
}
export { mainModal }