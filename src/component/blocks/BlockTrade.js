import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const BlockTrade = function ({lang}) {

    return (
        <div id="crypto_exchanges" class="crypto_exchanges">
                    <h4>{lang.h.trade}</h4>
                    <div class="statistics-preview list_trade_page">
                        <div class="crypto_exchanges-row">
                            <div class="crypto_exchanges-cell">
                                #
                            </div>
                            <div class="crypto_exchanges-cell">
                                {lang.tableTitle.appellation}
                            </div>
                            <div class="crypto_exchanges-cell">
                                {lang.tableTitle.volume}
                            </div>
                            <div class="crypto_exchanges-cell">
                                {lang.tableTitle.countVisitors}
                            </div>
                            <div class="crypto_exchanges-cell">
                                {lang.tableTitle.chart}
                            </div>
                            <div>

                            </div>
                        </div>
                        <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                            <div class="crypto_exchanges-cell">
                                1.
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                            <img class="crypto_coin_icon" src="{{logo}}" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_money.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_visitors.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div style="display: flex;align-items: center;">
                                    <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg" />
                                </div>
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
                        <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                            <div class="crypto_exchanges-cell">
                                2.
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                            <img class="crypto_coin_icon" src="{{logo}}" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_money.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_visitors.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div style="display: flex;align-items: center;">
                                    <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg" />
                                </div>
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
                        <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                            <div class="crypto_exchanges-cell">
                                3.
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                            <img class="crypto_coin_icon" src="{{logo}}" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_money.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                        <span class="crypto_exchanges_percent_green_mobile">
                                            <img src="/assets/svg/exange_visitors.svg" />
                                        </span>
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div style="display: flex;align-items: center;">
                                    <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg" />
                                </div>
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
                    </div>
                    <a href="{{lang.url}}list-trade/" class="btn-view-all-a" data-action="link">
                        <div class="btn-view-all">
                            <div>{lang.button.show_all}</div>
                        </div>
                    </a>
                </div>
    )
}

export { BlockTrade }