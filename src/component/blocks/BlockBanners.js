import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
// import { CourseCurrency } from '@component/element/CourseCurrency.js';

const BlockBanners = function () {
    // console.log("BlockBanners", banners);

    const banners = [
        {
            "id": "62dd2ca100978d192547427c",
            "image": "lbf_banner"
        },
        {
            "id": "62bab2ac962df43c3fd94755",
            "image": "blockchain24"
        },
        {
            "id": "62f0da1ef2b8fa66345ef411",
            "image": "crypto_summit"
        },
        {
            "id": "630382384dab714d6e986cd6",
            "image": "1200х580-(fb)"
        },
        {
            "id": "62fb66bd4dab714d6e955d80",
            "image": "blockchain_life"
        },
        {
            "id": "62d134221de982539a72345e",
            "image": "crypto_future_banner"
        }
    ];

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

export { BlockBanners }