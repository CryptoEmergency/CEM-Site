import { jsx, jsxFrag, Variable } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const forExport = function ({
  title,
  header,
  className,
  children,
  resetClass,
  disableBack,
}) {
  let classACtive = ["page-container", className];
  if (resetClass) {
    classACtive = className;
  }
  return (
    <div class="page-inner">
      {header ? header : null}
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
