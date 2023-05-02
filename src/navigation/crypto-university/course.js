import {
    jsx,
    jsxFrag,
    init,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const start = function (data, ID) {
    console.log('=23889a=', data, Variable.dataUrl)

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

    init(
        null,
        () => {
            return (
                <div class="c-cryptocourse c-main__body">
                    <div class="c-cryptocourse__container c-container">
                        <div class="c-cryptocourse__card">
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
                        </div>

                        <section class="c-cryptocourse__about">
                            <h5>О курсе</h5>
                            <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.</p>
                            <p>Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.</p>
                        </section>

                        <section class="c-cryptocourse__teachers">
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
                        </section>

                        <section class="c-cryptocourse__reviews">
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
                        </section>

                        <a class="c-cryptocourse__btn c-button c-button--gradient2" href="">
                            <span class="c-button__text">Записаться на курс</span>
                        </a>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK