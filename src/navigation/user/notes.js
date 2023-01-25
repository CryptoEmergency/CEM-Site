import {
    jsx,
    jsxFrag,
    load,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { MediaButton } from '@component/element/index.js';


// Добавление новой заметки.
// Подсмотрел другую интересную логику по созданию новой заметки. Ее нельзя создать, пока последняя созданная является пустой.
// но они сразу добавляются в базу
const addNew = async function (Static) {
    if (Static.notesList.list_records.length != 0 && (Static.notesList.list_records[0].title == "" && Static.notesList.list_records[0].text == "" && !Static.notesList.list_records[0].media.length)) {
        Static.activeNotes = Static.notesList.list_records[0]
    } else {
        const response = await fn.restApi.setNotes.create({ title: "", text: "", media: [], showDate: new Date().toISOString() })
        if (response && response.status == "ok") {
            if (response.list_records && response.list_records[0]) {
                Static.notesList.list_records.unshift(response.list_records[0])
                Static.activeNotes = Static.notesList.list_records
            }
        }
    }
    initReload()
}

const deleteNote = function (Static) {
    const index = Static.notesList.list_records.indexOf(Static.activeNotes)
    Static.notesList.list_records.splice(index, 1)
    Static.activeNotes = null
}

const editNotes = async function (Static) {
    if (Static.timerChange) {
        clearTimeout(Static.timerChange);
    }
    Static.timerChange = setTimeout(async () => {
        await fn.restApi.setNotes.update(Static.activeNotes)
        initReload()
    }, 300);
}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })
    // Первоначальные данные потом переносим в отдельное место
    Static.elTitle = null
    Static.elText = null
    Static.elInputImg = null
    Static.activeNotes = null
    Static.timerChange = null


    load({
        ID,
        fnLoad: async () => {
            // Отправляем запрос на болучение данных из базы
            Static.notesList = await fn.restApi.getNotes({ filter: {} })
            console.log('=8451ba=', Static.notesList)
        },
        fn: () => {
            return (
                <div class="blog_page_container c-main__body">
                    <div class="notes">
                        <h2>Notes</h2>
                        <div class="notes_container">
                            <div class="notes-content">
                                <div class={["notes-list", Static.activeNotes ? "dead" : null]}>
                                    <button class="notes-button"
                                        onclick={() => {
                                            addNew(Static)
                                        }}>
                                        <span>Новая заметка</span>
                                    </button>
                                    {Static.notesList.list_records.map(function (item) {
                                        return (
                                            <div
                                                class={["notes-item", Static.activeNotes && Static.activeNotes._id == item._id ? "notes-item_active" : null]}
                                                onclick={() => {
                                                    // console.log(Static.activeNotes)
                                                    Static.activeNotes = item
                                                    initReload()
                                                }}>
                                                <h3>{
                                                    Static.activeNotes && Static.activeNotes._id == item._id
                                                        ?
                                                        Static.activeNotes.title != "" ? Static.activeNotes.title : "Без названия"
                                                        :
                                                        item.title != "" ? item.title : "Без названия"
                                                }</h3>
                                                <span>{fn.getDateFormat(item.showDate)}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                {
                                    () => {
                                        if (!Static.activeNotes) {
                                            return (
                                                <div class={["notes-content-wrapper", Static.activeNotes ? "active" : null]}>
                                                    <div class="empty_message_dialog_block">
                                                        Выберите или создайте новую заметку
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div class={["notes-content-wrapper", Static.activeNotes ? "active" : null]}>
                                                    <div class="notes-button__img" onclick={() => {
                                                        Static.elInputImg.click()
                                                    }}>
                                                        <img class="notes-button__icon" src={svg["clip_notes"]} />
                                                        <input
                                                            type="file"
                                                            hidden
                                                            multiple
                                                            // accept=".jpg,.jpeg,.png,.gif"
                                                            Element={($el) => { Static.elInputImg = $el }}
                                                            onchange={async function (e) {
                                                                e.stopPropagation();
                                                                Array.from(this.files).forEach((item) => {

                                                                    fn.uploadMedia(
                                                                        item,
                                                                        "gallery",
                                                                        async function () {
                                                                            if (!this.response) {
                                                                                alert("Произошла ошибка Попробуйте еще раз")
                                                                                return
                                                                            }
                                                                            let response = JSON.parse(this.response);
                                                                            Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"
                                                                            // console.log(response.mimetype, Static.activeFiletype)

                                                                            initReload()

                                                                            let data = {
                                                                                type: response.mimetype,
                                                                                name: response.name
                                                                            }

                                                                            Static.activeNotes.media.push(data)

                                                                            editNotes(Static)

                                                                        }
                                                                    )
                                                                })
                                                                initReload()
                                                            }}
                                                        />
                                                    </div>
                                                    <div class="notes-image-preview">
                                                    {Static.notesList.list_records.map(function (item) {
                                                        return (
                                                            <div>

                                                            </div>
                                                        )
                                                    })}
                                                    </div>
                                                    <img class="notes-content-delete" src={svg["close"]}
                                                        onclick={() => {
                                                            deleteNote(Static)
                                                            initReload()
                                                        }} />
                                                    <img class="notes-content-close" src={svg["gradient_arrow"]}
                                                        onclick={() => {
                                                            Static.activeNotes = null
                                                            initReload()
                                                        }} />
                                                    <div class="notes-input-text"
                                                        contenteditable={true}
                                                        Element={($el) => {
                                                            Static.elTitle = $el
                                                        }}
                                                        data-text="Название"
                                                        textContent={Static.activeNotes.title != "" ? Static.activeNotes.title : ""}
                                                        oninput={() => {
                                                            Static.activeNotes.title = Static.elTitle.textContent
                                                            editNotes(Static)
                                                        }}>
                                                    </div>
                                                    <div
                                                        class="notes-description"
                                                        contenteditable={true}
                                                        data-text="Текст"
                                                        textContent={Static.activeNotes.text}
                                                        Element={($el) => {
                                                            Static.elText = $el
                                                        }}
                                                        oninput={() => {
                                                            Static.activeNotes.text = Static.elText.textContent
                                                            editNotes(Static)
                                                        }}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;