import {
    jsx,
    jsxFrag,
    timersStart,
    sendApi,
    init,
    Variable
} from '@betarost/cemjs';

import { timerCourse, checkAnswerApi, siteLink } from '@src/functions.js'
import { mainQuestions, mainTrades, mainExchanges, mainUsers, mainNews } from "@src/apiFunctions.js";

import { BlockPreview } from '@component/blocks/BlockPreview.js';
import { BlockProjects } from '@component/blocks/BlockProjects.js';
import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockBanners } from '@component/blocks/BlockBanners.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { BlockUsers } from '@component/blocks/BlockUsers.js';
import { BlockMainNews } from '@component/blocks/BlockMainNews.js';
import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';


import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let swiperitem = {}

const swiperLoad = function () {
    swiperitem.one = new Swiper('#swiper-one', {
        direction: 'horizontal',
        navigation: {
            nextEl: '#next-icons',
            prevEl: '#prev-icons',
        },
        breakpoints: {
            20: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            320: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            425: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 65
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 88
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 158
            },
            1240: {
                slidesPerView: 9,
                spaceBetween: 66,
            },
        },
    });

    swiperitem.desktop = new Swiper('#swiper-desktop', {
        direction: 'horizontal',
        navigation: {
            nextEl: '#next-desktop-icons',
            prevEl: '#prev-desktop-icons',
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 85
            },
            375: {
                slidesPerView: 2,
                spaceBetween: 125
            },
            425: {
                slidesPerView: 3,
                spaceBetween: 35
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 65
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 88
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 40
            },
            1240: {
                slidesPerView: 9,
                spaceBetween: 30,
            },
        },
    });

    swiperitem.startup = new Swiper('#swiper-startups', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 2000,
        },
        pagination: {
            el: '#swiper-pagination-startup',
        },
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

    return
}


const start = function () {

    Variable.HeaderShow = true
    Variable.FooterShow = true

    init(
        async () => {

            Variable.Course = checkAnswerApi(await sendApi.getCourse({ setIntervalFunc: timerCourse })).list_records[0]
            timersStart("Course", timerCourse, 10000)

            Variable.MainQuestions = checkAnswerApi(await sendApi.getMainQuestions(
                {
                    setIntervalFunc: async () => {
                        Variable.MainQuestions = checkAnswerApi(await sendApi.getMainQuestions())
                    }
                }
            )
            )

            Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades(
                {
                    setIntervalFunc: async () => {
                        Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades())
                    }
                }
            )
            )

            Variable.MainExchanges = checkAnswerApi(await sendApi.getMainExchanges(
                {
                    setIntervalFunc: async () => {
                        Variable.MainExchanges = checkAnswerApi(await sendApi.getMainExchanges())
                    }
                }
            )
            )

            Variable.MainUsers = checkAnswerApi(await sendApi.getMainUsers(
                {
                    setIntervalFunc: async () => {
                        Variable.MainUsers = checkAnswerApi(await sendApi.getMainUsers())
                    }
                }
            )
            )

            Variable.MainNews = checkAnswerApi(await sendApi.getMainNews(
                {
                    setIntervalFunc: async () => {
                        Variable.MainNews = checkAnswerApi(await sendApi.getMainNews())
                    }
                }
            )
            )

            Variable.SwiperLoad.push(swiperLoad)

            const data_users = await mainUsers(6);
            // users = data_users.list_records;
        },
        () => {

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <BlockPreview />
                    <BlockProjects />
                    <div class="c-main__wrapperbg">
                        <BlockQuestions
                            button={
                                <div class="c-questions__footer">
                                    <a
                                        class="c-button c-button--gray"
                                        href="/question/"
                                        onclick={siteLink}
                                    >
                                        <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
                                    </a>
                                </div>
                            }
                        />
                        <div class="c-main__wrapperbg2">
                            <BlockBanners />
                            <BlockTrade />
                            <div class="top_professionals_container">
                                <BlockExchange />
                                <BlockUsers />
                                <BlockMainNews />
                                <BlockInfoPartners />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
};

export default start;