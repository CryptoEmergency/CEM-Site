import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const TextInSpan = function ({ style, mClass, className, onclick, children, reloadActive }) {
    return (
        <div
            style={style}
            class={mClass}
            onclick={onclick}>
            <span
                class={className}>
                {children}
            </span>
        </div>
    )
}
export { TextInSpan }