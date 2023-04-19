import { Variable, fn, HiddenOut } from "@betarost/cemserver/cem.js";

const forExport = function (e) {
  // console.log('=2d6cb1=', HiddenOut, e.target)
  try {

    HiddenOut.forEach((item, index) => {
      // console.log('=2fb761=', document.body.contains(item.el), item.el === e.target, item.el.contains(e.target))
      if (item.time + 1 > Math.round(new Date() / 1000)) {
        return
      }
      if (!document.body.contains(item.el)) {
        HiddenOut.splice(index, 1);
        return;
      }
      if (item.el !== e.target && !item.el.contains(e.target)) {
        // console.log('=fcb6f1=', 123)
        if (typeof item.value == "string") {
          fn.modals.close(item.value)
        } else if (typeof item.value == "function") {
          item.value()
        } else {
          item.el.hidden = true;
        }
        HiddenOut.splice(index, 1);
      }

    });

  } catch (error) {
    console.error("clickHide", error)
  }

  return
};

export default forExport