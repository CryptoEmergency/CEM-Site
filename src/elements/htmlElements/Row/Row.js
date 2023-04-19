import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const Row = function ({ style, className, onclick, children, reloadActive }) {
    return (
        <div
            style={style}
            class={className}
            onclick={onclick}>
            {children}
        </div>
    )
}
export { Row }