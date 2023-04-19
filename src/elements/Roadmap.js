import { jsx, jsxFrag, Variable, CEM } from "@betarost/cemserver/cem.js";
const { images, svg, fn } = CEM
const forExport = function ({ records }) {
  return (
    <div class="roadmap-wrap">
      {records.map((item, index) => {
        return (
          <div class={["roadmap_item", `roadmap_item--${index}`]}>
            <div class={["item-card", `item-card--${index}`]}>
              <span class={["year", `year--${index}`]}>{item.description}</span>
              <p class="desc">{item.date}</p>
            </div>

            <div class={["turn", `turn-${index}`]}>
              <img alt={Variable.lang.span.mapDescOne} src={item.src}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forExport;
