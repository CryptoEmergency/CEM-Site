import {
    jsx,
    jsxFrag,
    load,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';

// const notesList = [
//     { title: "Купить биткоин", description: "", date: "2023-01-19T19:34:00.000Z", _id: 1 },
//     { title: "Посмотреть новости", description: "", date: "2023-01-18T14:45:00.000Z", _id: 2 },
//     { title: "Проверить кошелек", description: "", date: "2023-01-16T06:18:00.000Z", _id: 3 },
//     { title: "Обновить", description: "", date: "2023-01-15T23:40:00.000Z", _id: 4 },
// ]

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            Static.notesList = await fn.restApi.getNotes({ filter: {} })
            Static.elTitle = null
            Static.elText = null
            Static.activeNotes = null
            Static.timerChange = null
            console.log('=20dcf6=', Static.notesList)
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
                                            if (!Static.notesList.list_records[0] || Static.notesList.list_records[0]._id) {
                                                Static.notesList.list_records.unshift({ title: "Без названия", text: "", media: [], showDate: new Date().toISOString() })
                                            }
                                            Static.activeNotes = Static.notesList.list_records[0]
                                            initReload()
                                        }}>
                                        <span>Новая заметка</span>
                                    </button>
                                    {Static.notesList.list_records.map(function (item) {
                                        return (
                                            <div
                                                class={["notes-item", Static.activeNotes && Static.activeNotes._id == item._id ? "notes-item_active" : null]}
                                                onclick={() => {
                                                    Static.activeNotes = item
                                                    initReload()
                                                }}>
                                                <h3>{
                                                    Static.activeNotes && Static.activeNotes._id == item._id
                                                        ?
                                                        Static.activeNotes.title
                                                        :
                                                        item.title
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
                                                        Выберите или создайте новую заметку заметку
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div class={["notes-content-wrapper", Static.activeNotes ? "active" : null]}>
                                                    <img class="notes-content-close" src={svg["close"]}
                                                        onclick={() => {
                                                            Static.activeNotes = null
                                                            initReload()
                                                        }} />
                                                    <div class="notes-input-text"
                                                        contenteditable={true}
                                                        Element={($el) => {
                                                            Static.elTitle = $el
                                                        }}
                                                        textContent={Static.activeNotes.title}
                                                        oninput={() => {
                                                            Static.activeNotes.title = Static.elTitle.textContent
                                                            if (Static.timerChange) {
                                                                clearTimeout(Static.timerChange);
                                                            }
                                                            Static.timerChange = setTimeout(async () => {
                                                                if (!Static.activeNotes._id) {
                                                                    const response = await fn.restApi.setNotes.create(Static.activeNotes)
                                                                    if (response && response.status == "ok") {
                                                                        if (response.list_records && response.list_records[0]) {
                                                                            Static.notesList.list_records[0] = response.list_records[0]
                                                                            Static.activeNotes._id = response.list_records[0]._id
                                                                        }
                                                                    }
                                                                } else {
                                                                    fn.restApi.setNotes.update(Static.activeNotes)
                                                                }
                                                                initReload()
                                                            }, 300);
                                                        }}>
                                                        {/* {Static.activeNotes.title} */}
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
                                                            if (Static.timerChange) {
                                                                clearTimeout(Static.timerChange);
                                                            }
                                                            Static.timerChange = setTimeout(async () => {
                                                                if (!Static.activeNotes._id) {
                                                                    const response = await fn.restApi.setNotes.create(Static.activeNotes)
                                                                    if (response && response.status == "ok") {
                                                                        if (response.list_records && response.list_records[0]) {
                                                                            Static.notesList.list_records[0] = response.list_records[0]
                                                                            Static.activeNotes._id = response.list_records[0]._id
                                                                        }
                                                                    }
                                                                } else {
                                                                    fn.restApi.setNotes.update(Static.activeNotes)
                                                                }
                                                                initReload()
                                                            }, 300);
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