import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";
const forExport = function ({ item, nameUrl }) {
    return (
        <Elements.Link
            class="blog_news_item"
            resetClass={true}
            href={`/${nameUrl}/show/${item._id}`}
            link={{ type: "modal", data: { title: fn.sliceString(item.title, 85), item, items: fn.itemsMenu.news({ url: `/${nameUrl}/show/${item._id}` }) } }}
        >
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
        </Elements.Link>
    )
}

export default forExport