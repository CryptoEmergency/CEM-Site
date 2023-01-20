import {
    jsx,
    jsxFrag,
    init,
    load,
    Variable,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';

const notesList = [
    { title: "Купить биткоин", date: "2023-01-19T19:34:00.000Z" },
    { title: "Посмотреть новости", date: "2023-01-18T14:45:00.000Z" },
    { title: "Проверить кошелек", date: "2023-01-16T06:18:00.000Z" },
    { title: "Обновить", date: "2023-01-15T23:40:00.000Z" },
]

const start = function (data, ID) {

    function toggle() {
        if (window.outerWidth <= 599 && !document.querySelector(".notes-content-wrapper").classList.contains("active")){
            document.querySelector(".notes-content-wrapper").classList.add("active")
            document.querySelector(".notes-list").classList.add("dead")
        } else {
            document.querySelector(".notes-content-wrapper").classList.remove("active")
            document.querySelector(".notes-list").classList.remove("dead")
        }
    }

    let [Static] = fn.GetParams({ data, ID })

    load({
        ID,
        fnLoad: async () => {
            Static.tmpTest = notesList
            Static.activeNotes = null
        },
        fn: () => {
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
                                    {Static.tmpTest.map(function (item) {
                                        return (
                                            <div
                                                class="notes-item"
                                                onclick={() => {
                                                    Static.activeNotes = item
                                                    toggle()
                                                    initReload()
                                                }}
                                            >
                                                <h3>{item.title}</h3>
                                                <span>{fn.getDateFormat(item.date, "now")}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div class="notes-content-wrapper">
                                    <img class="notes-content-close" src={svg["close"]} 
                                        onclick={() => {
                                            Static.activeNotes.title = document.querySelector(".notes-description").textContent
                                            toggle()
                                            initReload()
                                        }} />
                                    <input class="notes-input-text" type="text" maxlength="100" autocomplete="off" placeholder="Название" />
                                    <div 
                                        class="notes-description" 
                                        contenteditable="true"
                                        oninput={() => {
                                            Static.activeNotes.title = document.querySelector(".notes-description").textContent
                                            setTimeout(() => initReload(), 3000)
                                        }}
                                    >
                                        
                                        {!Static.activeNotes
                                            ?
                                            "текст"
                                            :
                                            Static.activeNotes.title
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
