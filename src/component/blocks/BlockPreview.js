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
import images from "@assets/images/index.js";

import { CourseCurrency } from '@component/element/CourseCurrency.js';

const BlockPreview = function ({lang, course}) {
    // console.log("BlockPreview", lang, course);

    return (
        <div class="preview">
            <img class="lines" src={images["lines-preview-min"]} />
            <div class="title-preview">
                <img class="cem-img" src={images["background/cem"]} />
                <div class="title-text-preview">
                    {lang.homePreview.platformFuture}<br />
                    {lang.homePreview.unitePeople}
                </div>
            </div>
            <div class="main_site_parts">
                <a href="/lenta-users/" class="main_site_part" data-action="link">
                    <span>{lang.span.userNews}</span>
                </a>
                <a href="/chats/" class="main_site_part" data-action="link" data-updating="true">
                    <span>{lang.span.chats}</span>
                </a>
                <a href="/question/" class="main_site_part" data-action="link">
                    <span>{lang.span.QA}</span>
                </a>
                <a href="/news/" class="main_site_part" data-action="link">
                    <span>{lang.span.news}</span>
                </a>
            </div>

             <div class="items-currencies swiper">
                <CourseCurrency lang={lang} course={course} />
                <div class="swiper-pagination" id="swiper-pagination-currencies"></div>
            </div>
            {/* <div class="static-crypto">
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                        <div class="icon-color-btc">
                            <img src={bitcoin_icon} />
                        </div>
                    </div>
                    <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">BTC/USDT</div>
                            <div class="price-currency"><span class="btcusdt_price">{course.btc.usdt}</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow} /><span class="btcusdt_change">{course.btc.change} </span></div>
                            <div class="last-update">1h.</div>
                        </div>
                    </div>
                </a>
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                        <div class="icon-color-bnb">
                            <img src={bnb_icon} />
                        </div>
                    </div>
                    <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">BNB/USDT</div>
                            <div class="price-currency"><span class="bnbusdt_price">{course.bnb.usdt}</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow} /><span class="bnbusdt_change">{course.bnb.change}</span></div>
                            <div class="last-update">1h.</div>
                        </div>
                    </div>
                </a>
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                        <div class="icon-color-eth">
                            <img src={eth_icon} />
                        </div>
                    </div>
                    <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">ETH/USDT</div>
                            <div class="price-currency"><span class="ethusdt_price">{course.eth.usdt}</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow} /><span class="ethusdt_change">{course.eth.change}</span></div>
                            <div class="last-update">1h.</div>
                        </div>
                    </div>
                </a>
                <a href="/buy-cem/" data-action="link" data-updating="true" class="item-currency swiper-slide">
                    <div class="icon-currency">
                        <div class="icon-color-cem">
                            <img src={cem_icon} />
                        </div>
                    </div>
                    <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">CEM/USDT</div>
                            <div class="price-currency"><span class="cemusdt_price">{course.cem.usdt}</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow} /><span class="cemusdt_change">{course.cem.change}</span></div>
                            <div class="last-update">24h.</div>
                        </div>
                    </div>
                </a>
            </div> */}
        </div>
    )
}

export { BlockPreview }