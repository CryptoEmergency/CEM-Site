import { jsx, jsxFrag, Variable, initReload, initOne } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import { allValidation } from "@src/functions.js";
import { checkNickName } from "@src/apiFunctionsE.js";

let formInputs;
const changeInput = async (e) => {
  let response;
  let type = e.target.dataset.validate_type;
  let value = e.target.value.trim();
  formInputs[type].error = "";
  formInputs[type].value = value;

  if (formInputs[type].value.length > 2 && formInputs[type].value.length < 17) {
    if (!allValidation(value, type)) {
      formInputs[type].error = Variable.lang.error_div.nicknameErr4;
    } else {
      response = await checkNickName(value);
      console.log('=935297=',response)
      if (response > 0) {
        formInputs[type].error = Variable.lang.error_div.nicknameErr11;
      }
    }
  } else {
    formInputs[type].error = Variable.lang.error_div.nicknameErr3;
  }

  if (formInputs[type].value.length === 0) {
    formInputs[type].error = Variable.lang.error_div.nicknameErr;
  }

  console.log("=formInputs[type].error=", formInputs[type].error);
  if (formInputs[type].error === "") {
    formInputs[type].valid = true;
  } else {
    formInputs[type].valid = false;
  }
  initReload("modals")
};

const changeLanguage = (data) => {
    Variable.Modals.pop();
    console.log('=622cd3=',data)
    formInputs.language.value = data;
    formInputs.language.valid = true;

}

const ModalAfterRegisterForm = function (data, reload) {
  initOne(() => {
    formInputs = {
      nickName: {
        value: "",
        valid: false,
        error: "",
      },
      language: {
        value: "",
        valid: false,
      },
      country: {
        value: "",
        valid: false,
      },
      isValid: false,
      messageSent: false,
    };
  });
  return (
    <div class="c-modal c-modal--open" id="ModalAfterRegisterForm">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.text.evaluated}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.Modals.pop();
              initReload("modals");
            }}
          ></button>
        </header>
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
                  data-button_id="afterRegisterFormSend"
                >
                  <input style="display: none;" type="submit" />
                  <div>
                    <label for="afterRegisterNickname">
                      {Variable.lang.label.nickName}
                    </label>
                    <div class="error-div">
                      {/* <div class="error-div-variant">
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
                      </div> */}
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
                      />
                    </div>
                  </div>
                  <div>
                    <label>{Variable.lang.label.lang}</label>
                    <div style="display: none;" class="error-div">
                      {Variable.lang.error_div.selectFromList}
                    </div>
                    <div class="language_select_wrapper">
                      <input
                        readonly
                        data-language=""
                        id="language_after_register"
                        data-action="changeLanguageAfterRegister"
                        data-form_type="afterReg"
                        data-validate_type="lang"
                        type="text"
                        autocomplete="off"
                        placeholder={Variable.lang.error_div.selectFromList}
                        value={formInputs.language.value}
                        onclick = {() => {
                            Variable.SetModals({ name: "ModalChangeLanguage", data: {changeLanguage} })
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
                <div
                  type="button"
                  class="ask-btn inactive_form_button"
                  data-active="0"
                  data-form_type="afterReg"
                  data-action="afterRegisterFormSend"
                >
                  <a id="afterRegisterFormSend" class="btn-ask">
                    <span>{Variable.lang.button.send}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalAfterRegisterForm;
