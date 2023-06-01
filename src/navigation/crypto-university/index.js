import {
    jsx,
    jsxFrag,
    initGo,
    getStorage,
    setStorage,
    init,
    Data,
    load,
    Variable,
    CEM,
    initReload
} from "@betarost/cemserver/cem.js";

import Swiper from 'swiper/bundle';
import Elements from '@src/elements/export.js';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
};

const Tags = function ({ Static, classActive, text, type }) {
    return (
        <div class={["tag_button", classActive]}
            onclick={async () => {
                if (Static.activeCategory == type) {
                    return;
                }
                Static.activeCategory = type;
                // await fn.restApi.getNews({ name: Static.nameRecords, filter: Static.apiFilter })
                Static.records = await fn.socket.get({ method: "Courses", params: { filter: makeFilter(Static) } })
                initReload()
            }}>
            <span>{text}</span>
        </div>
    )
}

const makeFilter = (Static) => {
    let ret = {}
    // ret["type"] = "news"
    if (Static.activeCategory !== "All") {
        ret["category"] = Static.activeCategory
        // Data.Static.showMore = true
    }

    return ret
}

const start = function (data, ID = "mainBlock") {
    let [Static] = fn.GetParams({ data, ID })
    // let filterArrLogo, type, arrLogo, teachers, courses;

    Variable.HeaderShow = true;
    Variable.FooterShow = true;
    Static.filters = {
        category: ""
    }

    const swiperGo = function (numIndex) {
        let swiperitem = new Swiper(".image-slider", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            
        });
    }

    load({
        ID,
        fnLoad: async () => {
            Static.CryptoUniversityCategory = await fn.socket.get({ method: "ListCat", params: { filter: { type: "courses" } } })
            Static.activeCategory = "All"
            Static.nameRecords = "Courses"
            Static.company = [
                {

                }
            ]
            Static.records = await fn.socket.get({ method: "Courses", params: { filter: {} } })
        },
        fn: () => {
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="university university_indent">
                                <div class="university-header">
                                    <div class="university-header__title">
                                        <img src={svg["mortarboard"]} />
                                        <p>{Variable.lang.a.university}</p>
                                    </div>
                                    <div class="university-header__courses tag_button"
                                        onclick={(e) => {
                                            fn.siteLink(`/crypto-university/course/`)
                                        }}
                                    >
                                        <span>{Variable.lang.span.allCourses}</span>
                                    </div>
                                </div>
                                <div class="university__slogan">
                                    <h3>Откройте новые горизонты с Крипто университетом: образование, инновации, успех!</h3>
                                </div>
                                <div class="category">
                                    {Static.CryptoUniversityCategory.map((item) => {
                                        return (
                                            <a
                                                class="category__item"
                                                href={item.soon ? null : `/crypto-university/course/${item._id}`}
                                                onclick={function (e) {
                                                    fn.siteLink(e)
                                                }}
                                            >
                                                <div class="category__item-title">
                                                    {item.name == "Бесплатные часы"
                                                        ?
                                                        `${item.name} от Crypto Emergency`
                                                        :
                                                        `${item.name}`
                                                    }
                                                    <p class={isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() ? null : "category__subtitle"}>{item.title}</p>
                                                </div>
                                                <img class={[
                                                        "category__image",
                                                        isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() ? "category__image_opacity" : null
                                                    ]}
                                                    src={`/assets/upload/worldPress/${item.background}`} 
                                                />
                                                <p class={[ "category__description",
                                                    isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() ? "category__description_mobile" : "category__description_desktop"]}>{item.description}</p>
                                                {
                                                    item.soon
                                                    ?
                                                        <img src={images["university/soon1"]} 
                                                            class="category__soon"
                                                        />
                                                    :
                                                    null
                                                }
                                            </a>
                                        )
                                    })}
                                </div>
                                <div class="swiper-container">
                                    <div class="swiper image-slider" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            <div class="university-author swiper-slide">
                                                <div class="university-author__container">
                                                    <div class="university-author__title">
                                                        Путь в крипте. Оcнователь ArtEmotioChain
                                                    </div>
                                                    <a class="university-author__read"
                                                        href={`/lenta-users/show/6475f7c9d3fae5f5248f5000`}
                                                        onclick={function (e) {
                                                            fn.siteLinkModal(e, { title: "Переход из мира финансов в сферу IT"})
                                                        }}
                                                    >
                                                        <span>Читать</span>
                                                    </a>
                                                    <img class="university-author__image" src={images["university/author_1"]} />
                                                </div>
                                            </div>
                                            <div class="university-author swiper-slide">
                                                <div class="university-author__container">
                                                    <div class="university-author__title">
                                                        Как родился ArtEmotioChain
                                                    </div>
                                                    <a class="university-author__read"
                                                        href={`/lenta-users/show/64760004d3fae5f5249097c4`}
                                                        onclick={function (e) {
                                                            fn.siteLinkModal(e, { title: "Как родился ArtEmotioChain" })
                                                        }}
                                                    >
                                                        <span>Читать</span>
                                                    </a>
                                                    <img class="university-author__image" src={images["university/author_2"]} />
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="swiper-button-next">
                                            <img src={svg["arrow-right"]} />
                                        </div>
                                        <div class="swiper-button-prev">
                                            <img src={svg["arrow-left"]} />
                                        </div>
                                    </div>
                                </div>
                                <div class="university-test">
                                    <div class="university-test__container">
                                        <div class="university-test__title">
                                            Узнай, какая профессия наиболее подходит именно тебе, с помощью нашего теста на профориентацию
                                        </div>
                                        <img class="university-author__image" src={images["university/test"]} />
                                        <div class="university-test__button"
                                            onclick={() => {
                                                fn.modals.ModalComingSoon()
                                            }}
                                        >
                                            <span>Пройти бесплатно</span>
                                        </div>
                                        <img src={images["university/soon1"]} class="category__soon" />
                                    </div>
                                </div>
                                <div class="university-review">
                                    <div class="university-test__container">
                                        <div class="university-review__title">
                                            Отзывы
                                        </div>
                                        <p class="university-review__soon">
                                            <span>Отзывы ещё не оставлены</span>
                                        </p>
                                        <img class="university-author__image" src={images["university/reviews"]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
    return
};

export default start;