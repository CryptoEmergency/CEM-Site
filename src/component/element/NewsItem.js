import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
import { sliceString } from '@src/functions.js';

const NewsItem = function ({ item, type }) {

    console.log('=0e2822=', item)
    return (
        <div class="blog_news_item"
            onClick={async () => {
                Variable.SetModals({
                    name: "ModalFullSize",
                    data: { item: item, type: type },
                });
            }}
        >
            <img src={"/assets/upload/news/" + item.image} />
            <p class="blog_new_title">{item.title}</p>
            <span class="blog_new_text">{sliceString(item.preview, 215)}</span>
            <div
                style="display: flex!important;"
                class="blog_post_stat"
            >
                <span>
                    <img src={svg["question_views"]} />
                    {item.statistic.view}
                </span>
                <span>
                    <img src={svg["question_answers"]} />
                    {item.statistic.comments}
                </span>
                <span>{Helpers.getDateFormat(item.showDate)}</span>
            </div>
            {/* <If
                data={typeof item.source != "undefined"}
                dataIf={
                    <p class="full_news_disclaimer mr20">
                        {Variable.lang.p.source}
                        <a href={item.source} rel="nofollow" target="_blank">
                            {item.source}
                        </a>
                    </p>
                }
            /> */}
        </div>
    )
}

export { NewsItem }