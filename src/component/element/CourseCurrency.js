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

const currencyTemplate = function({ lang, course }) {
    return Object.keys(course).map(function (key) {
        if (typeof course[key] == "object") {
            return (
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                        <div class="icon-color-btc">
                            <img src={svg["coins/"+key]} />
                        </div>
                    </div>
                    <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">{key.toLocaleUpperCase() + "/USDT"}</div>
                            <div class="price-currency"><span class="btcusdt_price">{course[key].usdt}</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class={`percent-currency ${course[key].change >= 0 ? " percent-currency_green": "percent-currency_red"}`}>
                                <img src={course[key].change >= 0 ? svg.up_arrow : svg.down_arrow} />
                                <span class="btcusdt_change">{numberFixWithSpaces(course[key].change, 2)}</span>
                            </div>
                            <div class="last-update">1h.</div>
                        </div>
                    </div>
                </a>
            )
        }
        
    })
};

const CourseCurrency = function ({ lang, course }) {
    console.log("CourseCurrency", lang, course);

    return (
        <div class="swiper-wrapper" data-reload="true" data-interval="10">
            {currencyTemplate({ lang, course })}
        </div>
    )
}

export { CourseCurrency }