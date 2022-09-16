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
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { CourseCurrency } from '@component/element/CourseCurrency.js';


const BlockPreview = function () {

    const auth = getStorage("auth");

    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                {!auth ?
                    <div class="с-preview__text с-preview__text--auth">
                        <span>{Variable.lang.homePreview.ask}</span>
                        <div class="с-preview__imgblock">
                            <img class="с-preview__img" src={svg.two} />
                            <img class="с-preview__img" src={svg.two5} />
                            {Variable.lang.homePreview.earn}
                        </div>
                    </div>
                    :
                    <div class="с-preview__text">
                        {Variable.lang.homePreview.platformFuture}<br />
                        {Variable.lang.homePreview.unitePeople}
                    </div>
                }
            </div>
            <div class="с-preview__parts">
                <a href="/lenta-users/" class="с-preview__part">
                    <span>{Variable.lang.span.userNews}</span>
                </a>
                <a href="/chats/" class="с-preview__part" data-updating="true">
                    <span>{Variable.lang.span.chats}</span>
                </a>
                <a href="/question/" class="с-preview__part">
                    <span>{Variable.lang.span.QA}</span>
                </a>
                <a href="/news/" class="с-preview__part">
                    <span>{Variable.lang.span.news}</span>
                </a>
            </div>
            <div class="с-preview__crypto">
                {
                    Object.keys(Variable.course).filter((item) => typeof Variable.course[item] == 'object').map(function (key) {
                        return (
                            <CourseCurrency course={Variable.course[key]} key={key} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export { BlockPreview }