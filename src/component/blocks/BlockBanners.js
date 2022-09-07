import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
// import { CourseCurrency } from '@component/element/CourseCurrency.js';

const BlockBanners = function ({ banners }) {
    // console.log("BlockBanners", banners);

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