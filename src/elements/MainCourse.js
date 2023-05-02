import {
    jsx,
    jsxFrag,
    Variable,
    Helpers,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function ({ records, children }) {
    console.log('=c42f17 children=', children)
    return (
        <div class="с-preview__crypto">
            {
                Object.keys(records).filter((item) => typeof records[item] == 'object').map(function (key) {
                    let course = records[key]
                    return (
                        <div class="c-currency">
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
                                    {/* <div class="c-currency__update">24h.</div> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default forExport