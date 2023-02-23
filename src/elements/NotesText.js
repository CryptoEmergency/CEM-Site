import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ Element, textContent, placeholder, className, oninput, contenteditable, onKeyPress }) {
    return (
        <div class={["notes-input-placeholder", className]}
            contenteditable={contenteditable}
            placeholder={placeholder}
            Element={Element}
            textContent={textContent}
            onKeyPress={onKeyPress}
            oninput={oninput}
        >
        </div>
    )
}

export default forExport
