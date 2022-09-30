import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
//import { Swiper, EffectCards } from "swiper";
//import { Swiper } from "swiper/react";
//import Swiper, { EffectCards, SwiperSlide } from 'swiper';
// import 'swiper/css';
// import "swiper/css/effect-cards";

import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';


const start = function () {
    let data
    Variable.HeaderShow = false
    Variable.FooterShow = false

    // const activeSwiper = function (data) {
    //     data = new Swiper(".mySwiper", {
    //         effect: "cards",
    //         grabCursor: true,
    //     });
    // }
    // const swiper = new Swiper(".mySwiper", {
    //     effect: "cards",
    //     grabCursor: true,
    // });
    init(

        async () => {



        },

        () => {
            return (
                <div class="uc_container">
                    <div class="awards_block">
                        <div class="awards_body">
                            <div class="swiper mySwiper awards_group awardsSwiper" style="width: 220px;">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">Slide 1</div>
                                    <div class="swiper-slide">Slide 2</div>
                                    <div class="swiper-slide">Slide 3</div>
                                    <div class="swiper-slide">Slide 4</div>
                                    <div class="swiper-slide">Slide 5</div>
                                    <div class="swiper-slide">Slide 6</div>
                                    <div class="swiper-slide">Slide 7</div>
                                    <div class="swiper-slide">Slide 8</div>
                                    <div class="swiper-slide">Slide 9</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {activeSwiper(data)} */}
                </div>
            )
        }
    )
};

export default start;