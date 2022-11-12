import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import images from '@assets/images/index.js';
import { validator, checkValid } from "@src/functions.js";
import { Input } from '@component/element/index.js';
import { fn } from '@src/functions/index.js';


let inputValue, allCountries;


const changeInput = (e) => {
  inputValue = e.target.value.toLowerCase();
  allCountries = Variable.allCountries.filter((item) => item.na.toLowerCase().includes(inputValue) == true)
  initReload("modals");
}

// let Static = {}
const ModalSelectCountry = function (data, ID) {
  let Static = fn.GetParams({ data, ID })

  allCountries = Variable.allCountries;


  Static.changeCountry = {
    value: "",
    valid: false,
    error: false,
    type: "text",
    condition: async (value) => {
      if (await checkBefore(Static, value)) {
        return true
      }
    },
    afterValid: () => {

      checkValid(Static, ["changeCountry"])

    }
  }

  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open" id="ModalSelectCountry">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modal_changeCountry}</h2>
              <button
                type="button"
                class="c-modal__close"
                onclick={() => {
                  Variable.DelModals("ModalSelectCountry");
                  initReload("modals");
                }}
              ></button>
            </header>
            <div class="c-modal__body">
              <Input classDiv="" Static={Static.changeCountry} />
              <div class="changeCityContainer">
                {allCountries.map((item) => {
                  return <div class="changeCityItem"
                    onclick={() => { data.onclick(item.co, item.na); Variable.DelModals("ModalSelectCountry"); }}
                  // onclick = {() => {data.changeCountry(item.na)}}
                  ><img src={images.blank} class={`flag flag-${item.co}`} />{item.na}</div>
                })}
              </div>
              <div style="display: none;" class="changeCityEmpty">
                {Variable.lang.error_div.selectFromList}
              </div>
            </div>
          </section>
        </div>
      );
    }, ID
  )



};

export default ModalSelectCountry;
