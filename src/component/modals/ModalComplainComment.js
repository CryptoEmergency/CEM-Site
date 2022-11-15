import { jsx, jsxFrag, Variable, initReload, initGo, init, Static } from "@betarost/cemjs";


let isChecked

const changeComplaint = function (checkdata) {

 
    isChecked[checkdata.name].check = checkdata.check


  if (checkdata.name == "other") {

    //если записали в массив текст
    if (checkdata.value)
    {
      isChecked[checkdata.name].value = checkdata.value
    }

    for (let k in isChecked) {
      
      if (k !== "other")
      {
        isChecked[k].check = false

      }

    }
   
  
  }

 // initReload();
  return;
};




const ModalComplainComment = function ({ data }, ID) {
 
  isChecked = {
    abusive: { check: '', complain: Variable.lang.select.complainOne },
    poison: { check: '', complain: Variable.lang.select.complainTwo  },
    obscene: { check: '', complain: Variable.lang.select.complainThree   },
    malicious: { check: '', complain: Variable.lang.select.complainFour},
    other: { check: '', complain: Variable.lang.select.other, value:"" }
  }

  init(null,() => {


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
                  onChange={function(){
           
                    changeComplaint({ "name": "abusive", "check": this.checked})
                      console.log(isChecked.abusive.check )  
                   // initReload()
                  }}
                  type="checkbox"
                  checked={isChecked.abusive.check ? "checked" : ""}

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
                  onChange={function() { 
                  
                    changeComplaint({ "name": "poison", "check": this.checked }) 
                 
                  }}
                  type="checkbox"
                  checked={isChecked.poison.check ? "checked" : ""}
               
               
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
                  onChange={function() { 
                
                    changeComplaint({ "name": "obscene", "check": this.checked})
                 
                  }}
                  type="checkbox"
                  checked={isChecked.obscene.check ? true : false}

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
                  onChange={function(){ changeComplaint({ "name": "malicious", "check": this.checked }) 
              
                }
                
                }
                  type="checkbox"
                  checked={isChecked.malicious.check ? true : false}
               
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
                  onChange={function (e) {
                    changeComplaint({ "name": "other", "check": this.checked, "value":isChecked.other.value})
           
                  }}
                  type="checkbox"
                  checked={isChecked.other.check ? true : false }

                />
                <label data-complain_id="5" class="checkbox__label">
                  {Variable.lang.select.other}
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>

            <div
              style={
           
                    isChecked.other.check ?
                      "display: block"
                     : "display: none"
              }
              contenteditable="true"
              class="complain_other"
              data-keyup="complainKeyup"
              data-onpaste="editorPaste"
              oninput={function(){
              
                changeComplaint({ "name": "other", "check": isChecked.other.check, "value":this.textContent })
              //  initReload();
              }}

            ></div>

            <div
              class="registration-btn registration-btn"
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
              <a class="btn-gr-reg" onclick={() => { 
                
                console.log(isChecked)
              }
              }>
                <span>{Variable.lang.button.send}</span>
              </a>
            </div>
          </div>
        </header>
      </section>
    </div>
 
  );
}, ID
)};

export default ModalComplainComment;
