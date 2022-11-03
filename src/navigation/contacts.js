import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload
} from "@betarost/cemjs";
// poydet
import { validator,checkValid } from "@src/functions.js";
import { api } from '@src/apiFunctions.js'
import svg from "@assets/svg/index.js";
import { Jivo, Input, TextArea } from '@component/element/index.js';

const start = function (data, ID = "mainBlock") {
  let Static = {}
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!Static.isValid) {
      return false
    }
    const response = await api({
      type: "set", action: "supportMessage", data: {
        value: { email: Static.email.value, name: Static.name.value, text: Static.message.value },
      }
    })
    if (response.status === "ok") {
      Static.messageSent = true;
    }
    initReload()
  };

  init(
    () => {

      Static = {
        isValid: false,
        messageSent: false
      }

      Static.name = {
        value: "",
        valid: false,
        error: false,
        label: Variable.lang.label.name,
        placeholder: Variable.lang.placeholder.name,
        errorText: Variable.lang.error_div.nicknameErr,
        condition:(value) => {
          return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
        },
        afterValid:() => {
            
          checkValid(Static,["name","email","message"])
        
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
            
          checkValid(Static,["name","email","message"])
        
       }
    }

  
      Static.message = {
        value: "",
        valid: false,
        error: false,
      }

      /**
       * проверка имени и мыла 
       */
      if (Variable.myInfo.nickname) {
        Static.name.value = Variable.myInfo.nickname
        Static.name.valid = true
        Static.name.readonly=true
      }

      if (Variable.myInfo.email) {
        Static.email.value = Variable.myInfo.email
        Static.email.valid = true
        Static.email.readonly=true
      }
    },
    () => {
      return (
        <div class='contacts_container c-main__body'>
          <div class="c-container">
            <div class="contacts_content">
              <div class="contacts_form_block">
                {() => {
                  if (Static.messageSent != "") {
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
                               
                                classDiv="contacts_form_name_icon"
                                Static={Static.name}
                               

                            />
                              <Input
                                classDiv="contacts_form_email_icon"
                                Static={Static.email}
                            />
                          <TextArea
                            label={Variable.lang.label.message}
                            error={Variable.lang.error_div.not_empty_input}
                            placeholder={Variable.lang.placeholder.message}
                            type="text"
                            value={Static.message.value}
                            condition={(value) => {
                              return validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
                            }}
                            afterValid={() => {
                              checkValid(Static,["name","email","message"])
                            }}
                            Static={Static.message}
                          />
                          <div
                           
                            class={['search-button', !Static.isValid ? 'c-button--inactive' : null]}
                            onclick={sendMessage}
                          >
                            {Variable.lang.button.send}
                          </div>
                        </form>
                      </div>
                    )
                  }
                }}
              </div>
              <div class="contacts_info" style={[Static.messageSent ? "margin-top: 20px" : null]}>
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
