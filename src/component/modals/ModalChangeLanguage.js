import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

//"alarm_icon" : "confirm_icon"


let inputValue, allLang;



const changeInput = (e) => {
  console.log('=6e9815=',e.target.value)
  inputValue = e.target.value.toLowerCase();
 allLang = Variable.listsLang.filter((item)=>  `${item.eng_name} (${item.orig_name})`.toLowerCase().includes( inputValue) == true )
  console.log('=507201=',allLang)
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
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.Modals = [];
            }}
          ></button>
        </header>
        <div class="c-modal__body">
          <input
            data-language=""
            id="changeLanguageInput"
            type="text"
            data-keyup="changeLanguageModalSendEnter"
            oninput = {changeInput}
          />
          <div class="changeLanguageContainer">
            {/* {Variable.listsLang} */}
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

{
  /* <div class="modal fade" id="changeLanguage" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="ask_question">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <h4>{{lang.h.modal_listLanguage}}</h4>
    <div>
        <input data-language="" id="changeLanguageInput" type="text" data-keyup="changeLanguageModalSendEnter">
        <div class="changeLanguageContainer"></div>
        <div class="changeLanguageEmpty">{{lang.error_div.selectFromList}}</div>
    </div>
</div>
      </div>
    </div>
</div> */
}
