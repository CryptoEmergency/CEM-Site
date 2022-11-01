import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  init,
  initReload
} from "@betarost/cemjs";

import { allValidation, validator } from "@src/functions.js";
import svg from "@assets/svg/index.js";
import { Jivo, Input, TextArea } from '@component/element/index.js';

const start = function (data, ID = "mainBlock") {
  let Static = {}

  let formInputs

  const changeInput = function () {
    formInputs[this.dataset.type].value = this.value.trim()
    formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);

    if (!formInputs[this.dataset.type].valid) {
      formInputs[this.dataset.type].error = true;
      this.style = "border-color: rgb(200, 23, 38);";
      formInputs.isValid = false
      initReload()
      return
    } else {
      formInputs[this.dataset.type].error = false;
      this.style = "border-color: rgb(37, 249, 48);"
    }

    let isCheckAll = false
    if (formInputs.name.valid === true && formInputs.email.valid === true && formInputs.text.valid === true) {
      isCheckAll = true
    }

    if (isCheckAll) {
      formInputs.isValid = true
    } else {
      formInputs.isValid = false
    }
    initReload()
    return;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formInputs.isValid) {
      return false
    }
    const name = formInputs.name.value;
    const email = formInputs.email.value;
    const text = formInputs.text.value;
    const data = await sendApi.create("supportMessage", {
      value: { email, name, text },
    });
    if (data.status === "ok") {
      formInputs.messageSent = true;
    }
    initReload()
  };

  init(
    () => {

      Static.name = {
        value: "",
        valid: false,
        error: false,
      }

      Static.email = {
        value: "",
        valid: false,
        error: false,
      }

      Static.message = {
        value: "",
        valid: false,
        error: false,
      }




      formInputs = {
        name: {
          value: "",
          valid: false,
          error: false,
          errorText: Variable.lang.error_div.not_empty_input
        },
        email: {
          value: "",
          valid: false,
          error: false,
          errorText: Variable.lang.error_div.wrong_email
        },
        text: {
          value: "",
          valid: false,
          error: false,
          errorText: Variable.lang.error_div.not_empty_input
        },
        isValid: false,
        messageSent: false
      };

      if (Variable.myInfo.nickname) {
        formInputs.name.value = Variable.myInfo.nickname
        formInputs.name.valid = true
      }

      if (Variable.myInfo.email) {
        formInputs.email.value = Variable.myInfo.email
        formInputs.email.valid = true
      }
    },

    () => {
      return (
        <div class='contacts_container c-main__body'>
          <div class="c-container">
            <div class="contacts_content">
              <div class="contacts_form_block">
                {() => {
                  if (formInputs.messageSent != "") {
                    return (
                      <div class="contacts_form">
                        <div class="modal_success">
                          <h4>{Variable.lang.h.modal_success}</h4>
                          <img
                            class="modal_success_icon"
                            src={svg["modal_success"]}
                            width="40"
                          />
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div class="contacts_form">
                        <h4>{Variable.lang.h.contact}</h4>
                        <p>{Variable.lang.p.writeUs}</p>
                        <form id="contactsForm" onsubmit={sendMessage}>
                          <input style="display: none;" type="submit" />

                          <Input
                            label={Variable.lang.label.name}
                            error={Variable.lang.error_div.not_empty_input}
                            placeholder={Variable.lang.placeholder.name}
                            type="text"
                            value=""
                            className="contacts_form_name_icon"
                            condition={(value) => {
                              return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
                            }}
                            afterValid={() => {
                              initReload()
                            }}
                            Static={Static.name}
                          />

                          <Input
                            label={Variable.lang.label.email}
                            error={Variable.lang.error_div.wrong_email}
                            placeholder={Variable.lang.placeholder.email}
                            type="text"
                            value=""
                            className="contacts_form_email_icon"
                            condition={(value) => {
                              return validator.isEmail(value);
                            }}
                            afterValid={() => {
                              initReload()
                            }}
                            Static={Static.email}
                          />

                          <TextArea
                            label={Variable.lang.label.message}
                            error={Variable.lang.error_div.not_empty_input}
                            placeholder={Variable.lang.placeholder.message}
                            type="text"
                            value=""
                            condition={(value) => {
                              return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
                            }}
                            afterValid={() => {
                              initReload()
                            }}
                            Static={Static.message}
                          />


                          <div class="search-button" style="width:238px;">
                            {Variable.lang.button.giveQuestion}
                          </div>
                          <div
                            style={formInputs.isValid ? "display:block; margin-top: 20px;" : "display:none"}
                          >
                            <a class="btn-contacts" onclick={sendMessage}>
                              <span>{Variable.lang.button.send}</span>
                            </a>
                          </div>

                        </form>
                      </div>
                    )
                  }
                }}
              </div>
              <div class="contacts_info" style={[formInputs.messageSent ? "margin-top: 20px" : null]}>
                <span class="contact_info_label">
                  {Variable.lang.span.adress}:
                </span>
                <span class="contact_info_text">
                  {Variable.lang.span.addressFull}
                </span>
                <span class="contact_info_label">
                  {Variable.lang.span.branch}:
                </span>
                <span class="contact_info_text">
                  {Variable.lang.span.branchAdress}
                </span>
                <span class="contact_info_label">E-mail:</span>
                <a href="mailto:support@crypto-emergency.com">
                  <span class="contact_info_text">
                    support@crypto-emergency.com
                  </span>
                </a>
              </div>
            </div>
          </div>
          <Jivo />
        </div>
      );
    }, ID
  );
};
export default start;
