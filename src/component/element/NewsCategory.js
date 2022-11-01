import {
  jsx,
  jsxFrag,
  Variable,
  initOne
} from "@betarost/cemjs";

import { api } from '@src/apiFunctions.js'



const NewsCategory = async function ({ type, nameCategory, nameRecords, Static }, reload) {

  await initOne(async () => {
    await api({ type: "get", action: "getCategories", short: true, cache: true, name: nameCategory, filter: { type } })
  })

  return (
    <div class="tags">
      <div
        class={['tag_button', Static.activeCategory == "All" ? 'tag_button_active' : null]}
        onclick={async () => {
          if (Static.activeCategory == "All") {
            return
          }
          Static.activeCategory = "All"
          await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type } })
        }}
      >
        <span>{Variable.lang.categoryName.all}</span>
      </div>
      {() => {
        return Variable.PageBlogCategory.list_records.filter((item) => item.name !== null).map((item) => {
          return (
            <div
              class={['tag_button', Static.activeCategory == item.name ? 'tag_button_active' : null]}
              onclick={async () => {
                if (Static.activeCategory == item.name) {
                  return
                }
                Static.activeCategory = item.name
                await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type, "category.name": Static.activeCategory } })
              }}
            >
              <span>{Variable.lang.categoryName[item.name]}</span>
            </div>
          )
        })
      }}
    </div >
  )
}

export { NewsCategory }