import {
    jsx,
    jsxFrag,
    Variable,
    sendApi,
    initReload,
    initGo,
    initOne
} from '@betarost/cemjs';

import images from '@assets/images/index.js';

import { allValidation, validator, checkValid } from '@src/functions.js';
import { Input, CheckBox } from '@component/element/index.js';


let Static

const ModalRegСontinue = function () {

    initOne(
        () => {
            Static = {
                isValid: false
            }

            Static.nickName = {
                value: "",
                valid: false,
                error: false,
                label: Variable.lang.label.nickName,
                placeholder: Variable.lang.label.nickName,
                errorText: Variable.lang.error_div.nicknameErr,
                type: "text",
                condition: (value) => {
                    return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i);
                },
                afterValid: () => {
                    checkValid(Static, ["nickName"])
                }
            }
        }
    )

    return (
        <div class="c-modal c-modal--open" id="ModalAfterRegisterForm">
            <section class="c-modal__dialog">
                <div class="c-modal__body">
                    <div
                        class="modal fade"
                        id="AfterRegister"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-content">
                            <div class="after_register_form">
                                <h4>{Variable.lang.h.modal_afterReg}</h4>
                                <form
                                    id="afterRegisterForm"
                                //   onsubmit={sendRegistrationForm}
                                >
                                    <input style="display: none;" type="submit" />
                                    <div>
                                        <Input classDiv="" Static={Static.nickName} />
                                    </div>
                                </form>
                                <button
                                    class={[
                                        "c-button c-button--gradient2",
                                        !formInputs.isValid ? "c-button--inactive" : "",
                                    ]}
                                    type="button"
                                    // ref={elemButton}
                                    onClick={sendRegistrationForm}
                                >
                                    <span class="c-button__text">
                                        {Variable.lang.button.send}
                                    </span>
                                </button>
                                {/* <div
                type="button"
                class="ask-btn inactive_form_button"
                data-active="0"
                data-form_type="afterReg"
                data-action="afterRegisterFormSend"
              >
                <a id="afterRegisterFormSend" class="btn-ask">
                  <span>{Variable.lang.button.send}</span>
                </a>
              </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default ModalRegСontinue;