import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";

const forExport = function ({ records }) {
  return (
    <div class="list-ico">
      {records.map((item) => {
        return (
          <div class="ico-list_item-wrap">
            <div
              class="ico-list_item"
              onclick={() => {
                fn.siteLinkModal("/list-icostartaps/show/" + item._id, {
                  title: item.title,
                  item,
                });
              }}
            >
              <div class="item-img">
                <img
                  class="item-img_el"
                  src={`/assets/upload/worldPress/${item.icon}`}
                  alt="Startap icon"
                />
              </div>
              <div class="item-info">
                <h5 class="item-title">{item.title}</h5>
                <div class="item-desc_wrap">
                  <p class="item-desc">{item.description}</p>
                </div>
                <div class="item-sum_wrap">
                  <p class="item-sum">
                    <span class="item-sum_obj">
                      ${item.nowMoney && item.nowMoney > 0 ? item.nowMoney : 0}
                    </span>{" "}
                    / ${item.targetMoney}{" "}
                    <span class="item-sum_procent">
                      {Math.round(
                        ((item.nowMoney && item.nowMoney > 0
                          ? item.nowMoney
                          : 0) *
                          100) /
                          item.targetMoney
                      )}
                      %
                    </span>
                  </p>
                </div>
              </div>
              <span class="item-date item-date_start">
                {fn.getDateFormat(item.startDate, "time")}
              </span>
              <span class="item-date item-date_end">
                {fn.getDateFormat(item.endDate, "time")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forExport;
