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

    if (!Static.forms.languages || !Static.forms.languages.code) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери язык новости!!!" })
        return
    }

    if (!Static.forms.image) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Выбери картинку!!!" })
        return
    }

    if (!Static.forms.title) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи загаловок!!!" })
        return
    }

    if (!Static.forms.preview) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи Анонс!!!" })
        return
    }

    if (!Static.forms.text) {
        fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи Текст новости!!!" })
        return
    }



    // if (!Static.forms.startDate) {
    //     fn.modals.ModalAlarm({ icon: "alarm_icon", text: "Укажи дату запуска!!!" })
    //     return
    // }

    let data = {
        value: {
            category: Static.forms.category,
            image: Static.forms.image,
            title: Static.forms.title,
            preview: Static.forms.preview,
            text: Static.forms.text,
            source: Static.forms.source,
            showDate: Static.forms.showDate,
        }
    }

    data.value.languages = Static.forms.languages.code


    // console.log(data)
    if (!Static.item) {
        await fn.restApi.setNews.create(data)
    } else {
        data._id = Static.item._id
        await fn.restApi.setNews.update(data)
    }
    fn.siteLink("/DimaPage/")

}

const updateRecords = async function (Static, value) {
    let data = {
        _id: Static.item._id,
        value
    }
    let responce = await fn.restApi.setNews.update(data)
    let [StaticMain] = fn.GetParams({ actual: true })
    console.log('=3f9f36=', StaticMain, responce)
    if (StaticMain && StaticMain.recordsItem && Static.recordsItem.list_records && responce && responce.list_records && responce.list_records[0] && responce.list_records[0]._id) {
        Static.recordsItem.list_records.forEach((item, index) => {
            if (item._id == responce.list_records[0]._id) {
                console.log('=a6d1d2=', index, item)
            }
        })
    }

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            Static.listCategory = await fn.restApi.getCategories({ filter: { type: "news" }, defaultReset: true })



            if (!Static.item) {
                Static.forms = {}
                Static.forms.category = {}
                Static.forms.image = null
                Static.forms.title = null
                Static.forms.preview = null
                Static.forms.text = null
                Static.forms.source = null
                Static.forms.showDate = null
                Static.forms.languages = {}



            } else {
                Static.forms = Object.assign({}, Static.item)
            }
            if (!Static.forms.category) {
                Static.forms.category = {}
            }
            // console.log('=a11bea=', Static.forms)
        },
        fn: () => {

            // if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status || !Variable.myInfo.role){
            if (!Variable.auth || !Variable.myInfo || !Variable.myInfo.status) {
                fn.siteLink("/")
                return
            }

            if (!Static.item || !Static.item._id) {
                if (Variable.ModalsPage.length) {
                    Variable.ModalsPage.splice(Variable.ModalsPage.length - 1, 1)
                    initReload("modalsPage")
                } else {
                    fn.siteLink("/DimaPage/records-newsNew/")
                }
                return
            }

            return (
                <div class="c-main__body">
                    <div class="contacts_form">
                        <div>
                            {
                                Static.listCategory.list_records.map((item) => {
                                    return (<div class={["tag_button", Static.forms.category.name == item.name ? "tag_button_active" : null]}
                                        onclick={() => {
                                            Static.forms.category.name = item.name
                                            Static.forms.category.type = "news"
                                            updateRecords(Static, { category: Static.forms.category })
                                            Static.item.title = "fddfdffdfd"
                                            initReload()
                                        }}>
                                        <span>{item.name}</span>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <label>Язык </label>
                            <input
                                placeholder="Выбери Язык"
                                type="text"
                                readonly
                                value={Static.forms.languages.eng_name}
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
                                            Static.forms.languages.eng_name = Static.forms.languages.value
                                        }
                                    }, true)
                                }} />
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
                                rows={20}
                                // value={Static.forms.text}
                                textContent={fn.editText(Static.forms.text, { clear: true })}
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

                        <div>
                            <label>Дата показа</label>
                            <input
                                type="datetime-local"
                                value={fn.getDateFormat(Static.forms.showDate, "time")}
                                // valueAsDate={new Date()}
                                oninput={function () {
                                    Static.forms.showDate = this.value
                                    // console.log('=91916f=', fn.getDateFormat(Static.forms.startDate, "time"))
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
                                        await fn.restApi.setNews.update(data)
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