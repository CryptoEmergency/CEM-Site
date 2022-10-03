import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import { NewsItem } from '@component/element/NewsItem.js';

const BlockMainNews = function () {
    // console.log("BlockMainNews", news);

    return (
        <div class="news_block_container">
            <div class="news_block">
                <div class="home_page_news">
                    <a class="crypto_news_link" data-action="link" href="{{Variable.lang.url}}news/">Crypto News</a>
                    <div class="gradient_line"></div>
                </div>
                <div class="main_page_news_block">
                    {
                        Variable.MainNews.list_records.map(function (newsItem) {
                            return (
                                <NewsItem newsItem={newsItem} />
                            )
                        })
                    }
                    {/* <a data-type="" class="blog_news_item">
                        <img style="width: 100px; margin-bottom: 20px" class="load" src="/assets/upload/news/{{image}}" />
                        <p style="width: 60%; margin-bottom: 20px" class="blog_new_title load"></p>
                        <div style="display: flex!important;" class="blog_post_stat">
                            <span><img src={svg.question_views} /> <span class="load">1</span></span>
                            <span><img src={svg.question_answers} /> <span class="load">1</span></span>
                            <span class="load"></span>
                        </div>
                    </a> */}
                </div>
            </div>
            <div class="button-container-preview">
                <a class="btn-news-preview" href="{{Variable.lang.url}}news/" data-action="link">
                    <span>
                        {Variable.lang.button.allNews}
                    </span>
                </a>
            </div>
        </div>

    )
}

export { BlockMainNews }