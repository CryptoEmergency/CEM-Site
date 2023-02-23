import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ Element, textContent, dataText, className, Static, oninput, innerText }) {
    return (
        <div class={["notes-input-placeholder", className]}
            contenteditable={true}
            Element={Element}
            data-text={dataText}
            // textContent={textContent}
            innerText={innerText}
            oninput={oninput}
        >
        </div>
    )
}

export default forExport
