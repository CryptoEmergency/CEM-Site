import {
    jsx,
    jsxFrag,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";




const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })



    load({
        ID,
        fnLoad: async () => {
            Static.recordsIco = await fn.restApi.getIco({ filter: {} })
            console.log('=e5bcc8=', Static.recordsIco)
        },
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">
                    <div class="ico-list">
                        <div
                            class="ico-list_item"
                            onclick={() => {
                                fn.siteLinkModal("/DimaPage/lists-ico/", { title: "Добавить ICO" })
                            }}
                        >
                            <img src={svg["radius_plus"]} width="100" height="100" />
                        </div>
                        {
                            Static.recordsIco.list_records.map((item, index) => {
                                return (
                                    <div class="ico-list_item"
                                        onclick={() => {
                                            fn.siteLinkModal("/DimaPage/lists-ico/", { title: "Редактировать ICO", item })
                                        }}>
                                        <img class="item-img" width="100" height="100" src={`/assets/upload/worldPress/${item.icon}`}></img>
                                        <div class="item-info">
                                            <h5 class="item-title">{item.title}</h5>
                                            <p class="item-desc">{item.description}</p>
                                            <div>
                                                <p class="item-sum">
                                                    <span class="item-sum_obj">${item.nowMoney}</span> / ${item.targetMoney}
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
                    </div>
                </div>
            )
        }
    })

}


export default start;