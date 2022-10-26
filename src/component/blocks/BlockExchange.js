import {
    jsx,
    jsxFrag,
    Helpers,
    Variable
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';

const BlockExchange = function (data) {

    return (
        <div id="crypto_exchange" class="crypto_exchanges">
            <h4>{Variable.lang.h.exchange}</h4>
            <div class="statistics-preview list_exchange_page">
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
                </div>
                {
                    data.items.list_records.map(function (exchange, i) {
                        return (
                            <a
                                class="crypto_exchanges-row exchangeListLoad"
                                target="_blank"
                                rel="nofollow noopener"
                                href={exchange.url}
                            >
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container">
                                                <img
                                                    class="crypto_coin_icon load"
                                                    src={`/assets/upload/exchange/${exchange.logo}`}
                                                />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        {exchange.score}
                                        <img
                                            class="crypto_exchanges_rate"
                                            src={svg.rate_icon}
                                        />
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        {
                                            exchange.list_coins.map(function (coin, i) {
                                                return (
                                                    <div class="crypto_coin_container ">
                                                        <img
                                                            class="crypto_coin_icons"
                                                            src={`/assets/icons/coins/${coin.icon}.svg`}
                                                        />
                                                        <div class="crypto_coin_description">
                                                            {coin.name}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell exanges_date_create">
                                    <span class="">
                                        {Helpers.getDateFormat(exchange.startDate)}
                                    </span>
                                </div>
                                <div>
                                    <div class="button-container-preview">
                                        <span class="btn-news-preview">
                                            <span>
                                                {Variable.lang.button.exchange}
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
//I check
export { BlockExchange }