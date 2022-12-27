import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  parsingUrl,
  init
} from "@betarost/cemjs";
import { fn } from "@src/functions/index.js";



const ModalLanguageSite = function (data, ID) {
  let close = true
  init(
    () => {

    },
    () => {
      return (
        <div class="c-modal c-modal--open" onclick={function(e){ if(close){ 
  
					fn.modals.close(ID)
				  }}}>
          <section class="c-modal__dialog"  onmouseover={function(){
           
           close = false
    
         }}
         onmouseleave={function(){
           
          close = true
      
           }}>
            <header class="c-modal__header c-modal__header--nopadding">
              <h4 class="c-changelanguage__title">{Variable.lang.h.modal_listLanguage}</h4>
              <button
                class="c-modal__close"
                onclick={() => {
                  Variable.DelModals("ModalLanguageSite");
                  // initReload("modals");
                }}
              ></button>
            </header>
            <div class="c-modal__body c-changelanguage">
              <ul class="c-changelanguage__list" >
                {Object.keys(Variable.languages).map(function (key) {
                  return (
                    <li class="c-changelanguage__item">
                      <a
                        class="c-changelanguage__link"
                        href={"/" + key + "/" + Variable.dataUrl.adress}
                        onclick={function (e) {
                          e.preventDefault();
                          // elem().hidden = true
                          history.pushState(null, null, this.href);
                          parsingUrl()
                          // Variable.DelModals("ModalLanguageSite");
                        }}
                      >
                        <span class="c-changelanguage__text">{Variable.languages[key].lang_orig}</span></a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      );
    }, ID)

};

export default ModalLanguageSite;
