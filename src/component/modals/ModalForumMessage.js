import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
  Helpers,
  init
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import { Input, TextArea } from '@component/element/index.js';

const ModalForumMessage = function (data, ID) {
  let close = true
  let elem = Variable.setRef()
  let Static = {}
  const sendMessage = async function (e) {
    e.preventDefault();
    if (!Static.isValid) {
      return false
    }
    const name = Static.name.value;
    const email = Static.email.value;
    const text = '*Сообщение со страницы форума: *' + Static.text.value;
    const data = await sendApi.create("supportMessage", {
      value: { email, name, text },
    });
    if (data.status === "ok") {
      Variable.DelModals("ModalForumMessage")
    }
    return
  }

  init(
    ()=>{
      Static = {
        isValid: false,
        messageSent: false
      }

      Static.name = {
        value: "",
        valid: false,
        error: false,
        label: Variable.myInfo.nickname,
        placeholder: Variable.lang.placeholder.name,
        errorText: Variable.lang.error_div.nicknameErr,
        condition: (value) => {

          return fn.validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);

        },
        afterValid: () => {

          fn.checkValid(Static, ["name", "email", "text"])

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

          return fn.validator.isEmail(value);
        },
        afterValid: () => {

          fn.checkValid(Static, ["name", "email", "text"])

        }
      }

      Static.text = {
        value: "",
        valid: false,
        error: false,
        label: Variable.lang.label.text,
        error: Variable.lang.error_div.not_empty_input,
        placeholder: Variable.lang.placeholder.message,
        type: "text",
        condition: (value) => {
          return fn.validator.matches(value, /[a-zA-Zа-яА-Яё\d]{2,500}/i);
        },
        afterValid: () => {
          fn.checkValid(Static, ["name", "email", "text"])
        }
      }

      if (Variable.myInfo.nickname) {
        Static.name.value = Variable.myInfo.nickname
        Static.name.valid = true
        Static.name.readonly = true
      }

      if (Variable.myInfo.email) {
        Static.email.value = Variable.myInfo.email
        Static.email.valid = true
        Static.email.readonly = true
      }
    },
    ()=>{
      return (
        <div class="c-modal c-modal--open" id="ModalForumMessage" onclick={function(e){ if(close){ 
  
          fn.modals.close(ID)
          }}}>
          <section class="c-modal__dialog" ref={elem} onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
           close = true
      
           }}>
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
                  <Input classDiv="contacts_form_name_icon" Static={Static.name} />
    
    
                  <Input
                    classDiv="contacts_form_email_icon"
                    Static={Static.email}
                  />
                  <div>
                    <TextArea
                      classDiv=""
                      className=""
                      Static={Static.text}
                    />
                    <div
                      style={Static.isValid ? "display:block; margin-top: 20px;" : "display:none"}
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
    }, ID
  )
};

export default ModalForumMessage;