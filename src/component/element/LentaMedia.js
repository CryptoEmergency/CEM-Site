import {
    jsx,
    jsxFrag,
    Helpers,
    initOne,
    initAfter,
    Variable
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';
import { VideoPlayer, AudioPlayer, Swiper } from '@component/element/index.js';

// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';

let swiperitem = []
const swiperOptions = {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    loop: false,
    // autoHeight: true,
    pagination: {
        el: '.swiper-pagination',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    slidesPerView: 1,
    spaceBetween: 20
}

const swiperGo = function (numIndex) {
    // if (!swiperitem) {
    swiperitem[numIndex] = new Swiper(".swiper-post_media", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        loop: false,
        // autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        slidesPerView: 1,
        spaceBetween: 20
    });
    // }
}
const LentaMedia = function ({ items, numIndex, elem, path }) {
    if (items.length == 0) {
        return (
            <></>
        )
    }
    // swiperitem = null
    // items.push(...items)
    // items.push(...items)
    // initOne(
    //     () => {
    //         swiperitem = null
    //     }
    // )



    // initAfter(
    //     () => {

    //         if (typeof swiperitem[numIndex] != "undefined") {
    //             swiperitem[numIndex].destroy()
    //             swiperitem[numIndex].init()
    //             // swiperitem[numIndex].update()
    //             // swiperitem[numIndex].update()
    //         }
    //         if (!swiperitem) {
    //             // swiperitem = new Swiper(".swiper-post_media", {
    //             //     effect: "cube",
    //             //     grabCursor: true,
    //             //     cubeEffect: {
    //             //         shadow: true,
    //             //         slideShadows: true,
    //             //         shadowOffset: 20,
    //             //         shadowScale: 0.94,
    //             //     },
    //             //     loop: false,
    //             //     autoHeight: true,
    //             //     pagination: {
    //             //         el: '.swiper-pagination-post_media',
    //             //     },
    //             //     scrollbar: {
    //             //         el: '.swiper-scrollbar-post_media',
    //             //     },
    //             //     slidesPerView: 1,
    //             //     spaceBetween: 20
    //             // });

    //             // swiperitem = new Swiper(".swiper-post_media", {
    //             //     loop: false,
    //             //     autoHeight: true,
    //             //     pagination: {
    //             //         el: '.swiper-pagination-post_media',
    //             //     },
    //             //     scrollbar: {
    //             //         el: '.swiper-scrollbar-post_media',
    //             //     },
    //             //     slidesPerView: 1,
    //             //     spaceBetween: 20
    //             // });
    //         }
    //     }
    // )
    return (
        <Swiper
            slide={
                <Map
                    data={items}
                    dataIf={
                        (item, index) => {
                            if (item.type == "video") {
                                elem[numIndex][index] = Variable.setRef()
                                return (

                                    <div class="swiper-slide">
                                        <VideoPlayer
                                            item={item}
                                            index={index}
                                            numIndex={numIndex}
                                            elem={elem}
                                            path={path}
                                        //  path={"/assets/upload/posts/"}
                                        />
                                    </div>
                                )
                            }

                            if (item.type == "image") {
                                return (
                                    <div class="swiper-slide">
                                        < div class="swiper-post_media_image_container" >
                                            <img src={path + item.name} />
                                        </div >
                                    </div >

                                )
                            }

                            if (item.type == "audio") {
                                return (
                                    <div class="swiper-slide">
                                        <AudioPlayer
                                            item={item}
                                            index={index}
                                            numIndex={numIndex}
                                            elem={elem}
                                            path={path}
                                            type="posts"
                                        //  path={"/assets/upload/posts/"}
                                        />
                                    </div>

                                )
                            }

                        }
                    }
                />
            }
            options={swiperOptions}
            className=""

        />

    )
}
//I check
export { LentaMedia }