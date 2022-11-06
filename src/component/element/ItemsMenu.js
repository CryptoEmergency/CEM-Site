import {
  jsx,
  jsxFrag,
  Variable,
} from "@betarost/cemjs";
// check
import svg from "@assets/svg/index.js";

const ItemsMenu = function (data) {
  let items
  if (data && data.items) {
    items = data.items
  }
  return (
    <div
      class={["answer_additionally_toggle", "comment_icon_type-1", !items || !items.length ? "comment_inactive" : null]}
      onclick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (items && items.length) {
          Variable.SetModals({ name: "ModalItemsMenu", data: { items } }, true);
        }
      }}>
      <img class="answer_additionally_toggle_img" src={svg["points"]} />
    </div>
  );
};
export { ItemsMenu };
