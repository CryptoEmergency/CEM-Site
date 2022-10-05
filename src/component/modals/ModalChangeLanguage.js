import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

//"alarm_icon" : "confirm_icon"


let inputValue, allLang;



const changeInput = (e) => {
  inputValue = e.target.value.toLowerCase();
 allLang = Variable.listsLang.filter((item)=>  `${item.eng_name} (${item.orig_name})`.toLowerCase().includes( inputValue) == true )
  initReload("modals");
}




const ModalChangeLanguage = function (data, reload) {
  if (!reload) {
    inputValue = "" 
    allLang =Variable.listsLang;
  }

  return (
    <div class="c-modal c-modal--open" id="ModalWhoLike">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.h.modal_listLanguage}</h2>
          <button
            class="c-modal__close"
            onclick={() => {
              Variable.Modals = [];
            }}
          ></button>
        </header>
        <div class="c-modal__body">
          <input  data-language=""
            id="changeLanguageInput"
            type="text"
            oninput = {changeInput}
          />
          <div class="changeLanguageContainer">
            {allLang.map((item) => {
              let str = `${item.eng_name} (${item.orig_name})`
              console.log('=ccf1ca=',str)
               return <div class = "changeLanguageItem">{str}</div>
            })}
          </div>
          <div class="changeLanguageEmpty">
            {Variable.lang.error_div.selectFromList}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalChangeLanguage;
