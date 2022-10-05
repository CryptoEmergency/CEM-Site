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

let formInputs

const start = function () {

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const changeInput = function (e) {
    formInputs[this.dataset.type].value = this.value.trim()
    formInputs[this.dataset.type].valid = allValidation(this.value.trim(), this.dataset.type);

    if (!formInputs[this.dataset.type].valid) {
      formInputs[this.dataset.type].error = "Заполните поле " + this.dataset.type;
      this.style = "border-color: rgb(200, 23, 38);";
      formInputs.isValid = false
      initReload()
      return
    } else {
      formInputs[this.dataset.type].error = "";
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
          error: "",
        },
        email: {
          value: "",
          valid: false,
          error: "",
        },
        text: {
          value: "",
          valid: false,
          error: "",
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
        <div
          class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
            } contacts_container`}
        >
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
                      <form id="contactsForm" data-button_id="sendContacts">
                        <input style="display: none;" type="submit" />
                        <div>
                          <label for="">{Variable.lang.label.name}</label>
                          <If
                            data={formInputs.name.error != ""}
                            dataIf={
                              <div class="error-div" style="display: block">
                                <div class="error-div-variant">{Variable.lang.error_div.not_empty_input}</div>
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
                            // disabled = {Variable.myInfo.nickname !==  undefined  ? true : false }
                            // style ={Variable.myInfo.nickname !==  undefined ? "border-color: rgb(37, 249, 48);" : "border-color: rgb(37, 249, 48)"} 
                            />
                          </div>
                        </div>
                        <div>
                          <label for="">{Variable.lang.label.email}</label>
                          <If
                            data={formInputs.email.error != ""}
                            dataIf={
                              <div class="error-div" style="display: block">
                                <div class="error-div-variant">{Variable.lang.error_div.wrong_email}</div>
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
                            // disabled = {Variable.myInfo.email !==  undefined  ? true : false }
                            // style ={Variable.myInfo.email !==  undefined && "border-color: rgb(37, 249, 48);"} 
                            />
                          </div>
                        </div>
                        {/* <Select options={optionsSelect.contactsSelectorTitles} callback={selectCallBack} /> */}
                        <div>
                          <label for="">{Variable.lang.label.message}</label>
                          <If
                            data={formInputs.text.error != ""}
                            dataIf={
                              <div class="error-div" style="display: block">
                                <div class="error-div-variant">{Variable.lang.error_div.not_empty_input}</div>
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
              <div class="contacts_info" style={`${formInputs.messageSent != "" ? "margin-top: 20px" : ""}`}>
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
        </div>
      );
    }
  );
};

export default start;
