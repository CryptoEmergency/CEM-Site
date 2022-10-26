import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';

const BlockTrade = function (data) {

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
                    data.items.list_records.map(function (trade, i) {
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
            <If
                data={data.button}
                dataIf={data.button}
            />
        </div>
    )
}

export { BlockTrade }