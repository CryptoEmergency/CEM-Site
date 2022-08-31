import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue,
} from "@betarost/cemjs";

import validator from 'validator';

import svg from "@assets/svg/index.js";


let valid = {
  name:"",
  email: "",
  description: "",
}

let error = {
  name : true,
  email : true,
  description : true
}

let changeInput = (e,type) => {
  valid[type] = e.target.value.trim();
  type === "email" ? error.email = validator.isEmail(valid.email) : error[type] = validator.isLength(valid[type],{min:2, max: undefined})
  console.log(valid);
  console.log(error)
}

const contactsView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  return (
    <div class="contacts_container">
      <img
        class="background_vector"
        src={svg["background/contacts_vector.svg"]}
      />
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
                    value = {valid.name}
                    oninput = {(e) => changeInput(e,"name")}
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
                    value = {valid.email}
                    oninput = {(e) => changeInput(e,"email")}
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
                    value = {valid.description}
                    oninput = {(e) => changeInput(e,"description")}
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
          <a href="contact_us:info@crypto-emergency.com">
            <span class="contact_info_text">
              contact_us@crypto-emergency.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = function (dataUrl) {
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(contactsView(dataUrl), ID);
};

export default init;
