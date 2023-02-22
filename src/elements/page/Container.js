import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

const forExport = function ({ className, children }) {
    return (
        <div class={["blog_page", className]}>
            {children}
        </div>
    )
}

export default forExport