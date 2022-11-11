import { jsx, jsxFrag, Variable, initReload, initGo, initOne } from "@betarost/cemjs";
import { sendComplaintApi } from "@src/apiFunctions.js";

let complaint, input, inputValue;

let isChecked


const changeComplaint = function (checkdata) {
  
  if(!checkdata.check)
  {
  isChecked[checkdata.name].check = true
  isChecked[checkdata.name].checked = "checked"
  }
  else{
    isChecked[checkdata.name].check = false
    isChecked[checkdata.name].checked = ""
  }

  if(checkdata.name == "other")
  {

    for(let k in isChecked)
    {
      if(k!=="other")
      isChecked[k].check = false
      isChecked[k].checked = ""
    }
  
    initReload();
  }


  /*
  if (this.dataset.complain == "other") {
    Static.abusive.checked = false;
    isChecked.poison().checked = false;
    isChecked.obscene().checked = false;
    isChecked.malicious().checked = false;
    complaint = [];
  } else {
    isChecked.other().checked = false;
    isCheck
      ? complaint.push(type)
      : (complaint = complaint.filter((item) => item !== type));
  }*/
 // initReload("modals");
  return;
};
/*
const sendComplaint = async (data) => {
  if (
    isChecked.other() !== undefined &&
    (complaint.length > 0 || input().innerText.trim().length > 2)
  ) {
    if (complaint.length > 0) {
      await sendComplaintApi({ data, complaint });
    } else {
      complaint = [`<p>${input().innerText.trim()}</p>`];
      await sendComplaintApi({ data, complaint });
    }
    Variable.Static.answerAdditionally = "";
    Variable.DelModals("ModalComplainComment");
    initReload();

  }
};*/

const ModalComplainComment = function (data, reload) {
   console.log(data)
 initOne(()=>{
  isChecked = {
    abusive: {check:false,complain:Variable.lang.select.complainOne,checked:""},
    poison: {check:false,complain:Variable.lang.select.complainTwo,checked:""},
    obscene: {check:false,complain:Variable.lang.select.complainThree,checked:""},
    malicious: {check:false,complain:Variable.lang.select.complainFour,checked:""},
    other: {check:false,complain:Variable.lang.select.other,checked:""},
  }

 })
  if (!reload) {
    //(input = Static.input), (inputValue = "");
  
    complaint = [];
  }

  return (
    <div class="c-modal c-modal--open" id="ModalComplainComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <div class="complain_modal">
            <h4>{Variable.lang.h.modal_complain}</h4>
            <div class="complain_error">{Variable.lang.error_div.complain}</div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="abusive"
                  class="checkbox__input complain_checkbox"
                  onclick={()=>{
                  
                    changeComplaint({"name":"abusive","checked":"","check":isChecked.abusive.check})}}
                  type="checkbox"
                  checked={isChecked.abusive.checked ? "checked" : ""}

                />
                <label class="checkbox__label">
                  {Variable.lang.select.complainOne}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="poison"
                  class="checkbox__input complain_checkbox"
                  onclick={()=>{changeComplaint({"name":"poison","checked":"","check":isChecked.poison.check})}}
                  type="checkbox"
                  checked={isChecked.poison.checked ? "checked" : ""}
            
                />
                <label class="checkbox__label">
                  {Variable.lang.select.complainTwo}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="obscene"
                  class="checkbox__input complain_checkbox"
                  onclick={()=>{changeComplaint({"name":"obscene","checked":"","check":isChecked.obscene.check})}}
                  type="checkbox"
                  checked={isChecked.obscene.checked  ? "checked" : ""}
          
                />
                <label class="checkbox__label">
                  {Variable.lang.select.complainThree}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="malicious"
                  class="checkbox__input complain_checkbox"
                  onclick={()=>{changeComplaint({"name":"malicious","checked":"","check":isChecked.malicious.check})}}
                  type="checkbox"
                  checked={isChecked.malicious.checked ? "checked" : ""}
              
                />
                <label class="checkbox__label">
                  {Variable.lang.select.complainFour}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  data-complain="other"
                  class="checkbox__input complain_checkbox"
                  onclick={function(e){
                    changeComplaint({"name":"other","checked":"","check":isChecked.other.check})}}
                  type="checkbox"
                  checked={isChecked.other.checked}
       
                />
                <label data-complain_id="5" class="checkbox__label">
                  {Variable.lang.select.other}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>

            <div
              style={
              //  isChecked.other() !== undefined &&
              //    isChecked.other().checked === true
             "display: block"
             //     : "display: none"
              }
              contenteditable="true"
              class="complain_other"
              data-keyup="complainKeyup"
              data-onpaste="editorPaste"
              oninput={() => {
                initReload("modals");
              }}
        
            ></div>

            <div
               class="registration-btn inactive_form_button"
            /* class={[
                "registration-btn",
                
                  (input.length > 2)
                  ? null
                  : "inactive_form_button",
            ]}  */ 
              id="answerComplain"
              data-active="0"
              data-action="answerComplain"
            >
              <a class="btn-gr-reg" onclick={() => {}
              }>
                <span>{Variable.lang.button.send}</span>
              </a>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
};

export default ModalComplainComment;
