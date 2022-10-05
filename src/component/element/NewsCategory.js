import {
  jsx,
  jsxFrag,
  Variable
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

// const categoryTemplate = function() {

// }

const NewsCategory = function () {
  console.log("test")
  // const lang = getVariable("languages")[getStorage("lang")];
  // console.log(lang);
  // const response = checkAnswerApi(
  //   await sendApi.create("getCategories", {
  //     filter: {
  //       type: "news",
  //       "count.ru": {
  //         $gt: 0,
  //       },
  //     },
  //   })
  // );
  // console.log("category", response);
  return (
    <div></div>
  )
}

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


