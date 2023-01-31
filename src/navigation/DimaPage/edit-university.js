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
    if (!Static.forms.category || !Static.forms.category.name) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери категорию!!!" })
        return
    }
    let data = {
        value: {
            category: Static.forms.category,
        }
    }


    // console.log(data)
    if (!Static.item) {
        await fn.restApi.setNews.create(data)
    } else {
        data._id = Static.item._id
        await fn.restApi.setNews.update(data)
    }
    fn.siteLink("/DimaPage/")

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {

            if (!Static.item) {
                Static.forms = {}
                Static.forms.title = null
                Static.forms.slogan = null
                Static.forms.descriptionShort = null
                Static.forms.logo = null
                Static.forms.siteLink = null
                Static.forms.score = null
                Static.forms.media = []
                Static.forms.cover = null
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
                            <label>Логотип <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImg.click()
                                }}
                            />
                                {
                                    Static.forms.logo
                                        ?
                                        <img src={svg["delete_notes"]}
                                            onclick={() => {
                                                Static.forms.logo = null
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
                                                Static.forms.logo = response.name
                                                initReload()
                                            }
                                        )
                                    })
                                    initReload()
                                }}
                            />
                            <div class="notes-content-img">
                                {
                                    Static.forms.logo
                                        ?
                                        <div class="notes-img-wrapper">
                                            <img
                                                class="notes-img-preview"
                                                src={`/assets/upload/worldPress/${Static.forms.logo}`}
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
                            <label>Слоган</label>
                            <input
                                placeholder="Слоган"
                                type="text"
                                value={Static.forms.slogan}
                                oninput={function () {
                                    Static.forms.slogan = this.value.trim()
                                }}
                            />
                        </div>
                        <div>
                            <label>Краткое Описание</label>
                            <textarea
                                placeholder="Краткое Описание"
                                rows={5}
                                value={Static.forms.descriptionShort}
                                textContent={Static.forms.descriptionShort}
                                oninput={function () {
                                    Static.forms.descriptionShort = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div>
                            <label>Рейтинг</label>
                            <input
                                placeholder="Рейтинг"
                                type="number"
                                value={Static.forms.score}
                                oninput={function () {
                                    Static.forms.score = this.value
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
                            <label>Обложка <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImgCover.click()
                                }}
                            />
                                {
                                    Static.forms.cover
                                        ?
                                        <img src={svg["delete_notes"]}
                                            onclick={() => {
                                                Static.forms.cover = null
                                                initReload()
                                            }} />
                                        :
                                        null
                                }
                            </label>
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
                            <label>Галлерея <img class="notes-button__icon" src={svg["clip_notes"]}
                                onclick={() => {
                                    Static.elInputImgGallery.click()
                                }}
                            />
                                {
                                    Static.forms.media && Static.forms.media.length
                                        ?
                                        <img src={svg["delete_notes"]}
                                            onclick={() => {
                                                Static.forms.media = []
                                                initReload()
                                            }} />
                                        :
                                        null
                                }
                            </label>
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