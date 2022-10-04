import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable,
    getValue,
    initReload,
    sendApi,
    initGo
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { PhoneCode } from '@component/element/PhoneCode.js';
import { If } from '@component/helpers/All.js';
import { allValidation } from '@src/functions.js';



let wayAuth,
    formInputs,
    viewPassword

let elem = Variable.setRef()

const changeInput = function () {
    formInputs[this.dataset.type].value = this.value.trim()
    formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);

    if (!formInputs[this.dataset.type].valid) {
        formInputs[this.dataset.type].error = "Заполните поле " + this.dataset.type;
        this.style = "border-color: rgb(200, 23, 38);";
        formInputs.isValid = false
        initReload("modals")
        return
    } else {
        formInputs[this.dataset.type].error = "";
        this.style = "border-color: rgb(37, 249, 48);"
    }

    let isCheckAll = false

    if (wayAuth == "email") {
        if (formInputs.email.valid === true && formInputs.pass.valid === true) {
            isCheckAll = true
        }
    } else {
        if (formInputs.phone.valid === true && formInputs.pass.valid === true) {
            isCheckAll = true
        }
    }

    if (isCheckAll) {
        formInputs.isValid = true
    } else {
        formInputs.isValid = false
    }

    initReload("modals")
    return;
}

const wayAuthForm = function () {
    if (wayAuth == "email") {
        return (
            <div>
                <div class='reset_by_email_block'>
                    <label for="resetByEmailInput">{Variable.lang.label.email}</label>
                    <If
                        data={formInputs.email.error != ""}
                        dataIf={
                            <div class="error-div" style="display: block">
                                <div class="error-div-variant">{formInputs.email.error}</div>
                            </div>
                        }
                    />
                    <div class="reset_by_email_block_container">
                        <input
                            data-form_type="login"
                            data-dirty="false"
                            data-focusout="focusout"
                            data-keyup="keyupValidate"
                            data-validate_type="email"
                            placeholder={Variable.lang.placeholder.email}
                            id="loginByEmailInput"
                            type="text"
                            data-type="email"
                            value={formInputs.email.value}
                            oninput={changeInput}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                phone
            </div>
        )

    }
}

const sendAuthorization = async function (e) {

    this.classList.add('c-button--animated');
    let data = {
        pass: formInputs['pass'].value,
    };
    if (wayAuth == "email") {
        data.email = formInputs['email'].value
    } else {
        data.phone = formInputs['phone'].value
    }


    let tmpRes = await sendApi.create("userAuth", data);

    if (tmpRes.status === 'ok') {
        Variable.Modals = []
        initGo()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
    }
    return
}


const ModalAuth = function ({ }, reload) {

    if (!reload) {
        Variable.OutHideWindows.push([elem])
        wayAuth = "email"
        viewPassword = false
        formInputs = {
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
            phone: {
                value: "",
                valid: false,
                error: ""
            },
            isValid: false
        }
    }

    return (
        <div class="c-modal c-modal--open" id="ModalLogin">
            <section class="c-modal__dialog" ref={elem}>
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_login}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => { Variable.Modals = [] }}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class={`c-mobileoremail`}>
                        <button
                            data-form_type="login"
                            id="loginByEmail"
                            class={`c-button c-button--toggler ${wayAuth == "email" && "c-button--active"}`}
                            onClick={() => {
                                wayAuth = "email"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.email}
                        </button>
                        <button
                            data-form_type="login"
                            id="loginByMobile"
                            class={`c-button c-button--toggler ${wayAuth == "phone" && "c-button--active"}`}
                            onClick={() => {
                                wayAuth = "phone"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.phone}
                        </button>
                    </div>

                    <form id="loginForm">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            {wayAuthForm()}
                        </div>

                        <div class="container-input">
                            <label for="password">{Variable.lang.label.password}</label>


                            <If
                                data={formInputs.pass.error != ""}
                                dataIf={
                                    <div class="error-div" style="display: block">
                                        <div class="error-div-variant">{formInputs.pass.error}</div>
                                    </div>
                                }
                            />

                            <div class="input-div">
                                <img src={svg["lock"]} class="icon-input" />
                                <input
                                    data-keyup="keyupValidate"
                                    data-form_type="login"
                                    data-dirty="false"
                                    data-focusout="focusout"
                                    data-validate_type="password"
                                    placeholder={Variable.lang.placeholder.password}
                                    id="auth_pass"
                                    type={`${viewPassword ? 'text' : 'password'}`}
                                    data-type="pass"
                                    value={formInputs.pass.value}
                                    oninput={changeInput}
                                />
                                <img
                                    src={svg[`eye${viewPassword ? '-slash' : ''}`]}
                                    class="password_eye"
                                    onClick={() => {
                                        viewPassword = !viewPassword
                                        initReload("modals")
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    <div class="bottom_log-in">
                        <div class="checkbox">
                            <input
                                checked="checked"
                                class="checkbox__input-2"
                                type="checkbox"
                                id="auth_remember"
                            />

                            <label class="checkbox__label-2" for="auth_remember">{Variable.lang.placeholder.rememberMe}</label>
                        </div>
                        <span class="cont_a-link-2" >
                            <a
                                class="a-link"
                                id="forgot_password"
                                onclick={() => { Variable.Modals = [] }}
                            >
                                {Variable.lang.a.forgot_pass}
                            </a>
                        </span>
                    </div>
                    <div class="authAgree">
                        <span>{Variable.lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a></span>
                    </div>

                </div>
                <footer class="c-modal__footer">

                    {formInputs.isValid ?
                        <button
                            class='c-button c-button--gradient2'
                            type="button"
                            onClick={sendAuthorization}
                            data-active="1"
                        >
                            <span class="c-button__text">
                                {Variable.lang.button.login}
                            </span>
                        </button>
                        :
                        <button
                            class='c-button c-button--gradient2 c-button--inactive'
                            type="button"
                            // onClick={(e) => sendAuthorization(e)}
                            data-active="1"
                        >
                            <span class="c-button__text">
                                {Variable.lang.button.login}
                            </span>
                        </button>
                    }
                    <a
                        class="c-button c-button--registration"
                        href=""
                        onclick={() => { Variable.Modals = [] }}
                    >
                        <div class="c-button__wrapper">
                            {Variable.lang.button.registration}
                        </div>
                    </a>
                </footer>
            </section>

        </div>
    )
};


export default ModalAuth;