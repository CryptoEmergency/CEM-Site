import {
  jsx,
  jsxFrag,
  Variable,
  initOne
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';

const Select = function ({ options, callback, toggler = null }) {
  let optionsActive

  initOne(
    () => {
      options.elem = Variable.setRef()
      options.elemActive = Variable.setRef()
    }
  )

  const changeSelect = function (selectIndex) {
    options.open = false
    options.items.map((item, index) => {
      if (selectIndex == index) {
        options.active = item.value
        optionsActive = item.text
      }
    })
    options.elemActive().innerHTML = optionsActive
    options.elem().hidden = true
    callback(options.active, options.nameOptions)
  }

  const optionsElem = options.items.map((item, index) => {
    if (options.active == item.value) {
      optionsActive = item.text
    }
    return (
      <li onClick={() => { changeSelect(index) }}>
        {item.text}
      </li>
    );
  })

  return (
    <div class="profit_calculator_inputs_container">
      <If
        data={options.title}
        dataIf={<span>{options.title}</span>}
      />

      <div class="justselect-wrapper">
        <div
          class="justselect-title"
          ref={options.elemActive}
          onClick={(e) => {
            options.open = !options.open
            if (options.elem().hidden === true) {
              options.elem().hidden = false
              Variable.OutHideWindows.push([options.elemActive, options.elem])
            } else {
              options.elem().hidden = true
            }
            // e.stopPropagation();
          }}
        >
          {optionsActive}
        </div>
        <ul
          ref={options.elem}
          class="justselect-list"
          hidden={true}
        >
          {optionsElem}
        </ul>
      </div>
      {/* <If
        data={toggler}
        dataIf={<img class="filter_sort_toggler" src={svg.filter_arrow_bottom} />}
      /> */}
    </div>
  );
};
//I check (Туглер сортировку сделать)
export { Select };
