import {
    jsx,
    jsxFrag,
    init,
    Variable,
    load,
    CEM,
    initReload
} from "@betarost/cemserver/cem.js";
import Swiper from 'swiper/bundle';
import { Select } from '@elements/element/index.js';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const costCourse = [
    {
        cost: "Все",
        name: "all"
    },
    {
        cost: "До 30 000 ₽",
        name: "junior"
    },
    {
        cost: "От 30 000 ₽ до 60 000 ₽",
        name: "middle"
    },
    {
        cost: "От 60 000 ₽ до 100 000 ₽",
        name: "senior"
    },
    {
        cost: "Больше 100 000 ₽",
        name: "lead"
    },
]

const makeFilters = function (Static, item) {
    let filter = {};
    let find = {}
    let sort = { _id: -1 };

    if (Static.filtersSearch.sortDate) {
        sort._id = 1;
    }
    
    if (Static.filtersSearch.textSearch) {
        find["$and"] = [];
        find["$and"].push({ name: { $regex: Static.filtersSearch.textSearch, $options: "i" } });
    }

    if (Static.filtersSearch.cost == "junior") {
        filter["$and"] = [];
        filter["$and"].push({ costAll: { $lte: 30000 } });
        filter["$and"].push({ category: Static.filtersSearch.categoryActive });
    } else if (Static.filtersSearch.cost == "middle") {
        filter["$and"] = [];
        filter["$and"].push({ costAll: { $gte: 30000 } });
        filter["$and"].push({ costAll: { $lte: 60000 } });
        filter["$and"].push({ category: Static.filtersSearch.categoryActive });
    } else if (Static.filtersSearch.cost == "senior") {
        filter["$and"] = [];
        filter["$and"].push({ costAll: { $gte: 60000 } });
        filter["$and"].push({ costAll: { $lte: 100000 } });
        if (Static.filtersSearch.categoryActive != "") {
            filter["$and"].push({ category: Static.filtersSearch.categoryActive });
        }
    }
    else if (Static.filtersSearch.cost == "lead") {
        filter["$and"] = [];
        filter["$and"].push({ costAll: { $gte: 100000 } });
        filter["$and"].push({ category: Static.filtersSearch.categoryActive });
    } else if (Static.filtersSearch.categoryActive) {
        filter["$and"] = [];
        filter["$and"].push({ category: Static.filtersSearch.categoryActive });
    }

    return { filter, sort, find };
};

let filterCost;

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID });

    Static.selectCategory = false
    Static.selectCost = false
    Static.elCategory = null
    Static.nameCategory = null
    Static.costCourse = null
    Static.elCost = null

    Static.category = [
        {
            name: Variable.lang.categoryName.all,
        },
        {
            name: "NFT",
        },
        {
            name: "Crypto",
        },
        {
            name: "Finance",
        },
        {
            name: "Programming",
        },
        {
            name: "Design",
        },
        {
            name: "Business",
        },
        {
            name: "Languages",
        },
    ]

    load({
        ID,
        fnLoad: async () => {
            if (Variable.dataUrl.params) {
                Static.item = await fn.socket.get({
                    method: "ListCat",
                    _id: Variable.dataUrl.params,
                    params: {
                        // filter: {},
                    }
                })
                Static.categoryName = Static.item.name
            } else {
                Static.categoryName = Variable.lang.categoryName.all
            }

            Static.filtersSearch = {
                categoryActive: Static.categoryName,
                cost: null,
                textSearch: '',
                sortDate: false,
            };

            if (Static.filtersSearch.categoryActive == Variable.lang.categoryName.all) {
                Static.filtersSearch.categoryActive = ""
            }

            filterCost = makeFilters(Static)
            Static.courses = await fn.socket.get({
                method: "Courses",
                params: {
                    filter: filterCost.filter,
                    find: { name: { $regex: Static.filtersSearch.textSearch, $options: "i" } },
                    sort: filterCost.sort
                }
            })
        },
        fn: () => {
            console.log('=022f2b=', Static.filtersSearch)
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="course">
                                <div class="course__container">
                                    <div class="university-header__title">
                                        <img src={svg["mortarboard"]} />
                                        <p>{Variable.lang.a.university}</p>
                                    </div>
                                    <div class="course__filter">
                                        <div class="course__filter-container">
                                            <div class="course-select">
                                                <div class="course-select--default"
                                                    onclick={() => {
                                                        if (!Static.selectCategory) {
                                                            Static.selectCategory = true
                                                        } else {
                                                            Static.selectCategory = false
                                                        }
                                                        initReload()
                                                    }}
                                                >
                                                    {
                                                        () => {
                                                            if (Static.categoryName) {
                                                                return (
                                                                    <span class="course-select--default-weight">
                                                                        {Static.categoryName}
                                                                    </span>
                                                                )
                                                            } else if (Static.item && Static.item.name) {
                                                                return (
                                                                    <span class="course-select--default-weight">
                                                                        {Static.item.name}
                                                                    </span>
                                                                )
                                                            }
                                                        }
                                                    }
                                                    <img src={svg["select_arrow"]} />
                                                </div>
                                                {
                                                    () => {
                                                        if (Static.selectCategory) {
                                                            return (
                                                                <div class="course-select-container">
                                                                    {Static.category.map((item) => {
                                                                        
                                                                        return (
                                                                            <div class="course-select__list"
                                                                                // HiddenOut={true}
                                                                            >
                                                                                <label>
                                                                                    {item.name}
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        // placeholder="Выбери язык"
                                                                                        readonly
                                                                                        value={item.name}
                                                                                        Element={(el) => {
                                                                                            Static.elCategory = el
                                                                                        }}
                                                                                        onclick={async function (e) {
                                                                                            Static.selectCategory = false
                                                                                            Static.categoryName = this.value
                                                                                            if (this.value == Variable.lang.categoryName.all) {
                                                                                                Static.filtersSearch.categoryActive = ""
                                                                                            } else {
                                                                                                Static.filtersSearch.categoryActive = this.value
                                                                                            }
                                                                                            filterCost = makeFilters(Static)
                                                                                            Static.courses = await fn.socket.get({
                                                                                                method: "Courses",
                                                                                                params: {
                                                                                                    filter: filterCost.filter,
                                                                                                    find: { name: { $regex: Static.filtersSearch.textSearch, $options: "i" } },
                                                                                                    sort: filterCost.sort
                                                                                                }
                                                                                            })
                                                                                            initReload()
                                                                                        }}
                                                                                    />
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                }
                                            </div>
                                            <div class="course-select">
                                                <div class="course-select--default"
                                                    onclick={() => {
                                                        if (!Static.selectCost) {
                                                            Static.selectCost = true
                                                        } else {
                                                            Static.selectCost = false
                                                        }
                                                        initReload()
                                                    }}
                                                >
                                                    {
                                                        () => {
                                                            if (Static.costCourse) {
                                                                return (
                                                                    <span class="course-select--default-weight">
                                                                        {Static.costCourse}
                                                                    </span>
                                                                )
                                                            } else {
                                                                return (
                                                                    <span>
                                                                        Стоимость
                                                                    </span>
                                                                )
                                                            }
                                                        }
                                                    }
                                                    <img src={svg["select_arrow"]} />
                                                </div>
                                                {
                                                    () => {
                                                        if (Static.selectCost) {
                                                            return (
                                                                <div class="course-select-container">
                                                                    {costCourse.map((item) => {
                                                                        return (
                                                                            <div class="course-select__list">
                                                                                <label>
                                                                                    {item.cost}
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        // placeholder="Выбери язык"
                                                                                        readonly
                                                                                        value={item.direction}
                                                                                        Element={(el) => {
                                                                                            Static.elCost = el
                                                                                        }}
                                                                                        onclick={async (e) => {
                                                                                            Static.selectCost = false
                                                                                            Static.costCourse = item.cost
                                                                                            Static.filtersSearch.cost = item.name
                                                                                            filterCost = makeFilters(Static)
                                                                                            Static.courses = await fn.socket.get({
                                                                                                method: "Courses",
                                                                                                params: {
                                                                                                    filter: filterCost.filter,
                                                                                                    find: { name: { $regex: Static.filtersSearch.textSearch, $options: "i" } },
                                                                                                    sort: filterCost.sort
                                                                                                }
                                                                                            })
                                                                                            initReload()
                                                                                        }}
                                                                                    />
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                }
                                            </div>
                                        </div>
                                        <div class="course__filter-search">
                                            <input
                                                Element={($el) => {
                                                    Static.elInput = $el
                                                }}
                                                type="text"
                                                class="filter-coinInput"
                                                placeholder="Поиск"
                                                oninput={async function (e) {
                                                    Static.filtersSearch.textSearch = this.value
                                                    filterCost = makeFilters(Static)
                                                    Static.courses = await fn.socket.get({
                                                        method: "Courses",
                                                        params: {
                                                            filter: filterCost.filter,
                                                            find: filterCost.find,
                                                            sort: filterCost.sort
                                                        }
                                                    })
                                                    initReload()
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="cards">
                                        <div class="cards__container cards__container_type_courses">
                                            {
                                                Static.courses?.map((item) => {
                                                    return (
                                                        <li class="card card_courses">
                                                            <a
                                                                class="card__link card__link_background"
                                                                href={`/crypto-university/course/${item._id}`}
                                                                onclick={function (e) {
                                                                    fn.siteLink(e, { title: "", item: {}, items: {} })
                                                                }}
                                                            >
                                                                <div class="card__title card__title_courses">
                                                                    {item.name}
                                                                </div>
                                                                <div class="card__description card__description_courses">
                                                                    {item.description}
                                                                </div>
                                                                <div class="card__container card__container_row card__container_indent_course">
                                                                    <div class="card__cost">
                                                                        <span>{item.cost} <span class="card__cost_size">₽/мес.</span></span>
                                                                    </div>
                                                                    <div class="card__container card__container_row">
                                                                        <div class="card__duration">
                                                                            <span>{item.duration}</span>
                                                                        </div>
                                                                        <div class="card__duration-text">
                                                                            <span class="card__duration-text_size">
                                                                                {
                                                                                    item.timeCount == "month"
                                                                                        ?
                                                                                        "Месяца"
                                                                                        :
                                                                                        "Дней"
                                                                                }
                                                                            </span>
                                                                            <span class="card__duration-text_color">Срок обучения</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card__more card__more_indent_course">
                                                                    <span>Больше информации</span>
                                                                </div>
                                                                <div class="card__category">
                                                                    <span>{item.category}</span>
                                                                </div>
                                                                <div class="card__icon">
                                                                    <img src={`/assets/upload/worldPress/${item.icon}`} />
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {/* <div class="course__company course__company_indent">
                                        {Static.item.company?.map((item) => {
                                            return (
                                                <div class="course__company-container">
                                                    <div class="course__company-icon">
                                                        <img src={`/assets/upload/worldPress/${item.image}`} />
                                                    </div>
                                                    <div class="course__company-about">
                                                        <a 
                                                            href={`/crypto-university/show/${item._id}`}
                                                            onclick={function (e) {
                                                                fn.siteLink(e, { title: "", items: {} })
                                                            }}
                                                        >
                                                            <h3 class="course__company-name">
                                                                {item.name}
                                                            </h3>
                                                        </a>
                                                        <div class="course__company-description">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    })
};

export default start;
  // OK