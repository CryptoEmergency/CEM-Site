import {
  jsx,
  jsxFrag,
  Variable,
  init,
  timersStart,
  timersStop
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
const ModalNeedAuth = function (data, ID) {

  let isEmpty = Object.entries(data).length === 0;


 let g1,g2
 if(isEmpty)
 {
  g1 = Variable.lang.h.modal_needAuth;
  g2 = Variable.lang.p.needAuth
 }
 else{
  g1 = "Так и будем дальше нажимать?"
  g2 = "Давайте вести счёт!"
 }

  init(
    () => {
      if(isEmpty){
      timersStart("needAuth", () => {
        fn.modals.ModalAuth()
        timersStop("needAuth");
      }, 1500, "timeout")}else{
        timersStart("needAuth", () => {
          fn.modals.close(ID)
          timersStop("needAuth");
        }, 2500, "timeout")
      }
    },
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalNeedAuth">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h4>{g1}</h4>
            </header>
            <div class="c-modal__body">
              <p>{g2}</p>
            </div>
          </section>
        </div>
      );
    }, ID
  )
};
export default ModalNeedAuth;
// OK