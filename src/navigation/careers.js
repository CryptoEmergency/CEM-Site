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
                resume: [
                    {
                        position: "Make a landing page on the platform alp constructor",
                        about: "We need a written usability consultation on the design of the main and 1 typical internal pages of the site. It is important to know UX design, seo promotion, the ability to.. ",
                        date: "12 минут назад",
                        budget: 5000,
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
                    },
                    {
                        position: "Make a landing page on the platform alp constructor",
                        about: "We need a written usability consultation on the design of the main and 1 typical internal pages of the site. It is important to know UX design, seo promotion, the ability to.. ",
                        date: "12 минут назад",
                        budget: 5000,
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
                        },
                        logo: "https://habrastorage.org/getpro/moikrug/uploads/company/100/007/285/0/logo/medium_9f5377914276a88d2542dc44a106d027.png",
                        vacancy: {
                            name: "Ведущий специалист по тестированию",
                            src: "#",
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
                        },
                        logo: "https://habrastorage.org/getpro/moikrug/uploads/company/100/007/285/0/logo/medium_9f5377914276a88d2542dc44a106d027.png",
                        vacancy: {
                            name: "Systems Analyst",
                            src: "#",
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
                            <input type="radio" name="tab-btn" id="freelancers" value="" checked />
                            <label for="freelancers">{Variable.lang.label.freelancers}</label>
                            <input type="radio" name="tab-btn" id="сompany" value="" />
                            <label for="сompany">{Variable.lang.label.сompany}</label>
                            <div class="c-careers__content content--freelancers">

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

                                {/* Список резюме */}
                                <ul class="c-careers__list">
                                    {
                                        Static.careers.resume && Static.careers.resume.length ?
                                            Static.careers.resume.map((item, index) => {
                                                return (
                                                    <li>
                                                        <a href="" class="c-careers__resume">
                                                            <h4 class="c-careers__resposition">{item.position}</h4>
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
                                                        </a>
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
                                                            <a href={item.vacancy.src} class="c-careers__vacancyname"><h3>{item.vacancy.name}</h3></a>
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
