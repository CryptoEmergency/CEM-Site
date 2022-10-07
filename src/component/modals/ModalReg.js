import {
    jsx,
    jsxFrag,
    Variable,
    sendApi,
    initReload,
    initGo,
    initOne
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { If } from '@component/helpers/All.js';
import { allValidation } from '@src/functions.js';


let wayReg,
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

    if (this.dataset.type == "agreement") {
        formInputs.agreement.value = Boolean(this.checked)
        formInputs.agreement.valid = formInputs.agreement.value
        this.value = formInputs.agreement.value
    } else {
        formInputs[this.dataset.type].value = this.value.trim()
        formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);
    }




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

    if (wayReg == "email") {
        if (formInputs.email.valid === true && formInputs.pass.valid === true && formInputs.agreement.valid === true) {
            isCheckAll = true
        }
    } else {
        if (formInputs.phone.valid === true && formInputs.pass.valid === true && formInputs.agreement.valid === true) {
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

const WayRegForm = function () {
    if (wayReg == "email") {
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
                            placeholder={Variable.lang.placeholder.email}
                            type="text"
                            id="registerByEmailInput"
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
                <div class='reset_by_mobile_block'>
                    <label for="resetByEmailInput">{Variable.lang.label.phone}</label>
                    <If
                        data={formInputs.phone.error}
                        dataIf={
                            <div class="error-div">
                                <div class="error-div-variant">{formInputs.phone.errorText}</div>
                            </div>
                        }
                    />
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

const sendRegistration = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
        return false
    }
    elemButton().classList.add('c-button--animated');
    let data = {
        password: formInputs.pass.value,
        agree: formInputs.agreement.value
    };
    if (wayReg == "email") {
        data.email = formInputs.email.value
    } else {
        data.phone = `+${formInputs['phone'].code}${formInputs['phone'].value}`
        data.co = formInputs['phone'].abbr
    }


    let tmpRes = await sendApi.create("registration", { value: data });

    if (tmpRes.status === 'ok') {
        Variable.DelModals("ModalReg")
        Variable.SetModals({ name: "ModalConfirmCode", data: { wayReg } })
        initReload()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
        elemButton().classList.remove('c-button--animated');
    }
    return
}

const ModalReg = function () {

    initOne(
        () => {
            Variable.OutHideWindows.push([elem, "ModalReg"])
            wayReg = "email"
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
                agreement: {
                    value: false,
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.needAgree
                },
                isValid: false
            }
        }
    )

    return (
        <div class="c-modal c-modal--open" id="ModalReg">
            <section class="c-modal__dialog" ref={elem}>
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_register}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => {
                            Variable.DelModals("ModalReg")
                        }}
                    ></button>
                </header>
                <div id="body_reg-fast" class="c-modal__body">
                    <div class="c-mobileoremail">
                        <button
                            id="regByEmail"
                            class={['c-button c-button--toggler', wayReg == "email" ? 'c-button--active' : null]}
                            onClick={() => {
                                wayReg = "email"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.email}
                        </button>
                        <button
                            id="regByMobile"
                            class={['c-button c-button--toggler', wayReg == "phone" ? 'c-button--active' : null]}
                            onClick={() => {
                                wayReg = "phone"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.phone}
                        </button>
                    </div>
                    <form id="registrationForm" onsubmit={sendRegistration}>
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <WayRegForm />
                        </div>
                        <div class="container-input">
                            <label for="password_reg">{Variable.lang.label.password}</label>
                            <If
                                data={formInputs.pass.error}
                                dataIf={
                                    <div class="error-div">
                                        <div class="error-div-variant">{formInputs.pass.errorText}</div>
                                    </div>
                                }
                            />
                            <div class="input-div">
                                <img src={svg.lock} class="icon-input" />
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
                        <div class="container-checkbox">
                            <div class="checkbox">
                                <If
                                    data={formInputs.agreement.error}
                                    dataIf={
                                        <p class="checkbox_error" style="display: block">{formInputs.agreement.errorText}</p>
                                    }
                                />
                                <input
                                    class="checkbox__input"
                                    type="checkbox"
                                    id="fast_agree"
                                    required="required"
                                    data-type="agreement"
                                    value={formInputs.agreement.value}
                                    onchange={changeInput}
                                />
                                <label class="checkbox__label" for="fast_agree">
                                    {Variable.lang.text.agree}
                                    <span class="cont_a-link">
                                        <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <footer class="c-modal__footer">
                            <button
                                class={['c-button c-button--gradient2', !formInputs.isValid ? 'c-button--inactive' : null]}
                                id="fast_reg"
                                type="button"
                                ref={elemButton}
                                onClick={sendRegistration}>
                                <span class="c-button__text">
                                    {Variable.lang.button.registration}
                                </span>
                            </button>
                        </footer>
                    </form>
                </div>
            </section >
        </div >
    )
};

export default ModalReg;