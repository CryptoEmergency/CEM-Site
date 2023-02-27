import {
    jsx,
    jsxFrag,
    sendApi,
    Variable,
    init,
    initReload,
    Helpers
} from "@betarost/cemserver/cem.js";


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
                            {/* <div>
                                <h2 style="text-align: center; font-weight: 700; margin-bottom: 20px">Фотоотчёт Crypto ЮГ 2022</h2>
                                <div class="forum_end_photos">
                                    <img src={images['forum/forum_end/forum_end_1']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_1'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_2']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_2'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_3']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_3'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_4']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_4'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_5']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_5'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_6']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_6'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_7']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_7'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_8']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_8'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_9']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_9'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_10']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_10'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_11']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_11'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_12']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_12'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_13']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_13'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_14']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_14'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_15']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_15'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                    <img src={images['forum/forum_end/forum_end_16']} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        fn.modals.ModalViewPhoto({
                                        path: images['forum/forum_end/forum_end_16'],
                                        fullPath: true
                                        });
                                    }}
                                    />
                                </div>
                                <a target="_blank" class="all_photo_button_container" rel="nofollow noopener" href="https://disk.yandex.ru/d/olZACsw71YjlNQ">
                                    <div class="all_photo_button">Смотреть все фото</div>
                                </a>
                            </div> */}
                            {/* <img style="border-radius: 4px; width: 100%" src={images['forum/forum_banner']} />
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
                            <div class="video-container-forum">

                                <iframe width="1280" height="720" src="https://www.youtube.com/embed/1wvHegEMrEU" title="Crypto ЮГ 2022 (Выступления спикеров)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

                            <div>
                                <h2 style="text-align: center; font-weight: 700; margin-bottom: 20px">Мероприятие закончилось</h2>
                                <h4 style="text-align: center">Краснодарский край г. Новороссийск ул. Адмирала Серебрякова 27а ТЦ «Черноморский»</h4>
                                <h4 style="text-align: center;">Организатор – CRYPTO EMERGENCY</h4>
                                <h4 style="text-align: center; margin-bottom: 20px">Соорганизатор – CRYPTO HOLDING</h4>
                                <img style="width: 150px; margin: 0 auto; text-align: center; display: block;  margin-bottom: 30px" src={images['forum/eighteen']} />
                                <h2 style="text-align: center; margin-bottom: 30px; font-weight: 800">C 10:00 до 18:00</h2>
                                <div class="forum_timesheet">
                                    <img src={images['forum/forum_timesheet_16']} />
                                    <img src={images['forum/forum_timesheet_17']} />
                                </div>
                                <div class="video-container-forum">
                                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/GQiMrMWivWY" title="Crypto ЮГ 2022 (Зал)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                                <p style="font-size: 18px;">
                                    Первый ежегодный криптовалютный форум прошёл в центре Новороссийска прямо на берегу прекрасного черного моря.
                                </p>
                                <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
                                    <div style="font-size: 18px;">
                                        <p style="align-items: center;">
                                            Были подняты такие темы, как:
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
                                            <span style="height: 8px; width: 8px; border-radius: 50%; background: linear-gradient(115.23deg, rgba(193, 38, 206, 0.7) 15.28%, rgba(40, 76, 203, 0.7) 97.16%); display: inline-block; margin-right: 10px"></span> Будут подведены итоги <a style="padding-left: 6px;     text-decoration: none;background: linear-gradient(160deg, #C126CE 42.19%, #284CCB 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 600;" href="/lottery/" onclick={async (e) => { fn.siteLink(e) }}>  лотереи "Сарафанное радио"</a>
                                        </p>
                                    </div>
                                    <div style="font-size: 18px;">
                                        <p>
                                            На форуме были представлены:
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
                                <div style="margin: 35px 0" class="swiper-container"> */}
                            {/*} <div class="swiper swiper-two" After={() => swiperTwo()}>
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
                            </div> */}
                            <div>
                                {/* <h4 style="text-align: center; margin: 25px 0;">Стенды</h4> */}
                                {/* <p>
                                    Форум "Crypto ЮГ 2022" -  это отличное место для презентации своей компании и демонстрации своего проекта на берегу черного моря в отличной локации.
                                </p>
                                <p>
                                    Воспользуйтесь данной возможностью, привлеките будущих клиентов и партнеров к своему проекту.
                                </p>
                                <p>
                                    Как это сделать? Напишите нам и мы вам поможем!
                                </p> */}

                                <section class="c-eventmap c-container">
                                    <h4 class="c-eventmap__title">Стенды</h4>
                                    <div class="c-eventmap__wrapper">
                                        {/** Фоновая карта */}
                                        <img class="c-eventmap__imagebg" src={images['forum/forum_plan']} />

                                        {/** Спецификация */}
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--general">Генеральный спонсор</h5>
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--scene">Сцена</h5>
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--buffet">Cofee-break</h5>
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--photozone">Фотозона</h5>
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--freestands">Свободные стенды</h5>
                                        <h5 class="c-eventmap__highlight c-eventmap__highlight--reservedstands">Зарезервированные стенды</h5>

                                        {/** "VIP-зоны" */}
                                        <div data-zone="general" class="c-eventmap__zone c-eventmap__zone--23">
                                            <span class="c-eventmap__titlezone">23</span>
                                            <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                                <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                                    <img class="" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" width="" height="" />
                                                    <span class="">google.com</span>
                                                </a>
                                                <span class="">Google — корпорация, инвестирующая в интернет-поиск, облачные вычисления и рекламные технологии.</span>
                                            </div>
                                        </div>

                                        {/** Стенды */}
                                        <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--31"></div>
                                        <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--30"></div>
                                        <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--29"></div>
                                        <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--28"></div>
                                        {/* <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--27"></div>
                                        <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--26"></div> */}

                                        {/** тематические зоны */}
                                        <div data-zone="scene" class="c-eventmap__area c-eventmap__area--scene"></div>
                                        <div data-zone="buffet" class="c-eventmap__area c-eventmap__area--buffet"></div>
                                        <div data-zone="photozone" class="c-eventmap__area c-eventmap__area--photozone"></div>

                                        {/** попапы тематических зон */}
                                        <div class="c-eventmap__areapopup c-eventmap__areapopup--scene">
                                            <header class="c-eventmap__areatitle">
                                                <h5>Сцена</h5>
                                            </header>
                                            <figure class="c-eventmap__areaphoto">
                                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQVFBgUFRUYGBgaGBgbGBsaGBoYGxkYGBoZGhgYGBobIC0kGx0pIBgYJTclKS4yNDQ0GiM5PzkxPi0yNDABCwsLEA8QHRISHjIpIykyMjIyMjIyMjIyMjIyMjUyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABHEAACAQIDBAcFBQYDBQkAAAABAhEAAwQSIQUxQVEGEyJhcYHwMpGhscEHFCNC0VJicpLh8SSCoiUzQ2OyFRZEU2Rzo8LS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEAAgICAgEDBAIDAAAAAAAAAAECEQMhEjFBBFGBIjJxkRPhQlKx/9oADAMBAAIRAxEAPwDjtCgBR1dCBR0QpQq4qyWAqYmDExMaTynnSS1avpbtfDNbTC4VPw7bZs/FmIIMc9+pO8jTQa5KnkSTpMUG2raoFACjA0PqaIVmWGwqdsrZt7E3BZspndpKrKrIUSdWIHDdx3CoNTcFda2Q6kqw1BGhFNbYnpEe5aZWKMpVlJDAggqQYIYHUEERFOo0UV68zszuxZmJLMTJJO8k86TNNKhN2BzTLClM9JpSY0gTQoqOpGChS0tE79Pn7qfVANw8+NUoNickhlLR46fP+lOqoG6lRQVZrSMEiHIKKXbtM05VJgEmATCjexjcBzq9w+zbVu2jXUu3LlxS6W7ZChUBdVa4crM+ZkbsrlIUTmkgDSnalnC3Ll82rbZ7WFs27NvJbUW7thMRiMwCklGZ1EnU5yM2lU1QFDgOiguWhcN9M72XuooIVFCPbVxduOQEYZzKgH2d86Vb9B1GCx11L1y0pGFcBzcItkutq5bIcQSGBU6a686p26QdXFvDoMiDEIhuqrlrd90cB0MrmXIP2gZqixWKe67XLjFnYksx1JJ9buFAG72x04W2977jmVruJN17jIDIFtEAQPJUFg7awQHgVjttbcvYq5nuuCRmyhVCKudi7BVUaSxJJ3niTVcxpBNKgAxpJNETRGkME0VHSaQAoUKEUAFQNHFCKQxNClUKChFChQJpIRYWdk3WsPiAv4aFQzHSSzBYXnBImq4mrB9rXWsLhs34aszBRpJJmW5xwqvinKtUJXuwAURoUdQUEKUopSLxO6lLFVGJLYFQUdzdRk02zTTlSVCVsJaNjRRxoqgoFCpWGwDvrELzP0HGrOxgUThJ5n6cqqOOUtkymkVNrCMdToO/f7qcW2F8fjVg6QYpD4ckSBWyxpEPIyJFGEJ3VIW0PGnIrRQ9yeQytjnTirFKiks4FUkkTbZZnbl0WhbGQZUZA+RetFtixa2LkZgnbbdrDETBiqVj69f0pT3eQpkms5Vei0GzUgmjojU0MSaI0s0WWgBBFFTpt0Mvr+9QyhmKBWnI9f3oiPX96QxMUUUuPX9TQA9f3oARFCPW+lEet9Aj1/akA3FClUKBjMUCKKaE1FooNaDUVGopregABNOoIpANKFyqjSIdsUy00KUxogKJbYLQDQpaWi24foPE1o9m9GHID3Qyrmylcs3NcoGS0SGeWdFB0E3F13kVHG2EpJGdt2WbcPPhU2zhFG/tH4e6tHtfZ1q0qIi9sNczNmJ6y2GC27hX2UDFbhVR+XKSWkGoXUquk6zqT38h3R8RpXbi9Kq5M5cmd3SDsr2R4Uvq5p8IMoI5CrXZGxOtDXbj9Vh0PbuHnp2EH5nMjThPHQF5IpBFWrImyth3MQ+W2BCiXdtEReLOeG7dvMeNaHA7HwF8vYtG+zqpP3jL+Hm71B0Q6xIBIB1406YvWuz/AIXZ6HVj7d5hxPF3MbtQI4wBVPd2zfuOmHwKG0gMoqntMR+e83HvnThrpWCsrRmMdhTadkYQVJUjkVMET41Ea5Wn6W4UtizlGY3AjKFlpJGUhY36qTpzo9l9A8ZeAJQWwQCvWHKWBiCq74krrpvFOU6HFWZNnJpurLbWzxZvPaDh8mUZliCSqsYgkaEkeVQRbNTtl9DTUipfVCKbCChprsFsZymjyU8R69frREVIxsr69a0CPXrWnGHr1pRR64fQUgG8vr+2tFHr+2tLJHP6/wBKSW7vXgKVFWIj1u/rRMPW7+tGSaIrSoLEmPX9aKfW+lxRZamhiDRUsrRRQAiKFKihQBGo6KhWRYdAUKUBVpCYKMCnLNotoBNaDD9FcQQrG08NJEjKoAAbM7NAVYYdowDryreGJsylkjHsz9uyzGAJq2wOxWZiG0Ko7kGQMqIX8TIAjxFb7C9FcNYzjEOModGUkFFyq1xShaZZiAJCxBC6nWnGx+fImFsB0RGTNcWLZDKEMyQW0UAg66ARXTDAvz/w55ZnLSImK6J2kso63Sjh0GYjsqzXckvHZQKomZ3zJp87SBuEpbbEXBb6mM5Ki2GdkdroOYvqkt2e0jENqpDg2MbjZ8RcLtvyr2UBkncInVm5bzVvZsqi5UUKo4AAD4V0fwrzsIxlW9GXxGz8XeuLbOQZLYbeqpbQdgZ3O/S2oLEkmAJNI2nsrCYe0Sz3L11wwRlGSyp0ysucB7gj8yyvwodJsRcTFJ1ZIbImWNTJZ4gc9dO+oWJ6PYvqnxV4ZFABJuuA7yQsBSc06j2oq2qq5UvYza26VjVv2FH7o+Va57eGGEwl2+7MiJcCYddOsvC42d2adF1E90c4ORsjsr/CPlV1d7eAUcbWJPkl1P8A9rXNlTbX5LhJ9Ey/sjHY5kdlREKA2lzBbdtDogVVkgmOUmOAGki3sexhrThr5uPmsreW0JItsxzopVp1AkkxI3RvqKmC2jdtIgVmtlUyQUHYVWCA5TMQzaN+1PEVPwvRxMNBv4tbTMCIQK2gZRJzb4zEwF/K2o1rmk67fwjVJ+37HcT0kXD2EOGwy22BRVNwH2ULEFlzFpPZgFjGupgVkNtbZxl+3F247pmE9kKsgdlTlABgGYPOa1KbTwVm2ma0964SruzGJZIIIDTkBI3AbpG7SqLb+3mxIW31aW7aHsIokjSBmY+1AMbhoBTglfXyxSbq7+DImiinb1vK3ypkvWraQLYZpmKMufXr6UwWJrObT6Ljocciks49aU3FHFRRVgZzSTSwtKCUANhaMJTypS0t0gI+SgbdSxYPKlfdz3VLZRB6uklKsBhx60ojaHL61NjK4rQ6s8qsCnrdTZT1qaQELq6FS8nqBQoAp6AoqMVmixQpSiiWloK2ijNsuNnWhkBOg1n3n9K6/g8DjsQoW1aXD2isZ76guVIgxZGnL2t8TOprnewLOD+7lrxuXLpDKlpTkQE6KzOJJMkHgOGsRXogaacq6M2Zwikl8s54YlObbZj7nQzD27bXLubE3QujXTmAJgdlPZA8ZPfVYiA+yRA5cP04VvcbbzIV5lZ8AwJ+ANV+I2fbYlmUWwMseyoOpZpjjGlZ4fUtXezaWJLoyqYVnMIpY8gJq0s9H7mUlyFgEwO008oBge+rNto2UZltqSdB2FBDAA+W8nWDUHG7SugkFMhMxIlgpJ0E7uOsVq82SbqKr8j0uzne0tr3MNimZOKICRlDiMxGRmVgura9mdNIMEZza21XvsM4URMas7QeBe4zOR3THICtRjUwxxlz7wrNC2yih1toYAZhcY6gRAAUE9o1W7d2zbNn7vh7dhUZVDlLbZiUKsD1rwzyV4rw3mTHoatVHerfg4m7b3r2GktjIABwHyqfsw5rWIt87a3B42nB+TGomeANOA+VKweJNpw4AOhBB3FWEEGuZp2OMi4wz7TKIidaqFVCFRlGULlBLgSJC89Y0p670buWrb3S6FwGdszdqAVDxPZzdsb2kml2NrbQfq7eHQorDLbhBBCgLIdxwyiSIGg7qgv0bxt1i13TQnNdfgok5RqxAHIaaCudve2kbN2tJssRY2VZM3bzYhpMhSSDDCPZ0GmYe2Qd40OlF0i23YeyLOHtdV21LHKgJVUiCy6sCxLa6gjfEAScFsW0l65bxVxAyBwUzlNQoKOHIyGSQAszJEiARTlm3su2iM/WXnyoXUKcoaEZlElQwlHXwuc1qKSfljTv2RkMNsy7dDG3bd8glyilsoMwWgabj7jyqXj+jF2zaa7ca2AGVMqvnLMxcEAoCgym3cBBIIKEcpubO3xauXnw1jJ1hVkzERadVuJmRVABGW6YBmCJ13VXbW2pevKVYIiSGNu2oVAym42bWSCTduE665u4Q5KT8DTS0Zsp69fpUbLVp1dI6gcqVNdl9leEpxbJ5VOFulhKmx0Qlwxp5MMKk5aUq1LbHQylkcqeFulqKWFqRjRt0RSn8tFlpAR8lIKVKy0krQBFNumylS2FNNFAEfq6FPTQoAy9GKTShURKYpadQU0tOoa2gZyN/wBFxgglpXS4+Ie4qAFsqIWcBHUKJaARox3zpXe64j0Pu4PNhrYss99rlqXZjlUi4jSqiBuHf8a7dT9W/qS38k+n8kTaV4oqkby6gDmTPZHjWex+OtpiAl5WbOqsi7gM06MQd8ht3dVN042m/XQlwqbLLkWFKM5AaWWMzHhoR8ac25h2uCxdCMWRzbuhZbKwYPwk5Qcwk1fpscW0peb/AKHlckrRbHa7AFbaKg7gCT4nj7qhXrjuczkseZ5UbJ86BFdEYxjtIi2zE7T2PcxGKvMrW0RCgZ7jhFWUTeT5nyPKq/a2x8Nas5/vXWXWClFRG6s6jP8AiahoBmNOE76LpBint4y61tsraAHSRKJuJ3HvGtVmMw+KYdbdW8y6dtw7L2t3bbTXxrtqWrlS1o5NW9b2XRTQeApvqzyqeiwKIpXNN0LHsssDtvEZRbs21DFEViFLs621yiVYlQMo10jeeNRcdicdeBdzdyGAcodbc+z4SSTPMsauMP0ma3bS2ltZVAmd2LEgSY0A7IJ0Wd0gzNV+P6SYi5m1VAwZWCIAMr5cw1kicg4/OuaKbeoo7FVdjS9DsWZLBFgZmzOrHXdOTNvM67tDJEVOs9E7aoly7iURHRWIlVYBgpEZj2oBafARM6UuM2tfuAC5cdgAwGse1vkDfy8ABwqEppTjNrb/AEJqK8GpXAbMQktdLRwlnzHMrA9lFH5XQ8IZW0JgGOkODtENZwnaAUSxVdxQzImWlWhonUeFZuxYzz2lWBMuYE7gO8kmqddqoYDKVM5SJnXd86zuN1JsdScbSJG175uXnuFQud2eBuGYzFQStTrozDd9flUF3NXKhwvyFlpQWmS5osx5motGhIogRzpilAVNgSA4o89MrShSA1/RLZdq4pu3VzCSFUnTTeSOPnUzbWzMOykW7aowHZK6SeAjjVB0exVsTbuLnllKAkwsZpygb2JIEbqssZthGuMiMZAaYEZQNB2eGpHwrlk5czphGLjsycmiIqQ2FdcsqYYBlIEgrJEg8RINNRXQznGytNstPkUhloAYy0Kdy0KAMhShSaMVmi2LFTdnYR7txbdsSzTHLQFmJPAAAknkKPGIFt2wVAYgt35TuLeOundW0+zXY1m4TiBcfrLedCkKABctsmadSQQzxu1Wt19PZDVlv0IxeE67D2UwxXEZlD3GZmIZJZiomFnKREHfXYrrxoCuYg5QTAJA9/urAbI2bhcMyXLdhesRsxdndnZirIxJJgTmJIAA7q0F+4MXbaQbXVgst1W7VtwDDLprpMg6EaHfUZWpNNdE41xVM5p0lt3MWzm2QXt3rlt8xVc4V2TrA3AGNR4gTGup+zbG4kW8RYvsHZXUoc4cnOIaWG8SAZJnU91cr2jint9U6OesZWZ2/ba4QzZhuMnMfd5bz7M+t7FxVZiVuZyR2S2cgSdAICrA7qvHFyUreu18FTkk17m8s7FYzmbLBjcT58NNaXiNlqiMQxZgJjsiN28azUhUxPJRqYJgkSZ036VXYi5cUG2zGBAIG7SNKqLnJ/cidJdGBvbaOGxV6ABLEh1RGuBsqCFLmFECZgkeZqn21t+7iFyF7mTiruhDQZXS3bQCPDlyFXjbMsX79/O9wOtxoS3aZ2KgQGmIUZiBr9ar9v4HCWUyW1xHWEghnKZSonMMqwVO7eK9FcOS1vXg89udPetkmKMrSiKNTHqSeQHM1nMUdMptqPcChrdwMwbtIBKqpnLmMTm015eUmTZbOobmJ99Vm08fmbKA5CnXtAAkERlMHswOETw5l3Z+0We4trq1EqSuUnTLGhBJ+dcOKbUnbPQmk0uJIdINJy61OTCtccJbGZiYiRv7yd3nWt2V0PRO1fYOY0Vc2QHgSRBbw0HjW88kYrbIUXJGAxuNa1quQ7iVeCGGvZjgJ1nuFHb6H43HKbyhFLGczygaIAyQpJEDfEd5rri7KwwdbgtW86CFbIAyryXTTypOJ2stuSVusB/ybhnuByifjXFJ8pORtG4xSMBieh+MtqCUV9NerfNB4wGgnyFZTEpDHSNSCN0Eb5rtNnbKOrMq3OypOU2biFoGgXMmp8JrI9L8Et1FuhR1hbKcqgZ+YIAkkRx10q/5NqLEoeUc8K0QWpd/Cshh1K+KkT4TW32P0EsXbNu4925NxFchcgAzAGBKndMU5fT2C2c+Ao1FdO290awzOhdrxMHc6AFQdF9jdrwis1jVtWG6m1atu752LsGJRAsIAHZ+0WEyIEVLbq6GlZmlFTLGCnVzkG/WMx8uA76jXsbirbKrj2jHYUak6GAPHdVjZ2NjL+RHt3baNvd7bL2J1yAgF3O4LHwk0OSQtsssTgF6jIqvmdTkyIS0IYe7cK6hBBG8EmdRBqow/RtrQW694LZuAOACGDiCVDMrGVgzBiZ41oNobeZbjYezbIt20XrbhI6xwoyqingzQBJ3SWgCad+zw27d8WlYMRZeBnLRDISVUkwN+vlUcm3dFNcVVlYyOWzAPcOgGrEQNwCgQBUXaLcblp0YwAxDKJ8SNa7G1486otvXGGUg91a458pcaIarZygqaQUra4hbbe1bQ9+UA+8a1l9o21W4wUQNIEkxIBiTrVzxOO2ClZAy0KcoVnxHZiqA791FTiRx5VlFWy2OYq5mYmSZjfwgRHlWr+zDGG3jVt8LqOhHCVGdT/oI/wA1ZMP2QK0X2eWi20LED2S7HuAtt9Yq2I61eaGYd5rKbR6cOqPYVAbZLqRmYF1aVMlQCJGm+tRjWjO0SBmMTExJieG6ucbO2vgVVBcwK3HVQWc4p1DMOOQLAmYia6MfFLasxyX4dGPe+zGSeMxwHcO6uq9FxtJsFZFi4lqyshfZUky2YkhGYyS3qK5U6gs2XQAmBMwCSAJ4xprXe+iF9bmzsM621QEEZV3SjOjN4kqWPeTWcZcVdL5KnG/JTnYu1HPaxixPC5cB+FsUxjdg3ASlzGPOn5XYbp/brfJbisl0hufjsO5fkK1j6mbdKl8IyeCL27/ZUbM6MW3uBDiCw7RIFvKTA/aZiB7qZ2zsnB4d2DtehI1zprOu7q++rzo2Zv8A+RvoPrWA6WbfTEXnAkLnOUgiSB2QfA7/ADqZeoyX2CwQ9i8PSDAn87+OZCP+mt5iMNas2VuJbXMMhDMMxk8dePy4V5/uraWR25E8ViY5ZfrXf+krZcOB+8o+B/SsZZZSaTZsscY7SMficDhTvw6+T3V+T1pOj2xMIlhbiYe2GIeSy529ttC7yx3DjWYZquNq7WbDbMRk9tyUSNYJZyxHflDR3xSe9IostnWMDccHqsLnU5oCWhckEHMBEyNDPDSr5sVBOkjnAHz315wxWKJYNJBB38d86HePnVjhtvYkf+JxCiOF64AO8Q2lDjvsR3x8Uh7Mrm4CRm/lHdVftl4tE94rknQjGFtpWJJMm7JYySTaeTJEzPOur7cP4LeK/OpqpIfgzO0cQcoVNM3wp3/tjMEsrbcBRGbKQoygjQ8Zj41AxNwaHjrR9bArolFNpvwJSaTRJx+JY2nWSQUYbzyPD4+Va7ow3+Dsf+2vw0rD3nm2f4T8jWw6HXQ2CsEEEZSJBkaOw+lTnqkKJgenHSy8MU9u22RLbZBAEkiMxJid86chVRs/phcVh1yB/wB4AK3vAg+tarOlDZsZij/6i8Pc7D6VStaYDPByzlzRpmAnLO6Y1qOVKh8bNj0h23buG0bUj2y0iCp7MCd37W6qfDbfvWGzWrjLowImQVbQiDprz+tVCvpvGnKjfdFNPVIKousJtDDuWa7bJdmZoADp2jrlV20jQRqYA1rW9CsVaGNtC3k7auBlABHYZoIgR7O6uYI3fWk6C3wuPwxn85G/9tGX61F2htHfCapukI/DB76tiaqtvf7o9xp4X9aJl0ZZ2rP7WH4k8wPqPpV071R7bvopUswWQRqY3R+tehm+0zh2QpoVG++2/wDzE/mFCuK0bUZQKeVKymNx91bJNkt3e4fpT6bK5n3Ff0prFH/YfJmHKEcD7jXR/sl2Uc9zFMNAvVp4khnPkAo/zGo6bLTjPvX6Vstn7YsWrS27dpwFED/d6k+0T2t5JJ3caicEumK2Wj2QZB4yD5768+43DG3ce23tIzKfFSR9K7om2s2i2mnvZR8pqj6R9H3xDF06q0WAznL1jkjSQ2gEiBu4b6ag2CdHIlOo8a9DfZ8hXZuGgD2Cdf3nduR51zfB9FOrR1zKzMRlZknKBO6GEnXfWq2Ttq9hbVqyTbdQSk5GXKgVmkw54gDzqXjYNo37s3HL5f2rCdIW/Hfy+QqViOmyL7WU/wAK3D8gax21ek6Ndd3JXNlKBVZiVKiCZiDv0PKhRcXsnss7m1hh0uXJ7bW3RP43ygHwAlvLvrnuBu21a4z280W3VOS3GyqHP8KliO/L41bY++LyB2DhyStpQACwLaOF3nQAcPa0mKiY/Ztv8C0mcOVHXCM0NJzOADB7gDuA3GaUmVGi6+y7C27mLdrlpbmW2SgZVZVbOgzQ2kjh4mum9LW/AH8a/JqyPRm7Yw+IvMFZLbJbS3K6wqqGzAaySJJ4nWrDpZ0lwzWlVbgLZ5iGUwFaTqBU+QZUM1O9NLLtszDuoJCPL9wbrFB95A8xVQ20V9Mv61srjLc2Syl1TNZfViNDLQD4kRprrVXTQHGrgzCSSfIEj6mk3LhIAEAAQBv+Jo7l6QBoCOY+tRnflrVNpAkaf7PrLtj7brBCZix3aFGTT+b5V1vbx/w7/wCX/qFc9+y7CAXHucVRR5u36IffW/28f8O/gPmKz/yQMw+Juar40GuU07SabZ61chFkDNvyNaP7M3/2ZY7utH/yufrWSOMtqgzXEHiwFab7L3/2eg/Ze4P9ZP1qcz0ho5v0wt5MbiR/zXb+eH/+1aX7ICnX3ywBPVplneO0Zj4e6sx0zY/fsTOp60x4QMo8hAq9+ya1OKuF1Bi3uIkanfB8KmT+kDdfaNYR9n3iFUMuRgYEwtxJExO6a4S5ruX2gMlvZ98hFkhEECPadFPwJrhjakDnRHoDsH2W4W192JZEZjdcyVUkDIgAmJ7/ADreXGTLAUDdwHA1hfs3wy/dszSczuR2mXQBV0CkDeDWwe2oBjN/MT86mfYDpNV+2RNp/CpxaomPE23H7ppwdSTJZg3asv0wWbaHk8e9T+laW4az/SYTZbuKn/UB9a9PMrgzOH3Ix0UKFCvKOk233/x+NLXHHgDUdHHdTyuK2IHlxTHhU3DXzGtQkYVKtGrUUJl/snFBTLVaYraSlSFB+H61n8LYZt0eZqc+BaJLL5TXVFa6IZDdyTvNOK/rWmikHfUlLa99ZTxtvZSaI721PAHxFISwomUDTu1ZSPDKR8Z3VOKKBuqI71m8LDkiFZ2XYVzc6tjc17ZuFondCuhiBpvNVN3YSZy/WPnJ0YuCRv3ZcvOr5nFNG5WcoNFKuzPv0cD6dYx82PzYigei3YyBzGcNMAnQRFaO01OXhpWfFjsxWN2ALC58r3BOoBgAczl1I37qrzjOs7KdVYQd7do8yxzMTW4e1PEjwYj61DvbItt2mUMe8TRTRRhHAnKWB7xuPnSrN9UJ/DVuAzE6czAI1rZjZ1of8NP5FFH91tj/AIS+79DQ7Az+zuk2JsgizlQMZIC5pI0HtEmrH/vdjHs3OsuAxkEFFEhs08P3RVqmEtnfbHvpw4O3+x9fnU7Foxn/AG3cO8T4Fh9aWt93/wCCx8z9RWuFi36EfKlLZThlHwNFsNGYTCO8ZkII0Go9kE5R7q2XRXbpwlk2eqLy5ZYYD2goyxG+R8ajphvdxO+Bzona5abPZOHvOvs/iAZW4MEYqSR3jh50N2BSdNMAy4m5cNp0W45dWLK+YsMxKkagHUhTqBw0gS/s62muHuvcuTkZchO8yDIkb/zGqzEbNxOJuF7t1VJYntMxCyZhYWPcajYvo7fDqlsm+zTpbVjoOemtNy1QUdE6ZdIMNi8JcsWXL3WKFUVWzNlcM2kTAUMdOVclIE6fqPOtrsrHWcBYuWznGJYGZXJvGXIGkmF1MwJJ8VOXvrfxLl8pdjMkDQcYk6DfxM01pCo610ExtlcJbTrFDAPILAHMXYnT1pFagX1O4g+BmvNrWWkrBkEg8dQYOopy011PZ6xf4cy/Kpe2HE9Gi8OfCkXXBUieBrzwdpYgGTeug/xvPzq9G2sSmGR0v3A2oJLlp7RH5p/aHuppCcTRY7GW7YJdgBr6A41lNrbY6wFFQ5TvJ0J46Cqi7fd/aYsTxOpqVh8O53wB3766Z55SVLSFGCWyDpyP8w/Sjq56hf2FoVzUaEpFAqSjVGVqdVq2IJSPT6XKhK1PoauImT7WKI4mpq7SeInSqlPCnfdW0W0SyeuKBOtSbV4VTZjzpat30+YuJfPeWKiO4qCHoiB4eHZ+W+m5hxJbPTLCmNeDe8T8opLO3IHwP0P61jJ2WidaMU87SKrUxHOR5ae/dUhbsiRrWTQx8KKWRTaU7SoBsp60pDJ3U4wpOYjmKGgEWgKddNKT1hnWD4ilG8I3e4xUtDGeq8KSbVLa4vePjTLX/RooBQUcqfQk86jI7NuH6U8hA3keA1PuocQG77EcTSEtl93vAII8xup9nB/KP82vwpc8yT8B7h9anigHMFYvFltLfclmAAdy4BPMvmIFIxGyM+pxNjze6B7hbgVO2Ifx7f8AGKmdGGbOnYdkzpIS2r9kyGzKRAUkrLcNYMiKXQ0jNnoqWy5Llt81xLcIziHuZsmbMi6dhtabxHRK4q5tGEJlyNnzZ2dFygCT2kYRWqKPbu3VtqhZcfh8ir7Gb/ElF4QJgROnOhgtqYi4VFtEPCGdycqLcdi7vcL5ctx9Z00Ag7yhmLs9GrrvkVHDZ0RpRgEZ2CqHMdiSRvorewbr/hi2WErqUbIM7BVZmiApI3nTStS+2rgyTbSEe29qTcAXqwiCGz9tSLaiWJ46iaD7WuNlLW7bEOjoczKC6KqAgK4B7KKCsQI3CTLWgMg2wLltnBw7goJchG7K6w5MaIcphtxinr+yLiZibbFVyy6oxQZgCAXiAe0B41pMNtu4kN1dpzqAzk5lDvedhOeRPWuI/dXiNYuM2zdYFGCD8N7ZiYi4tpSfaIJiypB7zv0ikBmMgoVMyHn699CqAo1anUNChVIgeRhUm29HQq4iZIR6UzUKFarokRmpatQoVICgTR5qKhQwF5qGahQrNlilalwDwE8+PvoUKhgOIORPnr89fjT6s3cfh8P60KFIAdaJg6Hv/pQZqFCmgGHek550FChSYDhJAl8pA/dgx4rBpgXBMqgjmST7hQoUkVdi5J3k+A7I+GvxpawBoIHdpQoUDAfGiNw0KFSA/gsZ1d1LkZsrAxumOE8KlW9qWkELadRyGIcbxHBeVChQAdnaipk6uzlK3rV0zcL5jaz5V1Aic5k0dnbORcllOrXt7rjky1t7ZOY66Zgw71FChQAjaG2jeFsOohYkCAGOVFn2ZGiDeT5bqhm9zBMGRJG/QQYGq9kaCIjQ0KFACDeGkgmO8RmiC0Zd536z8BES4ZJOuvMydeZjU0KFUA1RUKFAH//Z" />
                                            </figure>
                                            <div class="c-eventmap__areainfo">
                                                <p>Сцена - это ключевая часть помещения форума, место основного действия</p>
                                            </div>
                                        </div>
                                        <div class="c-eventmap__areapopup c-eventmap__areapopup--buffet">
                                            <header class="c-eventmap__areatitle">
                                                <h5>Cofee-break</h5>
                                            </header>
                                            <figure class="c-eventmap__areaphoto">
                                                <img src="https://blockchain-life.com/asia/wp-content/uploads/Screenshot-2022-12-23-at-16.43.28.png" />
                                            </figure>
                                            <div class="c-eventmap__areainfo">
                                                <p>Зона кофе-брейков с напитками, закусками и обедом для обладателей билетов Business</p>
                                            </div>
                                        </div>
                                        <div class="c-eventmap__areapopup c-eventmap__areapopup--photozone">
                                            <header class="c-eventmap__areatitle">
                                                <h5>Фотозона</h5>
                                            </header>
                                            <figure class="c-eventmap__areaphoto">
                                                <img src="https://forumspb.com/upload/iblock/7ec/7ec9bcb724fdd2c26822b32f834f7748.png" />
                                            </figure>
                                            <div class="c-eventmap__areainfo">
                                                <p>Фотозона на мероприятиях – это ключевое место для мероприятия, так как именно она попадает на огромное множество фотографий с гостями.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <img class="c-eventmap__image" src={images['forum/forum_plan']} />
                                {/* <a
                                    style="margin: 50px auto"
                                    class="с-preview__part"
                                    onclick={(e) => {
                                        Variable.SetModals({ name: "ModalForumMessage", data: {} })
                                        e.stopPropagation();
                                    }}
                                >
                                    <span>Купить стенд</span>
                                </a> */}
                            </div>
                            {/* <div style="margin-bottom: 40px">
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

                                    <a target="_blank" rel="nofollow nooopener" href="https://zerogravity.foundation/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_19']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Децентрализованный венчурный фонд. Международный агрегатор по цифровым, инновационным и блокчейн технологиям.</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://zh.cash/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_20']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">ZHCHAIN - Блокчейн платформа 5-го поколения!</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://t.me/zhcashcrypto/1036" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_21']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Видеосервис на блокчейне с уникальной реферальной программой!</p>
                                        </div>
                                    </a>
                                    <a target="_blank" rel="nofollow nooopener" href="https://garantex.io/" class="company_item" style={showAllCompanies ? '' : 'display: none'}>
                                        <img style="height: 150px; width: 150px;" src={images['forum/forum_company_23']} />
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Криптовалютная биржа Garantex работает с 2019 года и с тех пор зарекомендовала себя как надежный партнер и один из самых удобных хабов для работы с криптой в России.</p>
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
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_28']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Евгения Бурова</p>
                                            <p>PR-директор биржи Garantex</p>
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
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_12']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Сергей Павлович</p>
                                            <p>Автор и ведущий канала Люди PRO, владелец бизнесов в IT, e-commerce и медиа, инвестор</p>
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
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_25']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Никита Балашов</p>
                                            <p>Директор по маркетингу, крипто менеджер.</p>
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
                                            <img style="height: 150px; width: 150px;border-radius: 50%" src={images['forum/forum_speaker_26']} />
                                        </div>
                                        <div>
                                            <p style="margin-top: 10px; margin-bottom: 5px">Евгений Мусиенко</p>
                                            <p>Специалист по инвестициям</p>
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
                                    <a style="display: block!important; background: #1C1A27"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://zerogravity.foundation/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_23"]} />
                                    </a>
                                    <a style="display: block!important; background: #EDEDED"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="http://www.zhcashcrypto.site"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_24"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://t.me/zhcashcrypto/1036"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_26"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://bloknot-novorossiysk.ru"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_25"]} />
                                    </a>
                                    <a style="display: block!important; background: #C4CFE3"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://t.me/zhcashcrypto/1040"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_27"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://www.cls.global"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_28"]} />
                                    </a>
                                    <a style="display: block!important;"
                                        target="_blank"
                                        rel="nofollow nooopener"
                                        href="https://garantex.io/"
                                        class="c-infopartners__item"
                                    >
                                        <img src={images["forum/partner_30"]} />
                                    </a>
                                </div>

                            </div> */}
                        </div>
                    </div>
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    {/* <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script> */}
                </div>
            )
        }, ID
    )
}

export default start;
