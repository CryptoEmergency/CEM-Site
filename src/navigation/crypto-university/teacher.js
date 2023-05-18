import {
    jsx,
    jsxFrag,
    init,
    load,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
// import { fn } from '@src/functions/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID })

    const swiperGo = function (numIndex) {
        let swiper1 = new Swiper(".swiper-post_teachers", {
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

        let swiper2 = new Swiper(".swiper-post_reviews", {
            // effect: "cube",
            grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // },
            loop: true,
            autoplay: false,
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
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // 768: {
                //   slidesPerView: 2,
                //   spaceBetween: 50
                // },
                910: {  //800
                    slidesPerView: 2,
                    spaceBetween: 46,
                },
                1240: {
                    slidesPerView: 3,
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
                    method: "Teachers",
                    _id: Variable.dataUrl.params,
                    params: {
                        populate: {
                            path: "courses"
                        }
                    }
                })
                console.log('=9ebbf7=', Static.item)
            }
        },
        fn: async () => {

            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">

                            <div class="teacher">
                                <figure class="teacher__photo">
                                    <img src={`/assets/upload/worldPress/${Static.item.image}`} />
                                    <figcaption class="teacher__jobtitle">Ведущий курса, {Static.item.profession}</figcaption>
                                </figure>

                                <section class="teacher__biography">
                                    <h2 class="teacher__title">{Static.item.name}</h2>
                                    <h5 class="teacher__subtitle">Достижения</h5>
                                    <p>
                                        {Static.item.experience}
                                    </p>
                                </section>
                            </div>
                            

                            {/* <section class="c-cryptoteacher__achievements">
                            <h5 class="c-cryptoteacher__subtitle">Личные достижения</h5>
                            <p>
                                Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                                Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
                            </p>
                        </section> */}

                            <section class="teacher__courses teacher__courses_indent">
                                <h5 class="teacher__subtitle">Список курсов преподавателя</h5>
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
                                                    <div class="card__category">
                                                        <span>{item.category}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })}

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            );

            return (
                <div class="c-cryptoteacher c-main__body">
                    <div class="c-cryptoteacher__container c-container">
                        <figure class="c-cryptoteacher__photo">
                            <img src={`/assets/upload/worldPress/${Static.item.image}`} />
                            <figcaption class="c-cryptoteacher__jobtitle">Ведущий курса, {Static.item.profession}</figcaption>
                        </figure>

                        <h1 class="c-cryptoteacher__title">{Static.item.name}</h1>

                        <section class="c-cryptoteacher__biography">
                            <h5 class="c-cryptoteacher__subtitle">Достижения</h5>
                            <p>
                                {Static.item.experience}
                            </p>
                        </section>

                        {/* <section class="c-cryptoteacher__achievements">
                            <h5 class="c-cryptoteacher__subtitle">Личные достижения</h5>
                            <p>
                                Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                                Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
                            </p>
                        </section> */}

                        <section class="c-cryptoteacher__courses">
                            <h5 class="c-cryptoteacher__subtitle">Список курсов преподавателя</h5>
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
                        </section>
                    </div>
                </div>
            );
        }
    }
    );
};
export default start;
  // OK