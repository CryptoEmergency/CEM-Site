import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from '@betarost/cemjs';
// poydet
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { CourseCurrency } from '@component/element/index.js';
import { api } from '@src/apiFunctions.js'

const BlockPreview = async function () {
    await initOne(
        async () => {
            await api({ type: "get", action: "getCourse", short: true, cache: true, name: "Course", })
        }
    )
    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                <div class="с-preview__text с-preview__text--auth">
                    <span>{Variable.lang.homePreview.ask}</span>
                    <div class="с-preview__imgblock">
                        <img class="с-preview__img" src={svg.two} />
                        <img class="с-preview__img" src={svg.two5} />
                        {Variable.lang.homePreview.earn}
                    </div>
                </div>
            </div>
            <div class="с-preview__crypto">
                {
                    () => {
                        if (Variable.Course && Variable.Course.list_records && Variable.Course.list_records.length) {
                            const arrReturn = Object.keys(Variable.Course.list_records[0]).filter((item) => typeof Variable.Course.list_records[0][item] == 'object').map(function (key) {
                                return (
                                    <CourseCurrency course={Variable.Course.list_records[0][key]} key={key} />
                                )
                            })
                            return arrReturn
                        }
                    }
                }
            </div>
        </div>
    )
}
export { BlockPreview }