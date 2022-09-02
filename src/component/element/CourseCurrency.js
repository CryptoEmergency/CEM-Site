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

const numberFixWithSpaces = function (num,fix) {
    let x = parseFloat(num).toFixed(fix)
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

const CourseCurrency = function ({ lang, course, key }) {
    // console.log("CourseCurrency", lang, course,key);

    return (
        <a href="/list-trade/" class="item-currency">
            <div class="icon-currency">
                <div class={`${key == "bnb" ? " icon-color-bnb" : key == "btc" ? " icon-color-btc" : key == "eth" ? " icon-color-eth" : key == "cem" ? " icon-color-cem" : ""}`}>
                    <img src={svg["coins/"+key]} />
                </div>
            </div>
            <div class="info-currency ">
                <div class="info_left-currency">
                    <div class="name-currency">{key.toLocaleUpperCase() + "/USDT"}</div>
                    <div class="price-currency"><span class="btcusdt_price">{course.usdt}</span></div>
                </div>
                <div class="info_rigth-currency">
                    <div class={`percent-currency ${course.change >= 0 ? " percent-currency_green": "percent-currency_red"}`}>
                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow} />
                        <span class="btcusdt_change">{numberFixWithSpaces(course.change, 2)}</span>
                    </div>
                    <div class="last-update">1h.</div>
                </div>
            </div>
        </a>
    )
}

export { CourseCurrency }