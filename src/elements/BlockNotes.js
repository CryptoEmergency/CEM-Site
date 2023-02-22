import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ children, className, Static }) {
    return (
        <div class={["notes-content-wrapper", className]}>
            <Elements.image.imgAdd
                // Static={Static}
                src={svg["clip_notes"]} />
                {children}
        </div>
    )
}

export default forExport
