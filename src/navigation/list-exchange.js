import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initGo,
  initReload,
} from "@betarost/cemjs";
import { getDateFormat } from "@src/functions.js";
import { getTradeOrExchangeList } from "@src/apiFunctions.js";
import svg from "@assets/svg/index.js";

const start = function () {
  let listExchange, count;

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const showMore = async () => {
    count++;
    let tmp = await getTradeOrExchangeList("getExchange", count);
    listExchange.list_records.push(...tmp.list_records);
    initReload();
  };

  init(
    async () => {
      count = 0;
      listExchange = await getTradeOrExchangeList("getExchange");
    },
    () => {
      return (
        <div
          class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
            } c-aboutus about_us_container`}
        >
          <div
            class="crypto_exchanges crypto_exchanges_full_page"
            id="crypto_exchange"
          >
            <h4>{Variable.lang.h.exchange}</h4>
            <div class="choose_coins_container">
              <div
                class="choose_coins_summoner"
                data-action="chooseCoinsSummon"
              >
                <span>{Variable.lang.button.chooseCoin}</span>
              </div>
              <div class="choosenCoinList"></div>
            </div>
            <div class="statistics-preview">
              <div class="crypto_exchanges-row">
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.appellation}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.rank}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.coins}
                </div>
                <div class="crypto_exchanges-cell">
                  {Variable.lang.tableTitle.startDate}
                </div>
                <div></div>
              </div>
              {listExchange.list_records.map((item) => {
                return (
                  <a
                    href={item.url}
                    class="crypto_exchanges-row"
                    target="_blank"
                    rel="nofollow noopener"
                    data-type="exchange"
                    data-count={item._id}
                  >
                    <div class="crypto_exchanges-cell">
                      <div>
                        <span>
                          <span class="list_exanges_image_container">
                            <img
                              class="crypto_coin_icon"
                              src={`/assets/upload/exchange/${item.logo}`}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell">
                      <div>
                        {item.score}
                        <img
                          class="crypto_exchanges_rate"
                          src={svg["rate_icon"]}
                        />
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell">
                      <div>
                        {item.list_coins.map((coin) => {
                          return (
                            <div class="crypto_coin_container">
                              <img
                                class="crypto_coin_icons"
                                src={`/assets/icons/coins/${coin.icon}.svg`}
                              />
                              <div class="crypto_coin_description">
                                {coin.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div class="crypto_exchanges-cell exanges_date_create">
                      <span>{getDateFormat(item.startDate)}</span>
                    </div>
                    <div>
                      <div class="button-container-preview">
                        <span class="btn-news-preview">
                          <span>{Variable.lang.button.exchange}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
            <a class="btn-view-all-a" onclick={showMore}>
              <div
                class="btn-view-all"
                data-action="viewAllButton"
                style={
                  listExchange.list_records.length === listExchange.totalFound
                    ? "display: none"
                    : "display: flex"
                }
                data-type="exchange_category"
                data-total="{{totalFound}}"
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
