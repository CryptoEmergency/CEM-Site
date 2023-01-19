import {
    jsx,
    jsxFrag,
    init,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';

const notiesList = [
    { title: "Купить биткоин", date: "20:45" },
    { title: "Посмотреть новости", date: "21:10" }
]

const start = function (data, ID) {


    let [Static] = fn.GetParams({ data, ID })


    load({
        ID,
        fnLoad: async () => {
            Static.tmpTest = await fn.restApi.getNews({ filter: {} })
            Static.activeNotes = null
        },
        fn: () => {
            console.log('=787fec=', Static.tmpTest)
            return (
                <div class="blog_page_container c-main__body">
                    <div class="notes">
                        <h2>Notes</h2>
                        <div class="notes_container">
                            <div class="notes-content">
                                <div class="notes-list">
                                    <button class="notes-button">
                                        <span>Новая заметка</span>
                                    </button>
                                    {/* {notiesList.map(function (item) {
                                        return (
                                            <div class="notes-item">
                                                <h3>{item.title}</h3>
                                                <span>{item.date}</span>
                                            </div>
                                        )
                                    })} */}

                                    {Static.tmpTest.list_records.map(function (item) {
                                        console.log('=787fec=', item)
                                        return (
                                            <div
                                                class="notes-item"
                                                onclick={() => {
                                                    console.log('=e8e785=', item)
                                                    Static.activeNotes = item
                                                    initReload()
                                                }}
                                            >
                                                <h3>{item.title}</h3>
                                                <span>{fn.getDateFormat(item.showDate, "now")}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div class="notes-content-wrapper">
                                    <input class="notes-input-text" type="text" maxlength="100" autocomplete="off" placeholder="Название" />
                                    <div class="notes-description" contenteditable="true">
                                        {!Static.activeNotes
                                            ?
                                            "текст"
                                            :
                                            Static.activeNotes.text
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;