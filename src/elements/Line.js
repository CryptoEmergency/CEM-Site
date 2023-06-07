import {
    jsx,
    jsxFrag,
    Variable,
    Helpers,
    Data,
    CEM
} from '@betarost/cemserver/cem.js';

const { images, svg, fn } = CEM

const forExport = function ({Static, records, children }) {
    return (
        <div class="line-wrap">
            <div
                class="line-track"
                Element={function($el){
                    Data.Static.carouselList=$el;
                }}  
                After={($el)=>{
                    Data.Static.widthList = $el.offsetWidth;
                }}
                onclick={()=>{
                    fn.siteLink('/exchange-rates')
                }}
            >
                {() => {
                if (records && Object.keys(records).length) {
                    const arrReturn = Object.keys(records)
                    .filter(
                        (item) =>
                        typeof records[item] == "object"
                    )
                    .map(function (key) {
                        let course = records[key];
                        return (
                            <div class="line-item">
                                <div class="line-item_img">
                                    <img src={`/assets/icons/coins/${key}2.svg`} ></img>
                                </div>
                                <span class="line-text mr--10">{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span class="line-text line-price">
                                    ${Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
                                <div class="course-change">
                                    {Helpers.numberFixWithSpaces(course.change, 2)}
                                    <div
                                        class={["line-img_change", course.change >=0 ? "line-img_change_up" : "line-img_change_down"]}
                                    >
                                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow}></img>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                    return arrReturn;
                }
                }}
            </div>
            <div
                class="line-track"
                Element={function($el){
                    Data.Static.carouselList=$el;
                }}  
                After={($el)=>{
                    Data.Static.widthList = $el.offsetWidth;
                }}
                onclick={()=>{
                    fn.siteLink('/exchange-rates')
                }}
            >
                {() => {
                if (records && Object.keys(records).length) {
                    const arrReturn = Object.keys(records)
                    .filter(
                        (item) =>
                        typeof records[item] == "object"
                    )
                    .map(function (key) {
                        let course = records[key];
                        return (
                            <div class="line-item">
                                <div class="line-item_img">
                                    <img src={`/assets/icons/coins/${key}2.svg`} ></img>
                                </div>
                                <span class="line-text mr--10">{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span class="line-text line-price">
                                    ${Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
                                <div class="course-change">
                                    {Helpers.numberFixWithSpaces(course.change, 2)}
                                    <div
                                        class={["line-img_change", course.change >=0 ? "line-img_change_up" : "line-img_change_down"]}
                                    >
                                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow}></img>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                    return arrReturn;
                }
                }}
            </div>
            <div
                class="line-track"
                Element={function($el){
                    Data.Static.carouselList=$el;
                }}  
                After={($el)=>{
                    Data.Static.widthList = $el.offsetWidth;
                }}
                onclick={()=>{
                    fn.siteLink('/exchange-rates')
                }}
            >
                {() => {
                if (records && Object.keys(records).length) {
                    const arrReturn = Object.keys(records)
                    .filter(
                        (item) =>
                        typeof records[item] == "object"
                    )
                    .map(function (key) {
                        let course = records[key];
                        return (
                            <div class="line-item">
                                <div class="line-item_img">
                                    <img src={`/assets/icons/coins/${key}2.svg`} ></img>
                                </div>
                                <span class="line-text mr--10">{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span class="line-text line-price">
                                    ${Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
                                <div class="course-change">
                                    {Helpers.numberFixWithSpaces(course.change, 2)}
                                    <div
                                        class={["line-img_change", course.change >=0 ? "line-img_change_up" : "line-img_change_down"]}
                                    >
                                        <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow}></img>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                    return arrReturn;
                }
                }}
            </div>
        </div>
    )
}

export default forExport