import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ item }) {
    return (
        <div></div>
    )
    return (
        <a
            class="blog_news_item"
            href={`/${Static.type}/show/${item._id}`}
            onclick={(e) => {
                fn.siteLinkModal(e, { title: fn.sliceString(item.title, 85), item, items: fn.itemsMenu.news({ url: `/${Static.type}/show/${item._id}` }) })
            }} >
            {/* <LazyImage path={"/assets/upload/news/" + item.image} /> */}
            <img src={"/assets/upload/news/" + item.image} />
            <p class="blog_new_title">{fn.sliceString(item.title, 85)}</p>
            <span class="blog_new_text">{fn.sliceString(item.preview, 170)}</span>
            <div class="blog_post_stat blog_post_stat--list" >
                <span>
                    <img src={svg["question_views"]} />
                    {item.statistic.view}
                </span>
                <span>
                    <img src={svg["question_answers"]} />
                    {item.statistic.comments}
                </span>
                <span>{fn.getDateFormat(item.showDate)}</span>
            </div>
        </a>
    )
}

export default forExport