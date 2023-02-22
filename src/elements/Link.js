import {
    jsx,
    jsxFrag,
    initReload
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";

const forExport = function ({ href, link, className, resetClass, children }) {
    let classACtive = ["blog_news_item", className]
    if (resetClass) {
        classACtive = className
    }
    return (
        <a
            class={classACtive}
            href={href}
            onclick={(e) => {
                fn.siteLinkModal(e, { title: fn.sliceString(item.title, 85), item, items: fn.itemsMenu.news({ url: `/${Static.type}/show/${item._id}` }) })
            }} >
            {children}
        </a>
    )
}

export default forExport