import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import { siteLink } from '@src/functions.js'
const ProjectDoubleItem = function ({ projects }) {

    return (
        <div class="c-projects__item c-projects__item--double swiper-slide slide-item">
            <a href={`/${projects[0].link}/`} onclick={siteLink}>
                <div class="projects_icons_text">
                    <div class="nav-more_item">
                        <img src={svg[projects[0].icon]} alt="" />
                    </div>
                    <p>{projects[0].title}</p>
                </div>
            </a>
            <a href={`/${projects[1].link}/`} onclick={siteLink}>
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

export { ProjectDoubleItem }