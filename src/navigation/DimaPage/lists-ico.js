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

    if (!Static.forms.cover) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери обложку!!!" })
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

    console.log(data)
    await fn.restApi.setIco.create(data)
    fn.siteLink("/DimaPage/")

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    Static.forms = {}
    Static.forms.category = null
    Static.forms.icon = null
    Static.forms.title = null
    Static.forms.description = null
    Static.forms.cover = null
    Static.forms.startDate = null
    Static.forms.endDate = null
    Static.forms.targetMoney = null
    Static.forms.nowMoney = null // не обязательно
    Static.forms.siteLink = null
    Static.forms.whitePaperLink = null
    Static.forms.name = null
    Static.forms.type = null
    Static.forms.price = null
    Static.forms.sellType = "USDT"
    Static.forms.totalSupply = null
    Static.forms.forSell = null
    Static.forms.targetSell = null
    Static.forms.review = null
    Static.forms.checked = false
    Static.forms.media = []

    Static.forms.social = {
        youtube: {},
        facebook: {},
        twitter: {},
        discord: {},
        instagram: {},
        tiktok: {},
        twitch: {},
        vk: {},
        telegram: {}
    }


    load({
        ID,
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            return (
                <div class="c-main__body">

                    <div class="contacts_form">
                        <div class={["tag_button", Static.forms.category == "ICO" ? "tag_button_active" : null]}
                            onclick={() => {
                                Static.forms.category = "ICO"
                                initReload()
                            }}>
                            <span>ICO</span>
                        </div>
                        <div class={["tag_button", Static.forms.category == "IDO" ? "tag_button_active" : null]} onclick={() => {
                            Static.forms.category = "IDO"
                            initReload()
                        }}>
                            <span>IDO</span>
                        </div>
                        <div class={["tag_button", Static.forms.category == "IEO" ? "tag_button_active" : null]} onclick={() => {
                            Static.forms.category = "IEO"
                            initReload()
                        }}>
                            <span>IEO</span>
                        </div>
                        <div class={["tag_button", Static.forms.category == "IGO" ? "tag_button_active" : null]} onclick={() => {
                            Static.forms.category = "IGO"
                            initReload()
                        }}>
                            <span>IGO</span>
                        </div>

                        <div>
                            <label>Иконка <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImg.click()
                                }}
                            /></label>
                            <input
                                type="file"
                                hidden
                                Element={($el) => { Static.elInputImg = $el }}
                                onchange={async function (e) {
                                    e.stopPropagation();
                                    Array.from(this.files).forEach((item) => {
                                        fn.uploadMedia(
                                            item,
                                            "worldPress",
                                            async function () {
                                                if (!this.response) {
                                                    alert("Произошла ошибка Попробуйте еще раз")
                                                    return
                                                }
                                                let response = JSON.parse(this.response);
                                                Static.forms.icon = response.name
                                                initReload()
                                            }
                                        )
                                    })
                                    initReload()
                                }}
                            />
                            <div class="notes-content-img">
                                {
                                    Static.forms.icon
                                        ?
                                        <div class="notes-img-wrapper">
                                            <img
                                                class="notes-img-preview"
                                                src={`/assets/upload/worldPress/${Static.forms.icon}`}
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
                            <label>Название</label>
                            <input
                                placeholder="Название"
                                type="text"
                                value={Static.forms.title}
                                oninput={function () {
                                    Static.forms.title = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Описание</label>
                            <textarea
                                placeholder="Описание"
                                rows={10}
                                value={Static.forms.description}
                                oninput={function () {
                                    Static.forms.description = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div>
                            <label>Обложка <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImgCover.click()
                                }}
                            /></label>
                            <input
                                type="file"
                                hidden
                                Element={($el) => { Static.elInputImgCover = $el }}
                                onchange={async function (e) {
                                    e.stopPropagation();
                                    Array.from(this.files).forEach((item) => {
                                        fn.uploadMedia(
                                            item,
                                            "worldPress",
                                            async function () {
                                                if (!this.response) {
                                                    alert("Произошла ошибка Попробуйте еще раз")
                                                    return
                                                }
                                                let response = JSON.parse(this.response);
                                                Static.forms.cover = response.name
                                                initReload()
                                            }
                                        )
                                    })
                                    initReload()
                                }}
                            />
                            <div class="notes-content-img">
                                {
                                    Static.forms.cover
                                        ?
                                        <div class="notes-img-wrapper">
                                            <img
                                                class="notes-img-preview"
                                                src={`/assets/upload/worldPress/${Static.forms.cover}`}
                                                width="350"
                                                height="100"
                                            />
                                        </div>
                                        :
                                        null
                                }

                            </div>
                        </div>
                        <div>
                            <label>Дата запуска</label>
                            <input
                                type="datetime-local"
                                oninput={function () {
                                    Static.forms.startDate = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>Дата окончания</label>
                            <input
                                type="datetime-local"
                                oninput={function () {
                                    Static.forms.endDate = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>Цель в $</label>
                            <input
                                placeholder="Цель в $"
                                type="number"
                                value={Static.forms.targetMoney}
                                oninput={function () {
                                    Static.forms.targetMoney = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Собрано в $</label>
                            <input
                                placeholder="Собрано в $"
                                type="number"
                                value={Static.forms.nowMoney}
                                oninput={function () {
                                    Static.forms.nowMoney = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Web сайт</label>
                            <input
                                placeholder="Web сайт"
                                type="text"
                                value={Static.forms.siteLink}
                                oninput={function () {
                                    Static.forms.siteLink = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на White Paper </label>
                            <input
                                placeholder="Ссылка на White Paper"
                                type="text"
                                value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.whitePaperLink = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Имя </label>
                            <input
                                placeholder="Имя"
                                type="text"
                                value={Static.forms.name}
                                oninput={function () {
                                    Static.forms.name = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Тип </label>
                            <input
                                placeholder="Тип"
                                type="text"
                                value={Static.forms.type}
                                oninput={function () {
                                    Static.forms.type = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Продажа за</label>
                            <input
                                placeholder="Продажа за"
                                type="text"
                                value={Static.forms.sellType}
                                oninput={function () {
                                    Static.forms.sellType = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Цена</label>
                            <input
                                placeholder="Цена в $"
                                type="number"
                                value={Static.forms.price}
                                oninput={function () {
                                    Static.forms.price = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Всего выпущено</label>
                            <input
                                placeholder="Всего выпущено"
                                required="required"
                                type="number"
                                value={Static.forms.totalSupply}
                                oninput={function () {
                                    Static.forms.totalSupply = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Для продажи</label>
                            <input
                                placeholder="Для продажи"
                                type="number"
                                value={Static.forms.forSell}
                                oninput={function () {
                                    Static.forms.forSell = this.value.trim()
                                }}
                            />
                        </div>


                        <div>
                            <label>Цель продать</label>
                            <input
                                placeholder="Цель продать"
                                type="number"
                                value={Static.forms.targetSell}
                                oninput={function () {
                                    Static.forms.targetSell = this.value.trim()
                                }}
                            />
                        </div>


                        <div>
                            <label>Краткий обзор</label>
                            <textarea
                                placeholder="Краткий обзор"
                                rows={5}
                                value={Static.forms.review}
                                oninput={function () {
                                    Static.forms.review = this.value.trim()
                                }}
                            />
                        </div>


                        <div>
                            <label>Галлерея <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImgGallery.click()
                                }}
                            /></label>
                            <input
                                type="file"
                                hidden
                                multiple
                                Element={($el) => { Static.elInputImgGallery = $el }}
                                onchange={async function (e) {
                                    e.stopPropagation();
                                    Static.forms.media = []
                                    Array.from(this.files).forEach((item) => {
                                        fn.uploadMedia(
                                            item,
                                            "worldPress",
                                            async function () {
                                                if (!this.response) {
                                                    alert("Произошла ошибка Попробуйте еще раз")
                                                    return
                                                }
                                                let response = JSON.parse(this.response);
                                                let data = {
                                                    type: response.mimetype,
                                                    name: response.name
                                                }

                                                Static.forms.media.push(data)
                                                initReload()
                                            }
                                        )
                                    })
                                    initReload()
                                }}
                            />
                            <div class="notes-content-img">
                                {Static.forms.media.map((item => {

                                    return (
                                        <div class="notes-img-wrapper">
                                            <img
                                                class="notes-img-preview"
                                                src={`/assets/upload/worldPress/${item.name}`}
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                    )
                                }))}
                            </div>
                        </div>

                        <div>
                            <label>Ссылка на youtube </label>
                            <input
                                placeholder="Ссылка на youtube"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.youtube.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на facebook </label>
                            <input
                                placeholder="Ссылка на facebook"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.facebook.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на twitter </label>
                            <input
                                placeholder="Ссылка на twitter"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.twitter.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на discord </label>
                            <input
                                placeholder="Ссылка на discord"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.discord.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на instagram </label>
                            <input
                                placeholder="Ссылка на instagram"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.instagram.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на tiktok </label>
                            <input
                                placeholder="Ссылка на tiktok"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.tiktok.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на twitch </label>
                            <input
                                placeholder="Ссылка на twitch"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.twitch.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на vk </label>
                            <input
                                placeholder="Ссылка на vk"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.vk.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на telegram </label>
                            <input
                                placeholder="Ссылка на telegram"
                                type="text"
                                // value={Static.forms.whitePaperLink}
                                oninput={function () {
                                    Static.forms.social.telegram.url = this.value.trim()
                                }}
                            />
                        </div>


                        <div>
                            <label>Проверенно</label>
                            <input
                                type="checkbox"
                                oninput={function () {
                                    Static.forms.checked = !Static.forms.checked
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
                                    Добавить
                                </span>
                            </span>
                        </div>

                    </div>
                </div>
            )
        }
    })

}


export default start;