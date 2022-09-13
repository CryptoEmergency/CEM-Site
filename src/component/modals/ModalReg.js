import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue,
    sendApi
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { PhoneCode } from '@component/element/PhoneCode.js';
import { If } from '@component/helpers/All.js';

const showModalReg = function (e) {
    e.stopPropagation()
    setValue("modals", "registrationModalShow", !getValue("modals", "registrationModalShow"))
};

const ModalReg = function ({
    lang,
    changeCode,
    ID,
    abbr,
    codeTitle,
    wayReg,
    changeWayReg,
    toggleViewPassword,

    formInputs,
    changeInput,
    regFormSent,

    sendRegistration
}) {
    // console.log("ModalReg", formInputs);
    const viewPassword = getValue(ID, "viewPassword");

    return (
        <div class="c-modal c-modal--open" id="ModalReg">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{lang.h.modal_register}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalReg}
                    ></button>
                </header>
                <div id="body_reg-fast" class="c-modal__body">
                    <div class="c-mobileoremail">
                        <button
                            data-form_type="registration"
                            id="regByEmail"
                            class={`c-button c-button--toggler ${wayReg == "email" && "c-button--active"}`}
                            onClick={(e) => { changeWayReg(e) }}
                        >
                            {lang.button.email}
                        </button>
                        <button
                            data-form_type="registration"
                            id="regByMobile"
                            class={`c-button c-button--toggler ${wayReg == "phone" && "c-button--active"}`}
                            onClick={(e) => { changeWayReg(e) }}
                        >
                            {lang.button.phone}
                        </button>
                    </div>
                    <form id="registrationForm" data-button_id="fast_reg">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <div>
                                {wayReg == "email" &&
                                    <div
                                        class={`reset_by_email_block ${wayReg == "phone" && "dn"}`}
                                    >
                                        <label for="registerByEmailInput">{lang.label.email}</label>

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
                                                placeholder={lang.placeholder.email}
                                                id="registerByEmailInput"
                                                type="text"
                                                data-type="email"
                                                value={formInputs.email.value}
                                                oninput={changeInput}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div>
                                {wayReg == "phone" &&
                                    <div class={`reset_by_mobile_block ${wayReg == "email" && "dn"}`}>
                                        <label for="registerByMobileInput">{lang.label.phone}</label>

                                        <If
                                            data={formInputs.phone.error != ""}
                                            dataIf={
                                                <div class="error-div" style="display: block">
                                                    <div class="error-div-variant">{formInputs.phone.error}</div>
                                                </div>
                                            }
                                        />

                                        <div class="reset_by_mobile_block_container c-phonecode">

                                            <PhoneCode lang={lang} changeCode={changeCode} abbr={abbr} codeTitle={codeTitle} ID={ID} />

                                            <input
                                                data-form_type="registration"
                                                data-dirty="false"
                                                data-focusout="focusout"
                                                data-keyup="keyupValidate"
                                                data-validate_type="phone"
                                                class="phoneNubmerInput"
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                autofocus="true"
                                                placeholder="9990000000"
                                                data-co={abbr}
                                                data-type="phone"
                                                value={formInputs.phone.value}
                                                oninput={changeInput}
                                            />

                                            <input id="phone_prefix" type="hidden" name="__phone_prefix" value={codeTitle} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div class="container-input">
                            <label for="password_reg">{lang.label.password}</label>

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
                                    placeholder={lang.placeholder.password}
                                    type={`${viewPassword ? 'text' : 'password'}`}
                                    data-type="pass"
                                    value={formInputs.pass.value}
                                    oninput={changeInput}
                                />
                                <img src={svg[`eye${viewPassword ? '-slash' : ''}`]} class="password_eye" onClick={toggleViewPassword} />
                            </div>
                        </div>
                        <div class="container-checkbox">
                            <div class="error-div-agree" id="fast_agree-error"></div>
                            <div class="checkbox">

                                <If
                                    data={formInputs.agreement.error != ""}
                                    dataIf={
                                        <p class="checkbox_error" style="display: block">{lang.error_div.needAgree}</p>
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
                                    {lang.text.agree}
                                    <span class="cont_a-link">
                                        <a target="_blank" class="a-link" href="/terms-of-service/">{lang.a.agree}</a>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <footer class="c-modal__footer">
                    <button
                        class={`c-button c-button--primary2 ${getValue(ID, "isValidReg") ? "" : "c-button--inactive"}`}
                        type="button"
                        id="fast_reg"
                        onClick={() => { sendRegistration() }}
                    >
                        <span class="c-button__wrapper">
                            {lang.button.registration}
                        </span>
                    </button>
                </footer>
            </section >
        </div >
    )
};


export { ModalReg };