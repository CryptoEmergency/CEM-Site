import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const NumFormat = function (value, options) {
    if (value === null || value === undefined) {
        return 0;
    }
    return value.toLocaleString('en-US')
};

const BlockTrade = function ({ lang, trades }) {

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
                    trades.map(function (trade, i) {
                        return (
                            <a
                                class="crypto_exchanges-row tradeListLoad"
                                target="_blank"
                                rel="nofollow noopener"
                                data-count={trade.marketId}
                            >
                                <div class="crypto_exchanges-cell">
                                    {i + 1}.
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container " style="margin-right: 50px;display: block;"> {/* load */}
                                                <img class="crypto_coin_icon" src={trade.logo} />
                                            </span>
                                            {trade.name}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green " style="margin-right: 50px;"> {/* load */}
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src={svg.exange_money} />
                                            </span>
                                            ${NumFormat(trade.spotVolumeUsd)}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green " style="margin-right: 50px;"> {/* load */}
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src={svg.exange_visitors} />
                                            </span>
                                            {NumFormat(trade.weeklyVisits)}
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div style="display: flex;align-items: center;">
                                        <img
                                            class=""
                                            style="margin-right: 50px;filter: none"
                                            src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${trade.marketId}.svg`}
                                        /> {/* load */}
                                    </div>
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
            <div class="crypto_exchanges_footer">
                <a class="c-button c-button--gray" href="list-trade/">
                    <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                </a>
            </div>
            {/* <a href="{{Variable.lang.url}}list-trade/" class="btn-view-all-a" data-action="link">
                <div class="btn-view-all">
                    <div>{Variable.lang.button.show_all}</div>
                </div>
            </a> */}
        </div>
    )
}

export { BlockTrade }