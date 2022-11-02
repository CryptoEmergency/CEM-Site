import {
    jsx,
    jsxFrag,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";

const ProjectItem = function ({ project }) {
    return (
        <div class="c-projects__item swiper-slide slide-item">
            <a href={`/${project.link}/`}
                onclick={(e) => {
                    if (project.modal) {
                        Helpers.siteLinkModal(e, { title: project.title })
                    } else {
                        Helpers.siteLink(e)
                    }
                }}>
                <div class="projects_icons_text">
                    <div class="nav-more_item">
                        <img src={svg[project.icon]} alt="" />
                    </div>
                    <p>{project.title}</p>
                </div>
            </a>
        </div>
    )
}
//I check
export { ProjectItem }