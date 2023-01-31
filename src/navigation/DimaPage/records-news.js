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
            Static.recordsNews = await fn.restApi.getNews({ limit: 50, filter: { type: "news" }, select: { category: 1, title: 1, preview: 1, text: 1, image: 1, showDate: 1, source: 1, languages: 1 }, sort: { dateCreate: -1 }, defaultReset: true })
            console.log('=e5bcc8=', Static.recordsNews)
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
                                fn.siteLinkModal("/DimaPage/edit-news/", { title: "Добавить Новость" })
                            }}
                        >
                            <img src={svg["radius_plus"]} width="100" height="100" />
                        </div>
                        {
                            Static.recordsNews.list_records.map((item, index) => {
                                return (
                                    <div class="ico-list_item"
                                        onclick={() => {
                                            fn.siteLinkModal("/DimaPage/edit-news/", { title: "Редактировать Новость", item })
                                        }}>
                                        <img class="item-img" width="100" height="100" src={`/assets/upload/news/${item.image}`}></img>
                                        <div class="item-info">
                                            <h5 class="item-title">{item.title}</h5>
                                            <p class="item-desc">{item.preview}</p>
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