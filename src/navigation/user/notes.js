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
    { title: "Купить биткоин", description: "", date: "2023-01-19T19:34:00.000Z" },
    { title: "Посмотреть новости", description: "", date: "2023-01-18T14:45:00.000Z" },
    { title: "Проверить кошелек", description: "", date: "2023-01-16T06:18:00.000Z" },
    { title: "Обновить", description: "", date: "2023-01-15T23:40:00.000Z" },
]

const start = function (data, ID) {

    function toggleMobile(contentSelector, contentSelectorActive, listSelector, listSelectorDead) {
        if (window.outerWidth <= 599 && !document.querySelector(contentSelector).classList.contains(contentSelectorActive)){
            document.querySelector(contentSelector).classList.add(contentSelectorActive)
            document.querySelector(listSelector).classList.add(listSelectorDead)
        } else {
            document.querySelector(contentSelector).classList.remove(contentSelectorActive)
            document.querySelector(listSelector).classList.remove(listSelectorDead)
        }
    }

    function toggleActive(selector, selectorActive, i) {
        document.querySelectorAll(selector).forEach((item) => {
            item.classList.remove(selectorActive)
        })
        !document.querySelectorAll(selector)[i].classList.contains(selectorActive)
        ?
        document.querySelectorAll(selector)[i].classList.add(selectorActive)
        :
        document.querySelectorAll(selector)[i].classList.remove(selectorActive)
    }

    function toggleNew(selector, selectorActive) {
        document.querySelectorAll(selector).forEach((item) => {
            item.classList.remove(selectorActive)
        })
    }

    function addItem(date) {
        const newItem = {
            title: "Без названия",
            description: "",
            date: date,
        }
        return newItem
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
                                    <button class="notes-button"
                                        onclick={() => {
                                            Static.tmpTest.unshift(addItem(new Date().toISOString()))
                                            document.querySelector(".notes-description").textContent = null
                                            toggleNew(".notes-item","notes-item_active")
                                            initReload()
                                        }}
                                    >
                                        <span>Новая заметка</span>
                                    </button>
                                    {Static.tmpTest.map(function (item, index) {
                                        return (
                                            <div
                                                class="notes-item"
                                                id={index + 1}
                                                onclick={() => {
                                                    document.querySelector(".notes-description").textContent = null
                                                    Static.activeNotes = item
                                                    toggleMobile(".notes-content-wrapper", "active", ".notes-list", "dead")
                                                    toggleActive(".notes-item","notes-item_active" ,index)
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
                                            Static.activeNotes.title = document.querySelector(".notes-input-text").textContent
                                            toggleMobile(".notes-content-wrapper", "active", ".notes-list", "dead")
                                            toggleNew(".notes-item","notes-item_active")
                                            initReload()
                                        }} 
                                    />
                                    <div class="notes-input-text"
                                        contenteditable={!Static.activeNotes
                                            ?
                                            this.contentEditable = "false"
                                            :
                                            this.contentEditable = "true"
                                        }
                                        oninput={() => {
                                            Static.activeNotes.title = document.querySelector(".notes-input-text").textContent
                                        }}
                                    >
                                        {!Static.activeNotes
                                        ?
                                        "Название"
                                        :
                                        Static.activeNotes.title
                                    }
                                    </div>
                                    <div 
                                        class="notes-description" 
                                        contenteditable={!Static.activeNotes
                                            ?
                                            this.contentEditable = "false"
                                            :
                                            this.contentEditable = "true"
                                        }
                                        data-text="текст"
                                        oninput={() => {
                                            Static.activeNotes.description = document.querySelector(".notes-description").textContent
                                        }}
                                        
                                    >
                                    {!Static.activeNotes
                                        ?
                                        ''
                                        :
                                        Static.activeNotes.description
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
