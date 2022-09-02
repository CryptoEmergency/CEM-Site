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
import images from "@assets/images/index.js";
import { CourseCurrency } from '@component/element/CourseCurrency.js';

const BlockPreview = function ({lang, course}) {

    return (
        <div class="preview">
            <img class="lines" src={images["lines-preview-min"]} />
            <div class="title-preview">
                <img class="cem-img" src={images["background/cem"]} />
                <div class="title-text-preview">
                    {lang.homePreview.platformFuture}<br />
                    {lang.homePreview.unitePeople}
                </div>
            </div>
            <div class="main_site_parts">
                <a href="/lenta-users/" class="main_site_part" data-action="link">
                    <span>{lang.span.userNews}</span>
                </a>
                <a href="/chats/" class="main_site_part" data-action="link" data-updating="true">
                    <span>{lang.span.chats}</span>
                </a>
                <a href="/question/" class="main_site_part" data-action="link">
                    <span>{lang.span.QA}</span>
                </a>
                <a href="/news/" class="main_site_part" data-action="link">
                    <span>{lang.span.news}</span>
                </a>
            </div>
            <div class="static-crypto">
                {
                Object.keys(course).filter((item) =>  typeof course[item] == 'object').map(function (key) {
                    return (
                        <CourseCurrency lang={lang} course={course[key]} key={key} />
                    )
                })
                }
            </div>
        </div>
    )
}

export { BlockPreview }