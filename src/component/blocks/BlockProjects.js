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
// import images from "@assets/images/index.js";
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

const BlockProjects = function ({ projects }) {
    // console.log("BlockProjects", projects);

    return (
        <div class="c-projects">
            <div class="swiper-container">
                <div class="swiper swiper-icons" id="swiper-desktop">
                    <div class="swiper-wrapper">
                        {
                            projects.map(function (item) {
                                return (
                                    <ProjectItem lang={Variable.lang} project={item} />
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
                                        <ProjectDoubleItem lang={Variable.lang} projects={item} />
                                    )
                                } else {
                                    return (
                                        <ProjectItem lang={Variable.lang} project={item} />
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