import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { validator,checkValid } from "@src/functions.js";
import { Input } from '@component/element/index.js';
import { api } from '@src/apiFunctions.js'

let formInputs;
let Static = {}

const ModalAfterRegisterForm = function (data, reload) {
   initOne(() => {

    Static = {
      isValid: false
    }     


    const checkBefore = async function(Static,value){
      // регулярки для никнеймов
      let beginWithoutDigit = /^\D.*$/ // начало с цифры
      let chars = /^.{5,30}$/ // от 5 до 30 символов
      let latinChars = /^[a-zA-Z0-9._]/ // латинские буквы
      let withoutSpaces = /^\S*$/ // без пробелов
      let points = /^(?!.*\.\.)(?!\.)(?!.*\.$)/ // 2 точки или точка в начале или точка в конце
      let underscore = /^(?!.*\_\_)(?!\_)(?!.*\_$)/ // 2 нижних подчеркивания или нижнее подчеркивание в начале или нижнее подчеркивание в конце
      let dash = /^(?!.*\-\-)(?!\-)(?!.*\-$)/ // 2 тире или тире в начале или тире в конце
      let number = /^(?!\d+$)/ // состоит из цифр
      let specialChars = /^(?!.*[!@#$%^&(),+=/\/\]\[{}?><":;!№*|])/ // специальные символы 
      // обявим объект с регулярками
      let arrayRegular = {3:chars,2:beginWithoutDigit,4:latinChars,5:withoutSpaces,6:points,7:underscore,10:dash,8:number,9:specialChars}
      //если значение инпута пустое убираем массив
      if(value.length == 0)
      {
        Static.nickName.errorText = Variable.lang.error_div.nicknameErr
        return false
      }
      else{
      //функция аналог arrayUnique
      const unique = (value, index, self) => { return self.indexOf(value) === index; }
      //объявим переменную куда будем писать текст ошибок
      let errorText = "";
      //если value не пустое перебериаем регулярки и запихиваем их ключи в массив 
      for(let a in arrayRegular){
        if(!validator.matches(value,arrayRegular[a]))
        {
          errorText+=Variable.lang.error_div["nicknameErr"+a]+".\r\n" 
        }
      }
   //если ошибок нет проверим на уникальность имени пользователя
    if(errorText.trim().length == 0)
    {
    let response =  await api({ type: "get", action: "getUsers", filter: {nickname: value} })
    //если ник нейм свободен вернем true
        if(response.result.totalFound == 0)
        {
      return true
        }
        else
        {
      Static.nickName.errorText = Variable.lang.error_div.nicknameErr11
      return false
        }
    }
    //если есть ошибки возращаем ошибки
    else
    {
      Static.nickName.errorText = errorText
      return false
    }
    }
    }

    Static.nickName = {
      value: "",
      valid: false,
      error: false,
      type: "text",
      label: Variable.lang.label.nickName,
      placeholder: Variable.lang.label.nickName,
      errorText: Variable.lang.error_div.nicknameErr,
      condition:async (value) => {
          if(await checkBefore(Static,value))
          {
            return true
          }
          
      },
      afterValid: () => {

        checkValid(Static, ["nickName","language","country"])

      }
    }
    
    Static.language = {
      value:"",
      type:"text",
      valid: false,
      code: "",
      name: "",
      autocomplete:"off",
      placeholder:Variable.lang.error_div.selectFromList,
      onclick: () => {
        Variable.SetModals({
          name: "ModalChangeLanguage", data: {
            onclick: (code, name, orig) => {
              Static.language.value = name + ` (${orig})`
              Static.language.code = code
              Static.language.valid = true
              checkValid(Static, ["nickName","language","country"])
            }
          }
        }, true);
      },
  
    }


    Static.country = {
      value:"",
      type:"text",
      valid: false,
      code: "",
      name: "",
      autocomplete:"off",
      placeholder:Variable.lang.error_div.selectFromList,
      onclick: () => {
        Variable.SetModals({
          name: "ModalSelectCountry", data: {
            onclick: (code, name) => {
              Static.country.value = name
              Static.country.code = code
              Static.country.valid = true
              checkValid(Static, ["nickName","language","country"])
            }
          }
        }, true);
      }
    }

   });

  const sendRegistrationForm = async function (e) {
    e.preventDefault();
    if (!Static.isValid) {
      return false
    }
    let data = {
      value: {
        nickname: Static.nickName.value,
        mainLanguage: Static.language.code,
        country: Static.country.code
      }
    }

    let tmpRes = await sendApi.create("setUsers", data);


    if (tmpRes.status === 'ok') {
      Variable.DelModals("ModalAfterRegisterForm")
      initReload()
    } else {
      Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true);

    }
    return

  }


  return (
    <div class="c-modal c-modal--open" id="ModalAfterRegisterForm">
    <section class="c-modal__dialog">
      <div class="c-modal__body">
        <div
          class="modal fade"
          id="AfterRegister"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-content">
            <div class="after_register_form">
              <h4>{Variable.lang.h.modal_afterReg}</h4>
              <form
                id="afterRegisterForm"
                onsubmit={sendRegistrationForm}
              >
                <input style="display: none;" type="submit" />
                <div>
                  <Input classDiv="" Static={Static.nickName} />
                </div>

                <div>
                  <label>{Variable.lang.label.lang}</label>
                  <div style="display: none;" class="error-div">
                    {Variable.lang.error_div.selectFromList}
                  </div>


                  <div class="language_select_wrapper">
                  <Input classDiv="" Static={Static.language} />
                    <div
                      id="language_search_help"
                      class="language_help_block"
                    ></div>
                    <div class="language_search_help_error dn">
                      <div class="language_help_error"></div>
                    </div>
                  </div>


                </div>
                <label>{Variable.lang.label.country}</label>
                <div style="display: none;" class="error-div">
                  {Variable.lang.error_div.selectFromList}
                </div>
                <div class="country_select_wrapper">
                <Input classDiv="" Static={Static.country} />
                  <div
                    id="country_search_help"
                    class="country_help_block"
                  ></div>
                  <div class="country_search_help_error dn">
                    <div class="country_help_error"></div>
                  </div>
                  <img src={svg["country_icon"]} />
                </div>
              </form>
              <button
                class={[
                  "c-button c-button--gradient2",
                  !Static.isValid ? "c-button--inactive" : "",
                ]}
                type="button"
                onClick={sendRegistrationForm}
              >
                <span class="c-button__text">
                  {Variable.lang.button.send}
                </span>
              </button>             
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ModalAfterRegisterForm;
