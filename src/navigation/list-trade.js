import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { checkAnswerApi } from '@src/functions.js'

const start = function () {

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const clickButton = async () => {
    Variable.MainTrades.list_records.push(...checkAnswerApi(await sendApi.getMainTrades({
      limit: 100,
      offset: Variable.MainTrades.list_records.length
    })).list_records);
    initReload()
  };

  init(
    async () => {

      Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades(
        {
          setIntervalFunc: async () => {
            Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades({
              limit: 100,
              offset: 0,
              name: "PageTrades"
            }))
          },
          limit: 100,
          offset: 0,
          name: "PageTrades"
        }
      )
      )

    },
    () => {
      return (
        <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
          <div class="crypto_exchanges crypto_exchanges_full_page">
            <h4>{Variable.lang.h.trade}</h4>
            <div class="statistics-preview list_trade_page">
              <div class="crypto_exchanges-row">
                <div class="crypto_exchanges-cell">#</div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.appellation}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.volume}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.countVisitors}
                </div>
                <div class="crypto_exchanges-cell">{Variable.lang.tableTitle.chart}</div>
                <div></div>
              </div>
              {Variable.MainTrades.list_records.map((item, i) => {
                return (
                  <a
                    href={item.url}
                    class="crypto_exchanges-row"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    <div class="crypto_exchanges-cell">{i + 1}.</div>
                    <div class="crypto_exchanges-cell">
                      <div>
                        <span>
                          <span class="list_exanges_image_container">
                            <img class="crypto_coin_icon" src={item.logo} />
                          </span>
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell">
                      <div>
                        <span class="crypto_exchanges_percent_green">
                          <span class="crypto_exchanges_percent_green_mobile">
                            <img src={svg["exange_money"]} />
                          </span>
                          ${item.spotVolumeUsd}
                        </span>
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell">
                      <div>
                        <span class="crypto_exchanges_percent_green">
                          <span class="crypto_exchanges_percent_green_mobile">
                            <img src={svg["exange_visitors"]} />
                          </span>
                          {item.weeklyVisits}
                        </span>
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell">
                      <img
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
              })}
            </div>
            <a
              class="btn-view-all-a"
              onclick={clickButton}
            >
              <div
                class="btn-view-all"
                hidden={Variable.MainTrades.list_records.length >= Variable.MainTrades.totalFound}
              // style={
              //   tradeList.list_records.length === tradeList.totalFound
              //     ? "display: none"
              //     : "display: flex"
              // }
              >
                <div>{Variable.lang.button.showMore}</div>
              </div>
            </a>
          </div>
        </div>
      );
    }

  );
};

export default start;