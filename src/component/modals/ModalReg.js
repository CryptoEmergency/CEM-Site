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
import { allValidation, validator,checkValid } from '@src/functions.js';
import { Input, CheckBox } from '@component/element/index.js';

let listCodes

let elem = Variable.setRef()
let elemButton = Variable.setRef()
let elemCountry = Variable.setRef()

const changeSearch = (e) => {
    let inputValue = e.target.value.toLowerCase();
    listCodes = Variable.phoneCodes.filter((item) => item.text.toLowerCase().includes(inputValue) || `+${item.code}`.toLowerCase().includes(inputValue))
    initReload("modals");
}


const sendRegistration = async function (e) {
    e.preventDefault();
    if (!Static.isValid) {
        return false
    }
    elemButton().classList.add('c-button--animated');
    let data = {
        password: Static.pass.value,
        agree: Static.agreement.value
    };
    if (wayReg == "email") {
        data.email = Static.email.value
    } else {
        data.phone = `+${Static['phone'].code}${Static['phone'].value}`
        data.co = Static['phone'].abbr
    }
    let tmpRes = await sendApi.create("registration", { value: data });
    if (tmpRes.status === 'ok') {
        Variable.DelModals("ModalReg")
        Variable.SetModals({ name: "ModalConfirmCode", data: { way: wayReg } })
        initReload()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
        elemButton().classList.remove('c-button--animated');
    }
    return
}


let wayReg, Static

const ModalReg = function () {

    initOne(
        () => {
            wayReg = "email"

            Static = {
                isValid: false
            }

            Static.phone = {
                value: "",
                valid: false,
                error: false,
                code: 7,
                abbr: "ru",
                label: Variable.lang.label.phone,
                placeholder: "9990000000",
                errorText: Variable.lang.error_div.wrong_phone,
                type: "text",
                condition: (value) => {
                    return validator.matches(value, /[0-9]{9,13}/i);
                },
                afterValid:() => {
            
                    checkValid(Static,["phone","pass","agreement"])
                  
                 }
            }

            Static.email = {
                value: "",
                valid: false,
                error: false,
                label: Variable.lang.label.email,
                placeholder: Variable.lang.placeholder.email,
                errorText: Variable.lang.error_div.wrong_email,
                type: "text",
                condition: (value) => {
                    return validator.isEmail(value);
                },
                afterValid:() => {
            
                    checkValid(Static,["email","pass","agreement"])
                  
                 }
            }

            Static.pass = {
                value: "",
                valid: false,
                error: false,
                label: Variable.lang.label.password,
                placeholder: Variable.lang.placeholder.password,
                errorText: Variable.lang.error_div.password5,
                type: "password",
                condition: (value) => {
                    return validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 0,
                        minUppercase: 0,
                        minNumbers: 0,
                        minSymbols: 1,
                    });
                },
                afterValid:() => {
            
                    checkValid(Static,[wayReg,"pass","agreement"])
                  
                 }
            }

            Static.agreement = {
                value: true,
                valid: true,
                error: false,
            }


            Variable.OutHideWindows.push([elem, "ModalReg"])
            listCodes = Variable.phoneCodes

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
                                if (wayReg == "email") {
                                    return
                                }
                                wayReg = "email"
                                Static.email.value = ""
                                Static.email.error = false
                                Static.email.valid = false
                                checkValid(Static,[wayReg,"pass","agreement"])
                            }}
                        >
                            {Variable.lang.button.email}
                        </button>
                        <button
                            id="regByMobile"
                            class={['c-button c-button--toggler', wayReg == "phone" ? 'c-button--active' : null]}
                            onClick={() => {
                                if (wayReg == "phone") {
                                 
                                    return
                                }
                                wayReg = "phone"
                    
                                Static.phone.value = ""
                                Static.phone.error = false
                                Static.phone.valid = false
                                checkValid(Static,[wayReg,"pass","agreement"])
                            }}
                        >
                            {Variable.lang.button.phone}
                        </button>
                    </div>
                    <form id="registrationForm" onsubmit={sendRegistration}>
                        <input style="display: none;" type="submit" />
                        <div class="reset_password_input_block">
                            {
                                () => {
                                    if (wayReg == "email") {
                                        return (
                                            <Input
                                                classDiv="contacts_form_email_icon"
                                                Static={Static.email}
                                            />
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <div class='reset_by_mobile_block'>

                                                    <div class="reset_by_mobile_block_container c-phonecode">

                                                        <Input
                                                            classInput="phoneNubmerInput2"
                                                            Static={Static.phone}
                                                            befor={
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
                                                                                +{Static.phone.code}
                                                                                <img src={images.blank} class={`flag flag-${Static.phone.abbr}`} />
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
                                                                                                    Static.phone.code = item.code
                                                                                                    Static.phone.abbr = item.abbr
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
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            }

                        </div>

                        <div class="container-input">
                            <Input
                                classDiv="input-div"
                                Static={Static.pass}
                            />
                        </div>

                        <div class="container-checkbox">

                            <CheckBox
                                Static={Static.agreement}
                                id="fast_agree"
                                label={
                                    <label class="checkbox__label" for="fast_agree">
                                        {Variable.lang.text.agree}
                                        <span class="cont_a-link">
                                            <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a>
                                        </span>
                                    </label>
                                }
                                afterValid={() => {
                                    checkValid(Static,[wayReg,"pass","agreement"])
                                }}
                            />
                        </div>
                        <footer class="c-modal__footer">
                            <button
                                class={['c-button c-button--gradient2', !Static.isValid ? 'c-button--inactive' : null]}
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