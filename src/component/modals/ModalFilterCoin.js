import { jsx, jsxFrag, Variable, initReload, init } from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input } from '@component/element/index.js';

let inputValue, allCoin;

const ModalFilterCoin = function (data, ID) {
  let Static = fn.GetParams({ data, ID })
  allCoin = Variable.list_coins
  console.log('=825ac5=', Static)

  let close = true
  init(
    null,
    () => {
      return (
        <div
          class="c-modal c-modal--open"
          onclick={function (e) {
            if (close) {
              fn.modals.close(ID)
            }
          }}>
          <section
            class="c-modal__dialog"
            onmouseover={function () {
              close = false
            }}
            onmouseleave={function () {
              close = true
            }}>

            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modal_listKoins}</h2>
              <button
                class="c-modal__close"
                onclick={() => {
                  Variable.DelModals("ModalFilterCoin");
                  initReload("modals");
                }}
              ></button>
            </header>

            <div class="c-modal__body">
              <div class="filterKoinContainer">
                {/* {allCoin.map((item) => {
                  let str = `${item.eng_name} (${item.orig_name})`

                  return <div class="changeLanguageItem" onclick={() => { data.onclick(item.code, item.eng_name, item.orig_name); Variable.DelModals("ModalFilterCoin"); }}>{str}</div>
                })} */}
              </div>
            </div>
          </section>
        </div>
      );
    }, ID
  )
}

export default ModalFilterCoin;