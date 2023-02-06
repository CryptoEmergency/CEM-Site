import { jsx, jsxFrag, Variable, initReload, init } from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input } from '@component/element/index.js';
//"alarm_icon" : "confirm_icon"


let inputValue, allLang;
// let Static = {}


const changeInput = (e) => {
  inputValue = e.target.value.toLowerCase();
  allLang = Variable.listsLang.filter((item) => `${item.eng_name} (${item.orig_name})`.toLowerCase().includes(inputValue) == true)
  initReload("modals");
}




const ModalChangeLanguage = function (data, ID) {
  let Static = fn.GetParams({ data, ID })
  allLang = Variable.listsLang;
  Static.Language = {
    value: "",
    oninput: () => {

    }
  }
  let close = true
  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open" id="changeLanguage" onclick={function (e) {
          if (close) {

            fn.modals.close(ID)
          }
        }}>
          <section class="c-modal__dialog" onmouseover={function () {

            close = false

          }}
            onmouseleave={function () {

              close = true

            }}>
            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modal_listLanguage}</h2>
              <button
                class="c-modal__close"
                onclick={() => {
                  Variable.DelModals("ModalChangeLanguage");
                  initReload("modals");
                }}
              ></button>
            </header>
            <div class="c-modal__body">

              <input data-language=""
                id="changeLanguageInput"
                type="text"
                oninput={changeInput}
              />
              <div class="changeLanguageContainer">
                {allLang.map((item) => {
                  let str = `${item.eng_name} (${item.orig_name})`

                  return <div class="changeLanguageItem" onclick={() => { data.onclick(item.code, item.eng_name, item.orig_name); Variable.DelModals("ModalChangeLanguage"); }}>{str}</div>
                })}
              </div>
              <div class="changeLanguageEmpty">
                {Variable.lang.error_div.selectFromList}
              </div>
            </div>
          </section>
        </div>
      );
    }, ID
  )


};

export default ModalChangeLanguage;
