import {
    jsx,
    jsxFrag,
} from "@betarost/cemjs";
//check
import { Swiper as SwiperJs } from 'swiper/bundle';
import 'swiper/css/bundle';

const swiperInit = function ($el, options, swiperElem) {
    swiperElem = new SwiperJs($el, options);
}

const Swiper = function ({ slide, options, className, navigation = false, swiperElem, replace = false }) {

    if (navigation) {
        return (
            <div class="swiper-container" replace={replace}>
                <div
                    class={["swiper", className]}
                    After={(el) => {
                        if (slide.length >= 2) {
                            swiperInit(el, options, swiperElem)
                        }
                    }}>
                    <div class="swiper-wrapper">{slide}</div>
                    <div class="swiper-pagination"></div>
                    {/* <div class="swiper-scrollbar"></div> */}
                </div>
                {navigation}
            </div>
        )
    } else {
        return (
            <div
                class={["swiper", className]}
                After={(el) => {
                    if (slide.length >= 2) {
                        swiperInit(el, options, swiperElem)
                    }
                }}>
                <div class="swiper-wrapper">
                    {slide}
                </div>
            </div>
        )
    }
};
export { Swiper };