import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue,
    Variable
} from '@betarost/cemjs';

import Swiper from 'swiper';
//import 'swiper/css';

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

const BlockProjects = function () {


    const projects = [
        {
            "title": Variable.lang.a.exchange,
            "icon": "shuffle",
            "link": "list-exchange"
        },
        {
            "title": Variable.lang.a.university,
            "icon": "mortarboard",
            "link": "university"
        },
        {
            "title": Variable.lang.a.contentCreater,
            "icon": "graph",
            "link": "content-creator"
        },
        {
            "title": Variable.lang.a.starups,
            "icon": "startup",
            "link": "startups"
        },
        {
            "title": Variable.lang.a.universes,
            "icon": "meta_universes",
            "link": "university"
        },
        {
            "title": Variable.lang.a.icoRating,
            "icon": "star1",
            "link": "ico-rating"
        },
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
        {
            "title": Variable.lang.a.nft,
            "icon": "nft_icon",
            "link": "nft-market"
        },
        {
            "title": Variable.lang.a.career,
            "icon": "careers_icon",
            "link": "experts"
        },
    ];



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
            <div class="swiper-container">
                <div class="swiper swiper-icons" id="swiper-one">
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
            <div class="c-projects__more main_page_show_more">
                {Variable.lang.button.see_all}
            </div>

        </div>


    )
}

export { BlockProjects }