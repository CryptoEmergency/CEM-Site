import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const makeFilter = function () {};

const forExport = function ({ className, text, onclick }) {
  return (
    <div class={["tag_button", className]} onclick={onclick}>
      <span>{text}</span>
    </div>
  );
};

export default forExport;
