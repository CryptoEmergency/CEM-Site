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

Helpers.moment.updateLocale("en", {week: {dow: 1}});
const month = Helpers.moment().startOf("month");
const startDay = Helpers.moment().startOf("month").startOf("week");
const day = startDay.clone().subtract(1, "day");
const isCurrentDay = (day) => Helpers.moment().isSame(day, "day");
let isCurrentMonth = (day) => Helpers.moment().isSame(day, "month");

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

const listDate = [...Array(42)].map(() => day.add(1, "day").clone());

const listNames = {
    weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu' , 'Fri', 'Sun', 'Sat']
}

const addNew = async function (Static) {
    const response = await fn.restApi.setUserCalendar.create({ title: Static.elTitle, text: "", media: [], notify: "", type: "", showDate: new Date().toISOString(), noAlert: "" })
    console.log(response)
    if (response && response.status == "ok") {
        if (response.list_records && response.list_records[0]) {
            Static.notesCalendar.list_records.unshift(response.list_records[0])
        }
    }
    console.log(response)
    initReload()
}

const addNote = (id) => {
    // если поле для ввода текста пустое, ничего не делаем
    // if (textarea.value === '') return

    // получаем значение этого поля
    // let text = textarea.value

    // объявляем переменную для даты напоминания
    // с помощью тернарного оператора
    // присваиваем этой переменной null или значение соответствующего поля
    let date = new Date().toISOString();
    // dateInput.value === '' ? date = null : date = dateInput.value

    // заметка представляет собой объект
    let note = {
        _id: id,
        date: id,
        description: '',
        // дата создания
        createdDate: new Date().toLocaleDateString(),
        // индикатор выполнения
        completed: '',
        // дата напоминания
        notifyDate: date
    }
    return note
}

const randomColor = (colors) => {
    const randomColor = colors[Math.floor(Math.random()*colors.length)];
    
    return randomColor;
}

const addForm = function (Static) {
    if (Static.modal == true) {
        return (
            <div>
                <div class="c-modal c-modal--open">
                    <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Название</h2>
                            <button
                            type="button"
                            class="c-modal__close"
                            onclick={() => {
                                Static.modal = false
                                initReload()
                            }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="create_post_container">
                                <div
                                    class="c-chapter create_post_chapter create_post_main_text"
                                    contenteditable="true"
                                    Element={($el) => {
                                        Static.elTitle = $el
                                    }}
                                    oninput={()=> {
                                        Static.active.title = Static.elTitle.textContent
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div class="c-modal__footer">
                            <button
                            class={[
                                "c-button c-button--gradient2",
                                // !Static.isValid ? "c-button--inactive" : "",
                            ]}
                            type="button"
                            // ref={elemButton}
                            onClick={() => {
                                addNew(Static)
                                Static.modal = false
                                initReload()
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
    Static.moment = Helpers.moment()
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
                                    console.log(Static.activeMonthClone.format("Y"))
                                    initReload()
                                }}
                                style={[Static.activeMonth.format("MMMM") == item ? "color: red" : null]}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else if (Static.renderYear) {
        console.log(Static.renderYear)
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
                                    // Static.renderMonth = true
                                    // monthActive(Static, index)
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

const activeCalendarTitle = (Static) => {
    // Static.renderMonth ? `${Static.moment.format("YYYY")} year` : Static.moment.format("MMMM YYYY")
    if (Static.renderMonth) {
        `${Static.moment.format("YYYY")} year`
    } else if (Static.renderYear) {
        `${yearsName[0]} - ${yearsName[-1]}`
    } else {
        Static.moment.format("MMMM YYYY")
    }
}

// const endDay = Helpers.moment().endOf('month').endOf('week');
// const calendar = [];

// while (!day.isAfter(endDay)) {
//     calendar.push(day.clone())
//     day.add(1, 'day')
// }

const start = function (data, ID) {

    let [Static] = fn.GetParams({ data, ID })

    Static.tmpTest = listDate
    Static.active = null
    Static.modal = false
    Static.elTitle = null
    Static.moment = Helpers.moment()
    Static.startDay = null
    Static.day = null
    Static.isCurrentMonth = isCurrentMonth()
    Static.renderMonth = false
    Static.renderYear = false
    Static.activeMonth = Helpers.moment().clone().startOf("month")
    Static.activeMonthClone = null

    load({
        ID,
        fnLoad: async () => {
            
            Static.notesCalendar = await fn.restApi.getUserCalendar({ filter: {} })
            console.log('=8451ba=', Static.notesCalendar)
        },
        fn: () => {
            console.log(Static.notesCalendar)
            return (
                <div class="blog_page_container c-main__body">
                    <div class="calendar">
                        <div class="calendar-title">
                            <h2>{month.format("MMMM")}
                                <span> {month.format("YYYY")}</span>
                            </h2>
                            <div class="calendar-subtitle">
                                <button
                                    onClick={() => {
                                        monthHandler(Static)
                                        initReload()
                                    }}
                                >
                                    <img src={svg["calendar-arrow"]}/>
                                </button>
                                    <h3
                                        onClick={() => {
                                            
                                            if (Static.renderMonth) {
                                                Static.renderYear = true
                                                Static.renderMonth = false
                                            }  else if (Static.renderYear) {
                                                null
                                            } else {
                                                Static.renderMonth = true
                                            }

                                            Static.activeMonthClone = Static.activeMonth;
                                            
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
                                    
                                >
                                    <img class="calendar-subtitle-arrow" src={svg["calendar-arrow"]}/>
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
                                return (
                                    <div
                                        class="calendar-cell"
                                        // id={index + 1}
                                        onclick={() => {
                                            // Static.tmpTest.splice(index, 1, addNote(index + 1))
                                            Static.active = item
                                            console.log(Static.moment)
                                            // addNotes()
                                            initReload()
                                        }}
                                        
                                    >
                                        <span 
                                            class="calendar-day"
                                            onDblClick={() => {
                                                Static.modal = true
                                                initReload()
                                            }}
                                            style={[isCurrentMonth(item) ? "color: #ffffff; opacity: 0.7;" : null,
                                                    isCurrentDay(item) ? "color: red; opacity: 1" : null
                                            ]}
                                        >
                                            {item.format('D')}
                                        </span>
                                        <div>
                                            <div class={["calendar-notes", 
                                                item && item.title != "" ? "calendar-notes--show" : null
                                            ]}
                                            // style={[item && item.title != "" ? `background: ${randomColor(listColors)}` : null]}
                                            >
                                                <p>
                                                    {!item
                                                    ?
                                                    null
                                                    :
                                                    item.title
                                                }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/* <div class="calendar-notes">
                            {Static.notesCalendar.title}
                        </div> */}
                        <div class="modals-test">
                            {addForm(Static)}
                        </div>
                    </div>
                </div>
            )
        }
    })
}

export default start;
