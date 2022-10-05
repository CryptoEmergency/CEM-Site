import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import { siteLink } from '@src/functions.js'
import svg from "@assets/svg/index.js";

const ProjectItem = function ({ project }) {
    return (
        <div class="c-projects__item swiper-slide slide-item">
            <a href={`/${project.link}/`} onclick={siteLink}>
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

export { ProjectItem }