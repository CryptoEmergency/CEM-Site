import {
    jsx,
    jsxFrag,
    Variable,
    initAfter,
    initOne
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const banners = [
    // {
    //     "id": "62dd2ca100978d192547427c",
    //     "image": "lbf_banner"
    // },
    {
        "id": "62bab2ac962df43c3fd94755",
        "image": "blockchain24"
    },
    // {
    //     "id": "62f0da1ef2b8fa66345ef411",
    //     "image": "crypto_summit"
    // },
    // {
    //     "id": "630382384dab714d6e986cd6",
    //     "image": "1200х580-(fb)"
    // },
    {
        "id": "62fb66bd4dab714d6e955d80",
        "image": "blockchain_life"
    },
    {
        "id": "62d134221de982539a72345e",
        "image": "crypto_future_banner"
    },
    {
        "id": "632c4007b7cd91af0a32611c",
        "image": "techweek290х140"
    },
    {
        "id": "6335a4b54b35372a229983f6",
        "image": "chiframed290x140"
    },
    {
        "id": "633abcdcaaa547a6fbb7ae22",
        "image": "cryptofut"
    },
    {
        "id": "631eed7583bf605a831e4a42",
        "image": "banner2022-09-09"
    },
];

let swiperitem

const BlockBanners = function () {

    initOne(
        () => {
            swiperitem = null
        }
    )

    initAfter(
        () => {
            if (!swiperitem) {
                swiperitem = new Swiper('#swiper-startups', {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: {
                        delay: 2000,
                    },
                    pagination: false,
                    scrollbar: {
                        el: '.swiper-scrollbar-startup',
                    },
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
                            slidesPerView: 3,
                            spaceBetween: 46,
                        },
                        1240: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                            navigation: {
                                nextEl: '#next-startup',
                                prevEl: '#prev-startup',
                            },
                        },
                    },
                });
            }
        }
    )

    return (
        <div class="c-startaps">
            <div class="swiper-container">
                <div class="swiper swiper-startups" id="swiper-startups">
                    <div class="swiper-wrapper">
                        {
                            banners.map(function (banner) {
                                return (
                                    <a class="swiper-slide">
                                        <div data-id={banner.id}>
                                            <img src={images[`banners/${banner.image}`]} />
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div class="swiper-pagination" id="swiper-pagination-startup"></div>
                    <div class="swiper-scrollbar-startup"></div>
                </div>
                <div class="swiper-button-prev" id="prev-startup">
                    <img src={svg.swiper_arrow_left} style="height: 40%;" />
                </div>
                <div class="swiper-button-next" id="next-startup">
                    <img src={svg.swiper_arrow_right} style="height: 40%;" />
                </div>
            </div>
        </div>
    )
}
//I check
export { BlockBanners }