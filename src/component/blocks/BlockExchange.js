import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { ButtonShowMore, NotFound } from "@component/element/index.js";

const BlockExchange = async function ({ Static, limit = 21 }) {
    await initOne(
        async () => {
            await fn.restApi.getExchange({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit })
        }
    )
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
                    !Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
                        ?
                        <NotFound />
                        :
                        Variable[Static.nameRecords].list_records.map(function (item, i) {
                            return (
                                <a
                                    class="crypto_exchanges-row exchangeListLoad"
                                    target="_blank"
                                    rel="nofollow noopener"
                                    href={item.url}
                                >
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span>
                                                <span class="list_exanges_image_container">
                                                    <img
                                                        class="crypto_coin_icon load"
                                                        src={`/assets/upload/exchange/${item.logo}`}
                                                    />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            {item.score}
                                            <img
                                                class="crypto_exchanges_rate"
                                                src={svg.rate_icon}
                                            />
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            {
                                                item.list_coins.map(function (coin, i) {
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
                                            {fn.getDateFormat(item.startDate)}
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
            <ButtonShowMore Static={Static} action="getExchange" limit={limit} />
        </div>
    )
}
export { BlockExchange }
// OK