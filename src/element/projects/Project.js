import { jsx, jsxFrag, initReload, CEM } from "@betarost/cemserver/cem.js";
const { images, svg, fn } = CEM

const forExport = function ({ records }) {
  return (
    <div class="section-3">
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
