import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ src, className }) {
    return (
        <div class={["notes-item_img", className]}>
            <img
                src={src}
                width="50"
                height="50"
            />
        </div>
    )
}

export default forExport