import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    initAfter
} from '@betarost/cemjs';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import svg from "@assets/svg/index.js";
import { ProjectItem } from '@component/element/ProjectItem.js';
import { ProjectDoubleItem } from '@component/element/ProjectDoubleItem.js';

const doubleProject = function (projects) {
    let size = 2;
    let doubleProject = [];
    for (let i = 0; i < Math.ceil(projects.length / size); i++) {
        doubleProject[i] = projects.slice((i * size), (i * size) + size);
    }
    return doubleProject;
};

let swiperitem = {}

const swiperGo = function () {
    // if (!swiperitem) {
    swiperitem.desktop = new Swiper('#swiper-desktop', {
        direction: 'horizontal',
        navigation: {
            nextEl: '#next-desktop-icons',
            prevEl: '#prev-desktop-icons',
        },
        breakpoints: {
            20: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            390: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            465: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            // 320: {
            //     slidesPerView: 2,
            //     spaceBetween: 85
            // },
            // 375: {
            //     slidesPerView: 2,
            //     spaceBetween: 125
            // },
            // 425: {
            //     slidesPerView: 3,
            //     spaceBetween: 35
            // },
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
    // }
}

const BlockProjects = function () {

    const projects = [
        {
            "title": Variable.lang.a.exchange,
            "icon": "shuffle",
            "link": "list-exchange"
        },
        // {
        //     "title": Variable.lang.a.university,
        //     "icon": "mortarboard",
        //     "link": "university"
        // },
        {
            "title": Variable.lang.a.contentCreater,
            "icon": "graph",
            "link": "content-creator"
        },
        // {
        //     "title": Variable.lang.a.starups,
        //     "icon": "startup",
        //     "link": "startups"
        // },
        // {
        //     "title": Variable.lang.a.universes,
        //     "icon": "meta_universes",
        //     "link": "university"
        // },
        // {
        //     "title": Variable.lang.a.icoRating,
        //     "icon": "star1",
        //     "link": "ico-rating"
        // },
        {
            "title": Variable.lang.a.trade,
            "icon": "stock-market",
            "link": "list-trade"
        },
        {
            "title": Variable.lang.a.news,
            "icon": "world-news",
            "link": "news"
        },
        {
            "title": Variable.lang.a.experts,
            "icon": "user",
            "link": "experts"
        },
        // {
        //     "title": Variable.lang.a.nft,
        //     "icon": "nft_icon",
        //     "link": "nft-market"
        // },
        {
            "title": Variable.lang.a.career,
            "icon": "careers_icon",
            "link": "career-whith-us"
        },
    ];

    initOne(
        () => {
            swiperitem = {}
        }
    )

    initAfter(
        () => {
            if (!swiperitem.one) {

            }

            if (!swiperitem.desktop) {

            }
        }
    )

    return (
        <div class="c-projects">
            <div class="swiper-container">
                <div class="swiper swiper-icons" id="swiper-desktop">
                    <div class="swiper-wrapper">
                        {
                            projects.map(function (item) {
                                return (
                                    <ProjectItem project={item} />
                                )
                            })
                        }
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="swiper-button-prev" id="prev-desktop-icons"><img src={svg.swiper_arrow_left} style="height: 40%;" /></div>
                <div class="swiper-button-next" id="next-desktop-icons"><img src={svg.swiper_arrow_right} style="height: 40%;" /></div>
            </div>
            <div class="swiper-container" style="display: none !important;">
                <div class="swiper swiper-icons" id="swiper-one" After={swiperGo}>
                    <div class="swiper-wrapper">
                        {
                            doubleProject(projects).map(function (item) {
                                if (item.length == 2) {
                                    return (
                                        <ProjectDoubleItem projects={item} />
                                    )
                                } else {
                                    return (
                                        <ProjectItem project={item[0]} />
                                    )
                                }
                            })
                        }
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="swiper-button-prev" id="prev-icons"><img src={svg.swiper_arrow_left} style="height: 40%;" /></div>
                <div class="swiper-button-next" id="next-icons"><img src={svg.swiper_arrow_right} style="height: 40%;" /></div>
            </div>
            {/* <div class="c-projects__more main_page_show_more">
                {Variable.lang.button.see_all}
            </div> */}
        </div>
    )
}
//I check
export { BlockProjects }