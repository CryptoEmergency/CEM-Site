import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ children, className, onClick_add, text_add }) {
    return (
        <div class={["notes-list", className]}>
            <button class="notes-button"
                onclick={onClick_add}>
                <span>{text_add}</span>
            </button>
            {children}
        </div>
    )
}

export default forExport