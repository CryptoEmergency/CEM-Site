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

    if (!Static.forms.icon) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери иконку!!!" })
        return
    }

    if (!Static.forms.cover && !Static.forms.coverVideo) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери обложку или укажи ссылку на Ютуб!!!" })
        return
    }

    if (!Static.forms.descriptionShort) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи описание Краткое!!!" })
        return
    }

    if (!Static.forms.description) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи описание полное!!!" })
        return
    }


    let data = {
        value: {
            icon: Static.forms.icon,
            cover: Static.forms.cover,
            coverVideo: Static.forms.coverVideo,
            siteLink: Static.forms.siteLink,
            whitePaperLink: Static.forms.whitePaperLink,
            descriptionShort: Static.forms.descriptionShort,
            description: Static.forms.description,
            media: Static.forms.media,
            team: Static.forms.team,
            roadMap: Static.forms.roadMap,
            totalSupply: Static.forms.totalSupply,
            tokenomica: Static.forms.tokenomica,
            descriptionMore: Static.forms.descriptionMore,
            social: [],
            limited: Static.forms.limited
        }
    }

    if (Static.forms.country && Static.forms.country.code) {
        data.value.country = Static.forms.country.code
    }

    // if (Static.forms.siteLink) {
    //     data.value.siteLink = Static.forms.siteLink
    // }

    // if (Static.forms.whitePaperLink) {
    //     data.value.whitePaperLink = Static.forms.whitePaperLink
    // }

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
        await fn.restApi.setStartaps.create(data)
    } else {
        data._id = Static.item._id
        await fn.restApi.setStartaps.update(data)
    }
    fn.siteLink("/DimaPage/")

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    // console.log('=dc5388=', data)

    load({
        ID,
        fnLoad: () => {
            if (!Static.item) {
                Static.forms = {}
                Static.forms.icon = null
                Static.forms.cover = null
                Static.forms.coverVideo = null
                Static.forms.siteLink = null
                Static.forms.whitePaperLink = null
                Static.forms.descriptionShort = null
                Static.forms.description = null
                Static.forms.social = {
                    youtube: {},
                    facebook: {},
                    twitter: {},
                    discord: {},
                    instagram: {},
                    tiktok: {},
                    twitch: {},
                    vk: {},
                    telegram: {},
                    github: {},
                    linkedin: {},
                }
                Static.forms.media = []
                Static.forms.country = {}
                Static.forms.team = []
                Static.forms.roadMap = []
                Static.forms.totalSupply = null
                Static.forms.limited = true
                Static.forms.tokenomica = []
                // Static.forms.tokenomica = {
                //     team: 0,
                //     marketing: 0,
                //     staking: 0,
                //     preSale: 0,
                //     airDrops: 0,
                //     publickSale: 0,
                //     reserveCompany: 0,
                //     charity: 0,
                //     investors: 0,
                //     baunty: 0,
                //     ico: 0
                // }
                Static.forms.descriptionMore = null

            } else {
                Static.forms = Object.assign({}, Static.item)

                Static.forms.social = {
                    youtube: {},
                    facebook: {},
                    twitter: {},
                    discord: {},
                    instagram: {},
                    tiktok: {},
                    twitch: {},
                    vk: {},
                    telegram: {},
                    github: {},
                    linkedin: {},
                }
                if (!Static.forms.country) {
                    Static.forms.country = {}
                }

                if (Static.item.social && Static.item.social.length) {
                    for (let tmp of Static.item.social) {
                        Static.forms.social[tmp.channel].url = tmp.url
                    }
                }
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

                        <div>
                            <label>Иконка <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImg.click()
                                }}
                            />
                                {
                                    Static.forms.icon
                                        ?
                                        <img src={svg["delete_notes"]}
                                            onclick={() => {
                                                Static.forms.icon = null
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
                            <label>Правильная ссылка на Ютуб видео</label>
                            <input
                                placeholder="Правильная ссылка на Ютуб видео"
                                type="text"
                                value={Static.forms.coverVideo}
                                oninput={function () {
                                    Static.forms.coverVideo = this.value.trim()
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
                            <label>Описание Краткое</label>
                            <textarea
                                placeholder="Описание Краткое"
                                rows={10}
                                value={Static.forms.descriptionShort}
                                textContent={Static.forms.descriptionShort}
                                oninput={function () {
                                    Static.forms.descriptionShort = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div>
                            <label>Описание</label>
                            <textarea
                                placeholder="Описание"
                                rows={10}
                                value={Static.forms.description}
                                textContent={Static.forms.description}
                                oninput={function () {
                                    Static.forms.description = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div>
                            <label>Ссылка на youtube </label>
                            <input
                                placeholder="Ссылка на youtube"
                                type="text"
                                value={Static.forms.social.youtube ? Static.forms.social.youtube.url : null}
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
                                value={Static.forms.social.facebook ? Static.forms.social.facebook.url : null}
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
                                value={Static.forms.social.twitter ? Static.forms.social.twitter.url : null}
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
                                value={Static.forms.social.discord ? Static.forms.social.discord.url : null}
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
                                value={Static.forms.social.instagram ? Static.forms.social.instagram.url : null}
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
                                value={Static.forms.social.tiktok ? Static.forms.social.tiktok.url : null}
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
                                value={Static.forms.social.twitch ? Static.forms.social.twitch.url : null}
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
                                value={Static.forms.social.vk ? Static.forms.social.vk.url : null}
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
                                value={Static.forms.social.telegram ? Static.forms.social.telegram.url : null}
                                oninput={function () {
                                    Static.forms.social.telegram.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на github </label>
                            <input
                                placeholder="Ссылка на github"
                                type="text"
                                value={Static.forms.social.github ? Static.forms.social.github.url : null}
                                oninput={function () {
                                    Static.forms.social.github.url = this.value.trim()
                                }}
                            />
                        </div>

                        <div>
                            <label>Ссылка на linkedin </label>
                            <input
                                placeholder="Ссылка на linkedin"
                                type="text"
                                value={Static.forms.social.linkedin ? Static.forms.social.linkedin.url : null}
                                oninput={function () {
                                    Static.forms.social.linkedin.url = this.value.trim()
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
                            <label>Страна </label>
                            <input
                                placeholder="Выбери страну"
                                type="text"
                                readonly
                                value={Static.forms.country.eng_name}
                                // value="hhh"
                                Element={(el) => {
                                    Static.forms.country.el = el
                                }}
                                onclick={() => {
                                    fn.modals.ModalSelectCountry({
                                        onclick: async (countryCode, countryName) => {
                                            Static.forms.country.name = countryName;
                                            Static.forms.country.code = countryCode;
                                            Static.forms.country.value = countryName;
                                            Static.forms.country.eng_name = countryName;

                                            Static.forms.country.el.value = countryName
                                        }
                                    }, true)
                                }}
                            />
                        </div>

                        <div>
                            <label>Команда <img class="notes-button__icon" src={svg["like_icon"]}
                                onclick={() => {
                                    Static.forms.team.push({})
                                    initReload()
                                }}
                            /></label>
                            {
                                Static.forms.team.map((item, index) => {
                                    return (
                                        <div>
                                            <div>
                                                <label>Член {index + 1} ФИО</label>
                                                <input
                                                    placeholder={`Член ${index + 1} ФИО`}
                                                    type="text"
                                                    value={item.name}
                                                    oninput={function () {
                                                        Static.forms.team[index].name = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label>Член {index + 1} Должность</label>
                                                <input
                                                    placeholder={`Член ${index + 1} Должность`}
                                                    type="text"
                                                    value={item.position}
                                                    oninput={function () {
                                                        Static.forms.team[index].position = this.value.trim()
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label>Член {index + 1} Фото <img class="notes-button__icon" src={svg["clip_notes"]}
                                                    onclick={() => {
                                                        Static.forms.team[index].el.click()
                                                    }}
                                                /></label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    Element={($el) => { Static.forms.team[index].el = $el }}
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
                                                                    Static.forms.team[index].foto = response.name
                                                                    initReload()
                                                                }
                                                            )
                                                        })
                                                        initReload()
                                                    }}
                                                />
                                                <div class="notes-content-img">
                                                    {
                                                        Static.forms.team[index].foto
                                                            ?
                                                            <div class="notes-img-wrapper">
                                                                <img
                                                                    class="notes-img-preview"
                                                                    src={`/assets/upload/worldPress/${Static.forms.team[index].foto}`}
                                                                    width="350"
                                                                    height="100"
                                                                />
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>



                        <div>
                            <label>Дорожная карта <img class="notes-button__icon" src={svg["like_icon"]}
                                onclick={() => {
                                    Static.forms.roadMap.push({})
                                    initReload()
                                }}
                            /></label>
                            {
                                Static.forms.roadMap.map((item, index) => {
                                    return (
                                        <div>
                                            <div>
                                                <label>Событие {index + 1} год</label>
                                                <input
                                                    placeholder={`Событие ${index + 1} год`}
                                                    type="text"
                                                    value={item.year}
                                                    oninput={function () {
                                                        Static.forms.roadMap[index].year = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label>Событие {index + 1} месяц</label>
                                                <input
                                                    placeholder={`Событие ${index + 1} месяц`}
                                                    type="text"
                                                    value={item.month}
                                                    oninput={function () {
                                                        Static.forms.roadMap[index].month = this.value.trim()
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label>{`Событие ${index + 1} описание`}</label>
                                                <textarea
                                                    placeholder={`Событие ${index + 1} описание`}
                                                    rows={7}
                                                    value={item.description}
                                                    textContent={item.description}
                                                    oninput={function () {
                                                        Static.forms.roadMap[index].description = this.value.trim()
                                                    }}
                                                // hidden={Static.forms.category == "ICO" ? true : false}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            <label>Всего выпущено</label>
                            <input
                                placeholder="Всего выпущено"
                                required="required"
                                type="number"
                                value={Static.forms.totalSupply}
                                oninput={function () {
                                    Static.forms.totalSupply = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>Кого ищет</label>
                            <textarea
                                placeholder="Кого ищет"
                                rows={10}
                                value={Static.forms.descriptionMore}
                                textContent={Static.forms.descriptionMore}
                                oninput={function () {
                                    Static.forms.descriptionMore = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div>
                            <label>Ограниченный выпуск</label>
                            <input
                                type="checkbox"
                                checked={Static.forms.limited}
                                oninput={function () {
                                    Static.forms.limited = !Static.forms.limited
                                }}
                            />
                        </div>
                        <div class="mb--20">
                            <label>Токеномика <img class="notes-button__icon" src={svg["like_icon"]}
                                onclick={() => {
                                    Static.forms.tokenomica.push({})
                                    initReload()
                                }}
                            /></label>
                            {
                                Static.forms.tokenomica.map((item, index) => {
                                    return (
                                        <div>
                                            <div>
                                                <label>Название</label>
                                                <input
                                                    placeholder={`Название`}
                                                    type="text"
                                                    value={item.name}
                                                    oninput={function () {
                                                        Static.forms.tokenomica[index].name = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label>Значение %</label>
                                                <input
                                                    placeholder={`Значение %`}
                                                    type="text"
                                                    value={item.value}
                                                    oninput={function () {
                                                        Static.forms.tokenomica[index].value = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* <div>
                            <label>На команду %</label>
                            <input
                                placeholder="На команду %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.team}
                                oninput={function () {
                                    Static.forms.tokenomica.team = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На маркетинг %</label>
                            <input
                                placeholder="На маркетинг %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.marketing}
                                oninput={function () {
                                    Static.forms.tokenomica.marketing = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На стейкинг %</label>
                            <input
                                placeholder="На стейкинг %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.staking}
                                oninput={function () {
                                    Static.forms.tokenomica.staking = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На pre продажу %</label>
                            <input
                                placeholder="На pre продажу %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.preSale}
                                oninput={function () {
                                    Static.forms.tokenomica.preSale = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На Air Drop %</label>
                            <input
                                placeholder="На Air Drop %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.airDrops}
                                oninput={function () {
                                    Static.forms.tokenomica.airDrops = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На Publick sale %</label>
                            <input
                                placeholder="На Publick sale %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.publickSale}
                                oninput={function () {
                                    Static.forms.tokenomica.publickSale = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На резерв компании %</label>
                            <input
                                placeholder="На резерв компании %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.reserveCompany}
                                oninput={function () {
                                    Static.forms.tokenomica.reserveCompany = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На благотворительность %</label>
                            <input
                                placeholder="На благотворительность %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.charity}
                                oninput={function () {
                                    Static.forms.tokenomica.charity = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На инвесторов %</label>
                            <input
                                placeholder="На инвесторов %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.investors}
                                oninput={function () {
                                    Static.forms.tokenomica.investors = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На Баунти %</label>
                            <input
                                placeholder="На Баунти %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.baunty}
                                oninput={function () {
                                    Static.forms.tokenomica.baunty = this.value
                                }}
                            />
                        </div>

                        <div>
                            <label>На ICO %</label>
                            <input
                                placeholder="На ICO %"
                                required="required"
                                type="number"
                                value={Static.forms.tokenomica.ico}
                                oninput={function () {
                                    Static.forms.tokenomica.ico = this.value
                                }}
                            />
                        </div> */}

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
                                        await fn.restApi.setStartaps.update(data)
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