import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemjs";

import { Map } from '@component/helpers/All.js';
const NewsCategory = function ({ activeCategory, items, onclick }) {

  return (
    <div class="tags">
      <div
        class={['tag_button', activeCategory == "All" ? 'tag_button_active' : null]}
        data-name="All"
        onclick={onclick}
      >
        <span>{Variable.lang.categoryName.all}</span>
      </div>
      <Map
        data={items.list_records.filter((item) => item.name !== null)}
        dataIf={
          (item) => {
            return (
              <div
                class={['tag_button', activeCategory == item.name ? 'tag_button_active' : null]}
                data-name={item.name}
                onclick={onclick}
              >
                <span>{Variable.lang.categoryName[item.name]}</span>
              </div>
            );
          }
        }
      />
    </div>
  )
}
//I check
export { NewsCategory }