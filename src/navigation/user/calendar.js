import {
    jsx,
    jsxFrag,
    load,
    Helpers,
    initReload,
    Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';

const listColors = [
    "linear-gradient(89.03deg, #2C66B8 0.54%, #8859EC 97.66%)",
    "linear-gradient(107.19deg, #5F479B 1.5%, rgba(40, 28, 71, 0.2) 109.67%)",
    "linear-gradient(272.66deg, #343B4F -1.2%, rgba(51, 58, 78, 0.35) 116.4%)",
    "linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%)",
    "linear-gradient(225deg, #284BC5 0%, #11B883 100%)",
    "linear-gradient(125.97deg, #9B51E0 -0.04%, #E051D2 121.46%)"
];

const listNames = {
    weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat']
}

Helpers.moment.updateLocale("en", { week: { dow: 1 } });
const month = Helpers.moment().startOf("month");
const startDay = Helpers.moment().startOf("month").startOf("week");
const day = startDay.clone().subtract(1, "day");
const isCurrentDay = (day) => Helpers.moment().isSame(day, "day");
let isCurrentMonth = (day) => Helpers.moment().isSame(day, "month");

const listDate = [...Array(42)].map(() => day.add(1, "day").clone());

const staticRenderCalendar = (Static) => {
    Static.startDay = Static.moment.clone().startOf("month").startOf("week");
    Static.day = Static.startDay.clone().subtract(1, "day");
    isCurrentMonth = (item) => Static.moment.isSame(item, "month");
    Static.tmpTest = [...Array(42)].map(() => Static.day.add(1, "day").clone());
}

const monthHandler = (Static, prev = true) => {
    if (Static.renderMonth) {
        null
    } else {
        if (prev) {
            Static.moment.subtract(1, "month")
        } else {
            Static.moment.add(1, "month")
        }

        staticRenderCalendar(Static)
    }
};

const addNew = async function (Static) {
    const response = await fn.restApi.setUserCalendar.create({ title: Static.active.title, text: Static.active.text, showDate: Static.active, color: Static.colorIndex })
    if (response && response.status == "ok") {
        if (response.list_records && response.list_records[0]) {
            Static.notesCalendar.list_records.unshift(response.list_records[0])
        }
    }
    initReload()
}

const deleteNote = async function (Static, { _id, index, active }) {
    await fn.restApi.setUserCalendar.update({ _id, active })
    Static.notesCalendar.list_records.splice(index, 1)
    initReload()
}

const editNotes = async function (Static) {
    await fn.restApi.setUserCalendar.update(Static.activeNotes)
    initReload()
}

// const randomColor = (colors) => {
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];

//     return randomColor;
// }

const addForm = function (Static) {
    if (Static.modal == true) {
        return (
            <div>
                <div class="c-modal c-modal--open">
                    <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Заметка</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    Static.activeNotes = null
                                    Static.modal = false
                                    Static.isValid = false
                                    initReload()
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="create_post_container">
                                <div
                                    class="create_post_calendar create_post_calendar-title"
                                    contenteditable="true"
                                    data-text="Название"
                                    Element={($el) => {
                                        Static.elTitle = $el
                                    }}
                                    textContent={Static.activeNotes ? Static.activeNotes.title : Static.active.title}
                                    oninput={() => {
                                        if (Static.activeNotes) {
                                            Static.activeNotes.title = Static.elTitle.textContent
                                            // initReload()
                                        } else {
                                            Static.active.title = Static.elTitle.textContent
                                        }
                                        Static.elTitle.textContent.length > 0 ? Static.isValid = true : Static.isValid = false
                                        initReload()
                                    }}
                                >
                                </div>
                                <div
                                    class="create_post_calendar create_post_calendar-description"
                                    contenteditable="true"
                                    data-text="Текст"
                                    Element={($el) => {
                                        Static.elText = $el
                                    }}
                                    oninput={() => {
                                        if (Static.activeNotes) {
                                            Static.activeNotes.text = Static.elText.textContent

                                        } else {
                                            Static.active.text = Static.elText.textContent
                                        }
                                    }}
                                >
                                    {Static.activeNotes ? Static.activeNotes.text : null}
                                </div>
                            </div>
                        </div>
                        <div class="calendar-color">
                            <p>Выбор цвета заметки</p>
                            <div
                                class="calendar-color-button"
                                onClick={() => {
                                    Static.colorNotes = true
                                    initReload()
                                }}
                            >
                                <span class={["calendar-color-default",
                                    Static.colorIndex ? `calendar-color-type${Static.colorIndex}` : "calendar-color-type1"
                                ]}
                                    tabindex="0">
                                </span>
                            </div>
                            <ul
                                class="calendar-color-list"
                                style={[Static.colorNotes ? "display: flex" : null]}
                                onClick={(e) => {
                                    Static.colorIndex = e.target.id
                                    if (Static.activeNotes) {
                                        Static.activeNotes.color = Static.colorIndex
                                    }
                                    Static.colorNotes = false
                                    initReload()
                                }}
                            >
                                <li class="calendar-color-item calendar-color-type1" id="1">
                                </li>
                                <li class="calendar-color-item calendar-color-type2" id="2">
                                </li>
                                <li class="calendar-color-item calendar-color-type3" id="3">
                                </li>
                                <li class="calendar-color-item calendar-color-type4" id="4">
                                </li>
                                <li class="calendar-color-item calendar-color-type5" id="5">
                                </li>
                                <li class="calendar-color-item calendar-color-type6" id="6">
                                </li>
                            </ul>
                        </div>
                        <div class="c-modal__footer">
                            <button
                                class={[
                                    "c-button c-button--gradient2",
                                    !Static.isValid ? "c-button--inactive" : null,
                                ]}
                                type="button"
                                onClick={() => {
                                    if (Static.isValid) {
                                        if (Static.activeNotes) {
                                            editNotes(Static)
                                            Static.activeNotes = null
                                        } else {
                                            addNew(Static)
                                            initReload()
                                        }

                                        Static.modal = false
                                        Static.isValid = false

                                    } else {
                                        null
                                    }
                                }}
                            >
                                <span class="c-button__text">{Variable.lang.button.send}</span>
                            </button>
                        </div>
                    </section>
                </div>
                <div class="c-backdrop c-backdrop--show"></div>
            </div>
        )
    } else {
        null
    }
}

let difference;

const monthActive = (Static, index) => {
    if (Static.moment.format("Y") == Helpers.moment().format("Y")) {
        Static.moment = Helpers.moment()
    }

    if (index + 1 == Static.activeMonthClone.format("M")) {
        staticRenderCalendar(Static)
    } else if (index + 1 > Static.activeMonthClone.format("M")) {
        difference = (index + 1) - Static.activeMonthClone.format("M");
        Static.moment.add(difference, "month");

        staticRenderCalendar(Static)
    } else {
        difference = Static.activeMonthClone.format("M") - (index + 1);
        Static.moment.subtract(difference, "month");

        staticRenderCalendar(Static)
    }

    Static.renderMonth = false;
}

const yearActive = (Static, index) => {
    Static.moment = Helpers.moment()
    console.log(Static.moment)
    if (index + 2019 == Static.activeMonthClone.format("Y")) {
        staticRenderCalendar(Static)
    } else if (index + 2019 > Static.activeMonthClone.format("Y")) {
        difference = (index + 2019) - Static.activeMonthClone.format("Y");
        Static.moment.add(difference, "year");

        staticRenderCalendar(Static)
    } else {
        difference = Static.activeMonthClone.format("Y") - (index + 1 + 2018);
        Static.moment.subtract(difference, "year");

        staticRenderCalendar(Static)
    }

    Static.renderYear = false;
    Static.renderMonth = true;
}

let monthsName = Helpers.moment.months();
const yearsName = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const renderMonth = (Static) => {
    if (Static.renderMonth) {
        console.log(22)
        return (
            <div
                class="calendar-month"
            >
                {monthsName.map((item, index) => {
                    return (
                        <div class="calendar-month_cell">
                            <div
                                class="calendar-month_name"
                                onClick={() => {
                                    monthActive(Static, index)
                                    // console.log(Static.moment.format("Y"))
                                    initReload()
                                }}
                                style={[Static.activeMonth.format("MMMM") == item && Static.activeMonth.format("Y") == Static.moment.format("Y") ? "color: red" : null]}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else if (Static.renderYear) {
        return (
            <div
                class="calendar-year"
            >
                {yearsName.map((item, index) => {
                    return (
                        <div class="calendar-year_cell">
                            <div
                                class="calendar-year_name"
                                onClick={() => {
                                    yearActive(Static, index)
                                    initReload()
                                }}
                                style={[Static.activeMonth.format("Y") == item ? "color: red" : null]}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        null
    }
}

const notesScroll = (Static) => {
    Static.notesCalendar.list_records.map((item) => {
        if (Helpers.moment(item.showDate).format("D") == Helpers.moment(Static.active).format("D")) {
            Static.elNotes.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        } else {
            null
        }
    })
}

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    Static.tmpTest = listDate
    Static.active = null
    Static.modal = false
    Static.elTitle = null
    Static.elDescription = null
    Static.moment = Helpers.moment()
    Static.startDay = null
    Static.day = null
    Static.isCurrentMonth = isCurrentMonth()
    Static.renderMonth = false
    Static.renderYear = false
    Static.activeMonth = Helpers.moment().clone().startOf("month")
    Static.activeMonthClone = null
    Static.elNotes = null
    Static.activeNotes = null
    Static.colorNotes = false
    Static.colorIndex = null
    Static.color = null
    Static.currentDay = null

    load({
        ID,
        fnLoad: async () => {

            Static.notesCalendar = await fn.restApi.getUserCalendar({ filter: {} })
            console.log('=8451ba=', Static.notesCalendar)
        },
        fn: () => {
            // console.log()
            return (
                <div class="blog_page_container c-main__body">
                    <div class="calendar">
                        <div class="calendar-title">
                            <h2
                                onClick={() => {
                                    Static.tmpTest = listDate
                                    Static.moment = Helpers.moment()
                                    initReload()
                                }}
                                style="cursor: default"
                            >
                                {Helpers.moment().format("D MMMM")}
                                <span> {month.format("YYYY")}</span>
                            </h2>
                            <div class="calendar-subtitle">
                                <button
                                    onClick={() => {
                                        monthHandler(Static)
                                        initReload()
                                    }}
                                    style={[Static.renderMonth || Static.renderYear ? "cursor: default; opacity: 1;" : null]}
                                >
                                    <img src={svg["calendar-arrow"]} />
                                </button>
                                <h3
                                    onClick={() => {

                                        if (Static.renderMonth) {
                                            Static.renderYear = true
                                            Static.renderMonth = false
                                        } else if (Static.renderYear) {
                                            null
                                        } else {
                                            Static.renderMonth = true
                                        }

                                        Static.activeMonthClone = Static.activeMonth;
                                        Static.active = null
                                        Static.currentDay = null

                                        initReload()
                                    }}

                                    style={[Static.renderYear ? "cursor: default; opacity: 1;" : null]}
                                >
                                    {() => {
                                        if (Static.renderMonth) {
                                            return `${Static.moment.format("YYYY")} year`
                                        } else if (Static.renderYear) {
                                            return `${yearsName[0]} - ${yearsName[yearsName.length - 1]}`
                                        } else {
                                            return Static.moment.format("MMMM YYYY")
                                        }
                                    }}
                                </h3>
                                <button
                                    onClick={() => {
                                        monthHandler(Static, false)
                                        initReload()
                                    }}
                                    style={[Static.renderMonth || Static.renderYear ? "cursor: default; opacity: 1;" : null]}
                                >
                                    <img class="calendar-subtitle-arrow" src={svg["calendar-arrow"]} />
                                </button>
                            </div>
                        </div>
                        <div class="calendar-render">
                            {renderMonth(Static)}
                        </div>
                        <div class="calendar-day-name">
                            {listNames.weekDayNames.map(function (name) {
                                return (
                                    <span>{name}</span>
                                )
                            })}
                        </div>
                        <div class="calendar-container">
                            {Static.tmpTest.map((item) => {
                                if (isCurrentDay(item) && Static.active == null && Static.renderMonth == false && Static.renderYear == false) {
                                    Static.currentDay = Helpers.moment(item).format("YYYY-MM-D")
                                }
                                return (
                                    <div
                                        class="calendar-cell"
                                        onclick={() => {
                                            Static.active = item
                                            Static.currentDay = null
                                            // notesScroll(Static)
                                            initReload()
                                        }}
                                        style={[Static.active == item ? "opacity: 1;" : null]}
                                    >
                                        <div class={[Static.active == item ? "calendar-cell--active" : null,
                                                isCurrentDay(item) ? "calendar-cell--current" : null]}
                                        >

                                        </div>
                                        <span
                                            class="calendar-day"
                                            onDblClick={() => {
                                                Static.modal = true
                                                initReload()
                                            }}
                                            style={[isCurrentMonth(item) ? "color: #8995B8; opacity: 1;" : null,
                                            isCurrentDay(item) ? "color: red; opacity: 1" : null,
                                            Static.active == item ? "color: #ffffff; opacity: 1;" : null
                                            ]}
                                        >
                                            {item.format('D')}
                                        </span>
                                        <div>
                                        {Static.notesCalendar.list_records.map((dayItem) => {
                                            if (Helpers.moment(dayItem.showDate).format("D") == Helpers.moment(item).format("D") && Static.repeat !== Helpers.moment(dayItem.showDate).format("D")) {
                                                Static.repeat = Helpers.moment(dayItem.showDate).format("D")
                                                return (
                                                    <div class={["calendar-day_fond",
                                                        item && item.title != "" ? "calendar-day_fond--show" : null,
                                                        Helpers.moment(dayItem.showDate).format("YYYY-MM-D") == Helpers.moment(item).format("YYYY-MM-D") ? `calendar-color-type${dayItem.color}` : null,
                                                    ]}
                                                    >
                                                    </div>
                                                )
                                            }
                                        })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div
                            class="calendar-notes"
                            Element={($el) => {
                                Static.elNotes = $el
                            }}
                        >
                            {
                                () => {
                                    if (Static.active) {
                                        return (
                                            <div class="calendar-notes-append"
                                                onClick={() => {
                                                    Static.modal = true
                                                    initReload()
                                                }}
                                            >
                                                <p>
                                                    New note
                                                        <span>
                                                            &nbsp;({Helpers.moment(Static.active).format("D MMMM")})
                                                        </span>
                                                    
                                                </p>
                                                
                                            </div>
                                        )
                                    }
                                }
                            }
                            {Static.notesCalendar.list_records.map((item, index) => {
                                if (Helpers.moment(item.showDate).format("D") == Helpers.moment(Static.active).format("D") && !Static.modal || Static.currentDay == Helpers.moment(item.showDate).format("YYYY-MM-D") && !Static.modal) {
                                    return (
                                        <div
                                            class={["calendar-notes_item",
                                                    item.color ? `calendar-color-type${item.color}` : null,
                                            ]}
                                        >
                                            <div class="calendar-notes_item-date">
                                                {Helpers.moment(item.showDate).format("D")}
                                            </div>
                                            <div class="calendar-notes_item-description">
                                                <h3>{item.title}</h3>
                                                <p>{item.text}</p>
                                            </div>
                                            <img class="calendar-notes_item-delete" src={svg["delete_notes"]}
                                                onclick={() => {
                                                    fn.modals.ModalConfirmAction({
                                                        action: async () => {
                                                            deleteNote(Static, { _id: item._id, index, active: false })
                                                            fn.modals.close("ModalConfirmAction")
                                                        },
                                                        text: Variable.lang.p.deleteNotesConfirm,
                                                        button: Variable.lang.button.yes
                                                    })
                                                }}
                                            />
                                            <img
                                                class="calendar-notes_item-edit"
                                                src={svg["edit_calendar-notes"]}
                                                onClick={() => {
                                                    Static.activeNotes = item
                                                    Static.modal = true
                                                    item.title.length > 0 ? Static.isValid = true : Static.isValid = false
                                                    initReload()
                                                }}
                                            />
                                        </div>
                                    )
                                } else {
                                    Static.elNotes = null
                                }
                            })}
                        </div>
                        <div class="modals-calendar">
                            {addForm(Static)}
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;
