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
                Static.records = await fn.socket.get({ method: "CryptoUniversities", params: { filter: makeFilter(Static) } })
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
            Static.activeCategory = "All"
            Static.nameRecords = "CryptoUniversity"
            Static.CryptoUniversityCategory = [
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
                },
                {
                    count: {
                        ru: 7,
                        en: 9
                    },
                    _id: "3",
                    name: "Finance",
                    type: "university"
                }
            ]
            Static.company = [
                {

                }
            ]
            Static.records = await fn.socket.get({ method: "CryptoUniversities", params: { filter: {} } })
        },
        fn: () => {
            // console.log('=38ddb1=', Static.records)
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="swiper-container">
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
                            </div>
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
                            <div class="cards-university">
                                {Static.records.map((item) => {
                                    return (
                                        <li class="card-university">
                                            <a
                                                href={`/crypto-university/show/${item._id}`}
                                                class="card-university__link"
                                                onclick={function (e) {
                                                    fn.siteLink(e, { title: "", item: {}, items: {} })
                                                }}
                                            >
                                                <figure class="card-university__figure">
                                                    {item.icon
                                                        ?
                                                        <img
                                                            class="card-university__logo"
                                                            src={`/assets/upload/worldPress/${item.icon}`}
                                                            width="100"
                                                            height="100"
                                                        />
                                                        :
                                                        <img
                                                            class="card-university__logo"
                                                            src={images["crypto-university"]}
                                                            width="100"
                                                            height="100"
                                                        />
                                                    }
                                                </figure>
                                                <a class="card-university__btn c-button c-button--gradient2" href="">
                                                    <span class="c-button__text">Кнопка</span>
                                                </a>
                                                <h3 class="card-university__companyname">{item.nameCompany}</h3>
                                                <p class="card-university__slogan">{item.tagline}</p>
                                                <p class="card-university__shortdescription">
                                                    {item.aboutCompany}
                                                </p>
                                                <div class="card-university__info">
                                                    {item.description}
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )

            return (
                <Elements.page.MainContainer
                    class="c-criptouniversity">
                    <div class="swiper-container">
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
                    </div>
                    <div class="c-criptouniversity__container c-container">
                        <div class="tags tags--static c-criptouniversity__tags">
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

                        <ul class="c-criptouniversity__cards">
                            {Static.records.map((item) => {
                                return (
                                    <li class="c-criptouniversity__card">
                                        <a
                                            href={`/crypto-university/show/${item._id}`}
                                            class="c-criptouniversity__link"
                                            onclick={function (e) {
                                                fn.siteLink(e, { title: "", item: {}, items: {} })
                                            }}
                                        >
                                            <figure class="c-criptouniversity__wrapperimg">
                                                {/* <img 
                                                    class="c-criptouniversity__logo" 
                                                    src={`/assets/upload/worldPress/${item.icon}`}
                                                    width="100" 
                                                    height="100" 
                                                /> */}
                                                {item.icon
                                                    ?
                                                    <img
                                                        class="c-criptouniversity__logo"
                                                        src={`/assets/upload/worldPress/${item.icon}`}
                                                        width="100"
                                                        height="100"
                                                    />
                                                    :
                                                    <img
                                                        class="c-criptouniversity__logo"
                                                        src={images["crypto-university"]}
                                                        width="100"
                                                        height="100"
                                                    />
                                                }
                                            </figure>
                                            <a class="c-criptouniversity__btn c-button c-button--gradient2" href="">
                                                <span class="c-button__text">Кнопка</span>
                                            </a>
                                            <h3 class="c-criptouniversity__companyname">{item.nameCompany}</h3>
                                            <p class="c-criptouniversity__slogan">{item.tagline}</p>
                                            <p class="c-criptouniversity__shortdescription">
                                                {item.aboutCompany}
                                                {/* Краткое описание компании на несколько строк
                                                <br />
                                                Возможно строки разделены переносами. */}
                                            </p>
                                            <div class="c-criptouniversity__info">
                                                {item.description}
                                                {/* Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. */}
                                            </div>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* <ul class="c-criptouniversity__cards">
                            <li class="c-criptouniversity__card">
                                <a
                                    href={`/crypto-university/show/1`}
                                    class="c-criptouniversity__link"
                                    onclick={function (e) {
                                        fn.siteLink(e, { title: "", item: {}, items: {} })
                                    }}
                                >
                                    <figure class="c-criptouniversity__wrapperimg">
                                        <img class="c-criptouniversity__logo" src="https://www.block-chain24.com/sites/default/files/styles/full_bg/public/img/kembridzhskii_universitet_zapuskaet_kripto-issledovatelskii_proekt_s_mvf_i_bis.jpeg?itok=8gdkoX1L" width="100" height="100" />
                                    </figure>
                                    <a class="c-criptouniversity__btn c-button c-button--gradient2" href="">
                                        <span class="c-button__text">Кнопка</span>
                                    </a>
                                    <h3 class="c-criptouniversity__companyname">"Название компании очень-преочень длинное"</h3>
                                    <p class="c-criptouniversity__slogan">Какой-то короткий слоган компании</p>
                                    <p class="c-criptouniversity__shortdescription">
                                        Краткое описание компании на несколько строк
                                        <br />
                                        Возможно строки разделены переносами.
                                    </p>
                                    <div class="c-criptouniversity__info">
                                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                                    </div>
                                </a>
                            </li>
                            <li class="c-criptouniversity__card">
                                <a
                                    href={`/crypto-university/show/2`}
                                    class="c-criptouniversity__link"
                                    onclick={function (e) {
                                        fn.siteLink(e, { title: "", item: {}, items: {} })
                                    }}
                                >
                                    <figure class="c-criptouniversity__wrapperimg">
                                        <img class="c-criptouniversity__logo" src="https://www.block-chain24.com/sites/default/files/styles/full_bg/public/img/kembridzhskii_universitet_zapuskaet_kripto-issledovatelskii_proekt_s_mvf_i_bis.jpeg?itok=8gdkoX1L" width="100" height="100" />
                                    </figure>
                                    <a class="c-criptouniversity__btn c-button c-button--gradient2" href="">
                                        <span class="c-button__text">Кнопка</span>
                                    </a>
                                    <h3 class="c-criptouniversity__companyname">"Название компании очень-преочень длинное"</h3>
                                    <p class="c-criptouniversity__slogan">Какой-то короткий слоган компании</p>
                                    <p class="c-criptouniversity__shortdescription">
                                        Краткое описание компании на несколько строк
                                        <br />
                                        Возможно строки разделены переносами.
                                    </p>
                                    <div class="c-criptouniversity__info">
                                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                                    </div>
                                </a>
                            </li>
                            <li class="c-criptouniversity__card">
                                <a
                                    href={`/crypto-university/show/3`}
                                    class="c-criptouniversity__link"
                                    onclick={function (e) {
                                        fn.siteLink(e, { title: "", item: {}, items: {} })
                                    }}
                                >
                                    <figure class="c-criptouniversity__wrapperimg">
                                        <img class="c-criptouniversity__logo" src="https://www.block-chain24.com/sites/default/files/styles/full_bg/public/img/kembridzhskii_universitet_zapuskaet_kripto-issledovatelskii_proekt_s_mvf_i_bis.jpeg?itok=8gdkoX1L" width="100" height="100" />
                                    </figure>
                                    <a class="c-criptouniversity__btn c-button c-button--gradient2" href="">
                                        <span class="c-button__text">Кнопка</span>
                                    </a>
                                    <h3 class="c-criptouniversity__companyname">"Название компании очень-преочень длинное"</h3>
                                    <p class="c-criptouniversity__slogan">Какой-то короткий слоган компании</p>
                                    <p class="c-criptouniversity__shortdescription">
                                        Краткое описание компании на несколько строк
                                        <br />
                                        Возможно строки разделены переносами.
                                    </p>
                                    <div class="c-criptouniversity__info">
                                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                                    </div>
                                </a>
                            </li>
                        </ul> */}
                    </div>
                </Elements.page.MainContainer>
            );
        }
    })
    return
};

export default start;