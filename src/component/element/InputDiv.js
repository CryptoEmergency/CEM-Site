import {
    jsx,
    jsxFrag,
} from "@betarost/cemserver/cem.js";

const InputDiv = function ({ error, className, placeholder, textContent, onclick, oninput, contenteditable = "plaintext-only", onKeyPress, title, children }) {
    return (
        <div class="input-div__container">
            <label>{title}</label>
            <div style="color:red;">{error ? error : null}</div>
            <div
                class={className}
                contenteditable={contenteditable}
                placeholder={placeholder}
                // textContent={textContent}
                onKeyPress={onKeyPress}
                oninput={oninput}
                onclick={onclick}
            >
                {children}
            </div>
        </div>

    )
};
export { InputDiv };