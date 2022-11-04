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

import { NotFound } from "@component/element/index.js";

const BlockTrade = async function ({ nameRecords, button, limit = 55 }) {
    await initOne(
        async () => {
            await api({ type: "get", action: "getTrade", short: true, cache: true, name: nameRecords, limit: limit })
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
                {() => {
                    if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].list_records.length) {
                        const arrReturn = Variable[nameRecords].list_records.map(function (item, i) {
                            return (
                                <a
                                    class="crypto_exchanges-row tradeListLoad"
                                    target="_blank"
                                    rel="nofollow noopener"
                                    data-count={item.marketId}
                                    href={item.url}
                                >
                                    <div class="crypto_exchanges-cell">
                                        {i + 1}.
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span>
                                                <span class="list_exanges_image_container ">
                                                    <img class="crypto_coin_icon" src={item.logo} />
                                                </span>
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span class="crypto_exchanges_percent_green " style="margin-right: 50px;">
                                                <span class="crypto_exchanges_percent_green_mobile">
                                                    <img src={svg.exange_money} />
                                                </span>
                                                {Helpers.NumFormat(item.spotVolumeUsd)}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span class="crypto_exchanges_percent_green " style="margin-right: 50px;">
                                                <span class="crypto_exchanges_percent_green_mobile">
                                                    <img src={svg.exange_visitors} />
                                                </span>
                                                {Helpers.NumFormat(item.weeklyVisits)}
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
                                                <span>
                                                    {Variable.lang.button.trade}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                        return arrReturn
                    } else {
                        return(NotFound)
                    }
                }}
            </div>
            {button}
        </div>
    )
}
export { BlockTrade }