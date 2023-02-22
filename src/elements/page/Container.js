import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

const forExport = function ({ className, children, resetClass, title, backSeat }) {
    let classACtive = ["blog_page", className]
    if (resetClass) {
        classACtive = className
    }
    return (
        <div class={classACtive}>
            {title ? title : null}

            {children}

            {backSeat ? <img class={backSeat.class} src={backSeat.src} /> : null}
        </div>
    )
}

export default forExport