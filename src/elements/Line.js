import {
    jsx,
    jsxFrag,
    Variable,
    Helpers,
    Data
} from '@betarost/cemserver/cem.js';


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
                                <span>{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span>
                                    {Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
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
                                <span>{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span>
                                    {Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
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
                                <span>{key.toLocaleUpperCase() + "/USDT"}</span>
                                <span>
                                    {Helpers.numberFixWithSpaces(
                                    course.usdt,
                                    key === "cem" ? 4 : 2
                                    )}
                                </span>
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