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
 
  init(
    () => {
      timersStart("needAuth", () => {
        fn.modals.ModalAuth()
        timersStop("needAuth");
      }, 1500, "timeout")
    },
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalNeedAuth">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h4>{Variable.lang.h.modal_needAuth}</h4>
            </header>
            <div class="c-modal__body">
              <p>{Variable.lang.p.needAuth}</p>
            </div>
          </section>
        </div>
      );
    }, ID
  )
};
export default ModalNeedAuth;
// OK