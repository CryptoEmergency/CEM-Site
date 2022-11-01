import {
    jsx,
    jsxFrag,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";

const ProjectDoubleItem = function ({ projects }) {
    return (
        <div class="c-projects__item c-projects__item--double swiper-slide slide-item">
            <a href={`/${projects[0].link}/`} onclick={(e) => {
                if (projects[0].modal) {
                    Helpers.siteLinkModal(e, { title: projects[0].title })
                } else {
                    Helpers.siteLink(e)
                }
            }}>
                <div class="projects_icons_text">
                    <div class="nav-more_item">
                        <img src={svg[projects[0].icon]} alt="" />
                    </div>
                    <p>{projects[0].title}</p>
                </div>
            </a>
            <a href={`/${projects[1].link}/`} onclick={(e) => {
                if (projects[1].modal) {
                    Helpers.siteLinkModal(e, { title: projects[1].title })
                } else {
                    Helpers.siteLink(e)
                }
            }}>
                <div class="projects_icons_text">
                    <div class="nav-more_item">
                        <img src={svg[projects[1].icon]} alt="" />
                    </div>
                    <p>{projects[1].title}</p>
                </div>
            </a>
        </div>
    )
}
//I check
export { ProjectDoubleItem }