import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { checkValid, validator } from "@src/functions.js";

import { Input } from '@component/element/index.js';
let formInputs;


let Static = {}

let test = {}
// console.log('=59c8e8=', 5555, test)
const ModalAfterRegisterForm = function (data, reload) {
  // console.log('=ea1488 ModalAfterRegisterForm=', data, reload, formInputs)
  initOne(() => {
    Static = {
      isValid: false
    }

    test.nickName = {
      value: "",
      valid: false,
      error: false,
      label: Variable.lang.label.nickName,
      placeholder: Variable.lang.label.nickName,
      errorText: Variable.lang.error_div.nicknameErr,
      condition: (value) => {
        return false

      },
      afterValid: () => {
        console.log('=e24362=', "afterValid", Static)
        checkValid(Static, ["nickName"])

      }
    }

    Static.nickName = {
      value: "",
      valid: false,
      error: false,
      label: Variable.lang.label.nickName,
      placeholder: Variable.lang.label.nickName,
      errorText: Variable.lang.error_div.nicknameErr,
      condition: (value) => {
        let checkErrors = false;

        const beginWithoutDigit = /^\D.*$/ // начало с цифры
        const chars = /^.{5,30}$/ // от 5 до 30 символов
        const latinChars = /^[a-zA-Z0-9._]/ // латинские буквы
        const withoutSpaces = /^\S*$/ // без пробелов
        const points = /^(?!.*\.\.)(?!\.)(?!.*\.$)/ // 2 точки или точка в начале или точка в конце
        const underscore = /^(?!.*\_\_)(?!\_)(?!.*\_$)/ // 2 нижних подчеркивания или нижнее подчеркивание в начале или нижнее подчеркивание в конце
        const dash = /^(?!.*\-\-)(?!\-)(?!.*\-$)/ // 2 тире или тире в начале или тире в конце
        const number = /^(?!\d+$)/ // состоит из цифр
        const specialChars = /^(?=.*[!@#$%^&(),+=/\/\]\[{}?><":|])/ // специальные символы







        if (!validator.matches(value, chars)) {
          Static.nickName.errorText = Variable.lang.error_div.nicknameErr3
          return false
        }
        else if (!validator.matches(value, latinChars)) {
          Static.nickName.errorText = Variable.lang.error_div.nicknameErr4
          return false
        }
        else if (!validator.matches(value, withoutSpaces)) {
          Static.nickName.errorText = Variable.lang.error_div.nicknameErr5
          return false
        }
        else if (!validator.matches(value, points)) {
          Static.nickName.errorText = Variable.lang.error_div.nicknameErr6
          return false
        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        }
        else if (!validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i)) {

        } else {

        }
        // console.log(Static.nickName.errorText)

        // return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{5,30}/i);

      },
      afterValid: () => {

        checkValid(Static, ["nickName"])

      }
    }

    if (!reload) {
      formInputs = {
        /* nickName: {
           value: "",
           valid: false,
           error: false,
           errorText: Variable.lang.error_div.nicknameErr
         },*/
        language: {
          value: "",
          code: "",
          valid: false,
          error: false,
          errorText: Variable.lang.error_div.selectFromList
        },
        country: {
          value: "",
          code: "",
          valid: false,
          error: false,
          errorText: Variable.lang.error_div.selectFromList
        },
        //  isValid: false
      }
    }
  });

  const sendRegistrationForm = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
      return false
    }
    let data = {
      value: {
        nickname: formInputs.nickName.value,
        mainLanguage: formInputs.language.code,
        country: formInputs.country.code
      }
    }

    let tmpRes = await sendApi.create("setUsers", data);


    if (tmpRes.status === 'ok') {
      Variable.DelModals("ModalAfterRegisterForm")
      initReload()
    } else {
      Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true);

    }
    return

  }
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
                  onsubmit={sendRegistrationForm}
                >
                  <input style="display: none;" type="submit" />
                  <div>
                    <Input classDiv="" Static={test.nickName} />
                    {/* <label for="afterRegisterNickname">
                      {Variable.lang.label.nickName}
                    </label>
                    <div class="error-div">
                       <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr2}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr3}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr4}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr5}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr6}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr7}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr8}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr9}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr10}
                      </div>
                      <div class="error-div-variant">
                        {Variable.lang.error_div.nicknameErr11}
                      </div> 
                      <div class="error-div-variant">
                        {formInputs.nickName.error}
                      </div>
                    </div>
                    <div>
                      <input
                        data-form_type="afterReg"
                        data-dirty="false"
                        data-focusout="focusout"
                        data-keyup="keyupValidate"
                        data-validate_type="nickName"
                        id="afterRegisterNickname"
                        type="text"
                        oninput={changeInput}
                        value={formInputs.nickName.value}
                      />*/}
                  </div>

                  <div>
                    <label>{Variable.lang.label.lang}</label>
                    <div style="display: none;" class="error-div">
                      {Variable.lang.error_div.selectFromList}
                    </div>


                    <div class="language_select_wrapper">
                      <input
                        readonly
                        id="language_after_register"
                        type="text"
                        autocomplete="off"
                        placeholder={Variable.lang.error_div.selectFromList}
                        value={formInputs.language.value}
                        onclick={() => {
                          Variable.SetModals({
                            name: "ModalChangeLanguage", data: {
                              onclick: (code, name, orig) => {
                                formInputs.language.value = name + ` (${orig})`
                                formInputs.language.code = code
                                formInputs.language.valid = true
                                if (formInputs.country.valid && formInputs.language.valid && formInputs.nickName.valid) {
                                  formInputs.isValid = true
                                }
                                // console.log('=5fb352 formInputs=', formInputs)
                                // initReload("modals")
                              }
                            }
                          }, true);
                        }}
                      />
                      <div
                        id="language_search_help"
                        class="language_help_block"
                      ></div>
                      <div class="language_search_help_error dn">
                        <div class="language_help_error"></div>
                      </div>
                    </div>


                  </div>
                  <label>{Variable.lang.label.country}</label>
                  <div style="display: none;" class="error-div">
                    {Variable.lang.error_div.selectFromList}
                  </div>
                  <div class="country_select_wrapper">
                    <input
                      data-code=""
                      id="country_search"
                      data-action="changeCountryAfterRegister"
                      data-form_type="afterReg"
                      data-validate_type="country"
                      type="text"
                      autocomplete="off"
                      readonly
                      value={formInputs.country.value}
                      onclick={() => {
                        Variable.SetModals({
                          name: "ModalSelectCountry", data: {
                            onclick: (code, name) => {
                              formInputs.country.value = name
                              formInputs.country.code = code
                              formInputs.country.valid = true
                              if (formInputs.country.valid && formInputs.language.valid && formInputs.nickName.valid) {
                                formInputs.isValid = true
                              }
                              //  initReload("modals")
                            }
                          }
                        }, true);
                      }}
                      placeholder={Variable.lang.error_div.selectFromList}
                    />
                    <div
                      id="country_search_help"
                      class="country_help_block"
                    ></div>
                    <div class="country_search_help_error dn">
                      <div class="country_help_error"></div>
                    </div>
                    <img src={svg["country_icon"]} />
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
  );
};

export default ModalAfterRegisterForm;
