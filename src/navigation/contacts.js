import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload,
  load
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input, TextArea, ButtonSubmit } from '@component/element/index.js';
import Elements from '@src/elements/export.js';


const sendMessage = async (Static) => {
  if (!Static.isValid) {
    return false
  }
  const response = await fn.restApi.supportMessage({ email: Static.email.value, name: Static.name.value, text: Static.message.value })
  if (response.status == "ok") {
    Static.messageSent = true;
    Static.submitClick = false;
    initReload()
  } else {
    Static.submitClick = false;
  }
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  load({
    ID,
    fnLoad: () => {
      fn.initData.contacts(Static)
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="contacts_container">
          <div class="c-container">
            <div class="contacts_content">
              <div class="contacts_form_block">
                {
                  Static.messageSent != ""
                    ?
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
                    :
                    <div class="contacts_form">
                      <h4>{Variable.lang.h.contact}</h4>
                      <p>{Variable.lang.p.writeUs}</p>
                      <form id="contactsForm" onsubmit={(e) => { sendMessage(Static) }}>
                        <input style="display: none;" type="submit" />
                        <Input
                          Static={Static.name}
                          classDiv="contacts_form_name_icon"
                        />
                        <Input
                          Static={Static.email}
                          classDiv="contacts_form_email_icon contacts_form_email_icon--center"
                        />
                        <TextArea
                          Static={Static.message}
                        />
                        <ButtonSubmit
                          Static={Static}
                          text={Variable.lang.button.send}
                          onclick={(Static, el) => {
                            sendMessage(Static)
                          }}
                        />
                      </form>
                    </div>
                }
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
            <div class="contacts_donats">
              <a href="https://www.donationalerts.com/r/crypto_emergency" rel="nofollow nooopener" target="_blank" class="c-button c-button--icon">
                <img class="c-button__image" src={svg.donationalerts} width="37" height="43" />
                <span class="c-button__text">{Variable.lang.span.supportProject}</span>
              </a>
            </div>
          </div>
        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;