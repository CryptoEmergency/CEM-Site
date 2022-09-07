import {
  jsx,
  jsxFrag,
  sendApi,
  getValue,
  getVariable,
  makeDOM,
  getStorage,
  setValue,
} from "@betarost/cemjs";
import { allValidation } from '@src/functions.js'
import svg from "@assets/svg/index.js";
import { Select } from "../component/element/Select.js";

let options = [
]

 let formInputs = {
 }


let messageSent = false;
const changeSelect = (e, type, ID, value) => {
  e.stopPropagation()
  let show = getValue(ID, "showObject")[type]
  if(e.target.localName === "li"){
    let tmp = { ...formInputs, [type]: value };
  formInputs = {...tmp};
  }
  setValue(ID, "showObject", {[type]: !show});
}

const changeInput = (e) => {
  setValue(ID, "isValid", true);
  const ID = "mainBlock";
  let inputValue = e.target.value.trim();
  let inputType = e.currentTarget.dataset.type;
  formInputs[inputType].value = inputValue;
  formInputs[inputType].valid = allValidation(inputValue, inputType, /[a-zA-Zа-яА-Яё\d]{2,500}/i
  );
  if(!formInputs[inputType].valid){

    formInputs[inputType].error = "Zapolnite pole " + inputType;
    setValue(ID, "isValid", false);
    init(true);
   return
  }else{
    formInputs[inputType].error = "";
  }
  let isCheckAll = Object.keys(formInputs).filter((key) => {
    if(key !== "selectContact" && !formInputs[key].valid){
      return true
    }
  });
  if (isCheckAll.length === 0) {
    setValue(ID, "isValid", true);
    return
  }else{
    setValue(ID, "isValid", false);
     init(true);
    return
  }

}

const sendMessage = async () => {
    const name = formInputs.name.value;
    const email = formInputs.email.value;
    const text = formInputs.text.value;
    const select = formInputs.selectContact;
   const data = await sendApi.create("supportMessage",{value:{email,name,text,select}});
   console.log(data)
   if(data.status === 'ok'){
      messageSent = true
   }
   init(true);

}




const contactsView = function (reload) {
  const lang = getVariable("languages")[getStorage("lang")];
  return (
    <div class="contacts_container">
      <img
        class="background_vector"
        src={svg["background/contacts_vector"]}
      />
      <div class="contacts_content">
        <div class="contacts_form_block">
          {messageSent
          ?
          <div class="contacts_form">
              <div class = "modal_success">
              <h4>
                Ваше сообщение отправлено
              </h4>
              <img class = "modal_success_icon"  src = {svg["modal_success"]}  />
            </div> 
          </div>
          :
          <div class="contacts_form">
          <h4>{lang.h.contact}</h4>
          <p>{lang.p.writeUs}</p>
          <form id="contactsForm" data-button_id="sendContacts">
            <input style="display: none;" type="submit" />
            <div>
              <label for="">{lang.label.name}</label>
              <div class="error-div" style={formInputs.name.error ? "display : block" : "display : none"}>{lang.error_div.not_empty_input}</div>
              <div class="contacts_form_name_icon">
                <input
                  id="contacts_name"
                  placeholder={lang.placeholder.name}
                  class="contacts_form_name"
                  type="text"
                  data-type = "name"
                  value = {formInputs.name.value}
                  oninput = {changeInput}
                />
              </div>
            </div>
            <div>
              <label for="">{lang.label.email}</label>
              <div class="error-div" style={formInputs.email.error ? "display : block" : "display : none"}>{lang.error_div.wrong_email}</div>
              <div class="contacts_form_email_icon">
                <input
                  id="contacts_email"
                  placeholder={lang.placeholder.email}
                  class="contacts_form_email"
                  type="text"
                  data-type = "email"
                  value = {formInputs.email.value}
                  oninput = {changeInput}
                />
              </div>
            </div>
            <Select options = {options}  changeSelect = {changeSelect} type = "selectContact" selectObject = {formInputs}  ID = {ID} selectTitle = "Выберите"/>
            <div>
              <label for="">{lang.label.message}</label>
              <div class="error-div" style={formInputs.text.error ? "display : block" : "display : none"}>{lang.error_div.not_empty_input}</div>
              <div>
                <textarea
                  id="contacts_text"
                  placeholder={lang.placeholder.message}
                  value = {formInputs.text.value}
                  data-type = "text"
                  oninput = {changeInput}
                ></textarea>
              </div>
              <div id="sendContacts" style = {getValue(ID, "isValid") ? "display: block" : "display:none"} data-action="sendContacts">
                <a class="btn-contacts"  onclick = {sendMessage} >
                  <span>{lang.button.send}</span>
                </a>
              </div>
            </div>
          </form>
          </div>
           }
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
const init = function (reload) {
  if(!reload){
    const lang = getVariable("languages")[getStorage("lang")];
    setValue(ID, "showObject", {selectContact: false});
 
   setValue(ID, "isValid", false);
   options = [
    {value:"test1"},
    {value:"test2"},
    {value:"test3"},
  ],
   formInputs = {
    name:{  
      value: "",
      valid: false,
      error: ""
    },
    email:{
      value: "",
      valid: false,
      error: ""
    },
    selectContact: options[0].value,
    text:{
      value: "",
      valid: false,
      error: ""
    },
   }
  messageSent = false
  }
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  const dataUrl = getVariable("dataUrl")
  makeDOM(contactsView(reload), ID);
};

export default init;




