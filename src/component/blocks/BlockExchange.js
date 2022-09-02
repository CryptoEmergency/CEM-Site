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

const BlockExchange = function ({lang}) {

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
                        <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container">
                                            <img class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div style="height: auto;" class="load">
                                        1
                                        <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg" />
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div class="crypto_coin_container load">
                                        <img class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg" />
                                        <div class="crypto_coin_description">
                                            1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell exanges_date_create">
                                <span class="load">
                                    1
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
                        <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container">
                                            <img class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div style="height: auto;" class="load">
                                        4
                                        <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg" />
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div class="crypto_coin_container load">
                                        <img class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg" />
                                        <div class="crypto_coin_description">
                                            1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell exanges_date_create">
                                <span class="load">
                                    1
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
                        <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <span>
                                        <span class="list_exanges_image_container">
                                            <img class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div style="height: auto;" class="load">
                                        1
                                        <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg" />
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell">
                                <div>
                                    <div class="crypto_coin_container load">
                                        <img class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg" />
                                        <div class="crypto_coin_description">
                                            1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="crypto_exchanges-cell exanges_date_create">
                                <span class="load">
                                    1
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
                    </div>
                    <a href="{{lang.url}}list-exchange/" class="btn-view-all-a" data-action="link">
                        <div class="btn-view-all">
                            <div>{lang.button.show_all}</div>
                        </div>
                    </a>
                </div>
    )
}

export { BlockExchange }