import { jsx, jsxFrag, initReload } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ href, link, className, resetClass, children }) {
  let classACtive = ["card-link", className];
  if (resetClass) {
    classACtive = className;
  }
  let onclick = null;
  if (link && link.type) {
    if (link.type == "modal") {
      if (typeof link.data == "string") {
        onclick = function (e) {
          fn.siteLinkModal(link.data);
        };
      } else {
        onclick = function (e) {
          fn.siteLinkModal(e, link.data);
        };
      }
    }
  }

  return (
    <a class={classACtive} href={href} onclick={onclick}>
      {children}
    </a>
  );
};

export default forExport;
