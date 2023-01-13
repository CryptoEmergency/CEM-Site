import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemjs";
import { Avatar } from "@component/element/Avatar.js";
import { fn } from '@src/functions/index.js';
const ModalConfirmAction = function ({ action, text, button }, ID) {
  let close = true
  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalWhoLike" onclick={function(e){ if(close){ 
  
          fn.modals.close(ID)
        }}}>
          <section class="c-modal__dialog" onmouseover={function(){
           
           close = false
    
         }}
           onmouseleave={function(){
           
           close = true
      
           }}>
            <header class="c-modal__header">
              <button
                type="button"
                class="c-modal__close"
                onclick={() => { Variable.DelModals(ID) }}
              ></button>
            </header>
            <div class="c-modal__body">
              <div class="modal_doRole">
                  <h5>{text}</h5>
                  <div
                    onclick={action}
                  >
                    <button class="c-button c-button--gradient2">
                      <span class="c-button__text">{button}</span>
                    </button>
                  </div>
              </div>
            </div>
          </section>
        </div>
      );
    }, ID
  )
};
export default ModalConfirmAction;
// OK