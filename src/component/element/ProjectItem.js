import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
// import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const ProjectItem = function ({ lang, project }) {
    // console.log("ProjectItem", project, svg[project.icon]);

    return (
        <div class="c-partners__item swiper-slide slide-item">
            <a href={`/${project.link}/`}>
                <div class="projects_icons_text">
                    <div class="nav-more_item">
                        <img src={svg[project.icon]} alt=""/>
                    </div>
                    <p>{project.title}</p>
                </div>
            </a>
        </div>
    )
}

export { ProjectItem }