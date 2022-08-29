import {
  jsx,
  jsxFrag,
  setVariable,
  getVariable,
  setAction,
  makeDOM,
  getStorage,
} from "@betarost/cemjs";
import { init as mainHeader } from "@navigation/header/index.js";
import {init as mainFooter} from '@navigation/footer/index.js';
import contacts_vector from "@assets/image/background/contacts_vector.svg";

const ID = "mainBlock";
setVariable({ header: true });
setVariable({ footer: true });

const contactsView = function () {
  const lang = getVariable("languages")[getStorage("lang")];

  return (
    <div class="contacts_container">
      <img class="background_vector" src={contacts_vector} />
      <div class="contacts_content">
        <div class="contacts_form_block">
          <div class="contacts_form">
            <h4>{lang.h.contact}</h4>
            <p>{lang.p.writeUs}</p>
            <form id="contactsForm" data-button_id="sendContacts">
              <input style="display: none;" type="submit" />
              <div>
                <label for="">{lang.label.name}</label>
                <div class="error-div">{lang.error_div.not_empty_input}</div>
                <div class="contacts_form_name_icon">
                  <input
                    id="contacts_name"
                    placeholder={lang.placeholder.name}
                    class="contacts_form_name"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label for="">{lang.label.email}</label>
                <div class="error-div">{lang.error_div.wrong_email}</div>
                <div class="contacts_form_email_icon">
                  <input
                    id="contacts_email"
                    placeholder={lang.placeholder.email}
                    class="contacts_form_email"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label for="">{lang.label.message}</label>
                <div class="error-div">{lang.error_div.not_empty_input}</div>
                <div>
                  <textarea
                    id="contacts_text"
                    placeholder={lang.placeholder.message}
                  ></textarea>
                </div>
                <div id="sendContacts" data-action="sendContacts">
                  <a class="btn-contacts">
                    <span>{lang.button.send}</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="contacts_info">
            <span class="contact_info_label">{lang.span.adress}:</span>
            <span class="contact_info_text">{lang.span.addressFull}</span>
            <span class="contact_info_label">{lang.span.branch}:</span>
            <span class="contact_info_text">{lang.span.branchAdress}</span>
            <span class="contact_info_label">E-mail:</span>
            <a href="contact_us:info@crypto-emergency.com"><span class="contact_info_text">contact_us@crypto-emergency.com</span></a>
        </div>
      </div>
    </div>
  );
};

const befor = function (dataUrl) {
  mainHeader(dataUrl);
  mainFooter(dataUrl);
};

const start = function (dataUrl) {
  console.log("start contact");
  makeDOM(contactsView(), ID);
};

const after = function (dataUrl) {};

setAction(ID, "befor", befor);
setAction(ID, "start", start);
setAction(ID, "after", after);

const init = function (dataUrl) {
  befor(dataUrl);
  start(dataUrl);
  after(dataUrl);
};

export default init;
