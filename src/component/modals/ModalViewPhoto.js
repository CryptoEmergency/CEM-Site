import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';




const ModalViewPhoto = function ({ path }, ID) {
    let [Static] = fn.GetParams({ data: { path } })
    let close = true
    init(
        () => {
            // console.log('=3e2bc4=', path)
        },
        () => {
            return (
                <div class="c-modal c-modal--open" id="" onclick={function(e){ if(close){ 
  
                    fn.modals.close(ID)
                    }}}>
                    <section class="c-modal__dialog c-modal__dialog--lg" onmouseover={function(){
           
           close = false
    
         }}
         onmouseleave={function(){
           
          close = true
      
           }}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_viewImage}</h2>
                            <button
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <img src={`/assets/upload/orig/${path}`} width="100%" height="" />
                        </div>
                        <div class="c-modal__footer"></div>
                    </section >
                </div >
            );
        }, ID
    )


};

export default ModalViewPhoto;