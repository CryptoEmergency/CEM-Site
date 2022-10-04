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
import svg from "@assets/svg/index.js";

const numberFixWithSpaces = function (num, fix) {
    let x = parseFloat(num).toFixed(fix)
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

const CourseCurrency = function ({ course, key }) {

    return (
        <a
            href={key == "cem" ? "https://www.bitmart.com/trade/en?layout=basic&symbol=CEM_USDT" : "/list-trade/"}
            rel="nofollow noopener"
            target={key == "cem" ? "_blank" : "_self"}
            class="c-currency"
        >
            <div class="c-currency__icon">
                <div class={`${key == "bnb" ? " icon-color-bnb" : key == "btc" ? " icon-color-btc" : key == "eth" ? " icon-color-eth" : key == "cem" ? " icon-color-cem" : ""}`}>
                    {/* <img src={svg["coins/" + key + "2"]} /> */}
                    <img src={`/assets/icons/coins/${key}2.svg`} />
                </div>
            </div>
            <div class="c-currency__info">
                <div class="c-currency__left">
                    <div class="c-currency__name">{key.toLocaleUpperCase() + "/USDT"}</div>
                    <div class="c-currency__price"><span class="btcusdt_price">{course.usdt}</span></div>
                </div>
                <div class="c-currency__right">
                    <div class={`c-currency__percent ${course.change >= 0 ? " c-currency__percent--up" : " c-currency__percent--down"}`}>
                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow} />
                        <span class="btcusdt_change">{numberFixWithSpaces(course.change, 2)}</span>
                    </div>
                    <div class="c-currency__update">24h.</div>
                </div>
            </div>
        </a>
    )
}

export { CourseCurrency }