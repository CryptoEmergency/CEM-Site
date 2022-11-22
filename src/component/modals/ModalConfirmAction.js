import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemjs";
import { Avatar } from "@component/element/Avatar.js";

const ModalConfirmAction = function ({ action, text }, ID) {
  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalWhoLike">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <button
                type="button"
                class="c-modal__close"
                onclick={() => { Variable.DelModals(ID) }}
              ></button>
            </header>
            <div class="c-modal__body">
              <div class="modal_doRole">
                  <p>{text}</p>
                  <div
                    onclick={action}
                  >
                      {Variable.lang.button.apply}
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