import {
    jsx,
    jsxFrag,
    initReload,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function ({ className }) {
    return (
        <div class={["notes-description", className]}
            contenteditable={true}
        // placeholder={placeholder}
        // Element={Element}
        // textContent={textContent}
        // onKeyPress={onKeyPress}
        // oninput={oninput}
        >
        </div>
    )
}

export default forExport