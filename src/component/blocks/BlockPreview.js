import {
    jsx,
    jsxFrag,
    timersStart,
    setValue,
    sendApi,
    getVariable,
    getStorage,
    getValue,
    initOne,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { CourseCurrency } from '@component/element/CourseCurrency.js';
import { timerCourse, checkAnswerApi } from '@src/functions.js'

const BlockPreview = function () {



    // initOne(
    //     async () => {
    //         console.log("BlockPreview initOne")
    //         Variable.Course = checkAnswerApi(await sendApi.getCourse({ setIntervalFunc: timerCourse })).list_records[0]
    //         console.log("BlockPreview initOne 2 ", Variable.Course)
    //         timersStart("Course", timerCourse, 10000)
    //     }
    // ).then(console.log("fdfdfdf"))

    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                {!Variable.auth ?
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
                    Object.keys(Variable.Course).filter((item) => typeof Variable.Course[item] == 'object').map(function (key) {
                        return (
                            <CourseCurrency course={Variable.Course[key]} key={key} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export { BlockPreview }