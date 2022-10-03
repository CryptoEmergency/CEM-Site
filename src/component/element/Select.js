import {
  jsx,
  jsxFrag,
  Variable,
  getValue,
  initReload,
  initOne
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
// changeSelect, type, selectObject, ID, selectTitle



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
        // item.active = true
      } else {
        //item.active = false
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
      <li
        onClick={() => { changeSelect(index) }}
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
          ref={options.elemActive}
          onClick={() => {
            options.open = !options.open
            // elem().style = "display:block"
            Variable.OutHideWindows.push(options.elem)
            options.elem().hidden = !options.elem().hidden
          }}
        >
          {optionsActive}
        </div>
        <ul
          ref={options.elem}
          class="justselect-list"
          hidden
        // style={options.open ? "display:none" : "display : none"}
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
