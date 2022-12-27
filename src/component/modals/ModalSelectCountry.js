import { jsx, jsxFrag, Variable, initReload, init } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import images from '@assets/images/index.js';
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
  let close = true
  let Static = fn.GetParams({ data, ID })

  allCountries = Variable.allCountries;

  Static.changeCountry = {
    value: "",
    valid: false,
    error: false,
    type: "text",
    condition: async (value) => {
      // if (await checkBefore(Static, value)) {
      //   return true
      // }
    },
    afterValid: () => {

      // fn.checkValid(Static, ["changeCountry"])

    }
  }

  init(
    null,
    () => {
 
      return (
        <div class="c-modal c-modal--open" id="ModalSelectCountry"
        nclick={function(e){ if(close){ 

          fn.modals.close(ID)
         }}}>
          <section class="c-modal__dialog" onmouseover={function(){
           
        close = false

          }}
          onmouseleave={function(){
              
             close = true
     
            }}>
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
              {/* <Input classDiv="" Static={Static.changeCountry} oninput={changeInput} /> */}
              <input data-language=""
                id=""
                type="text"
                oninput={changeInput}
              />
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
