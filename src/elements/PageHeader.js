import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";

const forExport = function ({ records, children, imgBack, title, descriptions, classBack }) {
    return (
        <div class="c-aboutus__whowe c-whowe">
            <div class="c-whowe__inner">
                <img
                    class="c-whowe__img"
                    src={imgBack}
                />
                <h2 class="title-animation">{title}</h2>
                <p>{descriptions}</p>
            </div>
            <div class={classBack}></div>
        </div>
    )
}

export default forExport