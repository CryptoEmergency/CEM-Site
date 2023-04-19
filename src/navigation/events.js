import {
    jsx,
    jsxFrag,
    initGo,
    getStorage,
    setStorage,
    init,
    load,
    Variable,
    initReload,
    CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from '@src/elements/export.js';
import { Avatar, ButtonShowMore, Input, NotFound, TextArea, Select } from '@component/element/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const fn = CEM.fn

const makeFilter = function (Static) {
    let objReturn = {}

    if (Static.filters.language && Static.filters.language.name != "all") {
        objReturn["mainLanguage.code"] = Static.filters.language.code
    }
    if (Static.filters.country && Static.filters.country.name != "all") {
        objReturn["country.code"] = Static.filters.country.code
    }
    if (Static.search.value) {
        objReturn.search = Static.search.value;
    }
    return objReturn
}

const start = function (data, ID = "mainBlock") {
    let [Static] = fn.GetParams({ data, ID })

    Variable.HeaderShow = true;
    Variable.FooterShow = true;

    // const swiperGo = function (numIndex) {
    //     let swiperitem = new Swiper(".swiper-post_university", {
    //         // effect: "cube",
    //         grabCursor: true,
    //         // cubeEffect: {
    //         //     shadow: true,
    //         //     slideShadows: true,
    //         //     shadowOffset: 20,
    //         //     shadowScale: 0.94,
    //         // },
    //         loop: true,
    //         autoplay: {
    //             delay: 3000,
    //         },
    //         pagination: {
    //             el: '.swiper-pagination-post_media',
    //         },
    //         scrollbar: {
    //             el: '.swiper-scrollbar-post_media',
    //         },
    //         slidesPerView: 1,
    //         spaceBetween: 20
    //     });
    // }
    load({
        ID,
        fnLoad: async () => {
            fn.initData.events(Static)
            console.log('=a1b2d7= Static Events =', Static)

            Static.filters.language.onclick = async () => {
                fn.modals.ModalChangeLanguage({
                    onclick: async (langCode, langName, langOrig) => {
                        Static.filters.language.name = langName + ` (${langOrig})`;
                        Static.filters.language.code = langCode;
                        Static.filters.language.value = langName + ` (${langOrig})`;
                        Static.apiFilter = makeFilter(Static)
                        // await fn.restApi.getEvents({ name: Static.nameRecords, filter: Static.apiFilter })
                    }
                }, true)
            }

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

            Static.filters.cities.onclick = async () => {
                // fn.modals.ModalSelectCountry({
                //     onclick: async (countryCode, countryName) => {
                //         Static.filters.country.name = countryName;
                //         Static.filters.country.code = countryCode;
                //         Static.filters.country.value = countryName;
                //         Static.apiFilter = makeFilter(Static)
                //         await fn.restApi.getEvents({ name: Static.nameRecords, filter: Static.apiFilter })
                //     }
                // }, true)
                alert("Выбор города")
            }

            Static.search.condition = async (value) => {
                Static.apiFilter = makeFilter(Static)
                // await fn.restApi.getEvents({ name: Static.nameRecords, filter: Static.apiFilter })
                return true
            }

            Static.events = [
                {
                    _id: 1,
                    title: "Название первого мероприятия",
                    short: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века.",
                    date: "10.02.2023",
                    country: "РФ",
                    city: "Москва",
                    place: "ТЦ 'Спелая вишня'",
                    src: "news/28b51539438d9ac9dda97e3bd54d2113.png",
                    contacts: [
                        "https://ru.lipsum.com/",
                        "https://crypto-emergency.com/",
                        "https://cryptosummit.ru/"
                    ]
                },
                {
                    _id: 2,
                    title: "Название второго мероприятия",
                    short: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века.",
                    date: "20.05.2023",
                    country: "Китай",
                    city: "Шанхай",
                    place: "ТЦ 'Абракадабра'",
                    src: "news/916d69888aca4aff798ee3cf8720a064.png",
                    contacts: [
                        "https://ru.lipsum.com/",
                        "https://crypto-emergency.com/",
                        "https://cryptosummit.ru/"
                    ]
                },
                {
                    _id: 3,
                    title: "Название еще одного мероприятия",
                    short: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века.",
                    date: "14.06.2023",
                    country: "РФ",
                    city: "Краснодар",
                    place: "ТЦ 'Озмолл'",
                    src: "news/90869929c316f20195d9206a892147d7.jpg",
                    contacts: [
                        "https://ru.lipsum.com/",
                        "https://crypto-emergency.com/",
                        "https://cryptosummit.ru/"
                    ]
                }
            ]

            Static.apiFilter = makeFilter(Static)
            // await fn.restApi.getEvents({ name: Static.nameRecords, filter: Static.apiFilter })
        },
        fn: () => {
            // {
            // }
            console.log('=5c1a5a=', Static.events && Static.events.length)

            return (
                <Elements.page.MainContainer
                    class="c-events">
                    {/* <div class="swiper-container">
                        <div class="swiper swiper-post_university" After={() => swiperGo()}>
                            <div class="swiper-wrapper">
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <img style="height: 400px; border-radius: 4px" src="https://www.block-chain24.com/sites/default/files/styles/full_bg/public/img/kembridzhskii_universitet_zapuskaet_kripto-issledovatelskii_proekt_s_mvf_i_bis.jpeg?itok=8gdkoX1L" />
                                    </div>
                                </a>
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <img style="height: 400px; border-radius: 4px" src="https://tatcenter.ru/images/art/95566.jpg" />
                                    </div>
                                </a>
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <img style="height: 400px; border-radius: 4px" src="https://bits.media/upload/resize_cache/webp/upload/iblock/23a/rumynskiy_universitet_nachnet_prinimat_kriptoaktiv_elrond_dlya_oplaty_obucheniya.webp" />
                                    </div>
                                </a>
                            </div>
                            <div class="swiper-pagination swiper-pagination-post_media"></div>
                            <div class="swiper-scrollbar-post_media"></div>
                        </div>
                    </div> */}
                    <div class="c-events__container c-container">
                        <h2 class="c-events__title"

                        >Мероприятия
                            <button class="Modal-1" onclick={() => {
                                fn.modals.ModalAddEvents({})
                                // fn.modals.ModalAfterRegisterForm({})
                            }}>

                            </button>
                        </h2>

                        <figure class="c-events__cover">
                            <img style="border-radius: 4px; width: 100%" src={images['banners/BlockchainLifeBig']} />
                        </figure>

                        <div class="c-events__searchblock c-search">
                            <div class="c-search__container">
                                <div class="c-search__wrapper">
                                    <img class="c-search__icon" src={svg.search_icon} />
                                    <Input className="c-search__input" Static={Static.search} customStyle={"border-radius: 3px"} />
                                    <img
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
                                    />

                                </div>
                                <div style="display: none;" class="questions_search">
                                    <div class="question_search_half_empty">
                                        {Variable.lang.text.contInput}
                                    </div>
                                    <div style="display: none;" class="question_search_help"></div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="c-events__filter c-friends__additional"
                            data-active={false}
                            style={"height: 0px"}
                            Element={($el) => {
                                Static.elShowFilter = $el
                            }}
                        >
                            <div class="c-events__wrapper c-friends__wrapper">
                                <Input classDiv="language_select_wrapper" className="c-friends__country" Static={Static.filters.country} />
                                <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                            </div>
                            <div class="c-events__wrapper -friends__wrapper">
                                <Input classDiv="language_select_wrapper" className="c-friends__country" Static={Static.filters.cities} />
                                <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                            </div>
                            <div class="c-events__wrapper c-friends__wrapper">
                                <div class="language_select_wrapper">
                                    <input type="date" class="c-friends__country" Static={Static.filters.date} />
                                </div>
                                <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                            </div>
                            {/* <div class="c-friends__wrapper">
                                <Input classDiv="language_select_wrapper" className="c-friends__lang" Static={Static.filters.language} />
                                <img style="display: none;" class="refresh_language" src={svg.refresh_filter} />
                            </div> */}

                        </div>

                        <ul class="c-events__list">
                            {
                                Static.events && Static.events.length ?
                                    Static.events.map(function (item, index) {
                                        return (
                                            <li class="">
                                                <a
                                                    class="c-events__card"
                                                    href={`/events/show/${index + 1}`}
                                                    onclick={function (e) {
                                                        fn.siteLinkModal(e, { title: item.title, item: item })
                                                    }}
                                                >
                                                    <figure class="c-events__covercard">
                                                        <img src={`/assets/upload/${item.src}`} width="" height="" />
                                                    </figure>
                                                    <h5 class="c-events__titlecard">{item.title}</h5>
                                                    <p class="c-events__shortcard">{item.short}</p>
                                                    <footer class="c-events__footercard">
                                                        <date datetime="" class="c-events__datecard">{item.date}</date>
                                                        <span class="c-events__citycard">{item.city}</span>
                                                    </footer>
                                                </a>
                                            </li>
                                        )
                                    })
                                    : <NotFound />
                            }
                        </ul>
                    </div>
                </Elements.page.MainContainer>
            );
        }
    })
    return
};

export default start;