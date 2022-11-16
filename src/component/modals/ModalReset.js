import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable,
    getValue,
    init
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { PhoneCode } from '@component/element/PhoneCode.js';
import { Input } from '@component/element/index.js';



const ModalReset = function ({ lang, changeCode, ID, abbr, codeTitle, wayReset, changeWayReset, changeStepReset }, ID) {
    // console.log("ModalReset", { lang, changeCode, ID, abbr, codeTitle, wayReset, changeWayReset });
    const showStepReset = getValue(ID, "toggleStepReset");
    const showModalReset = function (e) {
        e.stopPropagation()
        let show = getValue("modals", "resetModalShow");
        if (show) {
            setValue("modals", 'toggleStepReset', "1");
        }
        setValue("modals", "resetModalShow", !getValue("modals", "resetModalShow"))
    };
    
    let Static = {}
    Static.phone = {
        value: "",
        valid: false,
        error: false,
        autofocus: "true",
        placeholder: "9990000000",
        type: "text",
        "data-co": { abbr },
        condition: (value) => {
            return fn.validator.matches(value, /[0-9]{9,13}/i);
        },
        afterValid: () => {

            fn.checkValid(Static, ["phone"])

        }
    }
    init(
        null,
        ()=>{
            return (
                <div class="c-modal c-modal--open" id="ModalReset">
                    <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{`${showStepReset == "1" ? lang.h.modal_reset : lang.h.modal_resetСonfirm}`}</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={showModalReset}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="reset_password">
                                <div class={`reset_password_step1 ${showStepReset == "2" && "dn"}`}>
                                    <div class="c-mobileoremail">
                                        <button
                                            id="resetByEmail"
                                            class={`c-button c-button--toggler ${wayReset == "email" && "c-button--active"}`}
                                            onClick={(e) => { changeWayReset(e) }}
                                        >
                                            {lang.button.email}
                                        </button>
                                        <button
                                            id="resetByMobile"
                                            class={`c-button c-button--toggler ${wayReset == "phone" && "c-button--active"}`}
                                            onClick={(e) => { changeWayReset(e) }}
                                        >
                                            {lang.button.phone}
                                        </button>
                                    </div>
                                    <div class="reset_password_input_block">
                                        <form id="resetPassword1" data-button_id="reset_next_step-1">
                                            <input style="display: none;" type="submit" />
                                            <div
                                                class={`reset_by_email_block ${wayReset == "phone" && "dn"}`}
                                            >
                                                <label for="resetByEmailInput">{lang.label.email}</label>
                                                <div class="error-div"></div>
                                                <div class="reset_by_email_block_container">
                                                    <input id="resetByEmailInput" type="text" placeholder={lang.placeholder.email} />
                                                </div>
                                            </div>
                                            <div
                                                class={`reset_by_mobile_block ${wayReset == "email" && "dn"}`}
                                            >
                                                <label for="resetByEmailInput">{lang.label.phone}</label>
                                                <div class="error-div"></div>
                                                <div class="reset_by_mobile_block_container  c-phonecode">
        
                                                    <PhoneCode lang={lang} changeCode={changeCode} abbr={abbr} codeTitle={codeTitle} ID={ID} />
                                                    <Input classDiv="" Static={Static.phone} />
                                                    {/*<input
                                                        class="phoneNubmerInput3"
                                                        type="text"
                                                        id="phone3"
                                                        name="phone"
                                                        autofocus="true"
                                                        placeholder="9990000000"
                                                        data-co={abbr}
                                                        />*/}
        
                                                    <input id="phone_prefix3" type="hidden" name="__phone_prefix" value={codeTitle} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        type="button"
                                        class="reset-btn"
                                        id="reset_next_step-1"
                                        onClick={(e) => { changeStepReset(e) }}
                                    >
                                        <a
                                            class="c-button c-button--primary2"
                                            href=""
                                        >
                                            <div class="c-button__wrapper">
                                                {lang.button.next}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class={`reset_password_step2 ${showStepReset == "1" && "dn"}`}>
                                    {/* <h4>{lang.h.modal_resetConfirm}</h4> */}
                                    <p>{lang.p.resetConfirm}</p>
                                    {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                    <div class="reset_password_input_block">
                                        <form id="resetPassword2" data-button_id="reset_next_step-2">
                                            <input style="display: none;" type="submit" />
                                            <div class="reset_by_email_block">
                                                <label for="resetByEmailInputCode">{lang.label.codeConfirm}</label>
                                                <div class="error-div"></div>
                                                <div class="reset_by_email_block_container">
                                                    <input id="resetByEmailInputCode" type="number" />
                                                </div>
                                            </div>
                                            <div class="reset_by_mobile_block dn">
                                                <label for="resetByMobileInputCode">{lang.label.codeConfirm}</label>
                                                <div class="error-div"></div>
                                                <div class="reset_by_mobile_block_container">
                                                    <input id="resetByMobileInputCode" type="number" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="reset_timer_block">
                                        {lang.text.timeCode}
                                        <div class="reset_timer">
                                            1:00
                                        </div>
                                    </div>
                                    <a style="display: none;" class="reset_timer_success">
                                        {lang.a.newCodeConfirm}
                                    </a>
                                    <div type="button" class="reset-btn" id="reset_next_step-2">
                                        <a class="btn-reset"><span>{lang.button.next}</span></a>
                                    </div>
                                </div>
                            </div>
                        </div >
        
                        <footer class="c-modal__footer">
                            {/* <button class="c-button c-button--gradient2 c-button--inactive" type="button">
                                <span class="c-button__text">
                                    {lang.button.login}
                                </span>
                            </button>
                            <a class="c-button c-button--registration" href="">
                                <div class="c-button__wrapper">
                                    {lang.button.registration}
                                </div>
                            </a> */}
                        </footer>
                    </section >
                </div >
            )
        }, ID
    )
};


export default ModalReset;