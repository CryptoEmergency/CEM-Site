import { jsx, jsxFrag, Variable, initReload, init } from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input } from '@component/element/index.js';

let inputValue, allCoin;


const changeInput = (e) => {
  inputValue = e.target.value.toLowerCase();
  allCoin.filter((item) => {
    item.name.toLowerCase().includes(inputValue) == true
  })

  initReload("modals");
}

const ModalFilterCoin = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  // console.log('=f55b45=', Static)
  allCoin = Static.list_coins;
  Static.Coins = {
    value: "",
    oninput: () => {

    }
  }
  console.log('=allcoin=', allCoin)

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
              <h2 class="c-modal__title">Выбрать монеты</h2>
              <button
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID)
                }}
              ></button>
            </header>

            <div class="c-modal__body">
              <input data-coin=""
                id="filterCoinInput"
                type="text"
                class="filter-coinInput"
                oninput={changeInput}
              />
              <div class="filterCoinContainer">


                {allCoin.map((item) => {

                  return (
                    <div class="coin-item"
                      onclick={() => {
                        // Static.callback(item.name)
                        fn.modals.close(ID)
                      }}>
                      <div class="coin-item_img">
                        <img src={`/assets/icons/coins/${item.icon}.svg`}></img>
                      </div>
                      <span class="coin-item_text">{item.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div class="c-modal__footer">
              <button
                class={["c-button", "c-button--gradient2",]}
                type="button"
              >
                <span class="c-button__text">
                  {Variable.lang.button.apply}
                </span>
              </button>
            </div>
          </section>
        </div>
      );
    }, ID
  )
}

export default ModalFilterCoin;