import {
  jsx,
  jsxFrag,
  load,
  init,
  Variable,
  initReload,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';
// import svg from "@assets/svg/index.js";
import Elements from '@src/elements/export.js';
import { NotFound } from "@elements/element/index.js";

const { svg, fn } = CEM

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  Static.showMore = true

  load({
    ID,
    fnLoad: async () => {
      Static.apiFilter = {}
      Static.filterCoins = []
      Static.list_coins = await fn.socket.get({
        method: "ListCoins"
      })
      Static.records = await fn.socket.get({
        method: "Exchangers",
        params: {
          // filter: Static.apiFilter,
        }
      });
      console.log('=566d8d=',Static.records)
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="crypto_exchanges_full_page">
          <div id="crypto_exchange" class="crypto_exchanges">
            <div class="crypto_exchanges-title">
              <h4>{Variable.lang.h.exchange}</h4>

              <img
                class="filter-search_icon"
                src={svg.filter}
                onclick={() => {
                  fn.modals.ModalFilterCoin({
                    list_coins: Static.list_coins,
                    filterCoins: Static.filterCoins,
                    callback: async (filterCoins) => {
                      Static.filterCoins = filterCoins;
                      if (!filterCoins.length) {
                        return;
                      }
                      let filter = { $and: [] };
                      for (let item of filterCoins) {
                        filter["$and"].push({ "list_coins.name": item });
                      }

                      // console.log("=1e34f2=", filterCoins, filter);
                      Static.records = await fn.socket.get({
                        method: "Exchangers",
                        params: {
                          filter: filter,
                          limit: 12,
                        }
                      });
                      initReload()
                    },
                  });
                }}
              ></img>
            </div>

            <div class="checked-coins">
              {Static.filterCoins.length ? (
                <div>
                  {Static.filterCoins.map((item) => {
                    let iconName;
                    Static.list_coins.forEach((el) => {
                      if (el.name == item) {
                        iconName = el.icon;
                        return;
                      }
                    });
                    return (
                      <div class="crypto_coin_container">
                        <img
                          src={`/assets/icons/coins/${iconName}.svg`}
                          class="crypto_coin_icons"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {Static.filterCoins.length ? (
                <span
                  onclick={async () => {
                    Static.records = await fn.socket.get({
                      method: "Exchangers",
                      params: {
                        // filter: Static.apiFilter,
                      }
                    });
                    Static.filterCoins = [];
                    Static.showMore = true

                    initReload();
                  }}
                  class="b-close"
                >
                  X
                </span>
              ) : null}
            </div>

            <div class="statistics-preview list_exchange_page">
              <div class="crypto_exchanges-row">
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.appellation}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.coins}
                </div>
                {/* <div class="crypto_exchanges-cell">
                  <div class="switch">
                    <input type="checkbox"></input>
                  </div>
                </div> */}
              </div>
              {!Static.records?.length ? (
                <NotFound />
              ) : (
                Static.records.map(function (item, i) {
                  return (
                    <a
                      class="crypto_exchanges-row exchangeListLoad"
                      target="_blank"
                      rel="nofollow noopener"
                      href={item.url}
                    >
                      <div class="crypto_exchanges-cell">
                        <div>
                          <span>{item.name}</span>
                        </div>
                      </div>
                      <div class="crypto_exchanges-cell">
                        <div>
                          {item.list_coins.map(function (coin, i) {
                            return (
                              <div class="crypto_coin_container ">
                                <img
                                  class="crypto_coin_icons"
                                  src={`/assets/icons/coins/${coin.icon}.svg`}
                                />
                                <div class="crypto_coin_description">{coin.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div class="btn-wrap">
                        <div class="button-container-preview">
                          <span class="btn-news-preview">
                            <span>{Variable.lang.button.exchange}</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })
              )}
            </div>

            <div
              replace={Static.showMore}
              ElemVisible={async () => {
                let tmp = await fn.socket.get({
                  method: "Exchangers",
                  params: {
                    // filter: Static.apiFilter,
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

            {/* <ButtonShowMore Static={Static} action="getExchange" limit={limit} /> */}
          </div>
        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;
