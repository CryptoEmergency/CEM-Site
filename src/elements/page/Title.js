import {
    jsx,
    jsxFrag,
    Data
} from '@betarost/cemserver/cem.js';

const forExport = function ({ className, title, every }) {
    return (
        <div class={["blog_filter", className]}>
            {every || !Data.Static.openModals ? <h2>{title}</h2> : null}
        </div>
    )
}

export default forExport