import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({ src, className }) {
  return (
    <div class={["img-full", className]}>
      <img src={src} />
    </div>
  );
};

export default forExport;
