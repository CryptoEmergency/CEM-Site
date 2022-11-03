import {
    jsx,
    jsxFrag,
} from '@betarost/cemjs';
// poydet
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { Swiper } from '@component/element/index.js';

// Сделать запрос через Базу
const banners = [
    // {
    //     "id": "62dd2ca100978d192547427c",
    //     "image": "lbf_banner"
    // },
    // {
    //     "id": "62bab2ac962df43c3fd94755",
    //     "image": "blockchain24"
    // },
    // {
    //     "id": "62f0da1ef2b8fa66345ef411",
    //     "image": "crypto_summit"
    // },
    // {
    //     "id": "630382384dab714d6e986cd6",
    //     "image": "1200х580-(fb)"
    // },
    // {
    //     "id": "62fb66bd4dab714d6e955d80",
    //     "image": "blockchain_life"
    // },
    // {
    //     "id": "62d134221de982539a72345e",
    //     "image": "crypto_future_banner"
    // },
    // {
    //     "id": "632c4007b7cd91af0a32611c",
    //     "image": "techweek290х140"
    // },
    // {
    //     "id": "6335a4b54b35372a229983f6",
    //     "image": "chiframed290x140"
    // },
    // {
    //     "id": "633abcdcaaa547a6fbb7ae22",
    //     "image": "cryptofut"
    // },
    // {
    //     "id": "631eed7583bf605a831e4a42",
    //     "image": "banner2022-09-09"
    // },
    {
        "href": "https://metis.io/",
        "image": "metis_banner"
    },
    {
        "href": "https://crypto-emergency.com/forum/",
        "image": "forum_banner"
    },
    {
        "href": "https://blockchain24.pro/",
        "image": "blockchain_banner"
    },
    {
        "href": "https://crypto.ru/",
        "image": "crypto_banner"
    },
    {
        "href": "https://carding.pro/ru/glavnaya/",
        "image": "pro_banner"
    },
];

const swiperOptions = {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 2000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: false,
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
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
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },
        },
    },
}

const bannersRecords = banners.map(function (item) {
    return (
        <a rel="nofollow noopener" target="_blank" href={item.href} class="swiper-slide">
            <div>
                <img src={images[`banners/${item.image}`]} />
            </div>
        </a>
    )
})

const BlockBanners = function () {
    return (
        <div class="c-startaps">
            <Swiper
                slide={bannersRecords}
                options={swiperOptions}
                className="swiper-startups"
                navigation={
                    <div>
                        <div class="swiper-button-prev">
                            <img src={svg.swiper_arrow_left} style="height: 40%;" />
                        </div>
                        <div class="swiper-button-next">
                            <img src={svg.swiper_arrow_right} style="height: 40%;" />
                        </div>
                    </div>
                }
            />
        </div>
    )
}
export { BlockBanners }