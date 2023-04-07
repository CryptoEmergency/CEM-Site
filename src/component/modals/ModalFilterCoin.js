import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  load,
  init,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";

const ModalFilterCoin = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  Static.closeOut = true;
  Static.mouseOut = false;
  Static.allCoin = Static.list_coins;
  // Static.filterCoins = []

  load({
    ID,
    fn: () => {
      return (
        <div
          class="c-modal c-modal--open"
          onclick={function (e) {
            if (Static.mouseOut && Static.closeOut) {
              fn.modals.close(ID);
            }
          }}
        >
          <section
            class="c-modal__dialog"
            onmouseover={function () {
              Static.mouseOut = false;
            }}
            onmouseleave={function () {
              Static.mouseOut = true;
            }}
          >
            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modal_listCoin}</h2>
              <button
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID);
                }}
              ></button>
            </header>

            <div class="c-modal__body">
              <div class="coinForm-wrap">
                <form class="filter-coinForm">
                  <input
                    Element={($el) => {
                      Static.elInput = $el;
                    }}
                    type="text"
                    class="filter-coinInput"
                    placeholder={Variable.lang.h.modal_listCoin}
                    oninput={function () {
                      let searchText = this.value.toLowerCase();
                      Static.allCoin = Static.list_coins.filter((item) => {
                        if (item.name.toLowerCase().includes(searchText)) {
                          return true;
                        }
                      });
                      Static.elBtn.classList.toggle(
                        "content-hidden",
                        !Static.elInput.value
                      );
                      initReload("modals");
                    }}
                  />
                  <span
                    Element={($el) => {
                      Static.elBtn = $el;
                    }}
                    class={["close-icon", "content-hidden"]}
                    onclick={() => {
                      // Static.elForm.reset()
                      Static.allCoin = Static.list_coins;
                      Static.elInput.value = "";
                      initReload("modals");
                    }}
                  >
                    X
                  </span>
                </form>
              </div>

              <div class="filterCoinContainer">
                {Static.allCoin.map((item) => {
                  return (
                    <div
                      class={[
                        "coin-item",
                        Static.filterCoins.includes(item.name)
                          ? "coin-item_active"
                          : null,
                      ]}
                      onclick={() => {
                        if (Static.filterCoins.includes(item.name)) {
                          Static.filterCoins.splice(
                            Static.filterCoins.indexOf(item.name),
                            1
                          );
                        } else {
                          Static.filterCoins.push(item.name);
                        }
                        initReload("modals");
                      }}
                    >
                      <div class="coin-item_img">
                        <img src={`/assets/icons/coins/${item.icon}.svg`}></img>
                      </div>
                      <span class="coin-item_text">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div class="c-modal__footer">
              <button
                class={["c-button", "c-button--gradient2"]}
                type="button"
                onclick={() => {
                  Static.callback(Static.filterCoins);
                  fn.modals.close(ID);
                }}
              >
                <span class="c-button__text">{Variable.lang.button.apply}</span>
              </button>
            </div>
          </section>
        </div>
      );
    },
  });
};

export default ModalFilterCoin;
