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
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { CourseCurrency } from '@component/element/CourseCurrency.js';
const auth = getStorage("auth");

const BlockPreview = function ({ lang, course }) {

    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                {!auth ?
                    <div class="с-preview__text с-preview__text--auth">
                        <span>{lang.homePreview.ask}</span>
                        <div class="с-preview__imgblock">
                            <img class="с-preview__img" src={svg.two} />
                            <img class="с-preview__img" src={svg.two5} />
                            {lang.homePreview.earn}
                        </div>
                    </div>
                    :
                    <div class="с-preview__text">
                        {lang.homePreview.platformFuture}<br />
                        {lang.homePreview.unitePeople}
                    </div>
                }
            </div>
            <div class="с-preview__parts">
                <a href="/lenta-users/" class="с-preview__part">
                    <span>{lang.span.userNews}</span>
                </a>
                <a href="/chats/" class="с-preview__part" data-updating="true">
                    <span>{lang.span.chats}</span>
                </a>
                <a href="/question/" class="с-preview__part">
                    <span>{lang.span.QA}</span>
                </a>
                <a href="/news/" class="с-preview__part">
                    <span>{lang.span.news}</span>
                </a>
            </div>
            <div class="с-preview__crypto">
                {
                    Object.keys(course).filter((item) => typeof course[item] == 'object').map(function (key) {
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