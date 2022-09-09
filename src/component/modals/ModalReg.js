import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { PhoneCode } from '@component/element/PhoneCode.js';

const showModalReg = function (e) {
    e.stopPropagation()
    setValue("modals", "registrationModalShow", !getValue("modals", "registrationModalShow"))
};

const ModalReg = function ({ lang, changeCode, ID, abbr, codeTitle, wayReg, changeWayReg }) {
    // console.log("ModalReg");

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
                <div class="c-modal__body">
                    <div class="mobile_or_email_toggle">
                        <button
                            data-form_type="registration"
                            id="regByEmail"
                            class={`reset_password_button ${wayReg == "email" && "active"}`}
                            onClick={(e) => { changeWayReg(e) }}
                        >
                            {lang.button.email}
                        </button>
                        <button
                            data-form_type="registration"
                            id="regByMobile"
                            class={`reset_password_button ${wayReg == "phone" && "active"}`}
                            onClick={(e) => { changeWayReg(e) }}
                        >
                            {lang.button.phone}
                        </button>
                    </div>
                    <form id="registrationForm" data-button_id="fast_reg">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <div
                                class={`reset_by_email_block ${wayReg == "phone" && "dn"}`}
                            >
                                <label for="registerByEmailInput">{lang.label.email}</label>
                                <div class="error-div">{lang.error_div.wrong_email}</div>
                                <div class="reset_by_email_block_container">
                                    <input data-form_type="registration" data-dirty="false" data-focusout="focusout" data-keyup="keyupValidate" data-validate_type="email" placeholder={lang.placeholder.email} id="registerByEmailInput" type="text" />
                                </div>
                            </div>
                            <div class={`reset_by_mobile_block ${wayReg == "email" && "dn"}`}>
                                <label for="registerByMobileInput">{lang.label.phone}</label>
                                <div class="error-div">{lang.error_div.wrong_phone}</div>
                                <div class="reset_by_mobile_block_container">
                                    <input data-form_type="registration" data-dirty="false" data-focusout="focusout" data-keyup="keyupValidate" data-validate_type="phone" class="phoneNubmerInput" type="text" id="phone" name="phone" autofocus="true" placeholder="9990000000" data-co="ru" />
                                </div>
                            </div>
                        </div>
                        <div class="container-input">
                            <label for="password_reg">{lang.label.password}</label>
                            <div class="error-div">
                                <div class="error-div-variant">{lang.error_div.not_empty_input}</div>
                                <div class="error-div-variant">{lang.error_div.password}</div>
                                <div class="error-div-variant">{lang.error_div.password2}</div>
                                <div class="error-div-variant">{lang.error_div.password3}</div>
                                <div class="error-div-variant">{lang.error_div.password4}</div>
                                <div class="error-div-variant">{lang.error_div.password5}</div>
                            </div>
                            <div class="input-div">
                                <img src={svg.lock} class="icon-input" />
                                <input
                                    data-form_type="registration"
                                    data-validate_type="password"
                                    required="required"
                                    id="fast_pass"
                                    placeholder={lang.placeholder.password}
                                    type="password"
                                />
                                <img src={svg.eye} class="password_eye" />
                            </div>
                        </div>
                        <div class="container-checkbox">
                            <div class="error-div-agree" id="fast_agree-error"></div>
                            <div class="checkbox">
                                <p class="checkbox_error">{lang.error_div.needAgree}</p>
                                <input
                                    data-form_type="registration"
                                    class="checkbox__input"
                                    type="checkbox"
                                    id="fast_agree"
                                    data-action="clearCheckboxError"
                                    required="required"
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
                    <button class="c-button c-button--primary2 c-button--inactive" type="button" id="fast_reg">
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