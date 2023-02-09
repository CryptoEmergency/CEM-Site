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
            Static.list_coins = await fn.restApi.getCoins({ filter: {}, limit: 20, select: { name: 1, icon: 1 } })
            await fn.restApi.getExchange({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit, select: { name: 1 } })

            // let tmp = await fn.restApi.getExchange({ filter: {}, select: { name: 1 }, sort: { score: -1 }, limit: 4 })

            console.log("========", await fn.restApi.getExchange({ cache: true, limit, select: { name: 1 } }))

        }
    )
    return (
        <div id="crypto_exchange" class="crypto_exchanges">
            <div class="crypto_exchanges-title">
                <h4>{Variable.lang.h.exchange}</h4>

                <img
                    class="filter-search_icon"
                    src={svg.filter}
                    onclick={() => {


                        fn.modals.ModalFilterCoin({
                            list_coins: Static.list_coins.list_records,
                            filterCoins: Static.filterCoins,
                            callback: async (filterCoins) => {
                                Static.filterCoins = filterCoins
                                if (!filterCoins.length) {
                                    return
                                }
                                let filter = { "$or": [] }
                                for (let item of filterCoins) {
                                    filter["$or"].push({ "list_coins.name": item })
                                }

                                console.log('=Static.list_coins.list_records=', Static.list_coins.list_records)
                                console.log('=1e34f2=', filterCoins, filter)
                                await fn.restApi.getExchange({ cache: true, name: Static.nameRecords, filter, limit, select: { name: 1 } })
                                return

                            }

                        })
                    }}
                ></img>
            </div>

            <div>
                {
                    Static.filterCoins.length ?
                        <div>
                            {
                                Static.filterCoins.map((item) => {
                                    let iconName
                                    Static.list_coins.list_records.forEach(el => {
                                        if (el.name == item) {
                                            iconName = el.icon
                                            return
                                        }

                                    });
                                    return (
                                        <img src={`/assets/icons/coins/${iconName}.svg`} ></img>
                                    )
                                })
                            }
                        </div>
                        : null
                }
            </div>

            <div class="statistics-preview list_exchange_page">
                <div class="crypto_exchanges-row">
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.appellation}
                    </div>
                    <div class="crypto_exchanges-cell">
                        {Variable.lang.tableTitle.coins}
                    </div>
                    <div class="crypto_exchanges-cell">
                        <div class="switch">
                            <input type="checkbox"></input>
                        </div>
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
                                                {item.name}
                                            </span>
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

                                    <div class="btn-wrap">
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