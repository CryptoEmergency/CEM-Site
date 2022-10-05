import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable,
    getValue,
    sendApi,
    initReload,
    initGo
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { PhoneCode } from '@component/element/PhoneCode.js';
import { If } from '@component/helpers/All.js';
import { allValidation } from '@src/functions.js';


let wayReg,
    formInputs,
    viewPassword



const changeInput = function () {

    if (this.dataset.type == "agreement") {
        //formInputs.agreement.value = this.checked
        formInputs.agreement.value = Boolean(this.checked)
        formInputs.agreement.valid = formInputs.agreement.value
        this.value = formInputs.agreement.value
    } else {
        formInputs[this.dataset.type].value = this.value.trim()
        formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);
    }




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

const wayRegForm = function () {
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
                            data-form_type="registration"
                            data-dirty="false"
                            data-focusout="focusout"
                            data-keyup="keyupValidate"
                            data-validate_type="email"
                            placeholder={Variable.lang.placeholder.email}
                            id="registerByEmailInput"
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

const sendRegistration = async function (e) {

    this.classList.add('c-button--animated');
    let data = {
        password: formInputs.pass.value,
        agree: formInputs.agreement.value
    };
    if (wayReg == "email") {
        data.email = formInputs.email.value
    } else {
        data.phone = formInputs.phone.value
    }


    let tmpRes = await sendApi.create("registration", { value: data });

    if (tmpRes.status === 'ok') {
        Variable.Modals = []
        initGo()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
    }
    return
}

const ModalReg = function (data, reload) {

    if (!reload) {
        wayReg = "email"

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
            agreement: {
                value: true,
                valid: false,
                error: ""
            },
            isValid: false
        }
    }

    return (
        <div class="c-modal c-modal--open" id="ModalReg">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_register}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => { Variable.Modals = [] }}
                    ></button>
                </header>

                <div id="body_reg-fast" class="c-modal__body">
                    <div class="c-mobileoremail">
                        <button
                            data-form_type="registration"
                            id="regByEmail"
                            class={`c-button c-button--toggler ${wayReg == "email" && "c-button--active"}`}
                            onClick={() => {
                                wayReg = "email"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.email}
                        </button>
                        {/* <button
                            data-form_type="registration"
                            id="regByMobile"
                            class={`c-button c-button--toggler ${wayReg == "phone" && "c-button--active"}`}
                            onClick={() => {
                                wayReg = "phone"
                                initReload("modals")
                            }}
                        >
                            {Variable.lang.button.phone}
                        </button> */}
                    </div>
                    <form id="registrationForm" data-button_id="fast_reg">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            {wayRegForm()}

                        </div>

                        <div class="container-input">
                            <label for="password_reg">{Variable.lang.label.password}</label>

                            <If
                                data={formInputs.pass.error != ""}
                                dataIf={
                                    <div class="error-div" style="display: block">
                                        <div class="error-div-variant">{formInputs.pass.error}</div>
                                    </div>
                                }
                            />

                            <div class="input-div">
                                <img src={svg.lock} class="icon-input" />
                                <input
                                    data-form_type="registration"
                                    data-validate_type="password"
                                    required="required"
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
                                    data={formInputs.agreement.error != ""}
                                    dataIf={
                                        <p class="checkbox_error" style="display: block">{Variable.lang.error_div.needAgree}</p>
                                    }
                                />

                                <input
                                    data-form_type="registration"
                                    class="checkbox__input"
                                    type="checkbox"
                                    id="fast_agree"
                                    data-action="clearCheckboxError"
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
                            {/* <button
                                class={`c-button c-button--primary2 ${formInputs.isValid ? "" : "c-button--inactive"}`}
                                type="button"
                                id="fast_reg"
                                onClick={sendRegistration}
                            >
                                <span class="c-button__wrapper">
                                    {Variable.lang.button.registration}
                                </span>
                            </button> */}
                            <button
                                class={`c-button c-button--primary2 ${formInputs.isValid ? "" : "c-button--inactive"}`}
                                type="button"
                                id="fast_reg"
                                style="cursor: not-allowed"
                            >
                                <span class="c-button__wrapper">
                                    Registration is temporarily unavailable. Updating now...
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