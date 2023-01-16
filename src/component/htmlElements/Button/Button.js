import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const Button = function ({ style, className, onclick, text, textClass, children, reloadActive }) {
    return (
        <button
            type="button"
            style={style}
            class={className}
            onclick={onclick}>
            <span class={textClass}>{text}</span>
            {children}
        </button>
    )
}
export { Button }