import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({
  className,
  children,
  resetClass,
  title,
  backSeat,
}) {
  let classACtive = ["section", className];
  if (resetClass) {
    classACtive = className;
  }
  return (
    <section class={classACtive}>
      {title ? title : null}

      {children}

      {backSeat ? <img class={backSeat.class} src={backSeat.src} /> : null}
    </section>
  );
};

export default forExport;
