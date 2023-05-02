import {
  jsx,
  jsxFrag,
  Variable,
  CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

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

const Select = function ({ options, callback, toggler, icon = false }) {
  let aimg = svg["filter_arrow_bottom"]
  return (
    <div
      class={[
        "profit_calculator_inputs_container",
        (icon && typeof icon == "string") ? `c-select--icon c-select--icon-${icon}` : null
      ]}
    >
      {options.title ? <span>{options.title}</span> : null}
      <div class="justselect-wrapper">
        <div
          class="justselect-title"
          Element={($el) => {
            options.elemActive = $el
          }}
          onClick={(e) => {
            // fn.clickHide()
            options.open = !options.open;
            if (options.elem.hidden === true) {
              options.elem.hidden = false;
              // Variable.OutHideWindows.push([options.elemActive, options.elem]);
            } else {
              options.elem.hidden = true;
            }
            e.stopPropagation();
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
          // HiddenOut={function () {
          //   console.log('=9131fd=', 5555, this)
          //   this.el.hidden = true
          // }}
          HiddenOut={true}
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
      {toggler ? <img class="filter_sort_toggler" onclick={function () {


        if (options.asort == -1) {
          aimg = svg["filter_arrow_top"]
          options.asort = 1
        }
        else {
          options.asort = -1
          aimg = svg["filter_arrow_bottom"]
        }
        this.src = aimg

        callback();
      }} src={aimg} /> : null}
    </div>
  );
};
export { Select };
