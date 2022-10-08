import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemjs";

const NewsCategory = function ({ activeCategory, items, callBack }) {

  return (
    <div class="tags">
      <div
        class={['tag_button', activeCategory == "All" ? 'tag_button_active' : null]}
        data-name="All"
        onclick={callBack}
      >
        <span>{Variable.lang.categoryName.all}</span>
      </div>
      {items.list_records.filter((item) => item.name !== null).map((item) => {
        return (
          <div
            class={['tag_button', activeCategory == item.name ? 'tag_button_active' : null]}
            data-name={item.name}
            onclick={callBack}
          >
            <span>{Variable.lang.categoryName[item.name]}</span>
          </div>
        );
      })}
    </div>
  )
}
//I check
export { NewsCategory }









// export default async function NewsCategory() {
//   const lang = getVariable("languages")[getStorage("lang")];
//   console.log(lang);
//   const response = checkAnswerApi(
//     await sendApi.create("getCategories", {
//       filter: {
//         type: "news",
//         "count.ru": {
//           $gt: 0,
//         },
//       },
//     })
//   );
//   console.log("category", response);
//   return (<div>Category</div>)
// }


