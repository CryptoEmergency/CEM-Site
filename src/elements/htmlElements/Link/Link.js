import {
    jsx,
    jsxFrag
} from "@betarost/cemserver/cem.js";

const Link = function ({ style, className, href, onclick, children, reloadActive }) {
    return (
        <a
            style={style}
            class={className}
            href={href}
            onclick={onclick}>
            {children}
        </a>
    )
}
export { Link }