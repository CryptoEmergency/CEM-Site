import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { If } from '@component/helpers/All.js';
import { allValidation } from '@src/functions.js';

let wayAuth,
    formInputs,
    viewPassword,
    listCodes

let elem = Variable.setRef()
let elemButton = Variable.setRef()
let elemCountry = Variable.setRef()

const changeSearch = (e) => {
    let inputValue = e.target.value.toLowerCase();
    listCodes = Variable.phoneCodes.filter((item) => item.text.toLowerCase().includes(inputValue) || `+${item.code}`.toLowerCase().includes(inputValue))
    initReload("modals");
}

const changeInput = function () {
    formInputs[this.dataset.type].value = this.value.trim()
    formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);

    if (!formInputs[this.dataset.type].valid) {
        formInputs[this.dataset.type].error = true;
        this.style = "border-color: rgb(200, 23, 38);";
        formInputs.isValid = false
        initReload("modals")
        return
    } else {
        formInputs[this.dataset.type].error = false;
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

const WayAuthForm = function () {
    if (wayAuth == "email") {
        return (
            <div>

                <div class='reset_by_email_block'>
                    <label for="resetByEmailInput">{Variable.lang.label.email}</label>
                    <div class="error-div">
                        <If
                            data={formInputs.email.error}
                            dataIf={
                                <div class="error-div-variant">{formInputs.email.errorText}</div>
                            }
                        />
                    </div>
                    <div class="reset_by_email_block_container">
                        <input
                            placeholder={Variable.lang.placeholder.email}
                            type="text"
                            data-type="email"
                            // value={formInputs.email.value}
                            oninput={changeInput}
                        />
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div class='reset_by_mobile_block'>
                    <label for="resetByEmailInput">{Variable.lang.label.phone}</label>
                    <div class="error-div">
                        <If
                            data={formInputs.phone.error}
                            dataIf={

                                <div class="error-div-variant">{formInputs.phone.errorText}</div>

                            }
                        />
                    </div>

                    <div class="reset_by_mobile_block_container c-phonecode">

                        <div class="country-phone2">
                            <div class="country-phone-selector2">
                                <div
                                    class="country-phone-selected2"
                                    onClick={() => {
                                        elemCountry().hidden = !elemCountry().hidden
                                        listCodes = Variable.phoneCodes
                                    }}
                                >
                                    <span>
                                        +{formInputs.phone.code}
                                        <img src={images.blank} class={`flag flag-${formInputs.phone.abbr}`} />
                                    </span>
                                </div>
                                <div
                                    class="country-phone-options2"
                                    hidden={true}
                                    ref={elemCountry}
                                >
                                    <input
                                        type="text"
                                        class="country-phone-search2"
                                        value=""
                                        oninput={changeSearch}
                                    />
                                    <label class="country-phone-search-label2">{Variable.lang.h.modal_changeCountry}</label>
                                    <ul>
                                        {
                                            listCodes.map(function (item) {
                                                return (
                                                    <li
                                                        data-phone={item.code}
                                                        data-co={item.abbr}
                                                        class="country-phone-option2"
                                                        onClick={() => {
                                                            formInputs.phone.code = item.code
                                                            formInputs.phone.abbr = item.abbr
                                                            elemCountry().hidden = true
                                                            initReload("modals")
                                                        }}>
                                                        <span>
                                                            +{item.code}
                                                            <img src="/assets/image/blank.gif" class={`flag flag-${item.abbr}`} />
                                                        </span>
                                                        {item.text}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <input
                            class="phoneNubmerInput2"
                            type="text"
                            autofocus="true"
                            placeholder="9990000000"
                            data-type="phone"
                            value={formInputs.phone.value}
                            oninput={changeInput}
                        />
                    </div>
                </div>
            </div>
        )

    }
}

const sendAuthorization = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
        return false
    }
    elemButton().classList.add('c-button--animated');
    let data = {
        pass: formInputs['pass'].value,
    };
    if (wayAuth == "email") {
        data.email = formInputs['email'].value
    } else {
        data.phone = `+${formInputs['phone'].code}${formInputs['phone'].value}`
        data.co = formInputs['phone'].abbr
    }

    let tmpRes = await sendApi.create("userAuth", data);
    if (tmpRes.status === 'ok') {
        Variable.DelModals("ModalAuth")
        initReload()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
        elemButton().classList.remove('c-button--animated');
    }
    return
}

const ModalAuth = function () {

    initOne(
        () => {
            Variable.OutHideWindows.push([elem, "ModalAuth"])
            wayAuth = "email"
            listCodes = Variable.phoneCodes
            viewPassword = false
            formInputs = {
                email: {
                    value: "",
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.wrong_email
                },
                pass: {
                    value: "",
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.password5
                },
                phone: {
                    value: "",
                    code: 7,
                    abbr: "ru",
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.wrong_phone
                },
                isValid: false
            }
        }
    )


    return (
        <div class="c-modal c-modal--open" id="ModalAuth">
            <section class="c-modal__dialog" ref={elem}>
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_login}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => {
                            Variable.DelModals("ModalAuth")
                        }}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class="c-mobileoremail">
                        <button
                            class={`c-button c-button--toggler ${wayAuth == "email" && "c-button--active"}`}
                            onClick={() => {
                                wayAuth = "email"
                                initReload("modals")
                            }}>
                            {Variable.lang.button.email}
                        </button>
                        <button
                            class={`c-button c-button--toggler ${wayAuth == "phone" && "c-button--active"}`}
                            onClick={() => {
                                wayAuth = "phone"
                                initReload("modals")
                            }}>
                            {Variable.lang.button.phone}
                        </button>
                    </div>

                    <form onsubmit={sendAuthorization}>
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <WayAuthForm />
                        </div>
                        <div class="container-input">
                            <label for="password">{Variable.lang.label.password}</label>
                            <div class="error-div">
                                <If
                                    data={formInputs.pass.error}
                                    dataIf={

                                        <div class="error-div-variant">{formInputs.pass.errorText}</div>

                                    }
                                />
                            </div>

                            <div class="input-div">
                                <img src={svg["lock"]} class="icon-input" />
                                <input
                                    id="fast_pass"
                                    placeholder={Variable.lang.placeholder.password}
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
                            />
                            <label class="checkbox__label-2" for="auth_remember">{Variable.lang.placeholder.rememberMe}</label>
                        </div>
                        {/* <span class="cont_a-link-2" >
                            <a
                                class="a-link"
                                id="forgot_password"
                                onclick={() => { Variable.Modals = [] }}
                            >
                                {Variable.lang.a.forgot_pass}
                            </a>
                        </span> */}
                    </div>
                    <div class="authAgree">
                        <span>{Variable.lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a></span>
                    </div>
                </div>
                <footer class="c-modal__footer">
                    <button
                        class={`c-button c-button--gradient2 ${!formInputs.isValid && "c-button--inactive"}`}
                        type="button"
                        ref={elemButton}
                        onClick={sendAuthorization}>
                        <span class="c-button__text">
                            {Variable.lang.button.login}
                        </span>
                    </button>
                    <a
                        class="c-button c-button--registration"
                        href=""
                        onclick={() => {
                            Variable.DelModals("ModalAuth")
                            Variable.SetModals({ name: "ModalReg", data: {} })
                        }}
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