import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    Data
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment } from "@component/element/index.js";
import { BlockError404 } from '@component/blocks/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

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
            Static.activeCategory = "All"
        },

        fn: async () => {

            if (!item._id) { return (<div><BlockError404 /></div>) }

            return (
                <div
                    class={[
                        "c-criptocompany",
                        "c-container",
                        Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                    ]}
                >
                    <h2 class="c-criptocompany__title">Название компании</h2>
                    <figure class="c-criptocompany__wrapperimg">
                        <img class="c-criptocompany__logo" src="https://yt3.googleusercontent.com/8HmH6WuhicmT878ZRlUUW6QUJbudwtVAAbmABTmiQGLp58ebjHmf4tIeXTQ4XC_W1K4kAzx8pNw=s900-c-k-c0x00ffffff-no-rj" width="300" height="300" />
                    </figure>
                    <a class="c-criptocompany__btn c-button c-button--gradient2" href="">
                        <span class="c-button__text">Сайт</span>
                    </a>
                    <blockquote class="c-criptocompany__slogan">&#8220;Слоган компании в пару строк или больше&#8221;</blockquote>
                    <p class="c-criptocompany__shortdesc">
                        Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                        Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
                    </p>
                    <figure class="c-criptocompany__cover">
                        <img class="" src="https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2%D0%BE%D0%B9-%D0%B3%D1%80%D0%B0%D0%B4%D0%B8%D0%B5%D0%BD%D1%82-%D0%B3%D1%80%D0%B0%D0%B4%D0%B8%D0%B5%D0%BD%D1%82%D0%B0-%D1%81-%D1%8D%D1%84%D1%84%D0%B5%D0%BA%D1%82%D0%BE%D0%BC-%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-231031876.jpg" width="100%" height="150" />
                    </figure>

                    <section class="c-criptocompany__about">
                        <h5>О компании</h5>
                        <p>
                            Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                            <br />
                            Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
                        </p>
                    </section>

                    <div class="c-criptocompany__authors swiper-container">
                        <div class="swiper swiper-post_authors" After={() => swiperGo()}>
                            <div class="swiper-wrapper">
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <figure class="c-criptocompany__sliderwrap">
                                            <img src={images["university/teacher1"]} />
                                            <figcaption class="c-criptocompany__slidertitle">Иванов Иван Иванович</figcaption>
                                        </figure>
                                    </div>
                                </a>
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <figure class="c-criptocompany__sliderwrap">
                                            <img src={images["university/teacher2"]} />
                                            <figcaption class="c-criptocompany__slidertitle">Алексеева Ксения Александровна</figcaption>
                                        </figure>
                                    </div>
                                </a>
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <figure class="c-criptocompany__sliderwrap">
                                            <img src={images["university/teacher3"]} />
                                            <figcaption class="c-criptocompany__slidertitle">Крылов Петр Ильич</figcaption>
                                        </figure>
                                    </div>
                                </a>
                                <a class="swiper-slide">
                                    <div class="swiper-post_media_image_container">
                                        <figure class="c-criptocompany__sliderwrap">
                                            <img src={images["university/teacher4"]} />
                                            <figcaption class="c-criptocompany__slidertitle">Мальцева Надежда Николаевна</figcaption>
                                        </figure>
                                    </div>
                                </a>
                            </div>
                            <div class="swiper-pagination swiper-pagination-post_media"></div>
                            <div class="swiper-scrollbar-post_media"></div>
                        </div>
                    </div>

                    <section class="c-criptocompany__courses">
                        <h5>Курсы</h5>

                        <div class="tags tags--static c-criptocompany__tags">
                            <Tags
                                Static={Static}
                                text={Variable.lang.categoryName.all}
                                classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                type="All"
                            />
                            {/* {() => {
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
                            }} */}
                        </div>

                        <ul class="c-criptocompany__list">
                            <li class="">
                                <a href="#" class="c-criptocompany__course">
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
                                    <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
                                    <footer class="c-criptocompany__footer">
                                        <time class="c-criptocompany__time" datetime="">22.02.2023</time>
                                        <span class="c-criptocompany__hourse">22 ч</span>
                                    </footer>
                                    <div class="c-criptocompany__stiker">
                                        <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                    </div>
                                </a>
                            </li>
                            <li class="">
                                <a href="#" class="c-criptocompany__course">
                                    <span class="c-criptocompany__coursedesc">Курс по NFT-технологии. Вводный</span>
                                    <footer class="c-criptocompany__footer">
                                        <time class="c-criptocompany__time" datetime="">22.02.2023</time>
                                        <span class="c-criptocompany__hourse">22 ч</span>
                                    </footer>
                                    <div class="c-criptocompany__stiker">
                                        <img src="http://agusha.pro.pichesky.ru/images/header/bg-action.png" />
                                    </div>
                                </a>
                            </li>
                            <li class="">
                                <a href="#" class="c-criptocompany__course">
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
                        </ul>
                    </section>
                </div>
            )
        },
    })
    return
};

export default start;