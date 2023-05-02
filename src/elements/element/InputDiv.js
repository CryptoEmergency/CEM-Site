import {
    jsx,
    jsxFrag,
} from "@betarost/cemserver/cem.js";

const InputDiv = function ({ error, className, placeholder, Element, textContent, onclick, oninput, contenteditable = "plaintext-only", onkeyup, title, children }) {
    return (
        <div class="input-div__container">
            <label>{title}</label>
            <div style="color:red;">{error ? error : null}</div>
            <div
                class={className}
                Element={Element}
                contenteditable={contenteditable}
                placeholder={placeholder}
                // textContent={textContent}
                onkeyup={onkeyup}
                oninput={oninput}
                onclick={onclick}
            >
                {children}
            </div>
        </div>

    )
};
export { InputDiv };