import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({ text, className }) {
  return <p class={["", className]}>{text}</p>;
};

export default forExport;
