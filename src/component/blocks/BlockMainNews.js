import {
    jsx,
    jsxFrag,
    Helpers,
    Variable
} from '@betarost/cemjs';
import { siteLink } from '@src/functions.js'
import svg from '@assets/svg/index.js';
import { getNewsItemInShow } from "@src/apiFunctions.js";

const BlockMainNews = function () {

    return (
        <div class="news_block_container">
            <div class="news_block">
                <div class="home_page_news">
                    <a class="crypto_news_link" href="/news/" onclick={siteLink}>Crypto News</a>
                    <div class="gradient_line"></div>
                </div>
                <div class="main_page_news_block">
                    {
                        Variable.MainNews.list_records.map(function (newsItem) {
                            return (
                                <a
                                    class="blog_news_item"
                                    onClick={async () => {
                                        let news = await getNewsItemInShow(newsItem._id);
                                        news = news.list_records[0];
                                        Variable.SetModals({
                                            name: "ModalFullNews",
                                            data: { news },
                                        });
                                    }}
                                >
                                    <img
                                        style="width: 100px; margin-bottom: 20px"
                                        src={`/assets/upload/news/${newsItem.image}`}
                                    />
                                    <p style="width: 60%; margin-bottom: 20px" class="blog_new_title ">
                                        {newsItem.title}
                                    </p>
                                    <div style="display: flex!important;" class="blog_post_stat">
                                        <span>
                                            <img src={svg.question_views} />
                                            <span class="">{newsItem.statistic.view}</span>
                                        </span>
                                        <span>
                                            <img src={svg.question_answers} />
                                            <span class="">{newsItem.statistic.comments}</span>
                                        </span>
                                        <span class="">{Helpers.getDateFormat(newsItem.showDate)}</span>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
            <div class="button-container-preview">
                <a class="btn-news-preview" href="/news/" onclick={siteLink}>
                    <span>
                        {Variable.lang.button.allNews}
                    </span>
                </a>
            </div>
        </div>
    )
}

export { BlockMainNews }