import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

const forExport = function ({ className, children }) {
    return (
        <div class={["c-main__body", className]}>
            {children}
        </div>
    )
}

export default forExport