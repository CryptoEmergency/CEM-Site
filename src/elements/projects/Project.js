import { jsx, jsxFrag, initReload } from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ records }) {
  return (
    <div class="c-aboutus__list">
      {records.map((item) => {
        return (
          <a class="c-aboutus__project" target="_blank" href={item.link}>
            <img class="c-aboutus__banner" src={item.src} />
            <span class="c-aboutus__projectcompany">{item.title}</span>
          </a>
        );
      })}
    </div>
  );
};

export default forExport;
