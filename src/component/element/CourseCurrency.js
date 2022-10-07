import {
    jsx,
    jsxFrag,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";

const CourseCurrency = function ({ course, key }) {
    return (
        <a
            href={key == "cem" ? "https://www.bitmart.com/trade/en?layout=basic&symbol=CEM_USDT" : "/list-trade/"}
            rel="nofollow noopener"
            target={key == "cem" ? "_blank" : "_self"}
            class="c-currency"
        >
            <div class="c-currency__icon">
                <div class={`icon-color-${key}`}>
                    <img src={`/assets/icons/coins/${key}2.svg`} />
                </div>
            </div>
            <div class="c-currency__info">
                <div class="c-currency__left">
                    <div class="c-currency__name">{key.toLocaleUpperCase() + "/USDT"}</div>
                    <div class="c-currency__price"><span class="btcusdt_price">{Helpers.numberFixWithSpaces(course.usdt, key === "cem" ? 4 : 2)}</span></div>
                </div>
                <div class="c-currency__right">
                    <div class={`c-currency__percent ${course.change >= 0 ? " c-currency__percent--up" : " c-currency__percent--down"}`}>
                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow} />
                        <span class="btcusdt_change">{Helpers.numberFixWithSpaces(course.change, 2)}</span>
                    </div>
                    <div class="c-currency__update">24h.</div>
                </div>
            </div>
        </a>
    )
}
//I check
export { CourseCurrency }