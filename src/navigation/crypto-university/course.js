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

const costCourses = [
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
        if (Static.filtersSearch.categoryActive != "") {
            filter["$and"].push({ category: Static.filtersSearch.categoryActive });
        }
    } else if (Static.filtersSearch.cost == "middle") {
        filter["$and"] = [];
        filter["$and"].push({ costAll: { $gte: 30000 } });
        filter["$and"].push({ costAll: { $lte: 60000 } });
        if (Static.filtersSearch.categoryActive != "") {
            filter["$and"].push({ category: Static.filtersSearch.categoryActive });
        }
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
        if (Static.filtersSearch.categoryActive != "") {
            filter["$and"].push({ category: Static.filtersSearch.categoryActive });
        }
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
    Static.costCourses = null
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
                    sort: filterCost.sort,

                    populate: {
                        path: 'company teachers',
                    }
                }
            })
        },
        fn: () => {
            
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="courses">
                                <div class="courses__container">
                                    <div class="university-header__title university-header__title_hover"
                                        onclick={() => {
                                            fn.siteLink("/crypto-university")
                                        }}
                                    >
                                        <img src={svg["mortarboard"]} />
                                        <p>{Variable.lang.a.university}</p>
                                    </div>
                                    <div class="courses__filter">
                                        <div class="courses__filter-container">
                                            <div class="courses-select">
                                                <div class="courses-select--default"
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
                                                                    <span class="courses-select--default-weight">
                                                                        {Static.categoryName}
                                                                    </span>
                                                                )
                                                            } else if (Static.item && Static.item.name) {
                                                                return (
                                                                    <span class="courses-select--default-weight">
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
                                                                <div class="courses-select-container">
                                                                    {Static.category.map((item) => {
                                                                        return (
                                                                            <div class="courses-select__list"
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
                                                                                            Static.item = await fn.socket.get({
                                                                                                method: "ListCat",
                                                                                                params: {
                                                                                                    filter: {
                                                                                                        direction: this.value
                                                                                                    },
                                                                                                }
                                                                                            })
                                                                                            filterCost = makeFilters(Static)
                                                                                            Static.courses = await fn.socket.get({
                                                                                                method: "Courses",
                                                                                                params: {
                                                                                                    filter: filterCost.filter,
                                                                                                    find: { name: { $regex: Static.filtersSearch.textSearch, $options: "i" } },
                                                                                                    sort: filterCost.sort,
                                                                                                    populate: {
                                                                                                        path: 'company teachers',
                                                                                                    }
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
                                            <div class="courses-select">
                                                <div class="courses-select--default"
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
                                                        Static.costCourses
                                                            ?
                                                            <span class="courses-select--default-weight">
                                                                {Static.costCourses}
                                                            </span>
                                                            :
                                                            <span>
                                                                Стоимость
                                                            </span>
                                                    }
                                                    <img src={svg["select_arrow"]} />
                                                </div>
                                                {
                                                    () => {
                                                        if (Static.selectCost) {
                                                            return (
                                                                <div class="courses-select-container">
                                                                    {costCourses.map((item) => {
                                                                        return (
                                                                            <div class="courses-select__list">
                                                                                <label>
                                                                                    {item.cost}
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        readonly
                                                                                        value={item.cost}
                                                                                        Element={(el) => {
                                                                                            Static.elCost = el
                                                                                        }}
                                                                                        onclick={async (e) => {
                                                                                            Static.selectCost = false
                                                                                            Static.costCourses = item.cost
                                                                                            Static.filtersSearch.cost = item.name
                                                                                            filterCost = makeFilters(Static)
                                                                                            Static.courses = await fn.socket.get({
                                                                                                method: "Courses",
                                                                                                params: {
                                                                                                    filter: filterCost.filter,
                                                                                                    find: { name: { $regex: Static.filtersSearch.textSearch, $options: "i" } },
                                                                                                    sort: filterCost.sort,
                                                                                                    populate: {
                                                                                                        path: 'company teachers',
                                                                                                    }
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
                                        <div class="courses__filter-search">
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
                                                    // console.log('=022f2b= makeFILTER', filterCost)
                                                    Static.courses = await fn.socket.get({
                                                        method: "Courses",
                                                        params: {
                                                            filter: filterCost.filter,
                                                            find: filterCost.find,
                                                            sort: filterCost.sort,
                                                            populate: {
                                                                path: 'company teachers',
                                                            }
                                                        }
                                                    })
                                                    // console.log('=5d7eed=', Static.courses)
                                                    initReload()
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {
                                        Static.item != undefined && Static.item.length == 1
                                            ?
                                            <div class="courses__category">
                                                <div class="courses__category_description">
                                                    <h4>{Static.item[0].name}</h4>
                                                    <div>{`${Static.item[0].title}.`}</div>
                                                    <div>{`${Static.item[0].description}.`}</div>
                                                </div>
                                            </div>
                                            :
                                            Static.item != undefined && Static.item?.length !== 0
                                                ?
                                                <div class="courses__category">
                                                    <div class="courses__category_description">
                                                        <h4>{Static.item.name}</h4>
                                                        <div>{`${Static.item.title}.`}</div>
                                                        <div>{`${Static.item.description}.`}</div>
                                                    </div>
                                                </div>
                                                :
                                                null
                                    }
                                    <div class="cards">
                                        <div class="cards__container cards__container_type_courses">
                                            {
                                                Static.courses.length != 0
                                                    ?
                                                    Static.courses.map((item) => {
                                                        return (
                                                            <li class="card card_courses">
                                                                <a
                                                                    class="card__link card__link_background"
                                                                >
                                                                    <div class="card__title card__title_courses">
                                                                        {item.name}
                                                                    </div>
                                                                    <div class="card__description card__description_courses">
                                                                        {item.description}
                                                                    </div>
                                                                    <div class="card__container card__container_row card__container_indent_course">
                                                                        <div class="card__cost">
                                                                            <span>{item.cost}
                                                                                {item.currency == "rub" 
                                                                                ? 
                                                                                    <span class="card__cost_size"> ₽</span>
                                                                                :
                                                                                    item.currency == "usd" 
                                                                                ?
                                                                                    <span class="card__cost_size"> $</span>
                                                                                :
                                                                                null
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        {
                                                                            item.duration != undefined
                                                                            ?
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
                                                                                :
                                                                                null
                                                                        }
                                                                        
                                                                    </div>
                                                                    <a class="card__more card__more_indent_course">
                                                                        <span
                                                                            // href={`/crypto-university/show/${item._id}`}
                                                                            onclick={function (e) {
                                                                                // console.log('=aecfd1=', item)
                                                                                fn.siteLinkModal(`/crypto-university/show/${item._id}`, { title: `${item.name}`, item })
                                                                                // fn.siteLink(`/crypto-university/show/${item._id}`)
                                                                            }}
                                                                        >
                                                                            Больше информации
                                                                        </span>
                                                                    </a>
                                                                    <div class="card__category">
                                                                        <span>{item.category}</span>
                                                                    </div>
                                                                    <div
                                                                        class="card__icon"
                                                                        onclick={() => [
                                                                            item.company.map((item) => {
                                                                                fn.modals.ModalTeachers(item)
                                                                            })
                                                                        ]}
                                                                    >
                                                                        {
                                                                            item.icon
                                                                                ?
                                                                                <img src={`/assets/upload/worldPress/${item.icon}`} />
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                    :
                                                    <div class="card__undefined">
                                                        <span>По данному фильтру курсов не найдено</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
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