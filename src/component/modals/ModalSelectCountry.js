import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import images from '@assets/images/index.js';

//"alarm_icon" : "confirm_icon"




let inputValue, allCountries;


const changeInput = (e) => {
  inputValue = e.target.value.toLowerCase();
  allCountries = Variable.allCountries.filter((item)=>  item.na.toLowerCase().includes( inputValue) == true )
  initReload("modals");
}


const ModalSelectCountry = function (data, reload) {


  if (!reload) {
    inputValue = "" 
    allCountries =Variable.allCountries;
  }
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
          <input
            data-keyup="filterChangeCountryEnter"
            data-language=""
            id="changeCityInput"
            type="text"
            oninput = {changeInput}
          />
          <div class="changeCityContainer">
          {allCountries.map((item) => {
               return<div class = "changeCityItem"
                onclick = {() => {data.changeCountry(item.na)}}
                ><img src={images.blank} class={`flag flag-${item.co}`}/>{item.na}</div>
            })}
          </div>
          <div style="display: none;" class="changeCityEmpty">
            {Variable.lang.error_div.selectFromList}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalSelectCountry;
