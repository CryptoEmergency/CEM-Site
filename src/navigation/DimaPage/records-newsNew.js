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
            Static.recordsItem = await fn.restApi.getNews({ limit: 50, filter: { type: "news" }, select: { statistic: 1, moderation: 1, category: 1, title: 1, preview: 1, text: 1, image: 1, showDate: 1, source: 1, languages: 1 }, sort: { dateCreate: -1 }, defaultReset: true })
            console.log('=e5bcc8=', Static.recordsItem)
        },
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">
                    <div class="">
                        <div class="c-container mb--10 pt--10">
                            <a class="c-goback" onclick={() => { fn.siteLink("/DimaPage/") }}>
                                <img width="30" height="30" src={svg["chats_back2"]} />
                                <span class="c-goback__text">Вернуться к списку</span>
                            </a>
                        </div>
                        <div class="list-ico">
                            <div class="ico-list_item mv--5" style="border: 1px white solid;" onclick={() => {
                                fn.siteLinkModal("/DimaPage/edit-news/", { title: "Добавить Новость", needReload: true })
                            }}>
                                <div class="item-img">
                                    <img width="100" height="100" src={svg["radius_plus"]}></img>
                                </div>

                                <div class="item-info" style="display: flex; ">
                                    <h5 class="item-title" style="margin: auto;">Добавить</h5>
                                </div>
                            </div>
                            {
                                Static.recordsItem.list_records.map((item, index) => {
                                    return (
                                        <div class="ico-list_item mv--5" style="border: 1px white solid;"
                                            onclick={() => {
                                                fn.siteLinkModal("/DimaPage/edit-newsNew/", { title: "Редактировать Новость", needReload: true, item })
                                            }}>
                                            <div class="item-img">
                                                <img class="item-img_el" src={`/assets/upload/news/${item.image}`}></img>
                                            </div>
                                            <div class="item-info">
                                                <h5 class="item-title">{item.title}</h5>
                                                <p class="item-desc">{item.preview}</p>
                                            </div>
                                            <span class="item-date item-date_end">
                                                {
                                                    item.moderation
                                                        ?
                                                        <div>
                                                            <span style={"padding-right:20px;"}>Опубликованно</span>
                                                            <div
                                                                class="c-avataricon__status c-avataricon__status--online avatar_user_online"
                                                            > </div>

                                                        </div>
                                                        :
                                                        <div>
                                                            <span style={"padding-right:20px;"}>На модерации</span>
                                                            <div
                                                                class="c-avataricon__status c-avataricon__status--offline avatar_user_offline"
                                                            > </div>

                                                        </div>
                                                }
                                            </span>
                                        </div>
                                    )


                                })
                            }
                        </div>
                    </div>
                </div>
            )
        }
    })

}


export default start;