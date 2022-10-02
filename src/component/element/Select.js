import {
  jsx,
  jsxFrag,
  Variable,
  getValue,
  initReload
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
// changeSelect, type, selectObject, ID, selectTitle



const Select = function ({ options, callback, toggler = null }) {
  let optionsActive

  const changeSelect = (e, selectIndex) => {

    e.stopPropagation()
    options.open = false
    options.items.map((item, index) => {
      if (selectIndex == index) {
        options.active = item.value
        item.active = true
      } else {
        item.active = false
      }
    })
    callback(options.active, options.nameOptions)
    //initReload();
  }

  const optionsElem = options.items.map((item, index) => {
    if (options.active == item.value) {
      optionsActive = item.text
    }
    return (
      <li
        onClick={(e) => changeSelect(e, index)}
      >
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
          onClick={() => {
            options.open = !options.open
            initReload();
          }}
        >
          {optionsActive}
        </div>
        <ul
          class="justselect-list"
          style={options.open ? "display:block" : "display : none"}
        >
          {optionsElem}
        </ul>
      </div>
      <If
        data={toggler}
        dataIf={<img data-sort="DESC" class="filter_sort_toggler" data-action="toggleFilterSort" src={svg.filter_arrow_bottom} />}
      />
    </div>
  );
};

export { Select };
