import {
    jsx,
    jsxFrag,
    init,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
// import { fn } from '@src/functions/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { svg, fn } = CEM

const start = function (data, ID) {

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
                <div class="c-cryptoteacher c-main__body">
                    <div class="c-cryptoteacher__container c-container">
                        <figure class="c-cryptoteacher__photo">
                            <img src={images["university/teacher2"]} width="" height="" />
                            <figcaption class="c-cryptoteacher__jobtitle">Ведущий курса, NFT-художник</figcaption>
                        </figure>

                        <h1 class="c-cryptoteacher__title">{data.teacher.name}</h1>

                        <section class="c-cryptoteacher__biography">
                            <h5 class="c-cryptoteacher__subtitle">Биография</h5>
                            <p>
                                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                            </p>
                        </section>

                        <section class="c-cryptoteacher__achievements">
                            <h5 class="c-cryptoteacher__subtitle">Личные достижения</h5>
                            <p>
                                Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                                Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
                            </p>
                        </section>

                        <section class="c-cryptoteacher__courses">
                            <h5 class="c-cryptoteacher__subtitle">Список курсов</h5>
                            <ul class="c-cryptoteacher__listcourse c-criptocompany__list">
                                <li class="">
                                    <a
                                        class="c-criptocompany__course"
                                        href="/crypto-university/course/1/"
                                        onclick={(e) => {
                                            e.preventDefault();
                                            fn.siteLinkModal(e, { title: "Курс по NFT-технологии. Вводный" })
                                        }}
                                    >
                                        <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
                                        <footer class="c-criptocompany__footer">
                                            <time class="c-criptocompany__time" datetime="">22.02.2023</time>
                                            <span class="c-criptocompany__hourse">22 ч</span>
                                        </footer>
                                        {/* <div class="c-criptocompany__stiker">
                                        <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                    </div> */}
                                    </a>
                                </li>
                                <li class="">
                                    <a href="#" class="c-criptocompany__course">
                                        <span class="c-criptocompany__coursedesc">Курс по NFT-технологии.</span>
                                        <footer class="c-criptocompany__footer">
                                            <time class="c-criptocompany__time" datetime="">22.02.2023</time>
                                            <span class="c-criptocompany__hourse">22 ч</span>
                                        </footer>
                                        {/* <div class="c-criptocompany__stiker">
                                        <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                    </div> */}
                                    </a>
                                </li>
                                <li class="">
                                    <a href="#" class="c-criptocompany__course">
                                        <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Продвинутый</span>
                                        <footer class="c-criptocompany__footer">
                                            <time class="c-criptocompany__time" datetime="">22.02.2023</time>
                                            <span class="c-criptocompany__hourse">45 ч</span>
                                        </footer>
                                        <div class="c-criptocompany__stiker">
                                            <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </section>

                        <section class="c-cryptoteacher__reviews c-cryptocourse__reviews">
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
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK