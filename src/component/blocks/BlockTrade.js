import {
    jsx,
    jsxFrag,
    Variable,
    Helpers,
    initOne
} from '@betarost/cemjs';
// poydet
import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'

const BlockTrade = async function (data) {

    await initOne(
        async () => {
            let limit = 50
            if(data.nameRecords == 'MainTrades'){
                limit = 6
            }
            await api({ type: "get", action: "getTrade", short: true, cache: true, name: data.nameRecords, limit: limit })

        }
    )

    return (
        <div id="crypto_exchanges" class="crypto_exchanges">
            <h4>{Variable.lang.h.trade}</h4>
            <div class="statistics-preview list_trade_page">
                <div class="crypto_exchanges-row">
                    <div class="crypto_exchanges-cell">
                        #
                    </div>
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.appellation}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.volume}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.countVisitors}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.chart}
                    </div>
                    <div>

                    </div>
                </div>
                {
                    Variable[data.nameRecords].list_records.map(function (trade, i) {
                        return (
                            <a
                                class="crypto_exchanges-row tradeListLoad"
                                target="_blank"
                                rel="nofollow noopener"
                                data-count={trade.marketId}
                                href={trade.url}
                            >
                                <div class="crypto_exchanges-cell">
                                    {i + 1}.
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container ">
                                                <img class="crypto_coin_icon" src={trade.logo} />
                                            </span>
                                            {trade.name}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green " style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src={svg.exange_money} />
                                            </span>
                                            {Helpers.NumFormat(trade.spotVolumeUsd)}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green " style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src={svg.exange_visitors} />
                                            </span>
                                            {Helpers.NumFormat(trade.weeklyVisits)}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <img
                                        class=""
                                        src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${trade.marketId}.svg`}
                                    />
                                </div>
                                <div class="crypto_exchanges_cell_button">
                                    <div class="button-container-preview">
                                        <span class="btn-news-preview">
                                            <span>
                                                {Variable.lang.button.trade}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            {()=>{
                if(data.button){
                    return(data.button)
                }
            }}
        </div>
    )
}

export { BlockTrade }