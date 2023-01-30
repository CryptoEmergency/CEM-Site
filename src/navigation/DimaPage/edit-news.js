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


//
const checkForm = async function (Static, ID) {
    if (!Static.forms.category) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери категорию!!!" })
        return
    }

    if (!Static.forms.icon) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери иконку!!!" })
        return
    }

    if (!Static.forms.title) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи название!!!" })
        return
    }

    if (!Static.forms.description) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи описание!!!" })
        return
    }

    if (!Static.forms.cover && !Static.forms.coverVideo) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери обложку или укажи ссылку на Ютуб!!!" })
        return
    }

    if (!Static.forms.startDate) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи дату запуска!!!" })
        return
    }

    if (!Static.forms.endDate) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи дату окончания!!!" })
        return
    }

    if (!Static.forms.targetMoney) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи цель $!!!" })
        return
    }

    if (!Static.forms.targetMoney) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи цель $!!!" })
        return
    }

    if (!Static.forms.name) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи имя!!!" })
        return
    }

    if (!Static.forms.type) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи тип!!!" })
        return
    }

    if (!Static.forms.price) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи цену!!!" })
        return
    }

    if (!Static.forms.totalSupply) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Сколько выпущено!!!" })
        return
    }

    if (!Static.forms.forSell) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Сколько для продажи!!!" })
        return
    }

    if (!Static.forms.targetSell) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Цель продажи кол-во!!!" })
        return
    }

    if (!Static.forms.review) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи краткий обзор!!!" })
        return
    }

    let data = {
        value: {
            category: Static.forms.category,
            icon: Static.forms.icon,
            title: Static.forms.title,
            description: Static.forms.description,
            cover: Static.forms.cover,
            coverVideo: Static.forms.coverVideo,
            startDate: Static.forms.startDate,
            endDate: Static.forms.endDate,
            targetMoney: Static.forms.targetMoney,
            name: Static.forms.name,
            type: Static.forms.type,
            price: Static.forms.price,
            sellType: Static.forms.sellType,
            totalSupply: Static.forms.totalSupply,
            forSell: Static.forms.forSell,
            targetSell: Static.forms.targetSell,
            review: Static.forms.review,
            media: Static.forms.media,
            social: [],
            checked: Static.forms.checked
        }
    }

    if (Static.forms.nowMoney) {
        data.value.nowMoney = Static.forms.nowMoney
    }

    if (Static.forms.siteLink) {
        data.value.siteLink = Static.forms.siteLink
    }

    if (Static.forms.whitePaperLink) {
        data.value.whitePaperLink = Static.forms.whitePaperLink
    }

    if (Static.forms.social.youtube.url) {
        data.value.social.push({ channel: "youtube", url: Static.forms.social.youtube.url })
    }

    if (Static.forms.social.facebook.url) {
        data.value.social.push({ channel: "facebook", url: Static.forms.social.facebook.url })
    }

    if (Static.forms.social.twitter.url) {
        data.value.social.push({ channel: "twitter", url: Static.forms.social.twitter.url })
    }

    if (Static.forms.social.discord.url) {
        data.value.social.push({ channel: "discord", url: Static.forms.social.discord.url })
    }

    if (Static.forms.social.instagram.url) {
        data.value.social.push({ channel: "instagram", url: Static.forms.social.instagram.url })
    }

    if (Static.forms.social.tiktok.url) {
        data.value.social.push({ channel: "tiktok", url: Static.forms.social.tiktok.url })
    }

    if (Static.forms.social.twitch.url) {
        data.value.social.push({ channel: "twitch", url: Static.forms.social.twitch.url })
    }

    if (Static.forms.social.telegram.url) {
        data.value.social.push({ channel: "telegram", url: Static.forms.social.telegram.url })
    }

    if (Static.forms.social.vk.url) {
        data.value.social.push({ channel: "vk", url: Static.forms.social.vk.url })
    }

    if (Static.forms.social.github.url) {
        data.value.social.push({ channel: "github", url: Static.forms.social.github.url })
    }

    if (Static.forms.social.linkedin.url) {
        data.value.social.push({ channel: "linkedin", url: Static.forms.social.linkedin.url })
    }

    console.log(data)
    if (!Static.item) {
        await fn.restApi.setIco.create(data)
    } else {
        data._id = Static.item._id
        await fn.restApi.setIco.update(data)
    }
    fn.siteLink("/DimaPage/")

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    // console.log('=dc5388=', Static)

    load({
        ID,
        fnLoad: async () => {
            Static.listCategory = await fn.restApi.getCategories({ filter: { type: "news" } })
            console.log('=a11bea=', Static.listCategory)

            if (!Static.item) {
                Static.forms = {}
                Static.forms.category = null
                Static.forms.image = null
                Static.forms.title = null
                Static.forms.preview = null
                Static.forms.text = null
                Static.forms.source = null
                Static.forms.languages = {}



            } else {
                Static.forms = Object.assign({}, Static.item)
            }
        },
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">

                    <div class="contacts_form">
                        {/* {
                            Static.listCategory.list_records.map((item) => {
                                return (<div class={["tag_button", Static.forms.category.name == item.name ? "tag_button_active" : null]}
                                    onclick={() => {
                                        Static.forms.category.name = item.name
                                        Static.forms.category.type = "news"
                                        initReload()
                                    }}>
                                    <span>{item.name}</span>
                                </div>
                                )
                            })
                        } */}
                        <div>
                            <label>Язык </label>
                            <input
                                placeholder="Выбери Язык"
                                type="text"
                                readonly
                                value={Static.forms.languages.value}
                                // value="hhh"
                                Element={(el) => {
                                    Static.forms.languages.el = el
                                }}
                                onclick={() => {
                                    fn.modals.ModalChangeLanguage({
                                        onclick: async (langCode, langName, langOrig) => {
                                            Static.forms.languages.name = langName + ` (${langOrig})`;
                                            Static.forms.languages.code = langCode;
                                            Static.forms.languages.value = langName + ` (${langOrig})`;
                                            Static.forms.languages.el.value = langName + ` (${langOrig})`;
                                        }
                                    }, true)
                                }}
                            />
                        </div>

                        <div>
                            <label>Картинка <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImg.click()
                                }}
                            />
                                {
                                    Static.forms.image
                                        ?
                                        <img src={svg["delete_notes"]}
                                            onclick={() => {
                                                Static.forms.image = null
                                                initReload()
                                            }} />
                                        :
                                        null
                                }
                            </label>
                            <input
                                type="file"
                                hidden
                                Element={($el) => { Static.elInputImg = $el }}
                                onchange={async function (e) {
                                    e.stopPropagation();
                                    Array.from(this.files).forEach((item) => {
                                        fn.uploadMedia(
                                            item,
                                            "news",
                                            async function () {
                                                if (!this.response) {
                                                    alert("Произошла ошибка Попробуйте еще раз")
                                                    return
                                                }
                                                let response = JSON.parse(this.response);
                                                Static.forms.image = response.name
                                                initReload()
                                            }
                                        )
                                    })
                                    initReload()
                                }}
                            />
                            <div class="notes-content-img">
                                {
                                    Static.forms.image
                                        ?
                                        <div class="notes-img-wrapper">
                                            <img
                                                class="notes-img-preview"
                                                src={`/assets/upload/news/${Static.forms.image}`}
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                        :
                                        null
                                }

                            </div>
                        </div>

                        <div>
                            <label>Загаловок</label>
                            <input
                                placeholder="Загаловок"
                                type="text"
                                value={Static.forms.title}
                                oninput={function () {
                                    Static.forms.title = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Анонс (краткий)</label>
                            <textarea
                                placeholder="Анонс (краткий)"
                                rows={5}
                                value={Static.forms.preview}
                                textContent={Static.forms.preview}
                                oninput={function () {
                                    Static.forms.preview = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Текст новости</label>
                            <textarea
                                placeholder="Текст новости"
                                rows={10}
                                value={Static.forms.text}
                                textContent={Static.forms.text}
                                oninput={function () {
                                    Static.forms.text = this.value.trim()
                                }}
                            />
                        </div>


                        <div>
                            <label>Источник новости</label>
                            <input
                                placeholder="Источник новости"
                                type="text"
                                value={Static.forms.source}
                                oninput={function () {
                                    Static.forms.source = this.value.trim()
                                }}
                            />
                        </div>

                        <div
                            class="button-container-preview"
                            onclick={() => {
                                checkForm(Static, ID)
                            }}
                        >
                            <span class="btn-news-preview">
                                <span >
                                    {
                                        Static.item
                                            ?
                                            "Редактировать"
                                            :
                                            "Добавить"
                                    }

                                </span>
                            </span>
                        </div>

                        {
                            Static.item
                                ?
                                <div
                                    class="button-container-preview"
                                    onclick={async () => {
                                        data = {
                                            _id: Static.item._id,
                                            value: {
                                                active: false
                                            }
                                        }
                                        await fn.restApi.setIco.update(data)
                                        fn.siteLink("/DimaPage/")
                                    }}
                                >
                                    <span class="btn-news-preview">
                                        <span >
                                            Удалить
                                        </span>
                                    </span>
                                </div>
                                :
                                null
                        }

                    </div>
                </div>
            )
        }
    })

}


export default start;