import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue,
  getValue,
  sendApi,
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";
import svg from "@assets/svg/index.js";

let count = 0;
const getListTrade = async (firstLoad) => {
  let data = {};
  if (firstLoad) {
    data = {
      limit: 20,
      sort: {
        score: -1,
      },
    };
  } else {
    count = count + 1;
    data = {
      limit: 50,
      offset: 20 + 50 * (count - 1),
    };
  }
  let response = checkAnswerApi(await sendApi.create("getTrade", data));
  if (firstLoad) {
    return response;
  } else {
    let prevList = getValue(ID, "listTrade");
    response.list_records = [
      ...prevList.list_records,
      ...response.list_records,
    ];
    setValue(ID, "listTrade", response);
    init(true);
  }
  
};

const listTradeView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const listTrade = getValue(ID, "listTrade");
  console.log("listTrade", listTrade.list_records);

  return (
    <div class="page-content">
      <div
        class="crypto_exchanges crypto_exchanges_full_page"
        id="crypto_exchanges"
      >
        <h4>{lang.h.trade}</h4>
        <div class="statistics-preview list_trade_page">
          <div class="crypto_exchanges-row">
            <div class="crypto_exchanges-cell">#</div>
            <div class="crypto_exchanges-cell">
              {lang.tableTitle.appellation}
            </div>
            <div class="crypto_exchanges-cell">{lang.tableTitle.volume}</div>
            <div class="crypto_exchanges-cell">
              {lang.tableTitle.countVisitors}
            </div>
            <div class="crypto_exchanges-cell">{lang.tableTitle.chart}</div>
            <div></div>
          </div>
          {
          
          listTrade.list_records.map((item, i) => {
           
            return (
              <a
                href={item.url}
                class="crypto_exchanges-row"
                target="_blank"
                rel="nofollow noopener"
                data-type="trade"
                data-count={item.marketId}
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
                    {item.weeklyVisits }
                </span>
            </div>
        </div>
        <div class="crypto_exchanges-cell">
            <img src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${item.marketId}.svg`} /> 
        </div>
        <div class="crypto_exchanges_cell_button">
            <div class="button-container-preview">
                <span class="btn-news-preview">
                    <span>
                        {lang.button.trade}
                    </span>
                </span>
            </div>
        </div>
              </a>
            );
          })}
        </div>
        <a class="btn-view-all-a" onclick={() => getListTrade(false)}>
          <div
            class="btn-view-all"
            data-action="viewAllButton"
            style={
              listTrade.list_records.length === listTrade.totalFound
                ? "display: none"
                : "display: flex"
            }
            data-type="trade_category"
            data-total="{{totalFound}}"
          >
            <div>{lang.button.showMore}</div>
          </div>
        </a>
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = async function (reload) {
  if (!reload) {
    if (!getValue(ID, "listTrade")) {
      setValue(ID, "listTrade", await getListTrade(true));
    }
  }

  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(listTradeView(), ID);
};

export default init;
