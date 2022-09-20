import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
} from "@betarost/cemjs";
import { getTradeOrExchangeList } from "@src/apiFunctions.js";
import svg from "@assets/svg/index.js";


const start = function () {
  let tradeList, count;

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const clickButton = async () => {
    count++;
    let tmp = await getTradeOrExchangeList("getTrade",count);
    tradeList.list_records.push(...tmp.list_records);
    initReload();
  };

  init(
    async () => {
      count = 0;
      tradeList = await getTradeOrExchangeList("getTrade");
    },
    () => {
      return (
        <div
          class={`${
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
          } c-aboutus about_us_container`}
        >
          <div
            class="crypto_exchanges crypto_exchanges_full_page"
            id="crypto_exchanges"
          >
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
              {tradeList.list_records.map((item, i) => {
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
                            <img class="crypto_coin_icon" src={item.logo}/>
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
                data-action="viewAllButton"
                style={
                  tradeList.list_records.length === tradeList.totalFound
                    ? "display: none"
                    : "display: flex"
                }
                data-type="trade_category"
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

// import {
//   jsx,
//   jsxFrag,
//   getVariable,
//   makeDOM,
//   getStorage,
//   setValue,
//   getValue,
//   sendApi,
// } from "@betarost/cemjs";
// import { checkAnswerApi, getExchangeOrTradeList } from "@src/functions.js";
// import svg from "@assets/svg/index.js";

// let count = 0;
// const getTradeList = async (firstLoad) => {
//   let data = {};
//   if (firstLoad) {
//     data = {
//       limit: 20,
//       sort: {
//         score: -1,
//       },
//     };
//   } else {
//     data = {
//       limit: 50,
//       offset: 20 + 50 * (count - 1),
//     };
//   }
//   let response = checkAnswerApi(await sendApi.create("getTrade", data));
//   if (firstLoad) {
//     return response;
//   } else {
//     let prevList = getValue(ID, "tradeList");
//     response.list_records = [
//       ...prevList.list_records,
//       ...response.list_records,
//     ];
//     setValue(ID, "tradeList", response);
//     init(true);
//   }

// };

// const tradeListView = function () {
//   const lang = getVariable("languages")[getStorage("lang")];
//   const tradeList = getValue(ID, "tradeList");
//   console.log("tradeList", tradeList.list_records);

//   return (
//     <div class="page-content">
//       <div
//         class="crypto_exchanges crypto_exchanges_full_page"
//         id="crypto_exchanges"
//       >
//         <h4>{lang.h.trade}</h4>
//         <div class="statistics-preview list_trade_page">
//           <div class="crypto_exchanges-row">
//             <div class="crypto_exchanges-cell">#</div>
//             <div class="crypto_exchanges-cell">
//               {lang.tableTitle.appellation}
//             </div>
//             <div class="crypto_exchanges-cell">{lang.tableTitle.volume}</div>
//             <div class="crypto_exchanges-cell">
//               {lang.tableTitle.countVisitors}
//             </div>
//             <div class="crypto_exchanges-cell">{lang.tableTitle.chart}</div>
//             <div></div>
//           </div>
//           {

//             tradeList.list_records.map((item, i) => {

//               return (
//                 <a
//                   href={item.url}
//                   class="crypto_exchanges-row"
//                   target="_blank"
//                   rel="nofollow noopener"
//                   data-type="trade"
//                   data-count={item.marketId}
//                 >
//                   <div class="crypto_exchanges-cell">{i + 1}.</div>
//                   <div class="crypto_exchanges-cell">
//                     <div>
//                       <span>
//                         <span class="list_exanges_image_container">
//                           <img class="crypto_coin_icon" src={item.logo} />
//                         </span>
//                         {item.name}
//                       </span>
//                     </div>
//                   </div>
//                   <div class="crypto_exchanges-cell">
//                     <div>
//                       <span class="crypto_exchanges_percent_green">
//                         <span class="crypto_exchanges_percent_green_mobile">
//                           <img src={svg["exange_money"]} />
//                         </span>
//                         ${item.spotVolumeUsd}
//                       </span>
//                     </div>
//                   </div>
//                   <div class="crypto_exchanges-cell">
//                     <div>
//                       <span class="crypto_exchanges_percent_green">
//                         <span class="crypto_exchanges_percent_green_mobile">
//                           <img src={svg["exange_visitors"]} />
//                         </span>
//                         {item.weeklyVisits}
//                       </span>
//                     </div>
//                   </div>
//                   <div class="crypto_exchanges-cell">
//                     <img src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${item.marketId}.svg`} />
//                   </div>
//                   <div class="crypto_exchanges_cell_button">
//                     <div class="button-container-preview">
//                       <span class="btn-news-preview">
//                         <span>
//                           {lang.button.trade}
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                 </a>
//               );
//             })}
//         </div>
//         <a class="btn-view-all-a"
//           onclick={(e) => {
//             count = count + 1;
//             return getTradeList(false)
//           }
//           }
//         // onclick={() =>{ count = count + 1;
//         //   return getTradeList(false)}
//         //  }
//         >
//           <div
//             class="btn-view-all"
//             data-action="viewAllButton"
//             style={
//               tradeList.list_records.length === tradeList.totalFound
//                 ? "display: none"
//                 : "display: flex"
//             }
//             data-type="trade_category"
//             data-total="{{totalFound}}"
//           >
//             <div>{lang.button.showMore}</div>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

// const ID = "mainBlock";

// const init = async function (reload) {
//   if (!reload) {
//     if (!getValue(ID, "tradeList")) {
//       setValue(ID, "tradeList", await getTradeList(true));
//     }
//   }

//   setValue("mainHeader", "show", true);
//   setValue("mainFooter", "show", true);
//   makeDOM(tradeListView(), ID);
// };

// export default init;
