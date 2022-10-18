import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  init,
  initReload
} from "@betarost/cemjs";

import { allValidation } from "@src/functions.js";
import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
import { Jivo } from '@component/element/index.js';


const start = function () {
  let formInputs
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

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

  const sendMessage = async () => {
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
        <div class={['contacts_container', Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="c-container">
            <div class="contacts_content">
              <div class="contacts_form_block">
                <If
                  data={formInputs.messageSent != ""}
                  dataIf={
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
                  }
                  dataElse={
                    <div class="contacts_form">
                      <h4>{Variable.lang.h.contact}</h4>
                      <p>{Variable.lang.p.writeUs}</p>
                      <form id="contactsForm" onsubmit={sendMessage}>
                        <input style="display: none;" type="submit" />
                        <div>
                          <label for="">{Variable.lang.label.name}</label>
                          <If
                            data={formInputs.name.error}
                            dataIf={
                              <div class="error-div">
                                <div class="error-div-variant">{formInputs.name.errorText}</div>
                              </div>
                            }
                          />
                          <div class="contacts_form_name_icon">
                            <input
                              placeholder={Variable.lang.placeholder.name}
                              class="contacts_form_name"
                              type="text"
                              data-type="name"
                              value={formInputs.name.value}
                              oninput={changeInput}
                            />
                          </div>
                        </div>
                        <div>
                          <label for="">{Variable.lang.label.email}</label>
                          <If
                            data={formInputs.email.error}
                            dataIf={
                              <div class="error-div">
                                <div class="error-div-variant">{formInputs.email.errorText}</div>
                              </div>
                            }
                          />
                          <div class="contacts_form_email_icon">
                            <input
                              placeholder={Variable.lang.placeholder.email}
                              class="contacts_form_email"
                              type="text"
                              data-type="email"
                              value={formInputs.email.value}
                              oninput={changeInput}
                            />
                          </div>
                        </div>
                        <div>
                          <label for="">{Variable.lang.label.message}</label>
                          <If
                            data={formInputs.text.error != ""}
                            dataIf={
                              <div class="error-div">
                                <div class="error-div-variant">{formInputs.text.errorText}</div>
                              </div>
                            }
                          />
                          <div>
                            <textarea
                              placeholder={Variable.lang.placeholder.message}
                              value={formInputs.text.value}
                              data-type="text"
                              oninput={changeInput}
                            ></textarea>
                          </div>
                          <div
                            style={formInputs.isValid ? "display:block; margin-top: 20px;" : "display:none"}
                          >
                            <a class="btn-contacts" onclick={sendMessage}>
                              <span>{Variable.lang.button.send}</span>
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  }
                />
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
    }
  );
};
//I check
export default start;
