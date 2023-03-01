import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";

const forExport = function ({ className, text, onclick }) {
  return (
    <div class={["tag_button", className]} onclick={onclick}>
      <span>{text}</span>
    </div>
  );
};

export default forExport;
