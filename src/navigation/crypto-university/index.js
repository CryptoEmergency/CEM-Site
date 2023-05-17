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

// import { fn } from '@src/functions/index.js';
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';
import Elements from '@src/elements/export.js';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

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
        let swiperitem = new Swiper(".swiper-post_university", {
            // effect: "cube",
            grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-post_media',
            },
            scrollbar: {
                el: '.swiper-scrollbar-post_media',
            },
            slidesPerView: 1,
            spaceBetween: 20
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
            // console.log('=38ddb1=', Static.CryptoUniversityCategory)
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
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
                            <div class="tags tags--static">
                                <Tags
                                    Static={Static}
                                    text={Variable.lang.categoryName.all}
                                    classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                    type="All"
                                />
                                {() => {
                                    let arrReturn =
                                        Static.CryptoUniversityCategory.filter((item) => item.name !== null).map((item) => {
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
                            <div class="cards">
                                <div class="cards__container cards__container_type_courses">

                                {Static.records.map((item) => {
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
                                                            <span class="card__duration-text_size">Месяца</span>
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
                                            </a>
                                        </li>
                                    )
                                })}
                                
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