import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const Img = function ({ style, className, onclick, src, children, reloadActive }) {
    return (
        <img
            src={src}
            style={style}
            class={className}
            onclick={onclick}>
        </img>
    )
}
export { Img }