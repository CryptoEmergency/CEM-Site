import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({
  className,
  children,
  resetClass,
  title,
  backSeat,
  ElemVisible = () => { }
}) {
  let classACtive = ["section", className];
  if (resetClass) {
    classACtive = className;
  }
  return (
    <section class={classACtive} ElemVisible={ElemVisible}>
      {title ? <h2>{title}</h2> : null}

      {children}

      {backSeat ? <img class={backSeat.class} src={backSeat.src} /> : null}
    </section>
  );
};

export default forExport;
