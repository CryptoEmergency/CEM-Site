import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    initOne,
    initReload
} from '@betarost/cemjs';
// check
import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { ButtonShowMore } from "@component/element/index.js";

const BlockExchange = async function ({ nameRecords, limit = 21 }) {
    await initOne(
        async () => {
            await api({ type: "get", action: "getExchange", short: true, cache: true, name: nameRecords, limit: limit })
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
                {() => {
                    if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].list_records.length) {
                        const arrReturn = Variable[nameRecords].list_records.map(function (item, i) {
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
                                            {Helpers.getDateFormat(item.startDate)}
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
                        return arrReturn
                    }
                }}
            </div>
            {
                () => {
                    if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].totalFound) {
                        if (Variable[nameRecords].list_records.length < Variable[nameRecords].totalFound) {
                            return (
                                <ButtonShowMore
                                    onclick={async () => {
                                        let tmp = await api({ type: "get", action: "getExchange", short: true, limit, offset: Variable[nameRecords].list_records.length })
                                        if (tmp && tmp.list_records) {
                                            Variable[nameRecords].list_records.push(...tmp.list_records)
                                        }
                                        initReload()
                                    }
                                    }
                                />
                            )
                        }
                    }
                }
            }
        </div>
    )
}
export { BlockExchange }