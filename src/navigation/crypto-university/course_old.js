import {
    jsx,
    jsxFrag,
    init,
    Variable,
    load,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID });
    // console.log('=23889a=', data, Variable.dataUrl)

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
            Static.item = await fn.socket.get({ 
                method: "Courses", 
                _id: Variable.dataUrl.params,
                params: { 
                    // filter: {},
                    populate: {
                        path: 'teachers company',
                        select: {
                            name: 1,
                            image: 1,
                            description: 1,
                        },
                    }
                }
            })
        },
        fn: () => {
            console.log('=022f2b=', Static.item)
            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">

                            <div class="course">
                                <div class="course__container">
                                    <div class="course__company course__company_indent">
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
                                    </div>
                                    <div class="course__name">
                                        <h2 class="course__title">{Static.item.name}</h2>
                                        <div class="course__description">
                                            {Static.item.description}
                                        </div>
                                    </div>

                                    <div class="course__teachers">
                                        <h3>Преподаватели</h3>
                                        <div class="swiper-container">
                                            <div class="swiper swiper-post_teachers" After={() => swiperGo()}>
                                                <div class="swiper-wrapper">
                                                    {Static.item.teachers?.map((item) => {
                                                        return (
                                                            <a 
                                                                class="swiper-slide"
                                                                href={`/crypto-university/teacher/${item._id}`}
                                                                onclick={function (e) {
                                                                    fn.siteLink(e, { title: "", item: {}, items: {} })
                                                                }}
                                                            >
                                                                <div class="swiper-post_media_image_container">
                                                                    <figure class="c-cryptocourse__sliderwrap">
                                                                        <img src={`/assets/upload/worldPress/${item.image}`} />
                                                                        <figcaption class="c-cryptocourse__slidertitle">{item.name}</figcaption>
                                                                    </figure>
                                                                </div>
                                                            </a>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="course__tariff">
                                        <h3>Тарифы</h3>
                                        <div class="course__tariff-container">
                                            {Static.item.tariff?.map((item) => {
                                                return (
                                                    <div class="tariff">
                                                        <h4 class="tariff__title">
                                                            {item.name}
                                                        </h4>
                                                        <ul class="tariff__list">
                                                            <li>
                                                                формат: {item.typeOfEvent}
                                                            </li>
                                                            <li>
                                                                длительность: {item.duration} месяцев
                                                            </li>
                                                            <li>
                                                                количество уроков: {item.numberOfContent}
                                                            </li>
                                                            <li class="tariff__cost">
                                                                {item.cost} ₽ / стоимость
                                                            </li>
                                                        </ul>
                                                        <div class="tariff__buy c-button c-button--primary ">
                                                            <span>Купить</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* <div class="c-cryptocourse__card">
                                <header class="c-cryptocourse__cardname">Курс по NFT-технологии. Вводный</header>
                                <div class="c-cryptocourse__carddesc">
                                    <p>
                                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                                    </p>
                                    <p>
                                        Текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. Текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                                    </p>
                                </div>
                                <footer class="c-cryptocourse__footer">
                                    <ul class="c-cryptocourse__statistic">
                                        <li class="">
                                            <span class="">Рейтинг</span>
                                            <span class="">4.7 из 5</span>
                                        </li>
                                        <li class="">
                                            <span class="">Время обучения</span>
                                            <span class="">3 мес</span>
                                        </li>
                                        <li class="">
                                            <span class="">Количество часов</span>
                                            <span class="">22 ч</span>
                                        </li>
                                    </ul>
                                </footer>
                                <div class="c-cryptocourse__stiker">
                                    <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                </div>
                            </div> */}

                            {/* <section class="c-cryptocourse__about">
                                <h5>О курсе</h5>
                                <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.</p>
                                <p>Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.</p>
                            </section> */}

                            {/* <section class="c-cryptocourse__teachers">
                                <h5>Преподаватели</h5>
                                <div class="c-cryptocourse__slider swiper-container">
                                    <div class="swiper swiper-post_teachers" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <figure class="c-cryptocourse__sliderwrap">
                                                        <img src={images["university/teacher1"]} />
                                                        <figcaption class="c-cryptocourse__slidertitle">Иванов Иван Иванович</figcaption>
                                                    </figure>
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <figure class="c-cryptocourse__sliderwrap">
                                                        <img src={images["university/teacher2"]} />
                                                        <figcaption class="c-cryptocourse__slidertitle">Алексеева Ксения Александровна</figcaption>
                                                    </figure>
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <figure class="c-cryptocourse__sliderwrap">
                                                        <img src={images["university/teacher3"]} />
                                                        <figcaption class="c-cryptocourse__slidertitle">Крылов Петр Ильич</figcaption>
                                                    </figure>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-pagination swiper-pagination-post_media"></div>
                                        <div class="swiper-scrollbar-post_media"></div>
                                    </div>
                                </div>
                            </section> */}

                            {/* <section class="c-cryptocourse__reviews">
                                <h5>Отзывы</h5>
                                <div class="c-cryptocourse__slider swiper-container">
                                    <div class="swiper swiper-post_reviews" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            <a class="swiper-slide">
                                                <div class="c-cryptocourse__review">
                                                    <p class="c-cryptocourse__textreview">
                                                        "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum
                                                        Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum"
                                                    </p>
                                                    <span class="c-cryptocourse__namereview">Лида Г.</span>
                                                    <span class="c-cryptocourse__datereview">12.12.2022</span>
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="c-cryptocourse__review">
                                                    <p class="c-cryptocourse__textreview">
                                                        "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum"
                                                    </p>
                                                    <span class="c-cryptocourse__namereview">Лида Г.</span>
                                                    <span class="c-cryptocourse__datereview">12.12.2022</span>
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="c-cryptocourse__review">
                                                    <p class="c-cryptocourse__textreview">
                                                        "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum
                                                        Lorem Ipsum, используемый с XVI века, приведён ниже."
                                                    </p>
                                                    <span class="c-cryptocourse__namereview">Лида Г.</span>
                                                    <span class="c-cryptocourse__datereview">12.12.2022</span>
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="c-cryptocourse__review">
                                                    <p class="c-cryptocourse__textreview">
                                                        "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum
                                                        Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum"
                                                    </p>
                                                    <span class="c-cryptocourse__namereview">Лида Г.</span>
                                                    <span class="c-cryptocourse__datereview">12.12.2022</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-pagination swiper-pagination-post_media"></div>
                                        <div class="swiper-scrollbar-post_media"></div>
                                    </div>
                                </div>
                            </section> */}

                            {/* <a class="c-cryptocourse__btn c-button c-button--gradient2" href="">
                                <span class="c-button__text">Записаться на курс</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            );
        }
    })
};

export default start;
  // OK