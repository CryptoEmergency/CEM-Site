import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
  CEM
} from "@betarost/cemserver/cem.js";

import Elements from '@src/elements/export.js';
// import { fn } from '@src/functions/index.js';
// import svg from "@assets/svg/index.js";
import { ButtonShowMore, NotFound } from "@elements/element/index.js";

const { svg, fn } = CEM

const showBtn = function (Static) {
  return listCategories.map((item) => {
    return (
      <div
        class={[
          "tag_button",
          "tag_button-startap",
          Static.filtersSearch.categoryActive == item
            ? "tag_button_active"
            : null,
        ]}
        onclick={async () => {
          Static.filtersSearch.categoryActive = item;
          filterExchange = makeFiltersApi(Static)
          Static.records = await fn.socket.get({
            method: "Exchanges",
            params: {
              filter: filterExchange.filter,
              sort: filterExchange.sort,
            }
          });
          initReload();
        }}
      >
        <span>{item}</span>
      </div>
    );
  });
};

const makeFiltersApi = function (Static) {
  let filter = {};
  let sort = { score: -1 };

  if (Static.filtersSearch.categoryActive !== Variable.lang.categoryName.all) {
    filter.category = Static.filtersSearch.categoryActive;
  }

  if (Static.filtersSearch.categoryActive !== Variable.lang.categoryName.all) {
    filter.category = Static.filtersSearch.categoryActive;
  }

  if (Static.filtersSearch.filterCheck) {
    filter.checked = true;
  }

  return { filter, sort };
};

let filterExchange;
let listCategories;

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  listCategories = [
    Variable.lang.categoryName.all,
    "DEX",
    "CEX"
  ]
  Static.filtersSearch = {
    categoryActive: Variable.lang.categoryName.all,
  };
  Static.showMore = true

  load({
    ID,
    fnLoad: async () => {
      Static.nameRecords = "PageTrades"
      // Static.apiFilter = {}
      Static.records = await fn.socket.get({
        method: "Exchanges",
        params: {
          filter: makeFiltersApi(Static),
          sort: { score: -1 }
        }
      })
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="crypto_exchanges_full_page">
          <div id="crypto_exchanges" class="crypto_exchanges">
            <h4>{Variable.lang.h.trade}</h4>
            <div class="tags tags--static">{showBtn(Static)}</div>
            <div class="statistics-preview list_trade_page">
              <div class="crypto_exchanges-row">
                <div class="crypto_exchanges-cell">#</div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.appellation}
                </div>
                {/* <div class="crypto_exchanges-cell">
            {Variable.lang.tableTitle.volume}
          </div> */}
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.rank}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.chart}
                </div>
                <div></div>
              </div>

              {!Static.records?.length ?
                <NotFound />
                : (
                  Static.records.map(function (item, i) {
                    return (
                      <a
                        class="crypto_exchanges-row tradeListLoad"
                        target="_blank"
                        rel="nofollow noopener"
                        data-count={item.marketId}
                        href={item.url}
                      >
                        <div class="crypto_exchanges-cell">{i + 1}.</div>
                        <div class="crypto_exchanges-cell">
                          <div>
                            <span>
                              <span class="list_exanges_image_container ">
                                <img class="crypto_coin_icon" src={`/assets/upload/worldPress/${item.logo}`} />
                              </span>
                              {item.name}
                            </span>
                          </div>
                        </div>

                        {/* <div class="crypto_exchanges-cell">
                  <div>
                    <span
                      class="crypto_exchanges_percent_green "
                      style="margin-right: 50px;"
                    >
                      <span class="crypto_exchanges_percent_green_mobile">
                        <img src={svg.exange_money} />
                      </span>
                      {fn.numFormat(item.spotVolumeUsd)}
                    </span>
                  </div>
                </div> */}

                        <div class="crypto_exchanges-cell">
                          <div>
                            <span
                              class="crypto_exchanges_percent_green"
                              style="margin-right: 50px;"
                            >
                              <span class="crypto_exchanges_percent_green_mobile">
                                <img src={svg.exange_visitors} />
                              </span>
                              {fn.numFormat(item.score)}
                            </span>
                          </div>
                        </div>
                        <div class="crypto_exchanges-cell">
                          <img
                            class=""
                            src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${item.marketId}.svg`}
                          />
                        </div>
                        <div class="crypto_exchanges_cell_button">
                          <div class="button-container-preview">
                            <span class="btn-news-preview">
                              <span>{Variable.lang.button.trade}</span>
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })
                )}
            </div>
          </div>

          <div
            replace={Static.showMore}
            ElemVisible={async () => {
              let tmp = await fn.socket.get({
                method: "Exchanges",
                params: {
                  filter: makeFiltersApi(Static),
                  sort: { score: -1 },
                  limit: 50,
                  offset: Static.records.length
                }
              })

              if (!tmp || !tmp.length) {
                Static.showMore = false
              } else {
                Static.records.push(...tmp)
              }

              initReload()
            }}>
          </div>

        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;