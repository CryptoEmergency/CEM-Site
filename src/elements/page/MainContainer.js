import { jsx, jsxFrag, Variable, CEM } from "@betarost/cemserver/cem.js";

// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const { images, svg } = CEM

const forExport = function ({
  title,
  header,
  className,
  classTitle,
  children,
  resetClass,
  disableBack,
}) {
  let classACtive = ["page-container", className];
  if (resetClass) {
    classACtive = className;
  }
  return (
    <div class="c-main__body page-inner">
      {header ? header : null}
      <div class={classACtive}>
        {title ? (
          <div>
            <h1 class={classTitle}>{title}</h1>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default forExport;
