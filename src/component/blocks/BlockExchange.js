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
// import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";

const BlockExchange = function ({ lang, exchanges }) {
    // console.log("BlockExchange", exchanges);

    return (
        <div class="crypto_exchanges" id="crypto_exchange">
            <h4>{lang.h.exchange}</h4>
            <div class="statistics-preview list_exchange_page">
                <div class="crypto_exchanges-row">
                    <div class="crypto_exchanges-cell">
                        {lang.tableTitle.appellation}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {lang.tableTitle.rank}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {lang.tableTitle.coins}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {lang.tableTitle.startDate}
                    </div>
                    <div>

                    </div>
                </div>
                {
                    exchanges.map(function (exchange, i) {
                        return (
                            <a
                                class="crypto_exchanges-row exchangeListLoad"
                                target="_blank"
                                rel="nofollow noopener"
                                data-type="exchange"
                                data-count={exchange._id}
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
                                        <div style="height: auto;" class=""> {/* load */}
                                            {exchange.score}
                                            <img
                                                class="crypto_exchanges_rate"
                                                src={svg.rate_icon}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        {
                                            exchange.list_coins.map(function (coin, i) {
                                                return (
                                                    <div class="crypto_coin_container "> {/* load */}
                                                        <img
                                                            class="crypto_coin_icons"
                                                            src={svg[`coins/${coin.icon}`]}
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
                                    <span class=""> {/* load */}
                                        {getDateFormat(exchange.startDate)}
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
        </div>
    )
}

export { BlockExchange }