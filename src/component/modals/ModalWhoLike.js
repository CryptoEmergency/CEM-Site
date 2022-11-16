import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemjs";
import { Avatar } from "@component/element/Avatar.js";

const ModalWhoLike = function ({ whoLike, type }, ID) {
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
              {whoLike && whoLike.length > 0
                ?
                whoLike.map((item) => {
                  if (!type || item.type == type) {
                    return (
                      <div style="display:flex; align-items:center;">
                        <Avatar author={item.author} />
                        <p>{item.author.nickname}</p>
                      </div>
                    )
                  }
                })
                :
                <p>{Variable.lang.text.emptyEva}</p>
              }
            </div>
          </section>
        </div>
      );
    }, ID
  )
};
export default ModalWhoLike;
// OK