import { jsx, jsxFrag, CEM } from "@betarost/cemserver/cem.js";
const { svg } = CEM

// const showContent = function () {
//   this.lastChild.classList.toggle("arrow-toggle");
//   this.nextElementSibling.classList.toggle("content-hidden");
// };

const Accordeon = function ({
  title,
  description,
  hidden,
  Element,
  style,
  className,
  onclick,
  text,
  textClass,
  children,
  reloadActive,
}) {
  return (
    <div class="accordeon-item">
      <div class="accordeon-header" onclick={onclick}>
        <h5 class="accordeon-header_title">{title}</h5>
        <img
          src={svg["arrow-select"]}
          class={["arrow", hidden ? null : "arrow-toggle"]}
        ></img>
      </div>
      <div
        // Element={Element}
        class={["accordeon-content", hidden ? null : "content-show"]}
      >
        {description}
      </div>
    </div>
  );
};
export { Accordeon };