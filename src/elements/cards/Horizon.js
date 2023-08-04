import { jsx, jsxFrag, CEM } from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

const forExport = function ({ records }) {
  console.log('=ffc493=',records)
  return (
    <div class={["list-ico", records.length ? null : "list-ico_empty"]}>
      {
        records.length ? (
          records.map((item) => {
            return (
              <div class="ico-list_item-wrap">
                <div
                  class="ico-list_item"
                  data-href={"/list-icostartaps/show/" + item._id}
                  onclick={(e) => {
                    fn.siteLinkModal(e, {
                      title: item.title,
                      item,
                      items: fn.itemsMenu.ico({
                        url: "/list-icostartaps/show/" + item._id,
                      })
                    });
                  }}
                >
                  <div class="item-category">
                    <span>{item.category}</span>
                  </div>
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
                          ${item.nowMoney && item.nowMoney > 0 ? new Intl.NumberFormat('de-DE').format(item.nowMoney) : 0}
                        </span>{" "}
                        / ${new Intl.NumberFormat('de-DE').format(item.targetMoney)}{" "}
                        <span class="item-sum_procent">
                          {item.targetMoney <= 0
                            ?
                            '0'
                            :
                            Math.round(
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
                  {() => {
                    if (item.dateIsKnow) {
                      return (
                        <span class="item-tba">
                          <img src={svg["calendar_ico"]} />
                          TBA</span>
                      )
                    } else {
                      return (
                        <div>
                          <span class="item-date item-date_start">
                            {fn.getDateFormat(item.startDate)}
                          </span>
                          <span class="item-date item-date_end">
                            {fn.getDateFormat(item.endDate)}
                          </span>
                        </div>
                      )
                    }
                  }}
                </div>
              </div>
            );
          })
        ) : 
        (
          <div class="notFound">
            <span>Records not found in table</span>
            <img src={svg.notFound} />
          </div>
        )
      }



      {/* {records.map((item) => {
        return (
          <div class="ico-list_item-wrap">
            <div
              class="ico-list_item"
              data-href={"/list-icostartaps/show/" + item._id}
              onclick={(e) => {
                fn.siteLinkModal(e, {
                  title: item.title,
                  item,
                  items: fn.itemsMenu.ico({
                    url: "/list-icostartaps/show/" + item._id,
                  })
                });
              }}
            >
              <div class="item-category">
                <span>{item.category}</span>
              </div>
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
                      ${item.nowMoney && item.nowMoney > 0 ? new Intl.NumberFormat('de-DE').format(item.nowMoney) : 0}
                    </span>{" "}
                    / ${new Intl.NumberFormat('de-DE').format(item.targetMoney)}{" "}
                    <span class="item-sum_procent">
                      {item.targetMoney <= 0
                        ?
                        '0'
                        :
                        Math.round(
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
              {() => {
                if (item.dateIsKnow) {
                  return (
                    <span class="item-tba">
                      <img src={svg["calendar_ico"]} />
                      TBA</span>
                  )
                } else {
                  return (
                    <div>
                      <span class="item-date item-date_start">
                        {fn.getDateFormat(item.startDate)}
                      </span>
                      <span class="item-date item-date_end">
                        {fn.getDateFormat(item.endDate)}
                      </span>
                    </div>
                  )
                }
              }}
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default forExport;
