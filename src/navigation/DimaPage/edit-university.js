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
                Static.forms.about = null
                Static.forms.logo = null
                Static.forms.siteLink = null
                Static.forms.score = null
                Static.forms.media = []
                Static.forms.cover = null
                Static.forms.teachers = []
                Static.forms.courses = []
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
                    <div class="c-adminform c-container">
                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">Название компании</label>
                            <input
                                class="c-adminform__field"
                                placeholder="Название"
                                type="text"
                                value={Static.forms.title}
                                oninput={function () {
                                    Static.forms.title = this.value.trim()
                                }}
                            />
                        </div>
                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label c-adminform__label--adding">
                                <span>Логотип</span>
                                <img class="c-adminform__addfile" src={svg["clip_notes"]}
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
                                class="c-adminform__field"
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
                            <div class="c-adminform__preview">
                                {
                                    Static.forms.logo
                                        ?
                                        <div class="c-adminform__wrapper">
                                            <img
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
                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">Слоган компании</label>
                            <input
                                class="c-adminform__field"
                                placeholder="Слоган"
                                type="text"
                                value={Static.forms.slogan}
                                oninput={function () {
                                    Static.forms.slogan = this.value.trim()
                                }}
                            />
                        </div>
                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">Краткое Описание</label>
                            <textarea
                                class="c-adminform__field"
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

                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">О компании</label>
                            <textarea
                                class="c-adminform__field"
                                placeholder="О компании"
                                rows={5}
                                value={Static.forms.about}
                                textContent={Static.forms.about}
                                oninput={function () {
                                    Static.forms.about = this.value.trim()
                                }}
                            // hidden={Static.forms.category == "ICO" ? true : false}
                            />
                        </div>

                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">Рейтинг</label>
                            <input
                                class="c-adminform__field"
                                placeholder="Рейтинг"
                                type="number"
                                value={Static.forms.score}
                                oninput={function () {
                                    Static.forms.score = this.value
                                }}
                            />
                        </div>
                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label">Web сайт</label>
                            <input
                                class="c-adminform__field"
                                placeholder="Web сайт"
                                type="text"
                                value={Static.forms.siteLink}
                                oninput={function () {
                                    Static.forms.siteLink = this.value.trim()
                                }}
                            />
                        </div>

                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label c-adminform__label--adding">
                                <span>Обложка</span>
                                <img class="c-adminform__addfile" src={svg["clip_notes"]}
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
                            <div class="c-adminform__preview">
                                {
                                    Static.forms.cover
                                        ?
                                        <div class="c-adminform__wrapper">
                                            <img
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

                        <div class="c-adminform__block">
                            <label for="" class="c-adminform__label c-adminform__label--adding">
                                <span>Галлерея</span>
                                <img class="c-adminform__addfile" src={svg["clip_notes"]}
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
                            <div class="c-adminform__preview">
                                {Static.forms.media.map((item => {

                                    return (
                                        <div class="c-adminform__wrapper">
                                            <img
                                                src={`/assets/upload/worldPress/${item.name}`}
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                    )
                                }))}
                            </div>
                        </div>

                        <div class="c-adminform__section">
                            <label for="" class="c-adminform__label c-adminform__label--title c-adminform__label--adding">
                                <span>Список преподавателей</span>
                                <img class="c-adminform__addfile" src={svg["add_chats"]}
                                    onclick={() => {
                                        Static.forms.teachers.push({})
                                        initReload()
                                    }}
                                /></label>
                            {
                                Static.forms.teachers.map((item, index) => {
                                    return (
                                        <div class="c-adminform__group">
                                            <h4 class="c-adminform__grouptitle">Преподаватель {index + 1}</h4>
                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">ФИО</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder={`ФИО`}
                                                    type="text"
                                                    value={item.name}
                                                    oninput={function () {
                                                        Static.forms.teachers[index].name = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Должность</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder={`Должность`}
                                                    type="text"
                                                    value={item.position}
                                                    oninput={function () {
                                                        Static.forms.teachers[index].position = this.value.trim()
                                                    }}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label c-adminform__label--adding">
                                                    <span>Фото</span>
                                                    <img class="c-adminform__addfile" src={svg["clip_notes"]}
                                                        onclick={() => {
                                                            Static.forms.teachers[index].el.click()
                                                        }}
                                                    /></label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    Element={($el) => { Static.forms.teachers[index].el = $el }}
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
                                                                    Static.forms.teachers[index].foto = response.name
                                                                    initReload()
                                                                }
                                                            )
                                                        })
                                                        initReload()
                                                    }}
                                                />
                                                
                                                <div class="c-adminform__preview">
                                                    {
                                                        Static.forms.teachers[index].foto
                                                            ?
                                                            <div class="c-adminform__wrapper">
                                                                <img
                                                                    src={`/assets/upload/worldPress/${Static.forms.teachers[index].foto}`}
                                                                    width="100"
                                                                    height="100"
                                                                />
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Биография</label>
                                                <textarea
                                                    class="c-adminform__field"
                                                    placeholder="Биография"
                                                    rows={5}
                                                    value={item.biography}
                                                    textContent={item.biography}
                                                    oninput={function () {
                                                        Static.forms.teachers[index].biography = this.value.trim()
                                                    }}
                                                // hidden={Static.forms.category == "ICO" ? true : false}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Личные достижения</label>
                                                <textarea
                                                    class="c-adminform__field"
                                                    placeholder="Достижения"
                                                    rows={5}
                                                    value={item.achievements}
                                                    textContent={item.achievements}
                                                    oninput={function () {
                                                        Static.forms.teachers[index].achievements = this.value.trim()
                                                    }}
                                                // hidden={Static.forms.category == "ICO" ? true : false}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div class="c-adminform__section">
                            <label for="" class="c-adminform__label c-adminform__label--title c-adminform__label--adding">
                                <span>Список курсов</span>
                                <img class="c-adminform__addfile" src={svg["add_chats"]}
                                    onclick={() => {
                                        Static.forms.courses.push({})
                                        initReload()
                                    }}
                                /></label>
                            {
                                Static.forms.courses.map((item, index) => {
                                    return (
                                        <div class="c-adminform__group">
                                            <h4 class="c-adminform__grouptitle">Курс {index + 1}</h4>
                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Название курса</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder={`Название`}
                                                    type="text"
                                                    value={item.name}
                                                    oninput={function () {
                                                        Static.forms.courses[index].name = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Категория</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder={`Категория`}
                                                    type="text"
                                                    value={item.category}
                                                    oninput={function () {
                                                        Static.forms.courses[index].category = this.value.trim()
                                                    }}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label c-adminform__label--adding">
                                                    <span>Фото</span>
                                                    <img class="c-adminform__addfile" src={svg["clip_notes"]}
                                                        onclick={() => {
                                                            Static.forms.courses[index].el.click()
                                                        }}
                                                    /></label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    Element={($el) => { Static.forms.courses[index].el = $el }}
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
                                                                    Static.forms.courses[index].foto = response.name
                                                                    initReload()
                                                                }
                                                            )
                                                        })
                                                        initReload()
                                                    }}
                                                />
                                                <div class="c-adminform__preview">
                                                    {
                                                        Static.forms.courses[index].foto
                                                            ?
                                                            <div class="c-adminform__wrapper">
                                                                <img
                                                                    src={`/assets/upload/worldPress/${Static.forms.courses[index].foto}`}
                                                                    width="100"
                                                                    height="100"
                                                                />
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Краткое описание</label>
                                                <textarea
                                                    class="c-adminform__field"
                                                    placeholder="Краткое описание"
                                                    rows={5}
                                                    value={item.descriptionShort}
                                                    textContent={item.descriptionShort}
                                                    oninput={function () {
                                                        Static.forms.courses[index].descriptionShort = this.value.trim()
                                                    }}
                                                // hidden={Static.forms.category == "ICO" ? true : false}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">О курсе</label>
                                                <textarea
                                                    class="c-adminform__field"
                                                    placeholder="О курсе"
                                                    rows={5}
                                                    value={item.about}
                                                    textContent={item.about}
                                                    oninput={function () {
                                                        Static.forms.courses[index].about = this.value.trim()
                                                    }}
                                                // hidden={Static.forms.category == "ICO" ? true : false}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Рейтинг курса</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder="Рейтинг курса"
                                                    type="number"
                                                    value={item.rating}
                                                    oninput={function () {
                                                        Static.forms.courses[index].rating = this.value
                                                    }}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Время обучения</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder={`Время обучения`}
                                                    type="text"
                                                    value={item.duration}
                                                    oninput={function () {
                                                        Static.forms.courses[index].duration = this.value.trim()
                                                    }}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Количество часов</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder="Количество часов"
                                                    type="number"
                                                    value={item.hours}
                                                    oninput={function () {
                                                        Static.forms.courses[index].hours = this.value
                                                    }}
                                                />
                                            </div>

                                            <div class="c-adminform__block">
                                                <label for="" class="c-adminform__label">Прямая ссылка для записи на курс</label>
                                                <input
                                                    class="c-adminform__field"
                                                    placeholder="Ссылка на курс"
                                                    type="text"
                                                    value={item.courseLink}
                                                    oninput={function () {
                                                        Static.forms.courses[index].courseLink = this.value.trim()
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
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