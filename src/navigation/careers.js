import {
    jsx,
    jsxFrag,
    initGo,
    getStorage,
    setStorage,
    init,
    Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { Avatar, Input, Select } from '@component/element/index.js';

const Tags = function ({ Static, classActive, text, type }) {
    return (
        <div class={["tag_button", classActive]}
            onclick={async () => {
                if (Static.activeCategory == type) {
                    return;
                }
                Static.activeCategory = type;
                Static.apiFilter = makeFilter(Static)
                await fn.restApi.getNews({ name: Static.nameRecords, filter: Static.apiFilter })
            }}>
            <span>{text}</span>
        </div>
    )
}

const makeFilter = function (Static) {
    let objReturn = { type: Static.type }
    if (Static.type == "university") {
        objReturn["languages.code"] = Static.activeCategory
    } else {
        if (Static.activeCategory != "All") {
            objReturn["category.name"] = Static.activeCategory
        }
    }
    return objReturn
}

const start = function (data, ID = "mainBlock") {
    let [Static] = fn.GetParams({ data, ID })

    Variable.HeaderShow = true;
    Variable.FooterShow = true;

    init(
        () => {
            fn.initData.careers(Static)

            Static.activeCategory = "All"
            Static.nameRecords = "Careers"
            Static.careersCategory = [
                {
                    count: {
                        ru: 13,
                        en: 9
                    },
                    _id: "1",
                    name: "NFT",
                    type: "university"
                },
                {
                    count: {
                        ru: 1,
                        en: 0
                    },
                    _id: "2",
                    name: "Crypto",
                    type: "university"
                }
            ]
            // console.log('=0f274a= Variable.lang.categoryName =',Variable.lang.categoryName)
            Static.filters.country.onclick = async () => {
                fn.modals.ModalSelectCountry({
                    onclick: async (countryCode, countryName) => {
                        Static.filters.country.name = countryName;
                        Static.filters.country.code = countryCode;
                        Static.filters.country.value = countryName;
                        Static.apiFilter = makeFilter(Static)
                        // await fn.restApi.getEvents({ name: Static.nameRecords, filter: Static.apiFilter })
                    }
                }, true)
            }
            Static.careers = {
                freelance: [
                    {
                        position: "Модернизация BackEnd части сайта",
                        about: `Необходимо улучшить BackEnd часть сайта рекламно-производственной компании Lovi. Сайт lovigifts.ru
                            
                            Бэк - Yii2, DB - mysql.
                            
                            Задачи:
                            1. Доработать функционал поисковой строки:
                            - поиск должен осуществляться среди всего наименования товара, а не последовательно (Например, есть товар «Флешка Hoods синяя». Сейчас поиск реализован так, что если ввести флешка синяя, результат не найден, а должен отображаться);
                            - расширение области поиска по категориям, к которым относится товар;
                            - ревизия функции поиска на предмет её валидности (та ли группа товаров отражается при поиске).
                            2. Доработать функции сортировки:
                            - сортировка группы товаров по цвету, экологичности.`,
                        date: "13 февраля 2023, 22:30",
                        budget: "5000 руб",
                        views: 0,
                        urgency: true,
                        applicant: {
                            _id: "62d7e80490edc15f690791b1",
                            avatar: {
                                name: "fb15a09b752156b6e3904bd84fdd3d6d.png"
                            },
                            nickname: "Anton Kharitonov",
                            profession: "Web Designer",
                            company: "Web Studio AX",
                            // frame: {
                            //     name: "rainbow.gif"
                            // },
                            statistic: {
                                level: 24,
                                comments: 12,
                                view: 224,
                            },
                            contacts: "+79184253688, можно писать в телегу: https://t.me/AntonKh"
                        }
                    },
                    {
                        position: "Make a landing page on the platform alp constructor",
                        about: "We need a written usability consultation on the design of the main and 1 typical internal pages of the site. It is important to know UX design, seo promotion, the ability to.. ",
                        date: "12 минут назад",
                        budget: 5000,
                        views: 15,
                        urgency: false,
                        applicant: {
                            _id: "62d7e80490edc15f690791b0",
                            avatar: {
                                name: "fb15a09b752156b6e3904bd84fdd3d6d.png"
                            },
                            nickname: "Anton Kharitonov",
                            profession: "Web Designer",
                            company: "Web Studio AX",
                            // frame: {
                            //     name: "rainbow.gif"
                            // },
                            statistic: {
                                level: 24,
                                comments: 12,
                                view: 224,
                            }
                        }
                    }, {
                        position: "Make a landing page on the platform alp constructor",
                        about: "We need a written usability consultation on the design of the main and 1 typical internal pages of the site. It is important to know UX design, seo promotion, the ability to.. ",
                        date: "12 минут назад",
                        budget: 5000,
                        views: 7,
                        urgency: true,
                        applicant: {
                            _id: "62d7e80490edc15f690791b0",
                            avatar: {
                                name: "fb15a09b752156b6e3904bd84fdd3d6d.png"
                            },
                            nickname: "Anton Kharitonov",
                            profession: "Web Designer",
                            company: "Web Studio AX",
                            // frame: {
                            //     name: "rainbow.gif"
                            // },
                            statistic: {
                                level: 24,
                                comments: 12,
                                view: 224,
                            }
                        }
                    }
                ],
                vacancies: [
                    {
                        datecreate: "9 февраля",
                        company: {
                            name: "Unity in Development",
                            src: "#",
                            contact: {
                                telegram: "https://t.me/",
                                youtube: "https://www.youtube.com/channel/",
                                twitter: "https://twitter.com/",
                                discord: "https://discord.com/invite/",
                                github: "https://github.com/",
                                tiktok: "https://vm.tiktok.com/",
                                linkedin: "ttps://www.linkedin.com/company/",
                            }
                        },
                        logo: "https://habrastorage.org/getpro/moikrug/uploads/company/100/007/285/0/logo/medium_9f5377914276a88d2542dc44a106d027.png",
                        vacancy: {
                            name: "Ведущий специалист по тестированию",
                            src: "/careers/vacancy/1",
                            cover: "https://habrastorage.org/getpro/moikrug/uploads/redactor_image/09022023/images/35d18319c9b24ceba91c5da83e8e5c01.png",
                            description: `"UDV group" предоставляет единый портфель решений в сфере информационной безопасности, управления рисками и электронного документооборота.
                                В составе UDV group — собственный центр перспективных исследований и разработок в области кибербезопасности.
                                Деятельность компаний UDV group обеспечена портфелем необходимых лицензий
                                от государственных органов, регулирующих российский рынок информационной безопасности.
                                Мы разрабатываем технологические промышленные проекты для российского и зарубежного рынков. Уже создали два больших продукта, которые внедряются на крупных предприятиях газовых, нефтегазовых, металлургических областей.`,
                            aboutProject: `Наша команда разрабатывает Low-code платформу для создания прикладных решений.
                                Eplat4m — это программный конструктор, который помогает автоматизировать бизнес-процессы компании без привлечения программистов. В платформе есть конструкторы форм, вычислительных процессов, инструменты проектирования предметной области. Меняя настройки, создавая ролевые модели и настраивая элементы интерфейса, пользователи создают с нуля прикладные решения под свои потребности: от бизнес-логики до визуального оформления. При этом для работы с платформой пользователям не требуется специфических знаний в разработке ПО.
                                Сейчас продукт активно используется для автоматизации процессов управления информационной безопасностью на крупных промышленных предприятиях.
                                В связи с потребностью в усилении экспертизы команды тестирования продукта - приглашаем Ведущего тестировщика`,
                            tools: "Jira, Gitlab, Jenkins, Postman, PostgreSQL, Java, Selenide, Jmeter (опционально)",
                            responsibilities: `- Администрирование работы направления QA в продукте (интервью, митинги, perfomance)
                                - Тестирование платформы (ручное, веб-приложение)
                                - Написание тест-кейсов, составление тест-планы, участие в регрессах`,
                            requirements: `- Опыт работы в роли QA Senior/Lead от двух лет
                                - Опыт написания автотестов/составления тестового фреймворка на языке Java
                                - Знание языка программирования (достаточно базы)
                                - Знания теории и лучших практик тестирования ПО
                                - Опыт составления тестовых планов и стратегий
                                - Опыт составления и проведения функционального тестирования Web, API, backend
                                - Знание SQL
                                - Успешный опыт выстраивания процессов QA`,
                            willBePlus: `- Знание нагрузочного тестирования, CI/CD, Linux`,
                            bonuses: `- Задачи, которые тебе интересны. Мы делаем большие продукты, доверяем профессионалам, всегда готовы услышать твои идеи и поддержать реализацию.
                                - Коллектив, с которым хочется работать. Мы Unity и это не просто слова. Высокотехнологичные проекты можно создать только в сплоченной команде. Мы ценим людей, которые находят общий язык с коллегами и действуют сообща.
                                - Профессиональное развитие. Review каждые полгода, 100% оплата профильных обучений и конференций, speech-ки среди коллег, компенсация занятий английским.
                                - Стабильность. Трудоустройство по ТК РФ в аккредитованную ИТ компанию, комфорт и уверенность в завтрашнем дне.
                                - Комфортная заработная плата. Своевременная и соответствующая твоим ожиданиям и компетенциям.
                                - Забота о твоем здоровье. ДМС в лучших клиниках города с широким набором медицинских услуг для сотрудников и детей, корпоративный спорт (бассейн, йога, скалодром, хоккей, волейбол, баскетбол, футбол), компенсация личного спорта.
                                - Удобный график работы. Полная удаленка, гибридный график, уютный офис разработки в Екатеринбурге. Удаленным сотрудникам организовываем командировки на первое время в Екатеринбурге по желанию.
                                - Насыщенная корпоративная жизнь. Корпоративы на открытом воздухе, сплавы, походы, вечерние посиделки.`,
                            additionalInstructions: "https://t.me/ale_sergeeva"
                        },
                        conditions: [
                            "Полный рабочий день",
                            "Можно удалённо"
                        ],
                        skills: [
                            "Инженер по тестированию",
                            "Ведущий (Lead)",
                            "Java",
                            "Git",
                            "Postman",
                            "Тестирование API"
                        ]
                    },
                    {
                        datecreate: "9 февраля",
                        company: {
                            name: "Unity in Development",
                            src: "#",
                            contact: {
                                telegram: "https://t.me/",
                                twitter: "https://twitter.com/",
                                linkedin: "ttps://www.linkedin.com/company/",
                            }
                        },
                        logo: "https://habrastorage.org/getpro/moikrug/uploads/company/100/007/285/0/logo/medium_9f5377914276a88d2542dc44a106d027.png",
                        vacancy: {
                            name: "Systems Analyst",
                            src: "/careers/vacancy/2",
                            // cover: "",
                            description: `Компания Unity in Development или UDV Group – российский разработчик в области кибербезопасности. Мы создаем программное обеспечение для российских и зарубежных промышленных компаний.
                                В составе UDV Group — собственный центр перспективных исследований и разработок в области кибербезопасности. Деятельность компаний UDV Group обеспечена портфелем необходимых лицензий от государственных органов, регулирующих российский рынок информационной безопасности.
                                UDV в цифрах:
                                8 лет разработки;
                                160+ сотрудников;
                                100+ заказчиков;
                                1000+ инсталляций.
                                В связи с разработкой нового продукта "Межсетевой экран" приглашаем в новую команду разработки опытного системного аналитика.`,
                            aboutProject: "",
                            tools: "",
                            responsibilities: `- Взаимодействие с бизнесом для сбора и формализации требований и подготовки проектных решений;
                                - Активное общение с командами разработки по поиску технических решений и консультациям по задачам;
                                - Анализ, разработка и согласование системных требований к новому функционалу;
                                - Оценка необходимых сроков для технической реализации и тестирования требуемой функциональности
                                - Проработка технического решения и декомпозиция задач на разработку`,
                            requirements: `- Опыт работы системным аналитиком от 2х лет;
                                - Понимание работы Linux систем и стэка сетевых технологий на уровне администратора;
                                - Аналитическое мышление, умение систематизировать информацию, выстраивать причинно-следственные связи, умение видеть конечную цель для достижения наилучшего результата;
                                - Внимательность, быстрая обучаемость, способность определять приоритеты и планировать задачи в соответствии с ними, готовность к высокой интенсивности работы и большому количеству задач;
                                - Открытость, активность, позитивное мышление.`,
                            willBePlus: "",
                            bonuses: "",
                            additionalInstructions: ""
                        },
                        conditions: [
                            "Полный рабочий день",
                            "Можно удалённо"
                        ],
                        skills: [
                            "Системный аналитик",
                            "Средний (Middle)",
                            "SQL",
                            "Linux",
                            "Базы данных"
                        ]
                    }
                ]
            }

            console.log('=245a0c=', Static)
        },
        () => {


            return (
                <div
                    class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                        } c-careers`}
                >
                    <div class="c-careers__container c-container">
                        <h1 class="c-careers__title">{Variable.lang.h.careers}</h1>
                        <div class="c-careers__tabs c-tabs">
                            <input type="radio" name="tab-btn" id="freelance" value="" checked />
                            <label for="freelance">{Variable.lang.label.freelance}</label>
                            <input type="radio" name="tab-btn" id="сompany" value="" />
                            <label for="сompany">{Variable.lang.label.сompany}</label>
                            <div class="c-careers__content content--freelance">

                                {/* Тэги */}
                                <div class="tags tags--static c-careers__tags">
                                    <Tags
                                        Static={Static}
                                        text={Variable.lang.categoryName.all}
                                        classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                        type="All"
                                    />
                                    {() => {
                                        // if (Variable[Static.nameRecords + "Category"]) {
                                        let arrReturn =
                                            // Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                                            Static.careersCategory.filter((item) => item.name !== null).map((item) => {

                                                return (
                                                    <Tags
                                                        Static={Static}
                                                        text={Variable.lang.categoryName[item.name]}
                                                        classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                                                        type={item.name}
                                                    />
                                                )
                                            })
                                        return arrReturn
                                        // }
                                    }}
                                </div>

                                {/* Поиск */}
                                <div class="c-careers__searchblock c-search">
                                    <div class="c-search__container">
                                        <div class="c-search__wrapper">
                                            <img class="c-search__icon" src={svg.search_icon} />
                                            <Input className="c-search__input" Static={Static.search} customStyle={"border-radius: 3px"} />
                                            {/* <img
                                                class="c-search__icon c-search__icon--filter"
                                                src={svg.filter}
                                                onClick={() => {
                                                    if (Static.elShowFilter.dataset.active === "true") {
                                                        Static.elShowFilter.dataset.active = false
                                                        Static.elShowFilter.style = "height: 0px"
                                                    } else {
                                                        Static.elShowFilter.dataset.active = true
                                                        Static.elShowFilter.style = "";
                                                        let h = Static.elShowFilter.offsetHeight;
                                                        Static.elShowFilter.style = `height: ${h}px; margin-bottom: 20px;`
                                                    }
                                                }}
                                            /> */}
                                            <a class="c-button c-button--gradient4" href="">
                                                <span class="c-button__text">{Variable.lang.button.search}</span>
                                            </a>
                                        </div>
                                        <div style="display: none;" class="questions_search">
                                            <div class="question_search_half_empty">
                                                {Variable.lang.text.contInput}
                                            </div>
                                            <div style="display: none;" class="question_search_help"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Фильтр */}
                                <div
                                    class="c-careers__filter c-friends__additional"
                                    // data-active={false}
                                    // style={"height: 0px"}
                                    Element={($el) => {
                                        Static.elShowFilter = $el
                                    }}
                                >
                                    <Select
                                        icon={"specialization"}
                                        options={Static.optionsSelect.specialization}
                                        callback={
                                            async (active, nameOptions) => {
                                                Static.filters[nameOptions].value = active
                                                // Static.apiFilter = makeFilter(Static)
                                                // Static.apiFilterSort = makeFilterSort(Static)
                                                // await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
                                            }
                                        }
                                    />
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <Input classDiv="c-careers__country" className="" Static={Static.filters.country} />
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <div class="c-careers__budget language_select_wrapper">
                                            <input type="text" class="c-careers__input" Static={Static} placeholder={Variable.lang.placeholder.budgetFrom} />
                                        </div>
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <div class="language_select_wrapper">
                                            <input type="text" class="c-careers__input" Static={Static} placeholder={Variable.lang.placeholder.budgetTo} />
                                        </div>
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                </div>

                                {/* Список заказов */}
                                <ul class="c-careers__list">
                                    {
                                        Static.careers.freelance && Static.careers.freelance.length ?
                                            Static.careers.freelance.map((item, index) => {
                                                return (
                                                    <li>
                                                        <div class="c-careers__resume">
                                                            <a
                                                                href={`/careers/freelance/${item.applicant._id}`}
                                                                class="c-careers__resposition"
                                                                onclick={function(e) {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    fn.siteLinkModal(e, { title: "Фриланс заказ", freelance: item })
                                                                }}
                                                            >
                                                                <h4 class="c-careers__">{item.position}</h4>
                                                            </a>
                                                            <p class="c-careers__resabout">{item.about}</p>
                                                            <date datetime="" class="c-careers__resdate">{item.date}</date>
                                                            <Avatar author={item.applicant} parent={'c-careers__resume'} nickName={true} speciality={item.applicant.profession} />
                                                            <div class="c-careers__rescompany">
                                                                <span>{item.applicant.company}</span>
                                                                <span>Сompany name</span>
                                                            </div><footer class="c-careers__resfooter">
                                                                <div class="c-careers__resstatistic">
                                                                    <div class="c-careers__resviews">
                                                                        <img src={svg["question_views_gradient"]} width="32" height="32" />
                                                                        {item.applicant.statistic.view}
                                                                    </div>
                                                                    <div class="c-careers__rescomments">
                                                                        <img src={svg["resume_answer"]} width="30" height="30" />
                                                                        <span>{item.applicant.statistic.comments} </span>
                                                                    </div>
                                                                </div>
                                                                <div class="c-careers__resprice">
                                                                    <span>{item.budget}</span>
                                                                    <span>{Variable.lang.span.budgetPerOrder}</span>
                                                                </div>
                                                                {
                                                                    item.urgency ?
                                                                        <div class="c-careers__resurgency">
                                                                            <span>{Variable.lang.span.urgently}</span>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </footer>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            : null
                                    }
                                </ul>

                                {/* Пагинация */}
                                <div class="c-careers__pagination c-pagination">
                                    <a href="" class="c-pagination__btn c-button c-button--gradient4 c-button--ellipse c-button--transparent">
                                        <span class="c-button__text">{Variable.lang.button.backPage}</span>
                                    </a>

                                    <ul class="c-pagination__pages">
                                        <li>
                                            <a href="" class="c-pagination__link"><span>1</span></a>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link c-pagination__link--active"><span>2</span></a>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link"><span>3</span></a>
                                        </li>
                                        <li>
                                            <span class="c-pagination__link"><span>...</span></span>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link"><span>99</span></a>
                                        </li>
                                    </ul>

                                    <a href="" class="c-pagination__btn c-button c-button--gradient4 c-button--ellipse c-button--transparent">
                                        <span class="c-button__text">{Variable.lang.button.forwardPage}</span>
                                    </a>
                                </div>
                            </div>

                            <div class="c-careers__content content--сompany">

                                {/* Тэги */}
                                <div class="tags tags--static c-careers__tags">
                                    <Tags
                                        Static={Static}
                                        text={Variable.lang.categoryName.all}
                                        classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                        type="All"
                                    />
                                    {() => {
                                        // if (Variable[Static.nameRecords + "Category"]) {
                                        let arrReturn =
                                            // Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                                            Static.careersCategory.filter((item) => item.name !== null).map((item) => {

                                                return (
                                                    <Tags
                                                        Static={Static}
                                                        text={Variable.lang.categoryName[item.name]}
                                                        classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                                                        type={item.name}
                                                    />
                                                )
                                            })
                                        return arrReturn
                                        // }
                                    }}
                                </div>

                                {/* Поиск */}
                                <div class="c-careers__searchblock c-search">
                                    <div class="c-search__container">
                                        <div class="c-search__wrapper">
                                            <img class="c-search__icon" src={svg.search_icon} />
                                            <Input className="c-search__input" Static={Static.search} customStyle={"border-radius: 3px"} />
                                            {/* <img
                                                class="c-search__icon c-search__icon--filter"
                                                src={svg.filter}
                                                onClick={() => {
                                                    if (Static.elShowFilter.dataset.active === "true") {
                                                        Static.elShowFilter.dataset.active = false
                                                        Static.elShowFilter.style = "height: 0px"
                                                    } else {
                                                        Static.elShowFilter.dataset.active = true
                                                        Static.elShowFilter.style = "";
                                                        let h = Static.elShowFilter.offsetHeight;
                                                        Static.elShowFilter.style = `height: ${h}px; margin-bottom: 20px;`
                                                    }
                                                }}
                                            /> */}
                                            <a class="c-button c-button--gradient4" href="">
                                                <span class="c-button__text">{Variable.lang.button.search}</span>
                                            </a>
                                        </div>
                                        <div style="display: none;" class="questions_search">
                                            <div class="question_search_half_empty">
                                                {Variable.lang.text.contInput}
                                            </div>
                                            <div style="display: none;" class="question_search_help"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Фильтр */}
                                <div
                                    class="c-careers__filter c-friends__additional"
                                    // data-active={false}
                                    // style={"height: 0px"}
                                    Element={($el) => {
                                        Static.elShowFilter = $el
                                    }}
                                >
                                    <Select
                                        icon={"specialization"}
                                        options={Static.optionsSelect.specialization}
                                        callback={
                                            async (active, nameOptions) => {
                                                Static.filters[nameOptions].value = active
                                                // Static.apiFilter = makeFilter(Static)
                                                // Static.apiFilterSort = makeFilterSort(Static)
                                                // await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
                                            }
                                        }
                                    />
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <Input classDiv="c-careers__country" className="" Static={Static.filters.country} />
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <div class="c-careers__budget language_select_wrapper">
                                            <input type="text" class="c-careers__input" Static={Static} placeholder={Variable.lang.placeholder.budgetFrom} />
                                        </div>
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                    <div class="c-careers__wrapper c-friends__wrapper">
                                        <div class="language_select_wrapper">
                                            <input type="text" class="c-careers__input" Static={Static} placeholder={Variable.lang.placeholder.budgetTo} />
                                        </div>
                                        <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                                    </div>
                                </div>

                                {/* Список вакансий */}
                                <ul class="c-careers__vacancies">
                                    {
                                        Static.careers.vacancies && Static.careers.vacancies.length ?
                                            Static.careers.vacancies.map((item, index) => {
                                                return (
                                                    <li>
                                                        <div class="c-careers__vacancy">
                                                            <figure class="c-careers__vacancylogo">
                                                                <img src={item.logo} width="" height="" />
                                                            </figure>
                                                            <date class="c-careers__vacancydate" datetime="">{item.datecreate}</date>
                                                            <a href={item.company.src} class="c-careers__vacancycompany">{item.company.name}</a>
                                                            <a
                                                                href={item.vacancy.src}
                                                                class="c-careers__vacancyname"
                                                                onclick={function (e) {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    fn.siteLinkModal(e, { title: "Вакансия", vacancy: item })
                                                                }}
                                                            >
                                                                <h3>{item.vacancy.name}</h3>
                                                            </a>
                                                            <ul class="c-careers__vacancyconditions">
                                                                {
                                                                    item.conditions ?
                                                                        item.conditions.map((condition) => {
                                                                            return (
                                                                                <li>
                                                                                    <span>{condition}</span>
                                                                                </li>
                                                                            )
                                                                        })
                                                                        : null
                                                                }
                                                            </ul>
                                                            <ul class="c-careers__vacancyskills">
                                                                {
                                                                    item.skills ?
                                                                        item.skills.map((skill) => {
                                                                            return (
                                                                                <li>
                                                                                    <span>{skill}</span>
                                                                                </li>
                                                                            )
                                                                        })
                                                                        : null
                                                                }
                                                            </ul>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            : null
                                    }
                                </ul>

                                {/* Пагинация */}
                                <div class="c-careers__pagination c-pagination">
                                    <a href="" class="c-pagination__btn c-button c-button--gradient4 c-button--ellipse c-button--transparent">
                                        <span class="c-button__text">{Variable.lang.button.backPage}</span>
                                    </a>

                                    <ul class="c-pagination__pages">
                                        <li>
                                            <a href="" class="c-pagination__link"><span>1</span></a>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link c-pagination__link--active"><span>2</span></a>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link"><span>3</span></a>
                                        </li>
                                        <li>
                                            <span class="c-pagination__link"><span>...</span></span>
                                        </li>
                                        <li>
                                            <a href="" class="c-pagination__link"><span>99</span></a>
                                        </li>
                                    </ul>

                                    <a href="" class="c-pagination__btn c-button c-button--gradient4 c-button--ellipse c-button--transparent">
                                        <span class="c-button__text">{Variable.lang.button.forwardPage}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        }, ID
    );
};

export default start;
