import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const ButtonGradient = function ({ style, className, onclick, text, textClass, children, reloadActive }) {
    return (
        <div
            class={["button-container-preview", className]}
            style={style}
            onclick={onclick}>
            <span class="btn-news-preview">
                <span class={textClass}>
                    {text}{children}
                </span>
            </span>
        </div>
    )
}
export { ButtonGradient }