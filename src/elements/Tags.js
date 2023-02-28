import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const makeFilter = function () {};

const forExport = function ({ classActive, text, type }) {
  return (
    <div class={["tag_button", classActive]}>
      <span>{text}</span>
    </div>
  );
};

export default forExport;
