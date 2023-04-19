import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';

const ModalFilterCoin = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })

  load({
    ID,
    fnLoad: () => {

    },
    fn: () => {
      return (
        <div class="c-modal c-modal--open">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h2 class="c-modal__title">ТЕКСТ</h2>
              <button
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
            </header>
          </section>

        </div>
      )
    }
  })
}

export default ModalFilterCoin;