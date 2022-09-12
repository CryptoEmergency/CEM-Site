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

const showModalAuth = function (e) {
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"))
};

const showModalReset = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"));
    setValue("modals", "resetModalShow", !getValue("modals", "resetModalShow"));
};

const showModalRegistartion = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"));
    setValue("modals", "registrationModalShow", !getValue("modals", "registrationModalShow"));
};

const ModalAuth = function ({ lang, changeCode, ID, abbr, codeTitle, wayAuth, changeWayAuth, toggleViewPassword }) {
    // console.log("ModalAuth");
    // const authModalShow = getValue("modals", "authModalShow")
    const resetModalShow = getValue(ID, "resetModalShow");
    const viewPassword = getValue(ID, "viewPassword");

    return (
        <div class="c-modal c-modal--open" id="ModalLogin">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{lang.h.modal_login}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalAuth}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class={`c-mobileoremail`}>
                        <button
                            data-form_type="login"
                            id="loginByEmail"
                            class={`c-button c-button--toggler ${wayAuth == "email" && "c-button--active"}`}
                            onClick={(e) => { changeWayAuth(e) }}
                        >
                            {lang.button.email}
                        </button>
                        <button
                            data-form_type="login"
                            id="loginByMobile"
                            class={`c-button c-button--toggler ${wayAuth == "phone" && "c-button--active"}`}
                            onClick={(e) => { changeWayAuth(e) }}
                        >
                            {lang.button.phone}
                        </button>
                    </div>
                    <form id="loginForm">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <div class={`reset_by_email_block ${wayAuth == "phone" && "dn"}`}>
                                <label for="resetByEmailInput">{lang.label.email}</label>
                                <div class="error-div">{lang.error_div.wrong_email}</div>
                                <div class="reset_by_email_block_container">
                                    <input
                                        data-form_type="login"
                                        data-dirty="false"
                                        data-focusout="focusout"
                                        data-keyup="keyupValidate"
                                        data-validate_type="email"
                                        placeholder={lang.placeholder.email}
                                        id="loginByEmailInput"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div class={`reset_by_mobile_block ${wayAuth == "email" && "dn"}`}>
                                <label for="resetByEmailInput">{lang.label.phone}</label>
                                <div class="error-div">{lang.error_div.wrong_phone}</div>
                                <div class="reset_by_mobile_block_container c-phonecode">

                                    <PhoneCode lang={lang} changeCode={changeCode} abbr={abbr} codeTitle={codeTitle} ID={ID} />

                                    <input
                                        class="phoneNubmerInput2"
                                        data-form_type="login"
                                        data-dirty="false"
                                        data-focusout="focusout"
                                        data-keyup="keyupValidate"
                                        data-validate_type="phone"
                                        type="text"
                                        id="phone2"
                                        name="phone"
                                        autofocus="true"
                                        placeholder="9990000000"
                                        data-co={abbr}
                                    />

                                    <input id="phone_prefix2" type="hidden" name="__phone_prefix" value={codeTitle} />
                                </div>
                            </div>
                        </div>
                        <div class="container-input">
                            <label for="password">{lang.label.password}</label>
                            <div class="error-div">
                                <div class="error-div-variant">{lang.error_div.not_empty_input}</div>
                                <div class="error-div-variant">{lang.error_div.password}</div>
                                <div class="error-div-variant">{lang.error_div.password2}</div>
                                <div class="error-div-variant">{lang.error_div.password3}</div>
                                <div class="error-div-variant">{lang.error_div.password4}</div>
                                <div class="error-div-variant">{lang.error_div.password5}</div>
                            </div>
                            <div class="input-div">
                                <img src={svg["lock"]} class="icon-input" />
                                <input
                                    data-keyup="keyupValidate"
                                    data-form_type="login"
                                    data-dirty="false"
                                    data-focusout="focusout"
                                    data-validate_type="password"
                                    placeholder={lang.placeholder.password}
                                    id="auth_pass"
                                    type={`${viewPassword ? 'text' : 'password'}`}
                                />
                                <img src={svg[`eye${viewPassword ? '-slash' : ''}`]} class="password_eye" onClick={toggleViewPassword} />
                            </div>
                        </div>
                    </form>
                    <div class="bottom_log-in">
                        <div class="checkbox">
                            <input checked="checked" class="checkbox__input-2" type="checkbox" id="auth_remember" />
                            <label class="checkbox__label-2" for="auth_remember">{lang.placeholder.rememberMe}</label>
                        </div>
                        <span class="cont_a-link-2" >
                            <a
                                class="a-link"
                                id="forgot_password"
                                onclick={showModalReset}
                            >
                                {lang.a.forgot_pass}
                            </a>
                        </span>
                    </div>
                    <div class="authAgree">
                        <span>{lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{lang.a.agree}</a></span>
                    </div>
                </div>

                <footer class="c-modal__footer">
                    <button class="c-button c-button--gradient2 c-button--inactive" type="button">
                        <span class="c-button__text">
                            {lang.button.login}
                        </span>
                    </button>
                    <a
                        class="c-button c-button--registration"
                        href=""
                        onclick={showModalRegistartion}
                    >
                        <div class="c-button__wrapper">
                            {lang.button.registration}
                        </div>
                    </a>
                </footer>
            </section >
        </div >
    )
};


export { ModalAuth };