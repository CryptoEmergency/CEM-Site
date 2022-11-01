import {
  jsx,
  jsxFrag,
  Variable,
  initOne,
  sendApi
} from "@betarost/cemjs";

import { api } from '@src/apiFunctions.js'

const NewsCategory = async function ({ activeCategory, items, onclick }, reload) {

  await initOne(async () => {
    console.log('=dfc4bf=', await api({ type: "get", action: "getCategories", short: true, cache: true, name: "PageBlogCategory", filter: { type: "blog" } }))

    // Variable.PageBlogCategory = await sendApi.send({ action: "getCategories", short: true, cache: true, name: "PageBlogCategory", filter: { type: "blog" } });
    console.log('=b5c42c=', Variable.PageBlogCategory)
  })

  console.log('=711c07=', reload)
  return (
    <div class="tags">
      <div
        class={['tag_button', activeCategory == "All" ? 'tag_button_active' : null]}
        data-name="All"
        onclick={onclick}
      >
        <span>{Variable.lang.categoryName.all}</span>
      </div>
      {() => {
        return Variable.PageBlogCategory.list_records.filter((item) => item.name !== null).map((item) => {
          return (
            <div
              class={['tag_button', activeCategory == item.name ? 'tag_button_active' : null]}
              data-name={item.name}
              onclick={onclick}
            >
              <span>{Variable.lang.categoryName[item.name]}</span>
            </div>
          )
        })
      }}

    </div >
  )
}
//I check
export { NewsCategory }