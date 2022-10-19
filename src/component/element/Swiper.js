import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';

import { Swiper as SwiperJs } from 'swiper/bundle';
import 'swiper/css/bundle';


const swiperInit = function ($el, options, swiperElem) {
    swiperElem = new SwiperJs($el, options);
}

const Swiper = function ({ slide, options, className, navigation, swiperElem }) {
    // console.log('=42f2e9=', slide)
    return (
        <div class="swiper-container" replace={true}>
            <div
                class={["swiper", className]}
                After={(el) => {
                    if (slide.length >= 2) {
                        swiperInit(el, options, swiperElem)
                    }
                }}
            >
                <div class="swiper-wrapper">
                    {slide}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-scrollbar"></div>
            </div>
            {navigation}
        </div>
    )

};

export { Swiper };
