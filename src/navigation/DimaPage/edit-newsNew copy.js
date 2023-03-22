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

const updateValue = async function (Static, { key, value }) {
    if (Static.timerChange[key]) {
        clearTimeout(Static.timerChange[key]);
        delete Static.timerChange[key]
    }
    Static.timerChange[key] = setTimeout(async () => {
        let val = {}
        // val[key] = fn.editText(value, { clear: true })
        val[key] = value
        updateRecords(Static, val)
    }, 300);
}

const updateRecords = async function (Static, value) {
    let data = {
        _id: Static.item._id,
        value
    }
    let responce = await fn.restApi.setNews.update(data)
    let [StaticMain] = fn.GetParams({ actual: true })
    if (StaticMain && StaticMain.recordsItem && StaticMain.recordsItem.list_records && responce && responce.list_records && responce.list_records[0] && responce.list_records[0]._id) {
        StaticMain.recordsItem.list_records.forEach((item, index) => {
            if (item._id == responce.list_records[0]._id) {
                StaticMain.recordsItem.list_records[index] = responce.list_records[0]
            }
        })
    }

}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })
    Static.timerChange = []
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
                    <div class="i-panel">
                        <div>
                            {
                                Static.listCategory.list_records.map((item) => {
                                    return (<div class={["tag_button", Static.forms.category.name == item.name ? "tag_button_active" : null]}
                                        onclick={() => {
                                            Static.forms.category.name = item.name
                                            Static.forms.category.type = "news"
                                            updateRecords(Static, { category: Static.forms.category })
                                            // Static.item.title = "fddfdffdfd"
                                            initReload()
                                        }}>
                                        <span>{item.name}</span>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <div class="i-flex">
                            <input
                                class="i-input"
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
                                            updateRecords(Static, { languages: Static.forms.languages.code })
                                        }
                                    }, true)
                                }} />
                            <div>
                                <input
                                    class="i-input"
                                    type="datetime-local"
                                    value={fn.getDateFormat(Static.forms.showDate, "time")}
                                    // valueAsDate={new Date()}
                                    oninput={function () {
                                        Static.forms.showDate = this.value
                                        updateValue(Static, { key: "showDate", value: Static.forms.showDate })
                                    }}
                                />
                            </div>
                            <div>
                                <label>Просмотры</label>
                                <input
                                    class="i-input"
                                    type="number"
                                    value={Static.item.statistic.view}
                                    // valueAsDate={new Date()}
                                    oninput={function () {
                                        // Static.forms.showDate = this.value
                                        updateValue(Static, { key: "statistic.view", value: this.value })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div class="full_news_content">
                                <h1
                                    class="full_news_name edit-area"
                                    contenteditable={true}
                                    textContent={Static.forms.title != "" ? Static.forms.title : ""}
                                    data-text="Укажи загаловок"
                                    oninput={function () {
                                        Static.forms.title = this.textContent
                                        updateValue(Static, { key: "title", value: Static.forms.title })
                                        // console.log('=5a0798=', Static.forms.title)
                                    }}></h1>
                                {
                                    Static.forms.image ?
                                        <img class="full_news_image" src={`/assets/upload/news/${Static.forms.image}`} onclick={() => {
                                            Static.elInputImg.click()
                                        }} />
                                        :
                                        <img class="full_news_image" src={images.ecosystem} onclick={() => {
                                            Static.elInputImg.click()
                                        }} />
                                }
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
                                                    updateRecords(Static, { image: Static.forms.image })
                                                    initReload()
                                                }
                                            )
                                        })
                                    }}
                                />
                                <p class="full_news_text mrb30 edit-area"
                                    contenteditable={true}
                                    // textContent={Static.forms.preview != "" ? Static.forms.preview : ""}
                                    data-text="Укажи Анонс"
                                    oninput={function () {
                                        Static.forms.preview = this.innerText
                                        updateValue(Static, { key: "preview", value: Static.forms.preview })
                                    }}
                                >{Static.forms.preview != "" ? fn.editText(Static.forms.preview, { clear: true, paragraph: true, html: true }) : ""}
                                </p>

                                <p class="full_news_text mr20 edit-area"
                                    contenteditable={true}
                                    data-text="Укажи текст новости"
                                    // textContent={Static.forms.text != "" ? Static.forms.text : ""}
                                    oninput={function () {
                                        // Static.forms.text = this.textContent
                                        Static.forms.text = this.innerText
                                        updateValue(Static, { key: "text", value: Static.forms.text })
                                    }}
                                >{Static.forms.text != "" ? fn.editText(Static.forms.text, { clear: true, paragraph: true, html: true }) : ""}</p>

                                <label>Источник: <p class="full_news_disclaimer mr20 edit-area"
                                    contenteditable={true}
                                    data-text="Укажи источник"
                                    oninput={function () {
                                        // Static.forms.text = this.textContent
                                        Static.forms.source = this.innerText
                                        updateValue(Static, { key: "source", value: Static.forms.source })
                                    }}
                                >{Static.forms.source}</p></label>
                                {/* <div style="display: flex" class="blog_post_stat">
                                    <p class="full_news_date">
                                        <img src={svg["question_views"]} /> {Static.item.statistic.view}
                                    </p>
                                    <p class="full_news_date">
                                        <img src={svg["question_answers"]} />
                                        {Static.item.statistic.comments}
                                    </p>
                                    <p class="full_news_date">{fn.getDateFormat(Static.item.showDate)}</p>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    })

}


export default start;