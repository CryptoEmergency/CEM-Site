import {
    jsx,
    jsxFrag,
    load,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const listStartaps = [
    {
        title: "Immunify.Life",
        description: "Immunify.Life is a transformative and self-sustaining healthcare ecosystem on the Cardano blockchain powered by AI with self sovereign identification through immutable NFTs.",
        startDate: "2022-11-28 03:18",
        endDate: "2023-02-01 03:19",
        totalSupply: "300",
        targetSell: "300",
        nowMoney: "1.16"

    },
    {
        title: "Uno Farm",
        description: "Uno Farm is a transformative and self-sustaining healthcare ecosystem on the Cardano blockchain powered by AI with self sovereign identification through immutable NFTs.",
        startDate: "2022-11-28 03:18",
        endDate: "2023-02-01 03:19",
        totalSupply: "300",
        targetSell: "300",
        nowMoney: "3.16"
    },
    {
        title: "Solidus AI Tech",
        description: "Solidus have built an eco-friendly 8,000 square foot high performance computing (HPC) Data Centre in a highly secure location in Europe.",
        startDate: "2022-11-28 03:18",
        endDate: "2023-02-01 03:19",
        totalSupply: "300",
        targetSell: "300",
        nowMoney: "2.16"

    },
]

const showListStartaps = function (listStartaps) {
    return listStartaps.map((item) => {
        return (
            <div class="ico-list_item"
               
            >
                <div class="item-img">
                    <img class="item-img_el" src={images["ico/ico1"]}></img>
                </div>
                <div class="item-info">
                    <h5 class="item-title">{item.title}</h5>
                    <div class="item-desc_wrap">
                        <p class="item-desc">{item.description}</p>
                    </div>
                    <div class="item-sum_wrap">
                        <p class="item-sum">
                            <span class="item-sum_obj">${item.nowMoney}</span> / ${item.targetMoney} <span class="item-sum_procent">{Math.round((item.nowMoney * 100) / item.targetMoney)}%</span>
                        </p>
                    </div>
                </div>
                <div class="item-date">
                    <span>{fn.getDateFormat(item.startDate, "time")}</span>
                    <span>{fn.getDateFormat(item.endDate, "time")}</span>
                </div>
            </div>
        )
    })
}

const start = function (data, ID) {

    load({


        fn: () => {
            return (
                <div class="c-main_body">
                    <div class="startap-inner">
                        <div class="list-startaps">
                            {showListStartaps(listStartaps)}
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;
