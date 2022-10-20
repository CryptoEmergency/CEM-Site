import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { If } from '@component/helpers/All.js';
import { allValidation } from "@src/functions.js";

let elem = Variable.setRef()
let formInputs


const sendMessage = async function (e) {
    e.preventDefault();
    if (!formInputs.isValid) {
        return false
      }
      const name = formInputs.name.value;
      const email = formInputs.email.value;
      const text = '*Сообщение со страницы форума: *' + formInputs.text.value;
      const data = await sendApi.create("supportMessage", {
        value: { email, name, text },
      });
      if (data.status === "ok") {
        Variable.DelModals("ModalForumMessage")
      }
    return
}

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

const ModalForumMessage = function () {

    initOne(
        () => {
            Variable.OutHideWindows.push([elem, "ModalForumMessage"])
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
        }
    )


    return (
        <div class="c-modal c-modal--open" id="ModalForumMessage">
            <section class="c-modal__dialog" ref={elem}>
                <header class="c-modal__header">
                    <h2 class="c-modal__title"></h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => {
                            Variable.DelModals("ModalForumMessage")
                        }}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class="contacts_form" style="border: 0; background: inherit; padding: 0; padding-bottom: 20px">
                        <h4>{Variable.lang.h.contact}</h4>
                        <p>{Variable.lang.p.writeUs}</p>
                        <form onsubmit={sendMessage}>
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
                </div>
            </section>
        </div>
    )
};

export default ModalForumMessage;