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
import { checkAnswerApi,getDateFormat, } from "@src/functions.js";
import svg from "@assets/svg/index.js";

  let count = 0;
  const getExchangeList = async (firstLoad) => {
    let data = {};
    if (firstLoad) {
      data = {
        limit: 10,
        sort: {
          score: -1,
        },
      };
    } else {
      data = {
        limit: 10, //limit12
        offset: 10 + 10 * (count - 1), 
      };
    }
    let response = checkAnswerApi(await sendApi.create("getExchange", data));
    if (firstLoad) {
      return response;
    } else {
      let prevList = getValue(ID, "exchangeList");
      response.list_records = [
        ...prevList.list_records,
        ...response.list_records,
      ];
      setValue(ID, "exchangeList", response);
      init(true);
    }
  };

const exchangeListView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const exchangeList = getValue(ID, "exchangeList");
  console.log("exchangeList", exchangeList.list_records);

  return (
    <div class="page-content">


        
      <div
        class="crypto_exchanges crypto_exchanges_full_page"
        id="crypto_exchange"
      >
        <h4>{lang.h.exchange}</h4>
        <div class="choose_coins_container">
          <div class="choose_coins_summoner" data-action="chooseCoinsSummon">
            <span>{lang.button.chooseCoin}</span>
          </div>
          <div class="choosenCoinList"></div>
        </div>
        <div class="statistics-preview">
          <div class="crypto_exchanges-row">
            <div class="crypto_exchanges-cell">
              {lang.tableTitle.appellation}
            </div>
            <div class="crypto_exchanges-cell">{lang.tableTitle.rank}</div>
            <div class="crypto_exchanges-cell">{lang.tableTitle.coins}</div>
            <div class="crypto_exchanges-cell">{lang.tableTitle.startDate}</div>
            <div></div>
          </div>
          {
            exchangeList.list_records.map((item) => {
                return (
                    <a href={item .url} class="crypto_exchanges-row" target="_blank" rel="nofollow noopener" data-type="exchange" data-count={item._id}>
        <div class="crypto_exchanges-cell">
            <div>
                <span>
                    <span class="list_exanges_image_container">
                        <img  class="crypto_coin_icon" src={`/assets/upload/exchange/${item.logo}`}/>
                    </span> 
                   
                </span>
            </div>
        </div>
        <div class="crypto_exchanges-cell">
            <div>
                {item.score} 
                <img class="crypto_exchanges_rate" src={svg["rate_icon"]}/>
            </div> 
        </div> 
        <div class="crypto_exchanges-cell">
            <div>
                {item.list_coins.map((coin) => {
                    return(
                        <div class="crypto_coin_container">
                        <img  class="crypto_coin_icons"src={svg[`coins/${coin.icon}`]}/>        
                        <div class="crypto_coin_description">
                            {coin.name}
                        </div>  
                    </div>  
                    )
                })}
            </div>
        </div>
        <div class="crypto_exchanges-cell exanges_date_create">
            <span>
                {getDateFormat(item.startDate)}
            </span>        
        </div>
        <div>
            <div class="button-container-preview">
                <span class="btn-news-preview">
                    <span>
                        {lang.button.exchange}
                    </span>
                </span>
            </div>
        </div>
    </a>
    
                )
            })
          }
        </div>
        <a class="btn-view-all-a"  onclick={() =>{ count = count + 1;
            return getExchangeList(false)}
           }>
                <div class="btn-view-all" data-action="viewAllButton" style={
              exchangeList.list_records.length === exchangeList.totalFound
                ? "display: none"
                : "display: flex"
            } data-type="exchange_category" data-total="{{totalFound}}">
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
    if (!getValue(ID, "exchangeList")) {
      setValue(ID, "exchangeList", await getExchangeList(true));
    }
  }

  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(exchangeListView(), ID);
};

export default init;
