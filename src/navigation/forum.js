import {
    jsx,
    jsxFrag,
    sendApi,
    Variable,
    init,
    initReload,
    Helpers
} from "@betarost/cemjs";


import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import { fn } from "@src/functions/index.js";




import 'swiper/css/bundle';


const start = function (data, ID) {
    let showAllCompanies = false

    const swiperGo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem1 = new Swiper(".swiper-post_media", {
            effect: "cube",
            grabCursor: true,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
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
        // }
    }

    const swiperTwo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem2 = new Swiper(".swiper-two", {
            effect: "creative",
            grabCursor: true,
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-two',
            },
            scrollbar: {
                el: '.swiper-scrollbar-two',
            },
            slidesPerView: 1,
            spaceBetween: 20
        });
        // }
    }

    const ShowAllCompany = function () {
        showAllCompanies = true
        initReload()
    }

    init(
        async () => {

        },
        () => {
            return (
                <div class='c-main__body'>
                    <div class="page-content page-content--full">
                        <div style="max-width: 1280px; margin: 0 auto; padding: 0 20px; margin-top: 30px">
                            <img style="border-radius: 4px; width: 100%" src={images['forum/forum_banner']} />
                            <div class="swiper-container">
                                <div class="swiper swiper-post_media" After={() => swiperGo()}>
                                    <div class="swiper-wrapper">
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_1']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_2']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_3']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_4']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_5']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_6']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_7']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_8']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_9']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_10']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_11']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_12']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_13']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_14']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_15']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_16']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_17']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_18']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_19']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_20']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_21']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_22']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_23']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_24']} />
                                            </div>
                                        </a>
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img style="height: 400px; border-radius: 4px" src={images['forum/forum_25']} />
                                            </div>
                                        </a>
                                    </div>
                                    <div class="swiper-pagination swiper-pagination-post_media"></div>
                                    <div class="swiper-scrollbar-post_media"></div>
                                </div>
                            </div>
                            <div>
                                <h4 style="text-align: center">Краснодарский край г. Новороссийск ул. Адмирала Серебрякова 27а ТЦ «Черноморский»</h4>
                                <h4 style="text-align: center;">Организатор – CRYPTO EMERGENCY</h4>
                                <h4 style="text-align: center; margin-bottom: 50px">Соорганизатор – CRYPTO HOLDING</h4>
                                <div class="video-container-forum"><iframe src="https://www.youtube.com/embed/e-LBppoZXJs" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>
                                <p style="font-size: 18px;">
                                    Первый ежегодный криптовалютный форум пройдет в центре Новороссийска прямо на берегу прекрасного черного моря.
                                </p>
                                <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
                                    <div style="font-size: 18px;">
                                        <p style="align-items: center;">
                                            Будут подняты такие темы как:
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Новички в крипто индустрии
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Будущее криптовалюты в России
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> NFT технология и тренды ее развития
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Майнинг оборудование и способ добычи криптовалюты
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Что такое технология блокчейн и где используется
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Стартапы со всей России представят свои проекты
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Будут подведены итоги <a style="padding-left: 6px;     text-decoration: none;background: linear-gradient(160deg, #C126CE 42.19%, #284CCB 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 600;" href="/lottery/" onclick={async (e) => {fn.siteLink(e)}}>  лотереи "Сарафанное радио"</a> 
                                        </p>
                                    </div>
                                    <div style="font-size: 18px;">
                                        <p>
                                            На форуме будет представлено:
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> 25+ проектов
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> 500+ участников
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> 15+ спикеров
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Большое количество конкурсов с ценными призами
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Крупные сми
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Фотозона
                                        </p>
                                        <p style="display: flex; align-items: center;">
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Фуршет, шампанское
                                        </p>
                                    </div>
                                </div>
                                <div style="margin: 35px 0" class="swiper-container">
                                    <div class="swiper swiper-two" After={() => swiperTwo()}>
                                        <div class="swiper-wrapper">
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_1']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_2']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_3']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_4']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_5']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_6']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_7']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_8']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 400px; border-radius: 4px" src={images['forum/forum_holl_9']} />
                                                </div>
                                            </a>
                                        </div>
                                        <div class="swiper-pagination swiper-pagination-two"></div>
                                        <div class="swiper-scrollbar-two"></div>
                                    </div>
                                </div>
                                <div style="font-size: 18px; margin-top: 10px">
                                    <p>
                                        Отличная локация в центре города:
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> 800кв метров;
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> в двух шагах до черного моря и прекрасный парк;
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Новая современная набережная с большим количеством кафе, ресторанов и отелей;
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Билет для посетителей включает не только пропуск на форум, но и большой список привилегий в лучших ресторанах и отелях г. Новороссийск.
                                    </p>
                                </div>
                                <div class="forum_button_container">
                                    <div class="forum_button">
                                        <a target="_blank" href="https://t.me/cryptoemergencychat" rel="nofollow nooopener" style="display: flex; align-items: center; color: inherit; text-decoration: none;">
                                            <img style="margin-right: 5px" src={svg['telegram_icon']} /> <span style="font-size: 18px; font-weight: 500">Присоединиться в телеграм</span>
                                        </a>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: center; margin-top: 20px">
                                    <span style="text-decoration: none;background: linear-gradient(160deg, #C126CE 42.19%, #284CCB 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 700; font-size: 36px">
                                        2990 ₽
                                    </span>
                                </div>
                                <a style="margin: 40px auto; margin-top: 20px" class="с-preview__part tiwo_ticketseller" data-event_id="3527" onclick={() => { return false }}>
                                    <span>Купить билет</span>
                                </a>
                                <div style="font-size: 18px; max-width: 500px; margin: 0 auto;margin-top: 10px">
                                    <p>
                                        Билет предоставляет ряд привлекательных предложений:
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 16 - 17 декабря посещение Форума Crypto ЮГ 2022
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 Шампанское и вкусные закуски
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 Проживание в отелях: 
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Hilton – скидка 30% на проживание
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Капитал - скидка 10% на проживание
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Гостиница Новороссийск - скидка 10% на проживание
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 Кафе и рестораны:
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Абрау Дюрсо - 10% на все меню
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Вижу море - 10% на все меню
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> BARY – бесплатный кофе и вкусный комплимент.
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 Доступ к онлайн трансляции форума и записи.
                                    </p>
                                    <p style="display: flex; align-items: center;">
                                        🔥 По завершении форума, 17 декабря, пройдёт After party.
                                    </p>
                                    <p>
                                        <span style="min-height: 8px; min-width: 8px; height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Билет даст Вам возможность бесплатного входа в лучший, новый клуб города Новороссийска «Философ»
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 style="text-align: center; margin: 25px 0;">Стенды</h4>
                                <p>
                                    Форум "Crypto ЮГ 2022" -  это отличное место для презентации своей компании и демонстрации своего проекта на берегу черного моря в отличной локации.
                                </p>
                                <p>
                                    Воспользуйтесь данной возможностью, привлеките будущих клиентов и партнеров к своему проекту.
                                </p>
                                <p>
                                    Как это сделать? Напишите нам и мы вам поможем!
                                </p>

                                <img class="forum_plan" src={images['forum/forum_plan']} />
                                <a
                                    style="margin: 50px auto"
                                    class="с-preview__part"
                                    onclick={(e) => {
                                        Variable.SetModals({ name: "ModalForumMessage", data: {} })
                                        e.stopPropagation();
                                    }}
                                >
                                    <span>Купить стенд</span>
                                </a>
                            </div>
                            <div style="margin-bottom: 40px">
                                <h4 style="text-align: center; margin-bottom: 40px">Генеральный спонсор</h4>
                                <a target="_blank" rel="nofollow nooopener" href="https://blockchain24.pro" class="general_sponsor_banner">
                                    <div style="background: #232733; border-radius: 6px; padding: 20px 40px">
                                        <img style="width: 100%" src={images['forum/blockchain24']} />
                                    </div>
                                </a>
                            </div>
                            <div>
                                <h4 style="text-align: center; margin-bottom: 40px">Компании</h4>
                                <div class="company_block">
                                    <a target="_blank" rel="nofollow nooopener" href="https://metis.io" class="company_item">
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_1']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Metis – это Ethereum Layer 2 – платформа, подходящая любому пользователю.</p>
                                            <p>Самый дешевый и быстрый Layer 2-блокчейн в мире с уникальными продуктами в собственной экосистеме.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://cryptoholding.ru" class="company_item">
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_2']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Crypto Holding - многопрофильный холдинг, работающий в сфере блокчейн-технологий и криптовалют. Компания создана в 2022 году после объеднения ряда игроков рынка под единым брендом.</p>
                                            <p>Главная миссия компании - выполнять функции точки входа в крипторынок новых предпринимателей и бизнесменов.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://bonus-group.ru" class="company_item">
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_3']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Специалисты Группы компаний «БОНУС» представляют права и защищают интересы клиентов на всей территории Российской Федерации, а в случае необходимости, и за ее пределами.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://ttmboard.com" class="company_item">
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_4']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Настольная игра TTM Board Game - это инновационный офлайн-тренажер для того, чтобы развивать навыки в работе с криптовалютой, потренироваться в реализации собственных инвестстратегий и овладеть навыками финансовой грамотности без ненужного риска и финансовых потерь.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://ttm.academy" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_5']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">TTM Academy – одна из крупнейших Edtech-платформ с тренингами и вебинарами по трейдингу и инвестициям, цифровым активам и технологии блокчейн, DeFi и торговым стратегиям.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://crypto.ru" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_6']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Crypto.ru — крупнейший информационный ресурс в Рунете о криптовалютах и блокчейне. Сайт предоставляет актуальный курсы монет, мониторинг обменников, рейтинг бирж и кошельков.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://carding.pro" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_7']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Канал «Люди PRO» показывает жизнь и работу людей, являющихся профессионалами в своей сфере. Неважно, кто ты: хакер, маркетолог, писатель, владелец небольшого кафе или нескольких заводов – если вы специалист в своем деле, мы идём к вам! Здесь нет случайных гостей, строгий отбор гарантирует получение качественной и интересной информации.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://blockchain24.pro" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_8']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Blockchain24.pro - Ведущий русскоязычный портал о криптовалютах и технологии blockchain. В основе нашей концепции - информационный портал, плюс тематические сервисы. Мы стремимся предоставить участникам отрасли максимально объективную информацию, проверенную и адаптированную для широкого круга читателей.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://ti.turovinvest.ru/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_9']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">«Туров Инвест» — команда криптоэнтузиастов. Объединив самых успешных участников крипторынка, мы помогаем людям повышать финансовую грамотность в области криптовалюты и инвестиций.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://cryptonews.net/ru/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_10']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Crypto News — это сервис для криптоэнтузиастов, сделанный криптоэнтузиастами. Мы постарались сделать максимально полезную цифровую платформу для всех, кто хочет быть в курсе событий на крипторынке и стремится на этом зарабатывать.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://digitalfutureclub.ru" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_11']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Академия криптовалют «Digital Future” Обучают людей базовым знаниям для работы с криптовалютой</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="http://www.onestopmining.com" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_12']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Onestopmining – международная компания, которая специализируется на комплексных решениях для майнинга.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://cripta.games" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_13']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Настольная игра "КРИПТА. Начало" - битва криптотрейдеров, стань лучшим за игровым столом! Два в одном - азартная настолка и обучающий тренажёр, поможет разобраться в мире криптовалют и трейдинга.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://voltep.online" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_14']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Современная ИТ-компания, специализирующаяся на создании инновационных решений. В настоящий момент продвигает собственную платформу для создания виртуальных миров - voltep.online</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://cryptometa.media" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_15']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Это закрытый клуб венчурных инвесторов в веб3 стартапы. С нами можно инвестировать на ранних стадиях в отборные проекты, которые мы отсеяли от множества других.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://t.me/unionclub_invest" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_16']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Клуб инвесторов «UnionClub» - это сообщество экологичных инвесторов, которые всегда готовы помочь друг другу в вопросе инвестиций.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://racib.com" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_17']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">РОССИЙСКАЯ АССОЦИАЦИЯ КРИПТОЭКОНОМИКИ, ИСКУССТВЕННОГО ИНТЕЛЛЕКТА И БЛОКЧЕЙНА.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://www.artemotiochain.ru/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_18']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Образовательная платформа, где участники могут изучать NFT, современное искусство, живопись, технологию токенизации своих навыков и услуг с целью создавать и получать за своё творчество вознаграждение.</p>
                                        </div>
                                    </a>
                                </div>
                                <a
                                    style={showAllCompanies ? 'margin: 40px auto; display: none' : 'margin: 40px auto;'}
                                    class="с-preview__part"
                                    onclick={ShowAllCompany}>
                                    <span>Показать всех</span>
                                </a>
                            </div>
                            <div>
                                <h4 style="text-align: center; margin-bottom: 40px">Спикеры форума</h4>
                                <div class="speakers_block">
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_1']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Ян Кривоносов</p>
                                            <p>CEO проекта Crypto Emergency</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_2']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Дмитрий Белов</p>
                                            <p>Управляющий директор проекта Crypto Emergency</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_14']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Игорь Еньшин</p>
                                            <p>Руководитель IT-направления компании Crypto Emergency</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_7']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Алексей Зюзин</p>
                                            <p>CEO Crypto Holding, IT-эксперт, инвестор</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_12']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Сергей Павлович</p>
                                            <p>Автор и ведущий канала Люди PRO, владелец бизнесов в IT, e-commerce и медиа, инвестор</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_15']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Кожухов Ярослав</p>
                                            <p>Community Manager и Ambassador Lead в Metis</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_16']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Владимир Бочаров</p>
                                            <p>Tech Community and Integration Associate в Metis</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_21']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Андрей Тугарин</p>
                                            <p>Управляющий партнер GMT Legal</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_3']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Валерий Осипов</p>
                                            <p>Основатель ArtEmotioChain (Проект learn2earn в сфере NFT)</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_4']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Ренат Калинченко</p>
                                            <p>Криптоэнтузиаст, руководитель компании TUROV •INVEST</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_6']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Лев Пониманский</p>
                                            <p>Профессионал в области криптовалюты и майнинга</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_8']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Mr. Sailer</p>
                                            <p>Автор канала Мистер Сайлер</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_5']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Руслан Захаркин</p>
                                            <p>крипто блогер</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_9']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Василий Подзоров</p>
                                            <p>Руководитель TTM Board Game</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_10']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Игорь Ильин</p>
                                            <p>CEO CryptoMetaDao</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_11']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Вероника Близнец</p>
                                            <p>Адвокат, юрист-международник</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_13']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Евгений Царицанский</p>
                                            <p>Криптоэксперт, основатель академии криптовалют.</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_17']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Cici Shu</p>
                                            <p>Региональный директор Onestopmining</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_18']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Иван Теплов</p>
                                            <p>CEO / Founder проекта voltep.online</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_19']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Александр Изюрьев</p>
                                            <p>Сооснователь клуба инвесторов «UnionClub». Криптоинвестор. Игропрактик.</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_20']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Козлов Денис</p>
                                            <p>Трейдер и эксперт по личным финансам. Сооснователь Клуба инвесторов «UnionClub». Криптоинвестор.</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_22']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Виктор Пуляев</p>
                                            <p>Директор по развитию blockchain24.pro</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_23']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Владимир Туров</p>
                                            <p>Учредитель TUROV •INVEST</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_24']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Овчинников Артём</p>
                                            <p>Идеолог акселератора для web 3 проектов Фрактал</p>
                                        </div>
                                    </div>
                                    <div class="speaker_item speaker_item_example" style="text-align: center">
                                        <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 4px; display: flex; width: 158px; margin: 0 auto">
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_soon']} />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    style="margin: 40px auto"
                                    class="с-preview__part"
                                    onclick={(e) => {
                                        Variable.SetModals({ name: "ModalForumMessage", data: {} })
                                        e.stopPropagation();
                                    }}
                                >
                                    <span>Стать спикером</span>
                                </a>
                            </div>
                            <div>
                                <h4 style="text-align: center; margin-bottom: 40px">Партнеры</h4>
                                <div data-mainpage="true" class="c-infopartners__list partners_container">
                                    <a
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://cryptoholding.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_1"]} />
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="http://тц-черноморский.рф"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_7"]} />
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="http://crypto.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_8"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://carding.pro"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_9"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://blockchain24.pro"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_10"]} />
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://www.instagram.com/abrau1870/"
                                        class="c-infopartners__item"
                                        style="background: #383637"
                                    >
                                        <img src={images["forum/partner_2"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://www.instagram.com/barycoffee.nvr/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_3"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="http://hotel-capital.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_4"]} />
                                    </a>
                                    <a style="display: block!important; background: #FFFFFF"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://seeyour.info/vizhu.more.rest"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_5"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://hginov.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_6"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://ti.turovinvest.ru/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_11"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://cryptonews.net/ru/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_12"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://digitalfutureclub.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_13"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="http://www.onestopmining.com"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_14"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://cripta.games"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_15"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://voltep.online"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_16"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://cryptometa.media"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_17"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://t.me/unionclub_invest"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_18"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://hotel-novoros.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_19"]} />
                                    </a>
                                    <a style="display: block!important; background: #FFFFFF"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_20"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://racib.com"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_21"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://www.artemotiochain.ru/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_22"]} />
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script>
                </div>
            )
        }, ID
    )
}

export default start;
