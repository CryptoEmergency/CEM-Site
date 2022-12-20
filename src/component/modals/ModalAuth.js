import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    init
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { fn } from '@src/functions/index.js';
import { Input } from '@component/element/index.js';

// let Static = {}


const ModalAuth = function (data, ID) {
  //   console.log('=eb4754=', "dgdfg", Variable.Modals, data, ID)


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


    /**
     * autorization mpodal
     */
    const WayAuthForm = function () {
        if (wayAuth == "email") {
            return (
                <div>
                    <Input classDiv="reset_by_email_block_container" Static={Static.email} />
                </div>
            )
        } else {
            return (
                <div class='reset_by_mobile_block'>
                    <label for="resetByEmailInput">{Variable.lang.label.phone}</label>
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
                        <Input className="phoneNubmerInput2" Static={Static.phone} />
                    </div>
                </div>
            )

        }
    }

    const sendAuthorization = async function (e) {
        e.preventDefault();
        if (!Static.isValid) {
            return false
        }
        elemButton().classList.add('c-button--animated');
        let data = {
            pass: Static.pass.value,
        };
        if (wayAuth == "email") {
            data.email = Static.email.value
        } else {
            data.phone = `+${Static.phone.code}${Static.phone.value}`
            data.co = Static.phone.abbr
        }

        let tmpRes = await sendApi.create("userAuth", data);
        if (tmpRes.status === 'ok') {
            // Variable.DelModals("ModalAuth")
            fn.modals.close(ID)
            initReload()
        } else {
            fn.modals.ModalAlarm({ icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] }, true)
            // Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
            elemButton().classList.remove('c-button--animated');
        }

        Variable.Rooms = false
        return
    }


    // [Static] = fn.GetParams({ data: {}, ID: null })


    let Static = fn.GetParams({ data, ID })







    init(
        () => {

            Static = {
                isValid: false
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


                    return fn.validator.isEmail(value);

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }


            Static.pass = {
                value: "",
                valid: false,
                error: false,
                placeholder: Variable.lang.placeholder.password,
                type: `${viewPassword ? 'text' : 'password'}`,
                errorText: Variable.lang.error_div.password5,
                condition: (value) => {
                    if (value && value.length > 4) {
                        return true
                    }
                    return fn.validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 0,
                        minUppercase: 0,
                        minNumbers: 0,
                        minSymbols: 1,
                    });

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }

            Static.phone = {
                value: "",
                code: 7,
                abbr: "ru",
                placeholder: "9990000000",
                valid: false,
                error: false,
                label: "phone",
                errorText: Variable.lang.error_div.wrong_phone,
                condition: (value) => {

                    return fn.validator.isMobilePhone(value);

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }

            wayAuth = "email"
            listCodes = Variable.phoneCodes
        },
        () => {
           // console.log("=========INIT========", Static, "=====SECOND======")
            return (
                <div class="c-modal c-modal--open" id="ModalAuth">
                    <section class="c-modal__dialog" ref={elem}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_login}</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                  //  if(Variable.dataUrl.adress!== "rooms")
                                //    {
                                        Variable.DelModals(ID)
                                  //  } 
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="c-mobileoremail">
                                {/*<button
                                    class={`c-button c-button--toggler ${wayAuth == "email" && "c-button--active"}`}
                                    onClick={() => {
                                        wayAuth = "email"
                                        Static.email.value = ""
                                        Static.email.error = false
                                        Static.email.valid = false
                                        fn.checkValid(Static, [wayAuth, "pass"])
                                        // console.log(" email" + Static.isValid)
                                    }}>
                                    {Variable.lang.button.email}
                                </button>
                                <button
                                    class={`c-button c-button--toggler ${wayAuth == "phone" && "c-button--active"}`}
                                    onClick={() => {
                                        wayAuth = "phone"
                                        Static.phone.value = ""
                                        Static.phone.error = false
                                        Static.phone.valid = false
                                        fn.checkValid(Static, [wayAuth, "pass"])
                                        // console.log(" phone" + Static.isValid)

                                    }}>
                                    {Variable.lang.button.phone}
                                </button>*/}
                            </div>

                            <form onsubmit={sendAuthorization}>
                                <input style="display: none;" type="submit" />
                                <div class="reset_password_input_block">
                                    <WayAuthForm />
                                </div>
                                <div class="container-input">

                                    <Input classDiv="input-div" Static={Static.pass} />

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

                            </div>
                            <div class="authAgree">
                                <span>{Variable.lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a></span>
                            </div>
                            <div class="authAgree">
                                <span>Забыли пароль? <a
                                class="a-link"
                                href=""
                                onclick={() => {
                                  
                                    Variable.DelModals("ModalAuth")

                                    Variable.SetModals({ name: "ModalRecoverPass", data: {} })
                                }}
                            >Ссылка для восстановления</a></span>
                            </div>
                        </div>
                        <footer class="c-modal__footer">
                            <button
                                class={`c-button c-button--gradient2 ${!Static.isValid && "c-button--inactive"}`}
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

        }, ID
    )
    return



    initOne(
        () => {

            Static = {
                isValid: false
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


                    return fn.validator.isEmail(value);

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }


            Static.pass = {
                value: "",
                valid: false,
                error: false,
                placeholder: Variable.lang.placeholder.password,
                type: `${viewPassword ? 'text' : 'password'}`,
                errorText: Variable.lang.error_div.password5,
                condition: (value) => {

                    return fn.validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 0,
                        minUppercase: 0,
                        minNumbers: 0,
                        minSymbols: 1,
                    });

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }

            Static.phone = {
                value: "",
                code: 7,
                abbr: "ru",
                placeholder: "9990000000",
                valid: false,
                error: false,
                label: "phone",
                errorText: Variable.lang.error_div.wrong_phone,
                condition: (value) => {

                    return fn.validator.isMobilePhone(value);

                },
                afterValid: () => {

                    fn.checkValid(Static, [wayAuth, "pass"])

                }
            }

            wayAuth = "email"
            listCodes = Variable.phoneCodes
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
                                Static.email.value = ""
                                Static.email.error = false
                                Static.email.valid = false
                                fn.checkValid(Static, [wayAuth, "pass"])
                                // console.log(" email" + Static.isValid)
                            }}>
                            {Variable.lang.button.email}
                        </button>
                        <button
                            class={`c-button c-button--toggler ${wayAuth == "phone" && "c-button--active"}`}
                            onClick={() => {
                                wayAuth = "phone"
                                Static.phone.value = ""
                                Static.phone.error = false
                                Static.phone.valid = false
                                fn.checkValid(Static, [wayAuth, "pass"])
                                // console.log(" phone" + Static.isValid)

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

                            <Input classDiv="input-div" Static={Static.pass} />

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

                    </div>
                    <div class="authAgree">
                        <span>{Variable.lang.span.youAgree} <a target="_blank" class="a-link" href="/terms-of-service/">{Variable.lang.a.agree}</a></span>
                    </div>
                </div>
                <footer class="c-modal__footer">
                    <button
                        class={`c-button c-button--gradient2 ${!Static.isValid && "c-button--inactive"}`}
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