import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";
import { getDateFormat } from "@src/functions.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const NewsItem = function ({ newsItem }) {
    // console.log("NewsItem", newsItem)

    return (
        <a data-id={newsItem._id} class="blog_news_item">
            <img
                style="width: 100px; margin-bottom: 20px"
                class=""
                src={`/assets/upload/news/${newsItem.image}`}
            /> {/* load */}
            <p
                style="width: 60%; margin-bottom: 20px"
                class="blog_new_title "
            >{newsItem.title}</p> {/* load */}
            <div style="display: flex!important;" class="blog_post_stat">
                <span>
                    <img src={svg.question_views} />
                    <span class="">{newsItem.statistic.view}</span> {/* load */}
                </span>
                <span>
                    <img src={svg.question_answers} />
                    <span class="">{newsItem.statistic.comments}</span> {/* load */}
                </span>
                <span class="">{getDateFormat(newsItem.showDate)}</span> {/* load */}
            </div>
        </a>
    )
}

export { NewsItem }