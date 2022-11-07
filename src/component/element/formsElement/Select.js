import {
  jsx,
  jsxFrag,
  Variable,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import svg from '@assets/svg/index.js';

const changeSelect = function (selectIndex, options, callback) {
  let optionsActive
  options.open = false;
  options.items.map((item, index) => {
    if (selectIndex == index) {
      options.active = item.value;
      optionsActive = item.text;
    }
  });
  options.elemActive.innerHTML = optionsActive;
  options.elem.hidden = true;
  callback(options.active, options.nameOptions);
};

const Select = function ({ options, callback, toggler = null }) {
  return (
    <div class="profit_calculator_inputs_container">
      {options.title ? <span>{options.title}</span> : null}
      <div class="justselect-wrapper">
        <div
          class="justselect-title"
          Element={($el) => {
            options.elemActive = $el
          }}
          onClick={(e) => {
            options.open = !options.open;
            if (options.elem.hidden === true) {
              options.elem.hidden = false;
              Variable.OutHideWindows.push([options.elemActive, options.elem]);
            } else {
              options.elem.hidden = true;
            }
            // e.stopPropagation();
          }}
        >
          {() => {
            let tmp = options.items.filter((item) => {
              if (options.active == item.value) {
                return true;
              }
            })
            return tmp[0].text
          }}
        </div>
        <ul
          Element={($el) => {
            options.elem = $el
          }}
          class="justselect-list"
          hidden={true}>
          {() => {
            return options.items.map((item, index) => {
              return (
                <li
                  style={
                    item.text === Variable.lang.h.posts_friends &&
                      (!Variable.auth || Variable.myInfo.subscribed.length === 0)
                      ? "color : grey"
                      : "color : white"
                  }
                  onClick={() => {
                    if (
                      item.text === Variable.lang.h.posts_friends &&
                      (!Variable.auth || Variable.myInfo.subscribed.length === 0)
                    ) {
                      return;
                    } else {
                      changeSelect(index, options, callback);
                    }
                  }}
                >
                  {item.text}
                </li>
              );
            })
          }}
        </ul>
      </div>
      {/* {toggler ? <img class="filter_sort_toggler" src={svg.filter_arrow_bottom} /> : null} */}
    </div>
  );
};
export { Select };
