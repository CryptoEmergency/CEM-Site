import {
  jsx,
  jsxFrag,
  getStorage,
  sendApi,
  getVariable,
  getValue,
} from "@betarost/cemjs";

const Select = function ({options, changeSelect, type, selectObject, ID, selectTitle}) {
  console.log("options",options)
  return (
    <div class="profit_calculator_inputs_container">
      <span>{selectTitle}</span>
      <div class="justselect-wrapper">
        <div class="justselect-title" onClick={(e) =>{changeSelect(e,type, ID)}}>
          {selectObject[type]}
        </div>
        <ul
          class="justselect-list"
          style={getValue(ID, "showObject")[type] ? "display:block" : "display : none"}
        >
          {options.map((item) => {
            return (
              <li onClick={(e) => changeSelect(e, type, ID, item.value)}>
                {item.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { Select };
