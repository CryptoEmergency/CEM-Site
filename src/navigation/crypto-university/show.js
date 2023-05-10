import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    Data,
    CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// import svg from '@assets/svg/index.js';
// import images from "@assets/images/index.js";
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment } from "@elements/element/index.js";
import { BlockError404 } from '@elements/blocks/index.js';
import Swiper from 'swiper/bundle';

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

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID, initData: "cryptouniversity_show" })

    Variable.HeaderShow = true;

    const swiperGo = function (numIndex) {
        let swiperitem = new Swiper(".swiper-post_authors", {
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
            // slidesPerView: 1,
            breakpoints: {
                100: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                620: {  //600
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                // 768: {
                //   slidesPerView: 2,
                //   spaceBetween: 50
                // },
                910: {  //800
                    slidesPerView: 4,
                    spaceBetween: 46,
                },
                1240: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
            },
            spaceBetween: 20
        });
    }

    load({
        ID,
        fnLoad: async () => {
            if (Variable.dataUrl.params) {
                Static.item = await fn.socket.get({
                    method: "CryptoUniversities",
                    _id: Variable.dataUrl.params,
                    params: {
                        populate: {
                            path: "teachers courses",
                            select: {
                                name: 1,
                                image: 1,
                                description: 1,
                                cost: 1,
                                duration: 1,

                            }
                        }
                    }
                })
                console.log('=9ebbf7=', Static.item)
            }
        },

        fn: async () => {
            console.log('=9ebbf7=', Static.item)
            if (!item._id) { return (<div><BlockError404 /></div>) }

            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="university">
                                <h2 class="university__title">{Static.item.name}</h2>
                                <div class="university__about">
                                    <div class="university__icon">
                                        <figure class="university__figure">
                                            {item.icon
                                                ?
                                                <img
                                                    class="university__logo"
                                                    src={`/assets/upload/worldPress/${Static.item.icon}`}
                                                    width="200"
                                                    height="200"
                                                />
                                                :
                                                <img
                                                    class="university__logo"
                                                    src={images["crypto-university"]}
                                                    width="200"
                                                    height="200"
                                                />
                                            }
                                        </figure>
                                        <div class="university__social">
                                            {Static.item.social.map((item) => {
                                                return (
                                                    <a href={item.url} class="university__social-item">
                                                        <div class="university__social-icons">
                                                            <img src={svg[`${item.channel}-icon`]}></img>
                                                        </div>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                        <a class="university__btn c-button c-button--gradient2"
                                            href={item.siteLink}
                                            onclick={() => {
                                                fn.siteLink({ title: "", item: {}, items: {} })
                                            }}
                                        >
                                            <span class="c-button__text">Сайт</span>
                                        </a>
                                    </div>
                                    <p class="university__description">
                                        {Static.item.description}
                                    </p>
                                </div>
                                {/* <section class="university__about">
                                    <h5>О компании</h5>
                                    <p>{item.aboutCompany}</p>
                                </section> */}
                                <div class="university__teachers">
                                    <h3 class="university__teachers-title university__teachers-title_indent">Преподаватели</h3>
                                    <div class="university__authors swiper-container">
                                        <div class="swiper swiper-post_authors" After={() => swiperGo()}>
                                            <div class="swiper-wrapper">
                                                {Static.item.teachers.map((item) => {
                                                    return (
                                                        <a
                                                            class="swiper-slide"
                                                        >
                                                            <div class="swiper-post_media_image_container">
                                                                <figure class="university__teachers-slide">
                                                                    <img src={`/assets/upload/worldPress/${item.image}`} />
                                                                    <figcaption class="university__slidertitle">{item.name}</figcaption>
                                                                </figure>
                                                            </div>
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                            <div class="swiper-pagination swiper-pagination-post_media"></div>
                                            <div class="swiper-scrollbar-post_media"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="cards">
                                    <h3 class="cards__title cards__title_indent_university">Курсы</h3>
                                    <div class="cards__container cards__container_type_courses">

                                        {Static.item.courses.map((item) => {
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
                                                                <span>{item.cost} ₽/мес.</span>
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
                                                    </a>
                                                </li>
                                            )
                                        })}

                                    </div>
                                </div>

                                {/* <section class="university__courses">
                                    <h5>Курсы</h5>
                                    <ul class="university__courses-list">
                                        {item.courses.map((course) => {
                                            return (
                                                <li class="">
                                                    <a
                                                        class="university__course"
                                                        href={course.link}
                                                        onclick={(e) => {
                                                            // e.preventDefault();
                                                            fn.siteLink()
                                                        }}
                                                    >
                                                        <span class="university__course-description">{course.name}</span>
                                                        <footer class="university__course-footer">
                                                            <time class="university__course-time" datetime="">{fn.moment(course.dateStart).format('YYYY-MM-DD')}</time>
                                                            <span class="university__course-hourse">{`${course.duration} ч`}</span>
                                                        </footer>
                                                        {course.promotion
                                                            ?
                                                            <div class="university__course-stiker">
                                                                <img src={images["university/promotion"]} />
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section> */}
                            </div>
                        </div>

                    </div>
                </div>

            )

            return (
                <div>
                    {
                        Static.item.map((item) => {
                            return (
                                <div
                                    class={[
                                        "c-criptocompany",
                                        "c-container",
                                        Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                                    ]}
                                >
                                    <h2 class="c-criptocompany__title">{item.nameCompany}</h2>
                                    <figure class="c-criptocompany__wrapperimg">
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
                                    <a class="c-criptocompany__btn c-button c-button--gradient2"
                                        href={item.siteLink}
                                        onclick={() => {
                                            fn.siteLink({ title: "", item: {}, items: {} })
                                        }}
                                    >
                                        <span class="c-button__text">Сайт</span>
                                    </a>
                                    <blockquote class="c-criptocompany__slogan">&#8220;{item.tagline}&#8221;</blockquote>
                                    <p class="c-criptocompany__shortdesc">
                                        {item.description}
                                    </p>
                                    {item.cover
                                        ?
                                        <figure class="c-criptocompany__cover">
                                            <img class=""
                                                src={`/assets/upload/worldPress/${item.cover}`}
                                            />
                                        </figure>
                                        :
                                        null
                                    }
                                    <section class="c-criptocompany__about">
                                        <h5>О компании</h5>
                                        <p>{item.aboutCompany}</p>
                                    </section>
                                    <div class="c-criptocompany__authors swiper-container">
                                        <div class="swiper swiper-post_authors" After={() => swiperGo()}>
                                            <div class="swiper-wrapper">
                                                {item.teachers.map((teacher) => {
                                                    return (
                                                        <a
                                                            class="swiper-slide"
                                                        // href="/crypto-university/teacher/1/"
                                                        // onclick={function (e) {
                                                        //     e.preventDefault();
                                                        //     e.stopPropagation();
                                                        //     fn.siteLinkModal(e, {
                                                        //         title: "Преподаватель: Иванов Иван Иванович", teacher: {
                                                        //             name: "Иванов Иван Иванович"
                                                        //         }
                                                        //     })
                                                        // }}
                                                        >
                                                            <div class="swiper-post_media_image_container">
                                                                <figure class="c-criptocompany__sliderwrap">
                                                                    <img src={`/assets/upload/worldPress/${teacher.image}`} />
                                                                    {/* <figcaption class="c-criptocompany__slidertitle">{teacher.title}</figcaption> */}
                                                                    <figcaption class="c-criptocompany__slidertitle">{teacher.name}</figcaption>
                                                                </figure>
                                                            </div>
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                            <div class="swiper-pagination swiper-pagination-post_media"></div>
                                            <div class="swiper-scrollbar-post_media"></div>
                                        </div>
                                    </div>
                                    <section class="c-criptocompany__courses">
                                        <h5>Курсы</h5>
                                        <ul class="c-criptocompany__list">
                                            {item.courses.map((course) => {
                                                return (
                                                    <li class="">
                                                        <a
                                                            class="c-criptocompany__course"
                                                            href={course.link}
                                                            onclick={(e) => {
                                                                // e.preventDefault();
                                                                fn.siteLink()
                                                            }}
                                                        >
                                                            <span class="c-criptocompany__coursedesc">{course.name}</span>
                                                            <footer class="c-criptocompany__footer">
                                                                <time class="c-criptocompany__time" datetime="">{fn.moment(course.dateStart).format('YYYY-MM-DD')}</time>
                                                                <span class="c-criptocompany__hourse">{`${course.duration} ч`}</span>
                                                            </footer>
                                                            {course.promotion
                                                                ?
                                                                <div class="c-criptocompany__stiker">
                                                                    <img src={images["university/promotion"]} />
                                                                </div>
                                                                :
                                                                null
                                                            }

                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                    </section>
                                </div>
                            )
                        })
                    }
                </div>

            )


            // return (
            //     <div
            //         class={[
            //             "c-criptocompany",
            //             "c-container",
            //             Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
            //         ]}
            //     >
            //         <h2 class="c-criptocompany__title">Название компании</h2>
            //         <figure class="c-criptocompany__wrapperimg">
            //             <img class="c-criptocompany__logo" src="https://yt3.googleusercontent.com/8HmH6WuhicmT878ZRlUUW6QUJbudwtVAAbmABTmiQGLp58ebjHmf4tIeXTQ4XC_W1K4kAzx8pNw=s900-c-k-c0x00ffffff-no-rj" width="300" height="300" />
            //         </figure>
            //         <a class="c-criptocompany__btn c-button c-button--gradient2" href="">
            //             <span class="c-button__text">Сайт</span>
            //         </a>
            //         <blockquote class="c-criptocompany__slogan">&#8220;Слоган компании в пару строк или больше&#8221;</blockquote>
            //         <p class="c-criptocompany__shortdesc">
            //             Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
            //             Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
            //         </p>
            //         <figure class="c-criptocompany__cover">
            //             <img class="" src="https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2%D0%BE%D0%B9-%D0%B3%D1%80%D0%B0%D0%B4%D0%B8%D0%B5%D0%BD%D1%82-%D0%B3%D1%80%D0%B0%D0%B4%D0%B8%D0%B5%D0%BD%D1%82%D0%B0-%D1%81-%D1%8D%D1%84%D1%84%D0%B5%D0%BA%D1%82%D0%BE%D0%BC-%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-231031876.jpg" width="100%" height="150" />
            //         </figure>

            //         <section class="c-criptocompany__about">
            //             <h5>О компании</h5>
            //             <p>
            //                 Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
            //                 <br />
            //                 Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
            //             </p>
            //         </section>

            //         <div class="c-criptocompany__authors swiper-container">
            //             <div class="swiper swiper-post_authors" After={() => swiperGo()}>
            //                 <div class="swiper-wrapper">
            //                     <a
            //                         class="swiper-slide"
            //                         href="/crypto-university/teacher/1/"
            //                         onclick={function (e) {
            //                             e.preventDefault();
            //                             e.stopPropagation();
            //                             fn.siteLinkModal(e, {
            //                                 title: "Преподаватель: Иванов Иван Иванович", teacher: {
            //                                     name: "Иванов Иван Иванович"
            //                                 }
            //                             })
            //                         }}
            //                     >
            //                         <div class="swiper-post_media_image_container">
            //                             <figure class="c-criptocompany__sliderwrap">
            //                                 <img src={images["university/teacher1"]} />
            //                                 <figcaption class="c-criptocompany__slidertitle">Иванов Иван Иванович</figcaption>
            //                             </figure>
            //                         </div>
            //                     </a>
            //                     <a
            //                         class="swiper-slide"
            //                         href="/crypto-university/teacher/2/"
            //                         onclick={function (e) {
            //                             e.preventDefault();
            //                             e.stopPropagation();
            //                             fn.siteLinkModal(e, {
            //                                 title: "Преподаватель: Алексеева Ксения Александровна", teacher: {
            //                                     name: "Алексеева Ксения Александровна"
            //                                 }
            //                             })
            //                         }}
            //                     >
            //                         <div class="swiper-post_media_image_container">
            //                             <figure class="c-criptocompany__sliderwrap">
            //                                 <img src={images["university/teacher2"]} />
            //                                 <figcaption class="c-criptocompany__slidertitle">Алексеева Ксения Александровна</figcaption>
            //                             </figure>
            //                         </div>
            //                     </a>
            //                     <a
            //                         class="swiper-slide"
            //                         href="/crypto-university/teacher/3/"
            //                         onclick={function (e) {
            //                             e.preventDefault();
            //                             e.stopPropagation();
            //                             fn.siteLinkModal(e, {
            //                                 title: "Преподаватель: Крылов Петр Ильич", teacher: {
            //                                     name: "Крылов Петр Ильич"
            //                                 }
            //                             })
            //                         }}
            //                     >
            //                         <div class="swiper-post_media_image_container">
            //                             <figure class="c-criptocompany__sliderwrap">
            //                                 <img src={images["university/teacher3"]} />
            //                                 <figcaption class="c-criptocompany__slidertitle">Крылов Петр Ильич</figcaption>
            //                             </figure>
            //                         </div>
            //                     </a>
            //                     <a
            //                         class="swiper-slide"
            //                         href="/crypto-university/teacher/4/"
            //                         onclick={function (e) {
            //                             e.preventDefault();
            //                             e.stopPropagation();
            //                             fn.siteLinkModal(e, {
            //                                 title: "Преподаватель: Мальцева Надежда Николаевна", teacher: {
            //                                     name: "Мальцева Надежда Николаевна"
            //                                 }
            //                             })
            //                         }}
            //                     >
            //                         <div class="swiper-post_media_image_container">
            //                             <figure class="c-criptocompany__sliderwrap">
            //                                 <img src={images["university/teacher4"]} />
            //                                 <figcaption class="c-criptocompany__slidertitle">Мальцева Надежда Николаевна</figcaption>
            //                             </figure>
            //                         </div>
            //                     </a>
            //                 </div>
            //                 <div class="swiper-pagination swiper-pagination-post_media"></div>
            //                 <div class="swiper-scrollbar-post_media"></div>
            //             </div>
            //         </div>

            //         <section class="c-criptocompany__courses">
            //             <h5>Курсы</h5>

            //             <div class="tags tags--static c-criptocompany__tags">
            //                 <Tags
            //                     Static={Static}
            //                     text={Variable.lang.categoryName.all}

            //                     classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
            //                     type="All"
            //                 />
            //                 {/* {() => {
            //                     // if (Variable[Static.nameRecords + "Category"]) {
            //                     let arrReturn =
            //                         // Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
            //                         Static.CryptoUniversityCategory.filter((item) => item.name !== null).map((item) => {

            //                             return (
            //                                 <Tags
            //                                     Static={Static}
            //                                     text={Variable.lang.categoryName[item.name]}
            //                                     classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
            //                                     type={item.name}
            //                                 />
            //                             )
            //                         })
            //                     return arrReturn
            //                     // }
            //                 }} */}
            //             </div>

            //             <ul class="c-criptocompany__list">
            //                 <li class="">
            //                     <a
            //                         class="c-criptocompany__course"
            //                         href="/crypto-university/course/1/"
            //                         onclick={(e) => {
            //                             e.preventDefault();
            //                             fn.siteLinkModal(e, { title: "Курс по NFT-технологии. Вводный" })
            //                         }}
            //                     >
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         {/* <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div> */}
            //                     </a>
            //                 </li>
            //                 <li class="">
            //                     <a href="#" class="c-criptocompany__course">
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         {/* <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div> */}
            //                     </a>
            //                 </li>
            //                 <li class="">
            //                     <a href="#" class="c-criptocompany__course">
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div>
            //                     </a>
            //                 </li>
            //                 <li class="">
            //                     <a href="#" class="c-criptocompany__course">
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div>
            //                     </a>
            //                 </li>
            //                 <li class="">
            //                     <a href="#" class="c-criptocompany__course">
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         {/* <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div> */}
            //                     </a>
            //                 </li>
            //                 <li class="">
            //                     <a href="#" class="c-criptocompany__course">
            //                         <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
            //                         <footer class="c-criptocompany__footer">
            //                             <time class="c-criptocompany__time" datetime="">22.02.2023</time>
            //                             <span class="c-criptocompany__hourse">22 ч</span>
            //                         </footer>
            //                         {/* <div class="c-criptocompany__stiker">
            //                             <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
            //                         </div> */}
            //                     </a>
            //                 </li>
            //             </ul>
            //         </section>
            //     </div>
            // )
        },
    })
    return
};

export default start;