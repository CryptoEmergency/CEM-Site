import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

const forExport = function ({ title, className, children, resetClass }) {
    let classACtive = ["c-main__body", className]
    if (resetClass) {
        classACtive = className
    }
    return (
        <div class={classACtive}>
            {title ? <div>{title}</div> : null}
            {children}
        </div>
    )
}

export default forExport