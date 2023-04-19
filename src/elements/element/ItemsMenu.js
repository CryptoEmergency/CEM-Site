import {
  jsx,
  jsxFrag,
  Variable,
  CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

const ItemsMenu = function (data) {

  // console.log('=e04ea6= data =',data)
  let items, author
  if (data) {
    if (data.items) {
      items = data.items
    }

    if (data.author) {
      author = data.author
    }


  }

  return (
    <div
      class={["answer_additionally_toggle", "comment_icon_type-1", !items || !items.length ? "comment_inactive" : null]}
      onclick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (items && items.length) {

          Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
        }
      }}>
      <img class="answer_additionally_toggle_img" src={svg["points"]} />
    </div>
  );
};
export { ItemsMenu };
