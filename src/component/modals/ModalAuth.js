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

const showModalAuth = function (e) {
    //console.log('dfffffff');
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"))
}

const ModalAuth = function ({ lang }) {
    // console.log("ModalAuth");
    const authModalShow = getValue("modals", "authModalShow")

    return (
        <div class="c-modal c-modal--open">
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
                    <div class="mobile_or_email_toggle">
                        <button
                            data-form_type="login"
                            id="loginByEmail"
                            class="reset_password_button active"
                        >
                            { lang.button.email }
                        </button>
                        <button
                            data-form_type="login"
                            id="loginByMobile"
                            class="reset_password_button"
                        >
                            { lang.button.phone }
                        </button>
                    </div>
                    <form id="loginForm">
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            <div class="reset_by_email_block">
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
                            <div class="reset_by_mobile_block dn">
                                <label for="resetByEmailInput">{lang.label.phone}</label>
                                <div class="error-div">{lang.error_div.wrong_phone}</div>
                                <div class="reset_by_mobile_block_container">
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
                                        data-co="ru"
                                    />
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
                                <img src={svg["icon/lock"]} class="icon-input" />
                                <input
                                    data-keyup="keyupValidate"
                                    data-form_type="login"
                                    data-dirty="false"
                                    data-focusout="focusout"
                                    data-validate_type="password"
                                    placeholder={lang.placeholder.password}
                                    id="auth_pass"
                                    type="password"
                                />
                                <img src={svg["icon/eye"]} class="password_eye"  />
                            </div>
                        </div>
                    </form>
                    <div class="bottom_log-in">
                        <div class="checkbox">
                            <input checked="checked" class="checkbox__input-2" type="checkbox" id="auth_remember" />
                            <label class="checkbox__label-2" for="auth_remember">{lang.placeholder.rememberMe}</label>
                        </div>
                        <span class="cont_a-link-2" >
                            <a class="a-link" id="forgot_password">{lang.a.forgot_pass}</a>
                        </span>
                    </div>
                    <div class="authAgree">
                        <span>{lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{lang.a.agree}</a></span>
                    </div>
                </div>

                <footer class="c-modal__footer">
                    <button class="c-button c-button--primary"
                        onclick={() => { alert(7) }}
                    >
                        <span>Кнопка</span>
                    </button>
                    <div class="btn-modal-log_in inactive_form_button" data-active="0" data-form_type="login" id="auth_system">
                        <a class="btn-gr-log-in"><span>{lang.button.login}</span></a>
                    </div>
                    <div id="log-in_btn-regShow" class="btn-reg-show">
                        <a class="btn-gr-reg-show"><span>{lang.button.registration}</span></a>
                    </div>
                </footer>
            </section >
        </div >
    )
};


export { ModalAuth }