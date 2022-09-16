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

const showModalConfirmation = function (e) {
    e.stopPropagation()
    setValue("modals", "confirmationModalShow", !getValue("modals", "confirmationModalShow"))
}

const ModalConfirmation = function ({ lang, wayReg, confirmationTimer, confirmAccount }) {
    // console.log("ModalConfirmation");

    return (
        <div class="c-modal c-modal--open">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{lang.h.modal_resetСonfirm}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalConfirmation}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class="reset_password">
                        <div class="reset_password_step1">
                            <p></p>
                            <div class="reset_password_input_block">
                                <form id="confirmationForm" data-button_id="confirmAccount">
                                    <input style="display: none;" type="submit" />
                                    <div class={`reset_by_email_block ${wayReg != 'email' && "dn "}`}>
                                        <label for="resetByEmailInput">{lang.text.confirmEmail}</label>
                                        <div class="reset_by_email_block_container">
                                            <input id="confirmationByEmailInput" type="number" />
                                        </div>
                                    </div>
                                    <div class={`reset_by_mobile_block ${wayReg != 'phone' && "dn "}`}>
                                        <label for="resetByEmailInput">{lang.text.confirmPhone}</label>
                                        <div class="reset_by_mobile_block_container">
                                            <input id="confirmationByMobileInput" type="text" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="confirmation_timer_block">
                                <span>{lang.text.timeCode} <span style="color:red;font-weight:800;font-size:20px">!</span></span>
                                <div class="confirmation_timer">
                                    1:00
                                </div>
                            </div>
                            <a style="display: none;" class="confirmation_timer_success" onClick={confirmationTimer}>
                                {lang.a.newCodeConfirm}
                            </a>
                        </div>
                    </div>
                </div>
                <footer class="c-modal__footer">
                    <button
                        class="c-button c-button--primary"
                        id="confirmAccount"
                        onclick={confirmAccount}
                    >
                        <span>{lang.button.send}</span>
                    </button>
                </footer>
            </section>
        </div>
    )
};


export { ModalConfirmation }