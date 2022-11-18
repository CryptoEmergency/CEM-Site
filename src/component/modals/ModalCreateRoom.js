import { jsx, jsxFrag, Variable, initReload, initGo, init } from "@betarost/cemjs";
import { Input, CheckBox, Select, TextArea } from '@component/element/index.js';
import { fn } from '@src/functions/index.js';


const ModalCreateRoom = function ( data , ID) {

  let [Static] = fn.GetParams({ data, ID })

console.log(Variable.myInfo.country)

  //инпут название
    Static.label ={
    label:"Назвние"
    }
//инпут описание
    Static.Title={
    label:"Описание"
    }
     //инпут язык
     Static.Lang ={
        value: Variable.myInfo.country.code+ ` (${Variable.myInfo.country.orig_name})`,
        label:"Выбирете язык",
        onclick:()=>{
            fn.modals.ModalChangeLanguage({
                onclick: async (langCode, langName, langOrig) => {
           
                    Static.Lang.value= langCode + ` (${langOrig})`
  
                }
              },ID)
        },
        readonly:"readonly",

        }
    //инпут страна
        Static.Country={
        label:"Выбирите страну"
        }
         //инпут заставка
    Static.Screensaver ={
        label:"Загрузить заставку"
        }
 
    
    //приват
    Static.Private={
        checked: false,
        }
    //видимость
    Static.Visible={
        checked: false,

        }
    //кодовое слово
    Static.Confirm={
        label:"придумайте кодовое слово"

        }

        console.log( Static.Lang)
  init(function(){ 

},() => {
//   let active

// if((Static.modal.other.value.length > 2 && Static.modal.activeData.length == 0) || Static.modal.activeData.length > 0)
//   {
//     active =  null
//   }
//   else
//   {
//     active =  "inactive_form_button"
//   }
let active =  null
  return (
    <div class="c-modal c-modal--open" id="ModalComplainComment">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <div class="complain_modal">
            <h4>Создать комнату</h4>
            <button
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
            <div class="complain_error">{Variable.lang.error_div.complain}</div>
            <div class="container-input">
                
                       
                <Input
                    classDiv="input-div"
                    Static={Static.label}
                />
            </div>
            <div class="c-comments__field">
  
                <TextArea 
                       className="text1 create_post_chapter"
                    Static={Static.Title}
                />
            </div>
            <br />
            <div class="container-input">
                
                       
                <Input
                    classDiv="input-div"
                    Static={Static.Lang}
                />
            </div>
            <div class="container-input">
                
                       
                <Input
                    classDiv="input-div"
                    Static={Static.Country}
                />
            </div>
            <div class="container-input">
                
                       
                <Input
                    classDiv="input-div"
                    Static={Static.label}
                />
            </div>
       
            <div class="container-checkbox">
              <div class="checkbox">
                <input
          
                  class="checkbox__input complain_checkbox"
                  
                  onChange={function(e){
                    Static.Private.checked = this.checked
                    initReload()
                  }}
                  type="checkbox"
     
                />
                <label class="checkbox__label">
                 Приватная комната
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
            <div
              style={
           
                Static.Private.checked ?
                      "display: block"
                     : "display: none"
              }>
            <div class="container-input">
                
                       
                <Input
                    classDiv="input-div"
                    Static={Static.Confirm}
                />
            </div>
            </div>
            <div class="container-checkbox">
              <div class="checkbox">
                <input
                  class="checkbox__input complain_checkbox"
                  onChange={function() { 
         
                  }}
                  type="checkbox"
      
                />
                <label class="checkbox__label">
                  Только для друзей
                  <span class="cont_a-link"></span>
                </label>
              </div>
            </div>
           
          
          
            <div class={["registration-btn",active]}>
              <a class="btn-gr-reg" onclick={
                async() => { 
       
              }
              }
              >
                <span>Создать</span>
              </a>
            </div>
          </div>
        </header>
      </section>
    </div>
 
  );
}, ID
)};

export default ModalCreateRoom;
