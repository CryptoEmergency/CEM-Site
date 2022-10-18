import {
    jsx,
    jsxFrag,
    sendApi,
    Variable,
    init,
    initReload,
    Helpers
} from "@betarost/cemjs";

import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { If, Map } from '@component/helpers/All.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
  
  
const start = function () {



    Variable.HeaderShow = true
    Variable.FooterShow = true
  

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
            loop: false,
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
            loop: false,
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

    init(
        async () => {

        },
        () => {
            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <div class="page-content page-content--full">
                        <div style="max-width: 1280px; margin: 0 auto; padding: 0 20px; margin-top: 30px">
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
                                <h3 style="text-align: center">Мега Форум Crypto Emergency</h3>
                                <h4 style="text-align: center">Время проведения:</h4>
                                <h4 style="text-align: center">Место проведения:</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <div class="swiper-container">
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
                                <a style="margin: 10px auto" class="с-preview__part">
                                    <span>Купить билет</span>
                                </a>
                            </div>
                            <div>
                                <h4 style="text-align: center">Стенды</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <a style="margin: 10px auto" class="с-preview__part">
                                    <span>Стенд</span>
                                </a>
                            </div>
                            <div>
                                <h4 style="text-align: center">Спикеры</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <div style="display: flex">
                                    <div style="background: linear-gradient(45deg, #3bade3 0%, #576fe6 45%, #9844b7 57%, #ff357f 70%);border-radius: 50%;padding: 3px">
                                        <img style="height: 170px; width: 170px;border-radius: 50%" src={images['forum/forum_9']} />
                                    </div>
                                </div>
                                <a style="margin: 10px auto" class="с-preview__part">
                                    <span>Стать спикером</span>
                                </a>
                            </div>
                            <BlockInfoPartners
                                limit={8}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    )
}
  
export default start;
  