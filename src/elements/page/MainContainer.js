import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({ title, className, children, resetClass }) {
  let classACtive = ["page-container", className];
  if (resetClass) {
    classACtive = className;
  }
  return (
    <div class="page-inner">
      <div class={classACtive}>
        {title ? (
          <div>
            <h1>{title}</h1>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default forExport;
