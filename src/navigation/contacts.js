import {
  jsx,
  jsxFrag,
  getValue,
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
  name : false,
  email : false,
  description : false
}


const changeInput = (e,type) => {

  if(type == "email" && !validator.isEmail(e.target.value.trim())){
    error[type] = true
    setValue(ID, "isValid", false)

    init(true);
    return
  }

  if(type !== "email" && !validator.isLength(e.target.value.trim(),{min:2, max: undefined})){
    error[type] = true;
    setValue(ID, "isValid", false);
    init(true);
    return
  }
  
  error[type] = false
  if(!error.name && !error.email && !error.description){
    setValue(ID, "isValid", true);
    return
  }else{
    setValue(ID, "isValid", false);
     init(true);
    return
  }
  
 

  // console.log("test=",getValue(ID, "isValid"),ID)
  // setValue(ID, "isValid", false)


  // valid[type] = e.target.value.trim();
  // let tmp = validator.isEmail(valid.email)
  // console.log(tmp)
  // if(tmp){
  //   setValue(ID, "isValid", true)
  // }
  // type === "email" ?  setValue(ID, "isValid", validator.isEmail(e.target.value.trim()))  : 
  // error[type] = validator.isLength(valid[type],{min:2, max: undefined})
  // console.log(validator.isEmail(valid.email))
  // console.log("gggg",getValue(ID, "isValid"))
  // console.log(error);
}

const contactsView = function (reload) {

  if(!reload){
    var tmp = false;
  }


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
                <div class="error-div"style={error.name ? "display : block" : "display : none"}>{lang.error_div.not_empty_input}</div>
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
                <div class="error-div" style={error.email ? "display : block" : "display : none"}>{lang.error_div.wrong_email}</div>
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
                <div class="error-div" style={error.description ? "display : block" : "display : none"}>{lang.error_div.not_empty_input}</div>
                <div>
                  <textarea
                    id="contacts_text"
                    placeholder={lang.placeholder.message}
                    value = {valid.description}
                    oninput = {(e) => changeInput(e,"description")}
                  ></textarea>
                </div>
                <div id="sendContacts" style = {getValue(ID, "isValid") ? "display: block" : "display:none"} data-action="sendContacts">
                  <a class="btn-contacts"  >
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

const init = function (reload = false) {
 
  if(!reload){
   setValue(ID, "isValid", false)
  }
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  const dataUrl = getVariable("dataUrl")
  makeDOM(contactsView(reload), ID);
};

export default init;
