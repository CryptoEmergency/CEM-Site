import {
    jsx,
    jsxFrag,
    initReload
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";

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