import {
    jsx,
    jsxFrag,
    Helpers,
    initOne,
    initAfter
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';
import { VideoPlayer } from '@component/element/index.js';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let swiperitem

const LentaMedia = function ({ items }) {
    console.log('=103167=', items)
    if (items.length == 0) {
        return (
            <></>
        )
    }
    swiperitem = null
    // items.push(...items)

    // initOne(
    //     () => {
    //         swiperitem = null
    //     }
    // )

    initAfter(
        () => {
            if (!swiperitem) {
                // swiperitem = new Swiper(".swiper-post_media", {
                //     effect: "cube",
                //     grabCursor: true,
                //     cubeEffect: {
                //         shadow: true,
                //         slideShadows: true,
                //         shadowOffset: 20,
                //         shadowScale: 0.94,
                //     },
                //     loop: false,
                //     autoHeight: true,
                //     pagination: {
                //         el: '.swiper-pagination-post_media',
                //     },
                //     scrollbar: {
                //         el: '.swiper-scrollbar-post_media',
                //     },
                //     slidesPerView: 1,
                //     spaceBetween: 20
                // });

                // swiperitem = new Swiper(".swiper-post_media", {
                //     loop: false,
                //     autoHeight: true,
                //     pagination: {
                //         el: '.swiper-pagination-post_media',
                //     },
                //     scrollbar: {
                //         el: '.swiper-scrollbar-post_media',
                //     },
                //     slidesPerView: 1,
                //     spaceBetween: 20
                // });
            }
        }
    )
    return (
        <div class="swiper-container">
            <div class="swiper swiper-post_media">
                <div class="swiper-wrapper">
                    <Map
                        data={items}
                        dataIf={
                            (item, index) => {
                                if (item.type == "video") {
                                    return (
                                        <VideoPlayer
                                            item={item}
                                            index={index}
                                            path={"/assets/upload/posts/"}
                                        />
                                    )
                                }

                                if (item.type == "image") {
                                    return (
                                        <a class="swiper-slide">
                                            <div class="swiper-post_media_image_container">
                                                <img src={`/assets/upload/posts/${item.name}`} />
                                            </div>
                                        </a>

                                    )
                                }

                            }
                        }
                    />


                </div>
                <div class="swiper-pagination swiper-pagination-post_media"></div>
                <div class="swiper-scrollbar-post_media"></div>
            </div>
        </div>
    )
}
//I check
export { LentaMedia }